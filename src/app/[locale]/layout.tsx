import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#12263d",
  colorScheme: "light",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description:
      locale === "es"
        ? "JOLA School es un colegio bilingüe en Cochabamba, Bolivia. Una educación bilingüe que inspira a los estudiantes a aprender, crear, liderar y transformar su mundo."
        : "JOLA School is a bilingual school in Cochabamba, Bolivia. A bilingual education that inspires students to learn, create, lead and make a difference in their world.",
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_BO" : "en_US",
      images: [
        {
          url: "/images/placeholders/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/placeholders/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${cormorant.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only z-[100] rounded-full bg-navy px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            {locale === "es" ? "Ir al contenido" : "Skip to content"}
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
