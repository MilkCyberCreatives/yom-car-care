// src/app/components/Footer.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import LocaleLink from "@/app/components/LocaleLink";
import { useI18n } from "@/hooks/useI18n";

/**
 * Footer (Premium + Functional)
 * ✅ Logo not priority (speed)
 * ✅ Animated scroll-to-top button (doesn't clash with WhatsApp)
 * ✅ Button shows after scrolling (performance-friendly)
 */

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const copy = useMemo(() => {
    return {
      addressTitle: isFR ? "Adresse" : "Address",
      productsTitle: isFR ? "Produits" : "Products",
      infoTitle: isFR ? "Infos" : "Info",
      faq: "FAQ",
      contact: isFR ? "Contact" : "Contact",
      legalArea: isFR ? "Espace légal" : "Legal Area",
      privacy: isFR ? "Politique de confidentialité" : "Privacy Policy",
      cookie: isFR ? "Politique des cookies" : "Cookie Policy",
      terms: isFR ? "Conditions générales d’utilisation" : "General Terms of Use",
      rights: isFR ? "Tous droits réservés." : "All rights reserved.",
      designedBy: isFR ? "Conçu & développé par" : "Designed & developed by",
      cats: {
        exterior: isFR ? "Extérieur" : "Exterior",
        interior: isFR ? "Intérieur" : "Interior",
        air: isFR ? "Désodorisants" : "Air Fresheners",
        detailing: isFR ? "Détailling" : "Detailing",
        accessories: isFR ? "Accessoires" : "Accessories",
      },
    };
  }, [isFR]);

  const [showTop, setShowTop] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const next = y > 700;
        setShowTop((prev) => (prev === next ? prev : next));
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduced = prefersReducedMotion();
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={[
          "fixed right-5 bottom-24 z-[80]",
          "grid h-12 w-12 place-items-center rounded-full",
          "border border-white/15 bg-black/40 text-white backdrop-blur",
          "shadow-[0_12px_30px_rgba(0,0,0,0.55)]",
          "transition-all duration-300",
          showTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none",
          "hover:bg-black/55 hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
        ].join(" ")}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
        </svg>
      </button>

      <footer className="mt-16 border-t border-white/10 bg-zinc-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <Image src="/logo.svg" alt="YOM Car Care" width={220} height={64} className="h-14 w-auto md:h-16" />
              </div>

              <div className="mt-6 flex flex-col items-start gap-2">
                <a
                  href="tel:+243848994045"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
                  aria-label="Call +243 84 899 4045"
                >
                  <PhoneIcon className="h-4 w-4" />
                  <span>+243 84 899 4045</span>
                </a>

                <a
                  href="mailto:info@yomcarcare.com"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
                  aria-label="Email info@yomcarcare.com"
                >
                  <MailIcon className="h-4 w-4" />
                  <span className="truncate">info@yomcarcare.com</span>
                </a>
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold">{copy.addressTitle}</div>
              <address className="mt-3 not-italic leading-7 text-white/80">
                538 Avenue Kipopo
                <br />
                Golf Malela
                <br />
                Lubumbashi
              </address>
            </div>

            <nav aria-label="Products" className="lg:pl-6">
              <div className="text-lg font-semibold">{copy.productsTitle}</div>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/products/exterior">
                    {copy.cats.exterior}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/products/interior">
                    {copy.cats.interior}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/products/air-fresheners">
                    {copy.cats.air}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/products/detailing">
                    {copy.cats.detailing}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/products/accessories">
                    {copy.cats.accessories}
                  </LocaleLink>
                </li>
              </ul>
            </nav>

            <nav aria-label="Information" className="lg:pl-6">
              <div className="text-lg font-semibold">{copy.infoTitle}</div>
              <ul className="mt-3 space-y-2 text-white/80">
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/terms#faq">
                    {copy.faq}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/contact">
                    {copy.contact}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/legal-area">
                    {copy.legalArea}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/privacy-policy">
                    {copy.privacy}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/cookie-policy">
                    {copy.cookie}
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white hover:underline" href="/terms">
                    {copy.terms}
                  </LocaleLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-white/60 md:flex-row">
            <div>
              © {year} YOM Car Care. {copy.rights}
            </div>
            <div className="text-center">
              {copy.designedBy}{" "}
              <a
                href="https://milkcybercreatives.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-white hover:underline"
              >
                Milk Cyber Creatives
              </a>
              .
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------------- Icons (pure SVG, no deps) ---------------- */

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3.75A1.5 1.5 0 0 1 3.75 2.25h2.25c.621 0 1.155.417 1.31 1.02l.86 3.439a1.35 1.35 0 0 1-.341 1.29l-1.45 1.45a15 15 0 0 0 6.292 6.292l1.45-1.45a1.35 1.35 0 0 1 1.29-.341l3.44.86c.602.155 1.02.689 1.02 1.31v2.25a1.5 1.5 0 0 1-1.5 1.5h-.75C9.372 20.25 3.75 14.628 3.75 7.5v-.75z"
      />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5 12 13l9-5.5M4.5 6h15A1.5 1.5 0 0 1 21 7.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9A1.5 1.5 0 0 1 4.5 6Z"
      />
    </svg>
  );
}
