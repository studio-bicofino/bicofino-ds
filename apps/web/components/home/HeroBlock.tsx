'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { FourCsHeading } from './FourCsHeading'
import { useLang } from '@/content/index'

const EASE_OUT = [0.16, 1, 0.3, 1] as const
// mesmo expo.out fluido dos 4 Cs
const EASE_FLUID = [0.19, 1, 0.22, 1] as const

// Choreography order (Woney, 2026-06-10): video → 4Cs → mensch.
// Mensch entra em cascata de BLOCOS: cada parágrafo é uma unidade
// (y + opacidade), escalonados — sem split por palavra/linha.
const VIDEO_DELAY = 0.08
const FOURCS_DELAY = 0.24
const MENSCH_BASE_DELAY = 0.5
const MENSCH_BLOCK_STAGGER = 0.12

const MENSCH_KEYS = [
  'home.mensch.p1',
  'home.mensch.p2',
  'home.mensch.p3',
  'home.mensch.p4',
] as const

export function HeroBlock({ revealed = true }: { revealed?: boolean }) {
  const { t } = useLang()
  const reducedMotion = useReducedMotion()

  const menschEntrance = (i: number) => ({
    initial: reducedMotion ? false : ({ opacity: 0, y: 24 } as const),
    animate:
      revealed || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: {
      delay: MENSCH_BASE_DELAY + i * MENSCH_BLOCK_STAGGER,
      duration: 0.9,
      ease: EASE_FLUID,
    },
  })

  return (
    <section
      style={{
        background: 'var(--bf-surface)',
        borderRadius: 'var(--bf-radius-lg) var(--bf-radius-lg) 0 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          marginInline: 'auto',
          paddingInline: 'var(--bf-space-lg)',
          paddingBlock: 'var(--bf-space-lg)',
        }}
      >
        <div className="bf-hero-grid">
          {/* Col 1 — Video */}
          <div className="bf-hero-video-col">
            <motion.div
              className="bf-reveal"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={
                revealed || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
              }
              transition={{ duration: 0.36, delay: VIDEO_DELAY, ease: EASE_OUT }}
              style={{
                width: '100%',
                maxWidth: 400,
                aspectRatio: '1 / 1',
                background: 'var(--bf-border)',
                overflow: 'hidden',
              }}
              aria-hidden="true"
            >
              <video
                width={400}
                height={400}
                autoPlay
                muted
                loop
                playsInline
                poster="/media/herovideo.gif"
                aria-hidden="true"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              >
                <source src="/media/herovideo2.webm" type="video/webm" />
                <source src="/media/herovideo.mp4" type="video/mp4" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/herovideo.gif" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </video>
            </motion.div>
          </div>

          {/* Col 2 — 4Cs */}
          <div className="bf-hero-4cs-col">
            <FourCsHeading start={revealed} baseDelay={FOURCS_DELAY} />
          </div>

          {/* Col 3 — Mensch */}
          <div className="bf-hero-mensch-col">
            {MENSCH_KEYS.map((key, i) => (
              <motion.p
                key={key}
                className="bf-reveal"
                {...menschEntrance(i)}
                style={{
                  fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
                  fontSize: 12,
                  lineHeight: 1.7,
                  letterSpacing: 0,
                  fontWeight: 400,
                  color: 'var(--bf-text-secondary)',
                  maxWidth: '60ch',
                  marginBottom: 'var(--bf-space-md)',
                  textWrap: 'pretty',
                } as React.CSSProperties}
              >
                {t(key)}
              </motion.p>
            ))}

            <motion.p
              className="bf-reveal"
              {...menschEntrance(MENSCH_KEYS.length)}
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--bf-text-primary)',
                marginTop: 'var(--bf-space-sm)',
                /* lineHeight 1: a base da coluna = baseline do signoff,
                   flush com a base do "Consult." (grid align-items: end) */
                lineHeight: 1,
              }}
            >
              {t('home.mensch.signoff')}
            </motion.p>
          </div>
        </div>
      </div>

      <style>{`
        .bf-hero-grid {
          display: grid;
          grid-template-columns: 400px 1fr minmax(280px, 360px);
          gap: var(--bf-space-lg);
          align-items: end;
        }
        .bf-hero-video-col {
          display: flex;
          align-items: flex-start;
        }
        .bf-hero-4cs-col {
          display: flex;
          align-items: center;
        }
        .bf-hero-mensch-col {
          display: flex;
          flex-direction: column;
        }
        /* baseline trim: o "Consult." (Gotham Black, lh 1.0) carrega ~0.1em de
           descent abaixo da baseline; sobe a coluna de texto pra alinhar
           baseline com baseline (medido no browser, 2026-06-10) */
        @media (min-width: 1024px) {
          .bf-hero-mensch-col {
            margin-bottom: calc(clamp(40px, 7vw, 88px) * 0.1);
          }
        }

        /* Tablet */
        @media (max-width: 1023px) and (min-width: 768px) {
          .bf-hero-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .bf-hero-video-col {
            grid-column: 1;
            grid-row: 1;
            justify-content: center;
          }
          .bf-hero-4cs-col {
            grid-column: 2;
            grid-row: 1;
          }
          .bf-hero-mensch-col {
            grid-column: 1 / -1;
            grid-row: 2;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .bf-hero-grid {
            grid-template-columns: 1fr;
            gap: calc(var(--bf-space-lg) * 1.5);
          }
          .bf-hero-video-col {
            justify-content: center;
          }
          .bf-hero-video-col > div {
            max-width: 280px !important;
          }
          .bf-hero-4cs-col {
            justify-content: flex-start;
          }
          /* measure rule (§6): the inline 60ch cap holds on mobile too */
        }
      `}</style>
    </section>
  )
}
