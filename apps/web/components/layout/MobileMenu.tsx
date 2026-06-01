'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useLang } from '@/content/index'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { key: 'nav.on-field',   href: '/on-pitch'   },
  { key: 'nav.off-field',  href: '/off-pitch'  },
  { key: 'nav.foundation', href: '/foundation' },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLang()
  const shouldReduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Focus trap & ESC
  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last?.focus() }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first?.focus() }
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <>
      <style>{`.bf-close-btn:focus-visible{outline:2px solid var(--bf-accent);outline-offset:4px;border-radius:var(--bf-radius-sm)}.bf-mobile-nav-link:active{opacity:0.65;transition:none}`}</style>
      <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.18, ease: 'easeOut' }}
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
            ref={panelRef}
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ y: shouldReduce ? 0 : '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: shouldReduce ? 0 : '-100%' }}
            transition={{ duration: shouldReduce ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
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
              className="bf-close-btn"
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--bf-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                padding: 12,
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
                    delay: shouldReduce ? 0 : i * 0.04,
                    duration: shouldReduce ? 0 : 0.24,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className="bf-mobile-nav-link"
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
    </>
  )
}
