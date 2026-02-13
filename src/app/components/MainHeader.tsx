// src/app/components/MainHeader.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

import SearchBar from "./SearchBar";
import LocaleLink from "./LocaleLink";
import CartIndicator from "./CartIndicator";

import { useI18n } from "@/hooks/useI18n";
import { isLocale } from "@/i18n/config";

type NavItem = { href: string; label: string };

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function MainHeader() {
  const rawPath = usePathname() || "/";

  // ✅ Locale-agnostic path for active states
  const pathname = useMemo(() => {
    const parts = rawPath.split("/");
    if (parts.length > 1 && isLocale(parts[1])) {
      const rest = "/" + parts.slice(2).join("/");
      return rest === "/" ? "/" : rest.replace(/\/+$/, "");
    }
    return rawPath === "/" ? "/" : rawPath.replace(/\/+$/, "");
  }, [rawPath]);

  const { t } = useI18n();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);

  // ✅ Desktop categories open state
  const [catsOpen, setCatsOpen] = useState(false);

  // ✅ Scroll progress (premium)
  const [progress, setProgress] = useState(0);
  const reducedRef = useRef(false);
  const progressRef = useRef(0);
  const progressTickRef = useRef(false);

  // ✅ refs for robust hover/focus (no flicker)
  const catsWrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // Main nav items (ORDER): Products, Categories, Brands, About, Contact
  const NAV_RIGHT = useMemo<NavItem[]>(
    () => [
      { href: "/products", label: t.common.products },
      { href: "/brands", label: t.common.brands ?? "Brands" },
      { href: "/about", label: t.common.about },
      { href: "/contact", label: t.common.contact },
    ],
    [t]
  );

  const CATEGORIES = useMemo<NavItem[]>(
    () => [
      { href: "/products/exterior", label: t.cats.exterior },
      { href: "/products/interior", label: t.cats.interior },
      { href: "/products/air-fresheners", label: t.cats.air },
      { href: "/products/detailing", label: t.cats.detailing },
      { href: "/products/accessories", label: t.cats.accessories },
    ],
    [t]
  );

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileCatsOpen(false);
    setCatsOpen(false);
  }, [rawPath]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );

  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openCats = useCallback(() => {
    cancelCloseTimer();
    setCatsOpen(true);
  }, [cancelCloseTimer]);

  // ✅ tiny delay on close prevents “hover fall-through” flicker
  const scheduleCloseCats = useCallback(() => {
    cancelCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setCatsOpen(false), 120);
  }, [cancelCloseTimer]);

  const closeCatsNow = useCallback(() => {
    cancelCloseTimer();
    setCatsOpen(false);
  }, [cancelCloseTimer]);

  // ✅ Close dropdown if click happens outside it
  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      const wrap = catsWrapRef.current;
      if (!wrap) return;
      if (wrap.contains(e.target as Node)) return;
      setCatsOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  // ✅ Robust blur handling: close only if focus leaves wrapper
  const onCatsBlurCapture = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      const next = e.relatedTarget as Node | null;
      const wrap = catsWrapRef.current;
      if (!wrap) return;
      if (next && wrap.contains(next)) return;
      scheduleCloseCats();
    },
    [scheduleCloseCats]
  );

  // ✅ Keyboard: Escape closes dropdown, ArrowDown focuses first item
  const onCatsKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCatsNow();
        const btn = catsWrapRef.current?.querySelector<HTMLButtonElement>("[data-cats-trigger]");
        btn?.focus();
        return;
      }

      if (e.key === "ArrowDown") {
        // If trigger focused, open and jump into menu
        const el = document.activeElement as HTMLElement | null;
        if (el?.dataset?.catsTrigger !== undefined || el?.getAttribute("data-cats-trigger") !== null) {
          e.preventDefault();
          openCats();
          requestAnimationFrame(() => {
            const first = catsWrapRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
            first?.focus();
          });
        }
      }
    },
    [closeCatsNow, openCats]
  );

  // ✅ Scroll progress bar (fast + rAF + minimal updates)
  useEffect(() => {
    if (typeof window === "undefined") return;

    reducedRef.current = prefersReducedMotion();

    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight || 1;
      const clientHeight = doc.clientHeight || window.innerHeight || 1;
      const max = Math.max(1, scrollHeight - clientHeight);
      const p = Math.min(1, Math.max(0, scrollTop / max));

      // Update only if changed meaningfully to avoid extra renders
      if (Math.abs(p - progressRef.current) > 0.01) {
        progressRef.current = p;
        setProgress(p);
      }

      progressTickRef.current = false;
    };

    const onScroll = () => {
      if (progressTickRef.current) return;
      progressTickRef.current = true;
      requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="z-[999] bg-[var(--brand-blue)] text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      {/* ✅ Thin scroll progress bar */}
      <div className="h-[3px] w-full bg-white/10">
        <div
          className={cx(
            "h-full bg-white/85",
            reducedRef.current ? "" : "transition-[transform] duration-150 ease-out"
          )}
          style={{
            transformOrigin: "0% 50%",
            transform: `scaleX(${progress})`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-px flex items-center gap-4 justify-between py-3">
        {/* Logo */}
        <LocaleLink
          href="/"
          className={cx(
            "flex items-center gap-3",
            "transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
          )}
          aria-label="YOM Car Care — Home"
        >
          <Image
            src="/logo.svg"
            alt="YOM Car Care"
            width={170}
            height={44}
            priority
            className="h-auto w-[150px] md:w-[170px]"
          />
        </LocaleLink>

        {/* Search (desktop) */}
        <div className="hidden md:block flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Desktop nav + actions */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {/* Products */}
            <LocaleLink
              href="/products"
              className={cx(
                "relative text-white/90 hover:text-white transition",
                "hover:-translate-y-[1px] active:translate-y-0",
                isActive("/products") && "text-white font-semibold",
                // premium underline
                "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white/90 after:transition-all after:duration-300 hover:after:w-full",
                isActive("/products") && "after:w-full"
              )}
              aria-current={isActive("/products") ? "page" : undefined}
            >
              {t.common.products}
            </LocaleLink>

            {/* Categories dropdown */}
            <div
              ref={catsWrapRef}
              className="relative"
              onMouseEnter={openCats}
              onMouseLeave={scheduleCloseCats}
              onFocusCapture={openCats}
              onBlurCapture={onCatsBlurCapture}
              onKeyDown={onCatsKeyDown}
            >
              <button
                type="button"
                data-cats-trigger
                className={cx(
                  "relative text-white/90 hover:text-white transition inline-flex items-center gap-1",
                  "hover:-translate-y-[1px] active:translate-y-0",
                  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white/90 after:transition-all after:duration-300 hover:after:w-full",
                  catsOpen && "text-white after:w-full"
                )}
                aria-haspopup="menu"
                aria-expanded={catsOpen}
              >
                {t.common.categories}
                <ChevronDown
                  size={16}
                  className={cx("opacity-90 transition-transform duration-200", catsOpen && "rotate-180")}
                />
              </button>

              {/* invisible hover bridge prevents flicker */}
              <div className="absolute left-0 top-full h-3 w-64" aria-hidden="true" />

              <div
                className={cx(
                  "absolute left-0 top-full w-64 rounded-xl border border-white/10",
                  "bg-zinc-900/95 p-2 shadow-2xl backdrop-blur",
                  "transition-all duration-150 origin-top",
                  catsOpen
                    ? "opacity-100 visible translate-y-2 scale-100"
                    : "opacity-0 invisible translate-y-0 scale-[0.98]"
                )}
                role="menu"
                aria-label="Categories"
              >
                {CATEGORIES.map((c) => (
                  <LocaleLink
                    key={c.href}
                    href={c.href}
                    className={cx(
                      "block rounded-lg px-3 py-2 text-white/85 transition",
                      "hover:text-white hover:bg-white/7",
                      "focus:outline-none focus:bg-white/7"
                    )}
                    role="menuitem"
                    tabIndex={catsOpen ? 0 : -1}
                    onClick={closeCatsNow}
                    onMouseEnter={cancelCloseTimer}
                  >
                    {c.label}
                  </LocaleLink>
                ))}
              </div>
            </div>

            {/* Brands, About, Contact */}
            {NAV_RIGHT.filter((i) => i.href !== "/products").map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                className={cx(
                  "relative text-white/90 hover:text-white transition",
                  "hover:-translate-y-[1px] active:translate-y-0",
                  isActive(item.href) && "text-white font-semibold",
                  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white/90 after:transition-all after:duration-300 hover:after:w-full",
                  isActive(item.href) && "after:w-full"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </LocaleLink>
            ))}
          </nav>

          {/* Call Now (UNCHANGED styling) */}
          <a
            href="tel:+243848994045"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
          >
            <Phone size={18} />
            {t.common.call_now}
          </a>

          {/* Cart (unchanged) */}
          <CartIndicator />
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md bg-white/15 hover:bg-white/25 transition"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          type="button"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[2000]">
          {/* overlay */}
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
            type="button"
          />
          {/* panel */}
          <div
            className={cx(
              "absolute right-0 top-0 h-full w-[86%] max-w-sm bg-zinc-950 text-white",
              "border-l border-white/10 shadow-2xl p-4 flex flex-col",
              reducedRef.current ? "" : "animate-in slide-in-from-right duration-200"
            )}
          >
            <div className="flex items-center justify-between">
              <LocaleLink
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <Image src="/logo.svg" alt="YOM Car Care" width={120} height={34} />
              </LocaleLink>

              <button
                className="p-2 rounded-lg hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                type="button"
              >
                <X />
              </button>
            </div>

            {/* search */}
            <div className="mt-4">
              <SearchBar className="w-full" />
            </div>

            {/* nav */}
            <nav className="mt-4 space-y-2">
              <LocaleLink
                href="/products"
                onClick={() => setMobileOpen(false)}
                className={cx(
                  "block rounded-lg px-3 py-2 text-base transition",
                  isActive("/products") ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/5"
                )}
                aria-current={isActive("/products") ? "page" : undefined}
              >
                {t.common.products}
              </LocaleLink>

              {/* Categories collapse */}
              <div className="mt-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-white/85 hover:bg-white/5 transition"
                  onClick={() => setMobileCatsOpen((v) => !v)}
                  aria-expanded={mobileCatsOpen}
                >
                  <span>{t.common.categories}</span>
                  <ChevronDown size={18} className={cx("transition-transform", mobileCatsOpen && "rotate-180")} />
                </button>

                <div
                  className={cx(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    mobileCatsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden mt-1 ml-2 flex flex-col">
                    {CATEGORIES.map((c) => (
                      <LocaleLink
                        key={c.href}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 transition"
                      >
                        {c.label}
                      </LocaleLink>
                    ))}
                  </div>
                </div>
              </div>

              {NAV_RIGHT.filter((n) => n.href !== "/products").map((item) => (
                <LocaleLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cx(
                    "block rounded-lg px-3 py-2 text-base transition",
                    isActive(item.href) ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/5"
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </LocaleLink>
              ))}
            </nav>

            {/* footer actions */}
            <div className="mt-auto pt-4 space-y-3">
              <a
                href="tel:+243848994045"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
              >
                <Phone size={18} />
                {t.common.call_now}
              </a>

              <CartIndicator className="w-full justify-center flex" />

              <p className="text-xs text-white/50 text-center leading-relaxed">
                {t.common.address_line1}, {t.common.address_line2}, {t.common.address_city}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
