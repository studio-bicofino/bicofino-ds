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
import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

import { AutocompleteField } from '@/app/(app)/p/_components/AutocompleteField'
import type { Suggestion } from '@/lib/utils/strings'

export type AddressValue = {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zip: string
  country: string
}

export const EMPTY_ADDRESS: AddressValue = {
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
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
  /** Cidades já cadastradas, pra typeahead canônico. */
  citySuggestions?: Suggestion[]
  /** Endereço marcado como "não disponível" (suprime pendência). */
  unavailable?: boolean
  onUnavailableChange?: (on: boolean) => void
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

const CEP_HINT_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 9,
  letterSpacing: '0.06em',
  marginTop: 4,
  color: 'var(--bf-text-subtle)',
}

function formatCep(raw: string): { digits: string; display: string } {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  const display =
    digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
  return { digits, display }
}

type ViaCepResponse = {
  erro?: boolean | string
  logradouro?: string
  bairro?: string
  localidade?: string
  uf?: string
}

export function AddressPopover({
  value,
  onChange,
  anchorRef,
  open,
  onClose,
  citySuggestions = [],
  unavailable = false,
  onUnavailableChange,
}: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const valueRef = useRef(value)
  const lastLookupRef = useRef<string>('')
  const [cepBusy, setCepBusy] = useState(false)
  const [cepMsg, setCepMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  useEffect(() => {
    valueRef.current = value
  }, [value])

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

  const lookupCep = useCallback(
    async (digits: string) => {
      if (digits.length !== 8) return
      if (lastLookupRef.current === digits) return
      lastLookupRef.current = digits
      setCepBusy(true)
      setCepMsg(null)
      try {
        const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
        if (!res.ok) throw new Error(`status ${res.status}`)
        const data = (await res.json()) as ViaCepResponse
        if (data.erro) {
          setCepMsg({ kind: 'err', text: 'cep não encontrado' })
          return
        }
        const cur = valueRef.current
        // Complemento NÃO é tocado pelo CEP — é campo manual (ex. nº do apto).
        onChange({
          ...cur,
          street: data.logradouro || cur.street,
          neighborhood: data.bairro || cur.neighborhood,
          city: data.localidade || cur.city,
          state: data.uf || cur.state,
          country: 'Brasil',
        })
        setCepMsg({ kind: 'ok', text: 'endereço preenchido' })
      } catch {
        setCepMsg({ kind: 'err', text: 'falha ao buscar cep' })
      } finally {
        setCepBusy(false)
      }
    },
    [onChange],
  )

  if (!open) return null

  function patch<K extends keyof AddressValue>(k: K, v: AddressValue[K]) {
    onChange({ ...value, [k]: v })
    // Preencher qualquer campo desfaz a marcação "não disponível".
    if (unavailable && String(v).trim() !== '') onUnavailableChange?.(false)
  }

  function handleCepChange(raw: string) {
    const { digits, display } = formatCep(raw)
    onChange({ ...value, zip: display })
    if (digits.length < 8) {
      lastLookupRef.current = ''
      setCepMsg(null)
    } else {
      void lookupCep(digits)
    }
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

      {onUnavailableChange && (
        <button
          type="button"
          onClick={() => {
            const next = !unavailable
            onUnavailableChange(next)
            if (next) onClose()
          }}
          aria-pressed={unavailable}
          style={{
            alignSelf: 'flex-start',
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
            transition: 'color 140ms ease-out, border-color 140ms ease-out',
          }}
        >
          {unavailable ? '✓ não disponível — desmarcar' : 'marcar como não disponível'}
        </button>
      )}

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

      <div style={ROW_STYLE}>
        <div>
          <label style={LABEL_STYLE}>Complemento</label>
          <input
            type="text"
            value={value.complement}
            onChange={(e) => patch('complement', e.target.value)}
            placeholder="Ex.: apto 121"
            style={INPUT_STYLE}
          />
        </div>
        <div>
          <label style={LABEL_STYLE}>Bairro</label>
          <input
            type="text"
            value={value.neighborhood}
            onChange={(e) => patch('neighborhood', e.target.value)}
            style={INPUT_STYLE}
            autoComplete="address-level3"
          />
        </div>
      </div>

      <div style={ROW_STYLE}>
        <div>
          <label style={LABEL_STYLE}>Cidade</label>
          <AutocompleteField
            value={value.city}
            onChange={(next) => patch('city', next)}
            suggestions={citySuggestions}
            inputStyle={INPUT_STYLE}
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
            onChange={(e) => handleCepChange(e.target.value)}
            inputMode="numeric"
            placeholder="00000-000"
            maxLength={9}
            style={INPUT_STYLE}
            autoComplete="postal-code"
          />
          {(cepBusy || cepMsg) && (
            <p
              style={{
                ...CEP_HINT_STYLE,
                color: cepBusy
                  ? 'var(--bf-text-subtle)'
                  : cepMsg?.kind === 'err'
                    ? 'var(--bf-ops-danger)'
                    : 'var(--bf-cn-sep)',
              }}
            >
              {cepBusy ? 'buscando…' : cepMsg?.text}
            </p>
          )}
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
    a.neighborhood.trim() === '' &&
    a.city.trim() === '' &&
    a.state.trim() === '' &&
    a.zip.trim() === '' &&
    a.country.trim() === ''
  )
}
