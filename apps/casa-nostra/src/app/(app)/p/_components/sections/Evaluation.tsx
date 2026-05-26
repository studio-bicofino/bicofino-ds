'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { motion } from 'motion/react'
import type { PersonFormInput } from '@/lib/db/schemas'
import { SectionShell, FullRow } from './SectionShell'
import { TextField, FieldShell } from '../Field'
import { ScoreSlider } from './Categorization'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
}

const CADENCE_PRESETS = [4, 8, 12, 24]

export function EvaluationSection({ control, errors }: Props) {
  return (
    <SectionShell
      eyebrow="07 · Avaliação"
      title="A leitura qualitativa da Casa"
      subtitle="Notas internas de intimidade, facilidade de contato e disposição com Bicofino. Cadência alvo é a frequência ideal por ano."
    >
      <Controller
        name="intimacy"
        control={control}
        render={({ field }) => (
          <FieldShell label="Intimidade" error={errors.intimacy?.message}>
            <ScoreSlider
              value={field.value ?? null}
              onChange={field.onChange}
              hintLeft="frio"
              hintRight="íntimo"
            />
          </FieldShell>
        )}
      />

      <Controller
        name="contact_ease"
        control={control}
        render={({ field }) => (
          <FieldShell label="Facilidade de contato" error={errors.contact_ease?.message}>
            <ScoreSlider
              value={field.value ?? null}
              onChange={field.onChange}
              hintLeft="difícil"
              hintRight="fluído"
            />
          </FieldShell>
        )}
      />

      <FullRow>
        <Controller
          name="bicofino_disposition"
          control={control}
          render={({ field }) => (
            <FieldShell
              label="Disposição com Bicofino"
              error={errors.bicofino_disposition?.message}
            >
              <ScoreSlider
                value={field.value ?? null}
                onChange={field.onChange}
                hintLeft="reservado"
                hintRight="aliado"
              />
            </FieldShell>
          )}
        />
      </FullRow>

      <Controller
        name="cadence_target_per_year"
        control={control}
        render={({ field }) => (
          <FieldShell
            label="Cadência alvo (contatos/ano)"
            hint="Sugestões: 4 (patriarca) · 8 (executivo) · 12 (relação próxima) · 24 (atleta)"
            error={errors.cadence_target_per_year?.message}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {CADENCE_PRESETS.map((n) => {
                  const selected = field.value === n
                  return (
                    <motion.button
                      type="button"
                      key={n}
                      onClick={() => field.onChange(selected ? null : n)}
                      aria-pressed={selected}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 9999,
                        border: '1px solid var(--bf-border)',
                        background: selected ? 'var(--bf-text-primary)' : 'transparent',
                        color: selected ? 'var(--bf-bg-page)' : 'var(--bf-text-primary)',
                        fontFamily: 'inherit',
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {n}
                    </motion.button>
                  )
                })}
              </div>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={365}
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(e.target.value === '' ? null : Number(e.target.value))
                }
                placeholder="Custom (ex.: 6)"
                style={{
                  fontFamily: 'inherit',
                  fontSize: 14,
                  padding: '12px 14px',
                  background: 'var(--bf-surface)',
                  color: 'var(--bf-text-primary)',
                  border: '1px solid var(--bf-border)',
                  borderRadius: 10,
                  outline: 'none',
                  width: '100%',
                }}
              />
            </div>
          </FieldShell>
        )}
      />

      <Controller
        name="last_contact_date"
        control={control}
        render={({ field }) => (
          <TextField
            id="last_contact_date"
            label="Último contato"
            type="date"
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.target.value || null)}
            error={errors.last_contact_date?.message}
          />
        )}
      />
    </SectionShell>
  )
}
