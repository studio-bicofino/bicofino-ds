import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Monorepo: o pacote `next` vive no node_modules da raiz, não em apps/docs-site.
  // Sem isto o Turbopack infere o workspace root errado e o build falha / o dev
  // sobe mas trava em todo request. Aponta para a raiz do monorepo.
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
}

export default nextConfig
