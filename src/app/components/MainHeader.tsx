"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import SearchBar from "./SearchBar";
import { useI18n } from "@/hooks/useI18n";
import LocaleLink from "./LocaleLink";
import CartIndicator from "./CartIndicator";

type NavItem = { href: string; label: string };

export default function MainHeader() {
  const rawPath = usePathname() || "/";
  // Strip "/fr" so active states work no matter which locale we're on
  const pathname = rawPath.replace(/^\/fr(\/|$)/, "/");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const { t } = useI18n();

  // Top-level nav (Products, About, Contact)
  const NAV: NavItem[] = [
    { href: "/products", label: t.common.products },
    { href: "/about", label: t.common.about },
    { href: "/contact", label: t.common.contact },
  ];

  // Categories dropdown
  const CATEGORIES: NavItem[] = [
    { href: "/products/exterior", label: t.cats.exterior },
    { href: "/products/interior", label: t.cats.interior },
    { href: "/products/air-fresheners", label: t.cats.air },
    { href: "/products/detailing", label: t.cats.detailing },
    { href: "/products/accessories", label: t.cats.accessories },
  ];

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[999] bg-[var(--brand-blue)] text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      <div className="container-px flex items-center gap-4 justify-between py-3">
        {/* Logo → home (locale-aware) */}
        <LocaleLink
          href="/"
          className="flex items-center gap-3"
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
            {NAV.map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                className={`text-white/90 hover:text-white transition ${
                  isActive(item.href) ? "font-semibold text-white" : ""
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </LocaleLink>
            ))}

            {/* Categories dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="text-white/90 hover:text-white transition inline-flex items-center gap-1"
              >
                {t.common.categories} <ChevronDown size={16} className="opacity-90" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-opacity absolute left-0 mt-2 w-64 rounded-xl bg-zinc-900/95 border border-white/10 p-2 shadow-2xl">
                {CATEGORIES.map((c) => (
                  <LocaleLink
                    key={c.href}
                    href={c.href}
                    className="block rounded-lg px-3 py-2 text-white/85 hover:text-white hover:bg-white/5"
                  >
                    {c.label}
                  </LocaleLink>
                ))}
              </div>
            </div>
          </nav>

          {/* Call Now */}
          <a
            href="tel:+243848994045"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
          >
            <Phone size={18} />
            {t.common.call_now}
          </a>

          {/* Cart */}
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
          />
          {/* panel */}
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-zinc-950 text-white border-l border-white/10 shadow-2xl p-4 flex flex-col">
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

            {/* main nav */}
            <nav className="mt-4 space-y-2">
              {NAV.map((item) => (
                <LocaleLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base ${
                    isActive(item.href)
                      ? "bg-white/10 text-white"
                      : "text-white/85 hover:bg-white/5"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </LocaleLink>
              ))}

              {/* collapsible categories */}
              <div className="mt-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-white/85 hover:bg-white/5"
                  onClick={() => setMobileCatsOpen((v) => !v)}
                  aria-expanded={mobileCatsOpen}
                >
                  <span>{t.common.categories}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${mobileCatsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {mobileCatsOpen && (
                  <div className="mt-1 ml-2 flex flex-col">
                    {CATEGORIES.map((c) => (
                      <LocaleLink
                        key={c.href}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md px-3 py-2 text-white/80 hover:text-white hover:bg-white/5"
                      >
                        {c.label}
                      </LocaleLink>
                    ))}
                  </div>
                )}
              </div>
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
