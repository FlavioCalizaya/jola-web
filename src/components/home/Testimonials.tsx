import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { getPublishedTestimonials } from "@/services/content";

import { Reveal } from "../ui/Reveal";
import { TestimonialCarousel } from "./TestimonialCarousel";

export async function Testimonials({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.Testimonials");
  const testimonials = await getPublishedTestimonials(locale);
  const hasDemo = testimonials.some((testimonial) => testimonial.isDemo);

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-deep py-24 text-white lg:py-32"
      id="testimonials"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[28rem] rounded-full border border-white/[0.05]"
      />
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow text-gold-soft">{t("eyebrow")}</p>
            <h2 className="display-lg mt-5 text-white">{t("title")}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              {t("intro")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <TestimonialCarousel testimonials={testimonials} />
        </Reveal>

        {hasDemo && (
          <p className="mt-6 border-l-2 border-gold/70 pl-4 text-xs leading-relaxed text-white/45">
            {t("demoNote")}
          </p>
        )}
      </div>
    </section>
  );
}
