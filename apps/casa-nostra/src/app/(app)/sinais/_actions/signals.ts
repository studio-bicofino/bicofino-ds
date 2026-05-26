'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { signalTypeEnum } from '@/lib/db/schemas'
import type { SignalType } from '@/lib/db/types'

// Internal — não exportar (Next "use server" só permite functions).
type ActionResult = { ok: true } | { ok: false; error: string }

const createSignalSchema = z.object({
  person_id: z.string().uuid('Pessoa inválida'),
  signal_type: signalTypeEnum,
  observed_at: z.string().min(1, 'Data obrigatória'),
  content: z.string().min(1, 'Conteúdo obrigatório'),
  source: z.string().nullable().optional(),
})

export type CreateSignalInput = {
  person_id: string
  signal_type: SignalType
  observed_at: string
  content: string
  source?: string | null
}

function revalidateAll() {
  revalidatePath('/sinais')
  revalidatePath('/')
}

export async function createSignal(input: CreateSignalInput): Promise<ActionResult> {
  const parsed = createSignalSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const source = parsed.data.source?.trim()

  const { error } = await supabase.from('signals').insert({
    person_id: parsed.data.person_id,
    signal_type: parsed.data.signal_type,
    observed_at: parsed.data.observed_at,
    content: parsed.data.content.trim(),
    source: source ? source : null,
    created_by: user?.id ?? null,
  })

  if (error) return { ok: false, error: error.message }

  revalidateAll()
  return { ok: true }
}

export async function deleteSignal(id: string): Promise<ActionResult> {
  if (!id || typeof id !== 'string') {
    return { ok: false, error: 'ID inválido' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('signals').delete().eq('id', id)

  if (error) return { ok: false, error: error.message }

  revalidateAll()
  return { ok: true }
}
