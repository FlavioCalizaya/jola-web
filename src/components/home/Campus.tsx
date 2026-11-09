import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const campusImages = [
  "/images/placeholders/campus-classrooms.jpg",
  "/images/placeholders/campus-science.jpg",
  "/images/placeholders/campus-robotics.jpg",
  "/images/placeholders/campus-arts.jpg",
  "/images/placeholders/campus-music.jpg",
  "/images/placeholders/campus-sports.jpg",
  "/images/placeholders/campus-outdoor.jpg",
  "/images/placeholders/campus-students.jpg",
] as const;

const spans = [
  "col-span-2 row-span-2",
  "",
  "",
  "",
  "",
  "",
  "col-span-2",
  "",
];

export async function Campus() {
  const t = await getTranslations("Home.Campus");
  const items = t.raw("items") as Array<{ title: string; alt: string }>;

  return (
    <section className="bg-mist py-24 lg:py-32" id="campus">
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
              href="/life-at-jola#campus"
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

        <div className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 4) * 0.05}
              y={12}
              className={`group relative overflow-hidden ${spans[index] ?? ""}`}
            >
              <Photo
                src={campusImages[index]}
                alt={item.alt}
                className="h-full w-full"
                sizes="(max-width: 768px) 50vw, 25vw"
                imageClassName="transition-transform duration-[1100ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 font-sans text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white">
                {item.title}
              </span>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-[0.62rem] text-ink-soft/60">
          {t("lightboxLabel")}
        </p>
      </div>
    </section>
  );
}
