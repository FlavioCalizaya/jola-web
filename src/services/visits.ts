import "server-only";

import type { VisitRequestInput } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

const HOUR = 60 * 60 * 1000;
const DUPLICATE_WINDOW = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP_HOUR = 5;

export type VisitSubmissionMeta = {
  ipHash: string | null;
  userAgent: string | null;
};

export class VisitSubmissionError extends Error {
  code: "rate_limited" | "duplicate";

  constructor(code: "rate_limited" | "duplicate", message: string) {
    super(message);
    this.name = "VisitSubmissionError";
    this.code = code;
  }
}

export async function createVisitRequest(
  input: VisitRequestInput,
  meta: VisitSubmissionMeta,
) {
  if (meta.ipHash) {
    const recentFromIp = await prisma.visitRequest.count({
      where: {
        ipHash: meta.ipHash,
        createdAt: { gte: new Date(Date.now() - HOUR) },
      },
    });

    if (recentFromIp >= MAX_REQUESTS_PER_IP_HOUR) {
      throw new VisitSubmissionError(
        "rate_limited",
        "Too many visit requests from this connection.",
      );
    }
  }

  const normalizedEmail = input.email.toLowerCase();
  const duplicate = await prisma.visitRequest.findFirst({
    where: {
      email: normalizedEmail,
      createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW) },
    },
    select: { id: true },
  });

  if (duplicate) {
    throw new VisitSubmissionError(
      "duplicate",
      "A visit request from this email was received recently.",
    );
  }

  const preferredDate = input.preferredDate
    ? new Date(`${input.preferredDate}T12:00:00.000Z`)
    : null;

  const request = await prisma.visitRequest.create({
    data: {
      parentName: input.parentName,
      email: normalizedEmail,
      phone: input.phone,
      studentName: input.studentName || null,
      grade: input.grade || null,
      preferredDate,
      preferredTime: input.preferredTime || null,
      message: input.message || null,
      source: "website:book-a-visit",
      ipHash: meta.ipHash,
      userAgent: meta.userAgent,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  return request;
}
