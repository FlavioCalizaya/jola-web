import { ArrowUpRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { siteConfig, whatsappLink } from "@/lib/site";

import { WhatsAppIcon } from "../ui/SocialIcon";

/**
 * Direct contact channels for visitors who want to reach the school without
 * filling in the visit form. Renders a WhatsApp deep link and a mailto link.
 */
export async function DirectContact({
  className = "",
}: {
  className?: string;
}) {
  const t = await getTranslations("Contact.direct");

  const waLink = whatsappLink(t("whatsappMessage"));
  const email = siteConfig.email ?? siteConfig.admissionsEmail;

  if (!waLink && !email) return null;

  return (
    <div className={className}>
      <p className="eyebrow text-teal-deep">{t("eyebrow")}</p>
      <h2 className="mt-4 font-display text-3xl leading-tight text-navy">
        {t("title")}
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
        {t("body")}
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-teal-deep px-8 py-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy"
          >
            <WhatsAppIcon
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.8}
            />
            {t("whatsapp")}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-navy/20 px-8 py-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <Mail aria-hidden="true" className="size-4" strokeWidth={1.8} />
            {t("email")}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </a>
        )}
      </div>
    </div>
  );
}
