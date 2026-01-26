/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  },
  // Use standalone for Docker, export for static hosting
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : 'export',
  trailingSlash: true,
};

module.exports = nextConfig;