'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP)

/* EXP-09 — o M-01 acompanhando o cursor com inércia (ref. madness.ai).
   Três camadas de grafismo técnico em profundidades diferentes:
   a funda quase parada, a da frente respondendo mais — paralaxe de
   profundidade. quickTo criado UMA vez; o pointermove só alimenta
   os setters. Vivo, nunca ocupado. */

const SPEC_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--bf-font-mono)',
  fontSize: 10,
  fill: 'var(--lab-text-dim)',
  letterSpacing: '0.1em',
}

/* Grade de pontos da camada funda — 12×8, espaçada */
const DOT_COLS = 12
const DOT_ROWS = 8

export default function MouseSchematicPage() {
  const stageRef = useRef<HTMLDivElement>(null)

  const { values, panel } = useTuner(
    {
      intensity: { value: 36, min: 5, max: 80, step: 1, label: 'intensidade (px)' },
      lag: { value: 0.8, min: 0.2, max: 2, step: 0.05, label: 'lag (s)' },
      depth2: { value: 0.5, min: 0.2, max: 1, step: 0.05, label: 'profundidade cam. 2' },
      invertBack: { value: false, label: 'inverter camada de trás' },
      rotate: { value: false, label: 'rotação leve (frente)' },
    },
    { title: '// EXP-09' },
  )

  useGSAP(
    (_context, contextSafe) => {
      const stage = stageRef.current
      if (!stage || !contextSafe) return

      // Organismo vivo, mas com respeito: parado sob reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const { intensity, lag, depth2, invertBack, rotate } = values

      // Profundidades: trás move pouco (e pode ir CONTRA o mouse),
      // meio é tunável, frente move cheio.
      const depthBack = 0.25 * (invertBack ? -1 : 1)
      const depthFront = 1

      const setters = {
        // Camada A (funda)
        ax: gsap.quickTo('.exp09-layer-a', 'x', { duration: lag, ease: 'power3' }),
        ay: gsap.quickTo('.exp09-layer-a', 'y', { duration: lag, ease: 'power3' }),
        // Camada B (média)
        bx: gsap.quickTo('.exp09-layer-b', 'x', { duration: lag, ease: 'power3' }),
        by: gsap.quickTo('.exp09-layer-b', 'y', { duration: lag, ease: 'power3' }),
        // Camada C (frente)
        cx: gsap.quickTo('.exp09-layer-c', 'x', { duration: lag, ease: 'power3' }),
        cy: gsap.quickTo('.exp09-layer-c', 'y', { duration: lag, ease: 'power3' }),
        // Rotação só na camada da frente, e bem leve
        cr: gsap.quickTo('.exp09-layer-c', 'rotation', { duration: lag, ease: 'power3' }),
      }

      const onMove = contextSafe((e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5

        setters.ax(nx * intensity * depthBack)
        setters.ay(ny * intensity * depthBack)
        setters.bx(nx * intensity * depth2)
        setters.by(ny * intensity * depth2)
        setters.cx(nx * intensity * depthFront)
        setters.cy(ny * intensity * depthFront)
        if (rotate) setters.cr(nx * 4)
      })

      stage.addEventListener('pointermove', onMove)
      return () => stage.removeEventListener('pointermove', onMove)
    },
    {
      scope: stageRef,
      dependencies: [
        values.intensity,
        values.lag,
        values.depth2,
        values.invertBack,
        values.rotate,
      ],
      revertOnUpdate: true,
    },
  )

  // Camadas com sangria além do palco — o movimento nunca revela borda
  const layerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: -100,
    pointerEvents: 'none',
    willChange: 'transform',
  }

  return (
    <ExperimentShell slug="09-mouse-schematic">
      <div
        ref={stageRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '140vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Camada A (funda) — grade de pontos ── */}
        <div className="exp09-layer-a" style={layerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1200 800"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{ display: 'block' }}
          >
            {Array.from({ length: DOT_ROWS }, (_, row) =>
              Array.from({ length: DOT_COLS }, (_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={60 + col * 98}
                  cy={50 + row * 100}
                  r="1"
                  fill="var(--bf-line-on-dark)"
                />
              )),
            )}
          </svg>
        </div>

        {/* ── Camada B (média) — órbitas + hairlines + ticks ── */}
        <div className="exp09-layer-b" style={layerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1200 800"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{ display: 'block' }}
          >
            <circle
              cx="600"
              cy="400"
              r="260"
              fill="none"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            <circle
              cx="600"
              cy="400"
              r="170"
              fill="none"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            {/* Hairlines */}
            <line
              x1="80"
              y1="400"
              x2="430"
              y2="400"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            <line
              x1="770"
              y1="400"
              x2="1120"
              y2="400"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            <polyline
              points="784,216 880,120 1000,120"
              fill="none"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            {/* Ticks na órbita externa (12 posições, raio 260) */}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2
              const x1 = 600 + Math.cos(a) * 254
              const y1 = 400 + Math.sin(a) * 254
              const x2 = 600 + Math.cos(a) * 266
              const y2 = 400 + Math.sin(a) * 266
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--bf-line-on-dark)"
                  strokeWidth="1"
                />
              )
            })}
          </svg>
        </div>

        {/* ── Camada C (frente) — crosshair + nó accent + spec-tags ── */}
        <div className="exp09-layer-c" style={layerStyle} aria-hidden="true">
          <svg
            viewBox="0 0 1200 800"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{ display: 'block' }}
          >
            {/* Crosshair */}
            <line
              x1="600"
              y1="320"
              x2="600"
              y2="380"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            <line
              x1="600"
              y1="420"
              x2="600"
              y2="480"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            <line
              x1="520"
              y1="400"
              x2="580"
              y2="400"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            <line
              x1="620"
              y1="400"
              x2="680"
              y2="400"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            <circle
              cx="600"
              cy="400"
              r="14"
              fill="none"
              stroke="var(--bf-line-on-dark)"
              strokeWidth="1"
            />
            {/* Nó vibrante — o único accent da composição */}
            <circle cx="600" cy="400" r="3.5" fill="var(--current-accent)" />

            {/* Spec-tags mono */}
            <text x="1004" y="124" style={SPEC_TEXT_STYLE}>
              BF-077
            </text>
            <text x="160" y="676" style={SPEC_TEXT_STYLE}>
              TRACK
            </text>
            <text x="940" y="690" style={SPEC_TEXT_STYLE}>
              45.4408° N
            </text>
          </svg>
        </div>

        {/* ── Conteúdo estático por cima — o grafismo é fundo ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            padding: '0 32px',
            maxWidth: 760,
          }}
        >
          <span className="lab-eyebrow">{'// EXP-09 — ORGANISMO QUE TE SEGUE'}</span>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--bf-white)',
            }}
          >
            O fundo respira com você.
          </h2>
          <p
            style={{
              margin: 0,
              maxWidth: '40ch',
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--lab-text-dim)',
            }}
          >
            Mexa o mouse: o grafismo técnico acompanha com inércia, cada camada
            numa profundidade diferente. A grade funda quase não se move; o
            crosshair da frente responde mais. Discreto — vivo, nunca ocupado.
          </p>
        </div>
      </div>
      {panel}
    </ExperimentShell>
  )
}
