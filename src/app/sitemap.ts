import type { MetadataRoute } from "next";

import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";
import { getPublishedStorySlugs } from "@/services/content";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/academics", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/life-at-jola", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/admissions", priority: 0.9, changeFrequency: "yearly" as const },
  {
    path: "/admissions/book-a-visit",
    priority: 0.9,
    changeFrequency: "yearly" as const,
  },
  { path: "/stories", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

function languageAlternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, absoluteUrl(`/${locale}${path}`)]),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${route.path}`),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: languageAlternates(route.path) },
    })),
  );

  const storiesBySlug = new Map<
    string,
    Array<{ locale: Locale; updatedAt: string }>
  >();

  for (const locale of routing.locales) {
    const stories = await getPublishedStorySlugs(locale);
    for (const story of stories) {
      const existing = storiesBySlug.get(story.slug) ?? [];
      existing.push({ locale, updatedAt: story.updatedAt });
      storiesBySlug.set(story.slug, existing);
    }
  }

  const storyEntries: MetadataRoute.Sitemap = [];

  for (const [slug, locales] of storiesBySlug) {
    for (const { locale, updatedAt } of locales) {
      const languages = Object.fromEntries(
        locales.map((item) => [
          item.locale,
          absoluteUrl(`/${item.locale}/stories/${slug}`),
        ]),
      );

      storyEntries.push({
        url: absoluteUrl(`/${locale}/stories/${slug}`),
        lastModified: new Date(updatedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return [...staticEntries, ...storyEntries];
}
