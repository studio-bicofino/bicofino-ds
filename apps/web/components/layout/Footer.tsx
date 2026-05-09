'use client'

import React, { useState } from 'react'
import { MapPin, Instagram } from 'lucide-react'
import { useLang } from '@/content/index'
import type { Lang } from '@/content/index'

export function Footer() {
  const { t, lang, setLang } = useLang()
  const [clubHover, setClubHover] = useState(false)

  const langs: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'it', label: 'IT' },
    { code: 'br', label: 'BR' },
  ]

  const monoStyle: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 12,
    letterSpacing: '0.04em',
    color: 'var(--bf-text-secondary)',
  }

  return (
    <footer
      style={{
        background: 'var(--bf-surface)',
        borderTop: '1px solid var(--bf-border)',
      }}
    >
      {/* Row 1 */}
      <div
        style={{
          maxWidth: 1280,
          marginInline: 'auto',
          paddingInline: 'var(--bf-space-lg)',
          paddingBlock: 'var(--bf-space-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--bf-space-md)',
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--bf-border)',
        }}
      >
        {/* Address */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MapPin
            size={14}
            strokeWidth={1.5}
            style={{ color: 'var(--bf-text-subtle)', flexShrink: 0 }}
            aria-hidden="true"
          />
          <span style={monoStyle}>{t('footer.address')}</span>
        </div>

        {/* Club */}
        <a
          href="#"
          aria-label={t('footer.club.label')}
          onMouseEnter={() => setClubHover(true)}
          onMouseLeave={() => setClubHover(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            ...monoStyle,
            color: clubHover ? 'var(--bf-accent)' : 'var(--bf-text-secondary)',
            transition: 'color 180ms ease-out',
          }}
        >
          <span style={{ letterSpacing: '0.08em' }}>{t('footer.club')}</span>
          {/* icon-club.svg — inline fallback until file is uploaded */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/icon-club.svg"
            alt=""
            aria-hidden="true"
            width={14}
            height={14}
            style={{
              transform: clubHover ? 'rotate(8deg)' : 'rotate(0deg)',
              transition: 'transform 200ms ease-out',
            }}
          />
        </a>
      </div>

      {/* Row 2 */}
      <div
        style={{
          maxWidth: 1280,
          marginInline: 'auto',
          paddingInline: 'var(--bf-space-lg)',
          paddingBlock: 'var(--bf-space-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--bf-space-md)',
          flexWrap: 'wrap',
        }}
      >
        {/* Left: diamond + email + instagram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bf-space-md)' }}>
          {/* Diamond icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/icon-diamond-bicofino.svg"
            alt="Bicofino diamond"
            width={14}
            height={14}
            aria-hidden="true"
          />

          <a
            href={`mailto:${t('footer.email')}`}
            style={{
              ...monoStyle,
              transition: 'color 180ms ease-out',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bf-text-primary)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--bf-text-secondary)' }}
          >
            {t('footer.email')}
          </a>

          <a
            href="https://instagram.com/bicofino"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('footer.instagram.label')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              ...monoStyle,
              transition: 'color 180ms ease-out',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bf-text-primary)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--bf-text-secondary)' }}
          >
            <Instagram size={12} strokeWidth={1.5} aria-hidden="true" />
            {t('footer.instagram')}
          </a>
        </div>

        {/* Right: copyright + lang switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bf-space-lg)' }}>
          <span style={monoStyle}>{t('footer.copyright')}</span>

          {/* Language switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            role="group"
            aria-label="Selecionar idioma"
          >
            {langs.map(({ code, label }, i) => (
              <React.Fragment key={code}>
                {i > 0 && (
                  <span style={{ ...monoStyle, opacity: 0.4 }}>•</span>
                )}
                <button
                  onClick={() => setLang(code)}
                  aria-label={`Mudar para ${label}`}
                  aria-pressed={lang === code}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 4px',
                    ...monoStyle,
                    color: lang === code
                      ? 'var(--bf-text-primary)'
                      : 'var(--bf-text-secondary)',
                    fontWeight: lang === code ? 500 : 400,
                    transition: 'color 150ms ease-out',
                  }}
                >
                  {label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
