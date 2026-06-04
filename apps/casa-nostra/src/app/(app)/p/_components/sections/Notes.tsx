'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { PersonFormInput } from '@/lib/db/schemas'
import { SectionShell, FullRow } from './SectionShell'
import { TextAreaField, FieldShell } from '../Field'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
}

export function NotesSection({ control, errors }: Props) {
  return (
    <SectionShell
      eyebrow="08 · Notas privadas"
      title="O que não cabe nos campos"
      subtitle="Texto livre — substância qualitativa. Markdown permitido. Visível só pra Casa."
      gridStyle={{ gridTemplateColumns: '1fr', gap: 20 }}
    >
      <FullRow>
        <Controller
          name="private_notes"
          control={control}
          render={({ field }) => (
            <TextAreaField
              id="private_notes"
              label="Notas (markdown)"
              rows={10}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value || null)}
              placeholder={
                'Histórico de conversas, movimentos qualitativos, preferências, contexto familiar…\n\nMarkdown OK: # cabeçalhos, **negrito**, - listas.'
              }
              error={errors.private_notes?.message}
            />
          )}
        />
      </FullRow>

      <FullRow>
        <Controller
          name="restrict_visibility"
          control={control}
          render={({ field }) => (
            <FieldShell
              label="Visibilidade"
              hint="Quando ligado, esta pessoa fica visível apenas para admins."
            >
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  padding: '12px 14px',
                  border: '1px solid var(--bf-border)',
                  borderRadius: 10,
                  background: 'var(--bf-surface)',
                  width: 'fit-content',
                }}
              >
                <input
                  type="checkbox"
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--bf-ops-edit)' }}
                />
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  Restringir visibilidade (só admins)
                </span>
              </label>
            </FieldShell>
          )}
        />
      </FullRow>
    </SectionShell>
  )
}
