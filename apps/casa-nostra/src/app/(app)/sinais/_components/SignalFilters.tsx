'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import type { SignalType } from '@/lib/db/types'

const SIGNAL_TYPES: Array<{ value: '' | SignalType; label: string }> = [
  { value: '', label: 'Todos tipos' },
  { value: 'interesse', label: 'Interesse' },
  { value: 'lifeevent', label: 'Life event' },
  { value: 'capital_move', label: 'Capital move' },
  { value: 'ask', label: 'Ask' },
  { value: 'recusa', label: 'Recusa' },
  { value: 'outro', label: 'Outro' },
]

export type PersonOption = {
  id: string
  full_name: string
  preferred_name: string | null
}

type Props = {
  people: PersonOption[]
  initial: { type: string; person: string }
}

export function SignalFilters({ people, initial }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [, startTransition] = useTransition()

  function buildHref(patch: Record<string, string>) {
    const next = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    const qs = next.toString()
    return qs ? `/sinais?${qs}` : '/sinais'
  }

  function push(patch: Record<string, string>) {
    startTransition(() => router.replace(buildHref(patch), { scroll: false }))
  }

  return (
    <div className="cn-filters">
      <select
        value={initial.type}
        onChange={(e) => push({ type: e.target.value })}
        className="cn-filter-input"
        aria-label="Filtrar por tipo de movimento"
      >
        {SIGNAL_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <select
        value={initial.person}
        onChange={(e) => push({ person: e.target.value })}
        className="cn-filter-input"
        aria-label="Filtrar por pessoa"
      >
        <option value="">Todas pessoas</option>
        {people.map((p) => (
          <option key={p.id} value={p.id}>
            {p.preferred_name || p.full_name}
          </option>
        ))}
      </select>
    </div>
  )
}
