import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Filters } from './_components/Filters'
import { PersonRowClient } from './p/_components/PersonRowClient'
import type { Cluster, Group } from '@/lib/db/types'

const PAGE_SIZE = 20
const SENTINEL_EMPTY = '00000000-0000-0000-0000-000000000000'

type SearchParams = {
  q?: string
  cluster?: string
  group?: string
  city?: string
  page?: string
}

type PersonRow = {
  id: string
  full_name: string
  preferred_name: string | null
  photo_url: string | null
  current_company: string | null
  current_title: string | null
  cluster: Cluster | null
  home_city: string | null
  cadence_target_per_year: number | null
  last_contact_date: string | null
  updated_at: string
}

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const q = (params.q ?? '').trim()
  const cluster = (params.cluster ?? '').trim() as '' | Cluster
  const groupId = (params.group ?? '').trim()
  const city = (params.city ?? '').trim()
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1)
  const offset = (page - 1) * PAGE_SIZE

  const supabase = await createClient()

  const { data: groupsData } = await supabase
    .from('groups')
    .select('id, name, group_type')
    .order('name', { ascending: true })

  const groups = (groupsData ?? []) as Array<Pick<Group, 'id' | 'name' | 'group_type'>>

  // Stats globais (não filtradas) — base inteira, para o strip do hero
  const { data: cadenceRows } = await supabase
    .from('people')
    .select('cadence_target_per_year, last_contact_date')

  const stats = computeStats((cadenceRows ?? []) as CadenceRow[])

  let personIdFilter: string[] | null = null
  if (groupId) {
    const { data: pgs } = await supabase
      .from('person_groups')
      .select('person_id')
      .eq('group_id', groupId)
    personIdFilter = (pgs ?? []).map((row) => row.person_id as string)
  }

  let query = supabase
    .from('people')
    .select(
      'id, full_name, preferred_name, photo_url, current_company, current_title, cluster, home_city, cadence_target_per_year, last_contact_date, updated_at',
      { count: 'exact' },
    )

  if (q) {
    const safe = q.replace(/[,()*]/g, ' ').trim()
    if (safe) {
      query = query.or(`full_name.ilike.%${safe}%,current_company.ilike.%${safe}%`)
    }
  }
  if (cluster) query = query.eq('cluster', cluster)
  if (city) query = query.ilike('home_city', `%${city}%`)
  if (personIdFilter !== null) {
    query = query.in('id', personIdFilter.length ? personIdFilter : [SENTINEL_EMPTY])
  }

  const { data, count, error } = await query
    .order('full_name', { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1)

  const people = ((data ?? []) as PersonRow[])
  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const hasFilters = Boolean(q || cluster || groupId || city)

  return (
    <div
      style={{
        padding: '48px 56px 64px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        maxWidth: 1280,
      }}
    >
      <Hero stats={stats} />

      <div style={{ height: 1, background: 'var(--bf-border)' }} aria-hidden />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <Filters groups={groups} initial={{ q, cluster, group: groupId, city }} />
        </div>
        <Link
          href="/p/novo"
          style={{
            padding: '12px 20px',
            fontSize: 13,
            fontWeight: 500,
            background: 'var(--bf-ops-success)',
            color: 'var(--bf-ops-success-fg)',
            border: 'none',
            borderRadius: 9999,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          + Adicionar pessoa
        </Link>
      </div>

      <p
        className="mono"
        style={{
          fontSize: 11,
          color: 'var(--bf-text-secondary)',
          letterSpacing: '0.04em',
        }}
      >
        {total} {total === 1 ? 'pessoa' : 'pessoas'}
        {hasFilters ? ' · filtros ativos' : ''}
      </p>

      {error ? (
        <ErrorBlock message={error.message} />
      ) : people.length === 0 ? (
        <EmptyState hasFilters={hasFilters} />
      ) : (
        <PeopleTable people={people} />
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          searchParams={{ q, cluster, group: groupId, city }}
        />
      )}
    </div>
  )
}

// ============================================================
// Hero + stat strip
// ============================================================

type CadenceRow = {
  cadence_target_per_year: number | null
  last_contact_date: string | null
}

type Stats = {
  total: number
  emDia: number
  atencao: number
  atrasadas: number
}

const MS_PER_DAY = 1000 * 60 * 60 * 24

function computeStats(rows: CadenceRow[]): Stats {
  let emDia = 0
  let atencao = 0
  let atrasadas = 0
  for (const row of rows) {
    if (!row.cadence_target_per_year || !row.last_contact_date) continue
    const window = 365 / row.cadence_target_per_year
    const days = Math.max(
      0,
      Math.floor((Date.now() - new Date(row.last_contact_date).getTime()) / MS_PER_DAY),
    )
    const ratio = days / window
    if (ratio <= 1) emDia++
    else if (ratio <= 1.5) atencao++
    else atrasadas++
  }
  return { total: rows.length, emDia, atencao, atrasadas }
}

function Hero({ stats }: { stats: Stats }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <p
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--bf-text-secondary)',
            marginBottom: 16,
          }}
        >
          Bicofino · Casa Nostra
        </p>
        <h1
          style={{
            fontSize: 'clamp(40px, 5.6vw, 64px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--bf-text-primary)',
          }}
        >
          Casa Nostra
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: 16,
            color: 'var(--bf-text-secondary)',
            maxWidth: 520,
          }}
        >
          Cada pessoa registrada com a substância qualitativa que separa um CRM de relação de um
          pipeline comercial.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--bf-border)',
          borderBottom: '1px solid var(--bf-border)',
        }}
      >
        <Stat label="Total" value={stats.total} first />
        <Stat label="Em dia" value={stats.emDia} accent="var(--bf-ops-success)" />
        <Stat label="Atenção" value={stats.atencao} />
        <Stat label="Atrasadas" value={stats.atrasadas} accent="var(--bf-ops-danger)" />
      </div>
    </header>
  )
}

function Stat({
  label,
  value,
  accent,
  first,
}: {
  label: string
  value: number
  accent?: string
  first?: boolean
}) {
  return (
    <div
      style={{
        padding: '20px 24px',
        borderLeft: first ? 'none' : '1px solid var(--bf-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-secondary)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: accent ?? 'var(--bf-text-primary)',
        }}
      >
        {value}
      </span>
    </div>
  )
}

function PeopleTable({ people }: { people: PersonRow[] }) {
  const headerStyle: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--bf-text-secondary)',
    fontWeight: 500,
    textAlign: 'left',
    padding: '14px 20px',
    borderBottom: '1px solid var(--bf-border)',
    background: 'var(--bf-surface-subtle)',
  }

  return (
    <div
      style={{
        background: 'var(--bf-surface)',
        border: '1px solid var(--bf-border)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...headerStyle, width: 56 }} />
            <th style={headerStyle}>Nome</th>
            <th style={headerStyle}>Empresa</th>
            <th style={{ ...headerStyle, width: 88 }}>Cluster</th>
            <th style={{ ...headerStyle, width: 140 }}>Cadência</th>
            <th style={{ ...headerStyle, width: 120 }}>Atualizada</th>
          </tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <PersonRowClient key={p.id} person={p} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div
      style={{
        background: 'var(--bf-surface)',
        border: '1px dashed var(--bf-border-strong)',
        borderRadius: 16,
        padding: 64,
        textAlign: 'center',
        color: 'var(--bf-text-secondary)',
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        {hasFilters ? 'Nenhuma pessoa com esses filtros' : 'Nenhuma pessoa cadastrada'}
      </p>
      <p style={{ fontSize: 14, maxWidth: 420, margin: '0 auto' }}>
        {hasFilters
          ? 'Ajuste os filtros ou limpe a busca para ver mais.'
          : 'A base começa vazia. O modal de adicionar pessoa chega na próxima frente.'}
      </p>
    </div>
  )
}

function ErrorBlock({ message }: { message: string }) {
  return (
    <div
      style={{
        background: 'var(--bf-surface)',
        border: '1px solid var(--bf-ops-danger)',
        borderRadius: 16,
        padding: 24,
        color: 'var(--bf-ops-danger)',
        fontSize: 14,
      }}
    >
      <p className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', marginBottom: 8 }}>
        ERRO AO CARREGAR
      </p>
      <p>{message}</p>
    </div>
  )
}

function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number
  totalPages: number
  searchParams: { q: string; cluster: string; group: string; city: string }
}) {
  function hrefFor(target: number) {
    const next = new URLSearchParams()
    if (searchParams.q) next.set('q', searchParams.q)
    if (searchParams.cluster) next.set('cluster', searchParams.cluster)
    if (searchParams.group) next.set('group', searchParams.group)
    if (searchParams.city) next.set('city', searchParams.city)
    if (target > 1) next.set('page', String(target))
    const qs = next.toString()
    return qs ? `/?${qs}` : '/'
  }

  const prev = page > 1 ? hrefFor(page - 1) : null
  const next = page < totalPages ? hrefFor(page + 1) : null

  const linkStyle: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--bf-text-primary)',
    padding: '8px 14px',
    border: '1px solid var(--bf-border)',
    borderRadius: 9999,
    background: 'var(--bf-surface)',
  }

  const disabledStyle: React.CSSProperties = {
    ...linkStyle,
    color: 'var(--bf-text-subtle)',
    cursor: 'not-allowed',
  }

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
      }}
    >
      {prev ? (
        <Link href={prev} style={linkStyle}>
          ← Anterior
        </Link>
      ) : (
        <span style={disabledStyle}>← Anterior</span>
      )}

      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.12em',
          color: 'var(--bf-text-secondary)',
        }}
      >
        {page} / {totalPages}
      </span>

      {next ? (
        <Link href={next} style={linkStyle}>
          Próxima →
        </Link>
      ) : (
        <span style={disabledStyle}>Próxima →</span>
      )}
    </nav>
  )
}
