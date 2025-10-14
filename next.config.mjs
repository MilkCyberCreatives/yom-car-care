/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: false },
  images: {
    remotePatterns: [
      // add remote hosts here if you switch back to next/image
      // { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
