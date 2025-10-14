/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Turn this OFF for now to prevent typed route compile errors on Vercel
  experimental: {
    typedRoutes: false,
  },

  // If you ever load remote images, add domains here:
  images: {
    remotePatterns: [
      // { protocol: 'https', hostname: 'images.example.com' },
    ],
  },

  // Keep the app directory enabled (default in Next 14)
  // appDir: true,
};

module.exports = nextConfig;
