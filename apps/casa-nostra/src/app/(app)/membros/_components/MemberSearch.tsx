'use client'

/**
 * Casa Nostra v2 — MemberSearch.
 *
 * Input de busca com typeahead. Filtra a lista de membros client-side por
 * nome ou empresa e mostra um dropdown de sugestões. Selecionar uma sugestão
 * navega direto pra `/membros/[id]`. Enter sem seleção dispara busca server-side
 * (`/membros?q=...`), preservando filtro + paginação da página.
 */

import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { normalizeKey } from '@/lib/utils/strings'

export type MemberSearchOption = {
  id: string
  name: string
  company: string | null
}

type Props = {
  initialQuery: string
  options: MemberSearchOption[]
  maxResults?: number
}

type Indexed = MemberSearchOption & { nameKey: string; companyKey: string }

const INPUT_STYLE: CSSProperties = {
  width: '100%',
  minWidth: 0,
  padding: '10px 16px',
  fontSize: 14,
  fontFamily: 'inherit',
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border)',
  borderRadius: 9999,
  color: 'var(--bf-text-primary)',
  outline: 'none',
}

const DROPDOWN_STYLE: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 6px)',
  left: 0,
  right: 0,
  zIndex: 30,
  maxHeight: 320,
  overflowY: 'auto',
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(51, 17, 26, 0.08)',
  padding: 4,
}

const ITEM_BASE: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  padding: '8px 12px',
  borderRadius: 10,
  cursor: 'pointer',
}

const ITEM_NAME_STYLE: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--bf-text-primary)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const ITEM_COMPANY_STYLE: CSSProperties = {
  fontSize: 12,
  color: 'var(--bf-text-secondary)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

export function MemberSearch({ initialQuery, options, maxResults = 8 }: Props) {
  const router = useRouter()
  const [value, setValue] = useState(initialQuery)
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const closeOnBlurRef = useRef<number | null>(null)

  const indexed = useMemo<Indexed[]>(
    () =>
      options.map((o) => ({
        ...o,
        nameKey: normalizeKey(o.name),
        companyKey: normalizeKey(o.company),
      })),
    [options],
  )

  const matches = useMemo<Indexed[]>(() => {
    const query = normalizeKey(value)
    if (!query) return []
    const starts: Indexed[] = []
    const contains: Indexed[] = []
    for (const o of indexed) {
      if (o.nameKey.startsWith(query)) starts.push(o)
      else if (o.nameKey.includes(query) || o.companyKey.includes(query))
        contains.push(o)
    }
    return [...starts, ...contains].slice(0, maxResults)
  }, [value, indexed, maxResults])

  useEffect(() => {
    if (highlight >= matches.length) setHighlight(matches.length - 1)
  }, [matches.length, highlight])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  function goToMember(id: string) {
    setOpen(false)
    setHighlight(-1)
    router.push(`/membros/${id}`)
  }

  function runSearch() {
    setOpen(false)
    const q = value.trim()
    router.push(q ? `/membros?q=${encodeURIComponent(q)}` : '/membros')
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) setOpen(true)
      setHighlight((h) => Math.min(matches.length - 1, h + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(-1, h - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (open && highlight >= 0 && matches[highlight]) {
        goToMember(matches[highlight].id)
      } else {
        runSearch()
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setHighlight(-1)
    }
  }

  const showDropdown = open && matches.length > 0

  return (
    <div ref={containerRef} style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <input
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setOpen(true)
          setHighlight(-1)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          closeOnBlurRef.current = window.setTimeout(() => setOpen(false), 120)
        }}
        onKeyDown={onKeyDown}
        placeholder="Buscar por nome ou empresa"
        autoComplete="off"
        aria-label="Buscar membros"
        style={INPUT_STYLE}
      />

      {showDropdown && (
        <div
          role="listbox"
          style={DROPDOWN_STYLE}
          onMouseDown={(e) => {
            // Evita o blur fechar antes do click registrar.
            if (closeOnBlurRef.current) window.clearTimeout(closeOnBlurRef.current)
            e.preventDefault()
          }}
        >
          {matches.map((m, i) => {
            const active = i === highlight
            return (
              <div
                key={m.id}
                role="option"
                aria-selected={active}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => goToMember(m.id)}
                style={{
                  ...ITEM_BASE,
                  background: active ? 'var(--bf-cn-nocciola)' : 'transparent',
                }}
              >
                <span style={ITEM_NAME_STYLE}>{m.name}</span>
                {m.company && <span style={ITEM_COMPANY_STYLE}>{m.company}</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
