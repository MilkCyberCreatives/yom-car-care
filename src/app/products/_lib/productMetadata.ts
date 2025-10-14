// src/app/products/_lib/productMetadata.ts
import type { Metadata } from "next";
import { products, type ProductData } from "@/data/products";

/**
 * Some older items may still have `img` or `description` fields.
 * Widen locally so we can read them safely without breaking ProductData.
 */
type ProductWithLegacy = ProductData & {
  img?: string;
  description?: string;
};

function primaryImage(p?: ProductWithLegacy): string | undefined {
  return p?.images?.[0] ?? p?.img ?? undefined;
}

/**
 * Build Metadata for a product page.
 * - Safe against legacy fields
 * - Locale-aware canonicals
 * - Uses allowed OpenGraph type ("website")
 */
export function buildProductMetadata(
  category: string,
  slug: string,
  locale: "en" | "fr" = "en"
): Metadata {
  const product = products.find(
    (p) => p.category === category && p.slug === slug
  ) as ProductWithLegacy | undefined;

  const baseTitle = product ? product.name : "Product";
  const title = `${baseTitle} • YOM Car Care`;

  const fallbackDesc =
    locale === "fr"
      ? "Explorez les produits YOM Car Care à Lubumbashi. Paiement à la livraison."
      : "Explore YOM Car Care products in Lubumbashi. Cash on Delivery.";

  const description =
    product?.description ??
    (product
      ? locale === "fr"
        ? `Achetez ${product.name} à Lubumbashi. Paiement à la livraison.`
        : `Buy ${product.name} in Lubumbashi. Cash on Delivery.`
      : fallbackDesc);

  // Locale-aware canonical
  const path = `/products/${category}/${slug}`;
  const canonical = locale === "fr" ? `/fr${path}` : path;

  const img = primaryImage(product);
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
      type: "website",
      images,
    },
  };
}
