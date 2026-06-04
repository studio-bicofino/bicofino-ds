'use client'

import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import type { Control, FieldErrors } from 'react-hook-form'
import { useFieldArray, Controller, useWatch } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import { Trash2, Plus, Building2, Upload, X } from 'lucide-react'

import type { PersonFormInput } from '@/lib/db/schemas'
import type { Organization, OrganizationKind } from '@/lib/db/types'
import { uploadOrgLogo } from '@/lib/storage/org-logos'

import { SectionShell, FullRow } from './SectionShell'
import {
  TextField,
  TextAreaField,
  SelectField,
  FieldShell,
  fieldInputBaseStyle,
} from '../Field'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
  orgs: Organization[]
}

const SECTION_EASE = [0.22, 1, 0.36, 1] as const

const KIND_LABELS: Record<OrganizationKind, string> = {
  empresa: 'Empresa',
  clube: 'Clube',
  midia: 'Mídia',
  escola: 'Escola',
  entidade: 'Entidade',
}

export function AffiliationsSection({ control, errors, orgs }: Props) {
  const affArr = useFieldArray({ control, name: 'organizations' })
  const watched = useWatch({ control, name: 'organizations' }) ?? []
  const [adding, setAdding] = useState(false)

  // Index pra render rápido de logo/nome a partir do org_id.
  const orgById = useMemo(() => {
    const m = new Map<string, Organization>()
    for (const o of orgs) m.set(o.id, o)
    return m
  }, [orgs])

  return (
    <SectionShell
      eyebrow="10 · Vínculos & afiliações"
      title="Organizações com as quais a pessoa tem ligação"
      subtitle="Empresas, clubes, mídia, escolas, entidades — qualquer entidade com logo que apareça no hero. Permite buscar 'quem tem ligação com X' no futuro."
      gridStyle={{ gridTemplateColumns: '1fr', gap: 16 }}
    >
      {affArr.fields.length === 0 && !adding && (
        <FullRow>
          <EmptyHint>Nenhum vínculo registrado.</EmptyHint>
        </FullRow>
      )}

      <AnimatePresence initial={false}>
        {affArr.fields.map((row, i) => {
          const entry = watched[i]
          const linkedOrg = entry?.org_id ? orgById.get(entry.org_id) : null
          const displayName =
            linkedOrg?.name ?? entry?.new_org?.name ?? '(sem nome)'
          const displayKind =
            linkedOrg?.kind ?? entry?.new_org?.kind ?? null
          const displayLogo =
            linkedOrg?.logo_url ?? entry?.new_org?.logo_url ?? null

          return (
            <FullRow key={row.id}>
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: SECTION_EASE }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    padding: 16,
                    border: '1px solid var(--bf-border)',
                    borderRadius: 12,
                    background: 'var(--bf-surface)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <LogoPreview src={displayLogo} alt={displayName} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          color: 'var(--bf-text-primary)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {displayName}
                      </div>
                      {displayKind && (
                        <div
                          className="mono"
                          style={{
                            fontSize: 10,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--bf-text-secondary)',
                            marginTop: 2,
                          }}
                        >
                          {KIND_LABELS[displayKind]}
                          {entry?.is_current ? ' · ATUAL' : ''}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => affArr.remove(i)}
                      aria-label="Remover vínculo"
                      className="cn-icon-btn-danger"
                    >
                      <Trash2 size={18} strokeWidth={2} />
                    </button>
                  </div>

                  {/* Form de criação inline — só quando new_org está sendo preenchido */}
                  {!entry?.org_id && entry?.new_org && (
                    <NewOrgInlineForm control={control} index={i} errors={errors} />
                  )}

                  <div
                    className="cn-form-row"
                    style={{ '--cols': '1fr 100px 100px 1fr' } as React.CSSProperties}
                  >
                    <Controller
                      name={`organizations.${i}.role` as const}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Papel"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(e.target.value || null)}
                          placeholder="Ex.: Sócio, CEO, ex-jogador"
                        />
                      )}
                    />
                    <Controller
                      name={`organizations.${i}.start_year` as const}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Início"
                          type="number"
                          inputMode="numeric"
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === '' ? null : Number(e.target.value),
                            )
                          }
                        />
                      )}
                    />
                    <Controller
                      name={`organizations.${i}.end_year` as const}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Fim"
                          type="number"
                          inputMode="numeric"
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === '' ? null : Number(e.target.value),
                            )
                          }
                          placeholder="Em branco se atual"
                        />
                      )}
                    />
                    <FieldShell label="Atual?">
                      <Controller
                        name={`organizations.${i}.is_current` as const}
                        control={control}
                        render={({ field }) => (
                          <label
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              height: 44,
                              gap: 8,
                              fontSize: 13,
                              color: 'var(--bf-text-primary)',
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={!!field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                            Vínculo ativo
                          </label>
                        )}
                      />
                    </FieldShell>
                  </div>

                  <Controller
                    name={`organizations.${i}.notes` as const}
                    control={control}
                    render={({ field }) => (
                      <TextAreaField
                        label="Notas"
                        rows={2}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        placeholder="Substância qualitativa do vínculo"
                      />
                    )}
                  />
                </div>
              </motion.div>
            </FullRow>
          )
        })}
      </AnimatePresence>

      {/* Combobox de adição */}
      {adding ? (
        <FullRow>
          <AddPicker
            orgs={orgs}
            onPickExisting={(orgId) => {
              affArr.append({
                org_id: orgId,
                new_org: null,
                role: null,
                start_year: null,
                end_year: null,
                is_current: false,
                notes: null,
                sort_order: affArr.fields.length,
              })
              setAdding(false)
            }}
            onCreateNew={(draft) => {
              affArr.append({
                org_id: null,
                new_org: draft,
                role: null,
                start_year: null,
                end_year: null,
                is_current: false,
                notes: null,
                sort_order: affArr.fields.length,
              })
              setAdding(false)
            }}
            onCancel={() => setAdding(false)}
          />
        </FullRow>
      ) : (
        <FullRow>
          <button
            type="button"
            onClick={() => setAdding(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              border: '1px solid var(--bf-border-strong)',
              borderRadius: 9999,
              background: 'transparent',
              color: 'var(--bf-text-primary)',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            <Plus size={16} strokeWidth={1.5} />
            Adicionar vínculo
          </button>
        </FullRow>
      )}
    </SectionShell>
  )
}

// ============================================================
// AddPicker — combobox/seleção pra escolher org existente ou criar nova
// ============================================================

function AddPicker({
  orgs,
  onPickExisting,
  onCreateNew,
  onCancel,
}: {
  orgs: Organization[]
  onPickExisting: (orgId: string) => void
  onCreateNew: (draft: { name: string; kind: OrganizationKind; logo_url: string | null }) => void
  onCancel: () => void
}) {
  const [mode, setMode] = useState<'existing' | 'new'>('existing')
  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newKind, setNewKind] = useState<OrganizationKind>('empresa')
  const [newLogo, setNewLogo] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return orgs.slice(0, 10)
    return orgs
      .filter((o) => o.name.toLowerCase().includes(q))
      .slice(0, 20)
  }, [orgs, query])

  async function handleFileChange(file: File | undefined) {
    if (!file) return
    setUploadError(null)
    setUploading(true)
    const r = await uploadOrgLogo(file)
    setUploading(false)
    if (!r.ok) {
      setUploadError(r.error)
      return
    }
    setNewLogo(r.url)
  }

  const tabStyle = (active: boolean): CSSProperties => ({
    padding: '8px 14px',
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'inherit',
    borderRadius: 9999,
    border: active ? '1px solid var(--bf-border-strong)' : '1px solid transparent',
    background: active ? 'var(--bf-surface)' : 'transparent',
    color: active ? 'var(--bf-text-primary)' : 'var(--bf-text-secondary)',
    cursor: 'pointer',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: SECTION_EASE }}
      style={{
        padding: 16,
        border: '1px solid var(--bf-cn-napoli)',
        borderRadius: 12,
        background: 'rgba(119,222,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={() => setMode('existing')} style={tabStyle(mode === 'existing')}>
          Selecionar existente
        </button>
        <button type="button" onClick={() => setMode('new')} style={tabStyle(mode === 'new')}>
          Criar nova
        </button>
        <div style={{ flex: 1 }} />
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancelar"
          style={{
            width: 32,
            height: 32,
            borderRadius: 9999,
            border: '1px solid var(--bf-border)',
            background: 'transparent',
            color: 'var(--bf-text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>

      {mode === 'existing' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar organização…"
            autoFocus
            style={{ ...fieldInputBaseStyle }}
          />
          {filtered.length === 0 ? (
            <p
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.04em',
                color: 'var(--bf-text-subtle)',
              }}
            >
              Nada encontrado — alterne pra &laquo;Criar nova&raquo;.
            </p>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                maxHeight: 260,
                overflowY: 'auto',
              }}
            >
              {filtered.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => onPickExisting(o.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 8,
                    borderRadius: 8,
                    border: '1px solid transparent',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bf-surface)'
                    e.currentTarget.style.borderColor = 'var(--bf-border)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
                  }}
                >
                  <LogoPreview src={o.logo_url} alt={o.name} small />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: 'var(--bf-text-primary)' }}>{o.name}</div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--bf-text-secondary)',
                      }}
                    >
                      {KIND_LABELS[o.kind]}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            className="cn-form-row"
            style={{ '--cols': '1fr 160px' } as React.CSSProperties}
          >
            <FieldShell label="Nome">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex.: Bicofino"
                style={{ ...fieldInputBaseStyle }}
                autoFocus
              />
            </FieldShell>
            <FieldShell label="Tipo">
              <select
                value={newKind}
                onChange={(e) => setNewKind(e.target.value as OrganizationKind)}
                style={{ ...fieldInputBaseStyle, appearance: 'none', paddingRight: 36 }}
              >
                {(Object.keys(KIND_LABELS) as OrganizationKind[]).map((k) => (
                  <option key={k} value={k}>
                    {KIND_LABELS[k]}
                  </option>
                ))}
              </select>
            </FieldShell>
          </div>

          <FieldShell label="Logo (opcional)">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <LogoPreview src={newLogo} alt="" />
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  fontSize: 12,
                  fontWeight: 500,
                  background: newLogo ? 'transparent' : 'var(--bf-ops-edit)',
                  color: newLogo ? 'var(--bf-text-primary)' : 'var(--bf-ops-edit-fg, #fff)',
                  border: newLogo
                    ? '1px solid var(--bf-border-strong)'
                    : '1px solid var(--bf-ops-edit)',
                  borderRadius: 9999,
                  cursor: uploading ? 'wait' : 'pointer',
                  opacity: uploading ? 0.6 : 1,
                }}
              >
                <Upload size={14} strokeWidth={1.5} />
                {uploading ? 'Enviando…' : newLogo ? 'Trocar' : 'Enviar logo'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
                  onChange={(e) => void handleFileChange(e.target.files?.[0])}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
              {newLogo && (
                <button
                  type="button"
                  onClick={() => setNewLogo(null)}
                  style={{
                    padding: '6px 10px',
                    fontSize: 11,
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--bf-text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  Remover
                </button>
              )}
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  color: 'var(--bf-text-subtle)',
                  letterSpacing: '0.04em',
                }}
              >
                PNG · SVG · até 2 MB
              </span>
            </div>
            {uploadError && (
              <p
                className="mono"
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  color: 'var(--bf-ops-danger)',
                }}
              >
                erro · {uploadError}
              </p>
            )}
          </FieldShell>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              type="button"
              onClick={() => {
                if (!newName.trim()) return
                onCreateNew({
                  name: newName.trim(),
                  kind: newKind,
                  logo_url: newLogo,
                })
              }}
              disabled={!newName.trim() || uploading}
              style={{
                padding: '10px 18px',
                borderRadius: 9999,
                border: 'none',
                background: 'var(--bf-ops-success)',
                color: 'var(--bf-ops-success-fg)',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'inherit',
                cursor: !newName.trim() || uploading ? 'not-allowed' : 'pointer',
                opacity: !newName.trim() || uploading ? 0.6 : 1,
              }}
            >
              Adicionar vínculo
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ============================================================
// NewOrgInlineForm — edição leve dos campos de new_org após appended
// ============================================================

function NewOrgInlineForm({
  control,
  index,
  errors,
}: {
  control: Control<PersonFormInput>
  index: number
  errors: FieldErrors<PersonFormInput>
}) {
  return (
    <div
      style={{
        padding: 12,
        background: 'var(--bf-surface-subtle)',
        border: '1px dashed var(--bf-border)',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-secondary)',
        }}
      >
        Nova org · será criada ao salvar
      </span>
      <div
        className="cn-form-row"
        style={{ '--cols': '1fr 160px' } as React.CSSProperties}
      >
        <Controller
          name={`organizations.${index}.new_org.name` as const}
          control={control}
          render={({ field }) => (
            <TextField
              label="Nome"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              error={errors.organizations?.[index]?.new_org?.name?.message}
            />
          )}
        />
        <Controller
          name={`organizations.${index}.new_org.kind` as const}
          control={control}
          render={({ field }) => (
            <SelectField
              label="Tipo"
              value={field.value ?? 'empresa'}
              onChange={(e) => field.onChange(e.target.value as OrganizationKind)}
            >
              {(Object.keys(KIND_LABELS) as OrganizationKind[]).map((k) => (
                <option key={k} value={k}>
                  {KIND_LABELS[k]}
                </option>
              ))}
            </SelectField>
          )}
        />
      </div>
    </div>
  )
}

// ============================================================
// Helpers
// ============================================================

function LogoPreview({
  src,
  alt,
  small,
}: {
  src: string | null
  alt: string
  small?: boolean
}) {
  const size = small ? 32 : 44
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          background: 'var(--bf-surface)',
          border: '1px solid var(--bf-border)',
          borderRadius: 8,
          flexShrink: 0,
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
        width: size,
        height: size,
        background: 'var(--bf-surface-subtle)',
        border: '1px solid var(--bf-border)',
        borderRadius: 8,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--bf-text-subtle)',
        flexShrink: 0,
      }}
    >
      <Building2 size={small ? 16 : 22} strokeWidth={1.5} />
    </div>
  )
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 16,
        border: '1px dashed var(--bf-border-strong)',
        borderRadius: 12,
        color: 'var(--bf-text-secondary)',
        fontSize: 13,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  )
}
