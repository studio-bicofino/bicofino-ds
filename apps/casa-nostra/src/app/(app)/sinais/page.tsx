import { createClient } from '@/lib/supabase/server'
import type { Signal, SignalType } from '@/lib/db/types'
import { SignalsTimeline } from './_components/SignalsTimeline'

export const dynamic = 'force-dynamic'

const SIGNAL_TYPE_SET: ReadonlySet<SignalType> = new Set<SignalType>([
  'interesse',
  'lifeevent',
  'capital_move',
  'ask',
  'recusa',
  'outro',
])

type SearchParams = {
  type?: string
  person?: string
}

type PersonRow = {
  id: string
  full_name: string
  preferred_name: string | null
  photo_url: string | null
}

export default async function SinaisPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const typeRaw = (params.type ?? '').trim()
  const type: SignalType | '' = SIGNAL_TYPE_SET.has(typeRaw as SignalType)
    ? (typeRaw as SignalType)
    : ''
  const personId = (params.person ?? '').trim()

  const supabase = await createClient()

  // Pessoas — necessárias pra: resolver autor de cada sinal + popular filtros + form.
  const { data: peopleData } = await supabase
    .from('people')
    .select('id, full_name, preferred_name, photo_url')
    .order('full_name', { ascending: true })

  const people = (peopleData ?? []) as PersonRow[]

  const peopleById: Record<string, {
    full_name: string
    preferred_name: string | null
    photo_url: string | null
  }> = {}
  for (const p of people) {
    peopleById[p.id] = {
      full_name: p.full_name,
      preferred_name: p.preferred_name,
      photo_url: p.photo_url,
    }
  }

  let query = supabase
    .from('signals')
    .select('id, person_id, signal_type, observed_at, content, source, created_at, created_by')

  if (type) query = query.eq('signal_type', type)
  if (personId) query = query.eq('person_id', personId)

  const { data: signalsData, error } = await query.order('observed_at', { ascending: false })

  const signals = (signalsData ?? []) as Signal[]
  const hasFilters = Boolean(type || personId)

  return (
    <div className="cn-page cn-stagger">
      <Hero total={signals.length} hasFilters={hasFilters} />

      <div style={{ height: 1, background: 'var(--bf-border)' }} aria-hidden />

      {error ? (
        <ErrorBlock message={error.message} />
      ) : (
        <SignalsTimeline
          signals={signals}
          peopleById={peopleById}
          people={people.map((p) => ({
            id: p.id,
            full_name: p.full_name,
            preferred_name: p.preferred_name,
          }))}
          initialFilters={{ type, person: personId }}
          defaultPersonId={personId || undefined}
        />
      )}
    </div>
  )
}

function Hero({ total, hasFilters }: { total: number; hasFilters: boolean }) {
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
        // Sinais
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
        Sinais
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--bf-text-secondary)',
          maxWidth: 560,
        }}
      >
        Pequenos movimentos que antecipam grandes decisões. Interesses, life events, capital moves —
        a memória qualitativa que mantém a relação viva.
      </p>
      <p
        className="mono"
        style={{
          fontSize: 11,
          color: 'var(--bf-text-secondary)',
          letterSpacing: '0.04em',
          marginTop: 4,
        }}
      >
        {total} {total === 1 ? 'sinal' : 'sinais'}
        {hasFilters ? ' · filtros ativos' : ''}
      </p>
    </header>
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
