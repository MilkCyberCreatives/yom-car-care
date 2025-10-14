"use client";

import Image from "next/image";
import LocaleLink from "./LocaleLink"; // ⬅️ fixed
import type { ProductData } from "@/app/data/products";

export default function ProductCard({ p }: { p: ProductData }) {
  const href = `/products/${p.category}/${p.slug}`;
  const mainImg = p.images?.[0] || "/logo.svg";

  return (
    <div className="card overflow-hidden">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={mainImg}
          alt={p.name}
          fill
          sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug line-clamp-2">{p.name}</h3>
          {p.badges?.length ? (
            <span className="shrink-0 text-[11px] rounded-md bg-white/10 px-2 py-1 capitalize">
              {p.badges[0]}
            </span>
          ) : null}
        </div>

        <div className="mt-2 text-white/70 text-sm">
          <span className="capitalize">{p.category.replace(/-/g, " ")}</span>
          {p.size ? <span> • {p.size}</span> : null}
        </div>

        {p.price !== undefined ? (
          <div className="mt-2 font-medium">
            {typeof p.price === "number" ? `$${p.price.toFixed(2)}` : p.price}{" "}
            {p.currency && p.currency !== "USD" ? p.currency : ""}
          </div>
        ) : null}

        <div className="mt-4">
          <LocaleLink href={href} className="btn-ghost">
            View details
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
