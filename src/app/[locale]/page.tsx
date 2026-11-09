import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { AcademicsHome } from "@/components/home/AcademicsHome";
import { AdmissionsSection } from "@/components/home/AdmissionsSection";
import { Beyond } from "@/components/home/Beyond";
import { Campus } from "@/components/home/Campus";
import { ChallengingMinds } from "@/components/home/ChallengingMinds";
import { DayAtJola } from "@/components/home/DayAtJola";
import { Director } from "@/components/home/Director";
import { Experience } from "@/components/home/Experience";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Journey } from "@/components/home/Journey";
import { NurturingSouls } from "@/components/home/NurturingSouls";
import { QuickFacts } from "@/components/home/QuickFacts";
import { SmallClasses } from "@/components/home/SmallClasses";
import { Stallions } from "@/components/home/Stallions";
import { StoriesHome } from "@/components/home/StoriesHome";
import { Testimonials } from "@/components/home/Testimonials";
import { Values } from "@/components/home/Values";
import { WhatMakes } from "@/components/home/WhatMakes";
import { WhyJola } from "@/components/home/WhyJola";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    namespace: "home",
    path: "",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const typedLocale = locale as Locale;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "School",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl(`/${typedLocale}`),
    description:
      typedLocale === "es"
        ? "Colegio bilingüe en Cochabamba, Bolivia."
        : "Bilingual school in Cochabamba, Bolivia.",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.location.city,
    },
    sameAs: siteConfig.social
      .filter((item) => item.url)
      .map((item) => item.url as string),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl(`/${typedLocale}`),
    inLanguage: typedLocale === "es" ? "es-BO" : "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([organizationSchema, websiteSchema]),
        }}
      />
      <Hero />
      <QuickFacts />
      <WhyJola />
      <ChallengingMinds />
      <NurturingSouls />
      <Journey />
      <Experience />
      <SmallClasses />
      <AcademicsHome />
      <Beyond />
      <Values />
      <DayAtJola />
      <Campus />
      <Stallions />
      <StoriesHome locale={typedLocale} />
      <Director />
      <Testimonials locale={typedLocale} />
      <WhatMakes />
      <AdmissionsSection />
      <FinalCta />
    </>
  );
}
