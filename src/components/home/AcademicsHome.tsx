import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export async function AcademicsHome() {
  const t = await getTranslations("Home.Academics");
  const items = t.raw("items") as Array<{ key: string; title: string }>;

  return (
    <section className="bg-mist py-24 lg:py-32" id="academics">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              intro={t("intro")}
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Link
              href="/academics"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-navy/20 px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              {t("cta")}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid border-l border-t border-navy/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              key={item.key}
              delay={(index % 3) * 0.05}
              y={12}
              className="group border-b border-r border-navy/10"
            >
              <Link
                href={`/academics#${item.key === "selfSociety" ? "self-society" : item.key}`}
                className="flex min-h-32 items-start justify-between gap-6 bg-mist p-6 transition-colors duration-300 hover:bg-white lg:min-h-40 lg:p-8"
              >
                <div>
                  <span className="font-sans text-[0.56rem] font-bold tracking-[0.18em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-navy">
                    {item.title}
                  </h3>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-navy/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-deep"
                  strokeWidth={1.6}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
