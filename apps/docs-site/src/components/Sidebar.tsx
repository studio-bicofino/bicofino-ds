'use client'

import { useState, useEffect } from 'react'
import { BicofinoLogo } from './BicofinoLogo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { useLang } from '@/content'

const C = {
  bg:      'var(--bf-sidebar-bg)',
  text:    '#f2f8ff',
  muted:   'var(--bf-sidebar-muted)',
  subtle:  '#a8c9e5',
  active:  'var(--current-accent)',
  hover:   'rgba(242,248,255,0.06)',
  divider: 'var(--bf-sidebar-divider)',
}

const sans = '"Inter", sans-serif'
const mono = '"JetBrains Mono", monospace'

function buildNav(t: (k: string) => string) {
  return [
    {
      group: '// 00 · Brand System',
      items: [
        { label: 'Brand System — Bicofino', href: '#brand-system' },
        { label: 'Índice',                  href: '#brand-indice' },
        { label: 'Fundamentos',             href: '#brand-fundamentos' },
        { label: 'Posicionamento',          href: '#brand-posicionamento' },
        { label: 'Núcleo da Marca',         href: '#brand-nucleo' },
        { label: 'Universo Verbal',         href: '#brand-verbal' },
      ],
    },
    {
      group: t('nav.group.foundations'),
      items: [
        { label: t('nav.overview'),    href: '#overview' },
        { label: t('nav.colors'),      href: '#colors' },
        { label: t('nav.typography'),  href: '#typography' },
        { label: t('nav.slash'),       href: '#slash-heading' },
        { label: t('nav.spacing'),     href: '#spacing-motion' },
      ],
    },
    {
      group: t('nav.group.brand'),
      items: [
        { label: t('nav.logo'),      href: '#logotipo' },
        { label: t('nav.voice'),     href: '#voice-tone' },
        { label: t('nav.verticais'), href: '#verticais' },
      ],
    },
    {
      group: t('nav.group.components'),
      items: [
        { label: t('nav.buttons'), href: '#buttons' },
        { label: t('nav.badges'),  href: '#badges' },
        { label: t('nav.forms'),   href: '#forms' },
        { label: t('nav.cards'),   href: '#cards' },
      ],
    },
    {
      group: '// 04 · On Field',
      items: [
        { label: 'Athlete Image System', href: '#on-field' },
      ],
    },
    {
      group: t('nav.group.performance'),
      items: [
        { label: t('nav.performance'), href: '#performance-intelligence' },
        { label: t('nav.icons'),       href: '#icons' },
      ],
    },
    {
      group: t('nav.group.governance'),
      items: [
        { label: t('nav.governance'), href: '#governance' },
        { label: t('nav.resources'),  href: '#resources' },
      ],
    },
  ]
}

export default function Sidebar() {
  const { t } = useLang()
  const [active, setActive] = useState('#overview')
  const [hovered, setHovered] = useState<string | null>(null)

  const nav = buildNav(t)

  useEffect(() => {
    const ids = nav.flatMap(s => s.items.map(i => i.href.slice(1)))
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <aside
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
      {/* Wordmark + meta */}
      <div style={{ padding: '36px 24px 28px' }}>
        <BicofinoLogo color={C.text} width={120} />
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {(['// Design System', t('sidebar.version'), t('sidebar.location')] as const).map(line => (
            <p key={line} style={{ fontFamily: mono, fontSize: 9, color: C.muted, margin: 0, letterSpacing: '0.06em' }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: C.divider, margin: '0 24px 20px' }} />

      {/* Navigation */}
      <nav style={{ flex: 1, paddingBottom: 40 }}>
        {nav.map(({ group, items }) => (
          <div key={group} style={{ marginBottom: 6 }}>
            <p style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.08em',
              color: C.muted,
              margin: '0 0 2px',
              padding: '12px 24px 4px',
              textTransform: 'uppercase' as const,
              lineHeight: 1.4,
            }}>
              {group}
            </p>
            {items.map(({ label, href }) => {
              const isActive = active === href
              const isHovered = hovered === href
              return (
                <a
                  key={href}
                  href={href}
                  onMouseEnter={() => setHovered(href)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(href)
                    const el = document.getElementById(href.slice(1))
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  style={{
                    display: 'block',
                    padding: '7px 24px 7px 22px',
                    fontSize: 13,
                    fontFamily: sans,
                    color: isActive ? C.text : isHovered ? 'rgba(242,248,255,0.75)' : C.subtle,
                    textDecoration: 'none',
                    borderLeft: isActive ? `2px solid ${C.active}` : '2px solid transparent',
                    background: isHovered && !isActive ? C.hover : 'transparent',
                    transition: 'color 150ms cubic-bezier(0.2,0,0,1), background 150ms cubic-bezier(0.2,0,0,1)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </a>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom bar with tagline + controls */}
      <div style={{ borderTop: `1px solid ${C.divider}`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: mono, fontSize: 9, color: C.muted, margin: 0, letterSpacing: '0.06em' }}>
          {t('sidebar.tagline')}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ThemeToggle />
          <span style={{ fontFamily: mono, fontSize: 8, color: 'rgba(242,248,255,0.18)', userSelect: 'none' }}>•</span>
          <LanguageSwitcher />
        </div>
      </div>
    </aside>
  )
}
