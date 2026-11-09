import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export async function SmallClasses() {
  const t = await getTranslations("Home.SmallClasses");

  return (
    <section className="bg-cream py-24 lg:py-32" id="small-classes">
      <div className="shell">
        <div className="grid overflow-hidden border border-navy/10 bg-white lg:grid-cols-[1fr_0.9fr]">
          <div className="order-2 p-8 sm:p-12 lg:order-1 lg:p-16">
            <Reveal>
              <p className="eyebrow text-teal-deep">{t("eyebrow")}</p>
              <h2 className="display-lg mt-5 text-navy">
                <span className="block">{t("titleLine1")}</span>
                <span className="block italic text-teal-deep">
                  {t("titleLine2")}
                </span>
              </h2>
              <div className="mt-9 flex items-baseline gap-4 border-y border-navy/10 py-7">
                <span className="font-display text-[5.5rem] leading-[0.75] text-gold lg:text-[7rem]">
                  {t("stat")}
                </span>
                <span className="max-w-[10rem] font-sans text-[0.62rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-navy/60">
                  {t("statLabel")}
                </span>
              </div>
              <p className="body-lg mt-7 max-w-lg text-ink-soft">{t("body")}</p>
              <p className="mt-5 text-xs leading-relaxed text-ink-soft/70">
                {t("footnote")}
              </p>
              <Link
                href="/academics#small-classes"
                className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-navy px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-teal-deep"
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

          <Reveal className="order-1 lg:order-2">
            <Photo
              src="/images/placeholders/small-classes.jpg"
              alt={t("alt")}
              className="h-full min-h-[22rem] w-full"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
