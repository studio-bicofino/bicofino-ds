'use client'

import { useState } from 'react'
import BrandSystem from '@/components/sections/BrandSystem'
import VisualSystem from '@/components/sections/VisualSystem'
import ComponentsGallery from '@/components/sections/ComponentsGallery'
import Verticais from '@/components/sections/Verticais'
import Assets from '@/components/sections/Assets'
import Operacoes from '@/components/sections/Operacoes'
import Governanca from '@/components/sections/Governanca'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { NAV } from '@/config/navigation'
import { useLang, type Lang, type ContentKey } from '@/content/index'
import { useTheme } from '@/providers/ThemeProvider'
import { Moon, Sun, Globe, ArrowRight } from 'lucide-react'

/* ─── Desktop top bar ─── */
function DesktopTopBar() {
  const { theme, toggle } = useTheme()
  const { lang, setLang, t } = useLang()
  const langs: Lang[] = ['br', 'en', 'it']

  return (
    <div
      className="hidden lg:flex items-center justify-end gap-md px-lg py-sm shrink-0"
      style={{
        height: 48,
        borderBottom: '1px solid var(--bf-border)',
        background: 'var(--bf-bg-page)',
      }}
    >
      <div className="flex items-center gap-sm">
        <Globe size={14} strokeWidth={1.5} style={{ color: 'var(--bf-text-subtle)' }} />
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="text-xs px-sm py-[2px] rounded-sm uppercase tracking-wider transition-colors"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              color: lang === l ? 'var(--bf-accent)' : 'var(--bf-text-subtle)',
              background: lang === l ? 'rgba(191,163,122,0.1)' : 'transparent',
            }}
            aria-pressed={lang === l}
          >
            {l === 'br' ? 'PT' : l.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        onClick={toggle}
        className="p-sm rounded-sm transition-colors"
        style={{ color: 'var(--bf-text-subtle)' }}
        aria-label={t('ui.theme.toggle')}
      >
        {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </button>
    </div>
  )
}

/* ─── Overview hero ─── */
function OverviewSection() {
  const { t } = useLang()

  return (
    <section
      id="overview"
      className="px-lg py-[64px]"
      style={{
        background: 'var(--bf-surface)',
        borderBottom: '1px solid var(--bf-border)',
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <p
          className="text-xs uppercase tracking-widest mb-md"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            color: 'var(--bf-accent)',
            letterSpacing: '0.14em',
          }}
        >
          {t('overview.eyebrow')}
        </p>
        <h1
          className="font-semibold mb-md"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 1.1,
            color: 'var(--bf-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {t('overview.heading')}
        </h1>
        <p
          className="mb-lg"
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--bf-text-secondary)',
            maxWidth: 560,
          }}
        >
          {t('overview.intro')}
        </p>

        {/* Chapter map */}
        <div
          className="grid gap-md"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))' }}
        >
          {NAV.map((group) => (
            <button
              key={group.id}
              onClick={() => {
                const first = group.items[0]
                if (first) document.getElementById(first.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-left p-md rounded-md border transition-all"
              style={{
                background: 'var(--bf-bg-page)',
                borderColor: 'var(--bf-border)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--bf-accent)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--bf-border)'
              }}
            >
              <span
                className="block text-xs mb-sm"
                style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--bf-accent)' }}
              >
                // {group.chapter}
              </span>
              <span
                className="block text-sm font-medium mb-sm"
                style={{ color: 'var(--bf-text-primary)' }}
              >
                {group.title}
              </span>
              <span
                className="flex items-center gap-sm text-xs"
                style={{ color: 'var(--bf-text-subtle)', fontFamily: 'var(--font-jetbrains)' }}
              >
                {group.items.length} seções
                <ArrowRight size={12} strokeWidth={1.5} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Placeholder section ─── */
function PlaceholderSection({
  id,
  eyebrow,
  heading,
  intro,
}: {
  id: string
  eyebrow: string
  heading: string
  intro: string
}) {
  return (
    <section
      id={id}
      className="px-lg py-[64px]"
      style={{ borderBottom: '1px solid var(--bf-border)' }}
    >
      <div style={{ maxWidth: 720 }}>
        <p
          className="text-xs uppercase tracking-widest mb-md"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            color: 'var(--bf-accent)',
            letterSpacing: '0.14em',
          }}
        >
          {eyebrow}
        </p>
        <h2
          className="font-semibold mb-md"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: 1.15,
            color: 'var(--bf-text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: 'var(--bf-text-secondary)',
            maxWidth: 560,
          }}
        >
          {intro}
        </p>

        <div
          className="mt-lg inline-flex items-center gap-sm px-md py-sm rounded-md"
          style={{
            background: 'var(--bf-surface)',
            border: '1px solid var(--bf-border)',
          }}
        >
          <span
            className="text-xs"
            style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--bf-text-subtle)' }}
          >
            // WORK IN PROGRESS
          </span>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { t } = useLang()

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--bf-bg-page)] focus:text-[var(--bf-text-primary)] focus:border focus:border-[var(--bf-border)] focus:rounded-[var(--bf-radius-md)] focus:outline-none"
      >
        {t('skip_to_content')}
      </a>
      <Header onMenuOpen={() => setSidebarOpen(true)} />

      <div className="flex flex-1 min-h-0">
        <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex flex-col flex-1 min-w-0">
          <DesktopTopBar />

          <main id="main-content" className="flex-1">
            <OverviewSection />

            <BrandSystem />

            <VisualSystem />

            <ComponentsGallery />

            <Verticais />

            <Assets />

            <Operacoes />

            <Governanca />

            {NAV.flatMap((group) =>
              group.items
                .filter((item) => ![
                  'fundamentos', 'posicionamento', 'nucleo', 'verbal',
                  'colors', 'typography', 'spacing-motion', 'logo', 'voice-tone',
                  'buttons', 'cards', 'charts', 'forms', 'badges', 'feedback',
                  'on-field', 'off-field',
                  'performance', 'sponsors', 'icons',
                  'arquitetura', 'delivery',
                  'ownership', 'resources',
                ].includes(item.id))
                .map((item) => (
                  <PlaceholderSection
                    key={item.id}
                    id={item.id}
                    eyebrow={t(`${item.id}.eyebrow` as Parameters<typeof t>[0])}
                    heading={t(`${item.id}.heading` as Parameters<typeof t>[0])}
                    intro={t(`${item.id}.intro` as Parameters<typeof t>[0])}
                  />
                ))
            )}

            <footer
              className="px-lg py-lg"
              style={{ borderTop: '1px solid var(--bf-border)' }}
            >
              <p
                className="text-xs"
                style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--bf-text-subtle)' }}
              >
                // BICOFINO DESIGN STUDIO — {new Date().getFullYear()}
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
