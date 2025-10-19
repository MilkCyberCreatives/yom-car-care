/* ---------------------------------------------
   Single source of truth for product listing
   - Scans /public/products/<category> subfolders
   - Merges prices from src/data/prices.ts (if present)
   - No external services required
---------------------------------------------- */

import fs from "fs";
import path from "path";

export type Currency = "USD" | "CDF" | string;

export type Product = {
  slug: string;
  name: string;
  category: string;     // Human label e.g. "Interior", "Exterior"
  price?: number;
  currency?: Currency;
  images?: string[];    // absolute paths starting with /products/...
  img?: string;         // absolute path for the primary image
};

export const CATEGORY_SLUGS = [
  "accessories",
  "air-fresheners",
  "detailing",
  "exterior",
  "interior",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const catSlug = (c: string) =>
  c.replace(/[^a-z0-9]+/gi, "-").toLowerCase() as CategorySlug;

const toTitle = (s: string) =>
  s
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

const labelFromSlug = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

const isImageFile = (f: string) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f);

/** Prefer category subfolder path when a bare filename is provided */
export function firstImage(p: Product): string {
  const raw = (Array.isArray(p.images) && p.images[0]) || p.img || "/products/placeholder.jpg";
  if (raw.startsWith("/")) return raw;
  const cat = p?.category ? catSlug(p.category) : "";
  return cat ? `/products/${cat}/${raw}` : `/products/${raw}`;
}

/** Build a slug from name/title */
const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Load price map if present (src/data/prices.ts or src/data/price-list.json) */
type PriceEntry = { price: number; currency?: Currency };
type PriceMap = Record<string, PriceEntry>;
function loadPriceMap(): PriceMap {
  try {
    // Prefer TS file so you have types & comments
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require("@/data/prices");
    return (mod.priceList || mod.default || {}) as PriceMap;
  } catch {
    // Try JSON as a fallback
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const json = require("@/data/price-list.json");
      return (json || {}) as PriceMap;
    } catch {
      return {};
    }
  }
}

/** Scan public/products/<category> and return Product[] (with prices merged) */
function scanPublicCatalog(): Product[] {
  const base = path.join(process.cwd(), "public", "products");
  const prices = loadPriceMap();
  let results: Product[] = [];

  for (const c of CATEGORY_SLUGS) {
    const dir = path.join(base, c);
    let files: string[] = [];
    try {
      files = fs.readdirSync(dir).filter(isImageFile);
    } catch {
      continue;
    }

    const categoryLabel = labelFromSlug(c);
    const items = files.map((file) => {
      const name = toTitle(file);
      const slug = toSlug(name);
      const img = `/products/${c}/${file}`;

      // Price lookup keys we support:
      // - by product slug (preferred)
      // - by raw filename without extension (convenience)
      const fileKey = file.replace(/\.[^.]+$/, "");
      const priceEntry =
        prices[slug] ||
        prices[`${c}/${fileKey}`] ||
        prices[fileKey] ||
        undefined;

      return {
        slug,
        name,
        category: categoryLabel,
        img,
        images: [img],
        price: priceEntry?.price,
        currency: priceEntry?.currency || "USD",
      } as Product;
    });

    results = results.concat(items);
  }

  // Dedupe by slug to be safe
  const seen = new Set<string>();
  const deduped: Product[] = [];
  for (const p of results) {
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      deduped.push(p);
    }
  }
  return deduped;
}

/** Public API used by pages/components */
let _cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (_cache) return _cache;
  _cache = scanPublicCatalog();
  return _cache;
}

export function getByCategorySlug(categorySlug: string): Product[] {
  return getAllProducts().filter(
    (p) => catSlug(p.category) === categorySlug
  );
}

export function getBySlug(categorySlug: string, productSlug: string): Product | undefined {
  return getAllProducts().find(
    (p) => catSlug(p.category) === categorySlug && p.slug === productSlug
  );
}
