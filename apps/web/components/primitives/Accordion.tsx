'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

function AccordionRow({
  heading,
  body,
  last,
}: {
  heading: string
  body: string
  last: boolean
}) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const shouldReduce = useReducedMotion()

  return (
    <div
      style={{
        borderTop: '1px solid var(--bf-border)',
        ...(last ? { borderBottom: '1px solid var(--bf-border)' } : {}),
      }}
    >
      <button
        className="bf-accordion-btn"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingBlock: 'var(--bf-space-lg)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: '"Inter", ui-sans-serif, sans-serif',
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.2,
            color: open || hover ? 'var(--bf-text-primary)' : 'var(--bf-text-secondary)',
            transition: 'color 180ms ease-out',
          }}
        >
          {heading}
        </span>
        <span
          aria-hidden="true"
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 18,
            color: 'var(--bf-text-subtle)',
            display: 'inline-block',
            transition: shouldReduce ? 'none' : 'transform 220ms ease-out',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            lineHeight: 1,
            flexShrink: 0,
            marginLeft: 'var(--bf-space-md)',
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ opacity: 0, y: shouldReduce ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : -6 }}
            transition={{ duration: shouldReduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFamily: '"Inter", ui-sans-serif, sans-serif',
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--bf-text-secondary)',
                paddingBottom: 'var(--bf-space-lg)',
              }}
            >
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Accordion({
  items,
}: {
  items: { heading: string; body: string }[]
}) {
  return (
    <div>
      <style>{`.bf-accordion-btn:focus-visible{outline:2px solid var(--bf-accent);outline-offset:2px;border-radius:var(--bf-radius-sm)}`}</style>
      {items.map(({ heading, body }, i) => (
        <AccordionRow
          key={heading}
          heading={heading}
          body={body}
          last={i === items.length - 1}
        />
      ))}
    </div>
  )
}
