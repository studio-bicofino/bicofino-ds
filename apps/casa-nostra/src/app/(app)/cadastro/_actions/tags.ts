'use server'

/**
 * Casa Nostra v2 — server actions de Tag.
 *
 * Idempotência por (kind, name_key). Mesmo padrão das organizations:
 *  - tenta SELECT por (kind, name_key)
 *  - se não existe, INSERT; em conflito de race, refetch.
 *
 * Consumido pelo cadastro v2 ao resolver tags novas → person_tags.
 */

import { createClient } from '@/lib/supabase/server'
import { normalizeKey } from '@/lib/utils/strings'
import type { Tag, TagKind } from '@/lib/db/types'

type SupabaseServer = Awaited<ReturnType<typeof createClient>>

export type FindOrCreateTagInput = {
  name: string
  kind: TagKind
}

/**
 * Busca tag pela combinação (kind, name_key) ou cria nova. Idempotente.
 */
export async function findOrCreateTagInternal(
  supabase: SupabaseServer,
  input: FindOrCreateTagInput,
  createdBy: string | null,
): Promise<{ id: string } | { error: string }> {
  const name = input.name.trim()
  if (!name) return { error: 'Nome da tag vazio' }

  const name_key = normalizeKey(name)
  if (!name_key) return { error: 'name_key vazio após normalização' }

  // Tentativa 1: já existe?
  const { data: existing, error: selErr } = await supabase
    .from('tags')
    .select('id')
    .eq('kind', input.kind)
    .eq('name_key', name_key)
    .maybeSingle()
  if (selErr) return { error: `tag.select: ${selErr.message}` }
  if (existing) return { id: existing.id }

  // Tentativa 2: insere. Conflito em (kind, name_key) (race) → refetch.
  const { data: inserted, error: insErr } = await supabase
    .from('tags')
    .insert({
      name,
      name_key,
      kind: input.kind,
      created_by: createdBy,
    })
    .select('id')
    .single()

  if (insErr) {
    const { data: race } = await supabase
      .from('tags')
      .select('id')
      .eq('kind', input.kind)
      .eq('name_key', name_key)
      .maybeSingle()
    if (race) return { id: race.id }
    return { error: `tag.insert: ${insErr.message}` }
  }

  return { id: inserted.id }
}

/**
 * Lista todas as tags. Consumido pelo CadastroV2 pra alimentar o autocomplete
 * dos 3 TagInputs (filtrado client-side por kind).
 */
export async function listTags(): Promise<Tag[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })
  if (error) return []
  return (data ?? []) as Tag[]
}
