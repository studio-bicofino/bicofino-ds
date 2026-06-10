'use server'

/**
 * Casa Nostra v2 — server actions de administração de tags (/grupos).
 *
 * Gestão dos kinds 'grupo' e 'afiliacao' (exibido na UI como "Domínios"):
 *  - createTagAdmin  → reusa findOrCreateTagInternal (idempotente por kind+name_key)
 *  - renameTagAdmin  → update name + name_key, conflito unique vira erro legível
 *  - deleteTagAdmin  → delete em tags; person_tags limpa via on delete cascade
 *
 * REGRA: arquivos 'use server' só exportam `export async function`.
 */

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/session'
import { normalizeKey } from '@/lib/utils/strings'
import type { TagKind } from '@/lib/db/types'

import { findOrCreateTagInternal } from '../../cadastro/_actions/tags'

type ActionResult = { ok: true } | { ok: false; error: string }

function revalidateTagConsumers() {
  revalidatePath('/grupos')
  revalidatePath('/cadastro')
  revalidatePath('/membros')
}

function isUniqueViolation(message: string, code?: string): boolean {
  if (code === '23505') return true
  const m = message.toLowerCase()
  return m.includes('duplicate key') || m.includes('unique constraint')
}

// ============================================================
// Create
// ============================================================

export async function createTagAdmin(kind: TagKind, name: string): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session) return { ok: false, error: 'Não autenticado.' }

    const trimmed = name.trim()
    if (!trimmed) return { ok: false, error: 'Informe um nome.' }

    const supabase = await createClient()
    const result = await findOrCreateTagInternal(
      supabase,
      { name: trimmed, kind },
      session.userId ?? null,
    )
    if ('error' in result) return { ok: false, error: result.error }

    revalidateTagConsumers()
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[createTagAdmin] threw:', err)
    return { ok: false, error: msg }
  }
}

// ============================================================
// Rename
// ============================================================

export async function renameTagAdmin(id: string, newName: string): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session) return { ok: false, error: 'Não autenticado.' }

    const name = newName.trim()
    if (!name) return { ok: false, error: 'Informe um nome.' }

    const name_key = normalizeKey(name)
    if (!name_key) return { ok: false, error: 'Nome inválido após normalização.' }

    const supabase = await createClient()
    const { error } = await supabase
      .from('tags')
      .update({ name, name_key })
      .eq('id', id)

    if (error) {
      if (isUniqueViolation(error.message, error.code)) {
        return { ok: false, error: 'Já existe uma tag com esse nome.' }
      }
      return { ok: false, error: `tag.update: ${error.message}` }
    }

    revalidateTagConsumers()
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[renameTagAdmin] threw:', err)
    return { ok: false, error: msg }
  }
}

// ============================================================
// Delete
// ============================================================

export async function deleteTagAdmin(id: string): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session) return { ok: false, error: 'Não autenticado.' }

    const supabase = await createClient()
    const { error } = await supabase.from('tags').delete().eq('id', id)
    if (error) return { ok: false, error: `tag.delete: ${error.message}` }

    revalidateTagConsumers()
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[deleteTagAdmin] threw:', err)
    return { ok: false, error: msg }
  }
}
