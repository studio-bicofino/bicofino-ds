'use client'

/**
 * Casa Nostra v2 — CountryMultiSelect.
 *
 * Pill de multi-select de países (Cidadania / Ascendência) no bloco de
 * contatos. Fechado, comporta-se como os outros pills (ícone + label mono);
 * preenchido, mostra bandeirinhas + nomes. Aberto, expõe chips removíveis e
 * input inline com autocomplete pt-BR (bandeira + nome), navegável por
 * teclado. Persistência: `string[]` de códigos ISO 3166-1 alpha-2.
 */

import type { CSSProperties, KeyboardEvent } from 'react'
import { useMemo, useRef, useState } from 'react'
import { X, type LucideIcon } from 'lucide-react'

import {
  countryName,
  flagEmoji,
  searchCountries,
  type CountryOption,
} from '@/lib/utils/countries'

type Props = {
  label: string
  icon: LucideIcon
  /** Códigos ISO 3166-1 alpha-2 selecionados. */
  value: string[]
  onChange: (next: string[]) => void
  /** Campo marcado como "não disponível". */
  unavailable?: boolean
  onUnavailableChange?: (on: boolean) => void
}

const PILL_BASE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 16px',
  borderRadius: 9999,
  border: '1px solid var(--bf-border)',
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-secondary)',
  cursor: 'pointer',
  transition: 'border-color 140ms ease-out, color 140ms ease-out, background 140ms ease-out',
  fontFamily: 'inherit',
  fontSize: 13,
  lineHeight: 1.2,
  minHeight: 36,
}

const PILL_FILLED: CSSProperties = {
  ...PILL_BASE,
  color: 'var(--bf-text-primary)',
  borderColor: 'var(--bf-border-strong)',
}

const HINT_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'inherit',
  opacity: 0.7,
}

const SUMMARY_STYLE: CSSProperties = {
  fontSize: 12,
  color: 'var(--bf-text-primary)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 180,
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

const CHIP_REMOVE_STYLE: CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  padding: 0,
}

const INLINE_INPUT_STYLE: CSSProperties = {
  flex: '1 1 200px',
  minWidth: 160,
  maxWidth: 280,
  fontFamily: 'inherit',
  fontSize: 13,
  padding: '8px 12px',
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 9999,
  outline: 'none',
  transition: 'border-color 120ms ease-out',
  minHeight: 36,
}

const DROPDOWN_STYLE: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  minWidth: 240,
  zIndex: 60,
  maxHeight: 240,
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
  alignItems: 'center',
  gap: 8,
  color: 'var(--bf-text-primary)',
}

export function CountryMultiSelect({
  label,
  icon,
  value,
  onChange,
  unavailable = false,
  onUnavailableChange,
}: Props) {
  const Icon = icon
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [highlight, setHighlight] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const closeOnBlurRef = useRef<number | null>(null)

  const matches = useMemo<CountryOption[]>(
    () => searchCountries(draft, value),
    [draft, value],
  )

  const filled = value.length > 0
  const showDropdown = open && draft.trim() !== '' && matches.length > 0
  const safeHighlight = Math.min(highlight, Math.max(0, matches.length - 1))

  function addCountry(code: string) {
    if (!value.includes(code)) onChange([...value, code])
    // Selecionar um país desfaz a marcação "não disponível".
    if (unavailable) onUnavailableChange?.(false)
    setDraft('')
    setHighlight(0)
    inputRef.current?.focus()
  }

  function removeCountry(code: string) {
    onChange(value.filter((c) => c !== code))
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(matches.length - 1, h + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(0, h - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (showDropdown && matches[safeHighlight]) {
        addCountry(matches[safeHighlight].code)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setDraft('')
      inputRef.current?.blur()
    } else if (e.key === 'Backspace' && draft === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  // Resumo do pill fechado: bandeirinhas sempre, nomes se couber (ellipsis).
  const flags = value.map((c) => flagEmoji(c)).join(' ')
  const names = value.map((c) => countryName(c)).join(' · ')

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexWrap: 'nowrap',
        position: 'relative',
        zIndex: open ? 60 : undefined,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        title={label}
        className="cn-contact-pill"
        style={filled ? PILL_FILLED : PILL_BASE}
      >
        <Icon size={20} strokeWidth={1.5} />
        {!open && filled ? (
          <span style={SUMMARY_STYLE}>
            {flags} {names}
          </span>
        ) : !open && unavailable ? (
          <span
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10,
              letterSpacing: '0.08em',
              color: 'var(--bf-text-subtle)',
              whiteSpace: 'nowrap',
            }}
          >
            não disponível
          </span>
        ) : (
          <span style={HINT_STYLE}>{label}</span>
        )}
      </button>

      {open && (
        <>
          {value.map((code) => (
            <span key={code} style={CHIP_STYLE}>
              <span aria-hidden="true">{flagEmoji(code)}</span>
              {countryName(code)}
              <button
                type="button"
                aria-label={`Remover ${countryName(code)}`}
                onClick={() => removeCountry(code)}
                style={CHIP_REMOVE_STYLE}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </span>
          ))}

          {/* Wrapper relative do input — âncora do dropdown. Irmãos animados
              com transform criam stacking contexts; o zIndex alto fica aqui
              e no container, não só no dropdown. */}
          <div style={{ position: 'relative', zIndex: 60 }}>
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value)
                setHighlight(0)
              }}
              onBlur={() => {
                closeOnBlurRef.current = window.setTimeout(() => {
                  setOpen(false)
                  setDraft('')
                }, 120)
              }}
              onKeyDown={onKey}
              placeholder={value.length === 0 ? 'País...' : '+ país'}
              autoComplete="off"
              autoFocus
              role="combobox"
              aria-expanded={showDropdown}
              aria-label={`Adicionar país em ${label}`}
              style={INLINE_INPUT_STYLE}
            />

            {showDropdown && (
              <div
                role="listbox"
                aria-label={`Sugestões de país para ${label}`}
                style={DROPDOWN_STYLE}
                onMouseDown={(e) => {
                  if (closeOnBlurRef.current) window.clearTimeout(closeOnBlurRef.current)
                  e.preventDefault()
                }}
              >
                {matches.map((m, i) => {
                  const active = i === safeHighlight
                  return (
                    <div
                      key={m.code}
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => addCountry(m.code)}
                      style={{
                        ...ITEM_BASE,
                        background: active ? 'var(--bf-cn-nocciola)' : 'transparent',
                      }}
                    >
                      <span aria-hidden="true">{m.flag}</span>
                      <span>{m.name}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {onUnavailableChange && value.length === 0 && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const next = !unavailable
                onUnavailableChange(next)
                if (next) {
                  setOpen(false)
                  setDraft('')
                }
              }}
              aria-pressed={unavailable}
              title={
                unavailable
                  ? 'Desmarcar "não disponível"'
                  : `Marcar ${label} como não disponível`
              }
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                borderRadius: 9999,
                border: '1px solid var(--bf-border)',
                background: 'transparent',
                color: unavailable ? 'var(--bf-text-primary)' : 'var(--bf-text-subtle)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                minHeight: 36,
                transition: 'color 140ms ease-out',
              }}
            >
              {unavailable ? '✓ n/d' : 'n/d'}
            </button>
          )}
        </>
      )}
    </div>
  )
}
