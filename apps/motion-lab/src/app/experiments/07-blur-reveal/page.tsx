'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { BicofinoLogo } from '@/components/BicofinoLogo'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, SplitText)

/* EXP-07 — Blur Reveal (abertura)
   Referência: wantedfornothing.com/vibes — elementos chegam desfocados
   e translúcidos e "resolvem" em foco, como uma lente ajustando.
   Nota de custo: animar `filter: blur()` força repaint na GPU a cada
   frame — ok num momento único de abertura, evitar em loop/scroll. */

export default function BlurRevealPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel, replay } = useTuner(
    {
      blur: { value: 20, min: 4, max: 40, step: 1, label: 'blur inicial (px)' },
      duration: { value: 1.4, min: 0.6, max: 3, step: 0.05, label: 'duration' },
      stagger: { value: 0.12, min: 0.05, max: 0.4, step: 0.01, label: 'stagger' },
      scale: { value: 1.06, min: 1.0, max: 1.15, step: 0.005, label: 'scale inicial' },
      ease: {
        value: 'power3.out',
        options: ['power2.out', 'power3.out', 'expo.out', 'sine.out'] as const,
        label: 'ease',
      },
    },
    { title: '// EXP-07' },
  )

  useGSAP(
    () => {
      const blurFrom = `blur(${values.blur}px)`

      const split = SplitText.create('[data-exp07-title]', { type: 'words' })

      const tl = gsap.timeline({ defaults: { ease: values.ease } })

      // 1 — o logo resolve primeiro: a lente encontra o foco
      tl.from('[data-exp07-logo]', {
        opacity: 0,
        filter: blurFrom,
        scale: values.scale,
        duration: values.duration,
      })

      // 2 — o título resolve palavra a palavra (o coração do efeito)
      tl.from(
        split.words,
        {
          opacity: 0,
          filter: blurFrom,
          scale: values.scale,
          duration: values.duration,
          stagger: values.stagger,
        },
        '-=40%',
      )

      // 3 — a linha mono fecha a abertura
      tl.from(
        '[data-exp07-eyebrow]',
        {
          opacity: 0,
          filter: blurFrom,
          duration: values.duration * 0.8,
        },
        '-=30%',
      )

      // 4 — painéis frosted abaixo da dobra: mesmo gesto, no load (sem ScrollTrigger)
      tl.from(
        '.exp07-panel',
        {
          opacity: 0,
          filter: blurFrom,
          y: 24,
          duration: values.duration,
          stagger: values.stagger,
        },
        '-=20%',
      )

      return () => {
        split.revert()
      }
    },
    {
      scope: containerRef,
      dependencies: [
        values.blur,
        values.duration,
        values.stagger,
        values.scale,
        values.ease,
        replay,
      ],
      revertOnUpdate: true,
    },
  )

  return (
    <ExperimentShell slug="07-blur-reveal">
      <style>{`
        .exp07-stage {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 32px;
          padding: 64px 32px;
        }
        .exp07-title {
          margin: 0;
          font-family: var(--bf-font-display);
          font-weight: 700;
          font-size: clamp(40px, 6vw, 88px);
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: var(--bf-white);
          max-width: 14ch;
        }
        .exp07-content {
          position: relative;
          padding: 96px 32px 128px;
          border-top: 1px solid var(--lab-border);
          /* régua de hairlines — repeating de cor sólida p/ transparente
             (técnica de linha, não gradiente decorativo) */
          background: repeating-linear-gradient(
            to right,
            var(--bf-line-on-dark) 0px,
            var(--bf-line-on-dark) 1px,
            transparent 1px,
            transparent 64px
          );
        }
        .exp07-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          max-width: 1040px;
          margin: 0 auto;
        }
        .exp07-panel {
          position: relative;
          padding: 32px 24px;
          background: var(--lab-surface);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--lab-border);
          border-radius: 4px;
        }
        .exp07-panel h3 {
          margin: 0 0 8px;
          font-family: var(--bf-font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--bf-white);
        }
        .exp07-panel p {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: var(--lab-text-dim);
          max-width: 38ch;
        }
        .exp07-panel .lab-mono { display: block; margin-bottom: 16px; }
      `}</style>

      <div ref={containerRef}>
        {/* ─── Palco da abertura ─── */}
        <section className="exp07-stage">
          <div data-exp07-logo style={{ willChange: 'filter, transform' }}>
            <BicofinoLogo width={220} color="var(--bf-white)" />
          </div>

          <h2 data-exp07-title className="exp07-title">
            O foco chega <span style={{ color: 'var(--current-accent)' }}>devagar</span> e de
            uma vez
          </h2>

          <span data-exp07-eyebrow className="lab-eyebrow">
            {'// STUDIO BICOFINO — EST. 2024'}
          </span>
        </section>

        {/* ─── Conteúdo abaixo da dobra — painéis frosted ─── */}
        <section className="exp07-content">
          <div className="exp07-grid">
            <article className="exp07-panel">
              <span className="lab-mono">01 / LENTE</span>
              <h3>Desfoque como chegada</h3>
              <p>
                Nada entra pronto: cada elemento aparece translúcido e fora de foco, e a
                cena se resolve como uma lente ajustando.
              </p>
            </article>

            <article className="exp07-panel">
              <span className="lab-mono">02 / RITMO</span>
              <h3>Palavra a palavra</h3>
              <p>
                O título resolve em stagger — o olho acompanha o foco se propagando, em vez
                de receber tudo de uma vez.
              </p>
            </article>

            <article className="exp07-panel">
              <span className="lab-mono">03 / CUSTO</span>
              <h3>Blur custa GPU</h3>
              <p>
                Animar filter força repaint por frame. Reservar para a abertura — nunca em
                loop ambient ou atrelado ao scroll.
              </p>
            </article>
          </div>
        </section>
      </div>

      {panel}
    </ExperimentShell>
  )
}
