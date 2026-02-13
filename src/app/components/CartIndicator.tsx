// src/app/components/CartIndicator.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import LocaleLink from "@/app/components/LocaleLink";

type CartItem = {
  slug: string;
  categorySlug: string;
  name: string;
  qty: number;
  price?: number;
  currency?: string;
  img?: string;
};

type Props = {
  className?: string;
};

/**
 * CartIndicator
 * - Fast + safe localStorage reads
 * - Listens to "cart-updated" custom event
 * - Avoids unnecessary re-renders
 * - Beginner-friendly, copy/paste ready
 */
export default function CartIndicator({ className = "" }: Props) {
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const [count, setCount] = useState<number>(0);

  // Keep last value to avoid pointless state updates
  const lastCountRef = useRef<number>(0);

  const loadCount = useCallback(() => {
    try {
      if (typeof window === "undefined") return;

      const raw = window.localStorage.getItem("yom-cart");
      if (!raw) {
        if (lastCountRef.current !== 0) {
          lastCountRef.current = 0;
          setCount(0);
        }
        return;
      }

      const cart: CartItem[] = JSON.parse(raw);
      const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

      if (lastCountRef.current !== totalQty) {
        lastCountRef.current = totalQty;
        setCount(totalQty);
      }
    } catch {
      // Fail silently (never break UI)
      if (lastCountRef.current !== 0) {
        lastCountRef.current = 0;
        setCount(0);
      }
    }
  }, []);

  useEffect(() => {
    // Initial load
    loadCount();

    // Custom event fired by AddToCartButton
    function onUpdate() {
      loadCount();
    }

    window.addEventListener("cart-updated", onUpdate);

    // Also sync across tabs/windows
    function onStorage(e: StorageEvent) {
      if (e.key === "yom-cart") {
        loadCount();
      }
    }

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("cart-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [loadCount]);

  return (
    <LocaleLink
      href="/cart"
      aria-label={isFR ? "Voir le panier" : "View cart"}
      className={`relative inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 hover:border-white/20 transition ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden md:inline">{isFR ? "Panier" : "Cart"}</span>

      {/* Badge */}
      <span
        className="min-w-[1.5rem] grid place-items-center rounded-full bg-[var(--brand-blue)] text-white text-[11px] font-semibold px-1.5 py-0.5 leading-none"
        style={{
          backgroundColor: "rgb(37,99,235)", // fallback if CSS var is missing
        }}
      >
        {count}
      </span>
    </LocaleLink>
  );
}
