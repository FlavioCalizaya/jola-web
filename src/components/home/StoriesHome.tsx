import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPublishedStories } from "@/services/content";
import { formatDate, truncate } from "@/lib/utils";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export async function StoriesHome({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.Stories");
  const stories = await getPublishedStories(locale, 3);
  const hasDemo = stories.some((story) => story.isDemo);

  return (
    <section className="bg-cream py-24 lg:py-32" id="stories">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow text-teal-deep">{t("eyebrow")}</p>
            <h2 className="display-lg mt-5 max-w-2xl text-navy">{t("title")}</h2>
            <p className="body-lg mt-5 max-w-xl text-ink-soft">{t("intro")}</p>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Link
              href="/stories"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-navy/20 px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              {t("viewAll")}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </Reveal>
        </div>

        {stories.length === 0 ? (
          <p className="mt-12 border-y border-navy/10 py-12 text-center text-ink-soft">
            {t("empty")}
          </p>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {stories.map((story, index) => (
              <Reveal
                key={story.id}
                as="article"
                delay={index * 0.07}
                className="group"
              >
                <Link href={`/stories/${story.slug}`} className="block">
                  <Photo
                    src={story.image}
                    alt={story.title}
                    className="aspect-[4/3] w-full"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    imageClassName="transition-transform duration-[1100ms] group-hover:scale-105"
                  />
                  <div className="pt-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.58rem] font-bold uppercase tracking-[0.16em]">
                      {story.category && (
                        <span className="text-teal-deep">{story.category}</span>
                      )}
                      {story.isDemo && (
                        <span className="rounded-full border border-gold/60 px-2 py-0.5 text-[0.5rem] text-gold">
                          {t("demoLabel")}
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
                    <h3 className="mt-3 font-display text-2xl leading-tight text-navy transition-colors group-hover:text-teal-deep">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {truncate(story.excerpt, 150)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-navy/50 transition-colors group-hover:text-teal-deep">
                      {t("readMore")}
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

        {hasDemo && (
          <p className="mt-10 border-l-2 border-gold pl-4 text-xs leading-relaxed text-ink-soft/70">
            {t("demoNote")}
          </p>
        )}
      </div>
    </section>
  );
}
