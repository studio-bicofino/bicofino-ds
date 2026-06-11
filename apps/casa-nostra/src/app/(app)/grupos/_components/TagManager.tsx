'use client'

/**
 * Casa Nostra v2 — gestão de tags (/grupos).
 *
 * Duas seções: "Grupos" (kind=grupo) e "Domínios" (kind=afiliacao —
 * rename de LABEL apenas; o valor no banco continua 'afiliacao').
 *
 * Por linha: renomear inline (Enter confirma / Esc cancela) e apagar
 * com confirmação inline (✓/✕), sem window.confirm.
 */

import { useRef, useState, useTransition, type CSSProperties } from 'react'
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react'

import type { TagKind } from '@/lib/db/types'
import { createTagAdmin, deleteTagAdmin, renameTagAdmin } from '../_actions/tags-admin'

export type TagRow = {
  id: string
  name: string
  count: number
}

type Props = {
  groups: TagRow[]
  families: TagRow[]
  domains: TagRow[]
}

// ============================================================
// Estilos compartilhados
// ============================================================

const sectionLabelStyle: CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  fontWeight: 500,
}

const inputStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  padding: '8px 12px',
  fontSize: 14,
  fontFamily: 'inherit',
  color: 'var(--bf-text-primary)',
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 8,
  outline: 'none',
  transition: 'border-color 120ms ease-out',
}

const iconButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  padding: 0,
  background: 'transparent',
  border: 'none',
  borderRadius: 8,
  color: 'var(--bf-text-secondary)',
  cursor: 'pointer',
  transition: 'color 120ms ease-out, background 120ms ease-out',
}

const errorStyle: CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.04em',
  color: 'var(--bf-ops-danger)',
}

function countLabel(count: number): string {
  if (count === 0) return '—'
  return count === 1 ? '1 membro' : `${count} membros`
}

// ============================================================
// Manager (duas seções)
// ============================================================

export function TagManager({ groups, families, domains }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <TagSection
        kind="grupo"
        label="Grupos"
        placeholder="Novo grupo…"
        emptyMessage="Nenhum grupo ainda. Crie o primeiro acima."
        tags={groups}
      />
      <TagSection
        kind="familia"
        label="Famílias"
        placeholder="Nova família…"
        emptyMessage="Nenhuma família ainda. Crie a primeira acima."
        tags={families}
      />
      <TagSection
        kind="afiliacao"
        label="Domínios"
        placeholder="Novo domínio…"
        emptyMessage="Nenhum domínio ainda. Crie o primeiro acima."
        tags={domains}
      />
    </div>
  )
}

// ============================================================
// Seção (label + criar + lista)
// ============================================================

function TagSection({
  kind,
  label,
  placeholder,
  emptyMessage,
  tags,
}: {
  kind: TagKind
  label: string
  placeholder: string
  emptyMessage: string
  tags: TagRow[]
}) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function submit() {
    const trimmed = name.trim()
    if (!trimmed || pending) return
    setError(null)
    startTransition(async () => {
      const result = await createTagAdmin(kind, trimmed)
      if (result.ok) {
        setName('')
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <h2 className="mono" style={sectionLabelStyle}>
          {label}
        </h2>
        <span
          className="mono"
          style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--bf-text-subtle)' }}
        >
          {tags.length}
        </span>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (error) setError(null)
          }}
          placeholder={placeholder}
          aria-label={`Criar em ${label}`}
          disabled={pending}
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={pending || name.trim() === ''}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'inherit',
            color: 'var(--bf-text-primary)',
            background: 'var(--bf-surface)',
            border: '1px solid var(--bf-border-strong)',
            borderRadius: 8,
            cursor: pending || name.trim() === '' ? 'default' : 'pointer',
            opacity: pending || name.trim() === '' ? 0.5 : 1,
            transition: 'opacity 120ms ease-out',
            whiteSpace: 'nowrap',
          }}
        >
          <Plus size={16} strokeWidth={1.5} aria-hidden />
          Criar
        </button>
      </form>

      {error && (
        <p className="mono" role="alert" style={errorStyle}>
          {error}
        </p>
      )}

      {tags.length === 0 ? (
        <div
          style={{
            border: '1px dashed var(--bf-border-strong)',
            borderRadius: 16,
            padding: 24,
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 14, color: 'var(--bf-text-secondary)' }}>{emptyMessage}</p>
        </div>
      ) : (
        <div
          style={{
            background: 'var(--bf-surface)',
            border: '1px solid var(--bf-border)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {tags.map((tag, idx) => (
            <TagRowItem key={tag.id} tag={tag} isLast={idx === tags.length - 1} />
          ))}
        </div>
      )}
    </section>
  )
}

// ============================================================
// Linha de tag (renomear inline + apagar com confirmação inline)
// ============================================================

type RowMode = 'view' | 'edit' | 'confirm-delete'

function TagRowItem({ tag, isLast }: { tag: TagRow; isLast: boolean }) {
  const [mode, setMode] = useState<RowMode>('view')
  const [draft, setDraft] = useState(tag.name)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  function startEdit() {
    setDraft(tag.name)
    setError(null)
    setMode('edit')
    // foca após o input montar
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  function cancel() {
    setMode('view')
    setError(null)
  }

  function confirmRename() {
    const trimmed = draft.trim()
    if (pending) return
    if (!trimmed || trimmed === tag.name) {
      cancel()
      return
    }
    setError(null)
    startTransition(async () => {
      const result = await renameTagAdmin(tag.id, trimmed)
      if (result.ok) {
        setMode('view')
      } else {
        setError(result.error)
      }
    })
  }

  function confirmDelete() {
    if (pending) return
    setError(null)
    startTransition(async () => {
      const result = await deleteTagAdmin(tag.id)
      if (!result.ok) {
        setError(result.error)
        setMode('view')
      }
      // sucesso: a linha some via revalidatePath
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: '12px 16px',
        borderBottom: isLast ? 'none' : '1px solid var(--bf-border)',
        opacity: pending ? 0.55 : 1,
        transition: 'opacity 120ms ease-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {mode === 'edit' ? (
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                confirmRename()
              } else if (e.key === 'Escape') {
                e.preventDefault()
                cancel()
              }
            }}
            disabled={pending}
            aria-label={`Renomear ${tag.name}`}
            style={{ ...inputStyle, padding: '6px 10px' }}
          />
        ) : (
          <span
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--bf-text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {tag.name}
          </span>
        )}

        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: '0.06em',
            color: 'var(--bf-text-subtle)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {countLabel(tag.count)}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {mode === 'view' && (
            <>
              <button
                type="button"
                onClick={startEdit}
                disabled={pending}
                aria-label={`Renomear ${tag.name}`}
                title="Renomear"
                style={iconButtonStyle}
              >
                <Pencil size={16} strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => {
                  setError(null)
                  setMode('confirm-delete')
                }}
                disabled={pending}
                aria-label={`Apagar ${tag.name}`}
                title="Apagar"
                style={iconButtonStyle}
              >
                <Trash2 size={16} strokeWidth={1.5} aria-hidden />
              </button>
            </>
          )}

          {mode === 'edit' && (
            <>
              <button
                type="button"
                onClick={confirmRename}
                disabled={pending}
                aria-label="Confirmar renomeação"
                title="Confirmar (Enter)"
                style={{ ...iconButtonStyle, color: 'var(--bf-cn-sep)' }}
              >
                <Check size={16} strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={cancel}
                disabled={pending}
                aria-label="Cancelar renomeação"
                title="Cancelar (Esc)"
                style={iconButtonStyle}
              >
                <X size={16} strokeWidth={1.5} aria-hidden />
              </button>
            </>
          )}

          {mode === 'confirm-delete' && (
            <>
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  color: 'var(--bf-ops-danger)',
                  whiteSpace: 'nowrap',
                }}
              >
                apagar?
              </span>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={pending}
                aria-label={`Confirmar exclusão de ${tag.name}`}
                title="Confirmar exclusão"
                style={{ ...iconButtonStyle, color: 'var(--bf-ops-danger)' }}
              >
                <Check size={16} strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={cancel}
                disabled={pending}
                aria-label="Cancelar exclusão"
                title="Cancelar"
                style={iconButtonStyle}
              >
                <X size={16} strokeWidth={1.5} aria-hidden />
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="mono" role="alert" style={errorStyle}>
          {error}
        </p>
      )}
    </div>
  )
}
