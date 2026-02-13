// src/app/components/TopBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, ArrowRightLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

import { useI18n } from "@/hooks/useI18n";
import { isLocale, type Locale, defaultLocale } from "@/i18n/config";

/* ---------------- helpers ---------------- */

function normalizePath(p: string) {
  if (!p) return "/";
  const out = p.replace(/\/{2,}/g, "/");
  return out === "" ? "/" : out;
}

function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const clean = normalizePath(pathname);
  const parts = clean.split("/");
  const maybe = parts[1];

  if (isLocale(maybe)) {
    const rest = "/" + parts.slice(2).join("/");
    return { locale: maybe, rest: normalizePath(rest) };
  }

  return { locale: defaultLocale, rest: clean };
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

/* ---------------- component ---------------- */

export default function TopBar() {
  const pathname = usePathname() || "/";
  const { t, locale } = useI18n();
  const isFR = locale === "fr";

  const reducedRef = useRef(false);

  // ✅ Premium “present” state (very light)
  const [mounted, setMounted] = useState(false);

  // ✅ Optional: show compact “copied” toast when user clicks phone/email
  const [copied, setCopied] = useState<null | "phone" | "email">(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();

    // tiny fade-in
    const id = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  const { rest } = useMemo(() => splitLocale(pathname), [pathname]);

  // Keep explicit locale prefixes so we do not rely on redirects.
  const toEN = useMemo(() => normalizePath(`/en${rest}`), [rest]);
  const toFR = useMemo(() => normalizePath(`/fr${rest}`), [rest]);

  const showToast = useCallback((k: "phone" | "email") => {
    setCopied(k);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setCopied(null), 1200);
  }, []);

  const copyText = useCallback(async (txt: string, kind: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(txt);
      showToast(kind);
    } catch {
      // ignore if clipboard not available
    }
  }, [showToast]);

  const copy = useMemo(
    () => ({
      doubleClickToCopy: isFR ? "Double-cliquez pour copier" : "Double-click to copy",
      phoneCopied: isFR ? "Telephone copie" : "Phone copied",
      emailCopied: isFR ? "Email copie" : "Email copied",
      language: isFR ? "Langue" : "Language",
    }),
    [isFR]
  );

  return (
    <div
      className={[
        "w-full border-b border-white/10",
        "bg-black text-white/80 text-[13px]",
        "transition-all duration-300",
        reducedRef.current ? "" : mounted ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      <div className="container-px relative flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between">
        {/* LEFT: address, phone, email */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} className="text-white/60" />
            <span className="text-white/80">
              {t.common.address_line1}, {t.common.address_line2}, {t.common.address_city}
            </span>
          </span>

          {/* Phone (hover + subtle lift) */}
          <a
            href="tel:+243848994045"
            className="inline-flex items-center gap-1 transition hover:text-white hover:-translate-y-[1px] active:translate-y-0"
            onDoubleClick={(e) => {
              // double-click to copy (desktop nice-to-have)
              e.preventDefault();
              copyText("+243 84 899 4045", "phone");
            }}
            title={copy.doubleClickToCopy}
          >
            <Phone size={14} className="text-white/60" />
            +243 84 899 4045
          </a>

          {/* Email (hover + subtle lift) */}
          <a
            href={`mailto:${t.common.email}`}
            className="inline-flex items-center gap-1 transition hover:text-white hover:-translate-y-[1px] active:translate-y-0"
            onDoubleClick={(e) => {
              e.preventDefault();
              copyText(String(t.common.email || "info@yomcarcare.com"), "email");
            }}
            title={copy.doubleClickToCopy}
          >
            <Mail size={14} className="text-white/60" />
            {t.common.email}
          </a>

          {/* Tiny toast */}
          {copied ? (
            <span className="ml-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[12px] text-white/80">
              {copied === "phone" ? copy.phoneCopied : copy.emailCopied}
            </span>
          ) : null}
        </div>

        {/* RIGHT: language toggle */}
        <div className="flex items-center gap-2 text-xs md:text-[13px]">
          <span className="inline-flex items-center gap-1 text-white/50">
            <ArrowRightLeft size={14} />
            <span className="hidden sm:inline">{copy.language}</span>
          </span>

          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            <Link
              href={toEN}
              className={[
                "px-3 py-1 rounded-full transition",
                !isFR
                  ? "bg-white/10 text-white font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5",
              ].join(" ")}
              aria-current={!isFR ? "true" : undefined}
              prefetch
            >
              EN
            </Link>

            <Link
              href={toFR}
              className={[
                "px-3 py-1 rounded-full transition",
                isFR
                  ? "bg-white/10 text-white font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5",
              ].join(" ")}
              aria-current={isFR ? "true" : undefined}
              prefetch
            >
              FR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
