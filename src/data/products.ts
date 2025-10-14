// src/data/products.ts
// Re-export everything from the canonical module.
// This keeps legacy imports working and preserves a single type identity.
export * from "@/data/products";


// ---------- Types ----------
export type Category =
  | "exterior"
  | "interior"
  | "air-fresheners"
  | "detailing"
  | "accessories";

export type Badge = "new" | "popular" | "bestseller";

export type ProductData = {
  slug: string;
  name: string;
  category: Category;
  size?: string;
  /** Legacy single image field some components still use */
  img?: string;
  /** Preferred (first image is the thumb) */
  images?: string[];
  /** Some places treat price as a number, others as display text; allow both */
  price?: number | string;
  currency?: "USD" | "CDF" | string;
  /** Use an array for UI badges */
  badges?: Badge[];
};

// ---------- Sample image helpers (keep or remove) ----------
const U = (q: string) =>
  `https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&auto=format&fit=crop&w=1200&h=900&crop=entropy&ixlib=rb-4.0.3&img=${encodeURIComponent(
    q
  )}`;
const U2 = (q: string) =>
  `https://images.unsplash.com/photo-1542365887-1f7475d0d34a?q=80&auto=format&fit=crop&w=1200&h=900&crop=entropy&ixlib=rb-4.0.3&img=${encodeURIComponent(
    q
  )}`;

// Short aliases for readability
const ext: Category = "exterior";
const int: Category = "interior";
const air: Category = "air-fresheners";
const det: Category = "detailing";
const acc: Category = "accessories";

// ---------- Data (REPLACE with your full list) ----------
export const products: ProductData[] = [
  // EXTERIOR
  {
    slug: "shield-snow-foam-1l",
    name: "Shield Snow Foam 1L",
    category: ext,
    size: "1L",
    img: U("snow-foam"),
    images: [U("snow-foam"), U2("prewash"), U("foam-lance")],
    price: 9.5,
    currency: "USD",
    badges: ["bestseller"],
  },
  {
    slug: "shield-splash-car-shampoo-500ml",
    name: "Shield Splash Car Shampoo 500ml",
    category: ext,
    size: "500ml",
    img: U("shampoo"),
    images: [U("shampoo"), U2("wash"), U("rinse")],
    price: 6.9,
    currency: "USD",
    badges: ["popular"],
  },

  // INTERIOR
  {
    slug: "shield-leather-care-400ml",
    name: "Shield Leather Care 400ml",
    category: int,
    size: "400ml",
    img: U("leather-care"),
    price: 7.8,
    currency: "USD",
  },

  // AIR FRESHENERS
  { slug: "monster-fresh-ocean", name: "Monster Fresh Ocean", category: air, img: U("ocean"), price: 2.5, currency: "USD" },

  // DETAILING
  { slug: "shield-sheen-silicone-500ml", name: "Shield Sheen Silicone 500ml", category: det, size: "500ml", img: U("silicone"), price: 6.9, currency: "USD" },

  // ACCESSORIES
  { slug: "shield-standard-sponge", name: "Shield Standard Sponge", category: acc, img: U("sponge"), price: 1.2, currency: "USD" },

  // 👉 Add the rest of your items here (copy your full list).
];

// ---------- Small helpers you already use elsewhere ----------
export const categories = [
  "exterior",
  "interior",
  "air-fresheners",
  "detailing",
  "accessories",
] as const;

export function getByCategory(cat: Category) {
  return products.filter((p) => p.category === cat);
}

export function countByCategory() {
  const map: Record<Category, number> = {
    exterior: 0,
    interior: 0,
    "air-fresheners": 0,
    detailing: 0,
    accessories: 0,
  };
  for (const p of products) map[p.category]++;
  return map;
}

/** Prefer this to pick a thumbnail everywhere */
export function firstImage(p: ProductData): string {
  return p.images?.[0] ?? p.img ?? "";
}
