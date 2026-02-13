// src/app/components/BrandBar.tsx
"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";

/**
 * BrandBar
 * Displays partner logos inside a white card.
 * Images must exist under /public/partners/*
 *
 * Premium feature:
 * - subtle auto-scroll marquee (very lightweight, CSS-based)
 * - respects reduced-motion and stops scrolling automatically
 */

const BRANDS: { src: string; alt: string }[] = [
  { src: "/partners/logo-innovacar.webp", alt: "Innova Car" },
  { src: "/partners/shield-chemicals-logo-200px.png", alt: "Shield Chemicals" },
  { src: "/partners/logo_fra_ber_nopayoff.png", alt: "Fra-Ber" },
  { src: "/partners/tonyin.jpg", alt: "Tonyin" },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function BrandBar({ className }: { className?: string }) {
  const { locale } = useI18n();
  const isFR = locale === "fr";
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  // Duplicate list for seamless marquee loop
  const loopBrands = useMemo(() => [...BRANDS, ...BRANDS], []);

  return (
    <section className={clsx("container-px py-8", className)}>
      {/* White background card */}
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm overflow-hidden">
        <div className="mb-4 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500">
            {isFR ? "Marques de confiance" : "Trusted brands"}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {isFR ? "Produits partenaires" : "Partner Products"}
          </h3>
        </div>

        {/* Marquee wrapper */}
        <div className="relative">
          {/* soft fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent" />

          {/* Track */}
          <div
            className={clsx(
              "flex items-center gap-10",
              !reduceMotion && "animate-[brandMarquee_18s_linear_infinite]"
            )}
          >
            {loopBrands.map((b, i) => (
              <div
                key={`${b.alt}-${i}`}
                className="relative h-10 w-28 sm:h-12 sm:w-32 shrink-0 opacity-80 hover:opacity-100 transition"
                title={b.alt}
              >
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  sizes="(min-width: 640px) 128px, 112px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Keyframes inline (keeps it beginner-simple, no extra files needed) */}
        <style jsx>{`
          @keyframes brandMarquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
