import type { Metadata } from "next";
import { products, type ProductData } from "@/data/products";

/** Some products still use a legacy `img` field. Support both. */
type ProductWithLegacy = ProductData & { img?: string };

function thumbOf(p?: ProductWithLegacy): string | "" {
  return p?.images?.[0] ?? p?.img ?? "";
}

/**
 * Build Next.js <Metadata> for a product page using fields that exist on ProductData
 * (plus legacy `img` if present).
 */
export function buildProductMetadata(
  category: string,
  slug: string,
  locale: "en" | "fr" = "en"
): Metadata {
  const product = products.find(
    (p) => p.category === category && p.slug === slug
  ) as ProductWithLegacy | undefined;

  const title = product
    ? `${product.name} • YOM Car Care`
    : "Product • YOM Car Care";

  const description = product
    ? locale === "fr"
      ? `Achetez ${product.name} à Lubumbashi. Paiement à la livraison.`
      : `Buy ${product.name} in Lubumbashi. Cash on Delivery.`
    : "Explore YOM Car Care products.";

  // Locale-aware canonical path
  const path = `/products/${category}/${slug}`;
  const canonical = locale === "fr" ? `/fr${path}` : path;

  const img = thumbOf(product);
  const images = img ? [img] : [];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: path,
        fr: `/fr${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "YOM Car Care",
      // Keep to allowed types for Next Metadata
      type: "website",
      images,
    },
  };
}
