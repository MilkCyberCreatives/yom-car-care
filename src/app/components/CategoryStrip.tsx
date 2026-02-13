// src/app/components/CategoryStrip.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "@/app/components/LocaleLink";
import type { Route } from "next";
import useLocaleLink from "@/hooks/useLocaleLink";
import { ReactNode } from "react";
import { useI18n } from "@/hooks/useI18n";

type Item = {
  href: string;      // e.g. "/products/exterior"
  label: string;     // e.g. "Exterior"
  icon?: ReactNode;  // optional icon
};

/* ---------------- lightweight scroll-reveal (FAST) ---------------- */

function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ---------------- component ---------------- */

export default function CategoryStrip({ items }: { items?: Item[] }) {
  const { l } = useLocaleLink();
  const { locale } = useI18n();
  const isFR = locale === "fr";

  // ✅ Default categories become locale-aware
  const defaultItems: Item[] = useMemo(
    () => [
      { href: "/products/exterior", label: isFR ? "Extérieur" : "Exterior" },
      { href: "/products/interior", label: isFR ? "Intérieur" : "Interior" },
      { href: "/products/air-fresheners", label: isFR ? "Désodorisants" : "Air Fresheners" },
      { href: "/products/detailing", label: isFR ? "Détailling" : "Detailing" },
      { href: "/products/accessories", label: isFR ? "Accessoires" : "Accessories" },
    ],
    [isFR]
  );

  // If items passed in, we respect them exactly (as before)
  const data: Item[] = items ?? defaultItems;

  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="container-px">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {data.map(({ href, label, icon }, idx) => {
          const typedHref = l(href) as Route;

          const delayMs = Math.min(idx, 6) * 60;

          return (
            <Link
              key={href}
              href={typedHref}
              className={[
                "group rounded-xl border border-white/10 bg-zinc-900/30 p-4",
                "flex items-center gap-3",
                "transition-all duration-300",
                "hover:border-white/20 hover:bg-zinc-900/55",
                "hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)]",
                "will-change-transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${delayMs}ms` : "0ms" }}
            >
              <span
                className={[
                  "grid place-items-center rounded-lg p-2",
                  "bg-[var(--brand-blue)]/20",
                  "transition-all duration-300",
                  "group-hover:bg-[var(--brand-blue)]/30",
                ].join(" ")}
              >
                {icon ?? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="opacity-80 transition group-hover:opacity-100 group-hover:scale-105"
                  >
                    <path
                      fill="currentColor"
                      d="M3 7a2 2 0 0 1 2-2h6l2 2h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 2v7h14V9z"
                    />
                  </svg>
                )}
              </span>

              <span className="font-medium tracking-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
