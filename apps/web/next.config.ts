import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
  },
  async redirects() {
    // Brand rename: On/Off Field → On/Off Pitch. Keep old URLs working.
    return [
      { source: '/on-field', destination: '/on-pitch', permanent: true },
      { source: '/off-field', destination: '/off-pitch', permanent: true },
    ]
  },
}

export default nextConfig
