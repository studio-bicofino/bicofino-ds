'use client'

import React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useLang } from '@/content/index'

interface HeaderProps {
  onMenuOpen: () => void
}

export function Header({ onMenuOpen }: HeaderProps) {
  const { t } = useLang()

  const navLinks = [
    { key: 'nav.foundation', href: '/foundation' },
    { key: 'nav.off-field',  href: '/off-field'  },
    { key: 'nav.on-field',   href: '/on-field'   },
  ]

  return (
    <header
      style={{
        background: 'var(--bf-bg-page)',
        borderBottom: '1px solid var(--bf-border)',
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-bicofino.svg"
            alt="Bicofino"
            style={{ height: 24, width: 'auto' }}
          />
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
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 12,
                letterSpacing: '0.04em',
                color: 'var(--bf-text-secondary)',
                transition: 'color 180ms ease-out',
                textTransform: 'lowercase',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--bf-text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--bf-text-secondary)'
              }}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="bf-web-nav-mobile"
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
            padding: 4,
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
      `}</style>
    </header>
  )
}
