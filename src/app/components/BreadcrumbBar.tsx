'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Global breadcrumb with a background image.
 * Automatically hides on the Home page ("/" and "/fr").
 */
export default function BreadcrumbBar() {
  const pathname = (usePathname() || '/').replace(/\/+$/, '') || '/'
  const isHome = pathname === '/' || pathname === '/fr'
  if (isHome) return null

  const segments = pathname.split('/').filter(Boolean)

  const titleCase = (s: string) =>
    s.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())

  const labelFor = (seg: string) => {
    switch (seg) {
      case 'products': return 'Products'
      case 'about': return 'About Us'
      case 'contact': return 'Contact'
      case 'faq': return 'FAQ'
      case 'legal-area': return 'Legal Area'
      case 'privacy-policy': return 'Privacy Policy'
      case 'cookie-policy': return 'Cookie Policy'
      case 'terms': return 'General Terms of Use'
      case 'exterior': return 'Exterior'
      case 'interior': return 'Interior'
      case 'air-fresheners': return 'Air Fresheners'
      case 'detailing': return 'Detailing'
      case 'accessories': return 'Accessories'
      default: return titleCase(seg)
    }
  }

  const top = segments[0] ?? ''
  const bannerForTop = (t: string) => {
    switch (t) {
      case 'products':
        return 'https://images.unsplash.com/photo-1542365887-1f7475d0d34a?q=80&w=1600&auto=format&fit=crop'
      case 'about':
        return 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop'
      case 'contact':
        return 'https://images.unsplash.com/photo-1520949121-7b225f0b9b37?q=80&w=1600&auto=format&fit=crop'
      default:
        return 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop'
    }
  }

  const bg = bannerForTop(top)

  const crumbs = [
    { href: '/', label: 'Home' },
    ...segments.map((seg, i) => {
      const href = '/' + segments.slice(0, i + 1).join('/')
      return { href, label: labelFor(seg) }
    }),
  ]

  const heading = crumbs[crumbs.length - 1]?.label || 'Home'

  return (
    <section
      className="relative border-b border-white/10"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-px py-8 md:py-12">
        <h1 className="text-2xl md:text-4xl font-semibold">{heading}</h1>

        <nav aria-label="Breadcrumb" className="mt-3 text-sm text-white/80">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <span key={c.href}>
                {!isLast ? (
                  <>
                    <Link href={c.href} className="hover:underline">{c.label}</Link>
                    <span className="mx-2">/</span>
                  </>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
