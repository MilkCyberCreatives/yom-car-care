"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Lightweight client-only cart placeholder.
 * Replace this with your real cart UI when your CartProvider is ready.
 */
type CartItem = { id: string; name: string; qty: number };

export default function CartClient() {
  const [items, setItems] = useState<CartItem[] | null>(null);

  // Demo: read from localStorage if you want a quick test.
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        setItems(JSON.parse(raw));
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    }
  }, []);

  if (items === null) {
    return (
      <div className="rounded-2xl border border-gray-200 p-6 text-gray-600">
        Loading cart…
      </div>
    );
    }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 p-6">
        <p className="text-gray-700">Your cart is empty.</p>
        <div className="mt-4">
          <Link href="/products" className="underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <ul className="divide-y divide-gray-200">
        {items.map((it) => (
          <li key={it.id} className="py-3 flex items-center justify-between">
            <span className="font-medium">{it.name}</span>
            <span className="text-sm text-gray-600">x{it.qty}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-3">
        <button className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-50">
          Checkout
        </button>
        <Link href="/products" className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-50">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
