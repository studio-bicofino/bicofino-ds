import type { NextConfig } from 'next'
import path from 'path'

/* Multi-zone: o app é servido em bicofino.com/produtos via rewrites no apps/web
   (mesmo padrão do /brandsystem e /casa-nostra). O basePath garante que rotas,
   _next/* e assets respondam sob o prefixo — no domínio *.vercel.app as rotas
   também ficam sob /produtos (raiz dá 404, normal).
   turbopack.root aponta pro monorepo só no dev local (sem ele o servidor trava
   em toda requisição — ver project_turbopack_root). Na Vercel o upload contém
   só este app: a raiz é o próprio app, e o root externo desloca os manifests. */
const nextConfig: NextConfig = {
  basePath: '/produtos',
  ...(process.env.VERCEL
    ? {}
    : {
        turbopack: {
          root: path.resolve(__dirname, '../..'),
        },
      }),
}

export default nextConfig
