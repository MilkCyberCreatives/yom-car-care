"use client";

import Link from "next/link";
import useLocaleLink from "@/hooks/useLocaleLink";
import { ReactNode } from "react";

type Product = {
  slug: string;                 // e.g. "foam-wash"
  title: string;                // e.g. "Foam Wash"
  image?: string;               // public path or remote URL
  price?: string | number;      // optional price display
  badge?: ReactNode | string;   // optional small label (e.g. "New")
  categorySlug?: string;        // e.g. "/products/exterior"
};

export default function FeaturedProducts({
  heading = "Featured Products",
  products = [],
  viewAllHref = "/products", // will be converted to a locale-aware, typed route
}: {
  heading?: string;
  products?: Product[];
  viewAllHref?: string;
}) {
  const { l } = useLocaleLink();

  return (
    <section className="container-px my-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[13px] uppercase tracking-widest text-white/60">Our picks</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-semibold">{heading}</h2>
        </div>

        {/* ✅ typed, locale-aware route */}
        <Link href={l(viewAllHref)} className="btn-ghost">
          View All
        </Link>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => {
          const productHref = l(`/products/${p.slug}`);

          return (
            <Link
              key={p.slug}
              href={productHref}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition"
            >
              {/* Image */}
              {p.image ? (
                <div className="aspect-[4/3] overflow-hidden">
                  {/* Using <img> to avoid next/image domain config surprises */}
                  <img
                    src={p.image}
                    alt={p.title}
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
                  <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                  {p.badge ? (
                    typeof p.badge === "string" ? (
                      <span className="text-xs rounded-md bg-white/10 px-2 py-1">{p.badge}</span>
                    ) : (
                      p.badge
                    )
                  ) : null}
                </div>

                <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                  <span className="line-clamp-1">
                    {p.categorySlug ? categoryNameFromSlug(p.categorySlug) : "—"}
                  </span>
                  <span className="font-medium text-white">
                    {p.price !== undefined && p.price !== null ? formatPrice(p.price) : ""}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------- helpers ----------------- */

function formatPrice(price: string | number): string {
  const n = typeof price === "string" ? Number(price) : price;
  if (!isFinite(n)) return String(price);
  // Display in USD-like format by default; adjust as needed for CDF
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function categoryNameFromSlug(slug?: string): string {
  if (!slug) return "";
  // slug examples: "/products/exterior" -> "Exterior"
  const seg = slug.split("/").filter(Boolean).pop() ?? "";
  return titleCase(seg.replace(/-/g, " "));
}

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
