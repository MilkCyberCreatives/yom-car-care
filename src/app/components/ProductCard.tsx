"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import type { ProductData } from "../data/products";

/**
 * ProductCard
 * - Typed with your ProductData shape.
 * - Locale-aware internal links via LocaleLink.
 * - Works even if image is missing.
 */
export default function ProductCard({ p }: { p: ProductData }) {
  const href = `/products/${p.category}/${p.slug}`;

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition"
      aria-label={p.name}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3]">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-white/50 bg-black/20">
            Image coming soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug line-clamp-2">{p.name}</h3>
          {p.badge ? (
            <span className="shrink-0 text-[11px] rounded-md bg-white/10 px-2 py-1">
              {p.badge}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-white/70">
          <span className="capitalize">
            {(p.category || "").replace(/-/g, " ")}
          </span>
          <span className="font-medium text-white">
            {renderPrice(p.price)}
          </span>
        </div>

        {/* Optional short description */}
        {p.subtitle ? (
          <p className="mt-2 text-xs text-white/60 line-clamp-2">{p.subtitle}</p>
        ) : null}
      </div>
    </Link>
  );
}

/* ---------------- helpers ---------------- */

function renderPrice(price: ProductData["price"]) {
  if (price === undefined || price === null || price === "") return "";
  // If already a string (e.g., "from $10" or "on request"), show as-is.
  if (typeof price === "string") return price;

  // Otherwise assume number in USD-like formatting (adjust to CDF if needed).
  try {
    return `$${Number(price).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`;
  } catch {
    return String(price);
  }
}
