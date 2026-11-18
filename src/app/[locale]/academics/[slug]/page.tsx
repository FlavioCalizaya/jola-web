import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageCta } from "@/components/shared/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  academicDetailImages,
  academicDetailKind,
  academicDetailSlugs,
  isAcademicDetailSlug,
} from "@/lib/academics";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    academicDetailSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isAcademicDetailSlug(slug)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "AcademicsDetail" });
  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);
  const path = `/${locale}/academics/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((item) => [item, `/${item}/academics/${slug}`]),
      ),
    },
    openGraph: {
      type: "website",
      title: `${title} | JOLA School`,
      description,
      url: path,
      images: ["/images/placeholders/og-image.jpg"],
    },
  };
}

export default async function AcademicDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  if (!isAcademicDetailSlug(slug)) notFound();

  const t = await getTranslations("AcademicsDetail");
  const common = await getTranslations("Common");

  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);
  const image = academicDetailImages[slug];
  const alt = t(`${slug}.alt`);
  const approach = t(`${slug}.approach`);
  const highlights = t.raw(`${slug}.highlights`) as string[];
  const kind = academicDetailKind[slug];
  const kindLabel =
    kind === "stage"
      ? t("labels.stage")
      : kind === "approach"
        ? t("labels.approach")
        : t("labels.area");

  // Show related pages of the same kind first, then fill with other pages so
  // every detail page has somewhere useful to continue.
  const related = [
    ...academicDetailSlugs.filter(
      (item) => item !== slug && academicDetailKind[item] === kind,
    ),
    ...academicDetailSlugs.filter(
      (item) => item !== slug && academicDetailKind[item] !== kind,
    ),
  ].slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={kindLabel}
        title={title}
        description={description}
        image={image}
        alt={alt}
        pageLabel={title}
      >
        <Link
          href="/admissions/book-a-visit"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft"
        >
          {common("bookVisit")}
          <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </Link>
      </PageHero>

      <section className="bg-cream py-20 lg:py-28">
        <div className="shell">
          <Link
            href="/academics"
            className="group inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-teal-deep transition-colors hover:text-navy"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.8}
            />
            {t("labels.back")}
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow={t("labels.approach")}
                title={t("labels.highlights")}
              />
              <p className="body-lg mt-6 max-w-xl text-ink-soft">{approach}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((highlight, index) => (
                  <div
                    key={highlight}
                    className="flex gap-5 border border-navy/10 bg-white p-6 lg:p-7"
                  >
                    <span className="shrink-0 font-sans text-[0.6rem] font-bold tracking-[0.18em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-xl leading-snug text-navy">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative isolate flex min-h-[32rem] items-end overflow-hidden bg-navy-deep py-16">
        <Photo
          src={image}
          alt={alt}
          badge={false}
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full"
          imageClassName="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-navy-deep/55"
        />
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-gold-soft">{kindLabel}</p>
            <p className="display-md mt-5 max-w-3xl text-white">{title}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow={t("labels.explore")} title={common("viewAll")} />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item}
                href={`/academics/${item}`}
                className="group flex min-h-28 items-start justify-between gap-4 border border-navy/10 bg-white p-6 transition-colors hover:border-teal-deep/40 hover:bg-mist"
              >
                <span className="font-display text-xl leading-snug text-navy transition-colors group-hover:text-teal-deep">
                  {t(`${item}.title`)}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-navy/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-deep"
                  strokeWidth={1.8}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title={t("labels.ctaTitle")}
        body={t("labels.ctaBody")}
        ctaLabel={t("labels.ctaButton")}
        image={image}
        imageAlt={alt}
        eyebrow={kindLabel}
      />
    </>
  );
}
