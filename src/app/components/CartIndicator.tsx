"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type CartItem = {
  slug: string;
  categorySlug: string;
  name: string;
  qty: number;
  price?: number;
  currency?: string;
  img?: string;
};

export default function CartIndicator({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number>(0);

  // read from localStorage
  function loadCount() {
    try {
      const raw = window.localStorage.getItem("yom-cart");
      if (!raw) {
        setCount(0);
        return;
      }
      const cart: CartItem[] = JSON.parse(raw);
      const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
      setCount(totalQty);
    } catch {
      setCount(0);
    }
  }

  useEffect(() => {
    loadCount();
    // listen for "cart-updated" events fired by AddToCartButton
    function onUpdate() {
      loadCount();
    }
    window.addEventListener("cart-updated", onUpdate as EventListener);
    return () => {
      window.removeEventListener("cart-updated", onUpdate as EventListener);
    };
  }, []);

  return (
    <Link
      href="/cart"
      className={`relative inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 hover:border-white/20 transition ${className}`}
      aria-label="View cart"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden md:inline">Cart</span>
      <span
        className="min-w-[1.5rem] grid place-items-center rounded-full bg-[var(--brand-blue)] text-white text-[11px] font-semibold px-1.5 py-0.5 leading-none"
        style={{
          backgroundColor: "rgb(37,99,235)", // fallback if --brand-blue missing
        }}
      >
        {count}
      </span>
    </Link>
  );
}
