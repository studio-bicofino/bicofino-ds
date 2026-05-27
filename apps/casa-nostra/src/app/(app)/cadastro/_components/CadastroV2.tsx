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
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'

import { PhotoUploaderHero } from './PhotoUploaderHero'
import { AutocompleteField } from '@/app/(app)/p/_components/AutocompleteField'
import type { Suggestion } from '@/lib/utils/strings'
import type { Tag } from '@/lib/db/types'

import { createPersonV2, type CadastroV2Input } from '../_actions/cadastro'
import { ContactBlock, EMPTY_CONTACTS, type ContactValues } from './ContactBlock'
import { EMPTY_ADDRESS, type AddressValue } from './AddressPopover'
import { TagInput } from './TagInput'

type Props = {
  allTags: Tag[]
  suggestions: {
    current_company: Suggestion[]
    current_title: Suggestion[]
  }
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
}

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
  padding: '10px 20px',
  fontSize: 13,
  fontFamily: 'inherit',
  fontWeight: 500,
  background: 'var(--bf-cn-caffe)',
  color: 'var(--bf-cn-crema)',
  border: 'none',
  borderRadius: 9999,
  cursor: 'pointer',
  transition: 'opacity 140ms ease-out',
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

export function CadastroV2({ allTags, suggestions }: Props) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Estado do form
  const [fullName, setFullName] = useState('')
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentCompany, setCurrentCompany] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [contacts, setContacts] = useState<ContactValues>(EMPTY_CONTACTS)
  const [address, setAddress] = useState<AddressValue>(EMPTY_ADDRESS)
  const [skills, setSkills] = useState<string[]>([])
  const [grupos, setGrupos] = useState<string[]>([])
  const [afiliacoes, setAfiliacoes] = useState<string[]>([])

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
      current_title: currentTitle.trim() || null,
      current_company: currentCompany.trim() || null,
      photo_url: photoUrl,
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
        city: address.city.trim() || null,
        state: address.state.trim() || null,
        zip: address.zip.trim() || null,
        country: address.country.trim() || null,
      },
      skills,
      grupos,
      afiliacoes,
    }

    startTransition(async () => {
      const result = await createPersonV2(payload)
      if (result.ok) {
        router.push(`/p/${result.id}`)
      } else {
        setError(result.error)
      }
    })
  }

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
      {/* Header — título grande + Salvar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <h1 style={TITLE_STYLE}>Casa Nostra</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {error && <span style={ERROR_STYLE}>{error}</span>}
          <button
            type="submit"
            disabled={pending}
            style={{ ...SAVE_BUTTON_STYLE, opacity: pending ? 0.6 : 1 }}
          >
            {pending ? 'Salvando…' : 'Salvar'}
          </button>
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
        <PhotoUploaderHero value={photoUrl} onChange={setPhotoUrl} disabled={pending} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
            className="cn-cadastro-v2__role-grid"
          >
            <AutocompleteField
              id="cadastro-current-title"
              label="Cargo"
              value={currentTitle}
              onChange={setCurrentTitle}
              placeholder="Ex.: Diretor de Marketing"
              suggestions={suggestions.current_title}
            />
            <AutocompleteField
              id="cadastro-current-company"
              label="Empresa"
              value={currentCompany}
              onChange={setCurrentCompany}
              placeholder="Ex.: Globo"
              suggestions={suggestions.current_company}
            />
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
        />
      </section>

      {/* Linha 3 — Skills */}
      <section>
        <label style={BLOCK_LABEL_STYLE}>Skills · Atuação</label>
        <TagInput
          kind="skill"
          value={skills}
          onChange={setSkills}
          allTags={allTags}
          placeholder="Ex.: Comunicação, Futebol Atleta"
        />
      </section>

      {/* Linha 4 — Grupos */}
      <section>
        <label style={BLOCK_LABEL_STYLE}>Grupos</label>
        <TagInput
          kind="grupo"
          value={grupos}
          onChange={setGrupos}
          allTags={allTags}
          placeholder="Ex.: Colégio Bandeirantes, Clube Pinheiros"
        />
      </section>

      {/* Linha 5 — Afiliações */}
      <section>
        <label style={BLOCK_LABEL_STYLE}>Afiliações</label>
        <TagInput
          kind="afiliacao"
          value={afiliacoes}
          onChange={setAfiliacoes}
          allTags={allTags}
          placeholder="Ex.: FIFA, Napoli, Globo"
        />
      </section>

      {/* Footer — selo */}
      <footer style={FOOTER_STYLE}>
        <span style={{ opacity: 0.7 }}>//</span> BICOFINO{' '}
        <span style={{ opacity: 0.7 }}>//</span> CASA NOSTRA v2
      </footer>
    </motion.form>
  )
}
