'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useLang } from '@/content/index'
import { LogoBicofino } from '@/components/primitives/BrandIcons'

interface HeaderProps {
  onMenuOpen: () => void
}

export function Header({ onMenuOpen }: HeaderProps) {
  const { t } = useLang()
  const pathname = usePathname()

  const navLinks = [
    { key: 'nav.on-field',   href: '/on-pitch'   },
    { key: 'nav.off-field',  href: '/off-pitch'  },
    { key: 'nav.foundation', href: '/foundation' },
  ]

  return (
    <header
      style={{
        background: 'var(--bf-bg-page)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          marginInline: 'auto',
          paddingInline: 'var(--bf-space-lg)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          aria-label="Bicofino — página inicial"
        >
          <LogoBicofino height={24} />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Navegação principal"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--bf-space-lg)',
          }}
          className="bf-web-nav-desktop"
        >
          {navLinks.map(({ key, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={key}
                href={href}
                className="bf-nav-link"
                aria-current={isActive ? 'page' : undefined}
                style={{
                  fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1.45,
                  letterSpacing: '0.04em',
                  color: isActive ? 'var(--bf-text-primary)' : 'var(--bf-text-secondary)',
                  transition: 'color 180ms ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--bf-text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive ? 'var(--bf-text-primary)' : 'var(--bf-text-secondary)'
                }}
              >
                {t(key)}
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="bf-web-nav-mobile bf-hamburger-btn"
          onClick={onMenuOpen}
          aria-label={t('nav.menu.label')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--bf-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            opacity: 0.7,
            transition: 'opacity 150ms ease-out',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .bf-web-nav-desktop { display: flex !important; }
          .bf-web-nav-mobile  { display: none !important; }
        }
        @media (max-width: 767px) {
          .bf-web-nav-desktop { display: none !important; }
          .bf-web-nav-mobile  { display: flex !important; }
        }
        .bf-nav-link:focus-visible,
        .bf-hamburger-btn:focus-visible {
          outline: 2px solid var(--bf-accent);
          outline-offset: 4px;
          border-radius: var(--bf-radius-sm);
        }
      `}</style>
    </header>
  )
}
