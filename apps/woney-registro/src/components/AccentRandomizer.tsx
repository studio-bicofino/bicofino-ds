'use client'

import { useEffect } from 'react'

/* Accent curado para este projeto (decisão do Woney).
   - `on`: foreground sobre o fundo accent (preto ou branco).
   - `textSafe`: se a cor pode aparecer como TEXTO sobre fundo claro.
     australia e napoli são claras demais → só servem de FUNDO (texto preto por cima),
     nunca como texto sobre fundo claro. Para elas, o "ink" cai para preto. */
const ACCENTS = [
  { hex: '#f0535e', on: '#ffffff', textSafe: true },  // SPFC coral
  { hex: '#2fd298', on: '#2a2c2b', textSafe: true },  // SEP verde
  { hex: '#fe4600', on: '#ffffff', textSafe: true },  // niederland laranja
  { hex: '#0d8aff', on: '#ffffff', textSafe: true },  // como azul
  { hex: '#38e0e3', on: '#2a2c2b', textSafe: true },  // venezia ciano
  { hex: '#e5ff78', on: '#2a2c2b', textSafe: false }, // australia lima — só fundo
  { hex: '#77deff', on: '#2a2c2b', textSafe: false }, // napoli azul-claro — só fundo
]

export function AccentRandomizer() {
  useEffect(() => {
    const a = ACCENTS[Math.floor(Math.random() * ACCENTS.length)]
    const root = document.documentElement.style
    root.setProperty('--current-accent', a.hex)
    root.setProperty('--current-accent-on', a.on)
    root.setProperty('--current-accent-ink', a.textSafe ? a.hex : '#2a2c2b')
  }, [])
  return null
}
