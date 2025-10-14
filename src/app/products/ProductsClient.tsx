"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/ProductCard"; // <- adjust if your path differs
import { products, type ProductData, type Category } from "@/data/products";

/** Build a thumbnail from either `img` or first `images[]` without type errors */
function thumbOf(p: ProductData): string {
  const anyP = p as any;
  const img: string | undefined = anyP?.img;
  const firstFromImages: string | undefined =
    Array.isArray(anyP?.images) && anyP.images.length ? anyP.images[0] : undefined;
  return img || firstFromImages || "";
}

/** Pretty print category slug */
function prettyCat(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

type SortKey = "name_asc" | "name_desc";

export default function ProductsClient() {
  const pathname = usePathname() || "/products";
  const searchParams = useSearchParams();
  const router = useRouter();

  // ---- read filters from URL
  const q = (searchParams?.get("q") || "").trim().toLowerCase();
  const cat = (searchParams?.get("category") || "") as Category | "";
  const size = searchParams?.get("size") || "";
  const tag = searchParams?.get("tag") || ""; // string from query params
  const min = searchParams?.get("min");
  const max = searchParams?.get("max");
  const sort = (searchParams?.get("sort") as SortKey) || "name_asc";
  const page = Math.max(1, Number(searchParams?.get("page") || 1));
  const pageSize = Math.max(1, Math.min(48, Number(searchParams?.get("ps") || 24)));

  // ---- filtering + sorting (stable and defensive)
  const filtered = useMemo(() => {
    const minNum = min != null ? Number(min) : null;
    const maxNum = max != null ? Number(max) : null;

    let list = products.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (size && p.size !== size) return false;

      // Tag/badge comparison (defensive: treat all badges as strings)
      if (tag) {
        const badges = ((p as any)?.badges || []) as unknown[];
        const badgeStrings = badges.map((b) => String(b));
        if (!badgeStrings.includes(tag)) return false;
      }

      if (minNum != null && (p.price ?? Infinity) < minNum) return false;
      if (maxNum != null && (p.price ?? 0) > maxNum) return false;

      if (q) {
        const hay = `${p.name} ${p.slug} ${p.category} ${p.size || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    // sort
    list = [...list].sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      return sort === "name_desc" ? -cmp : cmp;
    });

    return list;
  }, [q, cat, size, tag, min, max, sort]);

  // ---- pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const setPage = (next: number) => {
    const sp = new URLSearchParams(searchParams?.toString());
    sp.set("page", String(next));
    router.push(`${pathname}?${sp.toString()}`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="container-px py-8">
      <header className="mb-4">
        <p className="text-[13px] uppercase tracking-widest text-white/60">Products</p>
        <h1 className="mt-1 text-2xl md:text-3xl font-semibold">
          {cat ? prettyCat(cat) : "All Products"}
        </h1>
        <p className="mt-2 text-white/70">
          Showing {filtered.length} item{filtered.length === 1 ? "" : "s"}
          {q ? (
            <>
              {" "}
              for search "<span className="text-white">{q}</span>"
            </>
          ) : null}
        </p>
      </header>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pageItems.map((p) => (
          <ProductCard key={p.slug} p={{ ...p, /* pass a thumb if your card needs it */ img: thumbOf(p) } as any} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={safePage <= 1}
            onClick={() => setPage(safePage - 1)}
            className={`btn-ghost px-4 py-2 ${safePage <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label="Previous page"
          >
            Prev
          </button>

          <span className="text-white/70 text-sm">
            Page {safePage} of {totalPages}
          </span>

          <button
            disabled={safePage >= totalPages}
            onClick={() => setPage(safePage + 1)}
            className={`btn-ghost px-4 py-2 ${safePage >= totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
