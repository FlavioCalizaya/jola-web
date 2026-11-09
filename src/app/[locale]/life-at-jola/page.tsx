import { ArrowUpRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Stallions } from "@/components/home/Stallions";
import { PageCta } from "@/components/shared/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { routing, type Locale } from "@/i18n/routing";

const experienceMeta = [
  { image: "/images/placeholders/experience-science.jpg", anchor: "science" },
  { image: "/images/placeholders/experience-robotics.jpg", anchor: "robotics" },
  { image: "/images/placeholders/experience-arts.jpg", anchor: "arts" },
  { image: "/images/placeholders/experience-music.jpg", anchor: "music" },
  { image: "/images/placeholders/experience-sports.jpg", anchor: "sports" },
  { image: "/images/placeholders/experience-equestrian.jpg", anchor: "equestrian" },
] as const;

const beyondMeta = [
  { image: "/images/placeholders/beyond-sports.jpg", anchor: "sports" },
  { image: "/images/placeholders/beyond-arts.jpg", anchor: "arts" },
  { image: "/images/placeholders/beyond-music.jpg", anchor: "music" },
  { image: "/images/placeholders/beyond-clubs.jpg", anchor: "clubs" },
  { image: "/images/placeholders/beyond-leadership.jpg", anchor: "leadership" },
  { image: "/images/placeholders/beyond-community.jpg", anchor: "community" },
] as const;

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    namespace: "life",
    path: "/life-at-jola",
  });
}

export default async function LifePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Life");
  const homeExperience = await getTranslations("Home.Experience");
  const homeBeyond = await getTranslations("Home.Beyond");
  const homeCampus = await getTranslations("Home.Campus");
  const admissions = await getTranslations("Admissions");
  const common = await getTranslations("Common");

  const experienceItems = homeExperience.raw("items") as Array<{
    key: string;
    title: string;
    tagline: string;
    alt: string;
  }>;
  const beyondItems = homeBeyond.raw("items") as Array<{
    key: string;
    title: string;
    alt: string;
  }>;
  const campusItems = homeCampus.raw("items") as Array<{
    title: string;
    alt: string;
  }>;

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image="/images/placeholders/life-hero.jpg"
        alt={t("hero.alt")}
        pageLabel={t("hero.eyebrow")}
      >
        <Link
          href="/admissions/book-a-visit"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft"
        >
          {common("bookVisit")}
          <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </Link>
      </PageHero>

      <section className="bg-cream py-24 lg:py-32" id="experience">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={t("experience.eyebrow")}
              title={t("experience.title")}
              intro={t("experience.intro")}
            />
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experienceItems.map((item, index) => {
              const meta = experienceMeta[index];
              return (
                <Reveal
                  key={item.key}
                  as="article"
                  delay={(index % 3) * 0.06}
                  className="group scroll-mt-28"
                >
                  <div id={meta.anchor} className="relative overflow-hidden">
                    <Photo
                      src={meta.image}
                      alt={item.alt}
                      className="aspect-[4/3] w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      imageClassName="transition-transform duration-[1100ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-gold-soft">
                        {item.tagline}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl leading-none text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sand py-24 lg:py-32" id="beyond">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={t("beyond.eyebrow")}
              title={t("beyond.title")}
              intro={t("beyond.intro")}
            />
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beyondItems.map((item, index) => {
              const meta = beyondMeta[index];
              return (
                <Reveal
                  key={item.key}
                  as="article"
                  delay={(index % 3) * 0.06}
                  className="group relative overflow-hidden"
                >
                  <div id={meta.anchor} className="scroll-mt-28">
                    <Photo
                      src={meta.image}
                      alt={item.alt}
                      className="aspect-[4/3] w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      imageClassName="transition-transform duration-[1100ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-2xl text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 lg:py-32" id="campus">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={homeCampus("eyebrow")}
              title={t("campus.title")}
              intro={homeCampus("intro")}
            />
          </Reveal>
          <div className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4">
            {campusItems.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 4) * 0.05}
                y={12}
                className={`group relative overflow-hidden ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                } ${index === 6 ? "col-span-2" : ""}`}
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
        </div>
      </section>

      <div id="stallions" className="scroll-mt-28">
        <Stallions showCta={false} />
      </div>

      <PageCta
        title={admissions("cta.title")}
        body={admissions("cta.body")}
        ctaLabel={admissions("cta.button")}
        image="/images/placeholders/life-hero.jpg"
        imageAlt={t("hero.alt")}
        eyebrow={t("hero.eyebrow")}
      />
    </>
  );
}
