import { ArrowUpRight, Quote } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/PageHero";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PageCta } from "@/components/shared/PageCta";
import { Values } from "@/components/home/Values";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    namespace: "about",
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const director = await getTranslations("Home.Director");
  const common = await getTranslations("Common");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image="/images/placeholders/about-hero.jpg"
        alt={t("hero.alt")}
        pageLabel={t("hero.eyebrow")}
      >
        <Link
          href="/admissions/book-a-visit"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft"
        >
          {common("bookVisit")}
          <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </Link>
      </PageHero>

      <section
        id="philosophy"
        className="scroll-mt-28 bg-cream py-24 lg:py-32"
      >
        <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <Reveal className="relative">
            <div className="absolute -left-5 -top-5 hidden h-full w-full border border-gold/40 lg:block" />
            <Photo
              src="/images/placeholders/minds.jpg"
              alt={t("hero.alt")}
              className="relative aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow text-teal-deep">{t("philosophy.eyebrow")}</p>
            <h2 className="display-lg mt-5 text-navy">
              {t("philosophy.title")}
            </h2>
            <div className="mt-7 space-y-5">
              {(t.raw("philosophy.paragraphs") as string[]).map((paragraph) => (
                <p
                  key={paragraph}
                  className="body-lg text-ink-soft first:text-navy first:font-display first:text-2xl first:leading-snug sm:first:text-[1.7rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href="/academics"
              className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-navy px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-teal-deep"
            >
              {t("philosophy.cta")}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        id="mission-vision"
        className="scroll-mt-28 bg-navy-deep py-24 text-white lg:py-32"
      >
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-soft">{t("missionVision.eyebrow")}</p>
            <h2 className="display-lg mt-5 text-white">
              {t("missionVision.title")}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2">
            <Reveal className="bg-navy-deep p-8 sm:p-12">
              <span className="font-display text-5xl leading-none text-gold/40">
                01
              </span>
              <h3 className="mt-8 font-display text-3xl text-gold-soft">
                {t("missionVision.missionTitle")}
              </h3>
              <p className="body-lg mt-4 text-white/70">
                {t("missionVision.missionBody")}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="bg-navy-deep p-8 sm:p-12">
              <span className="font-display text-5xl leading-none text-gold/40">
                02
              </span>
              <h3 className="mt-8 font-display text-3xl text-gold-soft">
                {t("missionVision.visionTitle")}
              </h3>
              <p className="body-lg mt-4 text-white/70">
                {t("missionVision.visionBody")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Values />

      <section id="team" className="scroll-mt-28 bg-cream py-24 lg:py-32">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-teal-deep">{t("team.eyebrow")}</p>
            <h2 className="display-lg mt-5 text-navy">{t("team.title")}</h2>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-center lg:gap-20">
            <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div className="absolute -left-4 -top-4 h-full w-full border border-gold/60" />
              <Photo
                src="/images/placeholders/director.jpg"
                alt={director("alt")}
                className="relative aspect-[4/5] w-full"
                sizes="(max-width: 1024px) 60vw, 30vw"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <Quote
                aria-hidden="true"
                className="size-10 text-gold"
                strokeWidth={1.2}
              />
              <blockquote className="mt-6 font-display text-[1.75rem] leading-[1.35] text-navy sm:text-[2.2rem]">
                {t("team.directorQuote")}
              </blockquote>
              <div className="mt-8 border-t border-navy/15 pt-5">
                <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy">
                  {director("name")}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{director("role")}</p>
              </div>
              <PendingNotice
                title={common("pendingConfirmation")}
                body={t("team.pendingNote")}
                className="mt-8"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="history" className="scroll-mt-28 bg-mist py-24 lg:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow text-teal-deep">{t("history.eyebrow")}</p>
            <h2 className="display-lg mt-5 text-navy">{t("history.title")}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <PendingNotice
              title={t("history.pendingTitle")}
              body={t("history.pendingBody")}
              className="bg-white"
            />
          </Reveal>
        </div>
      </section>

      <PageCta
        title={t("cta.title")}
        body={t("cta.body")}
        ctaLabel={t("cta.button")}
        imageAlt={t("hero.alt")}
        image="/images/placeholders/about-hero.jpg"
        eyebrow={t("hero.eyebrow")}
      />
    </>
  );
}
