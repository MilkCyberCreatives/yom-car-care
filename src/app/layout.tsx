// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import TopBar from "./components/TopBar";
import MainHeader from "./components/MainHeader";
import BreadcrumbBar from "./components/BreadcrumbBar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import SeoBreadcrumbJsonLd from "./components/SeoBreadcrumbJsonLd";
import Analytics from "./components/Analytics";

import CompareProvider from "@/components/compare/CompareProvider";
import CompareBar from "@/components/compare/CompareBar";

import EnquiryProvider from "@/components/enquiry/EnquiryProvider";
import EnquiryBar from "@/components/enquiry/EnquiryBar";

import Script from "next/script";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteName = "YOM Car Care";
const siteUrl = "https://yomcarcare.com";
const siteDesc =
  "Premium car care products in Lubumbashi. Cash on Delivery. Exterior, interior, detailing & accessories.";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// ——— Metadata ———
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Car Care Products in Lubumbashi`,
    template: `%s • ${siteName}`,
  },
  description: siteDesc,
  alternates: {
    canonical: siteUrl,
    languages: {
      en: `${siteUrl}/`,
      fr: `${siteUrl}/fr`,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description: siteDesc,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
  },
  icons: {
    // Use the SVG favicon in /public with ICO fallback
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    // iOS home screen prefers PNG
    apple: "/apple-touch-icon.png",
    // Optional: Safari pinned tab (add file if you have it)
    // other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0073e4" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0073e4",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // LocalBusiness JSON-LD
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    url: siteUrl,
    telephone: "+243848994045",
    email: "info@yomcarcare.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "538 Avenue Kipopo, Golf Malela",
      addressLocality: "Lubumbashi",
      addressCountry: "CD",
    },
    paymentAccepted: "Cash",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* JSON-LD */}
        <Script
          id="jsonld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {/* Google Analytics (optional) */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'analytics_storage': 'denied',
                  'functionality_storage':'granted',
                  'security_storage':'granted'
                });
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}

        {/* Providers */}
        <EnquiryProvider>
          <CompareProvider>
            {/* Top chrome & SEO helpers */}
            <Suspense fallback={null}>
              <TopBar />
              <MainHeader />
              <BreadcrumbBar />
              <SeoBreadcrumbJsonLd />
              <Analytics />
            </Suspense>

            {/* Page content */}
            <Suspense fallback={null}>{children}</Suspense>

            {/* Footer & site chrome */}
            <Footer />
            <CookieConsent />

            {/* Floating bars */}
            <CompareBar />
            <EnquiryBar />
          </CompareProvider>
        </EnquiryProvider>
      </body>
    </html>
  );
}
