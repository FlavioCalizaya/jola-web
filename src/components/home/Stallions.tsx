import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export async function Stallions({ showCta = true }: { showCta?: boolean }) {
  const t = await getTranslations("Home.Stallions");
  const keywords = t.raw("keywords") as string[];

  return (
    <section
      className="relative isolate overflow-hidden bg-navy text-white"
      id="stallions"
    >
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[24rem] lg:min-h-[38rem]">
          <Photo
            src="/images/placeholders/stallions.jpg"
            alt={t("alt")}
            className="absolute inset-0 h-full w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/20 to-navy-deep/70 lg:bg-gradient-to-r lg:from-transparent lg:to-navy/80" />
        </Reveal>

        <div className="relative flex items-center overflow-hidden px-6 py-20 sm:px-12 lg:px-16 lg:py-24">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[13rem] leading-none tracking-tight text-white/[0.035] lg:text-[17rem]"
          >
            JOLA
          </span>
          <Reveal className="relative max-w-lg">
            <p className="eyebrow text-gold-soft">{t("eyebrow")}</p>
            <h2 className="display-lg mt-5 text-white">{t("title")}</h2>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {keywords.map((keyword) => (
                <li
                  key={keyword}
                  className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold-soft"
                >
                  {keyword}
                  <span aria-hidden="true" className="ml-6 text-white/15">
                    /
                  </span>
                </li>
              ))}
            </ul>
            <p className="body-lg mt-7 text-white/65">{t("body")}</p>
            {showCta && (
              <Link
                href="/life-at-jola#stallions"
                className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/30 px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:bg-gold hover:text-navy-deep"
              >
                {t("cta")}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
