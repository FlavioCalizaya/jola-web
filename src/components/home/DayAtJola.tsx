import { getTranslations } from "next-intl/server";

import { Reveal } from "../ui/Reveal";

export async function DayAtJola() {
  const t = await getTranslations("Home.Day");
  const items = t.raw("items") as Array<{
    time: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="bg-cream py-24 lg:py-32" id="a-day-at-jola">
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-teal-deep">{t("eyebrow")}</p>
          <h2 className="display-lg mt-5 max-w-md text-navy">{t("title")}</h2>
          <p className="body-lg mt-6 max-w-sm text-ink-soft">{t("intro")}</p>
          <p className="mt-10 max-w-sm font-display text-xl italic leading-snug text-teal-deep">
            {t("closing")}
          </p>
        </Reveal>

        <div>
          <ol className="relative border-l border-navy/15">
            {items.map((item, index) => (
              <Reveal
                key={item.title}
                as="li"
                delay={index * 0.06}
                y={14}
                className="relative pb-10 pl-8 last:pb-0 sm:pl-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-2 size-[9px] rounded-full border-2 border-cream bg-gold"
                />
                <div className="grid gap-3 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-6">
                  <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold">
                    {item.time}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-10 border-t border-navy/10 pt-5 text-xs leading-relaxed text-ink-soft/65">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
