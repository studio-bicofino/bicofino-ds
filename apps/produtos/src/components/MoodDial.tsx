'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * MoodDial — dial de mood da casa, portado do la-rete (contrato portátil).
 * Troca o esquema de cor inteiro da página ciclando pares chão/tinta do
 * canon Bicofino (referência: "Pick your vibe" do wantedfornothing.com).
 *
 * O globals.css deste app deriva TODO o semantic de 3 variáveis + o accent:
 *   --lr-ground · --lr-ink-rgb · --lr-dim-alpha · --current-accent
 *
 * Diferenças do original: o primeiro mood é "Giorno" (o branco default da
 * página, accent null = mantém o sorteio do refresh) e o dial também
 * recalcula --current-accent-on / --current-accent-ink por contraste
 * (o hero usa accent como fundo; o pill usa accent como tinta).
 * Pares chão/tinta medidos no la-rete (WCAG, 2026-06-11).
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
const INK_GIORNO = '42, 44, 43' // --bf-black — o default deste app

export const MOODS: Mood[] = [
  { id: 'giorno', label: 'Giorno', ground: '#ffffff', inkRgb: INK_GIORNO, dimAlpha: 0.64, accent: null },
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

/* luminância relativa (WCAG) de um hex #rrggbb */
function lum(hex: string): number {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return 0
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [x, y] = [lum(a), lum(b)]
  const [hi, lo] = x > y ? [x, y] : [y, x]
  return (hi + 0.05) / (lo + 0.05)
}

function applyMood(mood: Mood, fallbackAccent: string) {
  const root = document.documentElement
  root.style.setProperty('--lr-ground', mood.ground)
  root.style.setProperty('--lr-ink-rgb', mood.inkRgb)
  root.style.setProperty('--lr-dim-alpha', String(mood.dimAlpha))

  const accent = mood.accent ?? fallbackAccent
  root.style.setProperty('--current-accent', accent)
  /* tinta SOBRE o fundo accent: preto em accent claro, branco em escuro */
  root.style.setProperty('--current-accent-on', lum(accent) > 0.4 ? '#061015' : '#ffffff')
  /* accent como TEXTO sobre o chão: cai pra tinta quando o contraste é justo */
  root.style.setProperty(
    '--current-accent-ink',
    contrast(accent, mood.ground) >= 3 ? accent : `rgb(${mood.inkRgb})`,
  )
}

export function MoodDial({ storageKey = 'bf-mood:produtos' }: { storageKey?: string }) {
  const [idx, setIdx] = useState(0)
  /* o sorteio do refresh (AccentRandomizer) é capturado antes de qualquer
     override, para os moods de accent null devolverem o vibrante da visita */
  const drawnAccent = useRef('#f0535e')

  useEffect(() => {
    const drawn = getComputedStyle(document.documentElement)
      .getPropertyValue('--current-accent')
      .trim()
    if (/^#[0-9a-f]{6}$/i.test(drawn)) drawnAccent.current = drawn
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
