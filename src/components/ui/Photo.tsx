import Image from "next/image";

import { cn } from "@/lib/utils";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  badge?: boolean;
  badgeLabel?: string;
  overlay?: React.ReactNode;
};

/**
 * All current imagery lives under /images/placeholders and is clearly marked.
 * When real, licensed JOLA photography is supplied, replace the file and the
 * badge disappears automatically.
 */
export function Photo({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  badge = true,
  badgeLabel = "Placeholder",
  overlay,
}: PhotoProps) {
  const isPlaceholder = src.includes("/placeholders/");

  return (
    <div
      className={cn(
        "group/photo relative isolate overflow-hidden bg-navy/10",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={86}
        className={cn(
          "object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:scale-[1.025]",
          imageClassName,
        )}
      />
      {isPlaceholder && badge && (
        <span className="absolute right-3 top-3 z-10 rounded-full border border-white/25 bg-navy-deep/70 px-2.5 py-1 text-[0.52rem] font-bold uppercase tracking-[0.17em] text-white/85 backdrop-blur-sm">
          {badgeLabel}
        </span>
      )}
      {overlay}
    </div>
  );
}
