// src/app/cart/page.tsx

// Do NOT prerender this page; render it on the client only.
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

// If you already have a client cart component, point to it here and keep `ssr: false`.
// Example: dynamic(() => import("./CartClient"), { ssr: false })
// If you don't have one yet, this file will just show a friendly placeholder.

const CartClient = dynamic(() => import("./CartClient").catch(() => null), {
  ssr: false,
  // You can optionally show a tiny skeleton while the client loads:
  loading: () => (
    <div className="container-px py-12 text-gray-600">
      <div className="mb-4 h-6 w-40 rounded bg-gray-200" />
      <div className="h-24 w-full rounded-2xl border border-gray-200" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Your Cart | YOM Car Care",
  description: "Review items in your shopping cart.",
};

export default function CartPage() {
  return (
    <main className="container-px py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
        <p className="mt-2 text-sm text-gray-600">
          This page renders on the client to support interactive cart state.
        </p>
      </header>

      {/* Try to render your client cart if it exists */}
      {CartClient ? (
        <CartClient />
      ) : (
        <div className="rounded-2xl border border-gray-200 p-6">
          <p className="text-gray-700">
            Cart UI not found. Create{" "}
            <code className="font-mono">src/app/cart/CartClient.tsx</code> with your cart
            component, and it will load here automatically.
          </p>
          <div className="mt-4">
            <Link href="/products" className="underline">
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
