import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export async function ChallengingMinds() {
  const t = await getTranslations("Home.Minds");
  const pillars = t.raw("pillars") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="relative overflow-hidden bg-mist py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
        <Reveal className="relative">
          <div className="absolute -left-5 -top-5 hidden h-full w-full border border-gold/40 lg:block" />
          <Photo
            src="/images/placeholders/minds.jpg"
            alt={t("alt")}
            className="relative aspect-[4/5] w-full"
            sizes="(max-width: 1024px) 100vw, 44vw"
          />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 bg-navy-deep/85 px-5 py-4 backdrop-blur-sm">
            <span className="font-display text-lg italic text-white">
              {t("eyebrow")}
            </span>
            <span className="font-sans text-[0.56rem] font-bold uppercase tracking-[0.2em] text-gold-soft">
              01 / 05
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-teal-deep">{t("eyebrow")}</p>
            <h2 className="display-lg mt-5 text-navy">{t("title")}</h2>
            <p className="body-lg mt-6 max-w-xl text-ink-soft">{t("body")}</p>
          </Reveal>

          <ul className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.title}
                as="li"
                delay={index * 0.05}
                y={12}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-4"
              >
                <span className="font-sans text-[0.58rem] font-bold tracking-[0.16em] text-gold">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <Link
              href="/academics"
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
