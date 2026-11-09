"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common");

  const linkClass = (active: boolean) =>
    cn(
      "rounded-sm px-1 py-0.5 text-[0.66rem] font-bold tracking-[0.18em] transition-colors",
      active
        ? tone === "light"
          ? "text-gold-soft"
          : "text-teal-deep"
        : tone === "light"
          ? "text-white/55 hover:text-white"
          : "text-navy/45 hover:text-navy",
    );

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="sr-only">{t("language")}</span>
      <Link
        href={pathname}
        locale="en"
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
        className={linkClass(locale === "en")}
      >
        EN
      </Link>
      <span
        aria-hidden="true"
        className={cn(
          "h-3 w-px",
          tone === "light" ? "bg-white/25" : "bg-navy/20",
        )}
      />
      <Link
        href={pathname}
        locale="es"
        lang="es"
        aria-current={locale === "es" ? "page" : undefined}
        className={linkClass(locale === "es")}
      >
        ES
      </Link>
    </div>
  );
}
