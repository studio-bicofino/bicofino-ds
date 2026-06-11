'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * MoodDial — dial de mood da casa. Troca o esquema de cor inteiro da página
 * ciclando pares chão/tinta do canon Bicofino (referência: "Pick your vibe"
 * do wantedfornothing.com).
 *
 * PORTÁTIL POR CONTRATO: o app consumidor só precisa derivar seu CSS de
 * 4 variáveis — o dial não conhece nenhum seletor do app.
 *   --lr-ground     chão da composição
 *   --lr-ink-rgb    tinta da frente (tripla R, G, B — superfícies/fios/textos
 *                   derivam dela via rgba(var(--lr-ink-rgb), alpha))
 *   --lr-dim-alpha  alpha da tinta secundária (medido por chão p/ contraste)
 *   --current-accent  o vibrante (DESIGN.md §5)
 * Para levar a outro app: copiar este arquivo, derivar o CSS do app das
 * variáveis acima e renderizar <MoodDial storageKey="bf-mood:<app>" />.
 *
 * Todos os pares foram medidos (WCAG sobre o chão, 2026-06-11):
 * tinta ≥ 4.5:1 · tinta dim ≥ ~4:1 · accent ≥ 3:1. Em chão vibrante
 * (spfc, como) o vibrante é o próprio chão e o sinal vira a tinta (M-03).
 */
export interface Mood {
  id: string
  label: string
  ground: string
  /** tripla "R, G, B" da tinta */
  inkRgb: string
  /** alpha da tinta secundária — maior em chãos de contraste mais justo */
  dimAlpha: number
  /** sinal pinado; null mantém o sorteio por refresh do app */
  accent: string | null
}

const INK_LIGHT = '242, 248, 255' // --bf-bg
const INK_DARK = '6, 16, 21' // --bf-power-black

export const MOODS: Mood[] = [
  { id: 'notte', label: 'Notte', ground: '#061015', inkRgb: INK_LIGHT, dimAlpha: 0.6, accent: null },
  { id: 'usa', label: 'USA', ground: '#05185c', inkRgb: INK_LIGHT, dimAlpha: 0.6, accent: '#e5ff78' },
  { id: 'torino', label: 'Torino', ground: '#821324', inkRgb: INK_LIGHT, dimAlpha: 0.66, accent: '#f4b3cb' },
  { id: 'caffe', label: 'Caffè', ground: '#33111a', inkRgb: INK_LIGHT, dimAlpha: 0.6, accent: '#2fd298' },
  { id: 'crema', label: 'Crema', ground: '#f3ebd4', inkRgb: INK_DARK, dimAlpha: 0.66, accent: '#821324' },
  { id: 'cielo', label: 'Cielo', ground: '#f2f8ff', inkRgb: INK_DARK, dimAlpha: 0.64, accent: '#0d8aff' },
  { id: 'champagne', label: 'Champagne', ground: '#d8d7d3', inkRgb: INK_DARK, dimAlpha: 0.68, accent: '#711cfe' },
  { id: 'australia', label: 'Australia', ground: '#e5ff78', inkRgb: INK_DARK, dimAlpha: 0.64, accent: '#711cfe' },
  { id: 'miami', label: 'Miami', ground: '#f4b3cb', inkRgb: INK_DARK, dimAlpha: 0.68, accent: '#05185c' },
  { id: 'spfc', label: 'SPFC', ground: '#f0535e', inkRgb: INK_DARK, dimAlpha: 0.82, accent: '#061015' },
  { id: 'como', label: 'Como', ground: '#0d8aff', inkRgb: INK_DARK, dimAlpha: 0.84, accent: '#061015' },
]

function applyMood(mood: Mood, fallbackAccent: string) {
  const root = document.documentElement
  root.style.setProperty('--lr-ground', mood.ground)
  root.style.setProperty('--lr-ink-rgb', mood.inkRgb)
  root.style.setProperty('--lr-dim-alpha', String(mood.dimAlpha))
  root.style.setProperty('--current-accent', mood.accent ?? fallbackAccent)
}

export function MoodDial({ storageKey = 'bf-mood' }: { storageKey?: string }) {
  const [idx, setIdx] = useState(0)
  /* o sorteio do refresh (script no <head>) é capturado antes de qualquer
     override, para o mood Notte devolver o vibrante da visita */
  const drawnAccent = useRef('#f0535e')

  useEffect(() => {
    drawnAccent.current =
      getComputedStyle(document.documentElement).getPropertyValue('--current-accent').trim() ||
      '#f0535e'
    const saved = localStorage.getItem(storageKey)
    const i = MOODS.findIndex((m) => m.id === saved)
    if (i > 0) {
      setIdx(i)
      applyMood(MOODS[i], drawnAccent.current)
    }
  }, [storageKey])

  const cycle = () => {
    const next = (idx + 1) % MOODS.length
    setIdx(next)
    applyMood(MOODS[next], drawnAccent.current)
    localStorage.setItem(storageKey, MOODS[next].id)
  }

  const current = MOODS[idx]
  const next = MOODS[(idx + 1) % MOODS.length]

  return (
    <button
      className="bf-mood"
      onClick={cycle}
      title={`próximo mood: ${next.label}`}
      aria-label={`Mood atual: ${current.label}. Trocar para ${next.label}.`}
    >
      <span className="bf-mood__swatch" style={{ background: next.ground }} aria-hidden />
      mood // {current.label}
    </button>
  )
}
