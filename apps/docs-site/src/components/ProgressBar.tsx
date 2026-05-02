'use client'

import { useEffect, useRef } from 'react'

export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = document.getElementById('main-content')
    const bar = ref.current
    if (!scroller || !bar) return

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroller
      const max = scrollHeight - clientHeight
      bar.style.width = max > 0 ? `${(scrollTop / max) * 100}%` : '0%'
    }

    scroller.addEventListener('scroll', update, { passive: true })
    return () => scroller.removeEventListener('scroll', update)
  }, [])

  return <div ref={ref} className="bf-progress" />
}
