import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PersonForm } from '@/app/(app)/p/_components/PersonForm'
import { updatePerson, deletePerson } from '@/app/(app)/p/_actions/persons'
import { getAllSuggestions } from '@/lib/db/suggestions'
import type { PersonFormInput } from '@/lib/db/schemas'
import type {
  BicofinoHistoryEntry,
  ContactMethod,
  FutebolLink,
  GeographyAction,
  Group,
  Organization,
  Person,
  PersonCategory,
  PersonOrganization,
  PersonOrganizationWithOrg,
  PersonWithRelations,
  Movement,
  WorkHistoryEntry,
} from '@/lib/db/types'

export const dynamic = 'force-dynamic'

type IntroCandidate = { id: string; full_name: string }

type PersonGroupJoinRow = {
  person_id: string
  group_id: string
  joined_year: number | null
  notes: string | null
  group: Group | null
}

type PersonOrgJoinRow = PersonOrganization & {
  org: Organization | null
}

type PersonRawRow = Person & {
  contact_methods: ContactMethod[] | null
  person_categories: PersonCategory[] | null
  work_history: WorkHistoryEntry[] | null
  futebol_links: FutebolLink[] | null
  bicofino_history: BicofinoHistoryEntry[] | null
  person_groups: PersonGroupJoinRow[] | null
  geography_action: GeographyAction[] | null
  signals: Movement[] | null
  person_organizations: PersonOrgJoinRow[] | null
}

export default async function PersonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('people')
    .select(
      '*, contact_methods(*), person_categories(*), work_history(*), futebol_links(*), bicofino_history(*), person_groups(*, group:groups(*)), geography_action(*), signals(*), person_organizations(*, org:organizations(*))',
    )
    .eq('id', id)
    .single<PersonRawRow>()

  if (error || !data) {
    notFound()
  }

  const person: PersonWithRelations = {
    ...(data as Person),
    contact_methods: data.contact_methods ?? [],
    categories: data.person_categories ?? [],
    work_history: data.work_history ?? [],
    futebol_links: data.futebol_links ?? [],
    bicofino_history: data.bicofino_history ?? [],
    groups: (data.person_groups ?? [])
      .map((pg) => pg.group)
      .filter((g): g is Group => g !== null),
    geography_action: data.geography_action ?? [],
    signals: data.signals ?? [],
    person_organizations: (data.person_organizations ?? [])
      .filter((po): po is PersonOrgJoinRow & { org: Organization } => po.org !== null)
      .map<PersonOrganizationWithOrg>((po) => ({ ...po, org: po.org })),
  }

  const [groupsRes, peopleRes, orgsRes, suggestions] = await Promise.all([
    supabase
      .from('groups')
      .select('id, name, group_type')
      .order('name', { ascending: true }),
    supabase
      .from('people')
      .select('id, full_name')
      .neq('id', id)
      .order('full_name', { ascending: true }),
    supabase.from('organizations').select('*').order('name', { ascending: true }),
    getAllSuggestions(),
  ])

  const groups = (groupsRes.data ?? []) as Array<Pick<Group, 'id' | 'name' | 'group_type'>>
  const introCandidates = (peopleRes.data ?? []) as IntroCandidate[]
  const organizations = (orgsRes.data ?? []) as Organization[]

  async function handleUpdate(input: PersonFormInput) {
    'use server'
    return updatePerson(id, input)
  }

  async function handleDelete() {
    'use server'
    const result = await deletePerson(id)
    if (result.ok) {
      redirect('/')
    }
    return result
  }

  const displayName = person.preferred_name || person.full_name

  return (
    <div className="cn-page">
      <header style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <nav
          className="mono"
          aria-label="Breadcrumb"
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--bf-text-secondary)',
          }}
        >
          <Link
            href="/"
            style={{
              color: 'var(--bf-text-secondary)',
              textDecoration: 'none',
            }}
          >
            Pessoas
          </Link>
          <span style={{ margin: '0 8px', color: 'var(--bf-text-subtle)' }}>·</span>
          <span style={{ color: 'var(--bf-text-primary)' }}>{displayName}</span>
        </nav>

        <h1
          style={{
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--bf-text-primary)',
          }}
        >
          {displayName}
        </h1>
        {(person.current_title || person.current_company) && (
          <p
            style={{
              fontSize: 15,
              color: 'var(--bf-text-secondary)',
            }}
          >
            {[person.current_title, person.current_company].filter(Boolean).join(' · ')}
          </p>
        )}
      </header>

      <section
        style={{
          background: '#f9f4e8',
          border: '1px solid var(--bf-border)',
          borderRadius: 16,
          padding: 32,
        }}
      >
        <PersonForm
          initial={person}
          groups={groups}
          organizations={organizations}
          introCandidates={introCandidates}
          suggestions={suggestions}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
        />
      </section>
    </div>
  )
}
