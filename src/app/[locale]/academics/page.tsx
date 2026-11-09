import { ArrowUpRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageCta } from "@/components/shared/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const levelImages = [
  "/images/placeholders/journey-early-years.jpg",
  "/images/placeholders/journey-elementary.jpg",
  "/images/placeholders/journey-middle.jpg",
  "/images/placeholders/journey-high.jpg",
] as const;

const levelAnchors = [
  "early-years",
  "elementary",
  "middle-school",
  "high-school",
] as const;

const pillars = [
  {
    key: "english",
    anchor: "english",
    image: "/images/placeholders/why-bilingual.jpg",
  },
  {
    key: "steam",
    anchor: "steam",
    image: "/images/placeholders/why-steam.jpg",
  },
  {
    key: "technology",
    anchor: "technology",
    image: "/images/placeholders/why-technology.jpg",
  },
  {
    key: "smallClasses",
    anchor: "small-classes",
    image: "/images/placeholders/why-small-classes.jpg",
  },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    namespace: "academics",
    path: "/academics",
  });
}

export default async function AcademicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Academics");
  const journey = await getTranslations("Home.Journey");
  const common = await getTranslations("Common");
  const levels = journey.raw("cards") as Array<{
    key: string;
    title: string;
    grades: string;
    description: string;
    cta: string;
    alt: string;
  }>;
  const subjects = t.raw("subjects.items") as Array<{
    title: string;
    number: string;
  }>;

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image="/images/placeholders/academics-hero.jpg"
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

      <section className="bg-cream py-24 lg:py-32" id="levels">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={t("levels.eyebrow")}
              title={t("levels.title")}
              intro={t("levels.intro")}
            />
          </Reveal>

          <div className="mt-16 space-y-16 lg:space-y-24">
            {levels.map((level, index) => (
              <div
                key={level.key}
                id={levelAnchors[index]}
                className={cn(
                  "grid scroll-mt-28 gap-8 lg:grid-cols-2 lg:items-center lg:gap-16",
                )}
              >
                <Reveal
                  className={cn(
                    "relative",
                    index % 2 === 1 && "lg:order-2",
                  )}
                >
                  <div
                    className={cn(
                      "absolute hidden h-full w-full border border-gold/35 lg:block",
                      index % 2 === 1
                        ? "-right-4 -top-4"
                        : "-left-4 -top-4",
                    )}
                  />
                  <Photo
                    src={levelImages[index]}
                    alt={level.alt}
                    className="relative aspect-[16/11] w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="absolute left-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-white/30 bg-navy-deep/60 font-sans text-[0.58rem] font-bold text-white backdrop-blur-sm">
                    0{index + 1}
                  </span>
                </Reveal>

                <Reveal
                  delay={0.08}
                  className={cn(index % 2 === 1 && "lg:order-1")}
                >
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-teal-deep">
                    {level.grades}
                  </p>
                  <h3 className="display-md mt-3 text-navy">{level.title}</h3>
                  <p className="body-lg mt-5 max-w-xl text-ink-soft">
                    {level.description}
                  </p>
                  <Link
                    href="/admissions/book-a-visit"
                    className="group mt-7 inline-flex items-center gap-3 border-b border-navy/20 pb-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:border-teal hover:text-teal-deep"
                  >
                    {common("bookVisit")}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                    />
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="subjects" className="scroll-mt-28 bg-mist py-24 lg:py-32">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={t("subjects.eyebrow")}
              title={t("subjects.title")}
              intro={t("subjects.intro")}
            />
          </Reveal>
          <div className="mt-14 grid border-l border-t border-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => (
              <Reveal
                key={subject.title}
                delay={(index % 3) * 0.05}
                y={12}
                className="group border-b border-r border-navy/10"
              >
                <div className="flex min-h-32 items-start justify-between gap-6 bg-mist p-6 transition-colors hover:bg-white lg:min-h-40 lg:p-8">
                  <div>
                    <span className="font-sans text-[0.56rem] font-bold tracking-[0.18em] text-gold">
                      {subject.number}
                    </span>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-navy">
                      {subject.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex size-4 shrink-0 items-center justify-center text-navy/25"
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="learning-in-practice" className="scroll-mt-28 bg-cream py-24 lg:py-32">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={t("pillars.eyebrow")}
              title={t("pillars.title")}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {pillars.map((pillar, index) => {
              const title = t(`${pillar.key}.title`);
              const body = t(`${pillar.key}.body`);
              const alt = t(`${pillar.key}.alt`);
              const isSmall = pillar.key === "smallClasses";

              return (
                <Reveal
                  key={pillar.key}
                  as="article"
                  delay={(index % 2) * 0.08}
                  className="group flex flex-col border border-navy/10 bg-white"
                >
                  <div
                    id={pillar.anchor}
                    className="scroll-mt-28 overflow-hidden"
                  >
                    <Photo
                      src={pillar.image}
                      alt={alt}
                      className="aspect-[16/10] w-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      imageClassName="transition-transform duration-[1100ms] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 lg:p-9">
                    <h3 className="font-display text-3xl leading-tight text-navy">
                      {title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                      {body}
                    </p>
                    <Link
                      href={isSmall ? "/about#philosophy" : "/academics#subjects"}
                      className="group/link mt-6 inline-flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-teal-deep transition-colors hover:text-navy"
                    >
                      {isSmall ? t("smallClasses.cta") : common("learnMore")}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <PageCta
        title={t("cta.title")}
        body={t("cta.body")}
        ctaLabel={t("cta.button")}
        image="/images/placeholders/academics-hero.jpg"
        imageAlt={t("hero.alt")}
        eyebrow={t("hero.eyebrow")}
      />
    </>
  );
}
