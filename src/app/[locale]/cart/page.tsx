// src/app/[locale]/cart/page.tsx

export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import NextDynamic from "next/dynamic";
import Link from "next/link";

// Absolute import to reuse the same client component
const CartClient = NextDynamic(
  () => import("../cart/CartClient").then((m) => m.default).catch(() => null),
  {
    ssr: false,
    loading: () => (
      <div className="container-px py-12 text-gray-600">
        <div className="mb-4 h-6 w-40 rounded bg-gray-200" />
        <div className="h-24 w-full rounded-2xl border border-gray-200" />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Your Cart | YOM Car Care",
  description: "Review items in your shopping cart.",
};

export default function LocaleCartPage() {
  return (
    <main className="container-px py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
        <p className="mt-2 text-sm text-gray-600">
          This page renders on the client to support interactive cart state.
        </p>
      </header>

      {CartClient ? (
        <CartClient />
      ) : (
        <div className="rounded-2xl border border-gray-200 p-6">
          <p className="text-gray-700">
            Cart UI not found. Create{" "}
            <code className="font-mono">src/app/cart/CartClient.tsx</code> and it will load here automatically.
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
