import { ArrowUpRight, Check } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageCta } from "@/components/shared/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    namespace: "admissions",
    path: "/admissions",
  });
}

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Admissions");
  const home = await getTranslations("Home.Admissions");
  const visit = await getTranslations("BookVisit");
  const common = await getTranslations("Common");

  const steps = home.raw("steps") as Array<{
    title: string;
    description: string;
  }>;
  const visitItems = visit.raw("aside.items") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image="/images/placeholders/admissions-hero.jpg"
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

      <section id="process" className="scroll-mt-28 bg-cream py-24 lg:py-32">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={t("process.eyebrow")}
              title={t("process.title")}
            />
          </Reveal>

          <ol className="mt-14 grid gap-px border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 0.06}
                y={14}
                className="group relative bg-cream p-8 transition-colors hover:bg-white lg:p-10"
              >
                <span className="font-display text-[3.4rem] leading-none text-gold/60">
                  0{index + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-8 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20"
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="requirements"
        className="scroll-mt-28 bg-navy-deep py-24 text-white lg:py-32"
      >
        <div className="shell grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow text-gold-soft">{t("requirements.eyebrow")}</p>
            <h2 className="display-lg mt-5 text-white">
              {t("requirements.title")}
            </h2>
            <p className="body-lg mt-6 max-w-xl text-white/65">
              {t("requirements.body")}
            </p>
            <PendingNotice
              title={common("pendingConfirmation")}
              body={t("requirements.note")}
              tone="light"
              className="mt-8"
            />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft"
              >
                {t("requirements.cta")}
              </Link>
              <Link
                href="/admissions/book-a-visit"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-navy-deep"
              >
                {t("requirements.book")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative">
            <div className="absolute -right-4 -top-4 hidden h-full w-full border border-gold/30 lg:block" />
            <Photo
              src="/images/placeholders/admissions-hero.jpg"
              alt={t("hero.alt")}
              className="relative aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </section>

      <section id="visit" className="scroll-mt-28 bg-cream py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow text-teal-deep">{visit("aside.eyebrow")}</p>
            <h2 className="display-lg mt-5 text-navy">{visit("aside.title")}</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft/75">
              {visit("aside.note")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="space-y-0 border-t border-navy/10">
              {visitItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-navy/10 py-5"
                >
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal-deep">
                    <Check
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/admissions/book-a-visit"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-navy px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-teal-deep"
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
      </section>

      <PageCta
        title={t("cta.title")}
        body={t("cta.body")}
        ctaLabel={t("cta.button")}
        image="/images/placeholders/admissions-hero.jpg"
        imageAlt={t("hero.alt")}
        eyebrow={t("hero.eyebrow")}
      />
    </>
  );
}
