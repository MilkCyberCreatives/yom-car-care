// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yom-car-care.vercel.app";

export const metadata: Metadata = {
  title: "YOM Car Care — Lubumbashi",
  description: "Professional car care products in Lubumbashi. English/French. Cash on Delivery.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-950 text-white antialiased">{children}</body>
    </html>
  );
}
