import { ArrowUpRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/PageHero";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    namespace: "contact",
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Contact");
  const common = await getTranslations("Common");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image="/images/placeholders/contact-hero.jpg"
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

      <section className="bg-cream py-24 lg:py-32" id="contact-details">
        <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
          <Reveal>
            <p className="eyebrow text-teal-deep">{t("details.eyebrow")}</p>
            <h2 className="display-lg mt-5 text-navy">{t("details.title")}</h2>

            <dl className="mt-10 border-t border-navy/10">
              <div className="grid gap-2 border-b border-navy/10 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy">
                  <MapPin
                    aria-hidden="true"
                    className="size-4 text-teal-deep"
                    strokeWidth={1.7}
                  />
                  {t("details.locationTitle")}
                </dt>
                <dd className="text-sm leading-relaxed text-ink-soft">
                  {siteConfig.addressLine ?? t("details.locationValue")}
                  {!siteConfig.addressLine && (
                    <span className="mt-1 block text-xs text-navy/40">
                      {t("details.mapPending")}
                    </span>
                  )}
                </dd>
              </div>

              <div className="grid gap-2 border-b border-navy/10 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy">
                  <Phone
                    aria-hidden="true"
                    className="size-4 text-teal-deep"
                    strokeWidth={1.7}
                  />
                  {t("details.phoneTitle")}
                </dt>
                <dd className="text-sm leading-relaxed text-ink-soft">
                  {siteConfig.phone ? (
                    <a
                      href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                      className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                    >
                      {siteConfig.phone}
                    </a>
                  ) : (
                    <span className="text-navy/40">
                      {common("pendingConfirmation")}
                    </span>
                  )}
                </dd>
              </div>

              <div className="grid gap-2 border-b border-navy/10 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy">
                  <Mail
                    aria-hidden="true"
                    className="size-4 text-teal-deep"
                    strokeWidth={1.7}
                  />
                  {t("details.emailTitle")}
                </dt>
                <dd className="text-sm leading-relaxed text-ink-soft">
                  {siteConfig.email ? (
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                    >
                      {siteConfig.email}
                    </a>
                  ) : (
                    <span className="text-navy/40">
                      {common("pendingConfirmation")}
                    </span>
                  )}
                </dd>
              </div>

              <div className="grid gap-2 border-b border-navy/10 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-teal-deep"
                    strokeWidth={1.7}
                  />
                  {t("details.admissionsTitle")}
                </dt>
                <dd className="text-sm leading-relaxed text-ink-soft">
                  {siteConfig.admissionsEmail ? (
                    <a
                      href={`mailto:${siteConfig.admissionsEmail}`}
                      className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                    >
                      {siteConfig.admissionsEmail}
                    </a>
                  ) : (
                    <Link
                      href="/admissions/book-a-visit"
                      className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                    >
                      {common("bookVisit")}
                    </Link>
                  )}
                </dd>
              </div>
            </dl>

            <PendingNotice
              title={t("details.pendingTitle")}
              body={t("details.pendingBody")}
              className="mt-8"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative">
              <Photo
                src="/images/placeholders/campus-outdoor.jpg"
                alt={t("hero.alt")}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="border border-t-0 border-navy/10 bg-white p-6 sm:p-8">
                {siteConfig.mapUrl ? (
                  <a
                    href={siteConfig.mapUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                  >
                    {t("details.locationTitle")}
                    <ExternalLink
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.7}
                    />
                  </a>
                ) : (
                  <div className="flex min-h-40 flex-col items-center justify-center border border-dashed border-navy/20 bg-mist px-6 py-10 text-center">
                    <MapPin
                      aria-hidden="true"
                      className="size-6 text-teal-deep"
                      strokeWidth={1.5}
                    />
                    <p className="mt-3 text-sm font-semibold text-navy">
                      {t("details.mapPending")}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft/65">
                      {t("details.pendingTitle")}
                    </p>
                  </div>
                )}

                <div className="mt-7 border-t border-navy/10 pt-6">
                  <p className="font-display text-2xl text-navy">
                    {t("details.bookTitle")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {t("details.bookBody")}
                  </p>
                  <Link
                    href="/admissions/book-a-visit"
                    className="group mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-navy px-7 py-3 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-teal-deep"
                  >
                    {t("details.bookCta")}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
