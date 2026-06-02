'use client'

import { useEffect, useRef, useState } from 'react'

/* Scroll-reveal — revela o elemento ao entrar em tela (IntersectionObserver),
   uma vez só. Sob prefers-reduced-motion (ou sem IO) mostra na hora. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, shown }
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`bf-reveal-io${shown ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={{ ...style, transitionDelay: shown && delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  )
}
