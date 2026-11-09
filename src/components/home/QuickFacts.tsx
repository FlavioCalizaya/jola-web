import { getTranslations } from "next-intl/server";

import { Reveal } from "../ui/Reveal";

export async function QuickFacts() {
  const t = await getTranslations("Home.Facts");
  const items = t.raw("items") as Array<{ value: string; label: string }>;

  return (
    <section className="border-b border-navy/10 bg-navy text-white">
      <div className="shell py-3">
        <p className="sr-only">{t("label")}</p>
        <dl className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              key={`${item.value}-${index}`}
              delay={index * 0.07}
              y={14}
              className="flex flex-col px-4 py-7 text-center first:pl-0 last:pr-0 sm:px-6 lg:py-9"
            >
              <dt className="order-2 mt-2 font-sans text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/50">
                {item.label}
              </dt>
              <dd className="order-1 font-display text-[2.4rem] leading-none text-gold-soft lg:text-[3.1rem]">
                {item.value}
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="border-t border-white/10 py-3 text-center text-[0.62rem] leading-relaxed text-white/35">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
