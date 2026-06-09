'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, SplitText)

export default function SplitTextRevealPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel, replay } = useTuner(
    {
      split: { value: 'lines', options: ['lines', 'words', 'chars'] as const, label: 'split' },
      duration: { value: 1.1, min: 0.3, max: 2.5, step: 0.05, label: 'duration' },
      stagger: { value: 0.08, min: 0.01, max: 0.2, step: 0.005, label: 'stagger' },
      yOffset: { value: 90, min: 10, max: 160, step: 1, label: 'y offset (px)' },
      ease: {
        value: 'power4.out',
        options: ['power2.out', 'power4.out', 'expo.out', 'back.out(1.4)'] as const,
        label: 'ease',
      },
    },
    { title: '// EXP-01' },
  )

  useGSAP(
    () => {
      const isLines = values.split === 'lines'

      const split = SplitText.create('[data-split]', {
        type: values.split as 'lines' | 'words' | 'chars',
        // máscara de overflow por linha — o "saindo da dobra" editorial
        ...(isLines ? { mask: 'lines' as const } : {}),
      })

      const targets =
        values.split === 'lines'
          ? split.lines
          : values.split === 'words'
            ? split.words
            : split.chars

      gsap.from(targets, {
        y: values.yOffset,
        opacity: 0,
        duration: values.duration,
        stagger: values.stagger,
        ease: values.ease,
      })

      return () => {
        split.revert()
      }
    },
    {
      scope: containerRef,
      dependencies: [
        values.split,
        values.duration,
        values.stagger,
        values.yOffset,
        values.ease,
        replay,
      ],
      revertOnUpdate: true,
    },
  )

  return (
    <ExperimentShell slug="01-split-text-reveal">
      <div
        ref={containerRef}
        style={{
          minHeight: 'calc(100vh - 220px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          padding: '64px 32px 96px',
        }}
      >
        <span className="lab-eyebrow">{'// EXP-01 — SPLIT TEXT'}</span>

        <h2
          data-split
          style={{
            margin: 0,
            fontFamily: 'var(--bf-font-display)',
            fontWeight: 700,
            fontSize: 'clamp(56px, 9vw, 140px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--bf-white)',
            maxWidth: '12ch',
          }}
        >
          O futuro <span style={{ color: 'var(--current-accent)' }}>joga</span> com a gente
        </h2>

        <p
          data-split
          style={{
            margin: 0,
            maxWidth: '46ch',
            fontSize: 16,
            lineHeight: 1.7,
            color: 'var(--lab-text-dim)',
          }}
        >
          Dentro e fora de campo, a próxima geração não espera a vez chegar — ela
          constrói o próprio jogo. On Pitch, Off Pitch: a carreira inteira em movimento.
        </p>
      </div>
      {panel}
    </ExperimentShell>
  )
}
