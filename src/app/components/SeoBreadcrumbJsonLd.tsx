"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

/**
 * Emits schema.org BreadcrumbList based on current pathname.
 * Helps Google show breadcrumbs in results (SEO win).
 */
export default function SeoBreadcrumbJsonLd() {
  const pathname = (usePathname() || "/").replace(/\/+$/, "") || "/";
  if (pathname === "/" || pathname === "/fr") return null;

  const segs = pathname.split("/").filter(Boolean);
  const base = "https://yomcarcare.com";

  const itemListElement = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
    ...segs.map((seg, i) => {
      const url = `${base}/` + segs.slice(0, i + 1).join("/");
      return {
        "@type": "ListItem",
        position: i + 2,
        name: pretty(seg),
        item: url,
      };
    }),
  ];

  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <Script
      id="jsonld-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function pretty(s: string) {
  const map: Record<string, string> = {
    products: "Products",
    about: "About Us",
    contact: "Contact",
    "air-fresheners": "Air Fresheners",
    detailing: "Detailing",
    accessories: "Accessories",
    interior: "Interior",
    exterior: "Exterior",
  };
  return map[s] ?? s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
