"use client";

import Link from "next/link";
import Image from "next/image";
import type { ProductData } from "@/data/products";

function displayPrice(price?: number | string, currency?: string) {
  if (price == null) return "";
  if (typeof price === "number") {
    // format e.g. USD by default; tweak as needed
    return `$${price.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
  // already a string — show as-is
  return String(price);
}

function thumbSrc(p: ProductData) {
  return p.images?.[0] ?? p.img ?? "";
}

export default function ProductCard({ p }: { p: ProductData }) {
  const href = `/products/${p.category}/${p.slug}`;
  const img = thumbSrc(p);

  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3]">
        {img ? (
          <Image
            src={img}
            alt={p.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-white/40">
            Image coming soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug line-clamp-2">{p.name}</h3>
          {(p.badges?.length ?? 0) > 0 && (
            <span className="shrink-0 text-[11px] rounded-md bg-white/10 px-2 py-1">
              {p.badges![0]}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-white/70">
          <span className="capitalize">
            {p.category.replace(/-/g, " ")}
            {p.size ? ` • ${p.size}` : ""}
          </span>
          <span className="font-medium text-white">
            {displayPrice(p.price, p.currency)}
          </span>
        </div>
      </div>
    </Link>
  );
}
