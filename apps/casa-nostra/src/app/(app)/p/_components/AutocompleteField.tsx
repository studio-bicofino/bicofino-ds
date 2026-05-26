'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FieldShell, fieldInputBaseStyle } from './Field'
import { normalizeKey, type Suggestion } from '@/lib/utils/strings'

type Props = {
  id?: string
  label?: ReactNode
  value: string
  onChange: (next: string) => void
  onBlur?: () => void
  placeholder?: string
  hint?: string
  error?: string
  suggestions: Suggestion[]
  maxResults?: number
}

const DROPDOWN_STYLE: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  zIndex: 20,
  maxHeight: 240,
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

export function AutocompleteField({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  hint,
  error,
  suggestions,
  maxResults = 6,
}: Props) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const closeOnBlurRef = useRef<number | null>(null)

  const matches = useMemo(() => {
    const query = normalizeKey(value)
    const pool = suggestions
    if (!query) return pool.slice(0, maxResults)
    const exact: Suggestion[] = []
    const partial: Suggestion[] = []
    for (const s of pool) {
      if (s.key === query) continue
      if (s.key.startsWith(query)) exact.push(s)
      else if (s.key.includes(query)) partial.push(s)
    }
    return [...exact, ...partial].slice(0, maxResults)
  }, [value, suggestions, maxResults])

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

  function commit(picked: string) {
    onChange(picked)
    setOpen(false)
    setHighlight(-1)
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
      if (open && highlight >= 0 && matches[highlight]) {
        e.preventDefault()
        commit(matches[highlight].value)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setHighlight(-1)
    }
  }

  const showDropdown = open && matches.length > 0

  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id}>
      <div ref={containerRef} style={{ position: 'relative' }}>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
            setHighlight(-1)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            closeOnBlurRef.current = window.setTimeout(() => {
              setOpen(false)
              onBlur?.()
            }, 120)
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          style={fieldInputBaseStyle}
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
            {matches.map((s, i) => {
              const active = i === highlight
              return (
                <div
                  key={s.key}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => commit(s.value)}
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
