import type { Metadata, Viewport } from "next";

import "./globals.css";
import JsonLd from "@/app/components/JsonLd";
import {
  ALL_SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  localeAlternates,
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Car Care in Lubumbashi`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Premium car care products in Lubumbashi, Democratic Republic of the Congo. English/French support and cash on delivery.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/en",
    languages: localeAlternates("/"),
  },
  keywords: [...ALL_SEO_KEYWORDS],
  openGraph: {
    type: "website",
    url: absoluteUrl("/en"),
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Car Care in Lubumbashi`,
    description:
      "Premium car care products in Lubumbashi, DRC. Exterior, interior, detailing and accessories with cash on delivery.",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Lubumbashi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Car Care in Lubumbashi`,
    description:
      "Premium car care products in Lubumbashi, DRC with cash on delivery.",
    images: [absoluteUrl("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "t2PjQPbHSySGqeSRuR8Njmk9CNGg6Hq-LbdDUtAEyQw",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  other: {
    "geo.region": "CD-HK",
    "geo.placename": "Lubumbashi",
    "geo.position": "-11.6647;27.4794",
    ICBM: "-11.6647, 27.4794",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-950 text-white antialiased">
        <JsonLd id="org-jsonld" data={organizationJsonLd()} />
        <JsonLd id="localbusiness-jsonld" data={localBusinessJsonLd()} />
        <JsonLd id="website-jsonld" data={websiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
