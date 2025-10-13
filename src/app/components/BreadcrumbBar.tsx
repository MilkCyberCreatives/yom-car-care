"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { Fragment, useMemo } from "react";

/**
 * Turn "/en/products/exterior/foam-wash" into:
 * [
 *   { label: "Home", href: "/en" },
 *   { label: "Products", href: "/en/products" },
 *   { label: "Exterior", href: "/en/products/exterior" },
 *   { label: "Foam wash", href: "/en/products/exterior/foam-wash" }
 * ]
 *
 * All hrefs are typed as Route to satisfy `typedRoutes`.
 */
function useBreadcrumbs() {
  const pathname = usePathname() || "/en"; // default to /en if undefined
  // Segments without empty strings
  const parts = pathname.split("/").filter(Boolean);

  // Detect locale (assumes first segment is a locale like "en" or "fr")
  const supported = new Set(["en", "fr"]);
  const [maybeLocale, ...rest] = parts;
  const locale = supported.has(maybeLocale ?? "") ? (maybeLocale as "en" | "fr") : "en";

  // Rebuild from the detected locale onward
  const segments = [locale, ...rest];

  return useMemo(() => {
    const items: { label: string; href: Route }[] = [];

    // Helper: accumulate a path and type as Route
    let acc = "";
    for (let i = 0; i < segments.length; i++) {
      acc += `/${segments[i]}`;

      // Label: humanize the segment (you can add custom maps if needed)
      const raw = segments[i];
      const label =
        i === 0
          ? "Home"
          : decodeURIComponent(raw)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

      const href = acc as Route; // ✅ typed route
      items.push({ label, href });
    }

    return items;
  }, [segments]);
}

export default function BreadcrumbBar() {
  const crumbs = useBreadcrumbs();

  // If we only have the locale root (e.g., "/en"), you can choose to hide the bar.
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <div className="border-b border-white/10 bg-black/20">
      <nav className="container-px py-2 text-sm text-white/70" aria-label="Breadcrumb">
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <Fragment key={c.href}>
              {!isLast ? (
                <>
                  <Link href={c.href} className="hover:underline">
                    {c.label}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              ) : (
                <span aria-current="page" className="text-white">
                  {c.label}
                </span>
              )}
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
}
