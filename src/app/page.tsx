// src/app/page.tsx
import Hero from './components/Hero'
import CategoryStrip from './components/CategoryStrip'
import FeaturedProducts from './components/FeaturedProducts'
import Benefits from './components/Benefits'
import BrandBar from './components/BrandBar'
import CTABanner from './components/CTABanner'
import FAQ from './components/FAQ'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function HomePage() {
  return (
    <>
      {/* TopBar + MainHeader + (no Breadcrumb on home) come from layout.tsx */}
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
