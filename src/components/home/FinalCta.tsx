import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export async function FinalCta() {
  const t = await getTranslations("Home.FinalCta");

  return (
    <section className="relative isolate flex min-h-[72svh] items-center overflow-hidden bg-navy-deep text-white">
      <Photo
        src="/images/placeholders/final-cta.jpg"
        alt={t("alt")}
        badge={false}
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full"
        imageClassName="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-deep/72"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/40"
      />

      <div className="shell relative py-24 text-center">
        <Reveal>
          <p className="eyebrow justify-center text-gold-soft">JOLA School</p>
          <h2 className="display-lg mx-auto mt-7 max-w-4xl text-white">
            {t("title")}
          </h2>
          <p className="body-lg mx-auto mt-6 max-w-xl text-white/70">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/admissions/book-a-visit"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              {t("cta")}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
