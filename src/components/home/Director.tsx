import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export async function Director() {
  const t = await getTranslations("Home.Director");

  return (
    <section className="bg-sand py-24 lg:py-32" id="director">
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="absolute -left-4 -top-4 h-full w-full border border-gold/60" />
          <Photo
            src="/images/placeholders/director.jpg"
            alt={t("alt")}
            className="relative aspect-[4/5] w-full"
            sizes="(max-width: 1024px) 60vw, 30vw"
          />
          <div className="absolute -bottom-5 right-5 bg-navy px-5 py-4 text-white">
            <p className="font-sans text-[0.56rem] font-bold uppercase tracking-[0.2em] text-gold-soft">
              {t("role")}
            </p>
            <p className="mt-1 font-display text-lg leading-none">{t("name")}</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-teal-deep">{t("eyebrow")}</p>
            <blockquote className="relative mt-7">
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-9 font-display text-[6rem] leading-none text-gold/35"
              >
                “
              </span>
              <p className="relative font-display text-[1.85rem] leading-[1.3] text-navy sm:text-[2.35rem]">
                {t("quote")}
              </p>
            </blockquote>
            <div className="mt-8 border-t border-navy/15 pt-5">
              <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy">
                {t("name")}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{t("role")}</p>
            </div>
            <Link
              href="/about#team"
              className="group mt-7 inline-flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-teal-deep transition-colors hover:text-navy"
            >
              {t("cta")}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
