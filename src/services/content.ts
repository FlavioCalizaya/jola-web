import "server-only";

import { demoStories, demoTestimonials } from "@/content/demo-content";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";

let didWarnAboutDatabase = false;

function warnFallback(error: unknown) {
  if (!didWarnAboutDatabase) {
    didWarnAboutDatabase = true;
    console.warn(
      "[content] MySQL is unavailable or empty. Showing clearly labelled demo content. " +
        "Run the Prisma migrations and seed to use the database.",
      error instanceof Error ? error.message : error,
    );
  }
}

export type StorySummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string | null;
  locale: string;
  publishedAt: string | null;
  isDemo: boolean;
};

export type StoryDetail = StorySummary & {
  content: string;
};

export type PublicTestimonial = {
  id: string;
  author: string;
  content: string;
  isDemo: boolean;
};

function demoStorySummaries(locale: string): StorySummary[] {
  return demoStories
    .filter((story) => story.locale === locale)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .map((story) => ({
      id: `demo-${story.slug}-${story.locale}`,
      title: story.title,
      slug: story.slug,
      excerpt: story.excerpt,
      image: story.image,
      category: story.category,
      locale: story.locale,
      publishedAt: story.publishedAt.toISOString(),
      isDemo: true,
    }));
}

export async function getPublishedStories(
  locale: string,
  limit = 3,
): Promise<StorySummary[]> {
  try {
    const stories = await prisma.story.findMany({
      where: { locale, published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        category: true,
        locale: true,
        publishedAt: true,
        isDemo: true,
      },
    });

    if (stories.length === 0) {
      return demoStorySummaries(locale).slice(0, limit);
    }

    return stories.map((story) => ({
      ...story,
      publishedAt: story.publishedAt?.toISOString() ?? null,
    }));
  } catch (error) {
    warnFallback(error);
    return demoStorySummaries(locale).slice(0, limit);
  }
}

export async function getStoryBySlug(
  slug: string,
  locale: string,
): Promise<StoryDetail | null> {
  try {
    const story = await prisma.story.findUnique({
      where: { slug_locale: { slug, locale } },
    });

    if (story?.published) {
      return {
        id: story.id,
        title: story.title,
        slug: story.slug,
        excerpt: story.excerpt,
        content: story.content,
        image: story.image,
        category: story.category,
        locale: story.locale,
        publishedAt: story.publishedAt?.toISOString() ?? null,
        isDemo: story.isDemo,
      };
    }
  } catch (error) {
    warnFallback(error);
  }

  const demo = demoStories.find(
    (story) => story.slug === slug && story.locale === locale,
  );

  if (!demo) return null;

  return {
    id: `demo-${demo.slug}-${demo.locale}`,
    title: demo.title,
    slug: demo.slug,
    excerpt: demo.excerpt,
    content: demo.content,
    image: demo.image,
    category: demo.category,
    locale: demo.locale,
    publishedAt: demo.publishedAt.toISOString(),
    isDemo: true,
  };
}

export async function getPublishedTestimonials(
  locale: string,
): Promise<PublicTestimonial[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { locale, published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        author: true,
        content: true,
        isDemo: true,
      },
    });

    if (testimonials.length > 0) {
      return testimonials;
    }
  } catch (error) {
    warnFallback(error);
  }

  return demoTestimonials
    .filter((testimonial) => testimonial.locale === locale)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((testimonial) => ({
      id: `demo-${testimonial.locale}-${testimonial.sortOrder}`,
      author: testimonial.author,
      content: testimonial.content,
      isDemo: true,
    }));
}

export async function getPublishedStorySlugs(locale: Locale) {
  try {
    const stories = await prisma.story.findMany({
      where: { locale, published: true, isDemo: false },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });
    return stories.map((story) => ({
      slug: story.slug,
      updatedAt: story.updatedAt.toISOString(),
    }));
  } catch (error) {
    warnFallback(error);
    return [];
  }
}
