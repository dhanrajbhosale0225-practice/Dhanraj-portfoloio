/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
    unoptimized: process.env.VERCEL !== '1',
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://dhanraj-portfolio-api.onrender.com/api',
  },
  trailingSlash: true,
};

module.exports = nextConfig;