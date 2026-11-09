import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "navy"
  | "secondary"
  | "light"
  | "outlineLight"
  | "ghost";

type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-navy-deep shadow-[0_12px_30px_-16px_rgba(198,161,91,0.9)] hover:bg-gold-soft hover:shadow-[0_16px_35px_-14px_rgba(198,161,91,0.75)]",
  navy: "bg-navy text-white hover:bg-navy-deep",
  secondary:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  light: "bg-white text-navy hover:bg-cream",
  outlineLight:
    "border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy-deep",
  ghost: "px-0 text-navy hover:text-teal",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.64rem]",
  md: "px-6 py-3.5 sm:px-7",
  lg: "px-7 py-4 sm:px-8",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = true,
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "children" | "className"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.8}
        />
      )}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.8}
        />
      )}
    </button>
  );
}
