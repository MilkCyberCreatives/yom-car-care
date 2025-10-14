import type { Metadata } from "next";
import { products, type ProductData } from "@/data/products";

function thumbsOf(p?: ProductData): string[] {
  const src = p?.images?.[0] ?? p?.img ?? "";
  return src ? [src] : [];
}

/**
 * Build Next.js <Metadata> for a product page using fields that exist on ProductData.
 * @param category product category (e.g. "exterior")
 * @param slug product slug
 * @param locale 'en' | 'fr' (default 'en')
 */
export function buildProductMetadata(
  category: string,
  slug: string,
  locale: "en" | "fr" = "en"
): Metadata {
  const product = products.find((p) => p.category === category && p.slug === slug);

  const title = product ? `${product.name} • YOM Car Care` : "Product • YOM Car Care";
  const description = product
    ? locale === "fr"
      ? `Achetez ${product.name} à Lubumbashi. Paiement à la livraison.`
      : `Buy ${product.name} in Lubumbashi. Cash on Delivery.`
    : "Explore YOM Car Care products.";

  // Build locale-aware canonical path
  const path = `/products/${category}/${slug}`;
  const canonical = locale === "fr" ? `/fr${path}` : path;

  const images = thumbsOf(product);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: path,              // /products/...
        fr: `/fr${path}`,      // /fr/products/...
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "YOM Car Care",
      // keep to allowed types for Next Metadata
      type: "website",
      images,
    },
  };
}
