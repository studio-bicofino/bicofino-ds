'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
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

export function PersonRowClient({ person }: { person: PersonRowData }) {
  const router = useRouter()
  const [hover, setHover] = useState(false)
  const displayName = person.preferred_name || person.full_name

  const cellStyle: React.CSSProperties = {
    padding: '18px 20px',
    borderBottom: '1px solid var(--bf-border)',
    verticalAlign: 'middle',
    fontSize: 14,
  }

  function go() {
    router.push(`/p/${person.id}`)
  }

  return (
    <tr
      onClick={go}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          go()
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Abrir ficha de ${displayName}`}
      style={{
        cursor: 'pointer',
        background: hover ? 'var(--bf-surface-subtle)' : 'transparent',
        transition: 'background 120ms ease-out',
        outline: 'none',
      }}
    >
      <td style={cellStyle}>
        <Avatar name={displayName} photoUrl={person.photo_url} />
      </td>
      <td style={cellStyle}>
        <div style={{ fontWeight: 500, color: 'var(--bf-text-primary)' }}>{displayName}</div>
        {person.current_title && (
          <div style={{ fontSize: 12, color: 'var(--bf-text-secondary)', marginTop: 2 }}>
            {person.current_title}
          </div>
        )}
      </td>
      <td style={cellStyle}>
        <div style={{ color: 'var(--bf-text-primary)' }}>{person.current_company ?? '—'}</div>
        {person.home_city && (
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--bf-text-secondary)',
              letterSpacing: '0.04em',
              marginTop: 2,
            }}
          >
            {person.home_city}
          </div>
        )}
      </td>
      <td style={cellStyle}>
        {person.cluster ? <ClusterBadge cluster={person.cluster} /> : <Muted />}
      </td>
      <td style={cellStyle}>
        <CadenceBar
          lastContactDate={person.last_contact_date}
          targetPerYear={person.cadence_target_per_year}
        />
      </td>
      <td style={{ ...cellStyle, fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}>
        <span style={{ fontSize: 11, color: 'var(--bf-text-secondary)' }}>
          {new Date(person.updated_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
          })}
        </span>
      </td>
    </tr>
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
        style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
      />
    )
  }

  return (
    <div
      aria-hidden
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'var(--bf-surface-subtle)',
        border: '1px solid var(--bf-border)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--bf-text-secondary)',
        letterSpacing: '0.04em',
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
        padding: '3px 8px',
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.08em',
        color: 'var(--bf-text-primary)',
        background: 'var(--bf-surface-subtle)',
        border: '1px solid var(--bf-border)',
        borderRadius: 4,
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
