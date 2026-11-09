"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav } from "@/lib/navigation-data";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "../ui/Logo";
import { ButtonLink } from "../ui/Button";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const t = useTranslations("Nav");
  const common = useTranslations("Common");
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;
  const tone = transparent ? "light" : "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const panel = mobilePanelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openDropdown) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-nav-dropdown]")) setOpenDropdown(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openDropdown]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          transparent
            ? "bg-gradient-to-b from-navy-deep/55 to-transparent"
            : "border-b border-navy/8 bg-cream/95 shadow-[0_10px_40px_-30px_rgba(18,38,61,0.55)] backdrop-blur-xl",
        )}
      >
        <div className="shell flex h-20 items-center justify-between gap-4 lg:h-[5.5rem]">
          <Link
            href="/"
            aria-label="JOLA School — home"
            className="shrink-0 rounded-sm"
          >
            <Logo tone={tone} />
          </Link>

          <nav
            aria-label={t("mainNavigation")}
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {primaryNav.map((item) => {
              const active = isActivePath(pathname, item.href);

              if (!item.children) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "relative py-2 text-[0.64rem] font-bold uppercase tracking-[0.15em] transition-colors xl:text-[0.68rem] xl:tracking-[0.17em]",
                      tone === "light"
                        ? "text-white/78 hover:text-white"
                        : "text-navy/70 hover:text-navy",
                      active &&
                        (tone === "light" ? "text-white" : "text-navy"),
                    )}
                  >
                    {t(item.key)}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
                        active ? "w-full" : "w-0",
                      )}
                    />
                  </Link>
                );
              }

              const menuOpen = openDropdown === item.key;

              return (
                <div
                  key={item.key}
                  data-nav-dropdown
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="flex items-center gap-0.5">
                    <Link
                      href={item.href}
                      className={cn(
                        "py-2 text-[0.64rem] font-bold uppercase tracking-[0.15em] transition-colors xl:text-[0.68rem] xl:tracking-[0.17em]",
                        tone === "light"
                          ? "text-white/78 hover:text-white"
                          : "text-navy/70 hover:text-navy",
                        active &&
                          (tone === "light" ? "text-white" : "text-navy"),
                      )}
                    >
                      {t(item.key)}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={menuOpen}
                      aria-haspopup="true"
                      aria-label={`${t(item.key)} — ${common("menu")}`}
                      onClick={() =>
                        setOpenDropdown(menuOpen ? null : item.key)
                      }
                      className={cn(
                        "rounded-sm p-1 transition-colors",
                        tone === "light"
                          ? "text-white/60 hover:text-white"
                          : "text-navy/45 hover:text-navy",
                      )}
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-3 transition-transform duration-200",
                          menuOpen && "rotate-180",
                        )}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? false
                            : { opacity: 0, y: 8 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4"
                      >
                        <div className="overflow-hidden rounded-sm border border-navy/8 bg-cream p-2 shadow-[0_28px_60px_-28px_rgba(18,38,61,0.4)]">
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block rounded-sm px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-navy/65 transition-colors hover:bg-mist hover:text-navy"
                            >
                              {t(`${item.key}Menu.${child.key}`)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <LanguageSwitcher tone={tone} />
            <ButtonLink
              href="/admissions/book-a-visit"
              variant={transparent ? "primary" : "navy"}
              size="sm"
            >
              {common("bookVisit")}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={t("openMenu")}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              tone === "light"
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-navy/15 text-navy hover:bg-navy/5",
            )}
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-3.5 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={t("mainNavigation")}
            id="mobile-navigation"
          >
            <button
              type="button"
              aria-label={t("closeMenu")}
              className="absolute inset-0 h-full w-full cursor-default bg-navy-deep/65 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              tabIndex={-1}
            />
            <motion.div
              ref={mobilePanelRef}
              initial={
                prefersReducedMotion ? false : { x: "100%" }
              }
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-y-0 right-0 flex h-[100dvh] w-full max-w-md flex-col bg-cream shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-navy/8 px-6 py-5">
                <Logo />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t("closeMenu")}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy/5"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-7">
                  {primaryNav.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "font-display text-[2rem] leading-none text-navy transition-colors hover:text-teal-deep",
                          isActivePath(pathname, item.href) &&
                            "text-teal-deep",
                        )}
                      >
                        {t(item.key)}
                      </Link>
                      {item.children && (
                        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 border-l border-navy/10 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-navy/55 transition-colors hover:text-navy"
                            >
                              {t(`${item.key}Menu.${child.key}`)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-navy/8 px-6 py-6">
                <div className="mb-5 flex items-center justify-between">
                  <LanguageSwitcher />
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-navy/40">
                    Cochabamba, Bolivia
                  </span>
                </div>
                <ButtonLink
                  href="/admissions/book-a-visit"
                  variant="primary"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {common("bookVisit")}
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
