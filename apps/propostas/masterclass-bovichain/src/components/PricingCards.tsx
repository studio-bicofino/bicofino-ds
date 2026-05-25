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

export interface Opcao {
  nome:      string
  descritor: string
  total:     number
  destaque:  boolean
  features:  string[]
  descricao: string
}

interface Props {
  opcoes: Opcao[]
}

const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

/* ─────────────── AnimatedPrice — count-up quando o card entra ─────────────── */
function AnimatedPrice({ value }: { value: number }) {
  const ref         = useRef<HTMLSpanElement>(null)
  const inView      = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const motionValue = useMotionValue(0)
  const formatted   = useTransform(motionValue, (latest) => brl(latest))
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

/* ─────────────── Card individual com scroll-tied entrance ─────────────── */
function PricingCard({ opt, index }: { opt: Opcao; index: number }) {
  const cardRef = useRef<HTMLElement>(null)
  const reduce  = useReducedMotion()

  /* Entrada atrelada ao scroll: card surge entre 85% e 55% da viewport */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.9', 'start 0.45'],
  })

  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rawY       = useTransform(scrollYProgress, [0, 1], [40, 0])

  /* Quando reduce-motion estiver ativo, neutraliza as transforms */
  const opacity = reduce ? 1 : rawOpacity
  const y       = reduce ? 0 : rawY

  return (
    <motion.article
      ref={cardRef}
      className={`bf-opt-card${opt.destaque ? ' is-recommended' : ''}`}
      style={{ opacity, y }}
    >
      {/* Eyebrow */}
      <p className="bf-opt-card__eyebrow">
        {opt.destaque ? `Opção ${index + 1} · Recomendada` : `Opção ${index + 1}`}
      </p>

      {/* Título + descritor */}
      <div>
        <h3 className="bf-opt-card__title">{opt.nome}</h3>
        <p className="bf-opt-card__descritor">{opt.descritor}</p>
      </div>

      {/* Preço com count-up */}
      <div className="bf-opt-card__price-block">
        <p className="bf-opt-card__price-label">Valor da produção</p>
        <p className="bf-opt-card__price">
          <AnimatedPrice value={opt.total} />
        </p>
      </div>

      {/* Features — stagger interno quando o bloco entra */}
      <motion.ul
        className="bf-opt-card__features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        variants={{
          hidden:  {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
        }}
      >
        {opt.features.map((feat) => (
          <motion.li
            key={feat}
            className="bf-opt-card__feature-item"
            variants={{
              hidden:  reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
          >
            <span className="bf-opt-card__check" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3.5,8.5 6.5,11.5 12.5,5" />
              </svg>
            </span>
            {feat}
          </motion.li>
        ))}
      </motion.ul>

      {/* Descrição final */}
      <p className="bf-opt-card__desc">{opt.descricao}</p>
    </motion.article>
  )
}

/* ─────────────── PricingCards — grid wrapper ─────────────── */
export function PricingCards({ opcoes }: Props) {
  return (
    <div className="bf-opt-grid">
      {opcoes.map((opt, i) => (
        <PricingCard key={opt.nome} opt={opt} index={i} />
      ))}
    </div>
  )
}
