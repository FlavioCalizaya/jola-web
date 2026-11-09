import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  className,
  compact = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 58"
        role="presentation"
        className={cn(
          "h-11 w-auto shrink-0",
          compact && "h-9",
          isLight ? "text-white" : "text-navy",
        )}
        fill="none"
      >
        <path
          d="M24 2.5 44 10.9v18.4c0 12.2-8.3 21.5-20 26.2C12.3 50.8 4 41.5 4 29.3V10.9L24 2.5Z"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.1"
        />
        <path
          d="M29.2 16.8v17.1c0 5.7-3.7 9.2-8.8 9.2-4.4 0-7.4-2.3-8.8-6.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M16.6 16.8h13.1"
          stroke="#C6A15B"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="24" cy="36.6" r="1.35" fill="#C6A15B" />
      </svg>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display leading-none tracking-[0.28em]",
            compact ? "text-[1.35rem]" : "text-[1.6rem]",
            isLight ? "text-white" : "text-navy",
          )}
        >
          JOLA
        </span>
        <span
          className={cn(
            "mt-1 font-sans text-[0.5rem] font-bold uppercase tracking-[0.52em]",
            isLight ? "text-white/65" : "text-navy/55",
          )}
        >
          School
        </span>
      </span>
    </span>
  );
}
