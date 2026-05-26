#!/usr/bin/env node
// One-shot: percorre todos os registros e substitui valores free-text pela
// grafia canônica (a mais frequente + mais acentuada + capitalizada).
// Idempotente — rodar várias vezes não muda nada depois da primeira passada.
// Uso: infisical run --env=dev -- node scripts/canonicalize-existing.mjs

import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

// ============================================================
// Helpers — espelham src/lib/utils/strings.ts
// ============================================================

function normalizeKey(s) {
  if (!s) return ''
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

function countNonAscii(s) {
  let n = 0
  for (const ch of s) if (ch.charCodeAt(0) > 127) n++
  return n
}

function startsUppercase(s) {
  const first = s.trim().charAt(0)
  return first !== '' && first === first.toUpperCase() && first !== first.toLowerCase()
}

function pickCanonical(variants) {
  const cleaned = variants.map((v) => v.trim()).filter(Boolean)
  if (cleaned.length === 0) return ''
  if (cleaned.length === 1) return cleaned[0]
  const freq = new Map()
  for (const v of cleaned) freq.set(v, (freq.get(v) ?? 0) + 1)
  const unique = Array.from(freq.keys())
  unique.sort((a, b) => {
    const fa = freq.get(a) ?? 0
    const fb = freq.get(b) ?? 0
    if (fa !== fb) return fb - fa
    const da = countNonAscii(a)
    const db = countNonAscii(b)
    if (da !== db) return db - da
    const ua = startsUppercase(a) ? 1 : 0
    const ub = startsUppercase(b) ? 1 : 0
    if (ua !== ub) return ub - ua
    return a.localeCompare(b, 'pt-BR')
  })
  return unique[0]
}

function buildCanonicalMap(rawValues) {
  const buckets = new Map()
  for (const raw of rawValues) {
    if (!raw) continue
    const trimmed = String(raw).trim()
    if (!trimmed) continue
    const key = normalizeKey(trimmed)
    if (!key) continue
    const arr = buckets.get(key)
    if (arr) arr.push(trimmed)
    else buckets.set(key, [trimmed])
  }
  const map = new Map()
  for (const [key, variants] of buckets) map.set(key, pickCanonical(variants))
  return map
}

function canonicalizeValue(input, map) {
  if (input === null || input === undefined) return null
  const trimmed = String(input).trim()
  if (!trimmed) return null
  return map.get(normalizeKey(trimmed)) ?? trimmed
}

function canonicalizeArray(input, map) {
  if (!Array.isArray(input) || input.length === 0) return []
  const out = []
  const seen = new Set()
  for (const raw of input) {
    const v = canonicalizeValue(raw, map)
    if (!v) continue
    const k = normalizeKey(v)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(v)
  }
  return out
}

// ============================================================
// Main
// ============================================================

async function main() {
  const [peopleRes, geoRes, workRes] = await Promise.all([
    supabase
      .from('people')
      .select('id, home_city, home_country, current_company, expertise_area, languages, passports'),
    supabase.from('geography_action').select('id, region'),
    supabase.from('work_history').select('id, company'),
  ])

  if (peopleRes.error) throw peopleRes.error
  if (geoRes.error) throw geoRes.error
  if (workRes.error) throw workRes.error

  const people = peopleRes.data ?? []
  const geo = geoRes.data ?? []
  const work = workRes.data ?? []

  console.log(`Base: ${people.length} pessoas · ${geo.length} regiões · ${work.length} passagens`)

  const citiesMap = buildCanonicalMap(people.map((p) => p.home_city))
  const countriesMap = buildCanonicalMap(people.map((p) => p.home_country))
  const companiesMap = buildCanonicalMap([
    ...people.map((p) => p.current_company),
    ...work.map((w) => w.company),
  ])
  const areasMap = buildCanonicalMap(people.map((p) => p.expertise_area))
  const langMap = buildCanonicalMap(people.flatMap((p) => p.languages ?? []))
  const passportMap = buildCanonicalMap(people.flatMap((p) => p.passports ?? []))
  const regionMap = buildCanonicalMap(geo.map((g) => g.region))

  // -- People --
  let updatedPeople = 0
  for (const p of people) {
    const next = {
      home_city: canonicalizeValue(p.home_city, citiesMap),
      home_country: canonicalizeValue(p.home_country, countriesMap),
      current_company: canonicalizeValue(p.current_company, companiesMap),
      expertise_area: canonicalizeValue(p.expertise_area, areasMap),
      languages: canonicalizeArray(p.languages, langMap),
      passports: canonicalizeArray(p.passports, passportMap),
    }
    const diff =
      next.home_city !== p.home_city ||
      next.home_country !== p.home_country ||
      next.current_company !== p.current_company ||
      next.expertise_area !== p.expertise_area ||
      JSON.stringify(next.languages) !== JSON.stringify(p.languages ?? []) ||
      JSON.stringify(next.passports) !== JSON.stringify(p.passports ?? [])
    if (!diff) continue
    const { error } = await supabase.from('people').update(next).eq('id', p.id)
    if (error) {
      console.warn(`  people ${p.id}: ${error.message}`)
      continue
    }
    updatedPeople++
  }

  // -- geography_action --
  let updatedGeo = 0
  for (const g of geo) {
    const next = canonicalizeValue(g.region, regionMap)
    if (next === g.region) continue
    if (next === null) continue
    const { error } = await supabase.from('geography_action').update({ region: next }).eq('id', g.id)
    if (error) {
      console.warn(`  geography_action ${g.id}: ${error.message}`)
      continue
    }
    updatedGeo++
  }

  // -- work_history --
  let updatedWork = 0
  for (const w of work) {
    const next = canonicalizeValue(w.company, companiesMap)
    if (next === w.company) continue
    if (next === null) continue
    const { error } = await supabase.from('work_history').update({ company: next }).eq('id', w.id)
    if (error) {
      console.warn(`  work_history ${w.id}: ${error.message}`)
      continue
    }
    updatedWork++
  }

  console.log(`\nCanonicalizado:`)
  console.log(`  ${updatedPeople}/${people.length} pessoas`)
  console.log(`  ${updatedGeo}/${geo.length} regiões`)
  console.log(`  ${updatedWork}/${work.length} passagens`)
  console.log(`\nMapas canônicos:`)
  for (const [name, map] of [
    ['cidades', citiesMap],
    ['países', countriesMap],
    ['empresas', companiesMap],
    ['áreas', areasMap],
    ['línguas', langMap],
    ['passaportes', passportMap],
    ['regiões', regionMap],
  ]) {
    if (map.size === 0) continue
    console.log(`  ${name}: ${map.size} valor(es) canônico(s)`)
    for (const v of map.values()) console.log(`    · ${v}`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Erro:', e)
    process.exit(1)
  })
