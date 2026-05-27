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

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/session'
import { getAllSuggestions } from '@/lib/db/suggestions'
import {
  canonicalizeValue,
  type Suggestion,
} from '@/lib/utils/strings'

import { findOrCreateTagInternal } from './tags'

// ============================================================
// Schema do form v2 (independente do personFormSchema da v1)
// ============================================================

const contactBlockSchema = z.object({
  whatsapp: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
})

const addressBlockSchema = z.object({
  street: z.string().optional().nullable(),
  number: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
})

export const cadastroV2Schema = z.object({
  full_name: z.string().min(1, 'Nome obrigatório').trim(),
  current_title: z.string().optional().nullable(),
  current_company: z.string().optional().nullable(),
  photo_url: z.string().optional().nullable(),
  contacts: contactBlockSchema.optional().default({}),
  address: addressBlockSchema.optional().default({}),
  skills: z.array(z.string().min(1)).optional().default([]),
  grupos: z.array(z.string().min(1)).optional().default([]),
  afiliacoes: z.array(z.string().min(1)).optional().default([]),
})

export type CadastroV2Input = z.infer<typeof cadastroV2Schema>

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

// ============================================================
// Action
// ============================================================

export async function createPersonV2(input: CadastroV2Input): Promise<ActionResult> {
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
  const currentCompany = canonicalizeValue(data.current_company, companies)

  // 1. Insert na tabela people
  const personRow = {
    full_name: data.full_name,
    current_title: emptyToNull(data.current_title),
    current_company: currentCompany,
    photo_url: emptyToNull(data.photo_url),
    home_city: homeCity,
    home_country: homeCountry,
    address_street: emptyToNull(data.address.street),
    address_number: emptyToNull(data.address.number),
    address_complement: emptyToNull(data.address.complement),
    address_state: emptyToNull(data.address.state),
    address_zip: emptyToNull(data.address.zip),
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
  const tagPayload: Array<{ kind: 'skill' | 'grupo' | 'afiliacao'; names: string[] }> = [
    { kind: 'skill', names: data.skills },
    { kind: 'grupo', names: data.grupos },
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
