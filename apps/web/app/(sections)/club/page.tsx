'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/content/index'

/* Paleta Club-local (sanção Woney 11/06) — identidade própria da área de
   membros, como o --bf-accent é local do apps/web. NÃO propagar pro DS.
   Esquema claro: fundo crema, logo/textos navy. */
const NAVY = '#05185c'
const CREMA = '#f3ebd4'
const NAVY_SOFT = 'rgba(5, 24, 92, 0.45)'

export default function ClubPage() {
  const { t } = useLang()
  const [access, setAccess] = useState('')
  const [password, setPassword] = useState('')

  const inputStyle: React.CSSProperties = {
    width: 280,
    display: 'block',
    background: 'transparent',
    border: `1px solid ${NAVY_SOFT}`,
    color: NAVY,
    padding: '12px var(--bf-space-md)',
    borderRadius: 'var(--bf-radius-md)',
    fontFamily: '"Inter", ui-sans-serif, sans-serif',
    fontSize: 14,
    outline: 'none',
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: CREMA,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <style>{`
        .club-input::placeholder { color: ${NAVY_SOFT}; }
      `}</style>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--bf-space-lg)',
      }}>
        <img
          src="/club/club-logo-fox.svg"
          alt="Bicofino Club"
          style={{ width: 280, height: 'auto', marginBottom: 'calc(var(--bf-space-lg) * 2)' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bf-space-md)', width: 280 }}>
          <input
            type="text"
            className="club-input"
            placeholder={t('club.access')}
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = NAVY }}
            onBlur={(e) => { e.currentTarget.style.borderColor = NAVY_SOFT }}
          />
          <input
            type="password"
            className="club-input"
            placeholder={t('club.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = NAVY }}
            onBlur={(e) => { e.currentTarget.style.borderColor = NAVY_SOFT }}
          />
        </div>

        <button
          type="button"
          style={{
            marginTop: 'var(--bf-space-md)',
            width: 280,
            height: 44,
            background: NAVY,
            color: CREMA,
            fontFamily: '"Inter", ui-sans-serif, sans-serif',
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.02em',
            border: 'none',
            borderRadius: 'var(--bf-radius-md)',
            cursor: 'pointer',
          }}
        >
          {t('club.enter')}
        </button>

        <p style={{
          marginTop: 'var(--bf-space-lg)',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: NAVY_SOFT,
        }}>
          {t('club.members')}
        </p>
      </div>

      <Link
        href="/"
        style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11,
          letterSpacing: '0.08em',
          color: NAVY_SOFT,
          textDecoration: 'none',
          transition: 'color 200ms ease-out',
          paddingBottom: 'var(--bf-space-lg)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = NAVY }}
        onMouseLeave={(e) => { e.currentTarget.style.color = NAVY_SOFT }}
      >
        {t('club.back')}
      </Link>
    </div>
  )
}
