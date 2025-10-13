"use client";

import { usePathname } from "next/navigation";
import type { Route } from "next";
import { useMemo } from "react";

/**
 * Builds typed, locale-aware internal links.
 * Detects the current locale from the first URL segment (e.g., /en, /fr).
 *
 * Usage:
 *   const { locale, l } = useLocaleLink();
 *   <Link href={l("/products")}>Products</Link>
 */
export default function useLocaleLink() {
  const pathname = usePathname() || "/en";
  const parts = pathname.split("/").filter(Boolean);
  const supported = new Set(["en", "fr"]);
  const locale = supported.has(parts[0] ?? "") ? (parts[0] as "en" | "fr") : "en";

  return useMemo(() => {
    const l = (path: string) =>
      (`/${locale}${path.startsWith("/") ? path : `/${path}`}`) as Route;
    return { locale, l };
  }, [locale]);
}
