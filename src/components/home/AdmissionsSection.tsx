import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Reveal } from "../ui/Reveal";

export async function AdmissionsSection() {
  const t = await getTranslations("Home.Admissions");
  const steps = t.raw("steps") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section
      className="relative isolate overflow-hidden bg-teal-deep py-24 text-white lg:py-32"
      id="admissions"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(198,161,91,0.45), transparent 38%), radial-gradient(circle at 15% 90%, rgba(18,38,61,0.65), transparent 45%)",
        }}
      />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <p className="eyebrow text-gold-soft">{t("eyebrow")}</p>
            <h2 className="display-lg mt-5 max-w-3xl text-white">{t("title")}</h2>
            <p className="body-lg mt-5 max-w-xl text-white/70">
              {t("subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admissions/book-a-visit"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold px-7 py-3.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              {t("ctaVisit")}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-7 py-3.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-teal-deep"
            >
              {t("ctaContact")}
            </Link>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 0.07}
              y={14}
              className="group relative bg-teal-deep p-7 transition-colors duration-300 hover:bg-teal-deep/70 lg:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-[3.2rem] leading-none text-white/20 transition-colors group-hover:text-gold/50">
                  0{index + 1}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-3 h-px flex-1 bg-white/15"
                />
              </div>
              <h3 className="mt-7 font-display text-2xl text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
