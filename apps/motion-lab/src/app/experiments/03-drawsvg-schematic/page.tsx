'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, DrawSVGPlugin)

/* EXP-03 — o M-01 "Grafismo Técnico" ganhando vida.
   Hairlines, órbitas, ticks e nós se desenhando com DrawSVG —
   o "wires forming" descrito no DESIGN.md §8. */

const SPEC_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--bf-font-mono)',
  fontSize: 10,
  fill: 'var(--lab-text-dim)',
  letterSpacing: '0.1em',
}

export default function DrawSvgSchematicPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel, replay } = useTuner(
    {
      duration: { value: 1.6, min: 0.5, max: 4, step: 0.05, label: 'duration' },
      stagger: { value: 0.12, min: 0.02, max: 0.5, step: 0.01, label: 'stagger' },
      ease: {
        value: 'power2.out',
        options: ['power1.inOut', 'power2.out', 'expo.out', 'none'] as const,
        label: 'ease',
      },
      loop: { value: false, label: 'loop (ambient)' },
    },
    { title: '// EXP-03' },
  )

  useGSAP(
    () => {
      const tl = gsap.timeline(
        values.loop
          ? { repeat: -1, yoyo: true, repeatDelay: 1.4, yoyoEase: 'power1.inOut' }
          : undefined,
      )

      // 1. Os fios se desenham em sequência — órbitas, hairlines, ticks, tags
      tl.from('.draw', {
        drawSVG: 0,
        duration: values.duration,
        stagger: values.stagger,
        ease: values.ease,
      })

      // 2. Nós pousam depois que o fio deles chega — scale 0.94→1 + opacity
      tl.fromTo(
        '.node',
        { scale: 0.94, opacity: 0, transformOrigin: '50% 50%' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
        },
        `-=${values.duration * 0.4}`,
      )

      // 3. Spec-tags em mono resolvem por último — instrumentação lida
      tl.fromTo(
        '.spec',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.06, ease: 'none' },
        '-=0.2',
      )

      // Organismo vivo, mas com respeito: sem movimento sob reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tl.repeat(0).progress(1).pause()
      }
    },
    {
      scope: containerRef,
      dependencies: [values.duration, values.stagger, values.ease, values.loop, replay],
      revertOnUpdate: true,
    },
  )

  return (
    <ExperimentShell slug="03-drawsvg-schematic">
      <div
        ref={containerRef}
        style={{
          maxWidth: 1040,
          margin: '0 auto',
          padding: '64px 32px 96px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <span className="lab-eyebrow">{'// EXP-03 — WIRES FORMING'}</span>

        <p
          style={{
            margin: 0,
            maxWidth: '40ch',
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--lab-text-dim)',
          }}
        >
          O M-01 ganhando vida: hairlines e órbitas se desenham, os nós pousam,
          a instrumentação resolve — e o diagrama descansa.
        </p>

        <svg
          viewBox="0 0 1000 600"
          width="100%"
          role="img"
          aria-label="Diagrama técnico animado — órbitas, hairlines e nós do módulo M-01"
          style={{ display: 'block' }}
        >
          {/* ── Órbitas concêntricas ── */}
          <circle
            className="draw"
            cx="500"
            cy="300"
            r="210"
            fill="none"
            stroke="var(--current-accent)"
            strokeWidth="1.5"
          />
          <circle
            className="draw"
            cx="500"
            cy="300"
            r="140"
            fill="none"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />
          <circle
            className="draw"
            cx="500"
            cy="300"
            r="70"
            fill="none"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />

          {/* ── Estrela / nó central ── */}
          <path
            className="draw"
            d="M 500 268 L 508 292 L 532 300 L 508 308 L 500 332 L 492 308 L 468 300 L 492 292 Z"
            fill="none"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1.5"
          />

          {/* ── Hairlines conectando nós às tags ── */}
          <polyline
            className="draw"
            points="648,152 700,110 758,110"
            fill="none"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />
          <line
            className="draw"
            x1="290"
            y1="300"
            x2="202"
            y2="300"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />
          <polyline
            className="draw"
            points="500,160 500,90 558,90"
            fill="none"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />
          <line
            className="draw"
            x1="500"
            y1="300"
            x2="599"
            y2="399"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />

          {/* ── Retângulos-tag ── */}
          <rect
            className="draw"
            x="758"
            y="96"
            width="92"
            height="28"
            fill="none"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />
          <rect
            className="draw"
            x="110"
            y="286"
            width="92"
            height="28"
            fill="none"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />
          <rect
            className="draw"
            x="558"
            y="76"
            width="92"
            height="28"
            fill="none"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />

          {/* ── Régua de base + ticks ── */}
          <line
            className="draw"
            x1="60"
            y1="540"
            x2="940"
            y2="540"
            stroke="var(--bf-line-on-dark)"
            strokeWidth="1"
          />
          {Array.from({ length: 12 }, (_, i) => {
            const x = 60 + i * 80
            return (
              <line
                key={x}
                className="draw"
                x1={x}
                y1="533"
                x2={x}
                y2="547"
                stroke="var(--bf-line-on-dark)"
                strokeWidth="1"
              />
            )
          })}

          {/* ── Nós (fill, pousam depois dos fios) ── */}
          <circle className="node" cx="648" cy="152" r="4" fill="var(--lab-text)" />
          <circle className="node" cx="290" cy="300" r="4" fill="var(--lab-text)" />
          <circle className="node" cx="500" cy="160" r="4" fill="var(--lab-text)" />
          <circle className="node" cx="599" cy="399" r="4" fill="var(--lab-text)" />
          <circle className="node" cx="430" cy="300" r="3" fill="var(--lab-text)" />

          {/* ── Spec-tags em mono ── */}
          <text className="spec" x="772" y="114" style={SPEC_TEXT_STYLE}>
            BF-077
          </text>
          <text className="spec" x="124" y="304" style={SPEC_TEXT_STYLE}>
            ORBIT A
          </text>
          <text className="spec" x="572" y="94" style={SPEC_TEXT_STYLE}>
            TORQUE 3.2
          </text>
          <text className="spec" x="820" y="526" style={SPEC_TEXT_STYLE}>
            45.4408° N
          </text>
          <text className="spec" x="60" y="526" style={SPEC_TEXT_STYLE}>
            M-01 / GRAFISMO TÉCNICO
          </text>
        </svg>
      </div>
      {panel}
    </ExperimentShell>
  )
}
