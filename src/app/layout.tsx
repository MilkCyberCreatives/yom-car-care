// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { I18nProvider } from "@/hooks/useI18n";

// These two are Client Components, so we lazy-wrap them with a client boundary
import TopBar from "./components/TopBar";
import MainHeader from "./components/MainHeader";

export const metadata: Metadata = {
  title: "YOM Car Care — Premium Car Care Products in Lubumbashi",
  description:
    "High quality car care products: interior, exterior, detailing, accessories. Trusted in Lubumbashi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="bg-black text-white antialiased">
        {/* Default locale = en for root site.
           /fr/... will use its own layout.tsx that passes locale='fr' */}
        <I18nProvider locale="en">
          {/* sticky header stack */}
          <div className="relative z-[1000]">
            <TopBar />
            <MainHeader />
          </div>

          {/* page content */}
          <main className="relative z-0">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}
