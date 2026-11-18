"use client";

import { useTranslations } from "next-intl";

import { whatsappLink } from "@/lib/site";

import { WhatsAppIcon } from "../ui/SocialIcon";

/**
 * Fixed WhatsApp button available on every page so visitors can start a chat
 * with admissions at any time. Uses the same number as the direct contact links.
 */
export function WhatsAppFloat() {
  const t = useTranslations("Contact.direct");
  const href = whatsappLink(t("whatsappMessage"));

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t("whatsapp")}
      title={t("whatsapp")}
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366] lg:bottom-7 lg:right-7"
    >
      <WhatsAppIcon aria-hidden="true" className="size-7" strokeWidth={1.7} />
    </a>
  );
}
