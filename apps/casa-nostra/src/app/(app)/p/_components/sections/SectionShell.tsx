'use client'

import type { CSSProperties, ReactNode } from 'react'

/**
 * SectionShell — card editorial branco usado por todas as 9 seções do PersonForm.
 * Header: eyebrow mono + título Inter; subtítulo opcional; grid de campos
 * customizável pelo caller via `children`.
 */

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
  /** override do grid interno (default: 1fr 1fr) */
  gridStyle?: CSSProperties
}

export function SectionShell({ eyebrow, title, subtitle, children, gridStyle }: Props) {
  // Extract custom cols if provided via gridStyle, else default 2-col on desktop.
  const cols = (gridStyle?.gridTemplateColumns as string | undefined) ?? undefined
  const restGridStyle: CSSProperties = { ...gridStyle }
  delete (restGridStyle as { gridTemplateColumns?: string }).gridTemplateColumns

  return (
    <section className="cn-section-shell">
      <header style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span
          className="mono"
          style={{
            fontSize: 10,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--bf-text-secondary)',
          }}
        >
          {eyebrow}
        </span>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: 'var(--bf-text-primary)',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            style={{
              fontSize: 13,
              color: 'var(--bf-text-secondary)',
              lineHeight: 1.5,
              maxWidth: '70ch',
              marginTop: 2,
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </header>

      <div
        className="cn-section-grid"
        style={
          {
            ...(cols ? ({ '--section-cols': cols } as React.CSSProperties) : {}),
            ...restGridStyle,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </section>
  )
}

/** Wrapper para forçar um campo a ocupar a linha inteira do grid. */
export function FullRow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ gridColumn: '1 / -1', ...style }}>{children}</div>
}
