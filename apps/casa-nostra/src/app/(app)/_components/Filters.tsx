'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'
import type { Group } from '@/lib/db/types'

const CLUSTERS: Array<{ value: '' | 'A' | 'B' | 'C'; label: string }> = [
  { value: '', label: 'Todos clusters' },
  { value: 'A', label: 'Cluster A' },
  { value: 'B', label: 'Cluster B' },
  { value: 'C', label: 'Cluster C' },
]

type Props = {
  groups: Array<Pick<Group, 'id' | 'name' | 'group_type'>>
  initial: { q: string; cluster: string; group: string; city: string }
}

export function Filters({ groups, initial }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [, startTransition] = useTransition()

  const [q, setQ] = useState(initial.q)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function buildHref(patch: Record<string, string>) {
    const next = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    next.delete('page')
    const qs = next.toString()
    return qs ? `/?${qs}` : '/'
  }

  function push(patch: Record<string, string>) {
    startTransition(() => router.replace(buildHref(patch), { scroll: false }))
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (q !== initial.q) push({ q })
    }, 280)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  return (
    <div className="cn-filters">
      <input
        type="search"
        placeholder="Buscar por nome ou empresa…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="cn-filter-input"
      />

      <select
        value={initial.cluster}
        onChange={(e) => push({ cluster: e.target.value })}
        className="cn-filter-input"
      >
        {CLUSTERS.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        value={initial.group}
        onChange={(e) => push({ group: e.target.value })}
        className="cn-filter-input"
      >
        <option value="">Todos grupos</option>
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Cidade"
        defaultValue={initial.city}
        onBlur={(e) => {
          const v = e.target.value.trim()
          if (v !== initial.city) push({ city: v })
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const v = (e.target as HTMLInputElement).value.trim()
            if (v !== initial.city) push({ city: v })
          }
        }}
        className="cn-filter-input"
      />
    </div>
  )
}
