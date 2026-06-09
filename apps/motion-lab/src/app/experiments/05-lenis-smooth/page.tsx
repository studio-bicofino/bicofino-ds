'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* ─── Placa visual — recebe o parallax; o texto ao redor fica estático ─── */

function Plate({
  fig,
  height,
  surface,
  accent = false,
  align = 'start',
}: {
  fig: string
  height: string
  surface: 'surface' | 'surface-2' | 'aluminium'
  accent?: boolean
  align?: 'start' | 'end'
}) {
  return (
    <div
      data-plate
      style={{
        position: 'relative',
        height,
        width: 'min(82%, 760px)',
        marginLeft: align === 'end' ? 'auto' : 0,
        marginRight: align === 'start' ? 'auto' : 0,
        background:
          surface === 'surface'
            ? 'var(--lab-surface)'
            : surface === 'surface-2'
              ? 'var(--lab-surface-2)'
              : 'transparent',
        border: accent
          ? '1px solid var(--current-accent)'
          : '1px solid var(--lab-border)',
        borderRadius: 4,
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >
      {surface === 'aluminium' && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bf-aluminium)',
            opacity: 0.06,
          }}
        />
      )}
      {/* fio interno — grafismo técnico */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          top: '62%',
          height: 1,
          background: 'var(--bf-line-on-dark)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 24,
          bottom: 24,
          left: '38%',
          width: 1,
          background: 'var(--bf-line-on-dark)',
        }}
      />
      <span
        className="lab-mono"
        style={{
          position: 'absolute',
          top: 16,
          left: 20,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: accent ? 'var(--current-accent)' : 'var(--lab-text-dim)',
        }}
      >
        {fig}
      </span>
    </div>
  )
}

/* ─── Bloco de texto editorial — camada estática ─── */

function Passage({ title, children }: { title: string; children: string }) {
  return (
    <section style={{ display: 'grid', gap: 16, maxWidth: 760 }}>
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--bf-font-display)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 5.5vw, 80px)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--bf-white)',
          maxWidth: '16ch',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          margin: 0,
          maxWidth: '46ch',
          fontSize: 16,
          lineHeight: 1.7,
          color: 'var(--lab-text-dim)',
        }}
      >
        {children}
      </p>
    </section>
  )
}

export default function LenisSmoothPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel } = useTuner(
    {
      lenis: { value: true, label: 'lenis' },
      duration: { value: 1.2, min: 0.5, max: 2.5, step: 0.05, label: 'duration (s)' },
      wheel: { value: 1, min: 0.5, max: 2, step: 0.05, label: 'wheel mult.' },
      parallax: { value: 16, min: 0, max: 40, step: 1, label: 'parallax (%)' },
    },
    { title: '// EXP-05' },
  )

  /* Lenis vive fora do useGSAP — ciclo de vida próprio, integração canônica. */
  useEffect(() => {
    if (!values.lenis) return

    const lenis = new Lenis({
      duration: values.duration,
      wheelMultiplier: values.wheel,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [values.lenis, values.duration, values.wheel])

  /* Parallax das placas — camada que desliza contra o texto estático. */
  useGSAP(
    () => {
      const plates = gsap.utils.toArray<HTMLElement>('[data-plate]', containerRef.current)
      plates.forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -values.parallax : values.parallax,
          ease: 'none',
          scrollTrigger: { trigger: el, scrub: true },
        })
      })
    },
    { scope: containerRef, dependencies: [values.parallax], revertOnUpdate: true },
  )

  return (
    <ExperimentShell slug="05-lenis-smooth">
      <div
        ref={containerRef}
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '64px 32px 160px',
          display: 'grid',
          gap: '18vh',
        }}
      >
        {/* abertura */}
        <section style={{ display: 'grid', gap: 24, minHeight: '60vh', alignContent: 'center' }}>
          <span className="lab-mono">compare: desligue o lenis no tuner e role de novo</span>
          <span className="lab-eyebrow">{'// EXP-05 — SMOOTH SCROLL'}</span>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--bf-font-display)',
              fontWeight: 700,
              fontSize: 'clamp(48px, 8vw, 120px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: 'var(--bf-white)',
              maxWidth: '12ch',
            }}
          >
            O jogo tem outro <span style={{ color: 'var(--current-accent)' }}>tempo</span>
          </h2>
          <p
            style={{
              margin: 0,
              maxWidth: '46ch',
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--lab-text-dim)',
            }}
          >
            Inércia é linguagem. O scroll deixa de ser mecânico e passa a ter peso,
            como uma bola dominada no peito antes do passe. Role devagar, role rápido —
            a página responde com a mesma calma.
          </p>
        </section>

        <Plate fig="FIG. 01 — TRAVESSIA" height="64vh" surface="surface" align="start" />

        <Passage title="Da várzea ao calcio">
          Todo atleta que cruza o Atlântico carrega duas malas: uma com chuteiras,
          outra com tudo o que ninguém ensinou. A Bicofino existe para a segunda —
          contrato, idioma, cidadania, a vida inteira que acontece quando o juiz apita
          o fim do treino.
        </Passage>

        <Plate fig="FIG. 02 — TERRENO DI GIOCO" height="60vh" surface="surface-2" align="end" />

        <Passage title="On Pitch é o que se vê">
          Noventa minutos por semana, o mundo assiste. Scout, súmula, mapa de calor —
          o desempenho dentro das quatro linhas é mensurável, comparável, negociável.
          É a vitrine. Mas vitrine nenhuma sustenta uma carreira sozinha.
        </Passage>

        <Plate fig="FIG. 03 — FUORICLASSE" height="68vh" surface="aluminium" accent align="start" />

        <Passage title="Off Pitch é o que sustenta">
          Os outros dez mil minutos da semana decidem mais do que qualquer final.
          Onde morar em Como, como declarar imposto na Itália, o que fazer com o
          primeiro salário em euro. O fuoriclasse de verdade joga bem nos dois campos.
        </Passage>

        <Plate fig="FIG. 04 — SECONDO TEMPO" height="62vh" surface="surface" align="end" />

        <Passage title="O segundo tempo começa agora">
          Nenhuma carreira termina aos trinta e cinco — ela muda de campo.
          Quem constrói o Off Pitch durante o On Pitch não cai do penhasco no último
          jogo: atravessa para o segundo tempo com o mesmo passo. Suave, como este scroll.
        </Passage>
      </div>
      {panel}
    </ExperimentShell>
  )
}
