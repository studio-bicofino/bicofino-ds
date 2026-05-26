import { NextResponse, type NextRequest } from 'next/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

/**
 * Magic link callback — Supabase redireciona o usuário pra cá após clicar no link do email.
 *
 * Suporta dois fluxos:
 *  1. token_hash + type → verifyOtp (recomendado para magic link via template do Supabase)
 *  2. code → exchangeCodeForSession (PKCE / OAuth)
 *
 * O template de email no painel Supabase deve usar:
 *   {{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&next={{ .RedirectTo }}
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const token_hash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type') as EmailOtpType | null
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/'

  const supabase = await createClient()

  // Fluxo A: token_hash (magic link via email template)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin),
      )
    }
    return NextResponse.redirect(new URL(next, url.origin))
  }

  // Fluxo B: code (PKCE / OAuth providers)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin),
      )
    }
    return NextResponse.redirect(new URL(next, url.origin))
  }

  return NextResponse.redirect(
    new URL('/login?error=link_invalido_ou_expirado', url.origin),
  )
}
