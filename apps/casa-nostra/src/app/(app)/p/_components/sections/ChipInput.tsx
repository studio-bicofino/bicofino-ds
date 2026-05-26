'use client'

import type { CSSProperties, KeyboardEvent } from 'react'
import { useState } from 'react'
import { X } from 'lucide-react'
import { FieldShell, fieldInputBaseStyle } from '../Field'

type Props = {
  label?: string
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  hint?: string
  error?: string
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

/**
 * Input que aceita Enter/vírgula para criar chips. Backspace remove o último
 * quando o input está vazio. Usado para `languages` e `passports`.
 */
export function ChipInput({ label, value, onChange, placeholder, hint, error }: Props) {
  const [draft, setDraft] = useState('')

  function commit() {
    const v = draft.trim()
    if (!v) return
    if (value.includes(v)) {
      setDraft('')
      return
    }
    onChange([...value, v])
    setDraft('')
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commit()
    } else if (e.key === 'Backspace' && draft === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <FieldShell label={label} hint={hint} error={error}>
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
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          onBlur={commit}
          placeholder={value.length === 0 ? placeholder : ''}
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
    </FieldShell>
  )
}
