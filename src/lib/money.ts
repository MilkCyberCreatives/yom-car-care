// src/lib/money.ts

import type { Product } from "@/lib/products";

/** Format a numeric amount as money (defaults to USD) */
export function formatMoney(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: amount % 1 ? 2 : 0,
    }).format(amount);
  } catch {
    // Fallback if an unknown currency code is passed
    return `$${amount.toFixed(amount % 1 ? 2 : 0)}`;
  }
}

/** Safely format a product's price */
export function formatProductPrice(p: Product, locale = "en-US"): string {
  if (p.price == null || p.price === "") return "";
  if (typeof p.price === "number") {
    return formatMoney(p.price, (p.currency as string) || "USD", locale);
  }
  // price as a string like "From $9" or "Contact"
  return p.price;
}
