import type { NextConfig } from 'next'
import path from 'path'

/* turbopack.root aponta pro monorepo só no dev local (sem ele o servidor trava
   em toda requisição — ver project_turbopack_root). Na Vercel o upload contém
   só este app: a raiz é o próprio app, e o root externo desloca os manifests. */
const nextConfig: NextConfig = process.env.VERCEL
  ? {}
  : {
      turbopack: {
        root: path.resolve(__dirname, '../..'),
      },
    }

export default nextConfig
