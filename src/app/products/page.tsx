import { Suspense } from "react";
import { products } from "@/data/products";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Products • YOM Car Care",
  description:
    "Browse exterior, interior, detailing, accessories, and air fresheners. Cash on Delivery in Lubumbashi.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main className="container-px py-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Products</h1>

      <Suspense fallback={<div className="mt-6 text-white/60">Loading…</div>}>
        <div className="mt-6">
          {/* ✅ Now correctly typed to accept props */}
          <ProductsClient items={products} />
        </div>
      </Suspense>
    </main>
  );
}
