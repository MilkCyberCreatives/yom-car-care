"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { useMemo } from "react";

/**
 * Detect current locale from the pathname (first segment),
 * then build a typed locale-aware href (e.g., "/en/products").
 */
function useLocaleLinkBuilder() {
  const pathname = usePathname() || "/en";
  const parts = pathname.split("/").filter(Boolean);
  const supported = new Set(["en", "fr"]);
  const locale = supported.has(parts[0] ?? "") ? (parts[0] as "en" | "fr") : "en";

  // helper to produce a typed Route
  return useMemo(() => {
    const l = (path: string) =>
      (`/${locale}${path.startsWith("/") ? path : `/${path}`}`) as Route;
    return { locale, l };
  }, [locale]);
}

export default function CTABanner() {
  const { l } = useLocaleLinkBuilder();

  return (
    <section className="container-px my-8">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--brand-blue)]/20 to-transparent p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-semibold">Ready to refresh your car?</h3>
        <p className="text-white/80 mt-2">
          Explore the catalog or message us for a tailored recommendation.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {/* ✅ typed, locale-aware route */}
          <Link
            href={l("/products")}
            className="btn-ghost bg-white/10 hover:bg-white/20"
          >
            Browse Products
          </Link>

          <a href="tel:+243848994045" className="btn-ghost">
            Call +243 84 899 4045
          </a>

          <a
            href="https://wa.me/243848994045"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
