'use client'

import { AthleteStatCard } from './AthleteStatCard'
import { AthleteCampaignCarousel } from './AthleteCampaignCarousel'
import { useLang } from '@/content'

const C = {
  black:     'var(--bf-text-primary)',
  bg:        'var(--bf-bg-page)',
  white:     'var(--bf-surface)',
  steel:     'var(--bf-text-secondary)',
  platinum:  'var(--bf-text-subtle)',
  aluminium: '#e2eaf2',
}
const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'

// Cache-bust the Palmeiras SVG so the newest file is always loaded.
const PALMEIRAS_V = '?v=3'

const A = {
  portrait:  '/brandsystem/assets/on-field/athletes/guilherme-kerchner/portraits/gui-kerchner-portrait-cut01.png',
  wordmark:  '/brandsystem/assets/on-field/athletes/guilherme-kerchner/brand/gui-kerchner-wordmark.svg',
  badgePro:  '/brandsystem/assets/on-field/badges/badge-bicofino-pro.svg',
  badgeFc:   '/brandsystem/assets/on-field/badges/badge-bicofino-fc.svg',
  badgeDay:  '/brandsystem/assets/on-field/badges/badge-bicofino-day.svg',
  palmeiras: `/brandsystem/assets/on-field/clubs/club-palmeiras.svg${PALMEIRAS_V}`,
  nike:      '/brandsystem/assets/on-field/sponsors/sponsor-nike.svg',
  passport:  '/brandsystem/assets/on-field/passports/passport-italy.svg',
  icons: {
    fingerprint: '/brandsystem/assets/on-field/icons/icon-fingerprint.svg',
    pitch:       '/brandsystem/assets/on-field/icons/icon-pitch.svg',
    footbal:     '/brandsystem/assets/on-field/icons/icon-footbal.svg',
    sneaker:     '/brandsystem/assets/on-field/icons/icon-sneaker.svg',
    trophy:      '/brandsystem/assets/on-field/icons/icon-trophy.svg',
    medal:       '/brandsystem/assets/on-field/icons/icon-medal.svg',
  },
}

function SafeImg({ src, alt, style, width, height, className }: {
  src: string; alt: string; style?: React.CSSProperties; width?: number; height?: number; className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={className}
      onError={e => {
        const el = e.target as HTMLImageElement
        el.style.display = 'none'
        const span = document.createElement('span')
        span.style.cssText = `font-family:${mono};font-size:9px;color:${C.platinum};letter-spacing:0.08em`
        span.textContent = alt
        el.parentNode?.insertBefore(span, el.nextSibling)
      }}
    />
  )
}

function StatRow({ icon, value, label }: {
  icon: string; value: string; label: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
      <div>
        <SafeImg src={icon} alt="" width={16} height={16} style={{ opacity: 0.6, display: 'block' }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans, letterSpacing: '-0.01em' }}>
        {value}
      </span>
      <span style={{ fontFamily: mono, fontSize: 10, color: C.steel, letterSpacing: '0.08em' }}>
        {label}
      </span>
    </div>
  )
}

export function OnFieldSection() {
  const { t } = useLang()
  const players = ['GUI KERCHNER', 'JULIO CEZAR', 'CAIO HENRIQUE', 'LUKINHAS', 'JEAN JESUS']

  // Asset catalog with translated labels
  const CATALOG = [
    { category: t('onfield.cat.portraits'),   path: 'athletes/{id}/portraits/',    fmt: 'PNG (transparent cutout)', note: t('onfield.cat.portraits.note') },
    { category: t('onfield.cat.campaigns'),   path: 'athletes/{id}/campaigns/',    fmt: 'PNG / JPG',                note: t('onfield.cat.campaigns.note') },
    { category: t('onfield.cat.brand'),       path: 'athletes/{id}/brand/',        fmt: 'SVG',                      note: t('onfield.cat.brand.note') },
    { category: t('onfield.cat.badges'),      path: 'badges/',                     fmt: 'SVG',                      note: t('onfield.cat.badges.note') },
    { category: t('onfield.cat.clubs'),       path: 'clubs/',                      fmt: 'SVG',                      note: t('onfield.cat.clubs.note') },
    { category: t('onfield.cat.sponsors'),    path: 'sponsors/',                   fmt: 'SVG',                      note: t('onfield.cat.sponsors.note') },
    { category: t('onfield.cat.passports'),   path: 'passports/',                  fmt: 'SVG',                      note: t('onfield.cat.passports.note') },
    { category: t('onfield.cat.venues'),      path: 'venues/',                     fmt: 'SVG / PNG',                note: t('onfield.cat.venues.note') },
    { category: t('onfield.cat.tournaments'), path: 'tournaments/',                fmt: 'SVG',                      note: t('onfield.cat.tournaments.note') },
    { category: t('onfield.cat.icons'),       path: 'icons/',                      fmt: 'SVG (stroke)',             note: t('onfield.cat.icons.note') },
  ]

  return (
    <section id="on-field" style={{ overflowX: 'hidden', flexShrink: 0 }}>

      {/* ── Section Header — always visible, no animation dependency ── */}
      <div className="of-header-block">
        <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' }}>
          {t('onfield.eyebrow')}
        </p>
        <h1 className="text-balance" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
          {t('onfield.title')}
        </h1>
      </div>

      {/* ── Intro block — always visible ── */}
      <div className="of-intro-block">
        <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 12px', fontWeight: 600, textTransform: 'uppercase' }}>
          {t('onfield.intro.eyebrow')}
        </p>
        <p className="editorial-prose text-pretty" style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, maxWidth: 560, margin: 0 }}>
          {t('onfield.intro.lead')}
        </p>
      </div>

      {/* ══════════════════════════════════════════════
          ATHLETE PROFILE DEMO — always visible
      ══════════════════════════════════════════════ */}
      <div className="of-demo-block">

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: hairline, overflowX: 'auto' }}>
          {['on pitch', 'off pitch'].map((tab, i) => (
            <div key={tab} style={{
              padding: '8px 20px',
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: '0.1em',
              color: i === 0 ? C.black : C.platinum,
              borderBottom: i === 0 ? `2px solid ${C.black}` : '2px solid transparent',
              marginBottom: -1,
              cursor: 'default',
              whiteSpace: 'nowrap',
            }}>
              {tab}
            </div>
          ))}
        </div>

        {/* Main layout */}
        <div className="of-main-layout">

          {/* ── Left nav ── */}
          <div className="of-left-nav">
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 14px', textTransform: 'uppercase' }}>
              Player
            </p>
            {players.map((name, i) => (
              <div key={name} className="of-player-item" style={{
                padding: '7px 0', cursor: 'default',
                borderLeft: i === 0 ? `2px solid ${C.black}` : '2px solid transparent',
                paddingLeft: 10,
              }}>
                <span style={{
                  fontFamily: mono, fontSize: 11, letterSpacing: '0.06em',
                  color: i === 0 ? C.black : C.platinum,
                  fontWeight: i === 0 ? 600 : 400,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>
                  {name}
                </span>
                {i === 0 && <span style={{ fontFamily: mono, fontSize: 9, color: C.platinum, marginLeft: 4 }}>›</span>}
              </div>
            ))}
          </div>

          {/* ── Central panel ── */}
          <div className="of-central-panel">

            {/* Panel inner grid */}
            <div className="of-panel-grid">

              {/* Left info column */}
              <div className="of-info-col">
                {/* Breadcrumb */}
                <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 16px', letterSpacing: '0.1em' }}>
                  PLAYER ›
                </p>

                {/* Name */}
                <h2 style={{
                  fontFamily: sans, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700,
                  letterSpacing: '-0.025em', color: C.black,
                  margin: '0 0 4px', lineHeight: 1.1,
                }}>
                  Guilherme Kerchner
                </h2>
                <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 20px', letterSpacing: '0.1em' }}>
                  // THE &quot;PLAYMAKER&quot;
                </p>

                {/* Year */}
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.04em', color: C.black, fontFamily: sans, display: 'block' }}>
                    2009
                  </span>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <StatRow icon={A.icons.fingerprint} value="1,80 M" label="68 KGS" />
                  <StatRow icon={A.icons.pitch}       value="MIDFIELDER" label="POS" />
                  <StatRow icon={A.icons.footbal}     value="30" label="GOALS" />
                  <StatRow icon={A.icons.sneaker}     value="30" label="ASSISTS" />
                  <StatRow icon={A.icons.trophy}      value="10" label="TITLES" />
                  <StatRow icon={A.icons.medal}       value="10" label="AWARDS" />
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Personal brand — 1.25x size */}
                <div style={{ marginTop: 24 }}>
                  <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 10px', letterSpacing: '0.1em' }}>
                    // PERSONAL BRANDS
                  </p>
                  <SafeImg
                    src={A.wordmark}
                    alt="Guilherme Kerchner wordmark"
                    height={90}
                    className="of-logo-mono"
                    style={{ display: 'block', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left center' }}
                  />
                </div>

                {/* Badges — 1.5x size */}
                <div style={{ marginTop: 20 }}>
                  <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 10px', letterSpacing: '0.1em' }}>
                    // BICOFINO BADGES
                  </p>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Pro e Day são monocromáticos escuros (viram claros no dark);
                        o FC é colorido (marsala/creme) e fica como está */}
                    {[
                      { src: A.badgePro, mono: true },
                      { src: A.badgeFc,  mono: false },
                      { src: A.badgeDay, mono: true },
                    ].map(({ src, mono }, i) => (
                      <SafeImg key={i} src={src} alt={`Badge ${i+1}`} width={81} height={81} className={mono ? 'of-logo-mono' : undefined} style={{ display: 'block' }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Center: Athlete portrait ── */}
              <div className="of-portrait-col">
                <div className="of-athlete-wrap">
                  <SafeImg
                    src={A.portrait}
                    alt="Guilherme Kerchner"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center bottom',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              {/* ── Right column: Club, Sponsor, Passport, Stats, Campaign ── */}
              <div className="of-right-col">
                {/* Club */}
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 10px', letterSpacing: '0.08em' }}>
                    // PALMEIRAS // BRASIL
                  </p>
                  <SafeImg src={A.palmeiras} alt="Palmeiras" width={48} height={48} className="of-logo-mono" style={{ display: 'block' }} />
                </div>

                {/* Sponsor */}
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 10px', letterSpacing: '0.08em' }}>
                    // SPONSORS
                  </p>
                  <SafeImg src={A.nike} alt="Nike" height={20} className="of-logo-mono" style={{ display: 'block', opacity: 0.8 }} />
                </div>

                {/* Passport */}
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 10px', letterSpacing: '0.08em' }}>
                    // PASSPORT
                  </p>
                  <SafeImg src={A.passport} alt="Italy" width={32} height={32} style={{ display: 'block', borderRadius: '50%' }} />
                </div>

                {/* Campaign carousel — keeps its own internal animation */}
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 8px', letterSpacing: '0.08em' }}>
                    // CAMPAIGN
                  </p>
                  <AthleteCampaignCarousel />
                </div>

                {/* Stats card — keeps its own internal animation */}
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 8px', letterSpacing: '0.08em' }}>
                    // STATS
                  </p>
                  <AthleteStatCard />
                </div>
              </div>

            </div>{/* /panel-grid */}
          </div>{/* /central-panel */}
        </div>{/* /main-layout */}

        {/* Footer line */}
        <div style={{ borderTop: hairline, marginTop: 24, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
            // PLAYER PROFILE // @BICOFINO
          </p>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
            ON PITCH v1.0
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          ASSET CATALOG
      ══════════════════════════════════════════════ */}
      <div className="of-catalog-block">
        <div style={{ borderTop: hairline, paddingTop: 48, marginBottom: 28 }}>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', color: C.steel, margin: '0 0 6px', fontWeight: 600, textTransform: 'uppercase' }}>
            {t('onfield.catalog.eyebrow')}
          </p>
          <h2 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>
            {t('onfield.catalog.title')}
          </h2>
        </div>

        {/* Table — responsive overflow scroll on mobile */}
        <div style={{ overflowX: 'auto' }}>
          {/* Table header */}
          <div className="of-catalog-row of-catalog-head">
            {[
              t('onfield.catalog.col.category'),
              t('onfield.catalog.col.path'),
              t('onfield.catalog.col.format'),
              t('onfield.catalog.col.note'),
            ].map(h => (
              <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
            ))}
          </div>

          {CATALOG.map(({ category, path, fmt, note }) => (
            <div key={category} className="of-catalog-row">
              <span style={{ fontSize: 13, fontWeight: 600, color: C.black, fontFamily: sans }}>{category}</span>
              <code style={{ fontFamily: mono, fontSize: 10, color: C.steel, wordBreak: 'break-all' as const }}>
                assets/on-field/{path}
              </code>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.black }}>{fmt}</span>
              <span style={{ fontSize: 12, color: C.steel, lineHeight: 1.5 }}>{note}</span>
            </div>
          ))}
        </div>

        {/* Page footer */}
        <div style={{ paddingTop: 32, borderTop: hairline, marginTop: 32 }}>
          <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
            // BICOFINO DESIGN SYSTEM · ON PITCH IMAGE SYSTEM · v1.0 · 04/2026
          </p>
        </div>
      </div>
    </section>
  )
}
