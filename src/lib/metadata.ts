import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  locale: Locale;
  /** Key under the `Metadata` namespace, e.g. "about". */
  namespace: string;
  /** Path without locale prefix, e.g. "/about". */
  path: string;
  robots?: Metadata["robots"];
};

export async function buildPageMetadata({
  locale,
  namespace,
  path,
  robots,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t(`${namespace}.title`);
  const description = t(`${namespace}.description`);
  const localizedPath = path === "" ? `/${locale}` : `/${locale}${path}`;

  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, item === locale ? localizedPath : `/${item}${path}`]),
  );

  return {
    // The root layout's title template does not apply to the locale home page
    // because page and layout share the same route segment.
    title: path === "" ? `${siteConfig.name} — ${title}` : title,
    description,
    alternates: {
      canonical: localizedPath,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_BO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_BO"],
      title: `${title} | ${siteConfig.name}`,
      description,
      url: localizedPath,
      images: [
        {
          url: absoluteUrl("/images/placeholders/og-image.jpg"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [absoluteUrl("/images/placeholders/og-image.jpg")],
    },
    robots,
  };
}
