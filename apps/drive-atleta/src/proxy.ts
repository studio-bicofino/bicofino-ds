import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Proteção das superfícies destrutivas (painel + APIs de delete/share/curate)
// via HTTP Basic Auth. OPT-IN: só ativa quando DRIVE_ATLETA_PANEL_USER e
// DRIVE_ATLETA_PANEL_PASS estiverem setadas no ambiente — sem as envs, o
// comportamento é o atual (tudo aberto). As rotas dos atletas (/a/[slug],
// /api/upload, /api/check-duplicate, /api/thumb) ficam fora do matcher de
// propósito: o fluxo de upload do atleta não pode pedir senha.
export function proxy(request: NextRequest) {
  const user = process.env.DRIVE_ATLETA_PANEL_USER
  const pass = process.env.DRIVE_ATLETA_PANEL_PASS
  if (!user || !pass) return NextResponse.next()

  const header = request.headers.get('authorization')
  if (header?.startsWith('Basic ')) {
    try {
      const [gotUser, gotPass] = atob(header.slice(6)).split(':')
      if (gotUser === user && gotPass === pass) return NextResponse.next()
    } catch {
      // header malformado — cai no 401 abaixo
    }
  }

  return new NextResponse('Autenticação necessária.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Drive do Atleta — painel"' },
  })
}

export const config = {
  matcher: ['/painel/:path*', '/api/delete', '/api/share', '/api/curate'],
}
