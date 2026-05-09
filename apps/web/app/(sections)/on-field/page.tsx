'use client'

import React from 'react'
import Link from 'next/link'
import { useLang } from '@/content/index'

export default function OnFieldPage() {
  const { t } = useLang()
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--bf-space-md)',
        padding: 'var(--bf-space-lg)',
        background: 'var(--bf-bg-page)',
      }}
    >
      <p
        style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-secondary)',
        }}
      >
        {t('on-field.title')}
      </p>
      <p
        style={{
          fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
          fontSize: 40,
          fontWeight: 700,
          color: 'var(--bf-text-primary)',
          lineHeight: 1.1,
        }}
      >
        {t('section.soon')}
      </p>
      <p style={{ color: 'var(--bf-text-secondary)' }}>{t('section.soon.desc')}</p>
      <Link
        href="/"
        style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 12,
          color: 'var(--bf-accent)',
          marginTop: 'var(--bf-space-md)',
        }}
      >
        ← bicofino.com
      </Link>
    </main>
  )
}
