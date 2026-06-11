import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { MembersList, type MemberRowData } from './_components/MembersList'
import { MemberSearch, type MemberSearchOption } from './_components/MemberSearch'

const PAGE_SIZE = 50

type SearchParams = {
  q?: string
  page?: string
}

type PersonRow = {
  id: string
  full_name: string
  member_number: number | null
  current_title: string | null
  current_company: string | null
  photo_url: string | null
  address_street: string | null
  address_number: string | null
  address_complement: string | null
  address_state: string | null
  address_zip: string | null
  home_city: string | null
  home_country: string | null
}

export default async function MembrosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const q = (params.q ?? '').trim()
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1)
  const offset = (page - 1) * PAGE_SIZE

  const supabase = await createClient()

  let query = supabase
    .from('people')
    .select(
      'id, full_name, member_number, current_title, current_company, photo_url, address_street, address_number, address_complement, address_state, address_zip, home_city, home_country',
      { count: 'exact' },
    )

  if (q) {
    const safe = q.replace(/[,()*]/g, ' ').trim()
    if (safe) {
      query = query.or(`full_name.ilike.%${safe}%,current_company.ilike.%${safe}%`)
    }
  }

  const { data, count, error } = await query
    .order('list_order', { ascending: true, nullsFirst: false })
    .order('full_name', { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1)

  // Pool leve pro typeahead — independente do filtro/paginação da lista.
  const { data: searchData } = await supabase
    .from('people')
    .select('id, full_name, current_company')
    .order('full_name', { ascending: true })
    .limit(500)

  const searchOptions: MemberSearchOption[] = (
    (searchData ?? []) as Array<{
      id: string
      full_name: string
      current_company: string | null
    }>
  ).map((p) => ({ id: p.id, name: p.full_name, company: p.current_company }))

  const peopleRaw = (data ?? []) as PersonRow[]
  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const hasFilters = Boolean(q)

  const members: MemberRowData[] = peopleRaw.map((p) => ({
    id: p.id,
    full_name: p.full_name,
    member_number: p.member_number,
    current_title: p.current_title,
    current_company: p.current_company,
    photo_url: p.photo_url,
    missingPhoto: isMissingPhoto(p.photo_url),
    missingAddress: isAddressEmpty(p),
  }))

  const pendencyCount = members.filter((m) => m.missingPhoto || m.missingAddress).length

  return (
    <div className="cn-page cn-stagger">
      <Header />

      <div style={{ height: 1, background: 'var(--bf-border)' }} aria-hidden />

      <div className="cn-toolbar" style={{ position: 'relative', zIndex: 40 }}>
        <MemberSearch initialQuery={q} options={searchOptions} />
        <Link
          href="/cadastro"
          className="cn-toolbar-add"
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
          + Novo membro
        </Link>
      </div>

      <p
        className="mono"
        style={{
          fontSize: 11,
          color: 'var(--bf-text-secondary)',
          letterSpacing: '0.04em',
          position: 'relative',
          zIndex: 0,
        }}
      >
        {total} {total === 1 ? 'membro' : 'membros'}
        {hasFilters ? ' · filtros ativos' : ''}
        {pendencyCount > 0 ? ` · ${pendencyCount} com pendência` : ''}
      </p>

      {error ? (
        <ErrorBlock message={error.message} />
      ) : members.length === 0 ? (
        <EmptyState hasFilters={hasFilters} />
      ) : (
        <MembersList
          members={members}
          reorderable={!hasFilters && totalPages === 1}
          baseOffset={offset}
        />
      )}

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} searchParams={{ q }} />
      )}

      <Footer />
    </div>
  )
}

// ============================================================
// Pendency helpers
// ============================================================

function isMissingPhoto(url: string | null): boolean {
  return !url || url.trim() === ''
}

function isAddressEmpty(p: {
  address_street: string | null
  address_number: string | null
  address_complement: string | null
  address_state: string | null
  address_zip: string | null
  home_city: string | null
  home_country: string | null
}): boolean {
  const fields = [
    p.address_street,
    p.address_number,
    p.address_complement,
    p.address_state,
    p.address_zip,
    p.home_city,
    p.home_country,
  ]
  return fields.every((v) => !v || v.trim() === '')
}

// ============================================================
// Header / Footer / Empty / Error / Pagination
// ============================================================

function Header() {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p
        className="mono"
        style={{
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--bf-cn-caffe)',
          fontWeight: 500,
        }}
      >
        // CASA NOSTRA
      </p>
      <h1
        style={{
          fontSize: 'clamp(32px, 4vw, 44px)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          color: 'var(--bf-text-primary)',
        }}
      >
        Membros
      </h1>
    </header>
  )
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 32,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.08em',
          color: 'var(--bf-text-secondary)',
          opacity: 0.5,
        }}
      >
        // BICOFINO // CASA NOSTRA
      </span>
    </footer>
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
        {hasFilters ? 'Nenhum membro com esses filtros' : 'Nenhum membro cadastrado'}
      </p>
      <p style={{ fontSize: 14, maxWidth: 420, margin: '0 auto' }}>
        {hasFilters
          ? 'Ajuste a busca para ver mais.'
          : 'Use /cadastro para adicionar o primeiro membro.'}
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
        padding: 32,
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
  searchParams: { q: string }
}) {
  function hrefFor(target: number) {
    const next = new URLSearchParams()
    if (searchParams.q) next.set('q', searchParams.q)
    if (target > 1) next.set('page', String(target))
    const qs = next.toString()
    return qs ? `/membros?${qs}` : '/membros'
  }

  const prev = page > 1 ? hrefFor(page - 1) : null
  const next = page < totalPages ? hrefFor(page + 1) : null

  const linkStyle: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--bf-text-primary)',
    padding: '8px 16px',
    border: '1px solid var(--bf-border)',
    borderRadius: 9999,
    background: 'var(--bf-surface)',
    textDecoration: 'none',
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
