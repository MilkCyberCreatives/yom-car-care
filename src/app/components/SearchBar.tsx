"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { searchProducts } from "@/lib/search";
import Link from "@/app/components/LocaleLink"; // ✅ locale-aware for "view all results"

export default function SearchBar({ className = "" }: { className?: string }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const locale = pathname.startsWith("/fr") ? "fr" : "en";
  const prefix = locale === "fr" ? "/fr" : "";

  const { items, results } = useMemo(() => {
    if (!q.trim())
      return { items: [], results: [] as ReturnType<typeof searchProducts>["results"] };
    const { results } = searchProducts(q, {
      categoryBoost: {
        exterior: 1.5,
        interior: 1.0,
        "air-fresheners": 1.2,
        detailing: 0.8,
        accessories: 0.4,
      },
    });
    const items = results.slice(0, 8);
    return { items, results };
  }, [q]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const goToSearch = () => {
    setOpen(false);
    router.push(`${prefix}/search?q=${encodeURIComponent(q.trim())}`);
  };

  const goToItem = (slug: string, category: string) => {
    setOpen(false);
    router.push(`${prefix}/products/${category}/${slug}`);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) setOpen(true);
    if (!items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = items[highlight];
      if (chosen) goToItem(chosen.item.slug, chosen.item.category);
      else goToSearch();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    setHighlight(0);
  }, [q]);

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-3 py-2">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => q && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search products… (EN/FR)"
          className="w-full bg-transparent outline-none placeholder:text-white/70"
          aria-label="Search"
        />
        <button className="btn-primary px-3 py-1.5" onClick={goToSearch} aria-label="Search">
          Search
        </button>
      </div>

      {open && q.trim() && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">
          {items.length ? (
            <ul className="max-h-80 overflow-auto py-2">
              {items.map((r, i) => (
                <li key={r.item.slug}>
                  <button
                    className={`w-full text-left px-3 py-2 flex justify-between items-center ${
                      i === highlight ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => goToItem(r.item.slug, r.item.category)}
                  >
                    <span className="truncate">{r.item.name}</span>
                    <span className="ml-3 text-xs text-white/60 capitalize">
                      {r.item.category.replace(/-/g, " ")}
                    </span>
                  </button>
                </li>
              ))}
              <li className="border-t border-white/10 mt-2">
                {/* ✅ Use locale-aware Link for the "view all" link */}
                <Link
                  href={`/search?q=${encodeURIComponent(q.trim())}`}
                  className="block px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  View all results for “{q.trim()}”
                </Link>
              </li>
            </ul>
          ) : (
            <div className="px-3 py-3 text-sm text-white/70">
              No suggestions. Press Enter to search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
