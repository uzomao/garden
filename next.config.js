/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    PORTFOLIO_CONTENTFUL_SPACE_ID: process.env.PORTFOLIO_CONTENTFUL_SPACE_ID,
    PORTFOLIO_CONTENTFUL_ACCESS_TOKEN: process.env.PORTFOLIO_CONTENTFUL_ACCESS_TOKEN
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.ctfassets.net',
      },
    ],
  },
}

module.exports = nextConfig
