'use server'

/**
 * Casa Nostra — server actions de Person.
 *
 * Consumido pelas páginas `/p/[id]` (edit) e `/p/novo` (create).
 * Allowlist e auth já são garantidas pelo layout `(app)` + middleware,
 * estas actions assumem que o usuário está autenticado.
 *
 * Estratégia para tabelas filhas: "replace all" — delete tudo do person_id
 * e re-insere os arrays vindos do form. Simples, idempotente, suficiente
 * pra audiência interna de 2-3 pessoas. Otimização possível depois (diff).
 */

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/session'
import { getAllSuggestions } from '@/lib/db/suggestions'
import {
  canonicalizeArray,
  canonicalizeValue,
  type Suggestion,
} from '@/lib/utils/strings'

import {
  personFormSchema,
  type PersonFormInput,
} from '@/lib/db/schemas'

import { findOrCreateOrganizationInternal } from './organizations'

type ActionResult =
  | { ok: true; id: string }
  | { ok: false; error: string }

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function toCanonicalMap(suggestions: Suggestion[]): Map<string, string> {
  const m = new Map<string, string>()
  for (const s of suggestions) m.set(s.key, s.value)
  return m
}

/**
 * Substitui valores free-text pelo canônico existente quando há match de
 * chave normalizada. Garante que "São Paulo" / "Sao Paulo" / "sao paulo"
 * convirjam para a mesma grafia no DB.
 */
async function canonicalizeInput(input: PersonFormInput): Promise<PersonFormInput> {
  const s = await getAllSuggestions()
  const cities = toCanonicalMap(s.home_city)
  const countries = toCanonicalMap(s.home_country)
  const companies = toCanonicalMap(s.current_company)
  const areas = toCanonicalMap(s.expertise_area)
  const langs = toCanonicalMap(s.language)
  const passports = toCanonicalMap(s.passport)
  const regions = toCanonicalMap(s.region)

  return {
    ...input,
    home_city: canonicalizeValue(input.home_city, cities),
    home_country: canonicalizeValue(input.home_country, countries),
    current_company: canonicalizeValue(input.current_company, companies),
    expertise_area: canonicalizeValue(input.expertise_area, areas),
    languages: canonicalizeArray(input.languages, langs),
    passports: canonicalizeArray(input.passports, passports),
    work_history: input.work_history.map((w) => ({
      ...w,
      company: canonicalizeValue(w.company, companies) ?? w.company,
    })),
    geography_action: input.geography_action.map((g) => ({
      ...g,
      region: canonicalizeValue(g.region, regions) ?? g.region,
    })),
  }
}

/**
 * Mantém apenas as chaves de Person (sem os arrays do form).
 * Retorna objeto pronto pra `from('people').insert(...)` / `.update(...)`.
 */
function pickPersonColumns(input: PersonFormInput) {
  return {
    full_name: input.full_name,
    preferred_name: input.preferred_name ?? null,
    photo_url: input.photo_url ?? null,
    current_company: input.current_company ?? null,
    current_title: input.current_title ?? null,
    cluster: input.cluster ?? null,
    seniority: input.seniority ?? null,
    expertise_area: input.expertise_area ?? null,
    intimacy: input.intimacy ?? null,
    contact_ease: input.contact_ease ?? null,
    bicofino_disposition: input.bicofino_disposition ?? null,
    network_reach: input.network_reach ?? null,
    home_city: input.home_city ?? null,
    home_country: input.home_country ?? null,
    languages: input.languages ?? [],
    passports: input.passports ?? [],
    intro_by_person_id: input.intro_by_person_id ?? null,
    cadence_target_per_year: input.cadence_target_per_year ?? null,
    last_contact_date: input.last_contact_date ?? null,
    private_notes: input.private_notes ?? null,
    restrict_visibility: input.restrict_visibility ?? false,
  }
}

type SupabaseServer = Awaited<ReturnType<typeof createClient>>

/**
 * Limpa todas as tabelas filhas pra um person_id e re-insere a partir do form.
 * Falha rápida: na primeira tabela com erro, retorna a mensagem.
 */
async function replaceChildren(
  supabase: SupabaseServer,
  personId: string,
  input: PersonFormInput,
  createdBy: string | null,
): Promise<string | null> {
  // contact_methods
  {
    const { error } = await supabase
      .from('contact_methods')
      .delete()
      .eq('person_id', personId)
    if (error) return `contact_methods.delete: ${error.message}`
    if (input.contact_methods.length) {
      const { error: insErr } = await supabase.from('contact_methods').insert(
        input.contact_methods.map((c) => ({
          person_id: personId,
          type: c.type,
          value: c.value,
          is_primary: c.is_primary ?? false,
          label: c.label ?? null,
        })),
      )
      if (insErr) return `contact_methods.insert: ${insErr.message}`
    }
  }

  // person_categories
  {
    const { error } = await supabase
      .from('person_categories')
      .delete()
      .eq('person_id', personId)
    if (error) return `person_categories.delete: ${error.message}`
    if (input.categories.length) {
      const { error: insErr } = await supabase.from('person_categories').insert(
        input.categories.map((category_value) => ({
          person_id: personId,
          category_value,
        })),
      )
      if (insErr) return `person_categories.insert: ${insErr.message}`
    }
  }

  // work_history
  {
    const { error } = await supabase
      .from('work_history')
      .delete()
      .eq('person_id', personId)
    if (error) return `work_history.delete: ${error.message}`
    if (input.work_history.length) {
      const { error: insErr } = await supabase.from('work_history').insert(
        input.work_history.map((w) => ({
          person_id: personId,
          company: w.company,
          role: w.role ?? null,
          start_year: w.start_year ?? null,
          end_year: w.end_year ?? null,
          notes: w.notes ?? null,
        })),
      )
      if (insErr) return `work_history.insert: ${insErr.message}`
    }
  }

  // futebol_links
  {
    const { error } = await supabase
      .from('futebol_links')
      .delete()
      .eq('person_id', personId)
    if (error) return `futebol_links.delete: ${error.message}`
    if (input.futebol_links.length) {
      const { error: insErr } = await supabase.from('futebol_links').insert(
        input.futebol_links.map((f) => ({
          person_id: personId,
          link_type: f.link_type,
          entity_name: f.entity_name,
          relation: f.relation ?? null,
          notes: f.notes ?? null,
        })),
      )
      if (insErr) return `futebol_links.insert: ${insErr.message}`
    }
  }

  // bicofino_history
  {
    const { error } = await supabase
      .from('bicofino_history')
      .delete()
      .eq('person_id', personId)
    if (error) return `bicofino_history.delete: ${error.message}`
    if (input.bicofino_history.length) {
      const { error: insErr } = await supabase.from('bicofino_history').insert(
        input.bicofino_history.map((b) => ({
          person_id: personId,
          project: b.project,
          year: b.year ?? null,
          role: b.role ?? null,
          outcome: b.outcome ?? null,
        })),
      )
      if (insErr) return `bicofino_history.insert: ${insErr.message}`
    }
  }

  // person_groups
  {
    const { error } = await supabase
      .from('person_groups')
      .delete()
      .eq('person_id', personId)
    if (error) return `person_groups.delete: ${error.message}`
    if (input.groups.length) {
      const { error: insErr } = await supabase.from('person_groups').insert(
        input.groups.map((g) => ({
          person_id: personId,
          group_id: g.group_id,
          joined_year: g.joined_year ?? null,
          notes: g.notes ?? null,
        })),
      )
      if (insErr) return `person_groups.insert: ${insErr.message}`
    }
  }

  // geography_action
  {
    const { error } = await supabase
      .from('geography_action')
      .delete()
      .eq('person_id', personId)
    if (error) return `geography_action.delete: ${error.message}`
    if (input.geography_action.length) {
      const { error: insErr } = await supabase.from('geography_action').insert(
        input.geography_action.map((g) => ({
          person_id: personId,
          region: g.region,
          scope: g.scope ?? null,
          context: g.context ?? null,
        })),
      )
      if (insErr) return `geography_action.insert: ${insErr.message}`
    }
  }

  // movements (tabela DB: signals)
  {
    const { error } = await supabase
      .from('signals')
      .delete()
      .eq('person_id', personId)
    if (error) return `signals.delete: ${error.message}`
    if (input.signals.length) {
      const { error: insErr } = await supabase.from('signals').insert(
        input.signals.map((s) => ({
          person_id: personId,
          signal_type: s.signal_type,
          observed_at: s.observed_at,
          content: s.content,
          source: s.source ?? null,
          created_by: createdBy,
        })),
      )
      if (insErr) return `signals.insert: ${insErr.message}`
    }
  }

  // person_organizations (resolve `new_org` via findOrCreate antes de inserir)
  {
    const { error } = await supabase
      .from('person_organizations')
      .delete()
      .eq('person_id', personId)
    if (error) return `person_organizations.delete: ${error.message}`

    if (input.organizations.length) {
      const resolved: Array<{
        person_id: string
        org_id: string
        role: string | null
        start_year: number | null
        end_year: number | null
        is_current: boolean
        notes: string | null
        sort_order: number
      }> = []

      for (let i = 0; i < input.organizations.length; i++) {
        const a = input.organizations[i]
        let orgId = a.org_id ?? null

        if (!orgId && a.new_org) {
          const r = await findOrCreateOrganizationInternal(
            supabase,
            {
              name: a.new_org.name,
              kind: a.new_org.kind,
              logo_url: a.new_org.logo_url ?? null,
            },
            createdBy,
          )
          if ('error' in r) return `person_organizations.findOrCreate: ${r.error}`
          orgId = r.id
        }

        if (!orgId) {
          return `person_organizations: vínculo #${i + 1} sem org_id nem new_org`
        }

        resolved.push({
          person_id: personId,
          org_id: orgId,
          role: a.role ?? null,
          start_year: a.start_year ?? null,
          end_year: a.end_year ?? null,
          is_current: a.is_current ?? false,
          notes: a.notes ?? null,
          sort_order: a.sort_order ?? i,
        })
      }

      const { error: insErr } = await supabase
        .from('person_organizations')
        .insert(resolved)
      if (insErr) return `person_organizations.insert: ${insErr.message}`
    }
  }

  return null
}

// ------------------------------------------------------------
// Actions
// ------------------------------------------------------------

export async function createPerson(input: PersonFormInput): Promise<ActionResult> {
  const parsed = personFormSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join('; ') }
  }

  const session = await getSession()
  if (!session) return { ok: false, error: 'Não autenticado.' }
  const supabase = await createClient()

  const canonical = await canonicalizeInput(parsed.data)

  const row = {
    ...pickPersonColumns(canonical),
    created_by: session.userId,
    updated_by: session.userId,
  }

  const { data, error } = await supabase
    .from('people')
    .insert(row)
    .select('id')
    .single()

  if (error || !data) {
    return { ok: false, error: error?.message ?? 'Falha ao criar pessoa.' }
  }

  const childErr = await replaceChildren(supabase, data.id, canonical, session.userId)
  if (childErr) {
    return { ok: false, error: childErr }
  }

  revalidatePath('/')
  revalidatePath(`/p/${data.id}`)
  return { ok: true, id: data.id }
}

export async function updatePerson(
  id: string,
  input: PersonFormInput,
): Promise<ActionResult> {
  const parsed = personFormSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join('; ') }
  }

  const session = await getSession()
  if (!session) return { ok: false, error: 'Não autenticado.' }
  const supabase = await createClient()

  const canonical = await canonicalizeInput(parsed.data)

  const row = {
    ...pickPersonColumns(canonical),
    updated_by: session.userId,
  }

  const { error } = await supabase.from('people').update(row).eq('id', id)
  if (error) return { ok: false, error: error.message }

  const childErr = await replaceChildren(supabase, id, canonical, session.userId)
  if (childErr) {
    return { ok: false, error: childErr }
  }

  revalidatePath('/')
  revalidatePath(`/p/${id}`)
  return { ok: true, id }
}

export async function deletePerson(id: string): Promise<ActionResult> {
  const session = await getSession()
  if (!session) return { ok: false, error: 'Não autenticado.' }
  const supabase = await createClient()

  const { error } = await supabase.from('people').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }

  revalidatePath('/')
  return { ok: true, id }
}
