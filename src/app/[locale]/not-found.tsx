import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const common = await getTranslations("Common");

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 size-[38rem] -translate-y-1/2 rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-1/2 size-[22rem] -translate-y-1/2 rounded-full border border-gold/15"
      />
      <div className="shell relative py-32">
        <p className="eyebrow text-gold-soft">{t("eyebrow")}</p>
        <h1 className="display-lg mt-6 max-w-3xl text-white">{t("title")}</h1>
        <p className="body-lg mt-6 max-w-xl text-white/65">{t("body")}</p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center rounded-full bg-gold px-8 py-3.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft"
        >
          {common("backHome")}
        </Link>
      </div>
    </section>
  );
}
