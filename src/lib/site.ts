/**
 * Public site configuration.
 *
 * Contact details and social profiles are intentionally blank until JOLA
 * confirms them. Components render a clear "to be confirmed" state rather
 * than invented phone numbers, emails or profile links.
 */
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const siteConfig = {
  name: "JOLA School",
  shortName: "JOLA",
  tagline: "Challenging Minds. Nurturing Souls.",
  url: rawSiteUrl.replace(/\/+$/, ""),
  location: {
    city: "Cochabamba",
    country: "Bolivia",
    countryCode: "BO",
  },
  addressLine: process.env.NEXT_PUBLIC_CONTACT_ADDRESS_LINE?.trim() || null,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || null,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null,
  admissionsEmail:
    process.env.NEXT_PUBLIC_ADMISSIONS_EMAIL?.trim() || null,
  mapUrl: process.env.NEXT_PUBLIC_MAP_URL?.trim() || null,
  heroVideoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() || null,
  social: [
    {
      key: "instagram" as const,
      label: "Instagram",
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || null,
    },
    {
      key: "facebook" as const,
      label: "Facebook",
      url: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || null,
    },
    {
      key: "youtube" as const,
      label: "YouTube",
      url: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || null,
    },
  ],
};

export type SocialKey = (typeof siteConfig.social)[number]["key"];

export function absoluteUrl(path = "") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export const hasConfirmedContact = {
  phone: Boolean(siteConfig.phone),
  email: Boolean(siteConfig.email),
  admissionsEmail: Boolean(siteConfig.admissionsEmail),
  address: Boolean(siteConfig.addressLine),
  social: siteConfig.social.some((item) => Boolean(item.url)),
};
