'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronRight, Building2 } from 'lucide-react'

import type { Organization } from '@/lib/db/types'

export type OrgLogoStripItem = {
  org: Pick<Organization, 'id' | 'name' | 'kind' | 'logo_url'>
  role: string | null
  is_current: boolean
}

type Props = {
  items: OrgLogoStripItem[]
}

const KIND_LABELS = {
  empresa: 'Empresa',
  clube: 'Clube',
  midia: 'Mídia',
  escola: 'Escola',
  entidade: 'Entidade',
} as const

export function OrgLogoStrip({ items }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [hasOverflowRight, setHasOverflowRight] = useState(false)
  const [hasOverflowLeft, setHasOverflowLeft] = useState(false)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    function update() {
      if (!el) return
      const overflow = el.scrollWidth - el.clientWidth
      setHasOverflowLeft(el.scrollLeft > 4)
      setHasOverflowRight(overflow - el.scrollLeft > 4)
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [items.length])

  if (items.length === 0) return null

  const sorted = [...items].sort((a, b) => {
    if (a.is_current !== b.is_current) return a.is_current ? -1 : 1
    return a.org.name.localeCompare(b.org.name)
  })

  function handleNudge() {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.6, behavior: 'smooth' })
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minWidth: 0,
      }}
    >
      <div style={{ position: 'relative', minWidth: 0 }}>
        <div
          ref={scrollerRef}
          style={{
            display: 'flex',
            gap: 18,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            alignItems: 'center',
          }}
          className="cn-orglogo-strip"
        >
          {sorted.map((item) => (
            <LogoChip key={item.org.id} item={item} />
          ))}
        </div>

        {/* Gradient fades nas bordas quando há overflow */}
        <AnimatePresence>
          {hasOverflowLeft && (
            <motion.div
              key="fade-l"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 28,
                pointerEvents: 'none',
                background:
                  'linear-gradient(to right, var(--bf-surface), rgba(255,255,255,0))',
              }}
            />
          )}
          {hasOverflowRight && (
            <motion.div
              key="fade-r"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              aria-hidden
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 28,
                pointerEvents: 'none',
                background:
                  'linear-gradient(to left, var(--bf-surface), rgba(255,255,255,0))',
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Indicador de mais — chevron animado embaixo */}
      <AnimatePresence>
        {hasOverflowRight && (
          <motion.button
            key="chevron"
            type="button"
            onClick={handleNudge}
            aria-label="Ver mais vínculos"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              alignSelf: 'flex-end',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              background: 'transparent',
              border: 'none',
              color: 'var(--bf-text-secondary)',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, ui-monospace, monospace',
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            mais
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-flex' }}
            >
              <ChevronRight size={12} strokeWidth={1.5} />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function LogoChip({ item }: { item: OrgLogoStripItem }) {
  const tooltip = [
    item.org.name,
    item.role ?? null,
    item.is_current ? 'atual' : null,
  ]
    .filter(Boolean)
    .join(' · ')

  const labelKind = KIND_LABELS[item.org.kind] ?? item.org.kind

  return (
    <div
      title={`${tooltip} (${labelKind})`}
      style={{
        flexShrink: 0,
        height: 48,
        minWidth: 56,
        maxWidth: 120,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
        background: 'var(--bf-surface)',
        borderRadius: 8,
      }}
    >
      {item.org.logo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.org.logo_url}
          alt={item.org.name}
          style={{
            maxHeight: 40,
            maxWidth: '100%',
            objectFit: 'contain',
          }}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      ) : (
        <div
          aria-hidden
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--bf-text-secondary)',
            fontSize: 12,
          }}
        >
          <Building2 size={16} strokeWidth={1.5} />
          <span
            style={{
              maxWidth: 80,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {item.org.name}
          </span>
        </div>
      )}
    </div>
  )
}
