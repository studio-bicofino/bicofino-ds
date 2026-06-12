import type { NextConfig } from 'next'
import path from 'path'
import fs from 'fs'

// Monorepo: sem turbopack.root o Turbopack infere o workspace root errado —
// o dev server sobe mas trava em todo request HTTP. Condicional p/ não quebrar
// deploys de worktree onde a raiz não existe.
const monorepoRoot = path.resolve(__dirname, '../..')
const isMonorepo = fs.existsSync(path.join(monorepoRoot, 'package.json'))

const nextConfig: NextConfig = {
  ...(isMonorepo ? { turbopack: { root: monorepoRoot } } : {}),
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
