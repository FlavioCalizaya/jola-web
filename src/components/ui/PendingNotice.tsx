import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

export function PendingNotice({
  title,
  body,
  tone = "dark",
  className,
}: {
  title: string;
  body: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-4 border p-6 sm:p-7",
        tone === "light"
          ? "border-white/15 bg-white/[0.04] text-white/75"
          : "border-navy/10 bg-mist text-ink-soft",
        className,
      )}
    >
      <Info
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-5 shrink-0",
          tone === "light" ? "text-gold-soft" : "text-teal-deep",
        )}
        strokeWidth={1.5}
      />
      <div>
        <p
          className={cn(
            "font-sans text-xs font-bold uppercase tracking-[0.18em]",
            tone === "light" ? "text-gold-soft" : "text-navy",
          )}
        >
          {title}
        </p>
        <p className="mt-2 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
