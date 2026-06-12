'use client'

import React from 'react'
import { BicofinoLogo } from '@/components/BicofinoLogo'
import { useLang } from '@/content'
import { bsContent, type BsLang } from '@/content/brandSystemContent'

const toBsLang = (l: string): BsLang => l === 'en' ? 'en' : l === 'it' ? 'it' : 'br'

const C = {
  black:      'var(--bf-text-primary)',
  bg:         'var(--bf-bg-page)',
  white:      'var(--bf-surface)',
  steel:      'var(--bf-text-secondary)',
  platinum:   'var(--bf-text-subtle)',
  powerBlack: '#061015',
  aluminium:  '#e2eaf2',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 72
const MAX_W = 720

/* ─── Atoms ─── */

function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' as const }}>
      {children}
    </p>
  )
}

function BsHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ padding: `80px ${H_PAD}px 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance" style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
        {title}
      </h2>
      {sub && <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 600, fontFamily: sans }}>{sub}</p>}
    </div>
  )
}

function BsSub({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ padding: `56px ${H_PAD}px 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h2 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h2>
    </div>
  )
}

function H3({ children }: { children: string }) {
  return (
    <h3 className="text-balance" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: C.black, margin: '36px 0 14px', lineHeight: 1.2, fontFamily: sans }}>
      {children}
    </h3>
  )
}

function P({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  const { lang } = useLang()
  return (
    <p lang={lang === 'en' ? 'en' : lang === 'it' ? 'it' : 'pt-BR'} className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: muted ? C.steel : C.black, margin: '0 0 20px', fontFamily: sans, maxWidth: MAX_W }}>
      {children}
    </p>
  )
}

function GuardRail({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, margin: '12px 0 0', fontFamily: sans, borderLeft: `2px solid ${C.aluminium}`, paddingLeft: 16 }}>
      <strong style={{ color: C.black, fontWeight: 700 }}>Guard rail:</strong> {children}
    </p>
  )
}

function BulletList({ items }: { items: readonly React.ReactNode[] }) {
  return (
    <ul style={{ margin: '12px 0 20px', paddingLeft: 20, display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, lineHeight: 1.65, color: C.black, fontFamily: sans }}>{item}</li>
      ))}
    </ul>
  )
}

function Arrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, color: C.steel, margin: '8px 0 24px', fontFamily: sans, lineHeight: 1.65, paddingLeft: 16, borderLeft: `2px solid ${C.aluminium}` }}>
      {'→ '}<em>{children}</em>
    </p>
  )
}

function AccordionItem({ title, children, compact = false }: {
  title: React.ReactNode
  children: React.ReactNode
  compact?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const [hover, setHover] = React.useState(false)
  return (
    <div style={{ borderTop: hairline }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', padding: compact ? `14px ${H_PAD}px` : `20px ${H_PAD}px`,
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left' as const,
        }}
      >
        <span style={{
          display: 'inline-block',
          fontSize: compact ? 14 : 20,
          fontWeight: 700,
          letterSpacing: compact ? '-0.01em' : '-0.015em',
          color: hover ? C.steel : C.black,
          lineHeight: 1.2,
          fontFamily: sans,
          transform: hover ? 'translateX(6px)' : 'translateX(0)',
          transition: 'all 250ms ease-out',
        }}>
          {title}
        </span>
        <span style={{ 
          fontFamily: mono, fontSize: 13, 
          color: hover ? C.black : C.steel, 
          flexShrink: 0, marginLeft: 24,
          transform: hover ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 250ms ease-out',
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows 300ms ease-out',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: `4px ${H_PAD}px 28px` }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function BsFooter() {
  const { lang } = useLang()
  const c = bsContent[toBsLang(lang)]
  return (
    <div style={{ padding: `32px ${H_PAD}px 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        {c.footer}
      </p>
    </div>
  )
}

function TableHeader({ cols }: { cols: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols.map(() => '1fr').join(' '), padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.16)' }}>
      {cols.map(h => (
        <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
      ))}
    </div>
  )
}

function TableRow({ cells, cols }: { cells: string[]; cols: number }) {
  const template = Array(cols).fill('1fr').join(' ')
  return (
    <div style={{ display: 'grid', gridTemplateColumns: template, padding: '14px 0', borderBottom: hairline, alignItems: 'start', gap: 16 }}>
      {cells.map((cell, i) => (
        <span key={i} style={{ fontSize: 13, color: i === 0 ? C.black : C.steel, fontFamily: sans, lineHeight: 1.5, fontWeight: i === 0 ? 600 : 400 }}>{cell}</span>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   COVER — id: brand-system
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandSystemCover() {
  const { lang } = useLang()
  const c = bsContent[toBsLang(lang)].cover
  return (
    <section id="brand-system">
      <div style={{ padding: `80px ${H_PAD}px 72px`, borderBottom: hairline }}>
        <Eyebrow>// 01 • BRAND SYSTEM</Eyebrow>
        <h1 className="text-balance" style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 24px', lineHeight: 1.0, fontFamily: sans }}>
          Brand System
        </h1>
        <div style={{ marginBottom: 32 }}>
          <BicofinoLogo color={C.black} width={200} />
        </div>
        <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.black, margin: '0 0 20px', fontWeight: 600, textTransform: 'uppercase' }}>
          {c.tagline}
        </p>
        <p style={{ fontFamily: mono, fontSize: 11, color: C.platinum, margin: 0, letterSpacing: '0.08em' }}>
          {c.version}
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ÍNDICE — id: brand-indice
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandIndice() {
  const { lang } = useLang()
  const c = bsContent[toBsLang(lang)].indice

  return (
    <section id="brand-indice">
      <BsHeader eyebrow={c.eyebrow} title={c.title} />
      <div style={{ padding: `0 ${H_PAD}px 64px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px 80px' }}>
          {c.groups.map(({ title, items }) => (
            <div key={title}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: '0 0 16px', fontFamily: sans, letterSpacing: '-0.01em' }}>
                {title}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {items.map((item) => (
                  <li key={item} style={{ fontSize: 13, lineHeight: 1.5, color: C.black, fontFamily: mono, display: 'flex', gap: 10 }}>
                    <span style={{ color: C.aluminium, flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: sans, fontSize: 13, color: C.steel, margin: '56px 0 0', fontStyle: 'italic' }}>
          {c.complement}
        </p>
      </div>
      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FUNDAMENTOS — id: brand-fundamentos
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandFundamentos() {
  const { lang } = useLang()
  const c = bsContent[toBsLang(lang)].fundamentos

  return (
    <section id="brand-fundamentos">
      <BsHeader eyebrow={c.header.eyebrow} title={c.header.title} />

      {/* Overview */}
      <BsSub label={c.overview.sub.label} title={c.overview.sub.title} />
      <div style={{ padding: `0 ${H_PAD}px 24px` }}>
        <P>{c.overview.p1}</P>
        <P>{c.overview.p2}</P>
        <div style={{ margin: '0 0 0', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>{c.overview.clarity.label}</strong> {c.overview.clarity.text}</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>{c.overview.consistency.label}</strong> {c.overview.consistency.text}</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>{c.overview.evolution.label}</strong> {c.overview.evolution.text}</p>
        </div>
      </div>
      <AccordionItem title={c.overview.forWhom.title}>
        <P>{c.overview.forWhom.body}</P>
      </AccordionItem>
      <AccordionItem title={c.overview.living.title}>
        <P>{c.overview.living.body}</P>
      </AccordionItem>

      {/* A Origem do Nome */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.origem.label} title={c.origem.title} />
        <div style={{ padding: `0 ${H_PAD}px 56px` }}>
          <P>{c.origem.p1}</P>
          <P>{c.origem.p2}</P>
          <P>{c.origem.p3}</P>
          <P>{c.origem.p4}</P>
          <P>{c.origem.p5}</P>
          <div style={{ margin: '0 0 20px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>{c.origem.filter.label}</strong> {c.origem.filter.text}</p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>{c.origem.execution.label}</strong> {c.origem.execution.text}</p>
          </div>
        </div>
      </div>

      {/* Por que existimos */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.porQue.label} title={c.porQue.title} />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>{c.porQue.p1}</P>
          <P>{c.porQue.p2}</P>
          <P>{c.porQue.p3}</P>
          <P>{c.porQue.p4}</P>
        </div>
        <AccordionItem title={c.porQue.different.title}>
          <P>{c.porQue.different.p1}</P>
          <P>{c.porQue.different.p2}</P>
        </AccordionItem>
        <AccordionItem title={c.porQue.forWhom.title}>
          <P>{c.porQue.forWhom.p1}</P>
          <P>{c.porQue.forWhom.p2}</P>
        </AccordionItem>
        <AccordionItem title={c.porQue.notForWhom.title}>
          <P>{c.porQue.notForWhom.p1}</P>
          <P>{c.porQue.notForWhom.p2}</P>
        </AccordionItem>
      </div>

      {/* Princípios */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.principios.label} title={c.principios.title} />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>{c.principios.intro}</P>
        </div>

        {c.principios.items.map(({ title, paras, items }) => (
          <AccordionItem key={title} title={title}>
            {paras.map((p, i) => <P key={i}>{p}</P>)}
            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '20px 0 8px', textTransform: 'uppercase' as const }}>{c.principios.howToApply}</p>
            <BulletList items={items} />
          </AccordionItem>
        ))}
      </div>

      {/* Cuidados e Riscos */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.riscos.label} title={c.riscos.title} />

        {c.riscos.items.map(({ title, body, guard }) => (
          <AccordionItem key={title} title={title}>
            {body && <P>{body}</P>}
            <GuardRail>{guard}</GuardRail>
          </AccordionItem>
        ))}
        <div style={{ height: 40 }} />
      </div>

      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   POSICIONAMENTO — id: brand-posicionamento
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandPosicionamento() {
  const { lang } = useLang()
  const c = bsContent[toBsLang(lang)].posicionamento

  return (
    <section id="brand-posicionamento">
      <BsHeader eyebrow={c.header.eyebrow} title={c.header.title} />

      {/* Público-chave */}
      <BsSub label={c.publicoChave.label} title={c.publicoChave.title} />
      <div style={{ padding: `0 ${H_PAD}px 56px` }}>
        <P>{c.publicoChave.p1}</P>
        <P>{c.publicoChave.p2}</P>

        {c.publicoChave.clusters.map(({ label, tag, body, ref }) => (
          <div key={label} style={{ borderTop: hairline, padding: '32px 0' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.black, margin: '0 0 4px', fontFamily: sans }}>
              {label} {tag && <span style={{ fontWeight: 400, color: C.steel }}>{tag}</span>}
            </p>
            <P>{body}</P>
            {ref && (
              <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, letterSpacing: '0.06em' }}>
                {c.publicoChave.refLabel} {ref}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Buyer Personas */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.personas.label} title={c.personas.title} />

        <AccordionItem title={c.personas.a.title}>
          {c.personas.a.rows.map(([label, text]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '14px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{text}</span>
            </div>
          ))}
        </AccordionItem>

        <AccordionItem title={c.personas.b.title}>
          <div style={{ padding: '14px 0', borderBottom: hairline, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'start' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans }}>{c.personas.b.profileLabel}</span>
            <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{c.personas.b.profileText}</span>
          </div>
          <div style={{ padding: '14px 0', borderBottom: hairline }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: '0 0 10px', fontFamily: sans }}>{c.personas.b.wantsLabel}</p>
            <P>{c.personas.b.wantsP1}</P>
            <P>{c.personas.b.wantsP2}</P>
          </div>
          {c.personas.b.rows.map(([label, text]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '14px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{text}</span>
            </div>
          ))}
        </AccordionItem>

        <AccordionItem title={c.personas.c.title}>
          {c.personas.c.rows.map(([label, text]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '14px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{text}</span>
            </div>
          ))}
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Posicionamento de Marca */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.posicMarca.label} title={c.posicMarca.title} />
        <AccordionItem title={c.posicMarca.declaration.title}>
          <P>{c.posicMarca.declaration.body}</P>
        </AccordionItem>
        <AccordionItem title={c.posicMarca.differentiates.title}>
          <div style={{ marginTop: 24 }}>
            <TableHeader cols={c.posicMarca.differentiates.cols as unknown as string[]} />
            {c.posicMarca.differentiates.rows.map(cells => (
              <TableRow key={cells[0]} cells={cells as unknown as string[]} cols={3} />
            ))}
          </div>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Internacionalidade */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.internacionalidade.label} title={c.internacionalidade.title} />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>{c.internacionalidade.intro}</P>
        </div>
        <AccordionItem title={c.internacionalidade.whyThree.title}>
          <P>{c.internacionalidade.whyThree.p1}</P>
          <P>{c.internacionalidade.whyThree.p2}</P>
          <P>{c.internacionalidade.whyThree.p3}</P>
        </AccordionItem>
        <AccordionItem title={c.internacionalidade.bond.title}>
          <P>{c.internacionalidade.bond.p1}</P>
          <P>{c.internacionalidade.bond.p2}</P>
          <P>{c.internacionalidade.bond.p3}</P>
        </AccordionItem>
        <AccordionItem title={c.internacionalidade.practice.title}>
          <P>{c.internacionalidade.practice.body}</P>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NÚCLEO DA MARCA — id: brand-nucleo
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandNucleo() {
  const { lang } = useLang()
  const c = bsContent[toBsLang(lang)].nucleo

  return (
    <section id="brand-nucleo">
      <BsHeader eyebrow={c.header.eyebrow} title={c.header.title} />

      {/* Direção */}
      <BsSub label={c.direcao.label} title={c.direcao.title} />
      <div style={{ padding: `0 ${H_PAD}px 24px` }}>
        <P>{c.direcao.p1}</P>
        <div style={{ margin: '0 0 0', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>{c.direcao.unlike.label}</strong> {c.direcao.unlike.text}</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>{c.direcao.any.label}</strong> {c.direcao.any.text}</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>{c.direcao.other.label}</strong> {c.direcao.other.text}</p>
        </div>
      </div>
      <AccordionItem title={c.direcao.metaphor.title}>
        <P><strong>{c.direcao.metaphor.p1}</strong></P>
        <P>{c.direcao.metaphor.p2}</P>
      </AccordionItem>

      {/* Visão e Propósito */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.visaoPropósito.label} title={c.visaoPropósito.title} />
        <AccordionItem title={c.visaoPropósito.vision.title}>
          <P>{c.visaoPropósito.vision.body}</P>
        </AccordionItem>
        <AccordionItem title={c.visaoPropósito.purpose.title}>
          <P>{c.visaoPropósito.purpose.body}</P>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Os 4 Cs */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.quatroCs.label} title={c.quatroCs.title} />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>{c.quatroCs.intro}</P>
        </div>

        {c.quatroCs.items.map(({ label, body, body2, rule }) => (
          <AccordionItem key={label} title={label}>
            <P>{body}</P>
            {body2 && <P>{body2}</P>}
            {rule && (
              <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, margin: '8px 0 0', fontFamily: sans, borderLeft: `2px solid ${C.aluminium}`, paddingLeft: 16 }}>
                {rule}
              </p>
            )}
          </AccordionItem>
        ))}

        <div style={{ borderTop: hairline, padding: `32px ${H_PAD}px 56px` }}>
          <P muted>{c.quatroCs.footerMuted}</P>
        </div>
      </div>

      {/* Arquétipos */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.arquetipos.label} title={c.arquetipos.title} />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <H3>{c.arquetipos.triadTitle}</H3>
          <P>{c.arquetipos.triadIntro}</P>
        </div>

        {c.arquetipos.items.map(({ title, ref, body, body2, never }) => (
          <AccordionItem key={title} title={title}>
            <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: '0 0 20px', letterSpacing: '0.06em', fontStyle: 'italic' }}>{ref}</p>
            <P>{body}</P>
            <P>{body2}</P>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, margin: 0, fontFamily: sans, borderLeft: `2px solid ${C.aluminium}`, paddingLeft: 16 }}>{never}</p>
          </AccordionItem>
        ))}

        <AccordionItem title={c.arquetipos.foxBond.title}>
          <P>{c.arquetipos.foxBond.p1}</P>
          <P>{c.arquetipos.foxBond.p2}</P>
          <P>{c.arquetipos.foxBond.p3}</P>
          <P>{c.arquetipos.foxBond.p4}</P>
        </AccordionItem>

        <AccordionItem title={c.arquetipos.semanticPanel.title}>
          {c.arquetipos.semanticPanel.rows.map(([label, text]) => (
            <div key={label} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: '0 0 8px', fontFamily: sans }}>{label}</p>
              <P muted={label === c.arquetipos.semanticPanel.rows[2][0]}>{text}</P>
            </div>
          ))}
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Craft */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.craft.label} title={c.craft.title} />
        <div style={{ padding: `0 ${H_PAD}px 56px` }}>
          <P>{c.craft.intro}</P>
          {c.craft.items.map(([label, text]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', padding: '18px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.black, fontFamily: sans, lineHeight: 1.4 }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Proxies e Personas */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.proxies.label} title={c.proxies.title} />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>{c.proxies.intro}</P>
        </div>

        {c.proxies.items.map(({ name, use, arrow }) => (
          <AccordionItem key={name} title={name}>
            <P>{use}</P>
            <Arrow>{arrow}</Arrow>
          </AccordionItem>
        ))}
        <div style={{ height: 40 }} />
      </div>

      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   UNIVERSO VERBAL — id: brand-verbal
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandVerbal() {
  const { lang } = useLang()
  const c = bsContent[toBsLang(lang)].verbal

  return (
    <section id="brand-verbal">
      <BsHeader eyebrow={c.header.eyebrow} title={c.header.title} />

      {/* Manifesto de Entrada — texto canônico do site público (v1.1) */}
      <BsSub label={c.manifestoEntrada.label} title={c.manifestoEntrada.title} />
      <div style={{ padding: `0 ${H_PAD}px 56px` }}>
        {c.manifestoEntrada.paras.map((p, i) => <P key={i}>{p}</P>)}
        <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 20px', fontFamily: sans }}>{c.manifestoEntrada.tagline}</p>
        <p style={{ fontFamily: mono, fontSize: 10, lineHeight: 1.7, letterSpacing: '0.04em', color: C.platinum, margin: 0, maxWidth: 560 }}>{c.manifestoEntrada.note}</p>
      </div>

      {/* Manifesto Editorial */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.manifesto.label} title={c.manifesto.title} />
      </div>
      <div style={{ padding: `0 ${H_PAD}px 56px` }}>
        {c.manifesto.paras.map((p, i) => <P key={i}>{p}</P>)}
        <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, fontFamily: sans }}>{c.manifesto.tagline}</p>
      </div>

      {/* Tom de Voz */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.tomDeVoz.label} title={c.tomDeVoz.title} />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>{c.tomDeVoz.intro}</P>
        </div>

        {c.tomDeVoz.axes.map(({ axis, body, weak, right }) => (
          <AccordionItem key={axis} title={axis}>
            <P>{body}</P>
            {weak && (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12, marginTop: 8 }}>
                <p style={{ fontSize: 14, color: C.steel, margin: 0, fontFamily: sans, lineHeight: 1.5 }}>
                  <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.platinum, marginRight: 10 }}>{c.tomDeVoz.weakLabel}</span>
                  <em>{weak}</em>
                </p>
                <p style={{ fontSize: 14, color: C.black, margin: 0, fontFamily: sans, lineHeight: 1.5 }}>
                  <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, marginRight: 10 }}>{c.tomDeVoz.bicofinoLabel}</span>
                  {right}
                </p>
              </div>
            )}
          </AccordionItem>
        ))}

        <AccordionItem title={c.tomDeVoz.restrictions.title}>
          <P><strong>{c.tomDeVoz.restrictions.p1}</strong></P>
          <P>{c.tomDeVoz.restrictions.p2}</P>
          <P>{c.tomDeVoz.restrictions.p3}</P>
          <P><strong>{c.tomDeVoz.restrictions.p4}</strong></P>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '24px 0 12px', textTransform: 'uppercase' as const }}>{c.tomDeVoz.restrictions.othersLabel}</p>
          <BulletList items={c.tomDeVoz.restrictions.items} />
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Vocabulário */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.vocabulario.label} title={c.vocabulario.title} />
        <AccordionItem title={c.vocabulario.bicofinoWords.title}>
          {c.vocabulario.bicofinoWords.items.map(([term, def]) => (
            <div key={term} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', padding: '14px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.black, fontFamily: sans }}>{term}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{def}</span>
            </div>
          ))}
        </AccordionItem>
        <AccordionItem title={c.vocabulario.avoidWords.title}>
          <div style={{ marginTop: 16 }}>
            <TableHeader cols={c.vocabulario.avoidWords.cols as unknown as string[]} />
            {c.vocabulario.avoidWords.rows.map(cells => (
              <TableRow key={cells[0]} cells={cells as unknown as string[]} cols={3} />
            ))}
          </div>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Território de Palavras */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.territorio.label} title={c.territorio.title} />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>{c.territorio.intro}</P>
        </div>
        {c.territorio.layers.map(({ layer, body }) => (
          <AccordionItem key={layer} title={layer}>
            <P muted>{body}</P>
          </AccordionItem>
        ))}
        <div style={{ height: 40 }} />
      </div>

      {/* Glossário */}
      <div style={{ borderTop: hairline }}>
        <BsSub label={c.glossario.label} title={c.glossario.title} />
        {c.glossario.items.map(([term, def]) => (
          <AccordionItem key={term} compact title={term}>
            <p style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans, margin: 0 }}>{def}</p>
          </AccordionItem>
        ))}
        <div style={{ height: 40 }} />
      </div>

      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function BrandSystem() {
  return (
    <>
      <BrandSystemCover />
      <BrandIndice />
      <BrandFundamentos />
      <BrandPosicionamento />
      <BrandNucleo />
      <BrandVerbal />
    </>
  )
}
