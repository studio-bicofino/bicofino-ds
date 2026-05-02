'use client'

import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    const root = document.getElementById('main-content')
    if (!root) return

    const els = root.querySelectorAll<HTMLElement>(
      '.bf-reveal, .bf-stagger-parent, .bf-text-reveal, .bf-focus-reveal, .bf-metric-stagger'
    )
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.05,
      }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
