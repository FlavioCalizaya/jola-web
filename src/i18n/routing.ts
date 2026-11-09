import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
  // The brief specifies English as the default and an explicit EN | ES switch.
  localeDetection: false,
  alternateLinks: true,
});

export type Locale = (typeof routing.locales)[number];
