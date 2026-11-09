import { ArrowUpRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageCta } from "@/components/shared/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { formatDate, truncate } from "@/lib/utils";
import { getPublishedStories } from "@/services/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    namespace: "stories",
    path: "/stories",
  });
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("StoriesPage");
  const home = await getTranslations("Home.Stories");
  const common = await getTranslations("Common");
  const stories = await getPublishedStories(locale, 24);
  const hasDemo = stories.some((story) => story.isDemo);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image="/images/placeholders/stories-hero.jpg"
        alt={t("hero.alt")}
        pageLabel={t("hero.eyebrow")}
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="shell">
          {hasDemo && (
            <Reveal>
              <p className="mb-12 max-w-3xl border-l-2 border-gold pl-4 text-xs leading-relaxed text-ink-soft/70">
                {t("demoNote")}
              </p>
            </Reveal>
          )}

          {stories.length === 0 ? (
            <p className="border-y border-navy/10 py-16 text-center text-ink-soft">
              {t("empty")}
            </p>
          ) : (
            <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, index) => (
                <Reveal
                  key={story.id}
                  as="article"
                  delay={(index % 3) * 0.06}
                  className="group"
                >
                  <Link href={`/stories/${story.slug}`} className="block">
                    <Photo
                      src={story.image}
                      alt={story.title}
                      className="aspect-[4/3] w-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      imageClassName="transition-transform duration-[1100ms] group-hover:scale-105"
                    />
                    <div className="pt-5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.56rem] font-bold uppercase tracking-[0.16em]">
                        {story.category && (
                          <span className="text-teal-deep">
                            {story.category}
                          </span>
                        )}
                        {story.isDemo && (
                          <span className="rounded-full border border-gold/60 px-2 py-0.5 text-[0.5rem] text-gold">
                            {home("demoLabel")}
                          </span>
                        )}
                        {story.publishedAt && (
                          <time
                            dateTime={story.publishedAt}
                            className="text-navy/40"
                          >
                            {formatDate(story.publishedAt, locale)}
                          </time>
                        )}
                      </div>
                      <h2 className="mt-3 font-display text-2xl leading-tight text-navy transition-colors group-hover:text-teal-deep">
                        {story.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {truncate(story.excerpt, 170)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-navy/50 transition-colors group-hover:text-teal-deep">
                        {common("readMore")}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5"
                          strokeWidth={1.8}
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <PageCta
        title={t("hero.title")}
        body={t("hero.description")}
        ctaLabel={common("bookVisit")}
        image="/images/placeholders/stories-hero.jpg"
        imageAlt={t("hero.alt")}
        eyebrow={t("hero.eyebrow")}
      />
    </>
  );
}
