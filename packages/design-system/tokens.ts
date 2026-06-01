/* Bicofino Design System — TypeScript Tokens · v3.1 */
/* Mirror of tokens.css. Keep the two in sync. */

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

/* The Highlights set the "one vibrant" (--current-accent) is randomised from. */
export const highlightKeys = [
  'spfc', 'sep', 'usa', 'niederland', 'australia', 'benfica',
  'miami', 'napoli', 'torino', 'como', 'venezia', 'fiorentina',
] as const

export const spacing = {
  sp1: 4,  sp2: 8,  sp3: 12, sp4: 16, sp5: 24,
  sp6: 32, sp7: 48, sp8: 64, sp9: 96,
} as const

export const motion = {
  fast:     '120ms',
  base:     '200ms',
  slow:     '360ms',
  ambient:  '6000ms',
  easing:   'cubic-bezier(0.2, 0, 0, 1)',
  easeOut:  'cubic-bezier(0.16, 1, 0.3, 1)',
} as const

export const fonts = {
  sans:    '"Inter", ui-sans-serif, system-ui, sans-serif',
  mono:    '"JetBrains Mono", ui-monospace, monospace',
  impact:  '"Gotham", "Inter", ui-sans-serif, sans-serif', // 1–2 impact words only (post titles, athlete names)
} as const

/* Two corner languages. Pills are full-round in both. Components read `corner`. */
export const radius = {
  sharp: { c1: '2px',  c2: '4px',  c3: '8px'  },
  soft:  { c1: '12px', c2: '18px', c3: '28px' },
  pill:  '9999px',
} as const

export const lines = {
  hairline:       '1px solid rgba(42, 44, 43, 0.08)',
  hairlineDark:   '1px solid rgba(168, 201, 229, 0.20)',
  lineOnDark:       'rgba(168, 201, 229, 0.20)',
  lineOnDarkStrong: 'rgba(168, 201, 229, 0.32)',
  dotOnDark:        'rgba(168, 201, 229, 0.10)',
} as const
