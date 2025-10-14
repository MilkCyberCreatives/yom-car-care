"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import SearchBar from "../components/SearchBar";
import { useI18n } from "@/hooks/useI18n";
import LocaleLink from "./LocaleLink"; // ⬅️ fixed

type NavItem = { href: string; label: string };

export default function MainHeader() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const { t } = useI18n();

  const NAV: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/products", label: t.common.products },
    { href: "/about", label: t.common.about },
    { href: "/contact", label: t.common.contact },
  ];

  const CATEGORIES: NavItem[] = [
    { href: "/products/exterior", label: t.cats.exterior },
    { href: "/products/interior", label: t.cats.interior },
    { href: "/products/air-fresheners", label: t.cats.air },
    { href: "/products/detailing", label: t.cats.detailing },
    { href: "/products/accessories", label: t.cats.accessories },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname === "/fr" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[var(--brand-blue)] text-white">
      <div className="container-px flex items-center gap-4 justify-between py-3">
        {/* Logo */}
        <LocaleLink href="/" className="flex items-center gap-3" aria-label="YOM Car Care — Home">
          <Image
            src="/logo.svg"
            alt="YOM Car Care"
            width={150}
            height={40}
            priority
            className="h-auto w-[150px] md:w-[170px]"
          />
        </LocaleLink>

        {/* Search (desktop) */}
        <div className="hidden md:block flex-1">
          <SearchBar />
        </div>

        {/* Desktop nav + actions */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {NAV.map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? "font-semibold text-white" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </LocaleLink>
            ))}
            <div className="relative group">
              <button className="nav-link inline-flex items-center gap-1" type="button">
                {t.common.categories} <ChevronDown size={16} className="opacity-90" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute left-0 mt-2 w-64 rounded-xl bg-zinc-900/95 border border-white/10 p-2 shadow-2xl">
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
          <a href="tel:+243848994045" className="btn-ghost">
            <Phone size={18} />
            {t.common.call_now}
          </a>
          <LocaleLink href="/products" className="btn-primary">
            {t.common.browse}
          </LocaleLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-md bg-white/15 hover:bg.white/25"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          type="button"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-zinc-950 text-white border-l border-white/10 shadow-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <LocaleLink href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <Image src="/logo.svg" alt="YOM Car Care" width={120} height={34} />
              </LocaleLink>
              <button className="p-2 rounded-lg hover:bg-white/10" onClick={() => setMobileOpen(false)} aria-label="Close" type="button">
                <X />
              </button>
            </div>

            <div className="mt-4"><SearchBar className="w-full" /></div>

            <nav className="mt-4 space-y-2">
              {NAV.map((item) => (
                <LocaleLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base ${
                    isActive(item.href) ? "bg-white/10 text.white" : "text-white/85 hover:bg-white/5"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </LocaleLink>
              ))}
              <div className="mt-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-white/85 hover:bg-white/5"
                  onClick={() => setMobileCatsOpen((v) => !v)}
                  aria-expanded={mobileCatsOpen}
                >
                  <span>{t.common.categories}</span>
                  <ChevronDown size={18} className={`transition-transform ${mobileCatsOpen ? "rotate-180" : ""}`} />
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

            <div className="mt-auto pt-4 space-y-2">
              <a href="tel:+243848994045" className="btn-ghost w-full justify-center">
                <Phone size={18} />
                {t.common.call_now}
              </a>
              <LocaleLink href="/products" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                {t.common.browse}
              </LocaleLink>
              <p className="text-xs text-white/50 text-center">
                {t.common.address_line1}, {t.common.address_line2}, {t.common.address_city}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
