import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const cardMeta = [
  {
    image: "/images/placeholders/why-bilingual.jpg",
    href: "/academics#english",
    number: "01",
  },
  {
    image: "/images/placeholders/why-small-classes.jpg",
    href: "/academics#small-classes",
    number: "02",
  },
  {
    image: "/images/placeholders/why-steam.jpg",
    href: "/academics#steam",
    number: "03",
  },
  {
    image: "/images/placeholders/why-technology.jpg",
    href: "/academics#technology",
    number: "04",
  },
  {
    image: "/images/placeholders/why-personalized.jpg",
    href: "/about#philosophy",
    number: "05",
  },
  {
    image: "/images/placeholders/why-character.jpg",
    href: "/about#values",
    number: "06",
  },
] as const;

export async function WhyJola() {
  const t = await getTranslations("Home.Why");
  const common = await getTranslations("Common");
  const cards = t.raw("cards") as Array<{
    key: string;
    title: string;
    description: string;
    alt: string;
  }>;

  return (
    <section className="bg-cream py-24 lg:py-32" id="why-jola">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              intro={t("intro")}
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 border-b border-navy/25 pb-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:border-teal hover:text-teal-deep"
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

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const meta = cardMeta[index];
            return (
              <Reveal
                key={card.key}
                as="article"
                delay={(index % 3) * 0.08}
                className="group"
              >
                <Link href={meta.href} className="block">
                  <div className="relative">
                    <Photo
                      src={meta.image}
                      alt={card.alt}
                      className="aspect-[4/3] w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute bottom-3 left-3 font-sans text-[0.58rem] font-bold tracking-[0.2em] text-white/80 mix-blend-difference">
                      {meta.number}
                    </span>
                  </div>
                  <div className="border-b border-navy/10 pb-6 pt-5">
                    <h3 className="font-display text-2xl leading-tight text-navy transition-colors group-hover:text-teal-deep">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {card.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy/50 transition-colors group-hover:text-teal-deep">
                      {common("learnMore")}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
