'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP)

/* EXP-11 — Produção viva: os 7 Stories da rodada 11–17/jun rodando dentro
   de mockups de iPhone (CSS puro, sem imagem), com 3 coreografias:

   1. catavento — phones como pétalas num círculo girando sem parar
   2. cascata   — fileira diagonal sobreposta entrando em stagger
   3. esteira   — marquee infinito horizontal, pausável no hover

   Trocar o modo recria a cena inteira (revertOnUpdate). */

const VIDEOS = [
  { src: '/showcase/card-01.mp4', label: 'Guilherme — Brasileirão 16/jun' },
  { src: '/showcase/card-02.mp4', label: 'Guilherme — Paulista 13/jun' },
  { src: '/showcase/card-03.mp4', label: 'Guilherme — Brasileirão 11/jun' },
  { src: '/showcase/card-04.mp4', label: 'Julio — Brasileirão 17/jun' },
  { src: '/showcase/card-06.mp4', label: 'Julio — Paulista 13/jun' },
  { src: '/showcase/card-07.mp4', label: 'Ronaldo — Copa Rio 12/jun' },
] as const

const MODOS = ['catavento', 'cascata', 'esteira'] as const
type Modo = (typeof MODOS)[number]

/* ── Mockup de iPhone — CSS puro, definição vem da borda, sem sombra ── */
function PhoneMock({
  src,
  label,
  destaque,
}: {
  src: string
  label: string
  destaque?: boolean
}) {
  return (
    <figure className="exp11-phone">
      <div
        className="exp11-phone__body"
        style={destaque ? { borderColor: 'var(--current-accent)' } : undefined}
      >
        <div className="exp11-phone__screen">
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <span className="exp11-phone__island" aria-hidden="true" />
      </div>
      <figcaption className="exp11-phone__label">{label}</figcaption>
    </figure>
  )
}

export default function IphoneShowcasePage() {
  const stageRef = useRef<HTMLDivElement>(null)

  const { values, panel, replay } = useTuner(
    {
      modo: { value: 'catavento', options: MODOS, label: 'modo' },
      velocidade: { value: 28, min: 8, max: 60, step: 1, label: 'velocidade do loop (s)' },
      raio: { value: 160, min: 100, max: 420, step: 10, label: 'raio do catavento (px)' },
      stagger: { value: 0.12, min: 0.05, max: 0.4, step: 0.01, label: 'stagger da cascata (s)' },
      vertical: { value: false, label: 'phones na vertical (catavento)' },
      pausaHover: { value: true, label: 'pausar esteira no hover' },
    },
    { title: '// EXP-11' },
  )

  // Reduced motion: sem rotação infinita nem marquee — cascata estática.
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const modo: Modo = reduced ? 'cascata' : (values.modo as Modo)

  useGSAP(
    (_context, contextSafe) => {
      const stage = stageRef.current
      if (!stage || !contextSafe) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const { velocidade, stagger, vertical, pausaHover } = values

      if (modo === 'catavento') {
        // O círculo inteiro gira sem parar...
        gsap.to('.exp11-wheel', {
          rotation: 360,
          duration: velocidade,
          ease: 'none',
          repeat: -1,
        })
        // ...e, se pedido, cada phone contra-gira na MESMA duração
        // para permanecer de pé enquanto orbita.
        if (vertical) {
          gsap.to('.exp11-counter', {
            rotation: '-=360',
            duration: velocidade,
            ease: 'none',
            repeat: -1,
          })
        }
      }

      if (modo === 'cascata') {
        gsap.from('.exp11-cascata .exp11-item', {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger,
        })
      }

      if (modo === 'esteira') {
        // Track com a sequência DUPLICADA (14 phones): -50% = exatamente
        // uma sequência, então o loop fecha sem emenda visível.
        const tween = gsap.to('.exp11-track', {
          xPercent: -50,
          duration: velocidade,
          ease: 'none',
          repeat: -1,
        })

        if (pausaHover) {
          const viewport = stage.querySelector('.exp11-esteira')
          if (viewport) {
            const onEnter = contextSafe(() => tween.pause())
            const onLeave = contextSafe(() => tween.resume())
            viewport.addEventListener('mouseenter', onEnter)
            viewport.addEventListener('mouseleave', onLeave)
            return () => {
              viewport.removeEventListener('mouseenter', onEnter)
              viewport.removeEventListener('mouseleave', onLeave)
            }
          }
        }
      }
    },
    {
      scope: stageRef,
      dependencies: [
        modo,
        values.velocidade,
        values.raio,
        values.stagger,
        values.vertical,
        values.pausaHover,
        replay,
      ],
      revertOnUpdate: true,
    },
  )

  const raio = values.raio
  // Altura do palco do catavento: diâmetro + phone (em scale 0.7) — nada vaza.
  const alturaCatavento = `max(100vh, ${raio * 2 + 420}px)`

  return (
    <ExperimentShell slug="11-iphone-showcase">
      <style>{`
        .exp11-intro {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 64px 32px 32px;
          max-width: 760px;
        }
        .exp11-intro h2 {
          margin: 0;
          font-size: clamp(32px, 5vw, 64px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--bf-white);
        }
        .exp11-intro p {
          margin: 0;
          max-width: 42ch;
          font-size: 15px;
          line-height: 1.7;
          color: var(--lab-text-dim);
        }

        /* ── Mockup de iPhone ── */
        .exp11-phone {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .exp11-phone__body {
          position: relative;
          width: 230px;
          aspect-ratio: 9 / 19.2;
          border-radius: 36px;
          border: 2px solid var(--bf-steel);
          background: var(--bf-power-black);
          padding: 8px;
        }
        .exp11-phone__screen {
          width: 100%;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
          background: var(--bf-power-black);
        }
        .exp11-phone__screen video {
          display: block;
          width: 100%;
          height: 100%;
          /* contain: a arte 9:16 inteira na tela 9:19.2 — as faixas em cima/
             embaixo ficam naturalmente pretas (o fundo da tela é power-black) */
          object-fit: contain;
        }
        .exp11-phone__island {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 72px;
          height: 22px;
          border-radius: 9999px;
          background: var(--bf-power-black);
          border: 1px solid var(--lab-border);
        }
        .exp11-phone__label {
          font-family: var(--bf-font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--lab-text-dim);
          white-space: nowrap;
        }

        /* ── Catavento ── */
        .exp11-catavento {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .exp11-wheel {
          position: relative;
          width: 0;
          height: 0;
          will-change: transform;
        }
        .exp11-arm {
          position: absolute;
          top: 0;
          left: 0;
        }
        .exp11-counter {
          will-change: transform;
        }

        /* ── Cascata ── */
        .exp11-cascata {
          min-height: 78vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 48px 32px;
        }
        .exp11-cascata .exp11-item + .exp11-item {
          margin-left: -64px;
        }

        /* ── Esteira ── */
        .exp11-esteira {
          overflow: hidden;
          padding: 48px 0 64px;
        }
        .exp11-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .exp11-track .exp11-item {
          margin-right: 32px;
        }
      `}</style>

      <div ref={stageRef}>
        <div className="exp11-intro">
          <span className="lab-eyebrow">{'// EXP-11 — PRODUÇÃO VIVA'}</span>
          <h2>O estúdio em movimento.</h2>
          <p>
            Os Stories da rodada 11–17/jun rodando ao vivo — a produção real
            do estúdio dentro do aparelho onde ela acontece. Troque a
            coreografia no tuner.
          </p>
        </div>

        {modo === 'catavento' && (
          <div className="exp11-catavento" style={{ height: alturaCatavento }}>
            <div className="exp11-wheel">
              {VIDEOS.map((v, i) => {
                const angulo = (i * 360) / VIDEOS.length
                return (
                  <div
                    key={v.src}
                    className="exp11-arm"
                    style={{
                      transform: `rotate(${angulo}deg) translateY(-${raio}px)`,
                    }}
                  >
                    <div
                      className="exp11-counter"
                      style={{
                        transform: values.vertical
                          ? `translate(-50%, -50%) rotate(${-angulo}deg) scale(0.7)`
                          : `translate(-50%, -50%) scale(0.7)`,
                      }}
                    >
                      <PhoneMock src={v.src} label={v.label} destaque={i === 0} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {modo === 'cascata' && (
          <div className="exp11-cascata">
            {VIDEOS.map((v, i) => (
              <div key={v.src} className="exp11-item">
                <PhoneMock src={v.src} label={v.label} destaque={i === 0} />
              </div>
            ))}
          </div>
        )}

        {modo === 'esteira' && (
          <div className="exp11-esteira">
            {/* Caveat de performance: a duplicata necessária pro loop seamless
                significa 14 <video> simultâneos com os mesmos srcs — pesado.
                preload="metadata" segura o pior; em máquina modesta, prefira
                catavento ou cascata (7 vídeos). */}
            <div className="exp11-track">
              {[0, 1].map((copia) =>
                VIDEOS.map((v, i) => (
                  <div
                    key={`${copia}-${v.src}`}
                    className="exp11-item"
                    aria-hidden={copia === 1 || undefined}
                  >
                    <PhoneMock src={v.src} label={v.label} destaque={i === 0} />
                  </div>
                )),
              )}
            </div>
          </div>
        )}
      </div>

      {panel}
    </ExperimentShell>
  )
}
