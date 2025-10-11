import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YOM Car Care',
    short_name: 'YOM',
    description: 'Premium car care products in Lubumbashi. Cash on Delivery.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b0b0c',
    theme_color: '#0073e4',
    icons: [
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}
