import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YOM Car Care',
    short_name: 'YOM Car Care',
    description:
      'Premium car care products in Lubumbashi. Exterior, interior, detailing & accessories. Cash on Delivery.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0B0B0C',
    theme_color: '#0073e4',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
