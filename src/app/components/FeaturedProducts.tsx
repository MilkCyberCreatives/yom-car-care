"use client";

import Link from "@/app/components/LocaleLink";
import { ShoppingCart } from "lucide-react";
import useLocaleLink from "@/hooks/useLocaleLink";
import { featuredHome, type FPItem } from "@/data/featured";

/** Accept both FPItem and legacy shapes from earlier code */
type LegacyItem = {
  slug?: string;
  title?: string;
  name?: string;
  image?: string;
  img?: string;
  price?: number | string;
  currency?: "USD" | "CDF" | string;
  category?: string;       // may be human label or slug
  categorySlug?: string;   // "/products/exterior" or "exterior"
  href?: string;
  badge?: string | React.ReactNode;
};

type AnyItem = FPItem | LegacyItem;

/* ---------------- helpers ---------------- */

const catSlug = (c?: string) =>
  (c || "")
    .toString()
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^products\//i, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();

function prettyCat(
  c: FPItem["category"]
): "Exterior" | "Interior" | "Detailing" | "Accessories" | "Air Fresheners" | "—" {
  switch (c) {
    case "exterior": return "Exterior";
    case "interior": return "Interior";
    case "detailing": return "Detailing";
    case "accessories": return "Accessories";
    case "air-fresheners": return "Air Fresheners";
    default: return "—";
  }
}

function formatPrice(n: number, currency = "USD") {
  return (currency === "CDF" ? "CDF " : "$") + (Number.isFinite(n) ? n.toLocaleString() : "0");
}

/** Build absolute product image path. If a bare filename is given, use /products/<category>/<file> */
function resolveImg(img: string | undefined, category: string | undefined) {
  if (!img) return "";
  if (img.startsWith("/")) return img;
  const cat = catSlug(category);
  return cat ? `/products/${cat}/${img}` : `/products/${img}`;
}

/** Normalize any incoming shape to FPItem */
function normalize(item: AnyItem): FPItem {
  const legacy = item as LegacyItem;

  const name = (legacy as FPItem).name ?? legacy.name ?? legacy.title ?? "Product";
  const roughSlug =
    (legacy as FPItem).slug ??
    legacy.slug ??
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Determine category slug (accept "Exterior", "exterior", "/products/exterior", etc.)
  const rawCat =
    (legacy as FPItem).category ??
    legacy.category ??
    (legacy.categorySlug
      ? legacy.categorySlug.split("/").filter(Boolean).pop()
      : undefined) ??
    "accessories";
  const category = (["exterior", "interior", "detailing", "accessories", "air-fresheners"].includes(catSlug(rawCat))
    ? (catSlug(rawCat) as FPItem["category"])
    : "accessories");

  const imgRaw = (legacy as FPItem).img ?? legacy.img ?? legacy.image ?? "";
  const img = resolveImg(imgRaw, category);

  // Price
  const priceRaw = (legacy as FPItem).price ?? legacy.price;
  const price = typeof priceRaw === "string" ? (Number(priceRaw) || 0) : priceRaw ?? 0;
  const currency = ((legacy as FPItem).currency ?? legacy.currency ?? "USD") as FPItem["currency"];

  // Final slug + href to PDP
  const slug = roughSlug;
  const href =
    (legacy as FPItem).href ??
    legacy.href ??
    `/products/${category}/${slug}`;

  return {
    slug,
    name,
    img,
    price,
    currency,
    category,
    href,
    badge: (legacy as FPItem).badge ?? (legacy.badge as FPItem["badge"]),
  };
}

/* ---------------- component ---------------- */

export default function FeaturedProducts({
  heading = "Featured Products",
  products,
  viewAllHref = "/products",
}: {
  heading?: string;
  products?: AnyItem[] | unknown; // be lenient at the boundary
  viewAllHref?: string;
}) {
  const { l } = useLocaleLink();

  // ✅ Never crash on undefined/null or wrong shape
  const rawList: AnyItem[] =
    (Array.isArray(products) ? (products as AnyItem[]) : featuredHome) ?? [];
  const list: FPItem[] = rawList.map(normalize);

  return (
    <section className="container-px my-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[13px] uppercase tracking-widest text-white/60">Our picks</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-semibold">{heading}</h2>
        </div>

        <Link href={l(viewAllHref)} className="btn-ghost">View All</Link>
      </div>

      {list.length === 0 ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-zinc-900/40 p-6 text-white/70">
          No products to show yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, idx) => {
            const href = l(p.href || `/products/${p.category}/${p.slug}`);

            return (
              <article
                key={p.slug || `feat-${idx}`}
                className="rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition"
              >
                {/* IMAGE + BADGE */}
                <div className="relative rounded-t-2xl overflow-hidden bg-black/15">
                  {p.badge ? (
                    <div className="absolute top-2 right-2 z-10">
                      {typeof p.badge === "string" ? (
                        <span className="text-xs rounded-md bg-white/10 px-2 py-1 backdrop-blur">
                          {p.badge}
                        </span>
                      ) : (
                        p.badge
                      )}
                    </div>
                  ) : null}

                  <Link href={href} className="block w-full h-64 grid place-items-center">
                    {p.img ? (
                      <img
                        src={p.img}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-white/40">No image</div>
                    )}
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-snug line-clamp-2">
                      <Link href={href}>{p.name}</Link>
                    </h3>

                    <button
                      type="button"
                      aria-label="Add to cart"
                      className="shrink-0 rounded-xl border border-white/10 px-2.5 py-2 hover:bg-white/10"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="rounded-md bg-white/10 px-2 py-1 capitalize">
                      {prettyCat(p.category)}
                    </span>
                    <span className="font-medium">
                      {formatPrice(p.price, p.currency)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
