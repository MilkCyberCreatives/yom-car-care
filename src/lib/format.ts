// src/lib/format.ts

/** Formats price values that might be string or number. */
export function formatPrice(
  value: number | string | null | undefined,
  currency: string = "USD"
): string {
  // Accept strings like "9.50", "USD 9.50", etc.
  const n =
    typeof value === "string"
      ? Number(value.replace(/[^\d.]/g, ""))
      : value ?? null;

  if (typeof n !== "number" || !isFinite(n)) return "";

  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "CDF" ? 0 : 0,
      maximumFractionDigits: currency === "CDF" ? 0 : 2,
    }).format(n);
  } catch {
    const symbol = currency === "CDF" ? "FC" : "$";
    return `${symbol}${n.toLocaleString()}`;
  }
}
