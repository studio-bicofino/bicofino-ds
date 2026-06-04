'use client'

import type { CSSProperties } from 'react'
import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { motion } from 'motion/react'
import type { PersonFormInput } from '@/lib/db/schemas'
import { SectionShell, FullRow } from './SectionShell'
import { SelectField, FieldShell } from '../Field'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
}

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: 'cliente', label: 'Cliente' },
  { value: 'ex-cliente', label: 'Ex-cliente' },
  { value: 'prospect', label: 'Prospect' },
  { value: 'parceiro', label: 'Parceiro' },
  { value: 'fornecedor', label: 'Fornecedor' },
  { value: 'investidor', label: 'Investidor' },
  { value: 'concorrente', label: 'Concorrente' },
  { value: 'imprensa', label: 'Imprensa' },
  { value: 'referencia', label: 'Referência' },
  { value: 'familia', label: 'Família' },
]

const CLUSTERS: Array<{ value: 'A' | 'B' | 'C' | ''; label: string; hint: string }> = [
  { value: 'A', label: 'A', hint: 'insider' },
  { value: 'B', label: 'B', hint: 'rede ativa' },
  { value: 'C', label: 'C', hint: 'rede ampla' },
  { value: '', label: '—', hint: 'sem classificação' },
]

const chipBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  border: '1px solid var(--bf-border)',
  borderRadius: 9999,
  fontSize: 12,
  fontWeight: 500,
  background: 'transparent',
  color: 'var(--bf-text-primary)',
  cursor: 'pointer',
  transition: 'background 180ms ease-out, color 180ms ease-out, border-color 180ms ease-out',
  fontFamily: 'inherit',
}

const chipSelected: CSSProperties = {
  background: 'var(--bf-text-primary)',
  color: 'var(--bf-bg-page)',
  borderColor: 'var(--bf-text-primary)',
}

export function CategorizationSection({ control, errors }: Props) {
  return (
    <SectionShell
      eyebrow="02 · Categorização"
      title="Onde esta pessoa se encaixa"
      subtitle="Classificação operacional — cluster, senioridade e categorias de relação. Múltiplas categorias podem coexistir."
    >
      <FullRow>
        <Controller
          name="cluster"
          control={control}
          render={({ field }) => (
            <FieldShell label="Cluster" error={errors.cluster?.message}>
              <div role="radiogroup" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CLUSTERS.map((c) => {
                  const selected = (field.value ?? '') === c.value
                  return (
                    <motion.button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      key={c.label}
                      onClick={() => field.onChange(c.value === '' ? null : c.value)}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      style={{
                        ...chipBase,
                        ...(selected ? chipSelected : {}),
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        minWidth: 96,
                        padding: '10px 16px',
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{c.label}</span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 9,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          opacity: 0.75,
                        }}
                      >
                        {c.hint}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </FieldShell>
          )}
        />
      </FullRow>

      <Controller
        name="seniority"
        control={control}
        render={({ field }) => (
          <SelectField
            id="seniority"
            label="Senioridade"
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.target.value || null)}
            error={errors.seniority?.message}
          >
            <option value="">— escolher —</option>
            <option value="pleno">Pleno</option>
            <option value="senior">Sênior</option>
            <option value="executivo">Executivo</option>
            <option value="c-suite">C-suite</option>
            <option value="referencia">Referência</option>
          </SelectField>
        )}
      />

      <Controller
        name="network_reach"
        control={control}
        render={({ field }) => (
          <FieldShell
            label="Alcance de rede (1 local · 5 global)"
            error={errors.network_reach?.message}
          >
            <ScoreSlider
              value={field.value ?? null}
              onChange={field.onChange}
              hintLeft="local"
              hintRight="global"
            />
          </FieldShell>
        )}
      />

      <FullRow>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => {
            const selected = new Set(field.value ?? [])
            const toggle = (val: string) => {
              const next = new Set(selected)
              if (next.has(val)) next.delete(val)
              else next.add(val)
              field.onChange(Array.from(next))
            }
            return (
              <FieldShell label="Categorias de relação" error={errors.categories?.message}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {CATEGORIES.map((cat) => {
                    const isOn = selected.has(cat.value)
                    return (
                      <motion.button
                        type="button"
                        key={cat.value}
                        onClick={() => toggle(cat.value)}
                        aria-pressed={isOn}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{ ...chipBase, ...(isOn ? chipSelected : {}) }}
                      >
                        {cat.label}
                      </motion.button>
                    )
                  })}
                </div>
              </FieldShell>
            )
          }}
        />
      </FullRow>
    </SectionShell>
  )
}

/** Slider 1–5 com botões + indicador de valor. Permite null (limpar). */
export function ScoreSlider({
  value,
  onChange,
  hintLeft,
  hintRight,
}: {
  value: number | null
  onChange: (v: number | null) => void
  hintLeft?: string
  hintRight?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n
          return (
            <motion.button
              type="button"
              key={n}
              onClick={() => onChange(selected ? null : n)}
              aria-pressed={selected}
              aria-label={`Nota ${n}`}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                flex: 1,
                height: 36,
                border: '1px solid var(--bf-border)',
                borderRadius: 10,
                background: selected ? 'var(--bf-text-primary)' : 'var(--bf-surface)',
                color: selected ? 'var(--bf-bg-page)' : 'var(--bf-text-primary)',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 180ms ease-out, color 180ms ease-out',
              }}
            >
              {n}
            </motion.button>
          )
        })}
      </div>
      {(hintLeft || hintRight) && (
        <div
          className="mono"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--bf-text-secondary)',
          }}
        >
          <span>{hintLeft ?? ''}</span>
          <span>{hintRight ?? ''}</span>
        </div>
      )}
    </div>
  )
}
