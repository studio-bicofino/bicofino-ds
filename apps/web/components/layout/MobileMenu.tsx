'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useLang } from '@/content/index'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { key: 'nav.on-field',   href: '/on-field'   },
  { key: 'nav.off-field',  href: '/off-field'  },
  { key: 'nav.foundation', href: '/foundation' },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLang()
  const closeRef = useRef<HTMLButtonElement>(null)

  // Focus trap & ESC
  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6, 16, 21, 0.5)',
              backdropFilter: 'blur(12px)',
              zIndex: 100,
            }}
            aria-hidden="true"
          />

          {/* Overlay panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 101,
              background: 'var(--bf-bg-page)',
              paddingBlock: 'var(--bf-space-lg)',
              paddingInline: 'var(--bf-space-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--bf-space-lg)',
            }}
          >
            {/* Close button */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t('nav.close.label')}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--bf-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                padding: 4,
                opacity: 0.7,
                transition: 'opacity 150ms ease-out',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Nav links */}
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--bf-space-md)',
                paddingBlock: 'var(--bf-space-lg)',
              }}
            >
              {navLinks.map(({ key, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.24,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    style={{
                      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
                      fontSize: 32,
                      fontWeight: 500,
                      color: 'var(--bf-text-primary)',
                      display: 'block',
                      transition: 'color 180ms ease-out',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bf-accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--bf-text-primary)' }}
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
