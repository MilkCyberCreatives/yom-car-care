import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YOM Car Care',
    short_name: 'YOM Car Care',
    description:
      'Premium car care products in Lubumbashi. Exterior, interior, detailing & accessories. Cash on Delivery.',
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    background_color: '#0B0B0C',
    theme_color: '#0073e4',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
