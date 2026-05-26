'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { groupTypeEnum } from '@/lib/db/schemas'
import type { GroupType } from '@/lib/db/types'
import { createGroup } from '../_actions/groups'

const formSchema = z.object({
  name: z.string().min(2, 'Nome precisa ter ao menos 2 caracteres').max(120),
  group_type: groupTypeEnum,
})

type FormInput = z.infer<typeof formSchema>

const GROUP_TYPE_OPTIONS: { value: GroupType; label: string }[] = [
  { value: 'clube', label: 'Clube' },
  { value: 'educacional', label: 'Educacional' },
  { value: 'profissional', label: 'Profissional' },
  { value: 'empresarial', label: 'Empresarial' },
  { value: 'entidade', label: 'Entidade' },
  { value: 'pessoal', label: 'Pessoal' },
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
}

export function AddGroupForm() {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', group_type: 'profissional' },
  })

  function onSubmit(values: FormInput) {
    setServerError(null)
    startTransition(async () => {
      const result = await createGroup(values)
      if (!result.ok) {
        setServerError(result.error)
        return
      }
      reset({ name: '', group_type: values.group_type })
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
      <p
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-secondary)',
        }}
      >
        Adicionar grupo
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px auto',
          gap: 12,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <input
            {...register('name')}
            type="text"
            placeholder="Nome do grupo"
            style={inputStyle}
            disabled={isPending}
            autoComplete="off"
          />
          {errors.name && (
            <span
              style={{
                fontSize: 11,
                color: 'var(--bf-ops-danger)',
              }}
            >
              {errors.name.message}
            </span>
          )}
        </div>

        <select
          {...register('group_type')}
          style={{ ...inputStyle, cursor: 'pointer' }}
          disabled={isPending}
        >
          {GROUP_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

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
          {isPending ? 'Salvando…' : 'Salvar'}
        </button>
      </div>

      {serverError && (
        <p
          style={{
            fontSize: 12,
            color: 'var(--bf-ops-danger)',
          }}
        >
          {serverError}
        </p>
      )}
    </form>
  )
}
