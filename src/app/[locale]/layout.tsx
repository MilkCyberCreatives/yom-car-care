// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "YOM Car Care",
  description: "Premium car care products.",
  openGraph: {
    type: "website",
    title: "YOM Car Care",
    description: "Premium car care products.",
    url: "https://yomcarcare.com", // TODO: replace with real domain
  },
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}
