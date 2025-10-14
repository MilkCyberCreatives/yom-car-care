import { Suspense } from "react";
import { products, type ProductData } from "@/data/products";
import PC, { type ProductsClientProps } from "./ProductsClient";

/**
 * Some repo setups accidentally re-export a *type* named ProductsClient
 * or shadow the value import. This local alias + type assertion guarantees
 * JSX sees a component that accepts `{ items: ProductData[] }`.
 */
const ProductsClient =
  PC as unknown as React.ComponentType<ProductsClientProps>;

export const metadata = {
  title: "Products • YOM Car Care",
  description:
    "Browse exterior, interior, detailing, accessories, and air fresheners. Cash on Delivery in Lubumbashi.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  // Extra runtime guard (harmless in prod) to avoid odd runtime crashes
  const list: ProductData[] = Array.isArray(products) ? products : [];

  return (
    <main className="container-px py-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Products</h1>

      <Suspense fallback={<div className="mt-6 text-white/60">Loading…</div>}>
        <div className="mt-6">
          <ProductsClient items={list} />
        </div>
      </Suspense>
    </main>
  );
}
