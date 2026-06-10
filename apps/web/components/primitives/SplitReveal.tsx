'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

interface SplitRevealProps {
  text: string
  /** gate the entrance (hero intro); defaults to revealed */
  start?: boolean
  baseDelay?: number
  /** delay between words */
  stagger?: number
  duration?: number
  /** px each word travels up (ignored when mask is on) */
  y?: number
  /** clip each word so it rises out of its own fold — the EXP-01 editorial gesture */
  mask?: boolean
  ease?: readonly [number, number, number, number]
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3'
  className?: string
  style?: React.CSSProperties
}

export function SplitReveal({
  text,
  start = true,
  baseDelay = 0,
  stagger = 0.012,
  duration = 0.36,
  y = 10,
  mask = false,
  ease = EASE_OUT,
  as = 'p',
  className,
  style,
}: SplitRevealProps) {
  const reducedMotion = useReducedMotion()
  const Tag = as
  const words = text.split(' ')

  // Static render for reduced motion — text is never trapped behind animation.
  if (reducedMotion) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    )
  }

  const hidden = mask ? { opacity: 0, y: '110%' } : { opacity: 0, y }

  return (
    <Tag className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              overflow: mask ? 'hidden' : undefined,
              verticalAlign: 'top',
            }}
          >
            <motion.span
              className="bf-reveal"
              style={{ display: 'inline-block' }}
              initial={hidden}
              animate={start ? { opacity: 1, y: 0 } : hidden}
              transition={{
                delay: baseDelay + i * stagger,
                duration,
                ease,
              }}
            >
              {word}
            </motion.span>
          </span>{' '}
        </React.Fragment>
      ))}
    </Tag>
  )
}
