'use client'

import type { CSSProperties, KeyboardEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { FieldShell, fieldInputBaseStyle } from '../Field'
import { normalizeKey, type Suggestion } from '@/lib/utils/strings'

type Props = {
  label?: string
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  hint?: string
  error?: string
  suggestions?: Suggestion[]
  maxResults?: number
}

const chipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 8px 4px 12px',
  border: '1px solid var(--bf-border)',
  borderRadius: 9999,
  background: 'var(--bf-text-primary)',
  color: 'var(--bf-bg-page)',
  fontSize: 12,
  fontWeight: 500,
}

const DROPDOWN_STYLE: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  zIndex: 20,
  maxHeight: 220,
  overflowY: 'auto',
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 10,
  boxShadow: '0 8px 24px rgba(51, 17, 26, 0.08)',
  padding: 4,
}

const ITEM_BASE: CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  fontSize: 13,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  color: 'var(--bf-text-primary)',
}

const COUNT_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.06em',
  color: 'var(--bf-text-subtle)',
}

/**
 * Input que aceita Enter/vírgula para criar chips. Backspace remove o último
 * quando o input está vazio. Suporta sugestões com agrupamento por chave
 * normalizada — quando o valor digitado bate com uma sugestão, persiste o
 * canônico em vez da grafia digitada.
 */
export function ChipInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  suggestions = [],
  maxResults = 6,
}: Props) {
  const [draft, setDraft] = useState('')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const closeOnBlurRef = useRef<number | null>(null)

  const existingKeys = useMemo(() => new Set(value.map((v) => normalizeKey(v))), [value])

  const matches = useMemo(() => {
    if (suggestions.length === 0) return [] as Suggestion[]
    const query = normalizeKey(draft)
    const filtered = suggestions.filter((s) => !existingKeys.has(s.key))
    if (!query) return filtered.slice(0, maxResults)
    const exact: Suggestion[] = []
    const partial: Suggestion[] = []
    for (const s of filtered) {
      if (s.key === query) continue
      if (s.key.startsWith(query)) exact.push(s)
      else if (s.key.includes(query)) partial.push(s)
    }
    return [...exact, ...partial].slice(0, maxResults)
  }, [draft, suggestions, existingKeys, maxResults])

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
    const matchSuggestion = suggestions.find((s) => s.key === key)
    const finalValue = matchSuggestion ? matchSuggestion.value : v
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
        addChip(matches[highlight].value)
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
    <FieldShell label={label} hint={hint} error={error}>
      <div ref={containerRef} style={{ position: 'relative' }}>
        <div
          style={{
            ...fieldInputBaseStyle,
            padding: '8px 10px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            alignItems: 'center',
            minHeight: 44,
          }}
        >
          {value.map((v) => (
            <span key={v} style={chipStyle}>
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
                  padding: 2,
                }}
              >
                <X size={12} strokeWidth={2} />
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
              }, 120)
            }}
            onKeyDown={onKey}
            placeholder={value.length === 0 ? placeholder : ''}
            autoComplete="off"
            style={{
              flex: 1,
              minWidth: 100,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'inherit',
              fontSize: 14,
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
            {matches.map((s, i) => {
              const active = i === highlight
              return (
                <div
                  key={s.key}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => addChip(s.value)}
                  style={{
                    ...ITEM_BASE,
                    background: active ? 'var(--bf-cn-nocciola)' : 'transparent',
                  }}
                >
                  <span>{s.value}</span>
                  <span style={COUNT_STYLE}>{s.count}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </FieldShell>
  )
}
