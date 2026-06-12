import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Multi-zone: o app é servido em bicofino.com/casa-nostra via rewrites no
  // apps/web (mesmo padrão do /brandsystem). O basePath garante que rotas,
  // _next/* e assets respondam sob o prefixo. Efeito colateral: no domínio
  // *.vercel.app as rotas também ficam sob /casa-nostra (raiz dá 404 — normal).
  basePath: '/casa-nostra',
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
}

export default nextConfig
