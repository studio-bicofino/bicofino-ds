'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
  useReducedMotion,
} from 'motion/react'

interface Metric {
  value:       number
  label:       string
  sublabel?:   string
  description: string
}

const METRICS: Metric[] = [
  {
    value: 102,
    label: 'vídeos',
    sublabel: '96 + 6',
    description:
      '96 vídeos horizontais para os cursos e 6 cortes verticais para redes.',
  },
  {
    value: 5,
    label: 'diárias',
    description:
      'Gravação concentrada em uma semana, em sequência em estúdio próprio.',
  },
  {
    value: 6,
    label: 'cursos',
    sublabel: '16 aulas + 1 teaser',
    description:
      'Cada curso reúne 16 aulas em formato entrevista mais 1 teaser para divulgação.',
  },
  {
    value: 2950,
    label: 'reais/vídeo',
    description:
      'Custo por peça finalizada — captação, edição e pós-produção completa.',
  },
]

function AnimatedNumber({ value }: { value: number }) {
  const ref         = useRef<HTMLSpanElement>(null)
  const inView      = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const motionValue = useMotionValue(0)
  const formatted   = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString('pt-BR'),
  )
  const reduce      = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      motionValue.set(value)
      return
    }
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: [0.2, 0, 0, 1],
    })
    return () => controls.stop()
  }, [inView, value, motionValue, reduce])

  return <motion.span ref={ref}>{formatted}</motion.span>
}

function MetricCard({ metric }: { metric: Metric }) {
  const cardRef = useRef<HTMLElement>(null)
  const reduce  = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.9', 'start 0.45'],
  })

  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rawY       = useTransform(scrollYProgress, [0, 1], [24, 0])

  const opacity = reduce ? 1 : rawOpacity
  const y       = reduce ? 0 : rawY

  return (
    <motion.article
      ref={cardRef}
      className="bf-metric-card"
      style={{ opacity, y }}
      aria-label={`${metric.value.toLocaleString('pt-BR')} ${metric.label}`}
    >
      <p className="bf-metric-card__value">
        <AnimatedNumber value={metric.value} />
      </p>

      <div className="bf-metric-card__head">
        <p className="bf-metric-card__label">{metric.label}</p>
        {metric.sublabel ? (
          <p className="bf-metric-card__sublabel">{metric.sublabel}</p>
        ) : null}
      </div>

      <p className="bf-metric-card__description">{metric.description}</p>
    </motion.article>
  )
}

export default function MetricsGrid() {
  return (
    <>
      <div className="bf-metric-grid">
        {METRICS.map((m) => (
          <MetricCard key={m.label} metric={m} />
        ))}
      </div>

      <style jsx>{`
        .bf-metric-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: stretch;
          gap: 16px;
          width: 100%;
        }

        @media (max-width: 1100px) {
          .bf-metric-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .bf-metric-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <style jsx global>{`
        .bf-metric-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 32px;
          background: var(--bf-surface);
          border: 1px solid var(--bf-border);
          border-radius: 16px;
          height: 100%;
          transition: border-color 180ms ease-out;
        }
        .bf-metric-card:hover {
          border-color: var(--bf-border-strong);
        }

        @media (max-width: 700px) {
          .bf-metric-card {
            padding: 24px;
          }
        }

        .bf-metric-card__value {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(72px, 10vw, 128px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: var(--current-accent);
          font-variant-numeric: tabular-nums;
          margin: 0;
        }

        .bf-metric-card__head {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bf-metric-card__label {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: var(--bf-text-primary);
          line-height: 1.2;
          margin: 0;
        }

        .bf-metric-card__sublabel {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--bf-text-subtle);
          margin: 0;
        }

        .bf-metric-card__description {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: var(--bf-text-secondary);
          margin: 0;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--bf-border);
        }

        @media (prefers-reduced-motion: reduce) {
          .bf-metric-card,
          .bf-metric-card:hover {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
