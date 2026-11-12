import { NextResponse } from "next/server";

import { getClientIp, hashIp, isSameOrigin, truncateUserAgent } from "@/lib/security";
import { visitRequestSchema } from "@/lib/validations";
import {
  createVisitRequest,
  VisitSubmissionError,
} from "@/services/visits";
import { sendVisitRequestNotification } from "@/lib/email";
import { sendVisitRequestWhatsApp } from "@/lib/whatsapp";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 24 * 1024;
const MIN_COMPLETION_MS = 1500;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, code: "origin" },
      { status: 403 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, code: "content_type" },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, code: "too_large" }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = visitRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "validation",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a real visitor never fills this hidden field.
  if (data.companyWebsite && data.companyWebsite.length > 0) {
    return NextResponse.json({ ok: false, code: "spam" }, { status: 400 });
  }

  // Basic timing check: submissions faster than a human can type are bots.
  if (
    data.formStartedAt &&
    Date.now() - data.formStartedAt < MIN_COMPLETION_MS
  ) {
    return NextResponse.json({ ok: false, code: "spam" }, { status: 400 });
  }

  const ipHash = hashIp(getClientIp(request.headers));

  try {
    const created = await createVisitRequest(data, {
      ipHash,
      userAgent: truncateUserAgent(request.headers.get("user-agent")),
    });

    // Notificaciones (no bloqueantes): correo y WhatsApp al equipo de admisiones.
    const notificationData = {
      id: created.id,
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      studentName: data.studentName ?? null,
      grade: data.grade ?? null,
      preferredDate: data.preferredDate ?? null,
      preferredTime: data.preferredTime ?? null,
      message: data.message ?? null,
      createdAt: created.createdAt,
    };

    void sendVisitRequestNotification(notificationData);
    void sendVisitRequestWhatsApp(notificationData);

    return NextResponse.json(
      { ok: true, id: created.id },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof VisitSubmissionError) {
      return NextResponse.json(
        { ok: false, code: error.code },
        { status: error.code === "rate_limited" ? 429 : 409 },
      );
    }

    console.error("[visits] Failed to store visit request:", error);

    return NextResponse.json(
      { ok: false, code: "unavailable" },
      { status: 503 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, code: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
