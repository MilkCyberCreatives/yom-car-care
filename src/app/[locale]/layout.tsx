// src/app/[locale]/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YOM Car Care",
  description: "Premium car care products.",
  openGraph: {
    type: "website",
    title: "YOM Car Care",
    description: "Premium car care products.",
    url: "https://yomcarcare.com",
  },
};

/**
 * IMPORTANT:
 * No <html> or <body> here. Root layout owns them and wraps with CartProvider.
 * This keeps your original page structure/styles exactly as before.
 */
export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
