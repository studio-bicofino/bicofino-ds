import type { NextConfig } from 'next'
import path from 'path'
import fs from 'fs'

const monorepoRoot = path.resolve(__dirname, '../..')
const isMonorepo = fs.existsSync(path.join(monorepoRoot, 'package.json'))

const nextConfig: NextConfig = {
  ...(isMonorepo ? { turbopack: { root: monorepoRoot } } : {}),
  async redirects() {
    // o Radar virou Consigliere em 11/06
    return [{ source: '/radar', destination: '/consigliere', permanent: true }]
  },
}

export default nextConfig
