/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client'],
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Ensure proper handling of environment variables
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Handle trailing slashes
  trailingSlash: false,
  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
