'use client'

import { FocusReveal } from '@/components/motion/FocusReveal'
import { StaggerGroup } from '@/components/motion/StaggerGroup'
import { useLang } from '@/content'
import React from 'react'

/* ─── Design tokens ─── */
const C = {
  black:      'var(--bf-text-primary)',
  bg:         'var(--bf-bg-page)',
  white:      'var(--bf-surface)',
  steel:      'var(--bf-text-secondary)',
  platinum:   'var(--bf-text-subtle)',
  aluminium:  '#e2eaf2',
  powerBlack: '#061015',
  crema:      '#f3ebd4',
  caffe:      '#33111a',
  cacao:      '#5e4c41',
  spfc:       '#f0535e',
  sep:        '#2fd298',
  usa:        '#05185c',
  niederland: '#fe4600',
  australia:  '#e5ff78',
  benfica:    '#ed0007',
  miami:      '#f4b3cb',
  napoli:     '#77deff',
  torino:     '#821324',
  como:       '#0d8aff',
  venezia:    '#38e0e3',
  fiorentina: '#711cfe',
  champagne:  '#d8d7d3',
}

const PALETTE = {
  bg:       '#f2f8ff',
  black:    '#2a2c2b',
  steel:    '#6d7886',
  white:    '#ffffff',
  platinum: '#a8c9e5',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 'clamp(16px, 5vw, 72px)'

/* ─── Shared atoms ─── */
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' }}>
      {children}
    </p>
  )
}

function PageTitle({ children }: { children: string }) {
  return (
    <h1 className="text-balance" style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
      {children}
    </h1>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '0 0 0', maxWidth: 580 }}>
      {children}
    </p>
  )
}

function SectionHeader({ children, eyebrow }: { children: string; eyebrow: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{children}</PageTitle>
    </div>
  )
}

function SubHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: `56px ${H_PAD} 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h2 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h2>
    </div>
  )
}

function PageFooter({ line }: { line: string }) {
  return (
    <div style={{ padding: `32px ${H_PAD} 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        {line}
      </p>
    </div>
  )
}

function AccordionItem({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [hover, setHover] = React.useState(false)
  const id = React.useId()
  const contentId = `accordion-content-${id}`
  return (
    <div style={{ borderTop: hairline }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        aria-controls={contentId}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', padding: `20px ${H_PAD}`,
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left' as const,
        }}
      >
        <span style={{
          display: 'inline-block',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '-0.015em',
          color: hover ? C.steel : C.black,
          lineHeight: 1.2,
          fontFamily: sans,
          transform: hover ? 'translateX(6px)' : 'translateX(0)',
          transition: 'color 250ms ease-out, transform 250ms ease-out',
        }}>
          {title}
        </span>
        <span style={{
          fontFamily: mono, fontSize: 13,
          color: hover ? C.black : C.steel,
          flexShrink: 0, marginLeft: 24,
          transform: hover ? 'scale(1.2)' : 'scale(1)',
          transition: 'color 250ms ease-out, transform 250ms ease-out',
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        id={contentId}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 300ms ease-out',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: `4px ${H_PAD} 28px` }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — Overview
   ═══════════════════════════════════════════════════════════════════════════ */
function Overview() {
  const { t } = useLang()

  const meta = [
    { label: t('overview.meta.version'),   value: '1.0 · ongoing' },
    { label: t('overview.meta.published'), value: 'maio · 2026' },
    { label: t('overview.meta.owner'),     value: 'Woney Malian / Fabio Brancatelli' },
    { label: t('overview.meta.base'),      value: 'DS Bicofino 2026' },
    { label: t('overview.meta.verticals'), value: 'On Pitch · Off Pitch' },
  ]

  return (
    <section id="overview">
      <div style={{ padding: `80px ${H_PAD} 72px`, borderBottom: hairline }}>
        <Eyebrow>{t('meta.eyebrow')}</Eyebrow>
        <div className="bf-two-col-grid">
          <div>
            <div className="bf-load-stagger" style={{ fontSize: 'clamp(56px, 7vw, 104px)', lineHeight: 0.92, fontWeight: 700, fontFamily: sans, marginBottom: 40 }}>
              {(['Brand.', 'Identidade.', 'Imagem.'] as const).map((word, i) => (
                <div key={word} className="bf-stagger-item" style={{ color: C.black, animationDelay: `${i * 70}ms` }}>
                  {word}
                </div>
              ))}
            </div>
            <Lead>{t('overview.lead')}</Lead>
          </div>

          <StaggerGroup style={{ borderTop: `1px solid ${C.black}`, paddingTop: 24 }}>
            {meta.map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, margin: '0 0 3px', textTransform: 'uppercase' }}>{label}</p>
                <p style={{ fontSize: 13, color: C.black, margin: 0, lineHeight: 1.4 }}>{value}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </div>

      {/* Universo Visual intro + accordions */}
      <div style={{ borderBottom: hairline }}>
        <FocusReveal style={{ padding: `64px ${H_PAD} 40px` }}>
          <Eyebrow>{t('foundations.eyebrow')}</Eyebrow>
          <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 16px', fontFamily: sans }}>
            {t('foundations.title')}
          </h2>
          <Lead>{t('foundations.lead')}</Lead>
        </FocusReveal>
        <AccordionItem title="Minimalismo sofisticado">
          <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans }}>
            Espaço em branco é um elemento ativo, não ausência de conteúdo. Quanto menos elementos competem pela atenção, maior o impacto de cada um.
          </p>
        </AccordionItem>
        <AccordionItem title="Quiet Luxury como calibrador">
          <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans }}>
            A referência visual é Hermès, Loro Piana, Brunello Cucinelli, Audemars Piguet, The Row. Qualidade que se percebe antes de se ler o nome da marca.
          </p>
        </AccordionItem>
        <AccordionItem title="Hierarquia clara">
          <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans }}>
            Todo layout Bicofino tem uma leitura principal e uma secundária. Nunca três elementos disputando o mesmo peso visual.
          </p>
        </AccordionItem>
        <AccordionItem title="Permanência sobre tendência">
          <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans }}>
            O Bicofino não segue estética de momento. Cada peça visual deve ter capacidade de envelhecer bem — como o couro que fica melhor com o tempo.
          </p>
        </AccordionItem>
        <AccordionItem title="O Toque Artesanal — o quinto elemento">
          <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: '0 0 20px', fontFamily: sans }}>
            As quatro qualidades acima são o sistema. O toque artesanal é o que diferencia o Bicofino de qualquer sistema de marca bem executado.
          </p>
          <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: '0 0 20px', fontFamily: sans }}>
            Em momentos pontuais e estrategicamente escolhidos, o Bicofino age de forma inteiramente artesanal e humana: um tratamento fotográfico inesperado num post de atleta, um grid que rompe sua própria lógica de forma calculada, uma peça com acabamento manual que ninguém esperaria no digital. Cada execução é diferente da anterior — às vezes limpa, às vezes tecnológica, às vezes com tratamento artístico artesanal, às vezes impactante e densa. Mas todas reconhecivelmente Bicofino.
          </p>
          <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans }}>
            Esses momentos não são frequentes — e não devem ser. São raros, surgem quando a ocasião exige, e é exatamente essa raridade que os torna poderosos. O toque artesanal é o fator humano que não se replica em escala. É o que transforma um sistema bem executado numa marca viva.
          </p>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — Colors
   ═══════════════════════════════════════════════════════════════════════════ */
function Colors() {
  const { t } = useLang()

  const basics = [
    { role: t('color.black.role'),      name: 'bf Black',        hex: PALETTE.black,    dark: true,  desc: t('color.black.desc') },
    { role: t('color.steel.role'),      name: 'bf Steel',        hex: PALETTE.steel,    dark: true,  desc: t('color.steel.desc') },
    { role: t('color.aluminium.role'),  name: 'bf Aluminium',    hex: C.aluminium,      dark: false, desc: t('color.aluminium.desc') },
    { role: t('color.platinum.role'),   name: 'bf Platinum',     hex: PALETTE.platinum, dark: false, desc: t('color.platinum.desc') },
    { role: t('color.bg.role'),         name: 'Blue Background', hex: PALETTE.bg,       dark: false, desc: t('color.bg.desc') },
  ]

  const specials = [
    { role: t('color.crema.role'),      name: 'crema',     hex: C.crema,    dark: false },
    { role: t('color.caffe.role'),      name: 'caffè',     hex: C.caffe,    dark: true  },
    { role: t('color.champagne.role'),  name: 'champagne', hex: C.champagne,dark: false },
    { role: t('color.cacao.role'),      name: 'cacao',     hex: C.cacao,    dark: true  },
  ]

  const highlights = [
    { name: 'torino',     hex: C.torino,     dark: true  },
    { name: 'bf SPFC',    hex: C.spfc,       dark: true  },
    { name: 'bf SEP',     hex: C.sep,        dark: false },
    { name: 'benfica',    hex: C.benfica,    dark: true  },
    { name: 'usa',        hex: C.usa,        dark: true  },
    { name: 'niederland', hex: C.niederland, dark: true  },
    { name: 'australia',  hex: C.australia,  dark: false },
    { name: 'miami',      hex: C.miami,      dark: false },
    { name: 'napoli',     hex: C.napoli,     dark: false },
    { name: 'como',       hex: C.como,       dark: true  },
    { name: 'venezia',    hex: C.venezia,    dark: false },
    { name: 'fiorentina', hex: C.fiorentina, dark: true  },
  ]

  const tokens = [
    { token: '--bf-black',       hex: PALETTE.black,    name: 'bf Black',        role: t('token.black.role') },
    { token: '--bf-power-black', hex: C.powerBlack,     name: 'bf Power Black',  role: t('token.powerblack.role') },
    { token: '--bf-bg',          hex: PALETTE.bg,       name: 'Blue Background', role: t('token.bg.role') },
    { token: '--bf-white',       hex: PALETTE.white,    name: 'white',           role: t('token.white.role') },
    { token: '--bf-steel',       hex: PALETTE.steel,    name: 'bf Steel',        role: t('token.steel.role') },
    { token: '--bf-aluminium',   hex: C.aluminium,      name: 'bf Aluminium',    role: t('token.aluminium.role') },
    { token: '--bf-platinum',    hex: PALETTE.platinum, name: 'bf Platinum',     role: t('token.platinum.role') },
    { token: '--bf-crema',       hex: C.crema,      name: 'crema',           role: t('token.crema.role') },
    { token: '--bf-caffe',       hex: C.caffe,      name: 'caffè',           role: t('token.caffe.role') },
    { token: '--bf-cacao',       hex: C.cacao,      name: 'cacao',           role: t('token.cacao.role') },
    { token: '--bf-torino',      hex: C.torino,     name: 'torino',          role: t('token.torino.role') },
    { token: '--bf-como',        hex: C.como,       name: 'como',            role: t('token.como.role') },
    { token: '--bf-spfc',        hex: C.spfc,       name: 'bf SPFC',         role: t('token.spfc.role') },
  ]

  const swatchCard = (r: { role: string; name: string; hex: string; dark: boolean; desc?: string }) => (
    <div key={r.hex + r.name} style={{ background: r.hex, padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200 }}>
      <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.08em', color: r.dark ? 'rgba(242,248,255,0.4)' : 'rgba(42,44,43,0.4)', margin: 0, lineHeight: 1.5 }}>
        {r.role}
      </p>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: r.dark ? PALETTE.bg : PALETTE.black, margin: '0 0 5px', letterSpacing: '-0.01em' }}>{r.name}</p>
        <p style={{ fontFamily: mono, fontSize: 11, color: r.dark ? 'rgba(242,248,255,0.6)' : PALETTE.steel, margin: '0 0 6px' }}>{r.hex}</p>
        {r.desc && <p style={{ fontSize: 11, color: r.dark ? 'rgba(242,248,255,0.4)' : 'rgba(42,44,43,0.4)', margin: 0, lineHeight: 1.5 }}>{r.desc}</p>}
      </div>
    </div>
  )

  return (
    <section id="colors">
      <SectionHeader eyebrow="// 02.2">{t('colors.title')}</SectionHeader>

      <FocusReveal style={{ padding: `56px ${H_PAD} 0` }}>
        <Lead>{t('colors.lead')}</Lead>
      </FocusReveal>

      {/* Básicas */}
      <SubHeader label="// 02.2.1" title={t('colors.basics.title')} />
      <div className="bf-swatch-grid-5" style={{ margin: `0 ${H_PAD}` }}>
        {basics.map(swatchCard)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: `1px ${H_PAD} 0`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {[
          { role: t('color.white.role'),      name: 'white',          hex: PALETTE.white, dark: false, desc: t('color.white.desc') },
          { role: t('color.powerblack.role'), name: 'bf Power Black', hex: C.powerBlack, dark: true,  desc: t('color.powerblack.desc') },
        ].map(swatchCard)}
      </div>

      {/* Especiais */}
      <SubHeader label="// 02.2.2" title={t('colors.specials.title')} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', margin: `0 ${H_PAD}`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {specials.map(r => (
          <div key={r.name} style={{ background: r.hex, padding: '24px 20px', minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.08em', color: r.dark ? 'rgba(242,248,255,0.4)' : 'rgba(42,44,43,0.4)', margin: 0 }}>{r.role}</p>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: r.dark ? PALETTE.bg : PALETTE.black, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{r.name}</p>
              <p style={{ fontFamily: mono, fontSize: 11, color: r.dark ? 'rgba(242,248,255,0.55)' : PALETTE.steel, margin: 0 }}>{r.hex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Destaques */}
      <SubHeader label={t('colors.highlights.label')} title={t('colors.highlights.title')} />
      <div className="bf-swatch-grid-highlights" style={{ margin: `0 ${H_PAD}` }}>
        {highlights.map(({ name, hex, dark }) => (
          <div key={name} style={{ background: hex, padding: '20px 16px', minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: dark ? PALETTE.bg : PALETTE.black, margin: '0 0 3px', letterSpacing: '-0.01em' }}>{name}</p>
            <p style={{ fontFamily: mono, fontSize: 9, color: dark ? 'rgba(242,248,255,0.55)' : 'rgba(42,44,43,0.5)', margin: 0 }}>{hex}</p>
          </div>
        ))}
      </div>

      {/* Token table */}
      <SubHeader label="// 02.2.4" title={t('colors.tokens.title')} />
      <div className="bf-overflow-table" style={{ margin: `0 ${H_PAD} 0` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 160px 200px 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)', minWidth: 640 }}>
          {[t('table.col.token'), t('table.col.value'), t('table.col.name'), t('table.col.role')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {tokens.map(({ token, hex, name, role }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '200px 160px 200px 1fr', padding: '13px 0', borderBottom: hairline, alignItems: 'center', minWidth: 640 }}>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{token}</code>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, background: hex, borderRadius: 2, border: '1px solid var(--bf-border-strong)', flexShrink: 0 }} />
              <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{hex}</span>
            </div>
            <span style={{ fontSize: 13, color: C.black }}>{name}</span>
            <span style={{ fontSize: 13, color: C.steel }}>{role}</span>
          </div>
        ))}
      </div>
      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — Typography
   ═══════════════════════════════════════════════════════════════════════════ */
function Typography() {
  const { t } = useLang()

  const scale = [
    { label: 'display-xl', size: 96, lh: '1.02', ls: '-0.03em',  fw: 700 },
    { label: 'display-l',  size: 72, lh: '1.04', ls: '-0.025em', fw: 700 },
    { label: 'h1',         size: 44, lh: '1.1',  ls: '-0.02em',  fw: 700 },
    { label: 'h2',         size: 32, lh: '1.15', ls: '-0.015em', fw: 700 },
    { label: 'h3',         size: 24, lh: '1.25', ls: '-0.01em',  fw: 600 },
    { label: 'body-l',     size: 18, lh: '1.55', ls: '0',        fw: 400 },
    { label: 'body',       size: 16, lh: '1.55', ls: '0',        fw: 400 },
    { label: 'caption',    size: 12, lh: '1.45', ls: '0',        fw: 400 },
  ]

  const fontCard = (title: string, subtitle: string, specimen: React.ReactNode, meta: [string, string][]) => (
    <div className="bf-font-card-grid" style={{ margin: `0 ${H_PAD} 1px`, border: hairline, background: C.white, minWidth: 0 }}>
      <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 56px)', minWidth: 0, overflow: 'hidden' }}>
        <p style={{ fontSize: 13, color: C.steel, margin: '0 0 4px', fontFamily: sans }}>{subtitle}</p>
        <div style={{ marginTop: 32, minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{specimen}</div>
      </div>
      <div style={{ padding: 'clamp(20px, 4vw, 32px) clamp(20px, 4vw, 36px)', borderLeft: hairline, display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
        {meta.map(([label, value]) => (
          <div key={label}>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, margin: '0 0 3px', textTransform: 'uppercase' }}>{label}</p>
            <p style={{ fontSize: 13, color: C.black, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="typography">
      <SectionHeader eyebrow="// 02.3">{t('typography.title')}</SectionHeader>
      <div style={{ padding: `40px ${H_PAD} 0` }}>
        <Lead>{t('typography.lead')}</Lead>
      </div>

      <SubHeader label="// 02.3.1 · fonte principal" title="Inter" />
      {fontCard(
        'Inter',
        t('font.inter.subtitle'),
        <div style={{ fontSize: 'clamp(40px, 9vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', color: C.black, lineHeight: 1, fontFamily: sans }}>Bicofino</div>,
        [
          [t('font.meta.family'),   t('font.inter.family')],
          [t('font.meta.weights'),  t('font.inter.weights')],
          [t('font.meta.coverage'), t('font.inter.coverage')],
          [t('font.meta.usage'),    t('font.inter.usage')],
          [t('font.meta.license'),  t('font.inter.license')],
        ]
      )}

      <SubHeader label="// 02.3.2 · monospaced" title="JetBrains Mono" />
      {fontCard(
        'JetBrains Mono',
        t('font.mono.subtitle'),
        <div style={{ fontSize: 'clamp(22px, 6vw, 36px)', fontWeight: 400, letterSpacing: '0.02em', color: C.black, lineHeight: 1.05, fontFamily: mono, wordBreak: 'break-all' }}>// bicofino.com</div>,
        [
          [t('font.meta.family'),   t('font.mono.family')],
          [t('font.meta.weights'),  t('font.mono.weights')],
          [t('font.meta.coverage'), t('font.mono.coverage')],
          [t('font.meta.usage'),    t('font.mono.usage')],
          [t('font.meta.license'),  t('font.mono.license')],
        ]
      )}

      <SubHeader label="// 02.3.3" title="Type Scale" />
      <div className="bf-overflow-table" style={{ margin: `0 ${H_PAD} 0` }}>
        {scale.map(({ label, size, lh, ls, fw }) => (
          <div key={label} className="bf-type-scale-grid">
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', color: C.steel }}>{label}</span>
            <span style={{ fontSize: size, fontWeight: fw, lineHeight: lh, letterSpacing: ls, color: C.black, fontFamily: sans, display: 'block' }}>Aa</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.steel, whiteSpace: 'nowrap' }}>{size}/{lh} · {ls === '0' ? '0' : ls} · {fw}</span>
          </div>
        ))}
        <div className="bf-type-scale-grid" style={{ padding: '16px 0' }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', color: C.steel }}>eyebrow</span>
          <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.steel }}>{t('typescale.eyebrow.specimen')}</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{t('typescale.eyebrow.meta')}</span>
        </div>
      </div>
      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — Heading
   ═══════════════════════════════════════════════════════════════════════════ */
function SlashHeading() {
  const { t } = useLang()

  const typoRows = [
    { element: t('slash.typo.row1'), type: 'Inter 700', color: '--bf-black' },
    { element: t('slash.typo.row2'), type: 'Inter 700', color: '--bf-white' },
  ]

  const examples = [
    { heading: 'Connect. Curate. Create. Consult.', context: t('slash.ex1.context') },
    { heading: 'Unlike Any Other.',                 context: t('slash.ex2.context') },
    { heading: 'On Pitch. Off Pitch.',              context: t('slash.ex3.context') },
    { heading: 'Brand. Identity. Image.',           context: t('slash.ex4.context') },
    { heading: 'Access. Built with time.',          context: t('slash.ex5.context') },
    { heading: 'Guilherme Kerchner. The Playmaker.', context: t('slash.ex6.context') },
  ]

  const rejected = [
    { proposal: t('slash.rej1.proposal'), problem: t('slash.rej1.problem') },
    { proposal: t('slash.rej2.proposal'), problem: t('slash.rej2.problem') },
    { proposal: t('slash.rej3.proposal'), problem: t('slash.rej3.problem') },
    { proposal: t('slash.rej4.proposal'), problem: t('slash.rej4.problem') },
    { proposal: t('slash.rej5.proposal'), problem: t('slash.rej5.problem') },
  ]

  const whereItems = [
    t('slash.where.item1'),
    t('slash.where.item2'),
    t('slash.where.item3'),
    t('slash.where.item4'),
  ]

  const principles = [
    { bold: t('slash.principle.short'),       desc: t('slash.principle.short.desc') },
    { bold: t('slash.principle.direct'),      desc: t('slash.principle.direct.desc') },
    { bold: t('slash.principle.categorical'), desc: t('slash.principle.categorical.desc') },
    { bold: t('slash.principle.singular'),    desc: t('slash.principle.singular.desc') },
  ]

  return (
    <section id="slash-heading">
      <SectionHeader eyebrow="// 02.4">{t('slash.title')}</SectionHeader>

      {/* O que é */}
      <div style={{ padding: `48px ${H_PAD} 0` }}>
        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: sans, color: C.black, margin: '0 0 16px' }}>{t('slash.what.title')}</p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: C.black, margin: '0 0 14px', fontFamily: sans, maxWidth: 640 }}>{t('slash.what.p1')}</p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: C.black, margin: 0, fontFamily: sans, maxWidth: 640 }}>{t('slash.what.p2')}</p>
      </div>

      <div style={{ margin: `48px ${H_PAD} 0`, borderTop: hairline }} />

      {/* Princípios */}
      <div style={{ padding: `40px ${H_PAD} 0` }}>
        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: sans, color: C.black, margin: '0 0 20px' }}>{t('slash.principles.title')}</p>
        {principles.map(({ bold, desc }) => (
          <p key={bold} style={{ fontSize: 15, lineHeight: 1.7, color: C.black, margin: '0 0 12px', fontFamily: sans, maxWidth: 640 }}>
            <strong style={{ fontWeight: 700 }}>{bold}</strong>{' '}{desc}
          </p>
        ))}
      </div>

      <div style={{ margin: `40px ${H_PAD} 0`, borderTop: hairline }} />

      {/* Especificação tipográfica */}
      <div style={{ padding: `40px ${H_PAD} 0` }}>
        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: sans, color: C.black, margin: '0 0 20px' }}>{t('slash.typo.title')}</p>
        <div style={{ border: hairline }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 200px', padding: '8px 16px', borderBottom: hairline }}>
            {[t('slash.typo.col.element'), t('slash.typo.col.type'), t('slash.typo.col.color')].map(h => (
              <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600, textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {typoRows.map(({ element, type, color }) => (
            <div key={element} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 200px', padding: '14px 16px', borderBottom: hairline, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: C.black, fontFamily: sans }}>{element}</span>
              <span style={{ fontSize: 13, color: C.black, fontFamily: sans }}>{type}</span>
              <code style={{ fontFamily: mono, fontSize: 11, color: C.torino, background: 'rgba(130,19,36,0.06)', padding: '2px 6px', borderRadius: 3 }}>{color}</code>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: C.steel, margin: '16px 0 0', fontFamily: sans, maxWidth: 640 }}>{t('slash.typo.note')}</p>
      </div>

      {/* Visual */}
      <div style={{ margin: `40px ${H_PAD} 0`, border: hairline, background: C.white, padding: '56px 48px' }}>
        <div style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95, fontWeight: 700, fontFamily: sans }}>
          <span style={{ color: C.black }}>Connect.</span><br />
          <span style={{ color: C.black }}>Curate.</span><br />
          <span style={{ color: C.black }}>Create.</span><br />
          <span style={{ color: C.black }}>Consult.</span>
        </div>
      </div>

      {/* Exemplos */}
      <div style={{ margin: `40px ${H_PAD} 0` }}>
        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: sans, color: C.black, margin: '0 0 16px' }}>{t('slash.examples.title')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.15)' }}>
          {[t('slash.examples.col.heading'), t('slash.examples.col.context')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600, textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>
        {examples.map(({ heading, context }) => (
          <div key={heading} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '14px 0', borderBottom: hairline, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: C.black, fontFamily: sans }}>{heading}</span>
            <span style={{ fontSize: 13, color: C.steel, fontFamily: sans }}>{context}</span>
          </div>
        ))}
      </div>

      {/* Exemplos recusados */}
      <div style={{ margin: `32px ${H_PAD} 0` }}>
        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: sans, color: C.black, margin: '0 0 16px' }}>{t('slash.rejected.title')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.15)' }}>
          {[t('slash.rejected.col.proposal'), t('slash.rejected.col.problem')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600, textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>
        {rejected.map(({ proposal, problem }) => (
          <div key={proposal} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '14px 0', borderBottom: hairline, alignItems: 'start' }}>
            <span style={{ fontSize: 13, color: C.black, fontFamily: sans }}>{proposal}</span>
            <span style={{ fontSize: 13, color: C.steel, fontFamily: sans }}>{problem}</span>
          </div>
        ))}
      </div>

      <div style={{ margin: `48px ${H_PAD} 0`, borderTop: hairline }} />

      {/* Onde aparece */}
      <div style={{ padding: `40px ${H_PAD} 0` }}>
        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: sans, color: C.black, margin: '0 0 16px' }}>{t('slash.where.title')}</p>
        <ul style={{ paddingLeft: 20, margin: '0 0 16px' }}>
          {whereItems.map(item => (
            <li key={item} style={{ fontSize: 15, lineHeight: 1.8, color: C.black, fontFamily: sans }}>{item}</li>
          ))}
        </ul>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: C.black, margin: 0, fontFamily: sans, maxWidth: 640 }}>{t('slash.where.note')}</p>
      </div>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — Spacing & Motion
   ═══════════════════════════════════════════════════════════════════════════ */
function SpacingMotion() {
  const { t } = useLang()

  const spacing = [
    { token: '--sp-1', px: 4,  rem: '0.25', uso: t('sp1.uso') },
    { token: '--sp-2', px: 8,  rem: '0.5',  uso: t('sp2.uso') },
    { token: '--sp-3', px: 12, rem: '0.75', uso: t('sp3.uso') },
    { token: '--sp-4', px: 16, rem: '1',    uso: t('sp4.uso') },
    { token: '--sp-5', px: 24, rem: '1.5',  uso: t('sp5.uso') },
    { token: '--sp-6', px: 32, rem: '2',    uso: t('sp6.uso') },
    { token: '--sp-7', px: 48, rem: '3',    uso: t('sp7.uso') },
    { token: '--sp-8', px: 64, rem: '4',    uso: t('sp8.uso') },
    { token: '--sp-9', px: 96, rem: '6',    uso: t('sp9.uso') },
  ]

  return (
    <section id="spacing-motion">
      <SectionHeader eyebrow="// 02.5">{t('spacing.title')}</SectionHeader>
      <div style={{ padding: `40px ${H_PAD} 0` }}>
        <Lead>{t('spacing.lead')}</Lead>
      </div>

      <SubHeader label="// 02.5.1" title={t('spacing.section.title')} />
      <div style={{ margin: `0 ${H_PAD}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 60px 80px 1fr 200px', padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.16)' }}>
          {[t('spacing.col.token'), t('spacing.col.px'), t('spacing.col.rem'), t('spacing.col.usage'), t('spacing.col.visual')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {spacing.map(({ token, px, rem, uso }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '120px 60px 80px 1fr 200px', padding: '12px 0', borderBottom: hairline, alignItems: 'center' }}>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{token}</code>
            <span style={{ fontSize: 13, color: C.black }}>{px}</span>
            <span style={{ fontSize: 13, color: C.steel }}>{rem}</span>
            <span style={{ fontSize: 13, color: C.steel }}>{uso}</span>
            <div style={{ width: px, height: 6, background: C.black, borderRadius: 1, maxWidth: '100%' }} />
          </div>
        ))}
      </div>

      <SubHeader label="// 02.5.2" title={t('motion.section.title')} />
      <div style={{ margin: `0 ${H_PAD}` }}>
        {[
          { token: 'dur-fast', ms: 120 },
          { token: 'dur-base', ms: 200 },
          { token: 'dur-slow', ms: 360 },
        ].map(({ token, ms }) => {
          const speed = token.replace('dur-', '')
          return (
            <div key={token} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', alignItems: 'center', borderBottom: hairline, padding: '24px 0', gap: 32 }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.steel }}>{token}</span>
              <div style={{ height: 6, background: 'var(--bf-surface)', borderRadius: 3, position: 'relative' as const, overflow: 'hidden' }}>
                <div className={`bf-motion-bar bf-motion-bar--${speed}`} />
              </div>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.steel, textAlign: 'right' as const }}>{ms}ms</span>
            </div>
          )
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', alignItems: 'center', borderBottom: hairline, padding: '20px 0', gap: 32 }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: C.steel }}>ease-standard</span>
          <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>cubic-bezier(0.2, 0, 0, 1)</code>
          <span />
        </div>
      </div>

      <SubHeader label="// 02.5.3" title={t('radius.section.title')} />
      <div style={{ padding: `0 ${H_PAD} 64px`, display: 'flex', gap: 40, alignItems: 'flex-end' }}>
        {[
          { label: '--radius', value: '2px', r: 2 },
          { label: t('radius.label.sm'), value: '1px', r: 1 },
          { label: t('radius.label.md'), value: '2px', r: 2 },
          { label: t('radius.label.lg'), value: '4px', r: 4 },
        ].map(({ label, value, r }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 80, height: 80, background: C.black, borderRadius: r }} />
            <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, textAlign: 'center' as const }}>{label}</p>
            <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>
      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

export default function Page() {
  return (
    <>
      <Overview />
      <Colors />
      <Typography />
      <SlashHeading />
      <SpacingMotion />
    </>
  )
}
