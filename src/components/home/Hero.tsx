import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

import { Reveal } from "../ui/Reveal";
import { Photo } from "../ui/Photo";

export async function Hero() {
  const t = await getTranslations("Home.Hero");
  const common = await getTranslations("Common");

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-deep text-white">
      {siteConfig.heroVideoUrl ? (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/placeholders/hero-home.jpg"
          aria-label={t("mediaAlt")}
        >
          <source src={siteConfig.heroVideoUrl} />
        </video>
      ) : (
        <Photo
          src="/images/placeholders/hero-home.jpg"
          alt={t("mediaAlt")}
          priority
          badge={false}
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full"
          imageClassName="object-cover object-[center_38%]"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/78 to-navy-deep/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-navy-deep/55"
      />
      <div
        aria-hidden="true"
        className="texture-grain absolute inset-0 -z-10 opacity-40"
      />

      <div className="shell relative flex flex-1 flex-col justify-end pb-10 pt-32 sm:pb-14 lg:pt-40">
        <Reveal className="max-w-5xl" y={30}>
          <p className="eyebrow text-gold-soft">{t("eyebrow")}</p>
          <h1 className="display-xl mt-7">
            <span className="block">{t("titleLine1")}</span>
            <span className="mt-1 block italic text-gold-soft">
              {t("titleLine2")}
            </span>
          </h1>
          <p className="body-lg mt-8 max-w-xl text-white/75">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/about"
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-all duration-300 hover:bg-gold-soft"
            >
              {t("primaryCta")}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
            <Link
              href="/admissions/book-a-visit"
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/35 px-8 py-4 font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-navy-deep"
            >
              <Play
                aria-hidden="true"
                className="size-3.5 fill-current"
                strokeWidth={1.5}
              />
              {t("secondaryCta")}
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/55">
            {t("trust")}
          </p>
          <div className="flex items-center justify-between gap-8 sm:justify-end">
            <span className="text-[0.58rem] uppercase tracking-[0.16em] text-white/30">
              {t("mediaNote")}
            </span>
            <span className="hidden items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/55 sm:flex">
              {t("scroll")}
              <ArrowDown
                aria-hidden="true"
                className="size-3.5 animate-bounce"
                strokeWidth={1.8}
              />
            </span>
            <span className="sr-only">
              {common("placeholderPhoto")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
