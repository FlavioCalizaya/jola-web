import { Check, Mail } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { VisitForm } from "@/components/forms/VisitForm";
import { PageHero } from "@/components/ui/PageHero";
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
    namespace: "bookVisit",
    path: "/admissions/book-a-visit",
  });
}

export default async function BookVisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("BookVisit");
  const contact = await getTranslations("Contact.details");
  const items = t.raw("aside.items") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image="/images/placeholders/admissions-hero.jpg"
        alt={t("hero.alt")}
        pageLabel={t("hero.eyebrow")}
      />

      <section className="bg-cream py-20 lg:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[1.45fr_0.55fr] lg:items-start lg:gap-14">
          <Reveal y={18}>
            <VisitForm />
          </Reveal>

          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <div className="border border-navy/10 bg-navy-deep p-7 text-white sm:p-9">
              <p className="eyebrow text-gold-soft">{t("aside.eyebrow")}</p>
              <h2 className="mt-5 font-display text-3xl leading-tight text-white">
                {t("aside.title")}
              </h2>
              <ul className="mt-7 space-y-0 border-t border-white/10">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-white/10 py-4"
                  >
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
                      <Check
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-white/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-white/40">
                {t("aside.note")}
              </p>
            </div>

            <div className="mt-5 border border-navy/10 bg-white p-7">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-teal-deep">
                {contact("title")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {contact("bookBody")}
              </p>
              {siteConfig.admissionsEmail ? (
                <a
                  href={`mailto:${siteConfig.admissionsEmail}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.7}
                  />
                  {siteConfig.admissionsEmail}
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="mt-4 inline-flex text-[0.6rem] font-bold uppercase tracking-[0.16em] text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-teal-deep"
                >
                  {contact("pendingTitle")}
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
