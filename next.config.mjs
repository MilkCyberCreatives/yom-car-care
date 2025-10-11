/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'shop.fra-ber.it' }
    ]
  },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    // Next 14 validation prefers false or omission; remove if you want default behavior.
    localeDetection: false
  }
}

export default nextConfig
