import type { Product } from "@/lib/products";

/** Format a number as localized currency. */
export function formatMoney(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      // Remove the cents for currencies that don't commonly use them if you prefer:
      // minimumFractionDigits: 0,
      // maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Fallback if Intl throws for some reason
    const sign = currency === "CDF" ? "CDF " : "$";
    return `${sign}${Number.isFinite(amount) ? amount.toLocaleString() : "0"}`;
  }
}

/** Safely format a product's price (returns "" if price is missing). */
export function formatProductPrice(p: Product, locale: string = "en-US"): string {
  const price =
    typeof p.price === "number" && Number.isFinite(p.price) ? p.price : undefined;
  if (price === undefined) return "";

  const currency =
    typeof p.currency === "string" && p.currency ? p.currency : "USD";

  return formatMoney(price, currency, locale);
}
