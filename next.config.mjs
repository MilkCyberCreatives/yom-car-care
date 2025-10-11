/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow remote images (we're using Unsplash placeholders for now)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'shop.fra-ber.it' }
    ]
  },

  // Simple i18n: English default, French available (URL prefix /fr)
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localeDetection: true
  }
}

export default nextConfig
