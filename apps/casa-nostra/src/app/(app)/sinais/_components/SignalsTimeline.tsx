'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Trash2 } from 'lucide-react'
import type { Signal, SignalType } from '@/lib/db/types'
import { AddSignalForm } from './AddSignalForm'
import { deleteSignal } from '../_actions/signals'
import { SignalFilters, type PersonOption } from './SignalFilters'

const ROW_EASE = [0.22, 1, 0.36, 1] as const

type PersonLite = {
  full_name: string
  preferred_name: string | null
  photo_url: string | null
}

type Props = {
  signals: Signal[]
  peopleById: Record<string, PersonLite>
  people: PersonOption[]
  initialFilters: { type: string; person: string }
  showFormInitially?: boolean
  defaultPersonId?: string
}

const TYPE_LABEL: Record<SignalType, string> = {
  interesse: 'Interesse',
  lifeevent: 'Life event',
  capital_move: 'Capital move',
  ask: 'Ask',
  recusa: 'Recusa',
  outro: 'Outro',
}

const TYPE_COLOR: Record<SignalType, string> = {
  interesse: 'var(--bf-cn-napoli)',
  lifeevent: 'var(--bf-cn-caffe)',
  capital_move: 'var(--bf-cn-sep)',
  ask: 'var(--bf-cn-napoli)',
  recusa: 'var(--bf-ops-danger)',
  outro: 'var(--bf-text-secondary)',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function monthKey(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'unknown'
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function monthLabel(key: string): string {
  if (key === 'unknown') return 'Sem data'
  const [year, monthStr] = key.split('-')
  const month = Number(monthStr) - 1
  const d = new Date(Number(year), month, 1)
  const label = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

type MonthGroup = { key: string; label: string; items: Signal[] }

function groupByMonth(signals: Signal[]): MonthGroup[] {
  const map = new Map<string, Signal[]>()
  for (const s of signals) {
    const k = monthKey(s.observed_at)
    const arr = map.get(k)
    if (arr) arr.push(s)
    else map.set(k, [s])
  }
  return Array.from(map.entries()).map(([key, items]) => ({
    key,
    label: monthLabel(key),
    items,
  }))
}

export function SignalsTimeline({
  signals,
  peopleById,
  people,
  initialFilters,
  showFormInitially = false,
  defaultPersonId,
}: Props) {
  const [showForm, setShowForm] = useState(showFormInitially)
  const groups = useMemo(() => groupByMonth(signals), [signals])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="cn-toolbar">
        <div className="cn-toolbar-filters">
          <SignalFilters people={people} initial={initialFilters} />
        </div>
        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="cn-toolbar-add"
          aria-expanded={showForm}
          style={{
            padding: '12px 20px',
            fontSize: 13,
            fontWeight: 500,
            background: 'var(--bf-ops-success)',
            color: 'var(--bf-ops-success-fg)',
            border: 'none',
            borderRadius: 9999,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          {showForm ? '× Fechar' : '+ Adicionar sinal'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.28, ease: ROW_EASE }}
            style={{ overflow: 'hidden' }}
          >
            <AddSignalForm
              people={people}
              defaultPersonId={defaultPersonId}
              onDone={() => setShowForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {signals.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {groups.map((g) => (
            <MonthSection key={g.key} group={g} peopleById={peopleById} />
          ))}
        </div>
      )}
    </div>
  )
}

function MonthSection({
  group,
  peopleById,
}: {
  group: MonthGroup
  peopleById: Record<string, PersonLite>
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <MonthHeader label={group.label} count={group.items.length} />
      <AnimatePresence initial={false} mode="popLayout">
        {group.items.map((s, i) => (
          <SignalCard
            key={s.id}
            signal={s}
            person={peopleById[s.person_id]}
            index={i}
          />
        ))}
      </AnimatePresence>
    </section>
  )
}

function MonthHeader({ label, count }: { label: string; count: number }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 5,
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 4px',
        background: 'var(--bf-bg-page)',
        borderBottom: '1px solid var(--bf-border)',
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--bf-cn-caffe)',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <span
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: '0.08em',
          color: 'var(--bf-text-subtle)',
        }}
      >
        {count} {count === 1 ? 'sinal' : 'sinais'}
      </span>
    </header>
  )
}

function SignalCard({
  signal,
  person,
  index,
}: {
  signal: Signal
  person: PersonLite | undefined
  index: number
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!confirmDelete) return
    const t = setTimeout(() => setConfirmDelete(false), 4000)
    return () => clearTimeout(t)
  }, [confirmDelete])

  function handleDeleteClick() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    startTransition(async () => {
      const result = await deleteSignal(signal.id)
      if (!result.ok) {
        setError(result.error)
        setConfirmDelete(false)
      }
    })
  }

  const displayName = person ? person.preferred_name || person.full_name : '—'
  const color = TYPE_COLOR[signal.signal_type]
  const label = TYPE_LABEL[signal.signal_type]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.36,
        ease: ROW_EASE,
        delay: Math.min(index * 0.04, 0.4),
      }}
      style={{
        background: 'var(--bf-surface)',
        border: '1px solid var(--bf-border)',
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          minWidth: 0,
        }}
      >
        <Avatar name={displayName} photoUrl={person?.photo_url ?? null} />

        <div style={{ minWidth: 0, flex: 1 }}>
          <Link
            href={`/p/${signal.person_id}`}
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: 'var(--bf-text-primary)',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {displayName}
          </Link>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 2,
              flexWrap: 'wrap',
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color,
                fontWeight: 500,
              }}
            >
              {label}
            </span>
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'var(--bf-text-subtle)',
              }}
            >
              {formatDate(signal.observed_at)}
            </span>
          </div>
        </div>

        <DeleteControl
          confirm={confirmDelete}
          isPending={isPending}
          onClick={handleDeleteClick}
        />
      </header>

      <p
        style={{
          fontSize: 14,
          color: 'var(--bf-text-primary)',
          lineHeight: 1.55,
        }}
      >
        {signal.content}
      </p>

      {signal.source && (
        <p
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.04em',
            color: 'var(--bf-text-subtle)',
          }}
        >
          fonte · {signal.source}
        </p>
      )}

      {error && (
        <p
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.04em',
            color: 'var(--bf-ops-danger)',
          }}
        >
          erro · {error}
        </p>
      )}
    </motion.article>
  )
}

function DeleteControl({
  confirm,
  isPending,
  onClick,
}: {
  confirm: boolean
  isPending: boolean
  onClick: () => void
}) {
  if (confirm) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isPending}
        style={{
          padding: '6px 12px',
          fontSize: 11,
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          letterSpacing: '0.04em',
          background: 'var(--bf-ops-danger)',
          color: '#fff',
          border: 'none',
          borderRadius: 9999,
          cursor: isPending ? 'wait' : 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Confirmar?
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      title="Apagar sinal"
      aria-label="Apagar sinal"
      style={{
        background: 'none',
        border: 'none',
        padding: 6,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--bf-text-subtle)',
        cursor: isPending ? 'not-allowed' : 'pointer',
        borderRadius: 6,
        transition: 'color 160ms ease-out',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--bf-ops-danger)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--bf-text-subtle)'
      }}
    >
      <Trash2 size={16} strokeWidth={1.5} />
    </button>
  )
}

function Avatar({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('')

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt=""
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    )
  }

  return (
    <div
      aria-hidden
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--bf-surface-subtle)',
        border: '1px solid var(--bf-border)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--bf-text-secondary)',
        letterSpacing: '0.04em',
        flexShrink: 0,
      }}
    >
      {initials || '—'}
    </div>
  )
}

function EmptyState() {
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
        Nenhum sinal registrado
      </p>
      <p style={{ fontSize: 14, maxWidth: 420, margin: '0 auto' }}>
        Cada sinal vira parte da memória qualitativa de uma pessoa. Comece pelo botão acima.
      </p>
    </div>
  )
}
