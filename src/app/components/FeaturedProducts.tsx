// src/app/components/FeaturedProducts.tsx
"use client";

import LocaleLink from "@/app/components/LocaleLink";
import { products as ALL, type ProductData } from "@/app/data/products";

/** pick bestsellers/popular first, otherwise first N items */
function pickFeatured(all: ProductData[], n = 8): ProductData[] {
  const feat = all.filter(
    (p) => p.badges?.includes("bestseller") || p.badges?.includes("popular")
  );
  return (feat.length ? feat : all).slice(0, n);
}

export default function FeaturedProducts() {
  const items = pickFeatured(ALL, 8);

  return (
    <section className="container-px my-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[13px] uppercase tracking-widest text-white/60">Our picks</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-semibold">Featured Products</h2>
        </div>

        {/* locale-aware link */}
        <LocaleLink href="/products" className="btn-ghost">
          View All
        </LocaleLink>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => {
          const href = `/products/${p.category}/${p.slug}`;
          const img = p.images?.[0] || p.img; // support both fields from your data

          return (
            <LocaleLink
              key={`${p.category}-${p.slug}`}
              href={href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition"
            >
              {/* Image */}
              {img ? (
                <div className="aspect-[4/3] overflow-hidden">
                  {/* <img> avoids next/image remote host config headaches */}
                  <img
                    src={img}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] grid place-items-center bg-black/20 text-white/40">
                  No image
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold line-clamp-1">{p.name}</h3>
                  {p.badges?.length ? (
                    <span className="text-xs rounded-md bg-white/10 px-2 py-1 capitalize">
                      {p.badges[0]}
                    </span>
                  ) : null}
                </div>

                <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                  <span className="line-clamp-1 capitalize">
                    {p.category.replace(/-/g, " ")}
                    {p.size ? ` • ${p.size}` : ""}
                  </span>
                  <span className="font-medium text-white">
                    {p.price !== undefined && p.price !== null ? formatPrice(p.price, p.currency) : ""}
                  </span>
                </div>
              </div>
            </LocaleLink>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function formatPrice(price: string | number, currency?: string): string {
  const n = typeof price === "string" ? Number(price) : price;
  if (!isFinite(n)) return String(price);
  // default USD display; append non-USD currency code if provided
  const core = `$${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  return currency && currency !== "USD" ? `${core} ${currency}` : core;
}
