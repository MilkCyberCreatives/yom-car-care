/* ---------------------------------------------------------
   Single source of truth for product listing
   - Scans /public/products/<category> subfolders at build/runtime
   - Merges prices from src/data/prices.ts (if present)
   - Exports the names your pages/components expect
---------------------------------------------------------- */

import fs from "fs";
import path from "path";

/* ---------- Types ---------- */
export type Currency = "USD" | "CDF" | string;

export type Product = {
  slug: string;
  name: string;
  category: string;     // Human label, e.g., "Interior", "Exterior"
  price?: number;
  currency?: Currency;
  images?: string[];    // absolute paths starting with /products/...
  img?: string;         // absolute path for the primary image
};

/* ---------- Category helpers ---------- */
export const CATEGORY_SLUGS = [
  "accessories",
  "air-fresheners",
  "detailing",
  "exterior",
  "interior",
] as const;

// Some code elsewhere imports ALL_CATEGORIES — export the same list
export const ALL_CATEGORIES = CATEGORY_SLUGS;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const catSlug = (c: string) =>
  c.replace(/[^a-z0-9]+/gi, "-").toLowerCase() as CategorySlug;

const labelFromSlug = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

/* ---------- String / path helpers ---------- */
const toTitle = (s: string) =>
  s
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const isImageFile = (f: string) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f);

/** Prefer category subfolder path when a bare filename is provided */
export function firstImage(p: Product): string {
  const raw =
    (Array.isArray(p.images) && p.images[0]) ||
    p.img ||
    "/products/placeholder.jpg";

  if (raw.startsWith("/")) return raw;
  const cat = p?.category ? catSlug(p.category) : "";
  return cat ? `/products/${cat}/${raw}` : `/products/${raw}`;
}

/* ---------- Prices (optional) ---------- */
// src/data/prices.ts should export `priceList` or default.
// We AVOID importing JSON so Vercel/Next won't try to resolve a missing file.
type PriceEntry = { price: number; currency?: Currency };
type PriceMap = Record<string, PriceEntry>;

function loadPriceMap(): PriceMap {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require("@/data/prices");
    const map = (mod.priceList || mod.default || {}) as PriceMap;
    return map && typeof map === "object" ? map : {};
  } catch {
    return {};
  }
}

/* ---------- Build catalog by scanning /public/products ---------- */
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
      continue; // folder may not exist — skip
    }

    const categoryLabel = labelFromSlug(c);
    const items = files.map((file) => {
      const name = toTitle(file);
      const slug = toSlug(name);
      const img = `/products/${c}/${file}`;

      // Flexible price keys:
      // 1) by generated product slug (preferred)
      // 2) "<category>/<filename-no-ext>"
      // 3) plain filename-no-ext (handy if you rename categories)
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

  // Dedupe by slug, keep first
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

/* ---------- Public API (exports used across app) ---------- */
let _cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (_cache) return _cache;
  _cache = scanPublicCatalog();
  return _cache;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter(
    (p) => catSlug(p.category) === categorySlug
  );
}

export function getByCategorySlug(categorySlug: string): Product[] {
  // Backwards-compatible alias (some files may use this)
  return getProductsByCategory(categorySlug);
}

export function getProduct(categorySlug: string, productSlug: string): Product | undefined {
  return getAllProducts().find(
    (p) => catSlug(p.category) === categorySlug && p.slug === productSlug
  );
}

export function getBySlug(categorySlug: string, productSlug: string): Product | undefined {
  // Backwards-compatible alias (some files may use this)
  return getProduct(categorySlug, productSlug);
}
