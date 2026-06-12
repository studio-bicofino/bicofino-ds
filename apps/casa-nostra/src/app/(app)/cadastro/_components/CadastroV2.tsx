'use client'

/**
 * Casa Nostra v2 — CadastroV2.
 *
 * Form de 8 campos numa única tela, sem scroll em 1440×900.
 * Layout (HANDOFF §5):
 *
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │  Casa Nostra                                       [Salvar] │
 *   ├─────────────────────────────────────────────────────────────┤
 *   │                                                              │
 *   │  ┌──────────┐   Nome _________________________________     │
 *   │  │   foto   │                                                │
 *   │  └──────────┘   Cargo _______   Empresa ______________     │
 *   │                                                              │
 *   │  Contatos                                                    │
 *   │  📞 ✉ 📍 🌐 📷                                              │
 *   │                                                              │
 *   │  Skills / Atuação                                            │
 *   │  [chip ×] [chip ×] [+ tag]                                  │
 *   │                                                              │
 *   │  Grupos                                                      │
 *   │  [chip ×] [+ tag]                                            │
 *   │                                                              │
 *   │  Afiliações                                                  │
 *   │  [chip ×] [+ tag]                                            │
 *   │                                                              │
 *   │                          // BICOFINO // CASA NOSTRA v2      │
 *   └─────────────────────────────────────────────────────────────┘
 *
 * Validação: apenas `full_name` obrigatório. Resto opcional.
 */

import type { CSSProperties } from 'react'
import { useCallback, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'

import { SparkleBurst } from '@/components/SparkleBurst'
import { PhotoUploaderHero } from './PhotoUploaderHero'
import type { Suggestion } from '@/lib/utils/strings'
import type { Tag } from '@/lib/db/types'

import { createPersonV2, updatePersonV2 } from '../_actions/cadastro'
import { type CadastroV2Input } from '../_actions/cadastro-schema'
import { ContactBlock, EMPTY_CONTACTS, type ContactValues } from './ContactBlock'
import { EMPTY_ADDRESS, type AddressValue } from './AddressPopover'
import { TagInput } from './TagInput'

type Props = {
  allTags: Tag[]
  suggestions: {
    current_company: Suggestion[]
    current_title: Suggestion[]
    home_city: Suggestion[]
  }
  mode?: 'create' | 'edit'
  personId?: string
  initialData?: CadastroV2Input
}

const TITLE_STYLE: CSSProperties = {
  fontSize: 'clamp(32px, 4vw, 44px)',
  fontWeight: 500,
  letterSpacing: '-0.02em',
  lineHeight: 1,
  color: 'var(--bf-text-primary)',
  margin: 0,
}

const NAME_INPUT_STYLE: CSSProperties = {
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 22,
  fontWeight: 500,
  letterSpacing: '-0.01em',
  padding: '12px 16px',
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 8,
  outline: 'none',
  transition: 'border-color 120ms ease-out',
  minHeight: 52,
  boxSizing: 'border-box',
}

// Campos compactos que dividem a linha do Nome (tratamento + nascimento).
// Mesma altura do input de nome pra linha ficar alinhada.
const SIDE_FIELD_STYLE: CSSProperties = {
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 14,
  padding: '12px 12px',
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 8,
  outline: 'none',
  transition: 'border-color 120ms ease-out',
  minHeight: 52,
  boxSizing: 'border-box',
}

const BICOFINO_ID_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 13,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '8px 12px',
  width: 160,
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 8,
  outline: 'none',
  transition: 'border-color 120ms ease-out',
}

const HONORIFIC_OPTIONS = ['Mr', 'Mrs', 'Miss'] as const

const LABEL_ROW_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
}

/** Toggle "n/d" — marca um campo como não disponível (some o marcador de pendência). */
function NdToggle({
  on,
  onToggle,
  label,
}: {
  on: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseDown={(e) => e.preventDefault()}
      aria-pressed={on}
      title={on ? 'Desmarcar "não disponível"' : `Marcar ${label} como não disponível`}
      style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 9,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '2px 10px',
        borderRadius: 9999,
        border: '1px solid var(--bf-border)',
        background: 'transparent',
        color: on ? 'var(--bf-text-primary)' : 'var(--bf-text-subtle)',
        cursor: 'pointer',
        transition: 'color 140ms ease-out',
        flexShrink: 0,
      }}
    >
      {on ? '✓ n/d' : 'n/d'}
    </button>
  )
}

function NdNote() {
  return (
    <p
      className="mono"
      style={{
        fontSize: 11,
        letterSpacing: '0.06em',
        color: 'var(--bf-text-subtle)',
        padding: '10px 0',
        margin: 0,
      }}
    >
      não disponível
    </p>
  )
}

const GENERATION_OPTIONS = [
  '1ª Geração',
  '2ª Geração',
  '3ª Geração',
  '4ª Geração',
] as const

const BLOCK_LABEL_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  fontWeight: 500,
  display: 'block',
  marginBottom: 8,
}

const SAVE_BUTTON_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '16px 32px',
  fontSize: 14,
  fontFamily: 'inherit',
  fontWeight: 500,
  background: 'var(--bf-cn-sep)',
  color: 'var(--bf-ops-success-fg)',
  border: 'none',
  borderRadius: 16,
  cursor: 'pointer',
  transition: 'opacity 140ms ease-out, box-shadow 140ms ease-out',
}

const SAVE_BUTTON_ROW_STYLE: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 16,
  marginTop: 16,
}

const FOOTER_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 11,
  letterSpacing: '0.12em',
  color: 'var(--bf-text-primary)',
  opacity: 0.5,
  textAlign: 'right',
  marginTop: 'auto',
  paddingTop: 24,
}

const ERROR_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 11,
  color: 'var(--bf-ops-danger)',
  letterSpacing: '0.04em',
}

export function CadastroV2({
  allTags,
  suggestions,
  mode = 'create',
  personId,
  initialData,
}: Props) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Celebração pós-save: burst de sparkles no botão Salvar, depois navega.
  const [celebrating, setCelebrating] = useState(false)
  const navigatedRef = useRef(false)
  const destRef = useRef('/membros')

  const finishCelebration = useCallback(() => {
    if (navigatedRef.current) return
    navigatedRef.current = true
    router.push(destRef.current)
  }, [router])

  const isEdit = mode === 'edit'

  // Estado do form — inicializado a partir de initialData quando edit.
  const [fullName, setFullName] = useState(initialData?.full_name ?? '')
  const [bicofinoId, setBicofinoId] = useState(initialData?.bicofino_id ?? '')
  const [memberNumber, setMemberNumber] = useState(initialData?.member_number ?? '')
  const [honorific, setHonorific] = useState(initialData?.honorific ?? '')
  const [birthDate, setBirthDate] = useState(initialData?.birth_date ?? '')
  const [generation, setGeneration] = useState(initialData?.generation ?? '')
  const [cargos, setCargos] = useState<string[]>(initialData?.cargos ?? [])
  const [empresas, setEmpresas] = useState<string[]>(initialData?.empresas ?? [])
  const [citizenships, setCitizenships] = useState<string[]>(
    initialData?.citizenships ?? [],
  )
  const [ancestries, setAncestries] = useState<string[]>(
    initialData?.ancestries ?? [],
  )
  // Campos marcados como "não disponível" — suprime o marcador de pendência.
  const [unavailable, setUnavailable] = useState<string[]>(
    initialData?.unavailable_fields ?? [],
  )
  const cargoUnav = unavailable.includes('cargo') && cargos.length === 0

  function setUnav(key: string, on: boolean) {
    setUnavailable((prev) => {
      const without = prev.filter((x) => x !== key)
      return on ? [...without, key] : without
    })
  }

  /** Marcado como n/d E ainda vazio — preencher sempre vence a marcação. */
  function unavFor(key: string, isEmpty: boolean) {
    return isEmpty && unavailable.includes(key)
  }
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    initialData?.photo_url ?? null,
  )
  const [contacts, setContacts] = useState<ContactValues>(
    initialData
      ? {
          whatsapp: initialData.contacts?.whatsapp ?? '',
          email: initialData.contacts?.email ?? '',
          website: initialData.contacts?.website ?? '',
          instagram: initialData.contacts?.instagram ?? '',
        }
      : EMPTY_CONTACTS,
  )
  const [address, setAddress] = useState<AddressValue>(
    initialData
      ? {
          street: initialData.address?.street ?? '',
          number: initialData.address?.number ?? '',
          complement: initialData.address?.complement ?? '',
          neighborhood: initialData.address?.neighborhood ?? '',
          city: initialData.address?.city ?? '',
          state: initialData.address?.state ?? '',
          zip: initialData.address?.zip ?? '',
          country: initialData.address?.country ?? '',
        }
      : EMPTY_ADDRESS,
  )
  const [skills, setSkills] = useState<string[]>(initialData?.skills ?? [])
  const [grupos, setGrupos] = useState<string[]>(initialData?.grupos ?? [])
  const [familias, setFamilias] = useState<string[]>(initialData?.familias ?? [])
  const [afiliacoes, setAfiliacoes] = useState<string[]>(
    initialData?.afiliacoes ?? [],
  )

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)

    const trimmedName = fullName.trim()
    if (!trimmedName) {
      setError('Nome é obrigatório')
      return
    }

    const payload: CadastroV2Input = {
      full_name: trimmedName,
      bicofino_id: bicofinoId.trim() || null,
      member_number: memberNumber.trim() || null,
      honorific: honorific || null,
      birth_date: birthDate || null,
      generation: generation || null,
      cargos,
      empresas,
      citizenships,
      ancestries,
      photo_url: photoUrl,
      unavailable_fields: unavailable,
      contacts: {
        whatsapp: contacts.whatsapp.trim() || null,
        email: contacts.email.trim() || null,
        website: contacts.website.trim() || null,
        instagram: contacts.instagram.trim() || null,
      },
      address: {
        street: address.street.trim() || null,
        number: address.number.trim() || null,
        complement: address.complement.trim() || null,
        neighborhood: address.neighborhood.trim() || null,
        city: address.city.trim() || null,
        state: address.state.trim() || null,
        zip: address.zip.trim() || null,
        country: address.country.trim() || null,
      },
      skills,
      grupos,
      familias,
      afiliacoes,
    }

    startTransition(async () => {
      const result =
        isEdit && personId
          ? await updatePersonV2(personId, payload)
          : await createPersonV2(payload)
      if (result.ok) {
        // Burst de sparkles no botão, navegação após ~650ms (fallback caso o
        // onDone do SparkleBurst não dispare); navigatedRef evita push duplo.
        destRef.current = isEdit ? '/membros' : `/membros?novo=${result.id}`
        setCelebrating(true)
        setTimeout(finishCelebration, 650)
      } else {
        setError(result.error)
      }
    })
  }

  const headerTitle = isEdit
    ? fullName.trim() || initialData?.full_name?.trim() || 'Editar pessoa'
    : 'Casa Nostra'

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
      }
      className="cn-cadastro-v2"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Header — título grande */}
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {isEdit && (
            <span
              className="mono"
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--bf-cn-caffe)',
                fontWeight: 500,
              }}
            >
              // EDITAR
            </span>
          )}
          <h1 style={TITLE_STYLE}>{headerTitle}</h1>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label
              htmlFor="cadastro-member-number"
              style={{ ...BLOCK_LABEL_STYLE, marginBottom: 0 }}
            >
              Sócio nº
            </label>
            <input
              id="cadastro-member-number"
              type="text"
              inputMode="numeric"
              value={memberNumber}
              onChange={(e) => setMemberNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="—"
              disabled={pending}
              style={{ ...BICOFINO_ID_STYLE, width: 110 }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ ...LABEL_ROW_STYLE, alignItems: 'center' }}>
              <label
                htmlFor="cadastro-bicofino-id"
                style={{ ...BLOCK_LABEL_STYLE, marginBottom: 0 }}
              >
                Bicofino ID
              </label>
              {bicofinoId.trim() === '' && (
                <NdToggle
                  on={unavFor('bicofino_id', bicofinoId.trim() === '')}
                  onToggle={() =>
                    setUnav(
                      'bicofino_id',
                      !unavFor('bicofino_id', bicofinoId.trim() === ''),
                    )
                  }
                  label="Bicofino ID"
                />
              )}
            </div>
            {unavFor('bicofino_id', bicofinoId.trim() === '') ? (
              <NdNote />
            ) : (
              <input
                id="cadastro-bicofino-id"
                type="text"
                value={bicofinoId}
                onChange={(e) => setBicofinoId(e.target.value)}
                placeholder="—"
                disabled={pending}
                style={BICOFINO_ID_STYLE}
              />
            )}
          </div>
        </div>
      </header>

      {/* Linha 1 — Foto + Nome/Cargo/Empresa */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 16,
          alignItems: 'start',
          marginTop: 16, // header → hero = 16 + gap base 16 = 32 (lg)
        }}
        className="cn-cadastro-v2__top"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <PhotoUploaderHero
            value={photoUrl}
            onChange={(url) => {
              setPhotoUrl(url)
              if (url) setUnav('photo', false)
            }}
            disabled={pending}
          />
          {!photoUrl && (
            <NdToggle
              on={unavFor('photo', !photoUrl)}
              onToggle={() => setUnav('photo', !unavFor('photo', !photoUrl))}
              label="Foto"
            />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '96px 1fr 170px 150px',
              gap: 16,
              alignItems: 'end',
            }}
            className="cn-cadastro-v2__name-grid"
          >
            <div>
              <label htmlFor="cadastro-honorific" style={BLOCK_LABEL_STYLE}>
                Tratamento
              </label>
              <select
                id="cadastro-honorific"
                value={honorific}
                onChange={(e) => setHonorific(e.target.value)}
                disabled={pending}
                style={{ ...SIDE_FIELD_STYLE, cursor: 'pointer' }}
              >
                <option value="">—</option>
                {HONORIFIC_OPTIONS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cadastro-full-name" style={BLOCK_LABEL_STYLE}>
                Nome
              </label>
              <input
                id="cadastro-full-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nome completo"
                required
                autoFocus
                disabled={pending}
                style={NAME_INPUT_STYLE}
              />
            </div>

            <div>
              <div style={LABEL_ROW_STYLE}>
                <label htmlFor="cadastro-birth-date" style={BLOCK_LABEL_STYLE}>
                  Nascimento
                </label>
                {birthDate === '' && (
                  <NdToggle
                    on={unavFor('birth_date', birthDate === '')}
                    onToggle={() =>
                      setUnav('birth_date', !unavFor('birth_date', birthDate === ''))
                    }
                    label="Nascimento"
                  />
                )}
              </div>
              {unavFor('birth_date', birthDate === '') ? (
                <NdNote />
              ) : (
                <input
                  id="cadastro-birth-date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  disabled={pending}
                  style={SIDE_FIELD_STYLE}
                />
              )}
            </div>

            <div>
              <div style={LABEL_ROW_STYLE}>
                <label htmlFor="cadastro-generation" style={BLOCK_LABEL_STYLE}>
                  Geração
                </label>
                {generation === '' && (
                  <NdToggle
                    on={unavFor('generation', generation === '')}
                    onToggle={() =>
                      setUnav('generation', !unavFor('generation', generation === ''))
                    }
                    label="Geração"
                  />
                )}
              </div>
              {unavFor('generation', generation === '') ? (
                <NdNote />
              ) : (
                <select
                  id="cadastro-generation"
                  value={generation}
                  onChange={(e) => setGeneration(e.target.value)}
                  disabled={pending}
                  style={{ ...SIDE_FIELD_STYLE, cursor: 'pointer' }}
                >
                  <option value="">—</option>
                  {GENERATION_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
            className="cn-cadastro-v2__role-grid"
          >
            <div>
              <div style={LABEL_ROW_STYLE}>
                <label style={BLOCK_LABEL_STYLE}>Cargo</label>
                {cargos.length === 0 && (
                  <NdToggle
                    on={cargoUnav}
                    onToggle={() => setUnav('cargo', !cargoUnav)}
                    label="Cargo"
                  />
                )}
              </div>
              {cargoUnav ? (
                <NdNote />
              ) : (
                <TagInput
                  kind="cargo"
                  value={cargos}
                  onChange={setCargos}
                  allTags={allTags}
                  placeholder="Ex.: CEO, Conselheiro"
                />
              )}
            </div>
            <div>
              <div style={LABEL_ROW_STYLE}>
                <label style={BLOCK_LABEL_STYLE}>Empresa</label>
                {empresas.length === 0 && (
                  <NdToggle
                    on={unavFor('empresa', empresas.length === 0)}
                    onToggle={() =>
                      setUnav('empresa', !unavFor('empresa', empresas.length === 0))
                    }
                    label="Empresa"
                  />
                )}
              </div>
              {unavFor('empresa', empresas.length === 0) ? (
                <NdNote />
              ) : (
                <TagInput
                  kind="empresa"
                  value={empresas}
                  onChange={setEmpresas}
                  allTags={allTags}
                  placeholder="Ex.: Julius Baer, Bicofino"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Linha 2 — Contatos */}
      <section style={{ marginTop: 16 /* hero → Contatos = 16 + gap base 16 = 32 (lg) */ }}>
        <label style={BLOCK_LABEL_STYLE}>Contatos</label>
        <ContactBlock
          contacts={contacts}
          onContactsChange={setContacts}
          address={address}
          onAddressChange={setAddress}
          citySuggestions={suggestions.home_city}
          citizenships={citizenships}
          onCitizenshipsChange={setCitizenships}
          ancestries={ancestries}
          onAncestriesChange={setAncestries}
          unavailable={unavailable}
          onUnavailableChange={setUnavailable}
        />
      </section>

      {/* Linhas 3-6 — blocos de tags (Skills / Grupos / Família / Domínios) */}
      {(
        [
          {
            key: 'skills',
            label: 'Skills · Atuação',
            kind: 'skill',
            value: skills,
            onChange: setSkills,
            placeholder: 'Ex.: Tech, Futebol Atleta, Futebol Dirigente, Financeiro',
          },
          {
            key: 'grupos',
            label: 'Grupos',
            kind: 'grupo',
            value: grupos,
            onChange: setGrupos,
            placeholder: 'Ex.: Clube Pinheiros, Mercado Publicitário',
          },
          {
            key: 'familias',
            label: 'Família',
            kind: 'familia',
            value: familias,
            onChange: setFamilias,
            placeholder: 'Ex.: Família Rossi',
          },
          {
            key: 'afiliacoes',
            label: 'Domínios',
            kind: 'afiliacao',
            value: afiliacoes,
            onChange: setAfiliacoes,
            placeholder: 'Ex.: FIFA, Palmeiras, Adidas, Federação Paulista de Futebol',
          },
        ] as const
      ).map((block) => {
        const empty = block.value.length === 0
        const unav = unavFor(block.key, empty)
        return (
          <section key={block.key}>
            <div style={LABEL_ROW_STYLE}>
              <label style={BLOCK_LABEL_STYLE}>{block.label}</label>
              {empty && (
                <NdToggle
                  on={unav}
                  onToggle={() => setUnav(block.key, !unav)}
                  label={block.label}
                />
              )}
            </div>
            {unav ? (
              <NdNote />
            ) : (
              <TagInput
                kind={block.kind}
                value={block.value}
                onChange={block.onChange}
                allTags={allTags}
                placeholder={block.placeholder}
              />
            )}
          </section>
        )
      })}

      {/* Salvar — fim do form, alinhado à direita */}
      <div style={SAVE_BUTTON_ROW_STYLE}>
        {error && <span style={ERROR_STYLE}>{error}</span>}
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <button
            type="submit"
            disabled={pending || celebrating}
            className="cn-cadastro-v2__save"
            style={{
              ...SAVE_BUTTON_STYLE,
              opacity: pending ? 0.5 : 1,
              cursor: pending || celebrating ? 'not-allowed' : 'pointer',
            }}
          >
            {pending ? 'Salvando…' : 'Salvar'}
            <Check size={20} strokeWidth={1.5} />
          </button>
          {celebrating && <SparkleBurst onDone={finishCelebration} />}
        </span>
      </div>

      {/* Footer — selo */}
      <footer style={FOOTER_STYLE}>
        <span style={{ opacity: 0.7 }}>//</span> BICOFINO{' '}
        <span style={{ opacity: 0.7 }}>//</span> CASA NOSTRA
      </footer>

      <style jsx>{`
        @keyframes cn-save-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0
              color-mix(in srgb, var(--bf-cn-sep) 0%, transparent);
          }
          50% {
            transform: scale(1.035);
            box-shadow: 0 0 0 10px
              color-mix(in srgb, var(--bf-cn-sep) 18%, transparent);
          }
        }
        .cn-cadastro-v2__save:not(:disabled):hover {
          animation: cn-save-pulse 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cn-cadastro-v2__save:not(:disabled):hover {
            animation: none;
          }
        }
      `}</style>
    </motion.form>
  )
}
