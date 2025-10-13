"use client";

import Link from "next/link";
import type { Route } from "next";
import useLocaleLink from "@/hooks/useLocaleLink";
import { ReactNode } from "react";

type Item = {
  href: string;      // e.g. "/products/exterior"
  label: string;     // e.g. "Exterior"
  icon?: ReactNode;  // optional icon
};

export default function CategoryStrip({ items }: { items?: Item[] }) {
  const { l } = useLocaleLink();

  const data: Item[] =
    items ?? [
      { href: "/products/exterior", label: "Exterior" },
      { href: "/products/interior", label: "Interior" },
      { href: "/products/air-fresheners", label: "Air Fresheners" },
      { href: "/products/detailing", label: "Detailing" },
      { href: "/products/accessories", label: "Accessories" },
    ];

  return (
    <div className="container-px">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {data.map(({ href, label, icon }) => {
          const typedHref = l(href) as Route;
          return (
            <Link
              key={href}
              href={typedHref}
              className="group rounded-xl border border-white/10 hover:border-white/20 bg-zinc-900/30 hover:bg-zinc-900/50 transition p-4 flex items-center gap-3"
            >
              <span className="grid place-items-center rounded-lg bg-[var(--brand-blue)]/20 p-2">
                {icon ?? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="opacity-80 group-hover:opacity-100 transition"
                  >
                    <path
                      fill="currentColor"
                      d="M3 7a2 2 0 0 1 2-2h6l2 2h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 2v7h14V9z"
                    />
                  </svg>
                )}
              </span>
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
