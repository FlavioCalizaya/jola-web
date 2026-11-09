import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export async function WhatMakes() {
  const t = await getTranslations("Home.WhatMakes");
  const pillars = t.raw("pillars") as string[];

  return (
    <section className="bg-cream py-24 lg:py-32" id="what-makes-jola">
      <div className="shell grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <Photo
            src="/images/placeholders/what-makes-jola.jpg"
            alt={t("alt")}
            className="aspect-[5/4] w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute -bottom-5 -right-3 max-w-[15rem] bg-navy px-6 py-5 text-white sm:-right-5">
            <p className="font-display text-xl italic leading-snug text-gold-soft">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-teal-deep">{t("eyebrow")}</p>
            <h2 className="display-lg mt-5 max-w-xl text-navy">{t("title")}</h2>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-0 border-t border-navy/10 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar}
                delay={(index % 2) * 0.05}
                y={12}
                className="flex items-baseline gap-4 border-b border-navy/10 py-4"
              >
                <span className="font-sans text-[0.56rem] font-bold tracking-[0.16em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl leading-tight text-navy">
                  {pillar}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <Link
              href="/about"
              className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-navy px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-teal-deep"
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
