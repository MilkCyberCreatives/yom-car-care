import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from './components/TopBar'
import MainHeader from './components/MainHeader'
import BreadcrumbBar from './components/BreadcrumbBar'
import Footer from './components/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const siteName = 'YOM Car Care'
const siteUrl = 'https://yomcarcare.com'
const siteDesc =
  'Premium car care products in Lubumbashi. Cash on Delivery. Exterior, interior, detailing & accessories.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Car Care Products in Lubumbashi`,
    template: `%s • ${siteName}`,
  },
  description: siteDesc,
  alternates: {
    canonical: '/',
    languages: { en: '/', fr: '/fr' },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteName,
    description: siteDesc,
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDesc,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0073e4',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    url: siteUrl,
    telephone: '+243848994045',
    email: 'info@yomcarcare.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '538 Avenue Kipopo, Golf Malela',
      addressLocality: 'Lubumbashi',
      addressCountry: 'CD'
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Script id="jsonld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {/* Global top UI */}
        <TopBar />
        <MainHeader />
        <BreadcrumbBar />

        {/* Page content */}
        {children}

        {/* Global footer */}
        <Footer />
      </body>
    </html>
  )
}
