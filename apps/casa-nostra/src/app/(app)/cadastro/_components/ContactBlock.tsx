'use client'

/**
 * Casa Nostra v2 — ContactBlock.
 *
 * 5 ícones inline (whatsapp, email, endereço, website, instagram).
 * Clicar num ícone expande input compacto inline ao lado. Endereço (📍) abre
 * o AddressPopover ancorado no próprio ícone com 7 sub-campos.
 *
 * Tudo um único componente: estado local de qual ícone está "ativo" pra mostrar
 * o input. Quando preenchido, o ícone fica pronunciado (cor primary). Quando
 * vazio, fica em tom secundário.
 */

import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'
import {
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  Instagram,
  type LucideIcon,
} from 'lucide-react'

import { AddressPopover, type AddressValue } from './AddressPopover'
import type { Suggestion } from '@/lib/utils/strings'

export type ContactValues = {
  whatsapp: string
  email: string
  website: string
  instagram: string
}

export const EMPTY_CONTACTS: ContactValues = {
  whatsapp: '',
  email: '',
  website: '',
  instagram: '',
}

type Props = {
  contacts: ContactValues
  onContactsChange: (next: ContactValues) => void
  address: AddressValue
  onAddressChange: (next: AddressValue) => void
  citySuggestions?: Suggestion[]
}

type SimpleField = keyof ContactValues

const FIELDS: Array<{
  key: SimpleField
  icon: LucideIcon
  label: string
  placeholder: string
  type: string
}> = [
  {
    key: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    placeholder: '+55 11 90000-0000',
    type: 'tel',
  },
  {
    key: 'email',
    icon: Mail,
    label: 'Email',
    placeholder: 'nome@dominio.com',
    type: 'email',
  },
  {
    key: 'website',
    icon: Globe,
    label: 'Site',
    placeholder: 'https://...',
    type: 'url',
  },
  {
    key: 'instagram',
    icon: Instagram,
    label: 'Instagram',
    placeholder: '@usuario',
    type: 'text',
  },
]

const ROW_STYLE: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  alignItems: 'center',
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

const SUMMARY_STYLE: CSSProperties = {
  fontSize: 12,
  color: 'var(--bf-text-primary)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 180,
}

const HINT_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'inherit',
  opacity: 0.7,
}

function addressSummary(a: AddressValue): string {
  const parts = [a.city, a.state, a.country].map((s) => s.trim()).filter(Boolean)
  if (parts.length) return parts.join(' · ')
  const street = a.street.trim()
  if (street) return street
  return ''
}

export function ContactBlock({
  contacts,
  onContactsChange,
  address,
  onAddressChange,
  citySuggestions = [],
}: Props) {
  const [active, setActive] = useState<SimpleField | null>(null)
  const [addressOpen, setAddressOpen] = useState(false)
  const addressAnchorRef = useRef<HTMLButtonElement | null>(null)
  const addressWrapperRef = useRef<HTMLDivElement | null>(null)

  function patch(k: SimpleField, v: string) {
    onContactsChange({ ...contacts, [k]: v })
  }

  const addrSummary = addressSummary(address)
  const addrFilled = addrSummary !== ''

  return (
    <div style={ROW_STYLE}>
      {FIELDS.map((f) => {
        const Icon = f.icon
        const filled = contacts[f.key].trim() !== ''
        const isActive = active === f.key
        const showInput = isActive || filled
        const pillStyle = filled ? PILL_FILLED : PILL_BASE

        return (
          <div
            key={f.key}
            style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' }}
          >
            <button
              type="button"
              onClick={() => setActive(isActive ? null : f.key)}
              aria-label={f.label}
              aria-pressed={isActive}
              title={f.label}
              style={pillStyle}
            >
              <Icon size={20} strokeWidth={1.5} />
              {!showInput && <span style={HINT_STYLE}>{f.label}</span>}
              {!isActive && filled && (
                <span style={SUMMARY_STYLE}>{contacts[f.key]}</span>
              )}
            </button>

            {isActive && (
              <input
                type={f.type}
                value={contacts[f.key]}
                onChange={(e) => patch(f.key, e.target.value)}
                onBlur={() => {
                  // Mantém aberto se tem conteúdo (resume vira summary só
                  // quando o user clicar em outro lugar / outro ícone).
                  if (contacts[f.key].trim() === '') setActive(null)
                }}
                placeholder={f.placeholder}
                autoFocus
                style={INLINE_INPUT_STYLE}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    setActive(null)
                    ;(e.target as HTMLInputElement).blur()
                  } else if (e.key === 'Escape') {
                    setActive(null)
                    ;(e.target as HTMLInputElement).blur()
                  }
                }}
              />
            )}
          </div>
        )
      })}

      {/* Endereço — popover */}
      <div ref={addressWrapperRef} style={{ position: 'relative' }}>
        <button
          ref={addressAnchorRef}
          type="button"
          onClick={() => setAddressOpen((v) => !v)}
          aria-label="Endereço"
          aria-expanded={addressOpen}
          title="Endereço"
          style={addrFilled ? PILL_FILLED : PILL_BASE}
        >
          <MapPin size={20} strokeWidth={1.5} />
          {addrFilled ? (
            <span style={SUMMARY_STYLE}>{addrSummary}</span>
          ) : (
            <span style={HINT_STYLE}>Endereço</span>
          )}
        </button>

        <AddressPopover
          value={address}
          onChange={onAddressChange}
          anchorRef={addressAnchorRef}
          open={addressOpen}
          onClose={() => setAddressOpen(false)}
          citySuggestions={citySuggestions}
        />
      </div>
    </div>
  )
}
