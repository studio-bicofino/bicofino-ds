'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from './Sidebar'
import { RevealObserver } from './RevealObserver'

export function SidebarController({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const el = document.getElementById('main-content')
    if (!el) return
    el.style.overflowY = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  function close() { setIsOpen(false) }

  return (
    <>
      {/* Desktop sidebar — hidden on mobile via CSS */}
      <div className="bf-sidebar-desktop-wrap">
        <Sidebar />
      </div>

      {/* Overlay backdrop */}
      <div
        className={`bf-drawer-overlay${isOpen ? ' is-open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className={`bf-drawer${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navegação"
        aria-hidden={!isOpen}
      >
        <button
          className="bf-drawer-close"
          onClick={close}
          aria-label="Fechar menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <Sidebar onNavClick={close} />
      </div>

      {/* Main content */}
      <div
        id="main-content"
        style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
      >
        {/* Mobile topbar — hamburger, hidden on desktop */}
        <div className="bf-mobile-topbar">
          <button
            className="bf-hamburger-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={isOpen}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>

        {children}
        <RevealObserver />
      </div>
    </>
  )
}
