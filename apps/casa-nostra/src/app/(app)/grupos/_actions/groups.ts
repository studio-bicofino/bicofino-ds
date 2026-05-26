'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { groupTypeEnum } from '@/lib/db/schemas'
import type { GroupType } from '@/lib/db/types'

// Internal — não exportar (Next "use server" só permite functions).
type ActionResult = { ok: true } | { ok: false; error: string }

const createInputSchema = z.object({
  name: z.string().min(2, 'Nome precisa ter ao menos 2 caracteres').max(120),
  group_type: groupTypeEnum,
})

const updateInputSchema = z
  .object({
    name: z.string().min(2).max(120).optional(),
    group_type: groupTypeEnum.optional(),
  })
  .refine((v) => v.name !== undefined || v.group_type !== undefined, {
    message: 'Nada para atualizar',
  })

function revalidateAll() {
  revalidatePath('/grupos')
  revalidatePath('/')
}

export async function createGroup(input: {
  name: string
  group_type: GroupType
}): Promise<ActionResult> {
  const parsed = createInputSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from('groups').insert({
    name: parsed.data.name.trim(),
    group_type: parsed.data.group_type,
    created_by: user?.id ?? null,
  })

  if (error) return { ok: false, error: error.message }

  revalidateAll()
  return { ok: true }
}

export async function updateGroup(
  id: string,
  input: { name?: string; group_type?: GroupType },
): Promise<ActionResult> {
  if (!id || typeof id !== 'string') {
    return { ok: false, error: 'ID inválido' }
  }

  const parsed = updateInputSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }
  }

  const patch: { name?: string; group_type?: GroupType } = {}
  if (parsed.data.name !== undefined) patch.name = parsed.data.name.trim()
  if (parsed.data.group_type !== undefined) patch.group_type = parsed.data.group_type

  const supabase = await createClient()
  const { error } = await supabase.from('groups').update(patch).eq('id', id)

  if (error) return { ok: false, error: error.message }

  revalidateAll()
  return { ok: true }
}

export async function deleteGroup(id: string): Promise<ActionResult> {
  if (!id || typeof id !== 'string') {
    return { ok: false, error: 'ID inválido' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('groups').delete().eq('id', id)

  if (error) return { ok: false, error: error.message }

  revalidateAll()
  return { ok: true }
}
