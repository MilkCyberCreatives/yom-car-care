"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

/** tiny class combiner to avoid extra deps */
function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

type Props = { className?: string };

type Product = {
  slug?: string;
  title?: string;
  price?: number;
  image?: string;
  category?: string;
};

/* ------- data: tolerant to your exports (featured.ts, mostPurchased.ts, products.ts) ------- */
import * as Featured from "@/data/featured";
import * as MostPurchased from "@/data/mostPurchased";
import * as AllProducts from "@/data/products";

function flattenModule(mod: Record<string, unknown>): Product[] {
  const vals = Object.values(mod);
  const out: Product[] = [];
  for (const v of vals) {
    if (Array.isArray(v)) {
      for (const it of v) {
        if (it && typeof it === "object") out.push(it as Product);
      }
    }
  }
  return out;
}

const STORAGE_KEY = "yom_recent_searches_v1";
const MAX_RECENTS = 6;
const MAX_RESULTS = 8;
const DEBOUNCE_MS = 150;

export default function SearchBar({ className }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [recents, setRecents] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // build product pool once
  const products: Product[] = useMemo(() => {
    const pools = [
      ...flattenModule(Featured),
      ...flattenModule(MostPurchased),
      ...flattenModule(AllProducts),
    ];

    // de-dupe by slug
    const seen = new Set<string>();
    const list: Product[] = [];
    for (const p of pools) {
      const slug = p?.slug;
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      list.push(p);
    }
    return list;
  }, []);

  // Load recents
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecents(JSON.parse(raw));
    } catch {}
  }, []);

  // Close menu when route changes
  useEffect(() => setOpen(false), [pathname]);

  // Click outside to close
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Debounce
  const [debouncedQ, setDebouncedQ] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q.trim()), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [q]);

  // Filter
  const results = useMemo(() => {
    const query = debouncedQ.toLowerCase();
    if (!query) return [];
    return products
      .map((p) => {
        const title = p.title ?? "";
        const cat = p.category ?? "";
        const hay = `${title} ${cat}`.toLowerCase();
        const score =
          (title.toLowerCase().startsWith(query) ? 2 : 0) +
          (cat.toLowerCase().startsWith(query) ? 1 : 0) +
          (hay.includes(query) ? 0.5 : 0);
        return { p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((x) => x.p);
  }, [debouncedQ, products]);

  const showRecents = !debouncedQ && recents.length > 0;

  // keyboard nav
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      const poolLen = (results?.length || 0) + (showRecents ? recents.length : 0);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % Math.max(1, poolLen || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const max = Math.max(1, poolLen || 1);
        setActive((i) => (i - 1 + max) % max);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (poolLen === 0) return;
        const idx = active;
        if (showRecents && idx < recents.length) {
          go(recents[idx]);
        } else {
          const p = results[idx - (showRecents ? recents.length : 0)];
          if (p) goToProduct(p);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, results, recents, showRecents]);

  function saveRecent(term: string) {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recents.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, MAX_RECENTS);
    setRecents(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function go(term: string) {
    saveRecent(term);
    setOpen(false);
    router.push(`/products?search=${encodeURIComponent(term)}`);
  }

  function clearRecents() {
    setRecents([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  function goToProduct(p: Product) {
    setOpen(false);
    const cat = (p.category || "products").toLowerCase();
    const slug = p.slug || "";
    router.push(`/products/${cat}/${slug}`);
  }

  function highlight(text?: string, qstr?: string) {
    const t = text ?? "";
    const query = (qstr ?? q).trim();
    if (!query) return t;
    const i = t.toLowerCase().indexOf(query.toLowerCase());
    if (i < 0) return t;
    const before = t.slice(0, i);
    const mid = t.slice(i, i + query.length);
    const after = t.slice(i + query.length);
    return (
      <>
        {before}
        <mark className="bg-yellow-200/80 text-black px-0.5 rounded">{mid}</mark>
        {after}
      </>
    );
  }

  return (
    <div ref={boxRef} className={cx("relative", className)}>
      <div
        className="flex items-center gap-2 rounded-xl bg-white text-black px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/30"
        onFocus={() => setOpen(true)}
      >
        <Search size={18} className="opacity-70" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search products…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full bg-transparent outline-none placeholder:text-gray-400"
          aria-label="Search products"
        />
        {q && (
          <button
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Clear search"
            onClick={() => {
              setQ("");
              inputRef.current?.focus();
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {(open && (showRecents || results.length > 0)) && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border bg-white shadow-2xl overflow-hidden z-50">
          {/* Recents */}
          {showRecents && (
            <div className="p-2">
              <div className="flex items-center justify-between px-2 pb-1">
                <span className="text-xs font-medium text-gray-500">Recent searches</span>
                <button className="text-xs text-gray-500 hover:text-black" onClick={clearRecents}>
                  Clear
                </button>
              </div>
              {recents.map((r, idx) => (
                <button
                  key={r + idx}
                  className={cx(
                    "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left hover:bg-gray-50",
                    active === idx && "bg-gray-50"
                  )}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => go(r)}
                >
                  <Clock size={16} className="text-gray-400" />
                  <span className="truncate">{highlight(r, q)}</span>
                </button>
              ))}
              {results.length > 0 && <div className="mt-1 h-px bg-gray-100" />}
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <ul className="max-h-[60vh] overflow-auto p-2">
              {results.map((p, i) => {
                const idx = (showRecents ? recents.length : 0) + i;
                const cat = (p.category || "products").toLowerCase();
                const slug = p.slug || "";
                return (
                  <li key={`${cat}/${slug}-${i}`}>
                    <Link
                      href={`/products/${cat}/${slug}`}
                      className={cx(
                        "flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50",
                        active === idx && "bg-gray-50"
                      )}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => saveRecent(q)}
                    >
                      <div className="relative w-10 h-10 rounded border overflow-hidden bg-white shrink-0">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.title || "Product"}
                            fill
                            className="object-contain"
                            sizes="40px"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{highlight(p.title)}</p>
                        <p className="text-xs text-gray-500 truncate">{p.category}</p>
                      </div>
                      {typeof p.price === "number" && (
                        <span className="text-sm font-semibold text-gray-700">${p.price}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
