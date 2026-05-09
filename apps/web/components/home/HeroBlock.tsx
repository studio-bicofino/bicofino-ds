'use client'

import React from 'react'
import { FourCsHeading } from './FourCsHeading'
import { useLang } from '@/content/index'

export function HeroBlock() {
  const { t } = useLang()

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
            <div
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
                autoPlay
                muted
                loop
                playsInline
                poster="/media/herovideo.gif"
                aria-hidden="true"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              >
                <source src="/media/herovideo.webm" type="video/webm" />
                <source src="/media/herovideo.mp4" type="video/mp4" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/herovideo.gif" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </video>
            </div>
          </div>

          {/* Col 2 — 4Cs */}
          <div className="bf-hero-4cs-col">
            <FourCsHeading />
          </div>

          {/* Col 3 — Mensch */}
          <div className="bf-hero-mensch-col">
            <p
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--bf-text-secondary)',
                marginBottom: 'var(--bf-space-md)',
              }}
            >
              {t('home.mensch.eyebrow')}
            </p>

            {(['home.mensch.p1', 'home.mensch.p2', 'home.mensch.p3'] as const).map((key) => (
              <p
                key={key}
                style={{
                  fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: 'var(--bf-text-secondary)',
                  maxWidth: 360,
                  marginBottom: 'var(--bf-space-md)',
                  textWrap: 'pretty',
                } as React.CSSProperties}
              >
                {t(key)}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .bf-hero-grid {
          display: grid;
          grid-template-columns: 400px 1fr minmax(280px, 360px);
          gap: var(--bf-space-lg);
          align-items: center;
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
          .bf-hero-mensch-col p {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
