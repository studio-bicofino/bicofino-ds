#!/usr/bin/env node
// One-shot: deriva `organizations` + `person_organizations` a partir dos
// campos legacy (current_company, work_history.company, futebol_links).
// Idempotente — re-runs ficam no-op porque:
//  - orgs são identificadas pela CHAVE normalizada (name_key UNIQUE)
//  - vínculos são identificados pela tupla (person_id, org_id, role, start_year, end_year)
//
// NÃO deleta colunas/tabelas legacy. Tudo coexiste.
//
// Uso:
//   infisical run --env=dev -- node scripts/backfill-organizations.mjs
//
// Flags:
//   --dry              → apenas lista o que faria, sem escrever
//   --skip="A,B,C"     → pula entidades cujo nome (normalizado) bate com algum item
//                        da lista. Útil pra observações que vivem em futebol_links
//                        mas não representam orgs reais (ex.: "Serie A italiana anos 80").

import { createClient } from '@supabase/supabase-js'

const DRY = process.argv.includes('--dry')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

// ------------------------------------------------------------
// normalizeKey — espelha src/lib/utils/strings.ts
// ------------------------------------------------------------
const ORNAMENT_RE = /[\p{Extended_Pictographic}\p{So}\u{FE00}-\u{FE0F}‍\u{1F3FB}-\u{1F3FF}]/gu

function normalizeKey(s) {
  if (!s) return ''
  return s
    .replace(ORNAMENT_RE, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

const SKIP_KEYS = (() => {
  const arg = process.argv.find((a) => a.startsWith('--skip='))
  if (!arg) return new Set()
  const raw = arg.slice('--skip='.length)
  const cleaned = raw.replace(/^["']|["']$/g, '')
  const keys = cleaned.split(',').map((s) => normalizeKey(s)).filter(Boolean)
  return new Set(keys)
})()

// futebol_links.link_type → organizations.kind
function mapFutebolKind(linkType) {
  switch (linkType) {
    case 'time':
    case 'estadio':
      return 'clube'
    case 'atleta':
      return null // atleta = pessoa, não org. Pula.
    case 'patrocinio':
      return 'empresa'
    case 'entidade':
    case 'comissao':
      return 'entidade'
    default:
      return 'entidade'
  }
}

// ------------------------------------------------------------
// findOrCreate org pelo name_key, com cache local
// ------------------------------------------------------------
const orgCache = new Map() // name_key → id

async function findOrCreateOrg({ name, kind }) {
  const name_key = normalizeKey(name)
  if (!name_key) return null
  if (SKIP_KEYS.has(name_key)) {
    if (DRY) console.log(`  [dry] pulando (skip-list): ${name}`)
    return null
  }
  if (orgCache.has(name_key)) return orgCache.get(name_key)

  // Tenta select primeiro
  const sel = await supabase
    .from('organizations')
    .select('id')
    .eq('name_key', name_key)
    .maybeSingle()
  if (sel.data) {
    orgCache.set(name_key, sel.data.id)
    return sel.data.id
  }

  if (DRY) {
    console.log(`  [dry] criaria org: ${name} (${kind})`)
    const fakeId = `dry-${name_key}`
    orgCache.set(name_key, fakeId)
    return fakeId
  }

  const ins = await supabase
    .from('organizations')
    .insert({ name: name.trim(), name_key, kind })
    .select('id')
    .single()
  if (ins.error) {
    // Race: re-select
    const re = await supabase
      .from('organizations')
      .select('id')
      .eq('name_key', name_key)
      .maybeSingle()
    if (re.data) {
      orgCache.set(name_key, re.data.id)
      return re.data.id
    }
    throw new Error(`Falha ao criar org "${name}": ${ins.error.message}`)
  }
  orgCache.set(name_key, ins.data.id)
  return ins.data.id
}

// ------------------------------------------------------------
// hasLink — checa se vínculo idêntico já existe (idempotência)
// ------------------------------------------------------------
async function linkExists({ person_id, org_id, role, start_year, end_year }) {
  if (org_id.startsWith('dry-')) return false
  const q = supabase
    .from('person_organizations')
    .select('id')
    .eq('person_id', person_id)
    .eq('org_id', org_id)
    .limit(1)

  if (role == null) q.is('role', null)
  else q.eq('role', role)
  if (start_year == null) q.is('start_year', null)
  else q.eq('start_year', start_year)
  if (end_year == null) q.is('end_year', null)
  else q.eq('end_year', end_year)

  const { data } = await q
  return Array.isArray(data) && data.length > 0
}

async function ensureLink(input) {
  const exists = await linkExists(input)
  if (exists) return false
  if (DRY) {
    console.log(`  [dry] criaria vínculo: person ${input.person_id} ↔ org ${input.org_id}`)
    return true
  }
  const { error } = await supabase.from('person_organizations').insert({
    person_id: input.person_id,
    org_id: input.org_id,
    role: input.role,
    start_year: input.start_year,
    end_year: input.end_year,
    is_current: input.is_current,
    notes: input.notes,
    sort_order: input.sort_order,
  })
  if (error) throw new Error(`Falha ao criar vínculo: ${error.message}`)
  return true
}

// ------------------------------------------------------------
// Main
// ------------------------------------------------------------
async function main() {
  console.log(`[backfill-organizations] ${DRY ? '(DRY-RUN) ' : ''}iniciando…`)

  const { data: people, error: peopleErr } = await supabase
    .from('people')
    .select('id, full_name, current_company, current_title')
  if (peopleErr) throw new Error(`people.select: ${peopleErr.message}`)

  let orgsCreated = 0
  let linksCreated = 0

  for (const p of people ?? []) {
    let order = 0

    // 1) current_company
    if (p.current_company?.trim()) {
      const orgId = await findOrCreateOrg({
        name: p.current_company,
        kind: 'empresa',
      })
      if (orgId) {
        const wasNew = orgCache.size > orgsCreated
        if (wasNew) orgsCreated++
        const created = await ensureLink({
          person_id: p.id,
          org_id: orgId,
          role: p.current_title ?? null,
          start_year: null,
          end_year: null,
          is_current: true,
          notes: null,
          sort_order: order++,
        })
        if (created) linksCreated++
      }
    }

    // 2) work_history
    const { data: work, error: workErr } = await supabase
      .from('work_history')
      .select('company, role, start_year, end_year, notes')
      .eq('person_id', p.id)
    if (workErr) throw new Error(`work_history.select: ${workErr.message}`)

    for (const w of work ?? []) {
      if (!w.company?.trim()) continue
      const orgId = await findOrCreateOrg({ name: w.company, kind: 'empresa' })
      if (!orgId) continue
      const created = await ensureLink({
        person_id: p.id,
        org_id: orgId,
        role: w.role ?? null,
        start_year: w.start_year ?? null,
        end_year: w.end_year ?? null,
        is_current: w.end_year == null,
        notes: w.notes ?? null,
        sort_order: order++,
      })
      if (created) linksCreated++
    }

    // 3) futebol_links
    const { data: futebol, error: futErr } = await supabase
      .from('futebol_links')
      .select('link_type, entity_name, relation, notes')
      .eq('person_id', p.id)
    if (futErr) throw new Error(`futebol_links.select: ${futErr.message}`)

    for (const f of futebol ?? []) {
      const kind = mapFutebolKind(f.link_type)
      if (!kind) continue // atleta = pessoa, pula
      if (!f.entity_name?.trim()) continue
      const orgId = await findOrCreateOrg({ name: f.entity_name, kind })
      if (!orgId) continue
      const created = await ensureLink({
        person_id: p.id,
        org_id: orgId,
        role: f.relation ?? null,
        start_year: null,
        end_year: null,
        is_current: false,
        notes: f.notes ?? null,
        sort_order: order++,
      })
      if (created) linksCreated++
    }
  }

  console.log(
    `[backfill-organizations] feito. orgs ${DRY ? 'que seriam criadas' : 'consideradas (novas+existentes)'}: ${orgCache.size}, vínculos novos: ${linksCreated}`,
  )
}

main().catch((err) => {
  console.error('[backfill-organizations] erro fatal:', err)
  process.exit(1)
})
