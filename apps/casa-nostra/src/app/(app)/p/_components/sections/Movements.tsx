'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { useFieldArray, Controller } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import { Trash2, Plus } from 'lucide-react'
import type { PersonFormInput } from '@/lib/db/schemas'
import { SectionShell, FullRow } from './SectionShell'
import { TextField, TextAreaField, SelectField, FieldShell } from '../Field'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function MovementsSection({ control, errors }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: 'signals' })

  return (
    <SectionShell
      eyebrow="09 · Movimentos"
      title="Eventos qualitativos recentes"
      subtitle="Pequenos gatilhos de matchmaking: interesses declarados, life events, movimentos de capital, pedidos, recusas."
      gridStyle={{ gridTemplateColumns: '1fr', gap: 16 }}
    >
      {fields.length === 0 && (
        <FullRow>
          <div
            style={{
              padding: '20px 16px',
              border: '1px dashed var(--bf-border-strong)',
              borderRadius: 12,
              color: 'var(--bf-text-secondary)',
              fontSize: 13,
              textAlign: 'center',
            }}
          >
            Nenhum movimento registrado.
          </div>
        </FullRow>
      )}

      <AnimatePresence initial={false}>
      {fields.map((row, i) => (
        <FullRow key={row.id}>
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
          <div
            className="cn-form-row"
            style={{ '--cols': '160px 160px 1fr 40px' } as React.CSSProperties}
          >
            <Controller
              name={`signals.${i}.signal_type` as const}
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Tipo"
                  value={field.value ?? 'interesse'}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.signals?.[i]?.signal_type?.message}
                >
                  <option value="interesse">Interesse</option>
                  <option value="lifeevent">Life event</option>
                  <option value="capital_move">Movimento de capital</option>
                  <option value="ask">Pedido</option>
                  <option value="recusa">Recusa</option>
                  <option value="outro">Outro</option>
                </SelectField>
              )}
            />

            <Controller
              name={`signals.${i}.observed_at` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Quando"
                  type="date"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.signals?.[i]?.observed_at?.message}
                />
              )}
            />

            <Controller
              name={`signals.${i}.source` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Fonte"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  placeholder="jantar 12/06, ligação, carta…"
                />
              )}
            />

            <FieldShell label=" ">
              <div
                style={{
                  height: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label="Remover movimento"
                  className="cn-icon-btn-danger"
                >
                  <Trash2 size={18} strokeWidth={2} />
                </button>
              </div>
            </FieldShell>
          </div>

          <div style={{ marginTop: 8 }}>
            <Controller
              name={`signals.${i}.content` as const}
              control={control}
              render={({ field }) => (
                <TextAreaField
                  label="Conteúdo"
                  rows={2}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder='Ex.: "Mencionou venda da propriedade em Trancoso"'
                  error={errors.signals?.[i]?.content?.message}
                />
              )}
            />
          </div>
          </motion.div>
        </FullRow>
      ))}
      </AnimatePresence>

      <FullRow>
        <button
          type="button"
          onClick={() =>
            append({
              signal_type: 'interesse',
              observed_at: todayIso(),
              content: '',
              source: null,
            })
          }
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            border: '1px solid var(--bf-border-strong)',
            borderRadius: 9999,
            background: 'transparent',
            color: 'var(--bf-text-primary)',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} strokeWidth={1.5} />
          Adicionar movimento
        </button>
      </FullRow>
    </SectionShell>
  )
}
