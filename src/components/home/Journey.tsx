import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const journeyImages = [
  "/images/placeholders/journey-early-years.jpg",
  "/images/placeholders/journey-elementary.jpg",
  "/images/placeholders/journey-middle.jpg",
  "/images/placeholders/journey-high.jpg",
] as const;

const journeyAnchors = [
  "early-years",
  "elementary",
  "middle-school",
  "high-school",
] as const;

export async function Journey() {
  const t = await getTranslations("Home.Journey");
  const cards = t.raw("cards") as Array<{
    key: string;
    title: string;
    grades: string;
    description: string;
    cta: string;
    alt: string;
  }>;

  return (
    <section className="bg-cream py-24 lg:py-32" id="journey">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            intro={t("intro")}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <Reveal
              key={card.key}
              as="article"
              delay={index * 0.07}
              className="group flex h-full flex-col"
            >
              <Link
                href={`/academics#${journeyAnchors[index]}`}
                className="flex h-full flex-col"
              >
                <div className="relative overflow-hidden">
                  <Photo
                    src={journeyImages[index]}
                    alt={card.alt}
                    className="aspect-[3/4] w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/85 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex size-8 items-center justify-center rounded-full border border-white/30 bg-navy-deep/50 font-sans text-[0.58rem] font-bold text-white backdrop-blur-sm">
                    0{index + 1}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-sans text-[0.56rem] font-bold uppercase tracking-[0.18em] text-gold-soft">
                      {card.grades}
                    </p>
                    <h3 className="mt-1 font-display text-2xl leading-none text-white">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col border-b border-navy/10 py-5">
                  <p className="flex-1 text-sm leading-relaxed text-ink-soft">
                    {card.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-navy/55 transition-colors group-hover:text-teal-deep">
                    {card.cta}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
