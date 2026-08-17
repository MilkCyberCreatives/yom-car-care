"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { ProductData } from "@/data/products";

export default function ProductCard({ p }: { p: ProductData }) {
  const href = `/products/${p.category}/${p.slug}`;
  const img = p.images?.[0] ?? p.img ?? "";
  const priceText = formatPrice(p.price, p.currency);

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt={p.name}
            fill
            sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-white/40">
            Image coming soon
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug line-clamp-2">{p.name}</h3>

          {p.badges?.length ? (
            <span className="shrink-0 text-[11px] rounded-md bg-white/10 px-2 py-1">
              {p.badges[0]}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-white/70 capitalize">
            {p.category.replace(/-/g, " ")}
            {p.size ? ` • ${p.size}` : ""}
          </span>
          <span className="font-medium text-white">{priceText}</span>
        </div>
      </div>
    </Link>
  );
}
