'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* EXP-10 — Card Stack: Pilha no Scroll
   Container pinado; cards absolutos empilhados no centro. Uma timeline
   com scrub: cada card entra de baixo (yPercent 120 → 0) e os anteriores
   recuam em escala + sobem de leve — o deck se forma. Ref: madness.ai */

const CARDS = [
  {
    num: '01/05',
    title: 'Scouting',
    text: 'O olho treinado chega antes do mercado. Mapear talento é ler o jogo que ainda não aconteceu.',
    tag: 'scouting — radar ligado',
  },
  {
    num: '02/05',
    title: 'Atletas',
    text: 'Cada carreira é um projeto único. O atleta no centro, a estratégia ao redor dele.',
    tag: 'atletas — projeto de carreira',
  },
  {
    num: '03/05',
    title: 'On Pitch',
    text: 'Dentro das quatro linhas, nada é improviso. Cada minuto é construído antes do apito.',
    tag: 'on pitch — desempenho',
  },
  {
    num: '04/05',
    title: 'Off Pitch',
    text: 'A carreira não termina no vestiário. Marca, patrimônio e futuro se decidem fora do campo.',
    tag: 'off pitch — patrimônio',
  },
  {
    num: '05/05',
    title: 'Itália 2027',
    text: 'A travessia tem destino: o calcio como palco, a Itália como casa, 2027 como prazo.',
    tag: 'itália 2027 — destino',
  },
] as const

export default function CardStackPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel, replay } = useTuner(
    {
      scrub: { value: 1, min: 0.1, max: 3, step: 0.1, label: 'scrub' },
      step: { value: 0.05, min: 0.02, max: 0.12, step: 0.005, label: 'recuo (escala)' },
      offset: { value: 24, min: 8, max: 48, step: 2, label: 'offset topo (px)' },
      distancia: { value: 100, min: 60, max: 160, step: 10, label: 'scroll/card (%)' },
      snap: { value: true, label: 'snap' },
    },
    { title: '// EXP-10' },
  )

  useGSAP(
    () => {
      const stage = containerRef.current?.querySelector<HTMLElement>('.exp10-stage')
      const cards = gsap.utils.toArray<HTMLElement>('.exp10-card')
      if (!stage || cards.length === 0) return

      const total = cards.length
      const entries = total - 1 // cards que entram (2º ao 5º)

      // estado inicial: 1º card assentado, os demais esperando embaixo
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50, // mantém a centralização do CSS dentro do transform do GSAP
          y: values.offset * i,
          yPercent: i === 0 ? 0 : 120,
          transformOrigin: 'center top',
        })
      })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: `+=${total * values.distancia}%`,
          pin: true,
          scrub: values.scrub,
          snap: values.snap ? 1 / entries : undefined,
        },
      })

      // cada card i entra; os anteriores recuam conforme a profundidade
      for (let i = 1; i < total; i++) {
        tl.to(cards[i], { yPercent: 0, duration: 1 }, i - 1)

        for (let j = 0; j < i; j++) {
          const depth = i - j
          tl.to(
            cards[j],
            {
              scale: 1 - values.step * depth,
              y: values.offset * j - depth * 4,
              duration: 1,
            },
            i - 1,
          )
        }
      }

      ScrollTrigger.refresh()
    },
    {
      scope: containerRef,
      dependencies: [...Object.values(values), replay],
      revertOnUpdate: true,
    },
  )

  return (
    <ExperimentShell slug="10-card-stack">
      <div ref={containerRef}>
        <section className="exp10-intro">
          <p className="lab-eyebrow">{'// EXP-10 — O DECK SE FORMA'}</p>
          <p className="exp10-intro-para">
            Role devagar: cada card sobe por cima do anterior, e o deck inteiro
            recua para abrir espaço ao próximo.
          </p>
        </section>

        <section className="exp10-stage">
          {CARDS.map((c, i) => (
            <article
              className={`exp10-card${i === CARDS.length - 1 ? ' exp10-card--accent' : ''}`}
              key={c.num}
            >
              <div className="exp10-card-inner">
                <span className="exp10-num">{c.num}</span>
                <div>
                  <h2 className="exp10-title">{c.title}</h2>
                  <p className="exp10-para">{c.text}</p>
                </div>
                <span className="exp10-tag lab-mono">{c.tag}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="exp10-outro">
          <p className="lab-mono">fim — volte ao índice</p>
        </section>

        <style>{`
          .exp10-intro {
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 16px;
            padding: 0 8vw;
            text-align: center;
          }

          .exp10-intro-para {
            margin: 0;
            max-width: 40ch;
            font-size: 15px;
            line-height: 1.7;
            color: var(--lab-text-dim);
          }

          .exp10-stage {
            position: relative;
            height: 100vh;
            overflow: hidden;
          }

          .exp10-card {
            position: absolute;
            top: 12vh;
            left: 50%;
            transform: translateX(-50%);
            width: min(720px, 90vw);
            height: 70vh;
            background: var(--bf-power-black);
            border: 1px solid var(--lab-border);
            border-radius: 8px;
            overflow: hidden;
            will-change: transform;
          }

          .exp10-card-inner {
            height: 100%;
            background: var(--lab-surface-2);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 32px;
          }

          .exp10-num {
            font-family: var(--bf-font-mono);
            font-weight: 700;
            font-size: clamp(24px, 3vw, 36px);
            letter-spacing: -0.02em;
            color: var(--lab-text-dim);
          }

          .exp10-title {
            margin: 0 0 12px;
            font-family: var(--bf-font-display);
            font-weight: 700;
            font-size: clamp(28px, 4vw, 48px);
            line-height: 1.05;
            letter-spacing: -0.02em;
            color: var(--bf-white);
          }

          .exp10-para {
            margin: 0;
            max-width: 38ch;
            font-size: 15px;
            line-height: 1.7;
            color: var(--lab-text-dim);
          }

          .exp10-tag { letter-spacing: 0.08em; text-transform: uppercase; }

          .exp10-card--accent { border-color: var(--current-accent); }
          .exp10-card--accent .exp10-num { color: var(--current-accent); }

          .exp10-outro {
            min-height: 50vh;
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
