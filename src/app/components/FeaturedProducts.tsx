// src/app/components/FeaturedProducts.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "@/app/components/LocaleLink";
import useLocaleLink from "@/hooks/useLocaleLink";
import { featuredHome, type FPItem as FPItemIn } from "@/data/featured";
import AddToCartButton from "@/app/components/AddToCartButton";
import { useI18n } from "@/hooks/useI18n";

/** Input items can be from data/featured (FPItemIn) or any legacy shape */
type LegacyItem = {
  slug?: string;
  title?: string;
  name?: string;
  image?: string;
  img?: string;
  price?: number | string;
  currency?: "USD" | "CDF" | string;
  category?: string; // "Exterior" | "exterior" | "/products/exterior"
  categorySlug?: string;
  href?: string;
  badge?: string | React.ReactNode;
};

type AnyItem = FPItemIn | LegacyItem;

/** Output we render with (category is string so we allow air-fresheners etc.) */
type FPItem = {
  slug: string;
  name: string;
  img: string;
  price: number;
  currency: "USD" | "CDF" | string;
  category: string; // slug form like "exterior"
  href?: string;
  badge?: string | React.ReactNode;
};

/* ---------------- helpers ---------------- */

const catSlug = (c?: string) =>
  (c || "")
    .toString()
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^products\//i, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();

function prettyCat(c?: string, locale: "en" | "fr" = "en") {
  const key = catSlug(c);
  const isFR = locale === "fr";

  switch (key) {
    case "exterior":
      return isFR ? "Extérieur" : "Exterior";
    case "interior":
      return isFR ? "Intérieur" : "Interior";
    case "detailing":
      return isFR ? "Détailling" : "Detailing";
    case "accessories":
      return isFR ? "Accessoires" : "Accessories";
    case "air-fresheners":
      return isFR ? "Désodorisants" : "Air Fresheners";
    default:
      return "—";
  }
}

function formatPrice(n: number, currency = "USD") {
  return (currency === "CDF" ? "CDF " : "$") + (Number.isFinite(n) ? n.toLocaleString() : "0");
}

/** Build absolute product image path. */
function resolveImg(img: string | undefined, category: string | undefined) {
  if (!img) return "";
  if (img.startsWith("/")) return img;
  const cat = catSlug(category);
  return cat ? `/products/${cat}/${img}` : `/products/${img}`;
}

/** Normalize any incoming shape to FPItem */
function normalize(item: AnyItem): FPItem {
  const any = item as any;

  const name: string = any?.name ?? any?.title ?? "Product";
  const roughSlug: string =
    any?.slug ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const rawCat: string =
    any?.category ??
    (any?.categorySlug ? String(any.categorySlug).split("/").filter(Boolean).pop() : undefined) ??
    "accessories";

  const category = catSlug(rawCat) || "accessories";

  const imgRaw: string | undefined = any?.img ?? any?.image ?? "";
  const img = resolveImg(imgRaw, category);

  const priceRaw = any?.price;
  const price: number = typeof priceRaw === "string" ? Number(priceRaw) || 0 : priceRaw ?? 0;
  const currency: FPItem["currency"] = any?.currency ?? "USD";

  const slug = roughSlug;
  const href: string | undefined = any?.href ?? `/products/${category}/${slug}`;

  return {
    slug,
    name,
    img,
    price,
    currency,
    category,
    href,
    badge: any?.badge,
  };
}

/* ---------------- lightweight scroll-reveal (no framer, fast) ---------------- */

function useInViewOnce<T extends HTMLElement>(threshold = 0.15) {
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

export default function FeaturedProducts({
  heading,
  products,
  viewAllHref = "/products",
}: {
  heading?: string;
  products?: AnyItem[] | unknown;
  viewAllHref?: string;
}) {
  const { l } = useLocaleLink();
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const copy = useMemo(() => {
    return {
      eyebrow: isFR ? "Nos choix" : "Our picks",
      title: heading ?? (isFR ? "Produits en vedette" : "Featured Products"),
      viewAll: isFR ? "Voir tout" : "View All",
      empty: isFR ? "Aucun produit à afficher pour le moment." : "No products to show yet.",
      noImage: isFR ? "Aucune image" : "No image",
    };
  }, [heading, isFR]);

  const rawList: AnyItem[] = (Array.isArray(products) ? (products as AnyItem[]) : featuredHome) ?? [];

  const list: FPItem[] = useMemo(() => rawList.map(normalize), [rawList]);

  const { ref: sectionRef, inView } = useInViewOnce<HTMLDivElement>(0.12);

  return (
    <section className="container-px my-14">
      <div
        ref={sectionRef}
        className={[
          "transition-all duration-700 will-change-transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        ].join(" ")}
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[13px] uppercase tracking-widest text-white/60">{copy.eyebrow}</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold">{copy.title}</h2>
          </div>

          <Link href={l(viewAllHref)} className="btn-ghost">
            {copy.viewAll}
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-zinc-900/40 p-6 text-white/70">
            {copy.empty}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p, idx) => {
              const href = l(p.href || `/products/${p.category}/${p.slug}`);
              const delayMs = Math.min(idx, 7) * 60;

              return (
                <article
                  key={p.slug || `feat-${idx}`}
                  className={[
                    "group rounded-2xl border border-white/10 bg-zinc-900/40",
                    "transition duration-300",
                    "hover:bg-zinc-900/60 hover:border-white/20 hover:-translate-y-0.5",
                    "hover:shadow-[0_18px_50px_rgba(0,0,0,0.55)]",
                    "will-change-transform",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  ].join(" ")}
                  style={{ transitionDelay: inView ? `${delayMs}ms` : "0ms" }}
                >
                  <div className="relative rounded-t-2xl overflow-hidden bg-black/15">
                    {p.badge ? (
                      <div className="absolute top-2 right-2 z-10">
                        {typeof p.badge === "string" ? (
                          <span className="text-xs rounded-md bg-white/10 px-2 py-1 backdrop-blur">
                            {p.badge}
                          </span>
                        ) : (
                          p.badge
                        )}
                      </div>
                    ) : null}

                    <Link href={href} className="block w-full h-64 grid place-items-center">
                      {p.img ? (
                        <img
                          src={p.img}
                          alt={p.name}
                          className={[
                            "max-h-full max-w-full object-contain",
                            "transition-transform duration-300",
                            "group-hover:scale-[1.03]",
                          ].join(" ")}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-white/40">
                          {copy.noImage}
                        </div>
                      )}
                    </Link>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold leading-snug line-clamp-2">
                        <Link href={href} className="hover:underline decoration-white/30">
                          {p.name}
                        </Link>
                      </h3>

                      <AddToCartButton
                        variant="icon"
                        product={{
                          slug: p.slug,
                          categorySlug: p.category,
                          name: p.name,
                          price: p.price,
                          currency: p.currency,
                          img: p.img,
                        }}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="rounded-md bg-white/10 px-2 py-1 capitalize">
                        {prettyCat(p.category, locale)}
                      </span>
                      <span className="font-medium">{formatPrice(p.price, p.currency)}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
