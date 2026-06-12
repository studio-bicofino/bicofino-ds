'use server'

/**
 * Casa Nostra v2 — server action de cadastro tela-única (8 campos).
 *
 * Mapeamento Form → Schema (HANDOFF §4):
 *   Foto                → people.photo_url
 *   Nome                → people.full_name (único required)
 *   Cargo               → people.current_title
 *   Empresa             → people.current_company
 *   WhatsApp/Email/Site/Instagram → contact_methods (type=...)
 *   Endereço            → people.address_* + home_city + home_country
 *   Skills/Grupos/Afiliações → tags (kind=...) + person_tags
 *
 * Idempotência de tags via findOrCreateTagInternal.
 * Strings free-text (cidade, país, empresa) passam por canonicalização contra
 * sugestões existentes — mesmo padrão da v0.8.1.
 *
 * Validação: apenas `full_name` obrigatório. Resto opcional.
 */

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/session'
import { getAllSuggestions } from '@/lib/db/suggestions'
import {
  canonicalizeValue,
  type Suggestion,
} from '@/lib/utils/strings'

import { findOrCreateTagInternal } from './tags'
import { cadastroV2Schema, type CadastroV2Input } from './cadastro-schema'

type ActionResult =
  | { ok: true; id: string }
  | { ok: false; error: string }

// ============================================================
// Helpers
// ============================================================

function toCanonicalMap(suggestions: Suggestion[]): Map<string, string> {
  const m = new Map<string, string>()
  for (const s of suggestions) m.set(s.key, s.value)
  return m
}

function emptyToNull(v: string | null | undefined): string | null {
  if (v === null || v === undefined) return null
  const t = v.trim()
  return t === '' ? null : t
}

// Sócio nº chega como string de dígitos do form; coluna é integer.
function toIntOrNull(v: string | null | undefined): number | null {
  const t = emptyToNull(v)
  if (!t || !/^\d+$/.test(t)) return null
  return Number(t)
}

type SupabaseServer = Awaited<ReturnType<typeof createClient>>

/** Sócio nº é único — barra duplicata antes do insert/update. */
async function memberNumberTaken(
  supabase: SupabaseServer,
  memberNumber: number,
  excludeId?: string,
): Promise<boolean> {
  let q = supabase.from('people').select('id').eq('member_number', memberNumber)
  if (excludeId) q = q.neq('id', excludeId)
  const { data } = await q.limit(1).maybeSingle()
  return Boolean(data)
}

// ============================================================
// Action
// ============================================================

export async function createPersonV2(input: CadastroV2Input): Promise<ActionResult> {
  try {
    return await createPersonV2Inner(input)
  } catch (err) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    console.error('[createPersonV2] threw:', err)
    return { ok: false, error: `cadastro-throw: ${msg}` }
  }
}

async function createPersonV2Inner(input: CadastroV2Input): Promise<ActionResult> {
  const parsed = cadastroV2Schema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join('; ') }
  }
  const data = parsed.data

  const session = await getSession()
  if (!session) return { ok: false, error: 'Não autenticado.' }
  const supabase = await createClient()

  // Canonicalização leve: cidade/país/empresa
  const sug = await getAllSuggestions()
  const cities = toCanonicalMap(sug.home_city)
  const countries = toCanonicalMap(sug.home_country)
  const companies = toCanonicalMap(sug.current_company)

  const homeCity = canonicalizeValue(data.address.city, cities)
  const homeCountry = canonicalizeValue(data.address.country, countries)
  const currentCompany = canonicalizeValue(data.empresas[0] ?? null, companies)

  const memberNumber = toIntOrNull(data.member_number)
  if (memberNumber != null && (await memberNumberTaken(supabase, memberNumber))) {
    return { ok: false, error: `Sócio nº ${memberNumber} já está em uso.` }
  }

  // Novo membro entra no fim da lista manual (list_order = max + 1).
  const { data: maxRow } = await supabase
    .from('people')
    .select('list_order')
    .order('list_order', { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle()
  const nextOrder = (maxRow?.list_order ?? 0) + 1

  // 1. Insert na tabela people
  const personRow = {
    full_name: data.full_name,
    bicofino_id: emptyToNull(data.bicofino_id),
    member_number: toIntOrNull(data.member_number),
    honorific: emptyToNull(data.honorific),
    birth_date: emptyToNull(data.birth_date),
    generation: emptyToNull(data.generation),
    citizenships: data.citizenships,
    ancestries: data.ancestries,
    current_title: emptyToNull(data.cargos[0] ?? null),
    current_company: currentCompany,
    photo_url: emptyToNull(data.photo_url),
    unavailable_fields: data.unavailable_fields,
    home_city: homeCity,
    home_country: homeCountry,
    address_street: emptyToNull(data.address.street),
    address_number: emptyToNull(data.address.number),
    address_complement: emptyToNull(data.address.complement),
    address_neighborhood: emptyToNull(data.address.neighborhood),
    address_state: emptyToNull(data.address.state),
    address_zip: emptyToNull(data.address.zip),
    list_order: nextOrder,
    created_by: session.userId,
    updated_by: session.userId,
  }

  const { data: created, error: insertErr } = await supabase
    .from('people')
    .insert(personRow)
    .select('id')
    .single()

  if (insertErr || !created) {
    return { ok: false, error: insertErr?.message ?? 'Falha ao criar pessoa.' }
  }

  const personId = created.id

  // 2. Contact methods (whatsapp, email, website, instagram)
  const contactRows: Array<{
    person_id: string
    type: 'whatsapp' | 'email' | 'website' | 'instagram'
    value: string
    is_primary: boolean
    label: null
  }> = []
  const contactMap = {
    whatsapp: data.contacts.whatsapp,
    email: data.contacts.email,
    website: data.contacts.website,
    instagram: data.contacts.instagram,
  } as const
  for (const [type, raw] of Object.entries(contactMap) as Array<
    [keyof typeof contactMap, string | null | undefined]
  >) {
    const v = emptyToNull(raw)
    if (!v) continue
    contactRows.push({
      person_id: personId,
      type,
      value: v,
      is_primary: false,
      label: null,
    })
  }
  if (contactRows.length) {
    const { error } = await supabase.from('contact_methods').insert(contactRows)
    if (error) return { ok: false, error: `contact_methods.insert: ${error.message}` }
  }

  // 3. Tags (skills / grupos / afiliações)
  const tagPayload: Array<{ kind: 'skill' | 'grupo' | 'afiliacao' | 'familia' | 'cargo' | 'empresa'; names: string[] }> = [
    { kind: 'skill', names: data.skills },
    { kind: 'cargo', names: data.cargos },
    { kind: 'empresa', names: data.empresas },
    { kind: 'grupo', names: data.grupos },
    { kind: 'familia', names: data.familias },
    { kind: 'afiliacao', names: data.afiliacoes },
  ]

  const personTagRows: Array<{
    person_id: string
    tag_id: string
    sort_order: number
  }> = []

  for (const block of tagPayload) {
    for (let i = 0; i < block.names.length; i++) {
      const name = block.names[i]
      const r = await findOrCreateTagInternal(
        supabase,
        { name, kind: block.kind },
        session.userId,
      )
      if ('error' in r) {
        return { ok: false, error: `tags.${block.kind}: ${r.error}` }
      }
      personTagRows.push({ person_id: personId, tag_id: r.id, sort_order: i })
    }
  }

  if (personTagRows.length) {
    const { error } = await supabase.from('person_tags').insert(personTagRows)
    if (error) return { ok: false, error: `person_tags.insert: ${error.message}` }
  }

  revalidatePath('/')
  revalidatePath('/membros')
  revalidatePath('/cadastro')
  return { ok: true, id: personId }
}

// ============================================================
// Update
// ============================================================

export async function updatePersonV2(
  id: string,
  input: CadastroV2Input,
): Promise<ActionResult> {
  try {
    return await updatePersonV2Inner(id, input)
  } catch (err) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    console.error('[updatePersonV2] threw:', err)
    return { ok: false, error: `cadastro-update-throw: ${msg}` }
  }
}

async function updatePersonV2Inner(
  id: string,
  input: CadastroV2Input,
): Promise<ActionResult> {
  if (!id || typeof id !== 'string') {
    return { ok: false, error: 'ID inválido.' }
  }

  const parsed = cadastroV2Schema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join('; ') }
  }
  const data = parsed.data

  const session = await getSession()
  if (!session) return { ok: false, error: 'Não autenticado.' }
  const supabase = await createClient()

  // Canonicalização leve: cidade/país/empresa
  const sug = await getAllSuggestions()
  const cities = toCanonicalMap(sug.home_city)
  const countries = toCanonicalMap(sug.home_country)
  const companies = toCanonicalMap(sug.current_company)

  const homeCity = canonicalizeValue(data.address.city, cities)
  const homeCountry = canonicalizeValue(data.address.country, countries)
  const currentCompany = canonicalizeValue(data.empresas[0] ?? null, companies)

  const memberNumber = toIntOrNull(data.member_number)
  if (memberNumber != null && (await memberNumberTaken(supabase, memberNumber, id))) {
    return { ok: false, error: `Sócio nº ${memberNumber} já está em uso.` }
  }

  // 1. UPDATE em people. Trigger cuida de updated_at.
  const personRow = {
    full_name: data.full_name,
    bicofino_id: emptyToNull(data.bicofino_id),
    member_number: toIntOrNull(data.member_number),
    honorific: emptyToNull(data.honorific),
    birth_date: emptyToNull(data.birth_date),
    generation: emptyToNull(data.generation),
    citizenships: data.citizenships,
    ancestries: data.ancestries,
    current_title: emptyToNull(data.cargos[0] ?? null),
    current_company: currentCompany,
    photo_url: emptyToNull(data.photo_url),
    unavailable_fields: data.unavailable_fields,
    home_city: homeCity,
    home_country: homeCountry,
    address_street: emptyToNull(data.address.street),
    address_number: emptyToNull(data.address.number),
    address_complement: emptyToNull(data.address.complement),
    address_neighborhood: emptyToNull(data.address.neighborhood),
    address_state: emptyToNull(data.address.state),
    address_zip: emptyToNull(data.address.zip),
    updated_by: session.userId,
  }

  const { data: updated, error: updErr } = await supabase
    .from('people')
    .update(personRow)
    .eq('id', id)
    .select('id')
    .single()

  if (updErr || !updated) {
    return { ok: false, error: updErr?.message ?? 'Falha ao atualizar pessoa.' }
  }

  // 2. Contact methods — estratégia delete-all + reinsert.
  const { error: delContactsErr } = await supabase
    .from('contact_methods')
    .delete()
    .eq('person_id', id)
  if (delContactsErr) {
    return { ok: false, error: `contact_methods.delete: ${delContactsErr.message}` }
  }

  const contactRows: Array<{
    person_id: string
    type: 'whatsapp' | 'email' | 'website' | 'instagram'
    value: string
    is_primary: boolean
    label: null
  }> = []
  const contactMap = {
    whatsapp: data.contacts.whatsapp,
    email: data.contacts.email,
    website: data.contacts.website,
    instagram: data.contacts.instagram,
  } as const
  for (const [type, raw] of Object.entries(contactMap) as Array<
    [keyof typeof contactMap, string | null | undefined]
  >) {
    const v = emptyToNull(raw)
    if (!v) continue
    contactRows.push({
      person_id: id,
      type,
      value: v,
      is_primary: false,
      label: null,
    })
  }
  if (contactRows.length) {
    const { error } = await supabase.from('contact_methods').insert(contactRows)
    if (error) return { ok: false, error: `contact_methods.insert: ${error.message}` }
  }

  // 3. person_tags — delete junção (preserva tags) + reinsert.
  const { error: delTagsErr } = await supabase
    .from('person_tags')
    .delete()
    .eq('person_id', id)
  if (delTagsErr) {
    return { ok: false, error: `person_tags.delete: ${delTagsErr.message}` }
  }

  const tagPayload: Array<{ kind: 'skill' | 'grupo' | 'afiliacao' | 'familia' | 'cargo' | 'empresa'; names: string[] }> = [
    { kind: 'skill', names: data.skills },
    { kind: 'cargo', names: data.cargos },
    { kind: 'empresa', names: data.empresas },
    { kind: 'grupo', names: data.grupos },
    { kind: 'familia', names: data.familias },
    { kind: 'afiliacao', names: data.afiliacoes },
  ]

  const personTagRows: Array<{
    person_id: string
    tag_id: string
    sort_order: number
  }> = []

  for (const block of tagPayload) {
    for (let i = 0; i < block.names.length; i++) {
      const name = block.names[i]
      const r = await findOrCreateTagInternal(
        supabase,
        { name, kind: block.kind },
        session.userId,
      )
      if ('error' in r) {
        return { ok: false, error: `tags.${block.kind}: ${r.error}` }
      }
      personTagRows.push({ person_id: id, tag_id: r.id, sort_order: i })
    }
  }

  if (personTagRows.length) {
    const { error } = await supabase.from('person_tags').insert(personTagRows)
    if (error) return { ok: false, error: `person_tags.insert: ${error.message}` }
  }

  revalidatePath('/')
  revalidatePath('/membros')
  revalidatePath(`/membros/${id}`)
  revalidatePath(`/p/${id}`)
  return { ok: true, id }
}
