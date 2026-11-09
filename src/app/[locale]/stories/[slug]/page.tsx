import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageCta } from "@/components/shared/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { absoluteUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { formatDate, splitParagraphs } from "@/lib/utils";
import { getPublishedStorySlugs, getStoryBySlug } from "@/services/content";

type PageParams = { locale: string; slug: string };

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of routing.locales) {
    const stories = await getPublishedStorySlugs(locale);
    for (const story of stories) {
      params.push({ locale, slug: story.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const story = await getStoryBySlug(slug, locale);

  if (!story) {
    return {};
  }

  return {
    title: story.title,
    description: story.excerpt,
    alternates: {
      canonical: `/${locale}/stories/${story.slug}`,
      languages: {
        en: `/en/stories/${story.slug}`,
        es: `/es/stories/${story.slug}`,
      },
    },
    robots: story.isDemo
      ? { index: false, follow: false }
      : undefined,
    openGraph: {
      type: "article",
      title: story.title,
      description: story.excerpt,
      url: `/${locale}/stories/${story.slug}`,
      publishedTime: story.publishedAt ?? undefined,
      images: [{ url: story.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [absoluteUrl(story.image)],
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const story = await getStoryBySlug(slug, locale);
  if (!story) notFound();

  const t = await getTranslations("StoriesPage");
  const home = await getTranslations("Home.Stories");
  const common = await getTranslations("Common");
  const paragraphs = splitParagraphs(story.content);

  return (
    <>
      <PageHero
        eyebrow={story.category ?? t("hero.eyebrow")}
        title={story.title}
        description={story.excerpt}
        image={story.image}
        alt={story.title}
        pageLabel={t("hero.eyebrow")}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/60">
          <span>{t("article.byline")}</span>
          {story.publishedAt && (
            <>
              <span aria-hidden="true" className="text-gold">
                ·
              </span>
              <time dateTime={story.publishedAt}>
                {formatDate(story.publishedAt, locale)}
              </time>
            </>
          )}
          {story.isDemo && (
            <span className="rounded-full border border-gold/60 px-2.5 py-1 text-[0.52rem] text-gold-soft">
              {home("demoLabel")}
            </span>
          )}
        </div>
      </PageHero>

      <article className="bg-cream py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_16rem] lg:items-start lg:gap-20">
          <div className="mx-auto w-full max-w-2xl">
            <Reveal>
              <div className="space-y-6">
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.02rem] leading-[1.85] text-ink-soft first:text-[1.2rem] first:leading-[1.7] first:text-navy sm:first:text-[1.3rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {story.isDemo && (
              <Reveal delay={0.08}>
                <PendingNotice
                  title={t("article.demoTitle")}
                  body={t("article.demoBody")}
                  className="mt-10"
                />
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div className="mt-12 border-t border-navy/10 pt-7">
                <Link
                  href="/stories"
                  className="group inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:text-teal-deep"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                    strokeWidth={1.8}
                  />
                  {t("article.back")}
                </Link>
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="border border-navy/10 bg-white p-6">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-teal-deep">
                {t("hero.eyebrow")}
              </p>
              <p className="mt-3 font-display text-2xl leading-snug text-navy">
                {home("intro")}
              </p>
              <Link
                href="/stories"
                className="group mt-5 inline-flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-navy/60 transition-colors hover:text-teal-deep"
              >
                {home("viewAll")}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <PageCta
        title={t("article.relatedCta")}
        body={t("hero.description")}
        ctaLabel={common("bookVisit")}
        image="/images/placeholders/stories-hero.jpg"
        imageAlt={t("hero.alt")}
        eyebrow={t("hero.eyebrow")}
      />
    </>
  );
}
