#!/usr/bin/env node
// Semeia Ruffino Fox no banco — registro perdido por um deploy antigo que não salvou.
// Roda com: infisical run --env=dev -- node scripts/seed-ruffino.mjs
// One-off — script de teste/recuperação, não migration recorrente.

import { createClient } from '@supabase/supabase-js'
import { readFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { resolve } from 'node:path'
import { homedir } from 'node:os'

const PHOTO_PATH = resolve(
  homedir(),
  '.claude/image-cache/2ec888e9-0a4b-41cd-819a-4bc504b387e1/15.png',
)
const BUCKET = 'people-photos'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function lookupWoneyPersonId() {
  const { data, error } = await supabase
    .from('people')
    .select('id, full_name')
    .ilike('full_name', '%woney%')
    .limit(1)
    .maybeSingle()
  if (error) {
    console.warn('Lookup Woney falhou:', error.message)
    return null
  }
  return data?.id ?? null
}

async function lookupGroupId(name) {
  const { data, error } = await supabase
    .from('groups')
    .select('id, name')
    .eq('name', name)
    .limit(1)
    .maybeSingle()
  if (error) {
    console.warn(`Lookup grupo "${name}" falhou:`, error.message)
    return null
  }
  return data?.id ?? null
}

async function uploadPhoto() {
  const buffer = await readFile(PHOTO_PATH)
  const path = `${randomUUID()}.png`
  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'image/png',
  })
  if (error) throw new Error(`upload photo: ${error.message}`)
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

async function alreadyExists() {
  const { data } = await supabase
    .from('people')
    .select('id')
    .eq('full_name', 'Ruffino Fox')
    .limit(1)
    .maybeSingle()
  return data?.id ?? null
}

async function main() {
  const existing = await alreadyExists()
  if (existing) {
    console.log(`✓ Ruffino Fox já existe (id=${existing}). Nada a fazer.`)
    return
  }

  console.log('→ uploading photo…')
  const photoUrl = await uploadPhoto()
  console.log(`  ok: ${photoUrl}`)

  const woneyId = await lookupWoneyPersonId()
  console.log(`→ intro_by Woney: ${woneyId ?? '(não encontrada — segue null)'}`)

  const amigosId = await lookupGroupId('Amigos Particulares')
  console.log(`→ grupo Amigos Particulares: ${amigosId ?? '(não encontrado)'}`)

  console.log('→ inserindo person…')
  const { data: person, error: personErr } = await supabase
    .from('people')
    .insert({
      full_name: 'Ruffino Fox',
      preferred_name: '"a Raposa"',
      photo_url: photoUrl,
      current_company: 'Bicofono Club',
      current_title: 'Brand Ambassador',
      cluster: 'A',
      seniority: 'referencia',
      expertise_area: 'Jet setter, world traveller, problem solver, coolhunter.',
      intimacy: 5,
      contact_ease: 5,
      bicofino_disposition: 5,
      network_reach: 5,
      languages: ['portugues', 'ingles', 'italiano'],
      passports: [],
      intro_by_person_id: woneyId,
      cadence_target_per_year: 4,
      last_contact_date: '2026-01-31',
      private_notes: null,
      restrict_visibility: false,
    })
    .select('id')
    .single()

  if (personErr || !person) throw new Error(`person insert: ${personErr?.message}`)
  const personId = person.id
  console.log(`  ok: id=${personId}`)

  console.log('→ contact_methods…')
  const { error: cmErr } = await supabase.from('contact_methods').insert([
    {
      person_id: personId,
      type: 'outro',
      value: 'www.bicofino.club',
      label: 'club',
      is_primary: true,
    },
  ])
  if (cmErr) throw new Error(`contact_methods: ${cmErr.message}`)

  console.log('→ person_categories…')
  const { error: pcErr } = await supabase.from('person_categories').insert([
    { person_id: personId, category_value: 'parceiro' },
    { person_id: personId, category_value: 'referencia' },
  ])
  if (pcErr) throw new Error(`person_categories: ${pcErr.message}`)

  if (amigosId) {
    console.log('→ person_groups (Amigos Particulares)…')
    const { error: pgErr } = await supabase.from('person_groups').insert([
      { person_id: personId, group_id: amigosId, joined_year: null, notes: null },
    ])
    if (pgErr) throw new Error(`person_groups: ${pgErr.message}`)
  }

  console.log('→ signals (life event Vespa)…')
  const { error: sErr } = await supabase.from('signals').insert([
    {
      person_id: personId,
      signal_type: 'lifeevent',
      observed_at: '2026-01-31',
      content: 'Se apresentou ao mundo numa collab Bicofino com a Vespa.',
      source: 'Instagram',
    },
  ])
  if (sErr) throw new Error(`signals: ${sErr.message}`)

  console.log(`\n✓ Ruffino Fox semeado com sucesso. id=${personId}`)
  console.log(`  abrir: ${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/p/${personId}`)
}

main().catch((err) => {
  console.error('✗ Falhou:', err.message)
  process.exit(1)
})
