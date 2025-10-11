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
      {/* BreadcrumbBar is already rendered globally, so we start with the hero/content */}
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
