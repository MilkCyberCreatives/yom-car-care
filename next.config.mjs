/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // keep anything else you already had here
  experimental: {
    typedRoutes: true,
  },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },

  images: {
    // Either "domains" or "remotePatterns" works. RemotePatterns is more flexible.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Optional: allow these Unsplash hosts too, if you might use them.
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
    // Optional but recommended: modern formats
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
