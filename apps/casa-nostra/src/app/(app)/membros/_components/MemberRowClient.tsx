'use client'

import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'

export type MemberRowData = {
  id: string
  full_name: string
  current_title: string | null
  current_company: string | null
  photo_url: string | null
  /** true se falta foto */
  missingPhoto: boolean
  /** true se endereço está totalmente vazio */
  missingAddress: boolean
}

const ROW_EASE = [0.22, 1, 0.36, 1] as const

export function MemberRowClient({
  person,
  index = 0,
}: {
  person: MemberRowData
  index?: number
}) {
  const router = useRouter()
  const reduce = useReducedMotion()

  function go() {
    router.push(`/p/${person.id}`)
  }

  const tooltip = pendencyTooltip(person.missingPhoto, person.missingAddress)
  const hasPendency = person.missingPhoto || person.missingAddress

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.24, ease: ROW_EASE, delay: Math.min(index * 0.04, 0.24) }
      }
      className="cn-people-row"
      style={{ gridTemplateColumns: '44px minmax(0, 1.6fr) minmax(0, 1.2fr) 16px' }}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          go()
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Abrir ficha de ${person.full_name}`}
    >
      <Avatar name={person.full_name} photoUrl={person.photo_url} />

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
          {person.full_name}
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

      <div
        style={{
          color: 'var(--bf-text-primary)',
          fontSize: 14,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {person.current_company ?? '—'}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16,
          height: 16,
        }}
      >
        {hasPendency ? (
          <span
            aria-label={tooltip}
            title={tooltip}
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--bf-ops-danger)',
            }}
          />
        ) : null}
      </div>
    </motion.div>
  )
}

function pendencyTooltip(missingPhoto: boolean, missingAddress: boolean): string {
  if (missingPhoto && missingAddress) return 'Falta foto e endereço'
  if (missingPhoto) return 'Falta foto'
  if (missingAddress) return 'Falta endereço'
  return ''
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
