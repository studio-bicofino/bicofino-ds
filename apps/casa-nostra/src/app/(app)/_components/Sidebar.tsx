'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Settings,
  Menu,
  X,
  IdCard,
  Plus,
  Tags,
  type LucideIcon,
} from 'lucide-react'
import { LogoutButton } from '@/components/LogoutButton'
import { BicofinoLogo } from '@/components/BicofinoLogo'

type Props = {
  email: string
}

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  isNew?: boolean
}

type NavGroup = { kind: 'group'; items: NavItem[] }
type NavDivider = { kind: 'divider' }
type NavSection = NavGroup | NavDivider

const SECTIONS: NavSection[] = [
  {
    kind: 'group',
    items: [
      { href: '/membros', label: 'Membros', icon: IdCard, isNew: true },
      { href: '/cadastro', label: 'Cadastrar', icon: Plus, isNew: true },
      { href: '/grupos', label: 'Grupos', icon: Tags },
    ],
  },
  { kind: 'divider' },
  {
    kind: 'group',
    items: [{ href: '/configuracoes', label: 'Configurações', icon: Settings }],
  },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

function SidebarInner({ email, onLinkClick }: { email: string; onLinkClick?: () => void }) {
  const pathname = usePathname()

  return (
    <div
      style={{
        height: '100%',
        padding: '32px 28px',
        background: 'var(--bf-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <div style={{ color: 'var(--bf-text-primary)', display: 'flex', alignItems: 'center' }}>
        <BicofinoLogo height={22} />
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {SECTIONS.map((section, idx) => {
          if (section.kind === 'divider') {
            return (
              <div
                key={`div-${idx}`}
                aria-hidden
                style={{
                  height: 1,
                  background: 'var(--bf-border)',
                  margin: '8px 0',
                }}
              />
            )
          }
          return (
            <div key={`grp-${idx}`} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.items.map((item) => {
                const active = isActive(pathname, item.href)
                const Icon = item.icon
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onLinkClick}
                    className="cn-nav-item"
                    data-active={active ? 'true' : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={20} strokeWidth={1.5} aria-hidden className="cn-nav-icon" />
                    <span>{item.label}</span>
                    {item.isNew && (
                      <span
                        className="mono"
                        aria-label="novo"
                        style={{
                          fontSize: 9,
                          opacity: 0.6,
                          color: 'var(--bf-cn-napoli)',
                          marginLeft: 8,
                          letterSpacing: '0.08em',
                          textTransform: 'lowercase',
                        }}
                      >
                        • novo
                      </span>
                    )}
                  </a>
                )
              })}
            </div>
          )
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p
          className="mono"
          style={{
            fontSize: 10,
            color: 'var(--bf-text-secondary)',
            letterSpacing: '0.04em',
            wordBreak: 'break-all',
          }}
        >
          {email}
        </p>
        <LogoutButton />
      </div>
    </div>
  )
}

export function Sidebar({ email }: Props) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  // ESC fecha drawer
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  // Trava scroll do body quando drawer aberto
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Header mobile (<1024px) */}
      <header
        className="cn-mobile-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          height: 56,
          padding: '0 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          background: 'var(--bf-surface)',
          borderBottom: '1px solid var(--bf-border)',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={open}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            background: 'transparent',
            border: 'none',
            color: 'var(--bf-text-primary)',
            cursor: 'pointer',
            borderRadius: 8,
            padding: 0,
          }}
        >
          <Menu size={20} strokeWidth={1.5} aria-hidden />
        </button>

        <span
          className="mono"
          style={{
            flex: 1,
            minWidth: 0,
            textAlign: 'center',
            fontSize: 9.5,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--bf-text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Casa Nostra <span style={{ opacity: 0.5 }}>//</span> Bicofino
        </span>

        {/* spacer pra centralizar o título */}
        <span style={{ width: 40, height: 40, flexShrink: 0 }} aria-hidden />
      </header>

      {/* Sidebar estática (>=1024px) */}
      <aside
        className="cn-sidebar-static"
        style={{
          borderRight: '1px solid var(--bf-border)',
          background: 'var(--bf-surface)',
        }}
      >
        <SidebarInner email={email} />
      </aside>

      {/* Drawer mobile (<1024px) */}
      <AnimatePresence>
        {open && (
          <div className="cn-drawer-portal">
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={close}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(51,17,26,0.4)',
                zIndex: 40,
              }}
            />
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '100%',
                maxWidth: 320,
                zIndex: 50,
                borderRight: '1px solid var(--bf-border)',
                background: 'var(--bf-surface)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '12px 12px 0',
                }}
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar menu"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--bf-text-primary)',
                    cursor: 'pointer',
                    borderRadius: 8,
                    padding: 0,
                  }}
                >
                  <X size={20} strokeWidth={1.5} aria-hidden />
                </button>
              </div>
              <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
                <SidebarInner email={email} onLinkClick={close} />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
