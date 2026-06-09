'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* EXP-02 — Scroll Pin: Capítulos
   Cada capítulo pina enquanto uma timeline com scrub roda:
   número mono gigante entra, título sobe, parágrafo assenta,
   barra de progresso cresce via scaleX. Ref: wantedfornothing.com */

const CHAPTERS = [
  {
    num: '01',
    eyebrow: '// CAPÍTULO 01',
    title: 'On Pitch',
    text: 'Dentro das quatro linhas, nada é improviso. Cada minuto de jogo é construído antes do apito.',
  },
  {
    num: '02',
    eyebrow: '// CAPÍTULO 02',
    title: 'Off Pitch',
    text: 'A carreira não termina no vestiário. Marca, patrimônio e futuro se decidem fora do campo.',
  },
  {
    num: '03',
    eyebrow: '// CAPÍTULO 03',
    title: 'Itália 2027',
    text: 'A travessia tem destino: o calcio como palco, a Itália como casa, 2027 como prazo.',
  },
] as const

export default function ScrollPinChaptersPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel, replay } = useTuner(
    {
      scrub: { value: 1, min: 0.1, max: 3, step: 0.1, label: 'scrub' },
      snap: { value: true, label: 'snap' },
      markers: { value: false, label: 'markers' },
      numScale: { value: 0.7, min: 0.5, max: 1, step: 0.01, label: 'escala nº' },
      pinLength: { value: 120, min: 50, max: 200, step: 10, label: 'pin (%vh)' },
    },
    { title: '// EXP-02' },
  )

  useGSAP(
    () => {
      const chapters = gsap.utils.toArray<HTMLElement>('.exp02-chapter')

      chapters.forEach((chapter) => {
        const num = chapter.querySelector<HTMLElement>('.exp02-num')
        const eyebrow = chapter.querySelector<HTMLElement>('.exp02-eyebrow')
        const title = chapter.querySelector<HTMLElement>('.exp02-title')
        const para = chapter.querySelector<HTMLElement>('.exp02-para')
        const bar = chapter.querySelector<HTMLElement>('.exp02-bar')
        if (!num || !eyebrow || !title || !para || !bar) return

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: chapter,
            start: 'top top',
            end: `+=${values.pinLength}%`,
            pin: true,
            scrub: values.scrub,
            snap: values.snap ? 1 / 3 : undefined,
            markers: values.markers,
          },
        })

        tl.addLabel('numero')
          .fromTo(
            num,
            { xPercent: -14, scale: values.numScale, opacity: 0 },
            { xPercent: 0, scale: 1, opacity: 1, duration: 1 },
          )
          .addLabel('titulo')
          .fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 'titulo-=0.15')
          .fromTo(
            title,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8 },
            'titulo',
          )
          .addLabel('paragrafo')
          .fromTo(
            para,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            'paragrafo-=0.1',
          )
          .addLabel('fim')

        // barra de progresso acompanha a timeline inteira — sempre scaleX, nunca width
        tl.fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: 1, duration: tl.duration() },
          0,
        )
      })

      ScrollTrigger.refresh()
    },
    {
      scope: containerRef,
      dependencies: [...Object.values(values), replay],
      revertOnUpdate: true,
    },
  )

  return (
    <ExperimentShell slug="02-scroll-pin-chapters">
      <div ref={containerRef}>
        {CHAPTERS.map((c) => (
          <section className="exp02-chapter" key={c.num}>
            <div aria-hidden="true" className="exp02-num">
              {c.num}
            </div>
            <div className="exp02-content">
              <p className="exp02-eyebrow lab-eyebrow">{c.eyebrow}</p>
              <div className="exp02-title-mask">
                <h2 className="exp02-title">{c.title}</h2>
              </div>
              <p className="exp02-para">{c.text}</p>
            </div>
            <div className="exp02-bar" />
          </section>
        ))}

        <section className="exp02-outro">
          <p className="lab-mono">fim do experimento — volte ao índice</p>
        </section>

        <style>{`
          .exp02-chapter {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 0 8vw;
            overflow: hidden;
            border-bottom: 1px solid var(--lab-border);
            background: var(--bf-power-black);
          }

          .exp02-num {
            position: absolute;
            top: 50%;
            right: 4vw;
            transform: translateY(-50%);
            font-family: var(--bf-font-mono);
            font-weight: 700;
            font-size: clamp(120px, 28vw, 380px);
            line-height: 1;
            letter-spacing: -0.04em;
            color: transparent;
            -webkit-text-stroke: 1px var(--bf-line-on-dark);
            user-select: none;
            pointer-events: none;
            will-change: transform, opacity;
          }

          .exp02-content {
            position: relative;
            z-index: 1;
            display: grid;
            gap: 24px;
          }

          .exp02-eyebrow { margin: 0; }

          .exp02-title-mask { overflow: hidden; }

          .exp02-title {
            margin: 0;
            font-family: var(--bf-font-display);
            font-weight: 700;
            font-size: clamp(40px, 6vw, 96px);
            line-height: 1.0;
            letter-spacing: -0.02em;
            color: var(--bf-white);
            will-change: transform, opacity;
          }

          .exp02-para {
            margin: 0;
            max-width: 40ch;
            font-size: 16px;
            line-height: 1.7;
            color: var(--lab-text-dim);
            will-change: transform, opacity;
          }

          .exp02-bar {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 1;
            width: 100%;
            height: 2px;
            background: var(--current-accent);
            transform: scaleX(0);
            transform-origin: left;
            will-change: transform;
          }

          .exp02-outro {
            min-height: 40vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
      {panel}
    </ExperimentShell>
  )
}
