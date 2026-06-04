'use server'

/**
 * Casa Nostra v2 — ações de lista de Membros: apagar + reordenar.
 *
 * Apagar: DELETE em people. As junções (contact_methods, person_tags,
 * person_organizations) têm `on delete cascade`, então somem junto.
 * Foto no storage vira órfã (backlog conhecido, não-bloqueante).
 *
 * Reordenar: persiste `list_order` (0001/0005). Recebe a ordem completa
 * da view atual + offset da paginação e grava list_order = offset + índice.
 *
 * Sob bypass, createClient() devolve client service-role → ignora RLS.
 */

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/session'

type Result = { ok: true } | { ok: false; error: string }

export async function deletePersonV2(id: string): Promise<Result> {
  try {
    if (!id || typeof id !== 'string') return { ok: false, error: 'ID inválido.' }

    const session = await getSession()
    if (!session) return { ok: false, error: 'Não autenticado.' }

    const supabase = await createClient()
    const { error } = await supabase.from('people').delete().eq('id', id)
    if (error) return { ok: false, error: error.message }

    revalidatePath('/membros')
    revalidatePath('/')
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    console.error('[deletePersonV2] threw:', err)
    return { ok: false, error: `delete-throw: ${msg}` }
  }
}

export async function reorderPeopleV2(
  orderedIds: string[],
  baseOffset = 0,
): Promise<Result> {
  try {
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return { ok: false, error: 'Lista de ordem vazia.' }
    }

    const session = await getSession()
    if (!session) return { ok: false, error: 'Não autenticado.' }

    const supabase = await createClient()

    // N pequeno (CRM com dezenas de membros) → updates sequenciais bastam.
    for (let i = 0; i < orderedIds.length; i++) {
      const { error } = await supabase
        .from('people')
        .update({ list_order: baseOffset + i })
        .eq('id', orderedIds[i])
      if (error) return { ok: false, error: `reorder[${i}]: ${error.message}` }
    }

    revalidatePath('/membros')
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    console.error('[reorderPeopleV2] threw:', err)
    return { ok: false, error: `reorder-throw: ${msg}` }
  }
}
