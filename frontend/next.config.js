/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
    unoptimized: true, // For static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  },
  // Enable static export for deployment on Vercel, Netlify, etc.
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;