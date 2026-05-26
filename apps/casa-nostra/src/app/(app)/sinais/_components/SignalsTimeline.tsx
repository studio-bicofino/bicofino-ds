'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Signal, SignalType } from '@/lib/db/types'
import { AddSignalForm } from './AddSignalForm'
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

export function SignalsTimeline({
  signals,
  peopleById,
  people,
  initialFilters,
  showFormInitially = false,
  defaultPersonId,
}: Props) {
  const [showForm, setShowForm] = useState(showFormInitially)

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {signals.map((s, i) => (
            <SignalCard
              key={s.id}
              signal={s}
              person={peopleById[s.person_id]}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
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
  const displayName = person ? person.preferred_name || person.full_name : '—'
  const color = TYPE_COLOR[signal.signal_type]
  const label = TYPE_LABEL[signal.signal_type]

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
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
    </motion.article>
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
