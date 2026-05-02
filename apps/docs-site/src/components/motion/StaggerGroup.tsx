import React from 'react'

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function StaggerGroup({ children, style, className }: Props) {
  const cls = ['bf-metric-stagger', className].filter(Boolean).join(' ')
  return (
    <div className={cls} style={style}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        const el = child as React.ReactElement<{ className?: string }>
        return React.cloneElement(el, {
          className: ['bf-metric-item', el.props.className].filter(Boolean).join(' '),
        })
      })}
    </div>
  )
}
