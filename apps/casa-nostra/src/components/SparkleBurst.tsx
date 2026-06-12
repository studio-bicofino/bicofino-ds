'use client'

/**
 * SparkleBurst — burst breve de sparkles coloridos (celebração de save).
 *
 * EXCEÇÃO DECORATIVA SANCIONADA, scoped ao Casa Nostra — mesmo estatuto do
 * cn-pulse. O DESIGN.md proíbe animação decorativa no DS geral; este burst
 * (~800ms, acima do teto de 300ms) vale SÓ para a celebração de inclusão
 * neste app. Não propagar para docs-site / design system.
 *
 * - Overlay absoluto (inset 0) sobre o pai — o pai PRECISA ser position: relative.
 * - Partículas 100% determinísticas (tabela hardcoded, zero Math.random no
 *   render) pra não haver mismatch de hydration.
 * - Cores: apenas tokens --bf-cn-* já existentes no globals.css do app.
 * - prefers-reduced-motion: não renderiza nada e chama onDone imediatamente.
 */

import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// Paleta fixa — 5 vibrantes da Casa Nostra, via var() (nenhum hex novo).
const PALETTE = [
  'var(--bf-cn-napoli)', // azul info
  'var(--bf-cn-sep)', // verde success
  'var(--bf-cn-spfc)', // vermelho vivo
  'var(--bf-cn-amber)', // âmbar
  'var(--bf-cn-torino)', // vinho
] as const

type Particle = {
  /** direção do voo, em graus (0 = direita, sentido horário) */
  angle: number
  /** distância final do centro, px */
  distance: number
  /** escala máxima do sparkle */
  scale: number
  /** atraso de partida, ms */
  delay: number
  /** índice na PALETTE */
  colorIndex: number
}

// Tabela hardcoded — distribuição "orgânica" mas determinística.
const PARTICLES: Particle[] = [
  { angle: 8, distance: 72, scale: 1.0, delay: 0, colorIndex: 0 },
  { angle: 33, distance: 48, scale: 0.7, delay: 40, colorIndex: 1 },
  { angle: 60, distance: 86, scale: 0.85, delay: 80, colorIndex: 2 },
  { angle: 84, distance: 55, scale: 0.6, delay: 10, colorIndex: 3 },
  { angle: 110, distance: 78, scale: 1.0, delay: 60, colorIndex: 4 },
  { angle: 138, distance: 44, scale: 0.75, delay: 110, colorIndex: 0 },
  { angle: 162, distance: 64, scale: 0.9, delay: 30, colorIndex: 1 },
  { angle: 190, distance: 88, scale: 0.65, delay: 90, colorIndex: 2 },
  { angle: 214, distance: 52, scale: 0.8, delay: 0, colorIndex: 3 },
  { angle: 245, distance: 70, scale: 1.0, delay: 70, colorIndex: 4 },
  { angle: 268, distance: 42, scale: 0.7, delay: 120, colorIndex: 0 },
  { angle: 295, distance: 82, scale: 0.85, delay: 20, colorIndex: 1 },
  { angle: 318, distance: 58, scale: 0.6, delay: 100, colorIndex: 2 },
  { angle: 344, distance: 76, scale: 0.95, delay: 50, colorIndex: 3 },
]

// Duração do voo de cada partícula + maior delay ≈ 800ms total.
const FLIGHT_MS = 680
const MAX_DELAY_MS = 120
const TOTAL_MS = FLIGHT_MS + MAX_DELAY_MS

/** Sparkle de 4 pontas (estilo "brilho"), pinta com currentColor. */
function SparkleGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden>
      <path d="M12 0 C13.2 6.8 17.2 10.8 24 12 C17.2 13.2 13.2 17.2 12 24 C10.8 17.2 6.8 13.2 0 12 C6.8 10.8 10.8 6.8 12 0 Z" />
    </svg>
  )
}

export function SparkleBurst({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!onDone) return
    if (reduce) {
      onDone()
      return
    }
    const t = setTimeout(onDone, TOTAL_MS + 50)
    return () => clearTimeout(t)
  }, [reduce, onDone])

  if (reduce) return null

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible',
      }}
    >
      {PARTICLES.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180
        const x = Math.cos(rad) * p.distance
        const y = Math.sin(rad) * p.distance
        // Giro determinístico ~90–180°, alternando o sentido.
        const rotate = (i % 2 === 0 ? 1 : -1) * (90 + (i % 4) * 30)
        return (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              display: 'block',
              width: 12,
              height: 12,
              marginLeft: -6,
              marginTop: -6,
              color: PALETTE[p.colorIndex],
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x,
              y,
              rotate,
              scale: [0, p.scale, p.scale * 0.85],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: FLIGHT_MS / 1000,
              delay: p.delay / 1000,
              ease: 'easeOut',
              times: [0, 0.55, 1],
            }}
          >
            <SparkleGlyph />
          </motion.span>
        )
      })}
    </div>
  )
}
