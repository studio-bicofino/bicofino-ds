/* Bicofino Design System — TypeScript Tokens */

export const colors = {
  bg:          '#f2f8ff',
  black:       '#2a2c2b',
  powerBlack:  '#061015',
  white:       '#ffffff',
  steel:       '#6d7886',
  aluminium:   '#e2eaf2',
  platinum:    '#a8c9e5',
  crema:       '#f3ebd4',
  caffe:       '#33111a',
  champagne:   '#d8d7d3',
  cacao:       '#5e4c41',
  nocciola:    '#d8d7d3',
  spfc:        '#f0535e',
  sep:         '#2fd298',
  usa:         '#05185c',
  niederland:  '#fe4600',
  australia:   '#e5ff78',
  benfica:     '#ed0007',
  miami:       '#f4b3cb',
  napoli:      '#77deff',
  torino:      '#821324',
  como:        '#0d8aff',
  venezia:     '#38e0e3',
  fiorentina:  '#711cfe',
} as const

export const spacing = {
  sp1: 4,
  sp2: 8,
  sp3: 12,
  sp4: 16,
  sp5: 24,
  sp6: 32,
  sp7: 48,
  sp8: 64,
  sp9: 96,
} as const

export const motion = {
  fast:     '120ms',
  base:     '200ms',
  slow:     '360ms',
  easing:   'cubic-bezier(0.2, 0, 0, 1)',
} as const

export const fonts = {
  sans:  '"Inter", ui-sans-serif, system-ui, sans-serif',
  mono:  '"JetBrains Mono", ui-monospace, monospace',
} as const

export const radius = {
  sm: '1px',
  md: '2px',
  lg: '4px',
} as const
