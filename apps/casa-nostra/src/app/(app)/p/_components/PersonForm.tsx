'use client'

import type { CSSProperties } from 'react'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Trash2, User } from 'lucide-react'
import { motion } from 'motion/react'
import { personFormSchema, type PersonFormInput } from '@/lib/db/schemas'
import type { PersonWithRelations, Group } from '@/lib/db/types'

// `PersonFormInput` é o tipo de OUTPUT do zod (após defaults aplicados).
// O resolver usa o input do schema (campos com default ficam opcionais),
// mas internamente queremos trabalhar com o output (campos resolvidos).
// Cast pragmático abaixo evita variance hell entre Input vs Output.

import { IdentitySection } from './sections/Identity'
import { CategorizationSection } from './sections/Categorization'
import { ContactsSection } from './sections/Contacts'
import { HistorySection } from './sections/History'
import { ConnectionsSection } from './sections/Connections'
import { GeographySection } from './sections/Geography'
import { EvaluationSection } from './sections/Evaluation'
import { NotesSection } from './sections/Notes'
import { SignalsSection } from './sections/Signals'

type Props = {
  initial?: PersonWithRelations | null
  groups: Pick<Group, 'id' | 'name' | 'group_type'>[]
  introCandidates: Array<{ id: string; full_name: string }>
  onSubmit: (input: PersonFormInput) => Promise<{ ok: boolean; id?: string; error?: string }>
  onDelete?: (id: string) => Promise<{ ok: boolean; error?: string }>
}

function buildDefaults(initial?: PersonWithRelations | null): PersonFormInput {
  if (!initial) {
    return {
      full_name: '',
      preferred_name: null,
      photo_url: null,
      current_company: null,
      current_title: null,
      cluster: null,
      seniority: null,
      expertise_area: null,
      intimacy: null,
      contact_ease: null,
      bicofino_disposition: null,
      network_reach: null,
      home_city: null,
      home_country: null,
      languages: [],
      passports: [],
      intro_by_person_id: null,
      cadence_target_per_year: null,
      last_contact_date: null,
      private_notes: null,
      restrict_visibility: false,
      contact_methods: [],
      categories: [],
      work_history: [],
      futebol_links: [],
      bicofino_history: [],
      groups: [],
      geography_action: [],
      signals: [],
    }
  }

  return {
    full_name: initial.full_name,
    preferred_name: initial.preferred_name,
    photo_url: initial.photo_url,
    current_company: initial.current_company,
    current_title: initial.current_title,
    cluster: initial.cluster,
    seniority: initial.seniority,
    expertise_area: initial.expertise_area,
    intimacy: initial.intimacy,
    contact_ease: initial.contact_ease,
    bicofino_disposition: initial.bicofino_disposition,
    network_reach: initial.network_reach,
    home_city: initial.home_city,
    home_country: initial.home_country,
    languages: initial.languages ?? [],
    passports: initial.passports ?? [],
    intro_by_person_id: initial.intro_by_person_id,
    cadence_target_per_year: initial.cadence_target_per_year,
    last_contact_date: initial.last_contact_date,
    private_notes: initial.private_notes,
    restrict_visibility: initial.restrict_visibility,
    contact_methods: (initial.contact_methods ?? []).map((c) => ({
      type: c.type,
      value: c.value,
      is_primary: c.is_primary,
      label: c.label,
    })),
    categories: (initial.categories ?? []).map((c) => c.category_value),
    work_history: (initial.work_history ?? []).map((w) => ({
      company: w.company,
      role: w.role,
      start_year: w.start_year,
      end_year: w.end_year,
      notes: w.notes,
    })),
    futebol_links: (initial.futebol_links ?? []).map((f) => ({
      link_type: f.link_type,
      entity_name: f.entity_name,
      relation: f.relation,
      notes: f.notes,
    })),
    bicofino_history: (initial.bicofino_history ?? []).map((b) => ({
      project: b.project,
      year: b.year,
      role: b.role,
      outcome: b.outcome,
    })),
    groups: (initial.groups ?? []).map((g) => ({
      group_id: g.id,
      joined_year: null,
      notes: null,
    })),
    geography_action: (initial.geography_action ?? []).map((g) => ({
      region: g.region,
      scope: g.scope,
      context: g.context,
    })),
    signals: (initial.signals ?? []).map((s) => ({
      signal_type: s.signal_type,
      observed_at: s.observed_at,
      content: s.content,
      source: s.source,
    })),
  }
}

const SECTION_EASE = [0.22, 1, 0.36, 1] as const

export function PersonForm({ initial, groups, introCandidates, onSubmit, onDelete }: Props) {
  const router = useRouter()
  const isEdit = !!initial
  const [serverError, setServerError] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PersonFormInput>({
    resolver: zodResolver(personFormSchema) as unknown as Resolver<PersonFormInput>,
    defaultValues: buildDefaults(initial),
    mode: 'onBlur',
  })

  async function handleSave(data: PersonFormInput) {
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await onSubmit(data)
      if (!res.ok) {
        setServerError(res.error ?? 'Erro ao salvar.')
        return
      }
      startTransition(() => {
        router.push('/')
        router.refresh()
      })
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Erro inesperado.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!initial || !onDelete) return
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    setServerError(null)
    try {
      const res = await onDelete(initial.id)
      if (!res.ok) {
        setServerError(res.error ?? 'Erro ao apagar.')
        return
      }
      startTransition(() => {
        router.push('/')
        router.refresh()
      })
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Erro inesperado.')
    } finally {
      setDeleting(false)
    }
  }

  // Stagger leve nas 9 sections + hero (i = 0 hero, 1..9 sections).
  const sectionWrap = (i: number, node: React.ReactNode) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: SECTION_EASE, delay: i * 0.04 }}
    >
      {node}
    </motion.div>
  )

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingBottom: 120,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.36, ease: SECTION_EASE }}
      >
        <Hero control={control} initial={initial} />
      </motion.div>

      {sectionWrap(1, <IdentitySection control={control} errors={errors} />)}
      {sectionWrap(2, <CategorizationSection control={control} errors={errors} />)}
      {sectionWrap(3, <ContactsSection control={control} errors={errors} />)}
      {sectionWrap(4, <HistorySection control={control} errors={errors} />)}
      {sectionWrap(
        5,
        <ConnectionsSection
          control={control}
          errors={errors}
          groups={groups}
          introCandidates={introCandidates}
        />,
      )}
      {sectionWrap(6, <GeographySection control={control} errors={errors} />)}
      {sectionWrap(7, <EvaluationSection control={control} errors={errors} />)}
      {sectionWrap(8, <NotesSection control={control} errors={errors} />)}
      {sectionWrap(9, <SignalsSection control={control} errors={errors} />)}

      <FooterBar
        isEdit={isEdit}
        isDirty={isDirty}
        submitting={submitting}
        deleting={deleting}
        confirmDelete={confirmDelete}
        serverError={serverError}
        onCancel={() => router.push('/')}
        onDelete={onDelete ? handleDelete : undefined}
        onCancelConfirm={() => setConfirmDelete(false)}
      />
    </form>
  )
}

// ============================================================
// Hero
// ============================================================

type HeroProps = {
  control: ReturnType<typeof useForm<PersonFormInput>>['control']
  initial?: PersonWithRelations | null
}

function Hero({ control, initial }: HeroProps) {
  const values = useWatch({ control })
  const displayName =
    values.full_name && values.full_name.trim().length > 0
      ? values.full_name
      : initial?.full_name ?? 'Nova pessoa'
  const photo = values.photo_url ?? null
  const cluster = values.cluster ?? null
  const company = values.current_company ?? null
  const title = values.current_title ?? null

  return (
    <header
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,1))',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid var(--bf-border)',
        borderRadius: 24,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Avatar src={photo} name={displayName} />

        <div
          style={{
            flex: 1,
            minWidth: 280,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            paddingTop: 8,
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--bf-text-secondary)',
            }}
          >
            {initial ? 'Editando pessoa' : 'Nova pessoa'}
          </span>

          <h1
            style={{
              fontSize: 'clamp(40px, 5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              color: 'var(--bf-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {displayName}
          </h1>

          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              alignItems: 'center',
              color: 'var(--bf-text-secondary)',
              fontSize: 14,
            }}
          >
            {title && <span>{title}</span>}
            {title && company && <span style={{ opacity: 0.4 }}>·</span>}
            {company && <span>{company}</span>}
            {cluster && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <ClusterBadge cluster={cluster} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stat strip — pills totalmente arredondadas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}
      >
        <StatPill label="Intimidade" value={values.intimacy ?? null} />
        <StatPill label="Contato" value={values.contact_ease ?? null} />
        <StatPill label="Disposição" value={values.bicofino_disposition ?? null} />
        <StatPill label="Alcance" value={values.network_reach ?? null} />
      </div>
    </header>
  )
}

function Avatar({ src, name }: { src: string | null; name: string }) {
  const common: CSSProperties = {
    width: 140,
    height: 140,
    borderRadius: '50%',
    border: '1px solid var(--bf-border)',
    background: 'var(--bf-surface-subtle)',
  }
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        style={{
          ...common,
          objectFit: 'cover',
        }}
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />
    )
  }
  return (
    <div
      aria-hidden
      style={{
        ...common,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--bf-text-subtle)',
      }}
    >
      <User size={40} strokeWidth={1.5} />
    </div>
  )
}

function ClusterBadge({ cluster }: { cluster: 'A' | 'B' | 'C' }) {
  return (
    <span
      className="mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 9999,
        border: '1px solid var(--bf-border-strong)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.08em',
        color: 'var(--bf-text-primary)',
      }}
    >
      CLUSTER {cluster}
    </span>
  )
}

function StatPill({ label, value }: { label: string; value: number | null }) {
  const empty = value == null
  return (
    <motion.div
      layout
      transition={{ duration: 0.22, ease: SECTION_EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: '14px 22px',
        border: '1px solid var(--bf-border)',
        borderRadius: 9999,
        background: empty
          ? 'transparent'
          : 'rgba(119, 222, 255, 0.10)' /* napoli tint quando preenchido */,
        minWidth: 110,
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 10,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--bf-text-secondary)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 19,
          fontWeight: 500,
          color: empty ? 'var(--bf-text-subtle)' : 'var(--bf-text-primary)',
          lineHeight: 1,
        }}
      >
        {empty ? '—' : `${value}/5`}
      </span>
    </motion.div>
  )
}

// ============================================================
// Footer
// ============================================================

type FooterProps = {
  isEdit: boolean
  isDirty: boolean
  submitting: boolean
  deleting: boolean
  confirmDelete: boolean
  serverError: string | null
  onCancel: () => void
  onDelete?: () => void
  onCancelConfirm: () => void
}

function FooterBar({
  isEdit,
  isDirty,
  submitting,
  deleting,
  confirmDelete,
  serverError,
  onCancel,
  onDelete,
  onCancelConfirm,
}: FooterProps) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        marginTop: 8,
        padding: '16px 24px',
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--bf-border)',
        borderRadius: 16,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      {isEdit && onDelete ? (
        confirmDelete ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span
              className="mono"
              style={{
                fontSize: 11,
                color: 'var(--bf-ops-danger)',
                letterSpacing: '0.04em',
              }}
            >
              Confirmar?
            </span>
            <button
              type="button"
              onClick={onCancelConfirm}
              style={ghostButtonStyle}
              disabled={deleting}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              style={{ ...primaryButtonStyle, background: 'var(--bf-ops-danger)', color: '#fff' }}
            >
              {deleting ? 'Apagando…' : 'Apagar definitivamente'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onDelete}
            style={{
              ...ghostButtonStyle,
              color: 'var(--bf-ops-danger)',
              borderColor: 'var(--bf-ops-danger)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Trash2 size={16} strokeWidth={1.5} />
            Apagar
          </button>
        )
      ) : null}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {serverError ? (
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: 'var(--bf-ops-danger)',
              letterSpacing: '0.04em',
            }}
          >
            {serverError}
          </span>
        ) : isDirty ? (
          <span
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--bf-text-secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Alterações não salvas
          </span>
        ) : null}

        <button
          type="button"
          onClick={onCancel}
          style={ghostButtonStyle}
          disabled={submitting || deleting}
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={submitting || deleting}
          style={{
            ...primaryButtonStyle,
            background: 'var(--bf-ops-success)',
            color: 'var(--bf-ops-success-fg)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Check size={16} strokeWidth={2} />
          {submitting ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Criar pessoa'}
        </button>
      </div>
    </div>
  )
}

const primaryButtonStyle: CSSProperties = {
  padding: '12px 20px',
  borderRadius: 9999,
  border: 'none',
  fontSize: 13,
  fontWeight: 500,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'opacity 120ms ease-out, transform 120ms ease-out',
}

const ghostButtonStyle: CSSProperties = {
  padding: '12px 20px',
  borderRadius: 9999,
  border: '1px solid var(--bf-border-strong)',
  background: 'transparent',
  color: 'var(--bf-text-primary)',
  fontSize: 13,
  fontWeight: 500,
  fontFamily: 'inherit',
  cursor: 'pointer',
}
