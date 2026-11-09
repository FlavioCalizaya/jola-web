import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export async function NurturingSouls() {
  const t = await getTranslations("Home.Souls");
  const values = t.raw("values") as string[];

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-24 text-white lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[30rem] rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 size-[18rem] rounded-full border border-gold/15"
      />

      <div className="shell grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow text-gold-soft">{t("eyebrow")}</p>
            <h2 className="display-lg mt-5 text-white">{t("title")}</h2>
            <p className="body-lg mt-6 max-w-xl text-white/70">{t("body")}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold-soft">
              {t("valuesLabel")}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {values.map((value) => (
                <li
                  key={value}
                  className="rounded-full border border-white/15 px-4 py-2 font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-gold hover:text-gold-soft"
                >
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/about#values"
              className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/30 px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:bg-gold hover:text-navy-deep"
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

        <Reveal className="relative order-1 lg:order-2">
          <div className="absolute -right-5 -top-5 hidden h-full w-full border border-gold/40 lg:block" />
          <Photo
            src="/images/placeholders/souls.jpg"
            alt={t("alt")}
            className="relative aspect-[4/5] w-full"
            sizes="(max-width: 1024px) 100vw, 44vw"
          />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 bg-cream/90 px-5 py-4 backdrop-blur-sm">
            <span className="font-display text-lg italic text-navy">
              {t("eyebrow")}
            </span>
            <span className="font-sans text-[0.56rem] font-bold uppercase tracking-[0.2em] text-teal-deep">
              02 / 05
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
