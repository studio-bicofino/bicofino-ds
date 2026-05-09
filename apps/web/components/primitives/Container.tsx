import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function Container({ children, style, className }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: 1280,
        marginInline: 'auto',
        paddingInline: 'var(--bf-space-lg)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
