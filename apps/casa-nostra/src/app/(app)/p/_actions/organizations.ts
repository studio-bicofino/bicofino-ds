'use server'

/**
 * Casa Nostra — server actions de Organization.
 *
 * Consumido pelo Affiliations section dentro do PersonForm (e futura página
 * dedicada /organizations). Allowlist e auth são garantidas pelo layout (app).
 *
 * Estratégia:
 *  - `name_key` deriva de normalizeKey(name) e é UNIQUE no DB → idempotência:
 *     "Bicofino" + "Bicofino ❇️" convergem no mesmo registro.
 *  - `findOrCreateOrganization` é o ponto de entrada usado pelo persons.ts
 *     pra resolver `new_org` em vínculos.
 */

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/session'
import { organizationKindEnum } from '@/lib/db/schemas'
import { normalizeKey } from '@/lib/utils/strings'
import type { Organization, OrganizationKind } from '@/lib/db/types'

type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export type FindOrCreateInput = {
  name: string
  kind: OrganizationKind
  logo_url?: string | null
}

type SupabaseServer = Awaited<ReturnType<typeof createClient>>

/**
 * Busca org pelo name_key normalizado, ou cria nova. Idempotente.
 * Quando a org já existe e `logo_url` é passado, NÃO sobrescreve — atualizar
 * logo é responsabilidade explícita de updateOrganization.
 */
export async function findOrCreateOrganizationInternal(
  supabase: SupabaseServer,
  input: FindOrCreateInput,
  createdBy: string | null,
): Promise<{ id: string } | { error: string }> {
  const name = input.name.trim()
  if (!name) return { error: 'Nome da organização vazio' }

  const parsedKind = organizationKindEnum.safeParse(input.kind)
  if (!parsedKind.success) return { error: 'kind inválido' }

  const name_key = normalizeKey(name)
  if (!name_key) return { error: 'name_key vazio após normalização' }

  // Tentativa 1: já existe?
  const { data: existing, error: selErr } = await supabase
    .from('organizations')
    .select('id')
    .eq('name_key', name_key)
    .maybeSingle()
  if (selErr) return { error: `org.select: ${selErr.message}` }
  if (existing) return { id: existing.id }

  // Tentativa 2: insere. Conflito em name_key (race) → re-fetch.
  const { data: inserted, error: insErr } = await supabase
    .from('organizations')
    .insert({
      name,
      name_key,
      kind: parsedKind.data,
      logo_url: input.logo_url ?? null,
      created_by: createdBy,
    })
    .select('id')
    .single()

  if (insErr) {
    // Race: outra requisição inseriu com mesma chave. Refetch.
    const { data: race, error: raceErr } = await supabase
      .from('organizations')
      .select('id')
      .eq('name_key', name_key)
      .maybeSingle()
    if (race) return { id: race.id }
    return { error: `org.insert: ${insErr.message}${raceErr ? ` / ${raceErr.message}` : ''}` }
  }

  return { id: inserted.id }
}

/**
 * Wrapper público com auth + revalidate. Usado pelo Affiliations section
 * quando o user opta por "Criar nova org" antes de submeter o form completo.
 */
export async function createOrganization(
  input: FindOrCreateInput,
): Promise<ActionResult<Organization>> {
  const session = await getSession()
  if (!session) return { ok: false, error: 'Não autenticado.' }
  const supabase = await createClient()

  const result = await findOrCreateOrganizationInternal(supabase, input, session.userId)
  if ('error' in result) return { ok: false, error: result.error }

  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', result.id)
    .single()

  if (error || !data) {
    return { ok: false, error: error?.message ?? 'Org criada mas não pôde ser lida' }
  }

  revalidatePath('/')
  return { ok: true, data: data as Organization }
}

/**
 * Atualiza nome / kind / logo de uma org existente. Recalcula name_key se nome mudou.
 */
export async function updateOrganization(
  id: string,
  patch: Partial<Pick<Organization, 'name' | 'kind' | 'logo_url'>>,
): Promise<ActionResult<Organization>> {
  const session = await getSession()
  if (!session) return { ok: false, error: 'Não autenticado.' }
  const supabase = await createClient()

  const row: Record<string, unknown> = {}
  if (patch.name != null) {
    const name = patch.name.trim()
    if (!name) return { ok: false, error: 'Nome vazio' }
    row.name = name
    row.name_key = normalizeKey(name)
  }
  if (patch.kind != null) {
    const parsed = organizationKindEnum.safeParse(patch.kind)
    if (!parsed.success) return { ok: false, error: 'kind inválido' }
    row.kind = parsed.data
  }
  if (patch.logo_url !== undefined) row.logo_url = patch.logo_url

  if (Object.keys(row).length === 0) {
    return { ok: false, error: 'Nada pra atualizar' }
  }

  const { data, error } = await supabase
    .from('organizations')
    .update(row)
    .eq('id', id)
    .select('*')
    .single()

  if (error || !data) {
    return { ok: false, error: error?.message ?? 'Falha ao atualizar org' }
  }

  revalidatePath('/')
  return { ok: true, data: data as Organization }
}

/**
 * Lista todas as orgs ativas. Consumido pelo OrgCombobox no PersonForm.
 */
export async function listOrganizations(): Promise<ActionResult<Organization[]>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('name', { ascending: true })

  if (error) return { ok: false, error: error.message }
  return { ok: true, data: (data ?? []) as Organization[] }
}
