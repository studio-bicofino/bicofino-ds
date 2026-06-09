'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)

/* EXP-08 — Gotham Impact: o bloco assinatura heavy/light da marca.
   Título Black gigante subindo do corte (chars mascarados) + contracanto
   Light itálico chegando depois, num contratempo tunável. */

export default function GothamImpactPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel, replay } = useTuner(
    {
      duration: { value: 1.0, min: 0.4, max: 2, step: 0.05, label: 'duration' },
      stagger: { value: 0.05, min: 0.02, max: 0.12, step: 0.005, label: 'stagger (char)' },
      yPercent: { value: 100, min: 30, max: 120, step: 1, label: 'y entrada (%)' },
      ease: {
        value: 'power4.out',
        options: ['power4.out', 'expo.out', 'back.out(1.2)', 'circ.out'] as const,
        label: 'ease',
      },
      counterDelay: { value: 0.6, min: 0, max: 1.2, step: 0.05, label: 'contracanto delay' },
    },
    { title: '// EXP-08' },
  )

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>('.exp08-block')
      const splits: SplitText[] = []

      blocks.forEach((block, i) => {
        const title = block.querySelector('.exp08-title')
        const counter = block.querySelector('.exp08-counter')
        const line = block.querySelector('.exp08-line')
        if (!title) return

        // máscara por caractere — cada letra sobe de dentro do corte
        const split = SplitText.create(title, { type: 'chars', mask: 'chars' })
        splits.push(split)

        const tl = gsap.timeline(
          i === 0
            ? undefined
            : {
                scrollTrigger: {
                  trigger: block,
                  start: 'top 70%',
                },
              },
        )

        tl.from(
          split.chars,
          {
            yPercent: values.yPercent,
            duration: values.duration,
            stagger: values.stagger,
            ease: values.ease,
          },
          0,
        )

        if (line) {
          tl.from(
            line,
            {
              scaleX: 0,
              duration: values.duration,
              ease: values.ease,
            },
            0,
          )
        }

        if (counter) {
          tl.from(
            counter,
            {
              opacity: 0,
              x: -16,
              duration: 0.8,
              ease: 'power2.out',
            },
            values.counterDelay,
          )
        }
      })

      return () => {
        splits.forEach((s) => s.revert())
      }
    },
    {
      scope: containerRef,
      dependencies: [
        values.duration,
        values.stagger,
        values.yPercent,
        values.ease,
        values.counterDelay,
        replay,
      ],
      revertOnUpdate: true,
    },
  )

  return (
    <ExperimentShell slug="08-gotham-impact">
      <style>{`
        .exp08-block {
          position: relative;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 32px;
        }
        .exp08-pair {
          position: relative;
          width: fit-content;
        }
        .exp08-title {
          margin: 0;
          font-family: var(--bf-font-impact);
          font-weight: 900;
          font-size: clamp(64px, 13vw, 220px);
          line-height: 0.9;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--bf-white);
        }
        .exp08-title .exp08-accent {
          color: var(--current-accent);
        }
        .exp08-counter {
          position: absolute;
          bottom: -0.4em;
          left: 62%;
          font-family: var(--bf-font-impact);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(16px, 2vw, 28px);
          line-height: 1.2;
          text-transform: lowercase;
          letter-spacing: 0.01em;
          color: var(--lab-text-dim);
          white-space: nowrap;
        }
        .exp08-line {
          height: 1px;
          background: var(--bf-line-on-dark);
          transform-origin: left center;
          margin-top: 48px;
        }
        .exp08-spec {
          position: absolute;
          top: 24px;
          right: 32px;
          font-family: var(--bf-font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--lab-text-dim);
        }
        .exp08-eyebrow {
          margin-bottom: 24px;
        }
      `}</style>

      <div ref={containerRef}>
        {/* Bloco 1 — KERCHNER / present future */}
        <section className="exp08-block">
          <span className="exp08-spec">GOTHAM 900 / 300 — IMPACT PAIR</span>
          <div className="exp08-pair">
            <h2 className="exp08-title">Kerchner</h2>
            <span className="exp08-counter">present future</span>
          </div>
          <div className="exp08-line" />
        </section>

        {/* Bloco 2 — ON PITCH / il calcio è cultura */}
        <section className="exp08-block">
          <span className="exp08-spec">GOTHAM 900 / 300 — ACCENT WORD</span>
          <div className="exp08-pair">
            <h2 className="exp08-title">
              On <span className="exp08-accent">Pitch</span>
            </h2>
            <span className="exp08-counter">il calcio è cultura</span>
          </div>
          <div className="exp08-line" />
        </section>

        {/* Bloco 3 — ITÁLIA / 2027 — la prossima partita */}
        <section className="exp08-block">
          <span className="exp08-spec">GOTHAM 900 / 300 — IMPACT PAIR</span>
          <span className="lab-eyebrow exp08-eyebrow">{'// BF-2027'}</span>
          <div className="exp08-pair">
            <h2 className="exp08-title">Itália</h2>
            <span className="exp08-counter">2027 — la prossima partita</span>
          </div>
          <div className="exp08-line" />
        </section>
      </div>

      {panel}
    </ExperimentShell>
  )
}
