'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/content/index'
import { LogoBicofino } from '@/components/primitives/BrandIcons'

export default function ClubPage() {
  const { t } = useLang()
  const [access, setAccess] = useState('')
  const [password, setPassword] = useState('')

  const inputStyle: React.CSSProperties = {
    width: 280,
    display: 'block',
    background: 'transparent',
    border: '1px solid var(--bf-steel)',
    color: 'var(--bf-white)',
    padding: '12px var(--bf-space-md)',
    borderRadius: 'var(--bf-radius-md)',
    fontFamily: '"Inter", ui-sans-serif, sans-serif',
    fontSize: 14,
    outline: 'none',
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bf-power-black)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--bf-space-lg)',
      }}>
        <div style={{ marginBottom: 'calc(var(--bf-space-lg) * 2)', filter: 'brightness(0) invert(1)' }}>
          <LogoBicofino height={28} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bf-space-md)', width: 280 }}>
          <input
            type="text"
            placeholder={t('club.access')}
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--bf-white)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--bf-steel)' }}
          />
          <input
            type="password"
            placeholder={t('club.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--bf-white)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--bf-steel)' }}
          />
        </div>

        <button
          type="button"
          style={{
            marginTop: 'var(--bf-space-md)',
            width: 280,
            height: 44,
            background: 'var(--bf-white)',
            color: 'var(--bf-black)',
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

        <Link
          href="/"
          style={{
            marginTop: 'var(--bf-space-lg)',
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11,
            letterSpacing: '0.08em',
            color: 'var(--bf-steel)',
            textDecoration: 'none',
            transition: 'color 200ms ease-out',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bf-white)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--bf-steel)' }}
        >
          {t('club.back')}
        </Link>
      </div>

      <p style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--bf-steel)',
        paddingBottom: 'var(--bf-space-lg)',
      }}>
        {t('club.members')}
      </p>
    </div>
  )
}
