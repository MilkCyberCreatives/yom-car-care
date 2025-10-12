// src/app/page.tsx
import Hero from './components/Hero'
import CategoryStrip from './components/CategoryStrip'
import FeaturedProducts from './components/FeaturedProducts'
import Benefits from './components/Benefits'
import BrandBar from './components/BrandBar'
import CTABanner from './components/CTABanner'
import FAQ from './components/FAQ'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export const metadata = {
  title: 'YOM Car Care — Car Care Products in Lubumbashi (Cash on Delivery)',
  description:
    'Discover exterior, interior, detailing, accessories, and air fresheners. Cash on Delivery in Lubumbashi. English/French support.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'YOM Car Care — Car Care Products in Lubumbashi',
    description:
      'Exterior, interior, detailing, and accessories with Cash on Delivery. English/French support.',
    url: '/',
    siteName: 'YOM Car Care',
  },
}

export default function HomePage() {
  return (
    <>
      {/* TopBar + MainHeader come from layout.tsx (no breadcrumb on home) */}
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <Benefits />
      <BrandBar />
      <CTABanner />
      <FAQ />
      <FloatingWhatsApp />
    </>
  )
}
