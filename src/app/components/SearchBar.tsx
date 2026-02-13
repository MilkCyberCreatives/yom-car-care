// NEXT FILE: src/app/components/SearchBar.tsx
// ✅ Fixes 4 things:
// 1) Locale-aware navigation (uses useLocaleLink so /fr works)
// 2) Correct product routes (category slugs like "air-fresheners", not "Air Fresheners")
// 3) Image path support (img vs image, relative vs /products/...)
// 4) Better scoring + safe keyboard pool length, plus small UX polish

"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useLocaleLink from "@/hooks/useLocaleLink";
import { useI18n } from "@/hooks/useI18n";

/** tiny class combiner */
function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

/* ---------- types ---------- */

type Props = { className?: string };

type Product = {
  slug?: string;
  title?: string;
  name?: string;
  price?: number | string;
  currency?: string;
  // images could be `image` or `img`
  image?: string;
  img?: string;
  // category could be label or slug
  category?: string;
  categorySlug?: string;
};

import * as Featured from "@/data/featured";
import * as MostPurchased from "@/data/mostPurchased";
import * as AllProducts from "@/data/products";

/* ---------- helpers ---------- */

function flattenModule(mod: Record<string, unknown>): Product[] {
  const out: Product[] = [];
  for (const v of Object.values(mod)) {
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

const catSlug = (c?: string) =>
  (c || "")
    .toString()
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^products\//i, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();

function resolveImg(img: string | undefined, category: string | undefined) {
  if (!img) return "";
  if (img.startsWith("/")) return img;
  const cat = catSlug(category);
  return cat ? `/products/${cat}/${img}` : `/products/${img}`;
}

function normalizeProduct(p: Product) {
  const title = p.title ?? p.name ?? "";
  const slug = p.slug ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const category =
    catSlug(p.category) ||
    catSlug(p.categorySlug?.split("/").filter(Boolean).pop()) ||
    "accessories";

  const image = resolveImg(p.image ?? p.img, category);

  const priceRaw = p.price;
  const price = typeof priceRaw === "string" ? Number(priceRaw) || undefined : priceRaw;

  return { title, slug, category, image, price };
}

export default function SearchBar({ className }: Props) {
  const { l } = useLocaleLink();
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [recents, setRecents] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [debouncedQ, setDebouncedQ] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  /* Build product pool ONCE */
  const products = useMemo(() => {
    const pools = [
      ...flattenModule(Featured),
      ...flattenModule(MostPurchased),
      ...flattenModule(AllProducts),
    ].map(normalizeProduct);

    const seen = new Set<string>();
    const list: Array<ReturnType<typeof normalizeProduct>> = [];

    for (const p of pools) {
      if (!p?.slug || seen.has(p.slug)) continue;
      seen.add(p.slug);
      list.push(p);
    }
    return list;
  }, []);

  /* Load recent searches once */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecents(JSON.parse(raw));
    } catch {}
  }, []);

  /* Close on route change */
  useEffect(() => {
    setOpen(false);
    setActive(0);
  }, [pathname]);

  /* Click outside to close */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* Debounce input */
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q.trim()), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [q]);

  /* Results */
  const results = useMemo(() => {
    const query = debouncedQ.toLowerCase();
    if (!query) return [];

    return products
      .map((p) => {
        const hay = `${p.title} ${p.category}`.toLowerCase();
        const starts = p.title.toLowerCase().startsWith(query);
        const includes = hay.includes(query);

        const score = (starts ? 5 : 0) + (includes ? 2 : 0) + (p.category.startsWith(query) ? 1 : 0);
        return { p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((x) => x.p);
  }, [debouncedQ, products]);

  const showRecents = !debouncedQ && recents.length > 0;

  /* Keyboard nav */
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      const poolLen = (results.length || 0) + (showRecents ? recents.length : 0);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % Math.max(1, poolLen));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + Math.max(1, poolLen)) % Math.max(1, poolLen));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (!poolLen) return;

        if (showRecents && active < recents.length) {
          go(recents[active]);
        } else {
          const p = results[active - (showRecents ? recents.length : 0)];
          if (p) goToProduct(p.category, p.slug);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, results, recents, showRecents]);

  const saveRecent = useCallback(
    (term: string) => {
      const t = term.trim();
      if (!t) return;

      const next = [t, ...recents.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(
        0,
        MAX_RECENTS
      );

      setRecents(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
    },
    [recents]
  );

  const go = useCallback(
    (term: string) => {
      saveRecent(term);
      setOpen(false);
      router.push(l(`/products?search=${encodeURIComponent(term)}`));
    },
    [router, saveRecent, l]
  );

  const goToProduct = useCallback(
    (category: string, slug: string) => {
      setOpen(false);
      router.push(l(`/products/${catSlug(category)}/${slug}`));
    },
    [router, l]
  );

  const copy = useMemo(
    () => ({
      searchPlaceholder: isFR ? "Rechercher des produits..." : "Search products...",
      searchAria: isFR ? "Rechercher des produits" : "Search products",
      clearSearch: isFR ? "Effacer la recherche" : "Clear search",
      recentSearches: isFR ? "Recherches recentes" : "Recent searches",
      clear: isFR ? "Effacer" : "Clear",
      defaultProductAlt: isFR ? "Produit" : "Product",
    }),
    [isFR]
  );

  function highlight(text?: string) {
    const t = text ?? "";
    const query = (q ?? "").trim();
    if (!query) return t;

    const i = t.toLowerCase().indexOf(query.toLowerCase());
    if (i < 0) return t;

    return (
      <>
        {t.slice(0, i)}
        <mark className="bg-yellow-200/80 text-black px-0.5 rounded">
          {t.slice(i, i + query.length)}
        </mark>
        {t.slice(i + query.length)}
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
          placeholder={copy.searchPlaceholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full bg-transparent outline-none placeholder:text-gray-400"
          aria-label={copy.searchAria}
        />

        {q && (
          <button
            className="p-1 rounded hover:bg-gray-100"
            aria-label={copy.clearSearch}
            onClick={() => {
              setQ("");
              inputRef.current?.focus();
            }}
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {open && (showRecents || results.length > 0) && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border bg-white shadow-2xl overflow-hidden z-50">
          {/* Recents */}
          {showRecents && (
            <div className="p-2">
              <div className="flex items-center justify-between px-2 pb-1">
                <span className="text-xs font-medium text-gray-500">{copy.recentSearches}</span>
                <button
                  className="text-xs text-gray-500 hover:text-black"
                  onClick={() => {
                    setRecents([]);
                    try {
                      localStorage.removeItem(STORAGE_KEY);
                    } catch {}
                  }}
                  type="button"
                >
                  {copy.clear}
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
                  type="button"
                >
                  <Clock size={16} className="text-gray-400" />
                  <span className="truncate">{highlight(r)}</span>
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
                const href = l(`/products/${p.category}/${p.slug}`);

                return (
                  <li key={`${p.category}/${p.slug}-${i}`}>
                    <Link
                      href={href}
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
                            alt={p.title || copy.defaultProductAlt}
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

                      {typeof p.price === "number" ? (
                        <span className="text-sm font-semibold text-gray-700">${p.price}</span>
                      ) : null}
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




