import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "dark" | "light" | "teal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  titleClassName,
  introClassName,
  as: Heading = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
  titleClassName?: string;
  introClassName?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const toneClasses = {
    dark: {
      eyebrow: "text-teal-deep",
      title: "text-navy",
      intro: "text-ink-soft",
    },
    light: {
      eyebrow: "text-gold-soft",
      title: "text-white",
      intro: "text-white/70",
    },
    teal: {
      eyebrow: "text-gold-soft",
      title: "text-white",
      intro: "text-white/75",
    },
  }[tone];

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-5",
            toneClasses.eyebrow,
            align === "center" && "justify-center",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "display-lg",
          toneClasses.title,
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {intro && (
        <p
          className={cn(
            "body-lg mt-6 max-w-2xl",
            toneClasses.intro,
            align === "center" && "mx-auto",
            introClassName,
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
