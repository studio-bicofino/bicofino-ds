import React from 'react'

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function FocusReveal({ children, style, className }: Props) {
  const cls = ['bf-focus-reveal', className].filter(Boolean).join(' ')
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  )
}
