import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { footerColumns } from "@/lib/navigation-data";
import { siteConfig } from "@/lib/site";

import { Logo } from "../ui/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "../ui/SocialIcon";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
} as const;

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const common = await getTranslations("Common");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 size-[34rem] rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-24 size-[22rem] rounded-full border border-gold/10"
      />

      <div className="shell relative py-16 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.15fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-7 font-display text-2xl leading-tight text-white/90">
              {t("tagline")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {t("description")}
            </p>

            <div className="mt-8">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold-soft">
                {t("contact.title")}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/65">
                <li className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-gold-soft/80"
                    strokeWidth={1.6}
                  />
                  <span>
                    {siteConfig.addressLine || t("contact.address")}
                  </span>
                </li>
                {siteConfig.phone ? (
                  <li className="flex items-start gap-3">
                    <Phone
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-gold-soft/80"
                      strokeWidth={1.6}
                    />
                    <a
                      href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                      className="link-underline"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                ) : (
                  <li className="flex items-start gap-3 text-white/40">
                    <Phone
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0"
                      strokeWidth={1.6}
                    />
                    <span>{t("contact.phonePending")}</span>
                  </li>
                )}
                {siteConfig.email ? (
                  <li className="flex items-start gap-3">
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-gold-soft/80"
                      strokeWidth={1.6}
                    />
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link-underline"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                ) : (
                  <li className="flex items-start gap-3 text-white/40">
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0"
                      strokeWidth={1.6}
                    />
                    <span>{t("contact.emailPending")}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.key} aria-label={t(`columns.${column.key}.title`)}>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold-soft">
                  {t(`columns.${column.key}.title`)}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className="text-[0.82rem] leading-snug text-white/55 transition-colors hover:text-white"
                      >
                        {nav(`${column.key}Menu.${item.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 border-b border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold-soft">
              {t("enquiries")}
            </p>
            {siteConfig.admissionsEmail ? (
              <a
                href={`mailto:${siteConfig.admissionsEmail}`}
                className="mt-1 inline-block font-display text-xl text-white transition-colors hover:text-gold-soft"
              >
                {siteConfig.admissionsEmail}
              </a>
            ) : (
              <p className="mt-1 text-sm text-white/40">
                {t("contact.emailPending")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {siteConfig.social.map((item) => {
              const Icon = socialIcons[item.key];
              return item.url ? (
                <a
                  key={item.key}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={item.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon aria-hidden="true" className="size-4" strokeWidth={1.6} />
                </a>
              ) : (
                <span
                  key={item.key}
                  title={`${item.label}: ${t("contact.socialPending")}`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-dashed border-white/10 text-white/25"
                >
                  <Icon aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  <span className="sr-only">
                    {item.label}: {t("contact.socialPending")}
                  </span>
                </span>
              );
            })}
            <Link
              href="/admissions/book-a-visit"
              className="ml-2 inline-flex min-h-10 items-center rounded-full bg-gold px-5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              {t("bookVisit")}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[0.68rem] leading-relaxed text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year })}</p>
          <p className="max-w-xl sm:text-right">{t("contentNote")}</p>
        </div>
        <p className="mt-3 text-[0.62rem] text-white/25">
          {common("pendingConfirmation")} · {t("contact.pendingNote")}
        </p>
      </div>
    </footer>
  );
}
