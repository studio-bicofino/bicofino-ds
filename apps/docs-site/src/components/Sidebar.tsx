'use client'

import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { BicofinoLogo } from './BicofinoLogo'
import { useLang } from '@/content'

const C = {
  bg:          'var(--bf-sidebar-bg)',
  text:        'var(--bf-sidebar-text)',
  muted:       'var(--bf-sidebar-muted)',
  subtle:      'var(--bf-sidebar-subtle)',
  active:      'var(--current-accent)',
  hover:       'var(--bf-sidebar-hover)',
  divider:     'var(--bf-sidebar-divider)',
  headerBg:    'rgba(242,248,255,0.06)',
}

const sans = '"Inter", sans-serif'
const mono = '"JetBrains Mono", monospace'

function buildNav(t: (k: string) => string) {
  return [
    {
      group: '// 01 • BRAND SYSTEM',
      items: [
        { label: t('nav.bs.cover'),         href: '#brand-system' },
        { label: t('nav.indice'),           href: '#brand-indice' },
        { label: t('nav.fundamentos'),      href: '#brand-fundamentos' },
        { label: t('nav.posicionamento'),   href: '#brand-posicionamento' },
        { label: t('nav.nucleo'),           href: '#brand-nucleo' },
        { label: t('nav.verbal'),           href: '#brand-verbal' },
      ],
    },
    {
      group: '// 02 • DESIGN SYSTEM',
      items: [
        { label: t('nav.universo'),   href: '#overview' },
        { label: t('nav.colors'),     href: '#colors' },
        { label: t('nav.typography'), href: '#typography' },
        { label: t('nav.slash'),      href: '#slash-heading' },
        { label: t('nav.spacing'),    href: '#spacing-motion' },
      ],
    },
    {
      group: '// 03 • BRAND',
      items: [
        { label: t('nav.logo'),   href: '#logotipo' },
        { label: t('nav.voice'),  href: '#voice-tone' },
      ],
    },
    {
      group: '// 04 • COMPONENTES',
      items: [
        { label: t('nav.buttons'), href: '#buttons' },
        { label: t('nav.badges'),  href: '#badges' },
        { label: t('nav.forms'),   href: '#forms' },
        { label: t('nav.cards'),   href: '#cards' },
      ],
    },
    {
      group: '// 05 • VERTICAIS',
      items: [
        { label: t('nav.verticais'),    href: '#verticais' },
        { label: t('nav.onfield.img'),  href: '#on-field' },
      ],
    },
    {
      group: '// 06 • ASSETS',
      items: [
        { label: t('nav.performance'), href: '#performance-intelligence' },
        { label: t('nav.sponsors'),    href: '#sponsors' },
        { label: t('nav.icons'),       href: '#icons' },
      ],
    },
    {
      group: '// 07 • OPERAÇÕES',
      items: [
        { label: t('nav.operacoes'), href: '#ops-arch' },
        { label: t('nav.delivery'),  href: '#ops-delivery' },
      ],
    },
    {
      group: '// 08 • GOVERNANÇA',
      items: [
        { label: t('nav.governance'), href: '#governance' },
        { label: t('nav.resources'),  href: '#resources' },
      ],
    },
  ]
}

function groupForHref(nav: ReturnType<typeof buildNav>, href: string): string | null {
  for (const section of nav) {
    if (section.items.some(item => item.href === href)) return section.group
  }
  return null
}

interface SidebarProps {
  onNavClick?: () => void
}

export default function Sidebar({ onNavClick }: SidebarProps = {}) {
  const { t } = useLang()
  const [active, setActive] = useState('#overview')
  const [hovered, setHovered] = useState<string | null>(null)

  const nav = buildNav(t)

  // Single open section — null means all collapsed
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Derive initial open section from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const group = groupForHref(nav, hash)
      setOpenSection(group)
      setActive(hash)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-open (and exclusively open) the section as scroll changes active item
  useEffect(() => {
    const group = groupForHref(nav, active)
    if (group) setOpenSection(group)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

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

  function toggleSection(group: string) {
    setOpenSection(prev => prev === group ? null : group)
  }

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
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            onNavClick?.()
            requestAnimationFrame(() => {
              document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' })
            })
          }}
          style={{ display: 'block', lineHeight: 0, cursor: 'pointer' }}
          aria-label="Voltar ao início"
        >
          <BicofinoLogo color={C.text} width={120} />
        </a>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {(['// Brand System', '// v1.0 • maio 2026', '// São Paulo • BR'] as const).map(line => (
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
        {nav.map(({ group, items }) => {
          const isOpen = openSection === group
          return (
            <div key={group} style={{ marginBottom: 6 }}>
              <button
                onClick={() => toggleSection(group)}
                aria-expanded={isOpen}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontFamily: mono,
                  fontSize: 9,
                  letterSpacing: '0.08em',
                  color: C.text,
                  margin: 0,
                  padding: '12px 24px 4px',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                  background: C.headerBg,
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {group}
                <ChevronRight
                  size={10}
                  strokeWidth={1.5}
                  style={{
                    flexShrink: 0,
                    marginLeft: 4,
                    transition: 'transform 150ms ease-out',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '400px' : '0px',
                  transition: 'max-height 180ms ease-out',
                }}
              >
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
                        onNavClick?.()
                        setActive(href)
                        requestAnimationFrame(() => {
                          const el = document.getElementById(href.slice(1))
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                      }}
                      style={{
                        display: 'block',
                        padding: '7px 24px 7px 22px',
                        fontSize: 12,
                        fontFamily: sans,
                        lineHeight: 1.45,
                        letterSpacing: 0,
                        color: isActive ? C.text : isHovered ? 'var(--bf-sidebar-text-hover)' : C.muted,
                        textDecoration: 'none',
                        borderLeft: isActive ? `2px solid ${C.active}` : '2px solid transparent',
                        background: isHovered && !isActive ? C.hover : 'transparent',
                        transition: 'color 150ms cubic-bezier(0.2,0,0,1), background 150ms cubic-bezier(0.2,0,0,1)',
                      }}
                    >
                      {label}
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      {/* Sidebar footer — editorial only */}
      <div style={{ borderTop: `1px solid ${C.divider}`, padding: '14px 24px' }}>
        <p style={{ fontFamily: mono, fontSize: 9, color: C.muted, margin: 0, letterSpacing: '0.06em' }}>
          // unlike any other.
        </p>
      </div>
    </aside>
  )
}
