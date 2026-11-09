import "server-only";

import { createHash } from "node:crypto";

const SALT =
  process.env.IP_HASH_SALT?.trim() || "jola-local-development-salt";

export function hashIp(ip: string) {
  return createHash("sha256").update(`${SALT}:${ip}`).digest("hex");
}

export function getClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Basic same-origin check for JSON POSTs. Browsers send an Origin header for
 * cross-origin requests; rejecting mismatches adds a cheap CSRF safeguard.
 */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return process.env.NODE_ENV !== "production";
  }

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export function truncateUserAgent(value: string | null) {
  return value ? value.slice(0, 255) : null;
}
