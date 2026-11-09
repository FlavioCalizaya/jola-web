import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const beyondMeta = [
  { image: "/images/placeholders/beyond-sports.jpg", href: "/life-at-jola#sports" },
  { image: "/images/placeholders/beyond-arts.jpg", href: "/life-at-jola#arts" },
  { image: "/images/placeholders/beyond-music.jpg", href: "/life-at-jola#music" },
  { image: "/images/placeholders/beyond-clubs.jpg", href: "/life-at-jola#clubs" },
  { image: "/images/placeholders/beyond-leadership.jpg", href: "/life-at-jola#clubs" },
  { image: "/images/placeholders/beyond-community.jpg", href: "/life-at-jola#campus" },
] as const;

export async function Beyond() {
  const t = await getTranslations("Home.Beyond");
  const items = t.raw("items") as Array<{
    key: string;
    title: string;
    alt: string;
  }>;

  return (
    <section className="bg-sand py-24 lg:py-32" id="beyond">
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
              href="/life-at-jola"
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

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const meta = beyondMeta[index];
            return (
              <Reveal
                key={item.key}
                as="article"
                delay={(index % 3) * 0.07}
                className="group relative overflow-hidden"
              >
                <Link href={meta.href} className="block">
                  <Photo
                    src={meta.image}
                    alt={item.alt}
                    className="aspect-[4/3] w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    imageClassName="transition-transform duration-[1100ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <h3 className="font-display text-2xl text-white">
                      {item.title}
                    </h3>
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/30 text-white transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep">
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={1.7}
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
