"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useI18n } from "@/hooks/useI18n";
import LocaleLink from "@/app/components/LocaleLink";

function runSearch(q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) => {
    const hay = [p.name, p.category, p.size || "", (p.badges || []).join(" ")]
      .join(" ")
      .toLowerCase();
    return hay.includes(term);
  });
}

export default function SearchClient() {
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const params = useSearchParams();
  const q = params.get("q") || "";
  const results = useMemo(() => runSearch(q), [q]);

  return (
    <section className="mt-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-white/80">
          {q ? (
            <>
              {results.length}{" "}
              {isFR ? `resultat${results.length !== 1 ? "s" : ""}` : `result${results.length !== 1 ? "s" : ""}`}{" "}
              {isFR ? "pour" : "for"} <span className="font-semibold">'{q}'</span>
            </>
          ) : (
            <>{isFR ? "Tapez une recherche ci-dessus." : "Type a search above."}</>
          )}
        </div>
        <LocaleLink href="/products" className="btn-ghost">
          {isFR ? "Voir tout" : "Browse all"}
        </LocaleLink>
      </div>

      {q ? (
        results.length ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-white/70">
            {isFR ? "Aucun produit trouve. Essayez un autre mot-cle ou " : "No products matched. Try a different keyword or "}
            <LocaleLink href="/products" className="underline">
              {isFR ? "voir tous les produits" : "browse all products"}
            </LocaleLink>
            .
          </p>
        )
      ) : null}
    </section>
  );
}
