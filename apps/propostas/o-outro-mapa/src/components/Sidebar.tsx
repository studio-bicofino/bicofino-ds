'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { BicofinoLogo } from './BicofinoLogo'

/* ─── tokens ─── */
const C = {
  bg:       'var(--bf-sidebar-bg)',
  text:     'var(--bf-sidebar-text)',
  muted:    'var(--bf-sidebar-muted)',
  subtle:   'var(--bf-sidebar-subtle)',
  hover:    'var(--bf-sidebar-hover)',
  divider:  'var(--bf-sidebar-divider)',
  headerBg: 'var(--bf-sidebar-header-bg)',
  accent:   'var(--current-accent)',
}
const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'

const NAV = [
  { label: 'O Outro Mapa',   href: '#hero' },
  { label: 'A Tese',         href: '#tese' },
  { label: 'O Mapa',         href: '#mapa' },
  { label: 'Contexto',       href: '#contexto' },
  { label: 'Os Tiers',       href: '#tiers' },
  { label: 'Pacote',         href: '#pacote' },
  { label: 'Entregáveis',    href: '#entregaveis' },
  { label: 'Garantias',      href: '#garantias' },
  { label: 'Investimento',   href: '#investimento' },
  { label: 'Próximo Passo',  href: '#proximo-passo' },
]

interface SidebarInnerProps {
  active: string
  setActive: (href: string) => void
  onNavClick?: () => void
}

function SidebarInner({ active, setActive, onNavClick }: SidebarInnerProps) {
  return (
    <div
      className="bf-sidebar"
      style={{
        width: 204,
        minWidth: 204,
        background: C.bg,
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: `1px solid ${C.divider}`,
      }}
    >
      {/* Logo / Header */}
      <div style={{
        padding: '28px 20px 20px',
        borderBottom: `1px solid ${C.divider}`,
      }}>
        <BicofinoLogo color={C.text} width={100} />
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: C.text, margin: 0 }}>
            O Outro Mapa
          </p>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.subtle, margin: 0, textTransform: 'uppercase' }}>
            ✦ Proposta Confidencial
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 0', flex: 1 }}>
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.subtle, textTransform: 'uppercase', padding: '8px 16px 6px' }}>
          // 01 • PROPOSTA
        </p>
        {NAV.map((item) => {
          const isActive = active === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                onNavClick?.()
                setActive(item.href)
                requestAnimationFrame(() => {
                  const el = document.getElementById(item.href.slice(1))
                  if (!el) return
                  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
                })
              }}
              style={{
                display: 'block',
                padding: '6px 16px',
                fontFamily: sans,
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? C.accent : C.muted,
                background: isActive ? `rgba(191,163,122,0.08)` : 'transparent',
                borderLeft: isActive ? `2px solid ${C.accent}` : '2px solid transparent',
                transition: 'all 150ms ease-out',
                cursor: 'pointer',
                lineHeight: 1.4,
              }}
            >
              {item.label}
            </a>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px 20px', borderTop: `1px solid ${C.divider}` }}>
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.subtle, textTransform: 'uppercase' }}>
          v1.0 — mai 2026
        </p>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const ids = NAV.map(n => n.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActive('#' + visible[0].target.id)
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return <SidebarInner active={active} setActive={setActive} />
}

export function MobileTopbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const ids = NAV.map(n => n.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActive('#' + visible[0].target.id)
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="bf-mobile-topbar">
        <button className="bf-hamburger-btn" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <Menu size={20} strokeWidth={1.5} />
        </button>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: 'var(--bf-text-secondary)', textTransform: 'uppercase', marginLeft: 12 }}>
          O Outro Mapa
        </p>
      </div>
      <div className={`bf-drawer-overlay${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} />
      <div className={`bf-drawer${open ? ' is-open' : ''}`}>
        <button className="bf-drawer-close" onClick={() => setOpen(false)} aria-label="Fechar menu">
          <X size={20} strokeWidth={1.5} />
        </button>
        <SidebarInner active={active} setActive={setActive} onNavClick={() => setOpen(false)} />
      </div>
    </>
  )
}
