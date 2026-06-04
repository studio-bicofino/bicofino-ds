'use server'

import { createClient } from '@/lib/supabase/server'
import { isAllowed } from '@/lib/auth/allowlist'
import { z } from 'zod'

const SignInSchema = z.object({
  email: z
    .string({ required_error: 'Coloca seu email pra continuar.' })
    .min(1, 'Coloca seu email pra continuar.')
    .email('Email inválido — confere se tá certinho.'),
  next: z.string().optional(),
})

export type SignInResult =
  | { ok: true; email: string }
  | { ok: false; error: string }

export async function signInWithMagicLink(formData: FormData): Promise<SignInResult> {
  const parsed = SignInSchema.safeParse({
    email: formData.get('email'),
    next: formData.get('next'),
  })

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }
  }

  const { email, next } = parsed.data

  if (!isAllowed(email)) {
    return {
      ok: false,
      error: 'Este email não está autorizado. Fala com o Woney pra adicionar à allowlist.',
    }
  }

  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3040'
  const redirectTo = `${siteUrl}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ''}`

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  })

  if (error) {
    return { ok: false, error: error.message }
  }

  return { ok: true, email }
}
