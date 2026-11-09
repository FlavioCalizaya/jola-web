import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

const experienceMeta = [
  { image: "/images/placeholders/experience-science.jpg", href: "/academics#steam" },
  { image: "/images/placeholders/experience-robotics.jpg", href: "/academics#technology" },
  { image: "/images/placeholders/experience-arts.jpg", href: "/life-at-jola#arts" },
  { image: "/images/placeholders/experience-music.jpg", href: "/life-at-jola#music" },
  { image: "/images/placeholders/experience-sports.jpg", href: "/life-at-jola#sports" },
  { image: "/images/placeholders/experience-equestrian.jpg", href: "/life-at-jola#equestrian" },
] as const;

export async function Experience() {
  const t = await getTranslations("Home.Experience");
  const items = t.raw("items") as Array<{
    key: string;
    title: string;
    tagline: string;
    alt: string;
  }>;

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-deep py-24 text-white lg:py-32"
      id="experience"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(198,161,91,0.35), transparent 40%), radial-gradient(circle at 85% 80%, rgba(7,139,135,0.4), transparent 45%)",
        }}
      />
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow text-gold-soft">{t("eyebrow")}</p>
            <h2 className="display-lg mt-5 max-w-3xl text-white">
              {t("title")}
            </h2>
            <p className="body-lg mt-5 max-w-xl text-white/60">{t("intro")}</p>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Link
              href="/life-at-jola"
              className="group inline-flex items-center gap-3 border-b border-white/25 pb-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/75 transition-colors hover:border-gold hover:text-gold-soft"
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
            const meta = experienceMeta[index];
            return (
              <Reveal
                key={item.key}
                as="article"
                delay={(index % 3) * 0.07}
                className="group"
              >
                <Link href={meta.href} className="block">
                  <div className="relative overflow-hidden">
                    <Photo
                      src={meta.image}
                      alt={item.alt}
                      className="aspect-[4/3] w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      imageClassName="transition-transform duration-[1100ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div>
                        <p className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-gold-soft">
                          {item.tagline}
                        </p>
                        <h3 className="mt-1.5 font-display text-2xl leading-none text-white">
                          {item.title}
                        </h3>
                      </div>
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep">
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4"
                          strokeWidth={1.7}
                        />
                      </span>
                    </div>
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
