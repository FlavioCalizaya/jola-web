"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type { PublicTestimonial } from "@/services/content";

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: PublicTestimonial[];
}) {
  const t = useTranslations("Home.Testimonials");
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = testimonials.length;
  const current = testimonials[index];

  if (!current) return null;

  const go = (direction: 1 | -1) => {
    setIndex((value) => (value + direction + total) % total);
  };

  return (
    <div
      className="relative mt-12"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("carouselLabel")}
    >
      <div className="grid overflow-hidden border border-white/10 bg-white/[0.035] lg:grid-cols-[1fr_auto]">
        <div className="relative flex min-h-[19rem] flex-col justify-between p-8 sm:p-12 lg:min-h-[22rem] lg:p-14">
          <Quote
            aria-hidden="true"
            className="size-9 text-gold/60"
            strokeWidth={1.2}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <p className="font-display text-[1.6rem] leading-[1.35] text-white sm:text-[2.05rem]">
                “{current.content}”
              </p>
              <footer className="mt-7 flex flex-wrap items-center gap-3">
                <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold-soft">
                  {current.author}
                </span>
                {current.isDemo && (
                  <span className="rounded-full border border-gold/50 px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-[0.14em] text-gold-soft/80">
                    {t("badge")}
                  </span>
                )}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-white/10 p-6 lg:w-28 lg:flex-col lg:border-l lg:border-t-0 lg:p-5">
          <span className="font-sans text-[0.6rem] font-bold tracking-[0.18em] text-white/40">
            {String(index + 1).padStart(2, "0")}{" "}
            <span className="text-white/20">{t("of")}</span>{" "}
            {String(total).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t("previousLabel")}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t("nextLabel")}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
