// src/components/CategoriesTabs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, countByCategory } from "@/data/products";
import { toSlug, fromSlug } from "@/lib/slug";

type Props = {
  /** When on /products/[category], pass that slug so the tab highlights */
  activeSlug?: string;
  /** Optional: place extra controls (sort, filters) on the right */
  rightSlot?: React.ReactNode;
};

export default function CategoriesTabs({ activeSlug, rightSlot }: Props) {
  const pathname = usePathname();
  const counts = countByCategory();

  // If not explicitly provided, try to detect from the path
  const detectedActive =
    activeSlug ||
    (() => {
      const parts = (pathname || "").split("/").filter(Boolean);
      const i = parts.indexOf("products");
      if (i >= 0 && parts[i + 1]) return parts[i + 1];
      return undefined;
    })();

  return (
    <div className="relative">
      {/* subtle divider */}
      <div className="mb-4 h-px w-full bg-gray-100" />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Tabs */}
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nav className="flex items-center gap-2">
            <TabLink
              href="/products"
              label="all"
              active={!detectedActive}
              count={Object.values(counts).reduce((a, b) => a + b, 0)}
            />
            {categories.map((c) => {
              const slug = toSlug(c);
              const label = fromSlug(c);
              const count = counts[c];
              return (
                <TabLink
                  key={c}
                  href={`/products/${slug}`}
                  label={label}
                  active={detectedActive === slug}
                  count={count}
                />
              );
            })}
          </nav>
        </div>

        {/* Optional right side slot (filters/sort) */}
        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </div>

      {/* subtle divider */}
      <div className="mt-4 h-px w-full bg-gray-100" />
    </div>
  );
}

function TabLink({
  href,
  label,
  active,
  count,
}: {
  href: string;
  label: string;
  active?: boolean;
  count?: number;
}) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition",
        active
          ? "border-black bg-black text-white"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <span className="capitalize">{label}</span>
      {typeof count === "number" ? (
        <span
          className={[
            "rounded-full px-2 py-0.5 text-xs",
            active
              ? "bg-white/15 text-white"
              : "bg-gray-100 text-gray-700 group-hover:bg-gray-200",
          ].join(" ")}
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}
