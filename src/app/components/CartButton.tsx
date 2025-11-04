"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function CartButton() {
  // protect against undefined store during hydration
  let count = 0;
  try {
    const cart = useCart();
    count = cart.totalCount ?? 0;
  } catch {
    // if the store hook throws on first SSR render, fallback to 0
    count = 0;
  }

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden md:inline">Cart</span>

      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] rounded-full bg-white text-[10px] font-bold text-zinc-900 grid place-items-center px-1">
          {count}
        </span>
      )}
    </Link>
  );
}
