// src/data/featured.ts

export type FPItem = {
  slug: string;
  name: string;
  img: string; // /public path
  price: number;
  currency?: "USD" | "CDF" | string;
  category: "exterior" | "interior" | "detailing" | "accessories";
  href?: string;
  badge?: string | React.ReactNode;
};

/**
 * These four match the “Cleaning products of the moment”
 * you uploaded in /public/products, in that visual order.
 */
export const featuredHome: FPItem[] = [
  {
    slug: "anticalcare-sensor",
    name: "Anticalcare Spray (Sensors & Photocells)",
    img: "/products/anticalcare-spray-per-fotocellule-e-sensori-sensor-fra-ber_900x900.webp",
    price: 12,
    currency: "USD",
    category: "detailing",
    href: "/products/detailing/anticalcare-sensor",
    badge: "New",
  },
  {
    slug: "superlux-tyre-gel",
    name: "Superlux — Tyre Gel “Lucido e Nero”",
    img: "/products/lucido-e-nero-gomme-gel-superlux-fra-ber_jpg_900x900.webp",
    price: 15,
    currency: "USD",
    category: "exterior",
    href: "/products/exterior/superlux-tyre-gel",
    badge: "Popular",
  },
  {
    slug: "svitavvita-lubricant",
    name: "Svitavvita — Lubricating & Releasing Oil (Spray)",
    img: "/products/olio-lubrificante-e-sbloccante-spray-svitavvita-fra-ber_900x900.webp",
    price: 10,
    currency: "USD",
    category: "accessories",
    href: "/products/accessories/svitavvita-spray",
    badge: "Bestseller",
  },
  {
    slug: "ultramicrofiber-cloth",
    name: "Ultramicrofiber Glass & Crystal Cloth",
    img: "/products/panno-ultramicrofibra-per-cristalli-e-superfici-lucide-panno-vetri-fra-ber_4507b986-ab19-4e87-a427-2c0327f595ed_900x900.webp",
    price: 6,
    currency: "USD",
    category: "interior",
    href: "/products/interior/ultramicrofiber-cloth",
    badge: "Pro",
  },
];
