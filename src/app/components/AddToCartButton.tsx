"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";

export type CartPayload = {
  slug: string;
  categorySlug: string;
  name: string;
  price?: number;
  currency?: string;
  img?: string;
};

type Props = {
  product: CartPayload;
  /** "icon" = small round icon button in cards, "primary" = large CTA on PDP */
  variant?: "icon" | "primary" | "ghost";
  className?: string;
};

export default function AddToCartButton({
  product,
  variant = "icon",
  className = "",
}: Props) {
  const { locale } = useI18n();
  const isFR = locale === "fr";
  const [added, setAdded] = useState(false);
  const addToCartLabel = isFR ? "Ajouter au panier" : "Add to cart";
  const addedLabel = isFR ? "Ajoute" : "Added!";

  function handleClick() {
    try {
      const key = "yom-cart";
      const raw = window.localStorage.getItem(key);
      const cart: Array<{
        slug: string;
        categorySlug: string;
        name: string;
        qty: number;
        price?: number;
        currency?: string;
        img?: string;
      }> = raw ? JSON.parse(raw) : [];

      // check if item already in cart
      const idx = cart.findIndex(
        (i) =>
          i.slug === product.slug && i.categorySlug === product.categorySlug
      );

      if (idx >= 0) {
        cart[idx].qty += 1;
      } else {
        cart.push({
          slug: product.slug,
          categorySlug: product.categorySlug,
          name: product.name,
          qty: 1,
          price: product.price,
          currency: product.currency,
          img: product.img,
        });
      }

      window.localStorage.setItem(key, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: cart }));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  }

  // styling presets
  if (variant === "primary") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={addToCartLabel}
        className={`btn-primary flex items-center gap-2 ${className}`}
      >
        <ShoppingCart className="h-4 w-4" />
        {added ? addedLabel : addToCartLabel}
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={addToCartLabel}
        className={`btn-ghost flex items-center gap-2 ${className}`}
      >
        <ShoppingCart className="h-4 w-4" />
        {added ? addedLabel : addToCartLabel}
      </button>
    );
  }

  // default "icon" (small round icon button in cards)
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={addToCartLabel}
      className={`shrink-0 rounded-xl border border-white/10 px-2.5 py-2 hover:bg-white/10 transition ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
    </button>
  );
}
