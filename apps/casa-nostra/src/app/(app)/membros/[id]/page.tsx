/**
 * Casa Nostra v2 — /membros/[id]
 *
 * Reusa o mesmo CadastroV2 que /cadastro, mas em modo edit:
 *  - prefilled com os dados existentes da pessoa
 *  - botão "Salvar" chama updatePersonV2 em vez de createPersonV2
 *  - após save, redireciona pra /membros
 *
 * A v0.8.1 (/p/[id]) continua intacta e acessível por URL direta.
 */

import { notFound } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { buildSuggestions, type Suggestion } from '@/lib/utils/strings'
import { listTags } from '../../cadastro/_actions/tags'
import { CadastroV2 } from '../../cadastro/_components/CadastroV2'
import type { CadastroV2Input } from '../../cadastro/_actions/cadastro-schema'

export const dynamic = 'force-dynamic'

type PersonRow = {
  id: string
  full_name: string
  bicofino_id: string | null
  honorific: string | null
  birth_date: string | null
  current_title: string | null
  current_company: string | null
  photo_url: string | null
  home_city: string | null
  home_country: string | null
  address_street: string | null
  address_number: string | null
  address_complement: string | null
  address_state: string | null
  address_zip: string | null
}

type ContactRow = {
  type: string
  value: string
}

type TagJoin = { name: string; kind: 'skill' | 'grupo' | 'afiliacao' }
type PersonTagJoinRow = {
  sort_order: number | null
  // Supabase tipa o join como array; pode vir objeto único também.
  tags: TagJoin | TagJoin[] | null
}

type SuggestionRow = {
  current_title: string | null
  current_company: string | null
  home_city: string | null
}

async function getFormSuggestions(): Promise<{
  current_title: Suggestion[]
  current_company: Suggestion[]
  home_city: Suggestion[]
}> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('people')
    .select('current_title, current_company, home_city')

  const rows = (data ?? []) as SuggestionRow[]
  return {
    current_title: buildSuggestions(rows.map((r) => r.current_title)),
    current_company: buildSuggestions(rows.map((r) => r.current_company)),
    home_city: buildSuggestions(rows.map((r) => r.home_city)),
  }
}

const ALLOWED_CONTACT_TYPES = new Set([
  'whatsapp',
  'email',
  'website',
  'instagram',
])

export default async function EditPersonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [personResp, contactsResp, personTagsResp, allTags, suggestions] =
    await Promise.all([
      supabase
        .from('people')
        .select(
          'id, full_name, bicofino_id, honorific, birth_date, current_title, current_company, photo_url, home_city, home_country, address_street, address_number, address_complement, address_state, address_zip',
        )
        .eq('id', id)
        .maybeSingle(),
      supabase
        .from('contact_methods')
        .select('type, value')
        .eq('person_id', id),
      supabase
        .from('person_tags')
        .select('sort_order, tags ( name, kind )')
        .eq('person_id', id)
        .order('sort_order', { ascending: true }),
      listTags(),
      getFormSuggestions(),
    ])

  const person = personResp.data as PersonRow | null
  if (!person) notFound()

  // Contacts: pegar SÓ os 4 types do v2; último wins se houver duplicata.
  const contactsByType: Record<'whatsapp' | 'email' | 'website' | 'instagram', string> = {
    whatsapp: '',
    email: '',
    website: '',
    instagram: '',
  }
  for (const c of (contactsResp.data ?? []) as ContactRow[]) {
    if (ALLOWED_CONTACT_TYPES.has(c.type)) {
      contactsByType[c.type as keyof typeof contactsByType] = c.value ?? ''
    }
  }

  // Tags: split por kind preservando ordem.
  const skills: string[] = []
  const grupos: string[] = []
  const afiliacoes: string[] = []
  for (const row of (personTagsResp.data ?? []) as unknown as PersonTagJoinRow[]) {
    const raw = row.tags
    const t = Array.isArray(raw) ? raw[0] : raw
    if (!t?.name) continue
    if (t.kind === 'skill') skills.push(t.name)
    else if (t.kind === 'grupo') grupos.push(t.name)
    else if (t.kind === 'afiliacao') afiliacoes.push(t.name)
  }

  const initialData: CadastroV2Input = {
    full_name: person.full_name,
    bicofino_id: person.bicofino_id,
    honorific: person.honorific,
    birth_date: person.birth_date,
    current_title: person.current_title,
    current_company: person.current_company,
    photo_url: person.photo_url,
    contacts: contactsByType,
    address: {
      street: person.address_street,
      number: person.address_number,
      complement: person.address_complement,
      city: person.home_city,
      state: person.address_state,
      zip: person.address_zip,
      country: person.home_country,
    },
    skills,
    grupos,
    afiliacoes,
  }

  return (
    <div
      className="cn-cadastro-wrapper"
      style={{
        width: '100%',
        maxWidth: 1280,
        padding: '24px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CadastroV2
        allTags={allTags}
        suggestions={suggestions}
        mode="edit"
        personId={person.id}
        initialData={initialData}
      />
    </div>
  )
}
