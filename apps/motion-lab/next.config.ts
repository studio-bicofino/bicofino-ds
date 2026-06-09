import type { NextConfig } from 'next'
import path from 'path'
import fs from 'fs'

// No monorepo local, o root do Turbopack é a raiz do repo (obrigatório — sem isso o
// dev server trava). Num deploy standalone (Vercel com root = este app), a raiz do
// monorepo não existe — aí deixamos o Next inferir sozinho.
const monorepoRoot = path.resolve(__dirname, '../..')
const isMonorepo = fs.existsSync(path.join(monorepoRoot, 'package.json'))

const nextConfig: NextConfig = {
  ...(isMonorepo ? { turbopack: { root: monorepoRoot } } : {}),
}

export default nextConfig
