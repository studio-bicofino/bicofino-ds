import type { NextConfig } from 'next'
import path from 'path'
import fs from 'fs'

const monorepoRoot = path.resolve(__dirname, '../..')
const isMonorepo = fs.existsSync(path.join(monorepoRoot, 'package.json'))

const nextConfig: NextConfig = {
  // Multi-zone: o app é servido em bicofino.com/la-rete via rewrites no
  // apps/web (mesmo padrão do /brandsystem, /casa-nostra e /produtos). O basePath
  // garante que rotas, _next/* e assets respondam sob o prefixo. Efeito colateral:
  // no domínio *.vercel.app as rotas também ficam sob /la-rete (raiz dá 404 — normal).
  basePath: '/la-rete',
  ...(isMonorepo ? { turbopack: { root: monorepoRoot } } : {}),
  async redirects() {
    // o Radar virou Consigliere em 11/06
    return [{ source: '/radar', destination: '/consigliere', permanent: true }]
  },
}

export default nextConfig
