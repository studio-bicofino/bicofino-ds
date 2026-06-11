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
  Flag,
  Sprout,
  type LucideIcon,
} from 'lucide-react'

import { AddressPopover, type AddressValue } from './AddressPopover'
import { CountryMultiSelect } from './CountryMultiSelect'
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
  /** Códigos ISO 3166-1 alpha-2. */
  citizenships: string[]
  onCitizenshipsChange: (next: string[]) => void
  /** Códigos ISO 3166-1 alpha-2. */
  ancestries: string[]
  onAncestriesChange: (next: string[]) => void
}

type SimpleField = keyof ContactValues

/** Países relevantes pro seletor de dial do WhatsApp. BR primeiro (default). */
const COUNTRIES: Array<{ code: string; flag: string; dial: string }> = [
  { code: 'BR', flag: '🇧🇷', dial: '+55' },
  { code: 'US', flag: '🇺🇸', dial: '+1' },
  { code: 'PT', flag: '🇵🇹', dial: '+351' },
  { code: 'IT', flag: '🇮🇹', dial: '+39' },
  { code: 'ES', flag: '🇪🇸', dial: '+34' },
  { code: 'AR', flag: '🇦🇷', dial: '+54' },
  { code: 'UY', flag: '🇺🇾', dial: '+598' },
  { code: 'PY', flag: '🇵🇾', dial: '+595' },
  { code: 'CL', flag: '🇨🇱', dial: '+56' },
  { code: 'CO', flag: '🇨🇴', dial: '+57' },
  { code: 'MX', flag: '🇲🇽', dial: '+52' },
  { code: 'GB', flag: '🇬🇧', dial: '+44' },
  { code: 'FR', flag: '🇫🇷', dial: '+33' },
  { code: 'DE', flag: '🇩🇪', dial: '+49' },
  { code: 'CH', flag: '🇨🇭', dial: '+41' },
  { code: 'NL', flag: '🇳🇱', dial: '+31' },
  { code: 'BE', flag: '🇧🇪', dial: '+32' },
  { code: 'AE', flag: '🇦🇪', dial: '+971' },
  { code: 'SA', flag: '🇸🇦', dial: '+966' },
  { code: 'JP', flag: '🇯🇵', dial: '+81' },
  { code: 'CN', flag: '🇨🇳', dial: '+86' },
]

const DEFAULT_DIAL = '+55'

/** Dials ordenados por comprimento desc — garante que +598 case antes de +55, +55 antes de +1 etc. */
const DIALS_BY_LENGTH = COUNTRIES.map((c) => c.dial).sort((a, b) => b.length - a.length)

/**
 * Quebra o valor único de whatsapp em { dial, local }.
 * Se nenhum dial conhecido casar no início, assume +55 e trata a string
 * inteira como número local (sem duplicar dial).
 */
function parseWhatsapp(value: string): { dial: string; local: string } {
  const v = value.trimStart()
  for (const dial of DIALS_BY_LENGTH) {
    if (v.startsWith(dial)) {
      return { dial, local: v.slice(dial.length).trimStart() }
    }
  }
  return { dial: DEFAULT_DIAL, local: v }
}

/** Compõe o valor salvo. Local vazio → string vazia (nunca salvar só o dial). */
function composeWhatsapp(dial: string, local: string): string {
  if (local.trim() === '') return ''
  return `${dial} ${local}`
}

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
    placeholder: '11 90000-0000',
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

const DIAL_SELECT_STYLE: CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 13,
  padding: '8px 10px',
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 9999,
  outline: 'none',
  cursor: 'pointer',
  transition: 'border-color 120ms ease-out',
  minHeight: 36,
  lineHeight: 1.2,
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
  citizenships,
  onCitizenshipsChange,
  ancestries,
  onAncestriesChange,
}: Props) {
  const [active, setActive] = useState<SimpleField | null>(null)
  const [addressOpen, setAddressOpen] = useState(false)
  const addressAnchorRef = useRef<HTMLButtonElement | null>(null)
  const addressWrapperRef = useRef<HTMLDivElement | null>(null)

  // Dial escolhido quando o número local ainda está vazio (valor salvo = '',
  // então a escolha do país precisa viver em estado local até ter número).
  const [pendingDial, setPendingDial] = useState(DEFAULT_DIAL)

  function patch(k: SimpleField, v: string) {
    onContactsChange({ ...contacts, [k]: v })
  }

  const waParsed = parseWhatsapp(contacts.whatsapp)
  const waDial = contacts.whatsapp.trim() !== '' ? waParsed.dial : pendingDial
  const waLocal = contacts.whatsapp.trim() !== '' ? waParsed.local : ''

  function handleDialChange(dial: string) {
    setPendingDial(dial)
    patch('whatsapp', composeWhatsapp(dial, waLocal))
  }

  function handleLocalChange(local: string) {
    // Se o número for apagado, preserva o dial atual no estado pendente
    // (o valor salvo vira '' e o dial deixaria de ser derivável da string).
    if (local.trim() === '') setPendingDial(waDial)
    patch('whatsapp', composeWhatsapp(waDial, local))
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

            {isActive && f.key === 'whatsapp' && (
              <select
                value={waDial}
                onChange={(e) => handleDialChange(e.target.value)}
                aria-label="Código do país"
                style={DIAL_SELECT_STYLE}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.dial}>
                    {c.flag} {c.dial}
                  </option>
                ))}
              </select>
            )}

            {isActive && (
              <input
                type={f.type}
                value={f.key === 'whatsapp' ? waLocal : contacts[f.key]}
                onChange={(e) =>
                  f.key === 'whatsapp'
                    ? handleLocalChange(e.target.value)
                    : patch(f.key, e.target.value)
                }
                onBlur={(e) => {
                  // Foco indo pro select de país não deve fechar o campo.
                  if (f.key === 'whatsapp' && e.relatedTarget instanceof HTMLSelectElement) return
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

      {/* Cidadania / Ascendência — multi-select de países */}
      <CountryMultiSelect
        label="Cidadania"
        icon={Flag}
        value={citizenships}
        onChange={onCitizenshipsChange}
      />
      <CountryMultiSelect
        label="Ascendência"
        icon={Sprout}
        value={ancestries}
        onChange={onAncestriesChange}
      />
    </div>
  )
}
