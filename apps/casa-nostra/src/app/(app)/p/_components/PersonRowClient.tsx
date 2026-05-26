'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import type { Cluster } from '@/lib/db/types'
import { CadenceBar } from '../../_components/CadenceBar'

export type PersonRowData = {
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

const ROW_EASE = [0.22, 1, 0.36, 1] as const

export function PersonRowClient({
  person,
  index = 0,
}: {
  person: PersonRowData
  index?: number
}) {
  const router = useRouter()
  const displayName = person.preferred_name || person.full_name

  function go() {
    router.push(`/p/${person.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: ROW_EASE, delay: Math.min(index * 0.04, 0.4) }}
      whileTap={{ scale: 0.997 }}
      className="cn-people-row"
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          go()
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Abrir ficha de ${displayName}`}
    >
      <Avatar name={displayName} photoUrl={person.photo_url} />

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontWeight: 500,
            color: 'var(--bf-text-primary)',
            fontSize: 14,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {displayName}
        </div>
        {person.current_title && (
          <div
            style={{
              fontSize: 12,
              color: 'var(--bf-text-secondary)',
              marginTop: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {person.current_title}
          </div>
        )}
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            color: 'var(--bf-text-primary)',
            fontSize: 14,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {person.current_company ?? '—'}
        </div>
        {person.home_city && (
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--bf-text-secondary)',
              letterSpacing: '0.04em',
              marginTop: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {person.home_city}
          </div>
        )}
      </div>

      <div className="cn-col-hide-mobile">
        {person.cluster ? <ClusterBadge cluster={person.cluster} /> : <Muted />}
      </div>

      <div className="cn-col-hide-mobile">
        <CadenceBar
          lastContactDate={person.last_contact_date}
          targetPerYear={person.cadence_target_per_year}
        />
      </div>

      <div
        className="cn-col-hide-mobile mono"
        style={{ fontSize: 11, color: 'var(--bf-text-secondary)' }}
      >
        {new Date(person.updated_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
        })}
      </div>
    </motion.div>
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
          width: 44,
          height: 44,
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
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'var(--bf-surface-subtle)',
        border: '1px solid var(--bf-border)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 12,
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

function ClusterBadge({ cluster }: { cluster: Cluster }) {
  return (
    <span
      className="mono"
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.08em',
        color: 'var(--bf-text-primary)',
        background: 'var(--bf-surface-subtle)',
        border: '1px solid var(--bf-border)',
        borderRadius: 9999,
      }}
    >
      {cluster}
    </span>
  )
}

function Muted() {
  return (
    <span className="mono" style={{ fontSize: 12, color: 'var(--bf-text-subtle)' }}>
      —
    </span>
  )
}
