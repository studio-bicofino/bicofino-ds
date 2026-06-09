'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, ScrambleTextPlugin)

/* Spec-tags do universo Bicofino. `ambient` = valores alternativos
   pelos quais a célula cicla no modo "organismo vivo". */
type Spec = { label: string; value: string; ambient?: string[] }

const SPECS: Spec[] = [
  { label: 'ID', value: 'BF-077', ambient: ['BF-012', 'BF-094', 'BF-031'] },
  { label: 'MODO', value: 'ON PITCH' },
  { label: 'LAT', value: '45.4408° N', ambient: ['45.0703° N', '44.4949° N'] },
  { label: 'LON', value: '9.1900° E', ambient: ['7.6869° E', '11.3426° E'] },
  { label: 'TORQUE', value: '3.2 N·m', ambient: ['2.8 N·m', '4.1 N·m', '3.6 N·m'] },
  { label: 'SETOR', value: 'TORINO' },
  { label: 'ORIGEM', value: '1899' },
  { label: 'FASE', value: 'OFF PITCH' },
  { label: 'TEMPO', value: "92'", ambient: ["45'", "67'", "90'+3"] },
  { label: 'ESQUEMA', value: '4-3-3' },
  { label: 'CLUBE', value: 'SPFC' },
  { label: 'HORIZONTE', value: '2027' },
]

const CHARS_OPTIONS = ['upperCase', '01', 'X#■·', 'upperAndLowerCase'] as const

export default function ScrambleMonoPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel, replay } = useTuner(
    {
      duration: { value: 1.4, min: 0.4, max: 3, step: 0.05, label: 'duration' },
      speed: { value: 0.5, min: 0.2, max: 1, step: 0.05, label: 'scramble speed' },
      chars: { value: 'upperCase', options: CHARS_OPTIONS, label: 'chars' },
      stagger: { value: 0.08, min: 0.02, max: 0.3, step: 0.005, label: 'stagger' },
      ciclar: { value: true, label: 'ciclar (ambient)' },
    },
    { title: '// EXP-04' },
  )

  useGSAP(
    () => {
      const scramble = (text: string) => ({
        text,
        chars: values.chars,
        speed: values.speed,
      })

      /* Reveal inicial — headline primeiro, grade em cascata. */
      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      tl.to('[data-scramble-hl]', {
        duration: values.duration,
        scrambleText: scramble('{original}'),
        stagger: values.stagger * 2,
      })

      tl.to('[data-spec-value]', {
        duration: values.duration,
        scrambleText: scramble('{original}'),
        stagger: values.stagger,
      }, 0.2)

      /* Modo ambient — micro-type forming em loop longo e dessincronizado:
         cada célula numérica cicla pelos valores do pool e volta ao original,
         com delays/repeatDelay próprios pra nunca sincronizar. */
      if (values.ciclar) {
        SPECS.forEach((spec, i) => {
          if (!spec.ambient) return
          const el = containerRef.current?.querySelector<HTMLElement>(
            `[data-spec-idx="${i}"]`,
          )
          if (!el) return

          const cycle = gsap.timeline({
            repeat: -1,
            delay: values.duration + gsap.utils.random(1.5, 4.5),
            repeatDelay: gsap.utils.random(2, 6),
            defaults: { ease: 'none' },
          })

          const loop = [...spec.ambient, spec.value]
          loop.forEach((txt, j) => {
            cycle.to(
              el,
              {
                duration: Math.max(0.6, values.duration * 0.6),
                scrambleText: scramble(txt),
              },
              j === 0 ? 0 : `+=${gsap.utils.random(1.2, 3.2).toFixed(2)}`,
            )
          })
        })
      }
    },
    {
      scope: containerRef,
      dependencies: [
        values.duration,
        values.speed,
        values.chars,
        values.stagger,
        values.ciclar,
        replay,
      ],
      revertOnUpdate: true,
    },
  )

  return (
    <ExperimentShell slug="04-scramble-mono">
      <div
        ref={containerRef}
        style={{
          minHeight: 'calc(100vh - 220px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 32px 96px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1040,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <span className="lab-eyebrow">{'// EXP-04 — MICRO-TYPE FORMING'}</span>

          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--bf-font-display)',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--bf-white)',
              maxWidth: '20ch',
            }}
          >
            <span data-scramble-hl>O organismo fala em </span>
            <span data-scramble-hl style={{ color: 'var(--current-accent)' }}>
              mono
            </span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            {SPECS.map((spec, i) => (
              <div
                key={spec.label + spec.value}
                style={{
                  border: '1px solid var(--lab-border)',
                  background: 'var(--lab-surface)',
                  borderRadius: 2,
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--bf-font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--lab-text-dim)',
                  }}
                >
                  {spec.label}
                </span>
                <span
                  data-spec-value
                  data-spec-idx={i}
                  style={{
                    fontFamily: 'var(--bf-font-mono)',
                    fontWeight: 500,
                    fontSize: 15,
                    lineHeight: 1.4,
                    color: 'var(--bf-aluminium)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {panel}
    </ExperimentShell>
  )
}
