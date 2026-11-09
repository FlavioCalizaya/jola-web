import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { Photo } from "../ui/Photo";
import { Reveal } from "../ui/Reveal";

export function PageCta({
  title,
  body,
  ctaLabel,
  href = "/admissions/book-a-visit",
  image = "/images/placeholders/final-cta.jpg",
  imageAlt,
  eyebrow = "JOLA School",
}: {
  title: string;
  body: string;
  ctaLabel: string;
  href?: string;
  image?: string;
  imageAlt: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Photo
        src={image}
        alt={imageAlt}
        badge={false}
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/78" />
      <div className="shell relative py-20 lg:py-28">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-gold-soft">{eyebrow}</p>
          <h2 className="display-md mt-5 text-white">{title}</h2>
          <p className="body-lg mt-5 max-w-xl text-white/70">{body}</p>
          <Link
            href={href}
            className="group mt-9 inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            {ctaLabel}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
