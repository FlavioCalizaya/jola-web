import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed middleware.ts to proxy.ts.
export default createMiddleware(routing);

export const config = {
  // Ignore API routes, Next internals, and files with extensions.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
