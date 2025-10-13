"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";

export default function ProductsFilterBar({
  initialQuery,
  initialCategory,
  initialSort,
}: {
  initialQuery: string;
  initialCategory: string;
  initialSort: "name_asc" | "name_desc";
}) {
  const { t } = useI18n();
  const categories = [
    { value: "", label: t ? "All categories" : "All categories" },
    { value: "exterior", label: t.cats.exterior },
    { value: "interior", label: t.cats.interior },
    { value: "air-fresheners", label: t.cats.air },
    { value: "detailing", label: t.cats.detailing },
    { value: "accessories", label: t.cats.accessories },
  ];

  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState(initialCategory);
  const [sort, setSort] = useState<"name_asc" | "name_desc">(initialSort);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildUrl = useMemo(() => {
    return (next: Partial<{ q: string; category: string; sort: string; page: string }>) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (next.q !== undefined) params.set("q", next.q);
      if (next.category !== undefined) {
        next.category ? params.set("category", next.category) : params.delete("category");
      }
      if (next.sort !== undefined) params.set("sort", next.sort);
      if (next.page !== undefined) params.set("page", next.page);
      else params.delete("page");
      const qs = params.toString();
      return `${pathname}?${qs}`;
    };
  }, [pathname, searchParams]);

  const apply = () => {
    router.push(buildUrl({ q: q.trim(), category: cat, sort, page: "1" }));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (document.activeElement as HTMLElement)?.id === "products-q") {
        apply();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, cat, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/40 p-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <input
            id="products-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products… (EN/FR)"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 outline-none placeholder:text-white/70"
            aria-label="Search products"
          />
        </div>

        <div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 outline-none"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "name_asc" | "name_desc")}
            className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 outline-none"
            aria-label="Sort products"
          >
            <option value="name_asc">Name A–Z</option>
            <option value="name_desc">Name Z–A</option>
          </select>

          <button onClick={apply} className="btn-primary whitespace-nowrap">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
