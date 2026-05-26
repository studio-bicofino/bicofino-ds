'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signalTypeEnum } from '@/lib/db/schemas'
import type { SignalType } from '@/lib/db/types'
import { createSignal } from '../_actions/signals'
import type { PersonOption } from './SignalFilters'

const formSchema = z.object({
  person_id: z.string().uuid('Selecione uma pessoa'),
  signal_type: signalTypeEnum,
  observed_at: z.string().min(1, 'Data obrigatória'),
  content: z.string().min(1, 'Conteúdo obrigatório'),
  source: z.string().optional(),
})

type FormInput = z.infer<typeof formSchema>

const SIGNAL_TYPE_OPTIONS: { value: SignalType; label: string }[] = [
  { value: 'interesse', label: 'Interesse' },
  { value: 'lifeevent', label: 'Life event' },
  { value: 'capital_move', label: 'Capital move' },
  { value: 'ask', label: 'Ask' },
  { value: 'recusa', label: 'Recusa' },
  { value: 'outro', label: 'Outro' },
]

const inputStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: 14,
  fontFamily: 'inherit',
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border)',
  borderRadius: 8,
  outline: 'none',
  width: '100%',
}

const labelStyle: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  fontWeight: 500,
}

function todayIso(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

type Props = {
  people: PersonOption[]
  defaultPersonId?: string
  onDone: () => void
}

export function AddSignalForm({ people, defaultPersonId, onDone }: Props) {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      person_id: defaultPersonId ?? '',
      signal_type: 'interesse',
      observed_at: todayIso(),
      content: '',
      source: '',
    },
  })

  function onSubmit(values: FormInput) {
    setServerError(null)
    startTransition(async () => {
      const result = await createSignal({
        person_id: values.person_id,
        signal_type: values.signal_type,
        observed_at: values.observed_at,
        content: values.content,
        source: values.source?.trim() ? values.source.trim() : null,
      })
      if (!result.ok) {
        setServerError(result.error)
        return
      }
      reset({
        person_id: defaultPersonId ?? '',
        signal_type: 'interesse',
        observed_at: todayIso(),
        content: '',
        source: '',
      })
      onDone()
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        background: 'var(--bf-surface)',
        border: '1px solid var(--bf-border)',
        borderRadius: 16,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={labelStyle}>Adicionar movimento</p>
        <button
          type="button"
          onClick={onDone}
          disabled={isPending}
          aria-label="Fechar formulário"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--bf-text-secondary)',
            fontSize: 18,
            cursor: 'pointer',
            padding: 4,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle} htmlFor="signal-person">
            Pessoa
          </label>
          <select
            id="signal-person"
            {...register('person_id')}
            style={{ ...inputStyle, cursor: 'pointer' }}
            disabled={isPending || people.length === 0}
          >
            <option value="">— Selecione —</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.preferred_name || p.full_name}
              </option>
            ))}
          </select>
          {errors.person_id && (
            <span style={{ fontSize: 11, color: 'var(--bf-ops-danger)' }}>
              {errors.person_id.message}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle} htmlFor="signal-type">
            Tipo
          </label>
          <select
            id="signal-type"
            {...register('signal_type')}
            style={{ ...inputStyle, cursor: 'pointer' }}
            disabled={isPending}
          >
            {SIGNAL_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle} htmlFor="signal-date">
            Data observada
          </label>
          <input
            id="signal-date"
            {...register('observed_at')}
            type="date"
            style={inputStyle}
            disabled={isPending}
          />
          {errors.observed_at && (
            <span style={{ fontSize: 11, color: 'var(--bf-ops-danger)' }}>
              {errors.observed_at.message}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={labelStyle} htmlFor="signal-source">
            Fonte (opcional)
          </label>
          <input
            id="signal-source"
            {...register('source')}
            type="text"
            placeholder="Conversa, LinkedIn, café…"
            style={inputStyle}
            disabled={isPending}
            autoComplete="off"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={labelStyle} htmlFor="signal-content">
          Conteúdo
        </label>
        <textarea
          id="signal-content"
          {...register('content')}
          rows={3}
          placeholder="Descreva o sinal observado…"
          style={{ ...inputStyle, resize: 'vertical', minHeight: 80, lineHeight: 1.5 }}
          disabled={isPending}
        />
        {errors.content && (
          <span style={{ fontSize: 11, color: 'var(--bf-ops-danger)' }}>
            {errors.content.message}
          </span>
        )}
      </div>

      {serverError && (
        <p style={{ fontSize: 12, color: 'var(--bf-ops-danger)' }}>{serverError}</p>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button
          type="button"
          onClick={onDone}
          disabled={isPending}
          style={{
            padding: '10px 20px',
            fontSize: 13,
            fontWeight: 500,
            background: 'transparent',
            color: 'var(--bf-text-secondary)',
            border: '1px solid var(--bf-border)',
            borderRadius: 9999,
            cursor: isPending ? 'wait' : 'pointer',
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '10px 20px',
            fontSize: 13,
            fontWeight: 500,
            background: 'var(--bf-ops-success)',
            color: 'var(--bf-ops-success-fg)',
            border: 'none',
            borderRadius: 9999,
            cursor: isPending ? 'wait' : 'pointer',
            whiteSpace: 'nowrap',
            opacity: isPending ? 0.7 : 1,
            transition: 'opacity 160ms ease-out',
          }}
        >
          {isPending ? 'Salvando…' : 'Salvar movimento'}
        </button>
      </div>
    </form>
  )
}
