import type { MetadataRoute } from "next";

import { getAllProducts, catSlug } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

const NOW = new Date();
const LOCALES: Array<"en" | "fr"> = ["en", "fr"];

const STATIC_ROUTES = [
  "/",
  "/about",
  "/products",
  "/contact",
  "/faq",
  "/legal-area",
  "/privacy-policy",
  "/cookie-policy",
  "/terms",
  "/compare",
  "/enquiry",
] as const;

function localizedPath(locale: "en" | "fr", path: string) {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

function alternatesFor(path: string) {
  return {
    languages: {
      en: absoluteUrl(localizedPath("en", path)),
      fr: absoluteUrl(localizedPath("fr", path)),
      "x-default": absoluteUrl(localizedPath("en", path)),
    } as Record<string, string>,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const categories = Array.from(new Set(products.map((product) => catSlug(product.category))));

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    STATIC_ROUTES.map((path) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      lastModified: NOW,
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1 : 0.7,
      alternates: alternatesFor(path),
    }))
  );

  const categoryEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    categories.map((category) => {
      const path = `/products/${category}`;
      return {
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: NOW,
        changeFrequency: "weekly",
        priority: 0.75,
        alternates: alternatesFor(path),
      };
    })
  );

  const productEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    products.map((product) => {
      const path = `/products/${catSlug(product.category)}/${product.slug}`;
      return {
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: NOW,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: alternatesFor(path),
      };
    })
  );

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
