'use client'

/**
 * Casa Nostra v2 — AddressPopover.
 *
 * Popover ancorado num ícone (📍) com 7 campos de endereço estruturado:
 *  rua, número, complemento, cidade, estado, CEP, país.
 *
 * Tolerante: cidade sozinha já vale. Valida nada além de string trim.
 * Persistência: o pai recebe `AddressValue` completo no onChange.
 *
 * Salva em `people.address_*` + `home_city` + `home_country` no server action.
 */

import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

export type AddressValue = {
  street: string
  number: string
  complement: string
  city: string
  state: string
  zip: string
  country: string
}

export const EMPTY_ADDRESS: AddressValue = {
  street: '',
  number: '',
  complement: '',
  city: '',
  state: '',
  zip: '',
  country: '',
}

type Props = {
  value: AddressValue
  onChange: (next: AddressValue) => void
  anchorRef: React.RefObject<HTMLElement | null>
  open: boolean
  onClose: () => void
}

const PANEL_STYLE: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  zIndex: 40,
  width: 380,
  maxWidth: 'calc(100vw - 32px)',
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 16,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const HEADER_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 8,
}

const HEADER_LABEL_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  fontWeight: 500,
}

const ROW_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 8,
}

const INPUT_STYLE: CSSProperties = {
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 13,
  lineHeight: 1.4,
  padding: '8px 10px',
  background: 'var(--bf-bg-page)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border)',
  borderRadius: 8,
  outline: 'none',
  transition: 'border-color 120ms ease-out',
}

const LABEL_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-subtle)',
  display: 'block',
  marginBottom: 4,
}

export function AddressPopover({ value, onChange, anchorRef, open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node
      if (panelRef.current?.contains(target)) return
      if (anchorRef.current?.contains(target)) return
      onClose()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, anchorRef, onClose])

  if (!open) return null

  function patch<K extends keyof AddressValue>(k: K, v: AddressValue[K]) {
    onChange({ ...value, [k]: v })
  }

  return (
    <div ref={panelRef} style={PANEL_STYLE} role="dialog" aria-label="Endereço">
      <div style={HEADER_STYLE}>
        <span style={HEADER_LABEL_STYLE}>Endereço</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--bf-text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            borderRadius: 4,
          }}
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
        <div>
          <label style={LABEL_STYLE}>Rua</label>
          <input
            type="text"
            value={value.street}
            onChange={(e) => patch('street', e.target.value)}
            style={INPUT_STYLE}
            autoComplete="street-address"
          />
        </div>
        <div>
          <label style={LABEL_STYLE}>Número</label>
          <input
            type="text"
            value={value.number}
            onChange={(e) => patch('number', e.target.value)}
            style={INPUT_STYLE}
          />
        </div>
      </div>

      <div>
        <label style={LABEL_STYLE}>Complemento</label>
        <input
          type="text"
          value={value.complement}
          onChange={(e) => patch('complement', e.target.value)}
          style={INPUT_STYLE}
        />
      </div>

      <div style={ROW_STYLE}>
        <div>
          <label style={LABEL_STYLE}>Cidade</label>
          <input
            type="text"
            value={value.city}
            onChange={(e) => patch('city', e.target.value)}
            style={INPUT_STYLE}
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label style={LABEL_STYLE}>Estado</label>
          <input
            type="text"
            value={value.state}
            onChange={(e) => patch('state', e.target.value)}
            style={INPUT_STYLE}
            autoComplete="address-level1"
          />
        </div>
      </div>

      <div style={ROW_STYLE}>
        <div>
          <label style={LABEL_STYLE}>CEP</label>
          <input
            type="text"
            value={value.zip}
            onChange={(e) => patch('zip', e.target.value)}
            style={INPUT_STYLE}
            autoComplete="postal-code"
          />
        </div>
        <div>
          <label style={LABEL_STYLE}>País</label>
          <input
            type="text"
            value={value.country}
            onChange={(e) => patch('country', e.target.value)}
            style={INPUT_STYLE}
            autoComplete="country-name"
          />
        </div>
      </div>
    </div>
  )
}

export function addressIsEmpty(a: AddressValue): boolean {
  return (
    a.street.trim() === '' &&
    a.number.trim() === '' &&
    a.complement.trim() === '' &&
    a.city.trim() === '' &&
    a.state.trim() === '' &&
    a.zip.trim() === '' &&
    a.country.trim() === ''
  )
}
