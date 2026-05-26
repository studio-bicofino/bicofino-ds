'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { useFieldArray, Controller } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import { Trash2, Plus } from 'lucide-react'
import type { PersonFormInput } from '@/lib/db/schemas'
import { SectionShell, FullRow } from './SectionShell'
import { TextField, SelectField, FieldShell, fieldInputBaseStyle } from '../Field'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
}

export function ContactsSection({ control, errors }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact_methods',
  })

  return (
    <SectionShell
      eyebrow="03 · Contatos"
      title="Como falar com esta pessoa"
      subtitle="Múltiplos canais. Marque um como principal para acelerar atalhos."
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
            Nenhum contato cadastrado.
          </div>
        </FullRow>
      )}

      <AnimatePresence initial={false}>
      {fields.map((row, index) => (
        <FullRow key={row.id}>
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="cn-form-row"
            style={{ '--cols': '160px 1fr 140px 40px 40px', overflow: 'hidden' } as React.CSSProperties}
          >
            <Controller
              name={`contact_methods.${index}.type` as const}
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Tipo"
                  value={field.value ?? 'email'}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.contact_methods?.[index]?.type?.message}
                >
                  <option value="email">Email</option>
                  <option value="phone">Telefone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="outro">Outro</option>
                </SelectField>
              )}
            />

            <Controller
              name={`contact_methods.${index}.value` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Valor"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="email@…, +55 11 …, @handle"
                  error={errors.contact_methods?.[index]?.value?.message}
                />
              )}
            />

            <Controller
              name={`contact_methods.${index}.label` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Rótulo"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  placeholder="trabalho"
                />
              )}
            />

            <Controller
              name={`contact_methods.${index}.is_primary` as const}
              control={control}
              render={({ field }) => (
                <FieldShell label="Princ.">
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 44,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      style={{ width: 18, height: 18, accentColor: 'var(--bf-ops-success)' }}
                    />
                  </label>
                </FieldShell>
              )}
            />

            <FieldShell label=" ">
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Remover contato"
                style={{
                  ...fieldInputBaseStyle,
                  height: 44,
                  width: 44,
                  padding: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--bf-ops-danger)',
                  background: 'var(--bf-surface)',
                }}
              >
                <Trash2 size={18} strokeWidth={1.5} />
              </button>
            </FieldShell>
          </motion.div>
        </FullRow>
      ))}
      </AnimatePresence>

      <FullRow>
        <button
          type="button"
          onClick={() =>
            append({
              type: 'email',
              value: '',
              is_primary: false,
              label: null,
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
            transition: 'background 120ms ease-out',
          }}
        >
          <Plus size={16} strokeWidth={1.5} />
          Adicionar contato
        </button>
      </FullRow>
    </SectionShell>
  )
}
