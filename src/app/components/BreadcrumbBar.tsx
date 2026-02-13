"use client";

import Link from "@/app/components/LocaleLink";
import { useI18n } from "@/hooks/useI18n";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { Fragment, useEffect, useMemo, useRef } from "react";

function prettySlug(value: string) {
  return decodeURIComponent(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function useBreadcrumbs() {
  const pathname = usePathname() || "/en";
  const { locale, t } = useI18n();
  const isFR = locale === "fr";

  return useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const supported = new Set(["en", "fr"]);
    const [maybeLocale, ...rest] = parts;
    const normalizedLocale = supported.has(maybeLocale ?? "") ? (maybeLocale as "en" | "fr") : locale;
    const segments = [normalizedLocale, ...rest];

    const segmentLabels: Record<string, string> = {
      products: t.common.products,
      brands: t.common.brands,
      about: t.common.about,
      contact: t.common.contact,
      cart: isFR ? "Panier" : "Cart",
      compare: isFR ? "Comparer" : "Compare",
      faq: "FAQ",
      enquiry: isFR ? "Demande" : "Enquiry",
      search: isFR ? "Recherche" : "Search",
      terms: isFR ? "Conditions" : "Terms",
      "privacy-policy": isFR ? "Politique de confidentialite" : "Privacy Policy",
      "cookie-policy": isFR ? "Politique des cookies" : "Cookie Policy",
      "legal-area": isFR ? "Espace legal" : "Legal Area",
      success: isFR ? "Succes" : "Success",
      exterior: t.cats.exterior,
      interior: t.cats.interior,
      "air-fresheners": t.cats.air,
      detailing: t.cats.detailing,
      accessories: t.cats.accessories,
    };

    const items: { label: string; href: Route }[] = [];
    let acc = "";

    for (let i = 0; i < segments.length; i++) {
      acc += `/${segments[i]}`;
      const raw = segments[i];

      let label = "";
      if (i === 0) {
        label = isFR ? "Accueil" : "Home";
      } else if (segmentLabels[raw]) {
        label = segmentLabels[raw];
      } else {
        label = prettySlug(raw);
      }

      // Product detail pages: show clean product slug title on final crumb.
      if (i > 2 && segments[1] === "products") {
        label = prettySlug(raw);
      }

      items.push({ label, href: acc as Route });
    }

    return items;
  }, [isFR, locale, pathname, t]);
}

export default function BreadcrumbBar() {
  const { locale } = useI18n();
  const isFR = locale === "fr";
  const crumbs = useBreadcrumbs();
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Home route: no breadcrumb bar and no reserved height.
    if (crumbs.length <= 1) {
      document.documentElement.style.setProperty("--site-breadcrumb-h", "0px");
      return () => {
        document.documentElement.style.removeProperty("--site-breadcrumb-h");
      };
    }

    const bar = barRef.current;
    if (!bar) return;

    const applyHeight = () => {
      const h = bar.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--site-breadcrumb-h", `${Math.max(0, Math.round(h))}px`);
    };

    applyHeight();
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => applyHeight())
        : null;
    ro?.observe(bar);

    window.addEventListener("resize", applyHeight, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", applyHeight);
      document.documentElement.style.removeProperty("--site-breadcrumb-h");
    };
  }, [crumbs.length]);

  if (crumbs.length <= 1) return null;

  return (
    <div ref={barRef} className="bg-transparent">
      <nav
        className="container-px py-3 text-sm text-white/75"
        aria-label={isFR ? "Fil d Ariane" : "Breadcrumb"}
      >
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <Fragment key={c.href}>
              {!isLast ? (
                <>
                  <Link href={c.href} className="transition hover:text-white">
                    {c.label}
                  </Link>
                  <span className="mx-2 text-white/45">/</span>
                </>
              ) : (
                <span aria-current="page" className="font-medium text-white">
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
