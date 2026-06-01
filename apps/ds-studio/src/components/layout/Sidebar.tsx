'use client'

import { useEffect, useRef, useState } from 'react'
import { NAV, ALL_SECTION_IDS, type NavGroup } from '@/config/navigation'
import { useLang } from '@/content/index'
import { cn } from '@/lib/utils'
import { ChevronRight, X } from 'lucide-react'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const { t } = useLang()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set([NAV[0].id]))
  const observerRef = useRef<IntersectionObserver | null>(null)

  /* Intersection observer — detect active section */
  useEffect(() => {
    observerRef.current?.disconnect()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            const group = NAV.find((g) => g.items.some((i) => i.id === entry.target.id))
            if (group) setOpenGroups((prev) => new Set([...prev, group.id]))
          }
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    )
    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    observerRef.current = obs
    return () => obs.disconnect()
  }, [])

  function toggleGroup(id: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const sidebar = (
    <nav
      aria-label="Navegação principal"
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: 'var(--bf-black)', color: 'var(--bf-surface)' }}
    >
      {/* Logo area */}
      <div
        className="px-md py-lg border-b shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <span
          className="block text-xs uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--bf-accent)', letterSpacing: '0.14em' }}
        >
          Bicofino
        </span>
        <span className="block text-sm font-medium mt-sm" style={{ color: 'var(--bf-surface)' }}>
          Design Studio
        </span>
      </div>

      {/* Nav groups */}
      <div className="flex-1 py-md">
        {NAV.map((group) => (
          <NavGroupItem
            key={group.id}
            group={group}
            isOpen={openGroups.has(group.id)}
            activeId={activeId}
            onToggle={() => toggleGroup(group.id)}
            onItemClick={(id) => {
              scrollTo(id)
              onClose()
            }}
          />
        ))}
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col shrink-0 h-screen sticky top-0 overflow-hidden"
        style={{ width: 220, background: 'var(--bf-black)' }}
      >
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden
          />
          {/* Drawer */}
          <aside
            className="relative z-10 flex flex-col h-full overflow-hidden"
            style={{ width: 260, background: 'var(--bf-black)' }}
          >
            <button
              onClick={onClose}
              className="absolute top-md right-md p-sm rounded-sm text-sm"
              style={{ color: 'var(--bf-text-subtle)' }}
              aria-label={t('ui.menu.close')}
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}
    </>
  )
}

function NavGroupItem({
  group,
  isOpen,
  activeId,
  onToggle,
  onItemClick,
}: {
  group: NavGroup
  isOpen: boolean
  activeId: string | null
  onToggle: () => void
  onItemClick: (id: string) => void
}) {
  const hasActive = group.items.some((i) => i.id === activeId)

  return (
    <div className="mb-sm">
      {/* Group header */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-md py-sm text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            color: hasActive ? 'var(--bf-accent)' : 'rgba(242,248,255,0.4)',
            letterSpacing: '0.1em',
          }}
        >
          // {group.chapter} · {group.title}
        </span>
        <ChevronRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform"
          style={{
            color: 'rgba(242,248,255,0.3)',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
          }}
        />
      </button>

      {/* Items */}
      {isOpen && (
        <ul className="pb-sm">
          {group.items.map((item) => {
            const isActive = item.id === activeId
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={cn(
                    'w-full text-left px-md py-sm text-sm transition-colors',
                    'pl-[calc(var(--bf-space-md)+12px)]'
                  )}
                  style={{
                    color: isActive ? 'var(--bf-accent)' : 'rgba(242,248,255,0.65)',
                    borderLeft: isActive ? '2px solid var(--bf-accent)' : '2px solid transparent',
                    paddingLeft: isActive ? 'calc(var(--bf-space-md) + 10px)' : 'calc(var(--bf-space-md) + 12px)',
                  }}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
