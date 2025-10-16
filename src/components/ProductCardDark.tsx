// src/components/ProductCardDark.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export type DarkCardProduct = {
  slug?: string;
  name: string;
  images?: string[];
  img?: string;
};

export default function ProductCardDark({
  p,
  index,
  href,
}: {
  p: DarkCardProduct;
  index: number;
  href?: string;
}) {
  const imageSrc = p.images?.[0] || p.img || "/products/placeholder.jpg";

  return (
    <div className="group rounded-[22px] border border-neutral-800 bg-neutral-900 text-white shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_10px_30px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Image block */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100">
        <Image
          src={imageSrc}
          alt={p.name}
          fill
          className="object-contain p-6 group-hover:scale-[1.02] transition-transform"
          sizes="(min-width:1280px) 25vw,(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
        />
      </div>

      {/* Bottom bar */}
      <div className="flex items-center gap-3 rounded-t-[0] rounded-b-[22px] bg-neutral-800/95 px-4 py-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold leading-tight line-clamp-2">
            {p.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-neutral-700 px-2 py-0.5 text-xs text-neutral-200">
              Public
            </span>
          </div>
        </div>

        <div className="shrink-0 text-sm text-neutral-300">#{index}</div>
      </div>

      {/* Clickable overlay (whole card) */}
      {(href && href !== "#") ? (
        <Link
          href={href}
          aria-label={`View ${p.name}`}
          className="absolute inset-0 rounded-[22px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        />
      ) : null}
    </div>
  );
}
