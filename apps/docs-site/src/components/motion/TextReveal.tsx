import React from 'react'

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function TextReveal({ children, style, className }: Props) {
  const cls = ['bf-text-reveal', className].filter(Boolean).join(' ')
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  )
}
