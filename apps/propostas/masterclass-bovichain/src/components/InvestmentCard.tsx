'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { Check } from 'lucide-react'

const TOTAL = 300900

const FEATURES = [
  'Captação em 5 diárias em estúdio próprio',
  'Edição completa de 102 vídeos',
  'Cortes verticais para redes incluídos',
  'Motion, color grading, legendas e cartelas',
  'Vinheta de abertura por curso (6 vinhetas)',
  'Equipe de criação, atendimento e teleprompter',
  'Alimentação da equipe',
]

export default function InvestmentCard() {
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
      style={{
        opacity,
        y,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 32,
        borderRadius: 16,
        background: 'var(--bf-surface)',
        border: '1px solid var(--current-accent)',
        maxWidth: 520,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'var(--bf-nocciola-deep)',
          margin: 0,
        }}
      >
        Pacote fechado
      </p>

      <div>
        <h3
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: 'var(--bf-text-primary)',
            margin: '0 0 8px',
            lineHeight: 1.2,
          }}
        >
          Studio Bicofino · BoviClass
        </h3>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 14,
            color: 'var(--bf-text-secondary)',
            margin: 0,
            lineHeight: 1.55,
            maxWidth: '52ch',
          }}
        >
          Captação, edição, motion, color grading, legendas e cartelas — tudo em estúdio próprio.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.15em',
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 500,
          color: 'var(--bf-text-primary)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(10px, 1.375vw, 16px)',
            color: 'var(--bf-text-secondary)',
          }}
        >
          R$
        </span>
        <span style={{ fontSize: 'clamp(20px, 2.75vw, 32px)' }}>
          {TOTAL.toLocaleString('pt-BR')}
        </span>
      </div>

      <motion.ul
        style={{
          listStyle: 'none',
          padding: 24,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          background: 'var(--current-accent)',
          borderRadius: 12,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        variants={{
          hidden:  {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
        }}
      >
        {FEATURES.map((feat) => (
          <motion.li
            key={feat}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              color: 'var(--bf-caffe)',
              lineHeight: 1.5,
            }}
            variants={{
              hidden:  reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.2, 0, 0, 1] } },
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'var(--bf-caffe)',
                color: 'var(--bf-white)',
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <Check size={16} strokeWidth={1.5} />
            </span>
            {feat}
          </motion.li>
        ))}
      </motion.ul>

      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-subtle)',
          margin: 0,
          marginTop: 'auto',
        }}
      >
        Valor já com honorários (15%) e impostos (14,25%)
      </p>
    </motion.article>
  )
}
