/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Keep this off until all hrefs strictly match generated route types
  experimental: {
    typedRoutes: false,
  },

  // Allow Next/Image to optimize your remote images (Unsplash demo URLs)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // If you ever need to set custom headers or redirects, add them here:
  // async headers() { return []; },
  // async redirects() { return []; },
};

export default nextConfig;
