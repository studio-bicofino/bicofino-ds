'use client'

/**
 * Casa Nostra v2 — TagInput.
 *
 * Adaptado do ChipInput da v0.8.1. Especializado em UM kind de tag por bloco.
 * Recebe a lista global de tags (já carregada pelo server) e filtra
 * client-side as do mesmo `kind` que ainda não foram selecionadas.
 *
 * Comportamento:
 *  - digitar → mostra sugestões filtradas
 *  - Enter ou vírgula → adiciona chip (usa canônico se houver match exato)
 *  - Backspace em input vazio → remove último chip
 *  - clique numa sugestão → adiciona
 *
 * Persistência: o componente trabalha com `string[]` de nomes (não ids).
 * O server action resolve `(kind, name_key)` → tag.id na hora do save.
 */

import type { CSSProperties, KeyboardEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { normalizeKey } from '@/lib/utils/strings'
import type { Tag, TagKind } from '@/lib/db/types'

type Props = {
  kind: TagKind
  value: string[]
  onChange: (next: string[]) => void
  allTags: Tag[]
  placeholder?: string
}

const CHIP_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '2px 4px 2px 12px',
  border: '1px solid var(--bf-border)',
  borderRadius: 9999,
  background: 'var(--bf-surface-subtle)',
  color: 'var(--bf-text-primary)',
  fontSize: 12,
  fontWeight: 500,
  whiteSpace: 'nowrap',
}

const SHELL_STYLE: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
  alignItems: 'center',
  minHeight: 40,
  padding: '6px 10px',
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border)',
  borderRadius: 8,
  outline: 'none',
  transition: 'border-color 120ms ease-out',
}

const DROPDOWN_STYLE: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  zIndex: 20,
  maxHeight: 200,
  overflowY: 'auto',
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 8,
  padding: 4,
}

const ITEM_BASE: CSSProperties = {
  padding: '8px 12px',
  borderRadius: 4,
  fontSize: 13,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  color: 'var(--bf-text-primary)',
}

const HINT_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-subtle)',
}

export function TagInput({ kind, value, onChange, allTags, placeholder }: Props) {
  const [draft, setDraft] = useState('')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const closeOnBlurRef = useRef<number | null>(null)

  const existingKeys = useMemo(
    () => new Set(value.map((v) => normalizeKey(v))),
    [value],
  )

  const pool = useMemo(
    () => allTags.filter((t) => t.kind === kind),
    [allTags, kind],
  )

  type Match = { id: string; name: string; key: string; isNew: boolean }

  const matches = useMemo<Match[]>(() => {
    const query = normalizeKey(draft)
    const available = pool.filter((t) => !existingKeys.has(t.name_key))

    const exact: Match[] = []
    const partial: Match[] = []
    let hasExactMatch = false

    for (const t of available) {
      if (!query) {
        partial.push({ id: t.id, name: t.name, key: t.name_key, isNew: false })
        continue
      }
      if (t.name_key === query) {
        hasExactMatch = true
        exact.push({ id: t.id, name: t.name, key: t.name_key, isNew: false })
      } else if (t.name_key.startsWith(query)) {
        exact.push({ id: t.id, name: t.name, key: t.name_key, isNew: false })
      } else if (t.name_key.includes(query)) {
        partial.push({ id: t.id, name: t.name, key: t.name_key, isNew: false })
      }
    }

    const result = [...exact, ...partial].slice(0, 8)

    // Sugestão "criar nova" no topo quando há texto e não bate exato
    if (query && !hasExactMatch && !existingKeys.has(query)) {
      result.unshift({
        id: `__new__${query}`,
        name: draft.trim(),
        key: query,
        isNew: true,
      })
    }

    return result.slice(0, 8)
  }, [draft, pool, existingKeys])

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

  function addChip(raw: string) {
    const v = raw.trim()
    if (!v) return
    const key = normalizeKey(v)
    if (existingKeys.has(key)) {
      setDraft('')
      return
    }
    const matchExisting = pool.find((t) => t.name_key === key)
    const finalValue = matchExisting ? matchExisting.name : v
    onChange([...value, finalValue])
    setDraft('')
    setHighlight(-1)
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) setOpen(true)
      setHighlight((h) => Math.min(matches.length - 1, h + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(-1, h - 1))
    } else if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (open && highlight >= 0 && matches[highlight]) {
        addChip(matches[highlight].name)
      } else {
        addChip(draft)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setHighlight(-1)
    } else if (e.key === 'Backspace' && draft === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const showDropdown = open && matches.length > 0

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div className="cn-field-shell" style={SHELL_STYLE}>
        {value.map((v) => (
          <span key={v} style={CHIP_STYLE}>
            {v}
            <button
              type="button"
              aria-label={`Remover ${v}`}
              onClick={() => onChange(value.filter((x) => x !== v))}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                padding: 0,
              }}
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            setOpen(true)
            setHighlight(-1)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            closeOnBlurRef.current = window.setTimeout(() => {
              addChip(draft)
              setOpen(false)
            }, 140)
          }}
          onKeyDown={onKey}
          placeholder={value.length === 0 ? placeholder : '+ tag'}
          autoComplete="off"
          style={{
            flex: 1,
            minWidth: 90,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'inherit',
            fontSize: 13,
            color: 'var(--bf-text-primary)',
            padding: '4px 2px',
          }}
        />
      </div>

      {showDropdown && (
        <div
          role="listbox"
          style={DROPDOWN_STYLE}
          onMouseDown={(e) => {
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
                onClick={() => addChip(m.name)}
                style={{
                  ...ITEM_BASE,
                  background: active ? 'var(--bf-cn-nocciola)' : 'transparent',
                }}
              >
                <span>{m.name}</span>
                <span style={HINT_STYLE}>{m.isNew ? 'criar' : 'existente'}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
