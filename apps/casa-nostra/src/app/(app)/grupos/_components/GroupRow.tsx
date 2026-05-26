'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import type { Group } from '@/lib/db/types'
import { updateGroup, deleteGroup } from '../_actions/groups'

type Props = {
  group: Group
  memberCount: number
}

export function GroupList({
  groups,
  counts,
}: {
  groups: Group[]
  counts: Record<string, number>
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AnimatePresence initial={false}>
        {groups.map((g) => (
          <GroupRow key={g.id} group={g} memberCount={counts[g.id] ?? 0} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function GroupRow({ group, memberCount }: Props) {
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [draftName, setDraftName] = useState(group.name)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mode === 'edit') {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [mode])

  // Auto-cancela "confirmar" depois de 4s sem ação.
  useEffect(() => {
    if (!confirmDelete) return
    const t = setTimeout(() => setConfirmDelete(false), 4000)
    return () => clearTimeout(t)
  }, [confirmDelete])

  function startEdit() {
    setDraftName(group.name)
    setError(null)
    setMode('edit')
  }

  function cancelEdit() {
    setDraftName(group.name)
    setError(null)
    setMode('view')
  }

  function commitEdit() {
    const next = draftName.trim()
    if (next.length < 2) {
      setError('Mínimo 2 caracteres')
      return
    }
    if (next === group.name) {
      setMode('view')
      return
    }
    startTransition(async () => {
      const result = await updateGroup(group.id, { name: next })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setMode('view')
    })
  }

  function handleDeleteClick() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    startTransition(async () => {
      const result = await deleteGroup(group.id)
      if (!result.ok) {
        setError(result.error)
        setConfirmDelete(false)
      }
    })
  }

  const memberLabel = memberCount === 1 ? '1 pessoa' : `${memberCount} pessoas`

  const confirmLabel =
    memberCount > 0 ? `Apagar grupo + ${memberCount} vínculo${memberCount === 1 ? '' : 's'}?` : 'Confirmar?'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 20px',
        borderBottom: '1px solid var(--bf-border)',
        background: 'transparent',
        transition: 'background 160ms ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(51,17,26,0.03)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {mode === 'edit' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <input
              ref={inputRef}
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  commitEdit()
                } else if (e.key === 'Escape') {
                  e.preventDefault()
                  cancelEdit()
                }
              }}
              disabled={isPending}
              style={{
                padding: '6px 10px',
                fontSize: 15,
                fontFamily: 'inherit',
                background: 'var(--bf-surface)',
                color: 'var(--bf-text-primary)',
                border: '1px solid var(--bf-border-strong)',
                borderRadius: 6,
                outline: 'none',
                width: '100%',
              }}
            />
            {error && (
              <span style={{ fontSize: 11, color: 'var(--bf-ops-danger)' }}>{error}</span>
            )}
          </div>
        ) : (
          <button
            type="button"
            onDoubleClick={startEdit}
            onClick={(e) => {
              // single click: nada; usa duplo clique pra editar.
              e.preventDefault()
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 15,
              fontFamily: 'inherit',
              color: 'var(--bf-text-primary)',
              textAlign: 'left',
              cursor: 'text',
            }}
            title="Duplo clique para editar"
          >
            {group.name}
          </button>
        )}
        {error && mode === 'view' && (
          <span style={{ fontSize: 11, color: 'var(--bf-ops-danger)' }}>{error}</span>
        )}
      </div>

      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.04em',
          color: 'var(--bf-text-secondary)',
          minWidth: 80,
          textAlign: 'right',
        }}
      >
        {memberLabel}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {mode === 'edit' ? (
          <>
            <IconButton
              onClick={commitEdit}
              disabled={isPending}
              title="Salvar"
              variant="success"
            >
              <Check size={16} strokeWidth={1.5} />
            </IconButton>
            <IconButton onClick={cancelEdit} disabled={isPending} title="Cancelar">
              <X size={16} strokeWidth={1.5} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={startEdit} disabled={isPending} title="Editar">
              <Pencil size={16} strokeWidth={1.5} />
            </IconButton>
            {confirmDelete ? (
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={isPending}
                style={{
                  padding: '6px 12px',
                  fontSize: 11,
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  letterSpacing: '0.04em',
                  background: 'var(--bf-ops-danger)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 9999,
                  cursor: isPending ? 'wait' : 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {confirmLabel}
              </button>
            ) : (
              <IconButton
                onClick={handleDeleteClick}
                disabled={isPending}
                title="Apagar"
                variant="danger"
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </IconButton>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

function IconButton({
  children,
  onClick,
  disabled,
  title,
  variant,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  title: string
  variant?: 'success' | 'danger'
}) {
  const baseColor =
    variant === 'success'
      ? 'var(--bf-ops-success)'
      : variant === 'danger'
        ? 'var(--bf-text-secondary)'
        : 'var(--bf-text-secondary)'

  const hoverColor =
    variant === 'success'
      ? 'var(--bf-ops-success-hover)'
      : variant === 'danger'
        ? 'var(--bf-ops-danger)'
        : 'var(--bf-text-primary)'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      style={{
        background: 'none',
        border: 'none',
        padding: 6,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: baseColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: 6,
        transition: 'color 160ms ease-out, background 160ms ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = hoverColor
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = baseColor
      }}
    >
      {children}
    </button>
  )
}
