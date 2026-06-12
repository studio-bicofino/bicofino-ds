'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLang } from '@/content/index'

const STORAGE_KEY = 'bf-notice'
/* Espera a intro de marca (~1s) + a primeira leva da cascata do hero
   antes de aparecer — o aviso nunca compete com a abertura. */
const APPEAR_DELAY_MS = 2400

export function PrivacyNotice() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      /* storage indisponível → mostra o aviso, sem persistir */
    }
    if (seen) return
    const id = window.setTimeout(() => setVisible(true), APPEAR_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* sem storage, o aviso só some nesta visita */
    }
    setVisible(false)
  }

  const mono: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 12,
    lineHeight: 1.6,
    letterSpacing: '0.02em',
    color: 'var(--bf-text-secondary)',
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="status"
          aria-label={t('notice.label')}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            /* contraponto do Header: barra full-bleed na base, mesmo fundo,
               conteúdo no mesmo container 1280/padding-lg */
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 90,
            background: 'var(--bf-bg-page)',
            borderTop: '1px solid var(--bf-border)',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              marginInline: 'auto',
              paddingInline: 'var(--bf-space-lg)',
              paddingBlock: 'var(--bf-space-md)',
              minHeight: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--bf-space-md)',
              flexWrap: 'wrap',
            }}
          >
          <p style={{ ...mono, flex: '1 1 280px', margin: 0 }}>
            {t('notice.text')}{' '}
            <a
              href="/cookies"
              style={{
                color: 'var(--bf-text-primary)',
                textDecorationThickness: 1,
                textUnderlineOffset: 3,
              }}
            >
              {t('notice.link')}
            </a>
          </p>
          <button
            onClick={dismiss}
            style={{
              ...mono,
              color: 'var(--bf-text-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'none',
              border: '1px solid var(--bf-border-strong)',
              borderRadius: 'var(--bf-radius-sm)',
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'border-color 200ms ease-out, color 200ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--bf-text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--bf-border-strong)'
            }}
          >
            {t('notice.cta')}
          </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
