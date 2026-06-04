'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BicofinoDiamond } from './BicofinoDiamond'

const LINKS = [
  { href: '/', label: 'Painel' },
  { href: '/sistemas', label: 'Sistemas' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/registrar', label: 'Registrar' },
  { href: '/fechamento', label: 'Fechamento' },
]

export function Nav() {
  const path = usePathname()
  return (
    <header className="no-print" style={{ borderBottom: 'var(--bf-hairline)', position: 'sticky', top: 0, zIndex: 50, background: 'color-mix(in srgb, var(--bf-bg-page) 88%, transparent)', backdropFilter: 'blur(8px)' }}>
      <div
        className="shell nav-inner"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--sp-8)' }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <span style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.05rem' }}>
            Woney Malian
          </span>
          <BicofinoDiamond size={16} color="var(--current-accent-ink)" />
          <span
            className="bf-mono nav-tag"
            style={{ fontSize: '0.75rem', color: 'var(--bf-text-subtle)', letterSpacing: '0.04em' }}
          >
            // Registro de Impacto
          </span>
        </Link>
        <nav className="nav-links" style={{ display: 'flex', gap: 'var(--sp-1)' }}>
          {LINKS.map((l) => {
            const active = l.href === '/' ? path === '/' : path.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: 'var(--bf-font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  padding: 'var(--sp-1) var(--sp-3)',
                  borderRadius: 'var(--bf-corner-2)',
                  color: active ? 'var(--bf-text-primary)' : 'var(--bf-text-subtle)',
                  background: active ? 'var(--bf-surface-subtle)' : 'transparent',
                  transition: 'color var(--dur-fast) var(--ease-standard)',
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
