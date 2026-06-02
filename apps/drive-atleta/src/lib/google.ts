import 'server-only'

/* ─────────────────────────────────────────────────────────────
   Google OAuth — troca o refresh token (conta Content-manager do
   Shared Drive CENTRAL BICOFINO) por um access token de curta duração.
   D1: OAuth como o usuário, app "Internal" — sem service account por ora.
   O refresh token mora no Infisical (GOOGLE_OAUTH_REFRESH_TOKEN), nunca
   no navegador; tudo aqui é server-only.
   ───────────────────────────────────────────────────────────── */

interface CachedToken {
  accessToken: string
  expiresAt: number // epoch ms
}

let cache: CachedToken | null = null

function env(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Variável de ambiente ausente: ${name}`)
  return v
}

/** Access token válido (cacheado em memória até ~1min antes de expirar). */
export async function getAccessToken(): Promise<string> {
  if (cache && Date.now() < cache.expiresAt) return cache.accessToken

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env('GOOGLE_OAUTH_CLIENT_ID'),
      client_secret: env('GOOGLE_OAUTH_CLIENT_SECRET'),
      refresh_token: env('GOOGLE_OAUTH_REFRESH_TOKEN'),
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Falha ao renovar o access token do Google (${res.status}): ${detail}`)
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }
  cache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  }
  return cache.accessToken
}

export function driveId(): string {
  return env('GOOGLE_DRIVE_ID')
}
