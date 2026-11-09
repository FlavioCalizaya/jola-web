import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.shortName,
    description:
      "A bilingual school in Cochabamba, Bolivia. Challenging Minds. Nurturing Souls.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#fbf8f2",
    theme_color: "#1e3a5f",
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
