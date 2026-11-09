import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Reveal } from "../ui/Reveal";

export async function Values() {
  const t = await getTranslations("Home.Values");
  const values = t.raw("values") as string[];
  const positions = [
    "left-0 top-[12%]",
    "right-0 top-[4%]",
    "right-[2%] top-[46%]",
    "left-[4%] bottom-[12%]",
    "right-[8%] bottom-[2%]",
  ];

  return (
    <section
      className="relative isolate scroll-mt-28 overflow-hidden bg-navy-deep py-24 text-white lg:py-32"
      id="values"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 50%, rgba(7,139,135,0.35), transparent 50%)",
        }}
      />
      <div className="shell grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-gold-soft">{t("eyebrow")}</p>
          <h2 className="display-lg mt-5 max-w-md text-white">{t("title")}</h2>
          <p className="body-lg mt-6 max-w-md text-white/60">
            {t("centerBody")}
          </p>
          <Link
            href="/about#values"
            className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/30 px-7 py-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:bg-gold hover:text-navy-deep"
          >
            {t("cta")}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto hidden aspect-square w-full max-w-[34rem] lg:block">
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[20%] rounded-full border border-gold/25"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[32%] rounded-full border border-white/10"
            />
            <div className="absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2 border border-gold/50 bg-gold/10 p-6 text-center backdrop-blur-sm">
              <p className="font-display text-3xl leading-none text-gold-soft">
                {t("centerTitle")}
              </p>
              <p className="mt-2 text-[0.56rem] font-bold uppercase leading-relaxed tracking-[0.16em] text-white/55">
                {t("centerSubtitle")}
              </p>
            </div>
            {values.map((value, index) => (
              <span
                key={value}
                className={`absolute ${positions[index]} border border-white/15 bg-navy-deep/70 px-4 py-2.5 font-sans text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur-sm`}
              >
                {value}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 lg:hidden">
            <div className="col-span-2 border border-gold/40 bg-gold/10 p-6 text-center">
              <p className="font-display text-3xl text-gold-soft">
                {t("centerTitle")}
              </p>
              <p className="mt-1 text-[0.56rem] font-bold uppercase tracking-[0.16em] text-white/55">
                {t("centerSubtitle")}
              </p>
            </div>
            {values.map((value) => (
              <span
                key={value}
                className="border border-white/15 px-4 py-3 text-center font-sans text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/70"
              >
                {value}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
