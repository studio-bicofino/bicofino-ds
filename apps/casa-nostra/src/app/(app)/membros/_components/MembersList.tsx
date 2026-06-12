'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
  useReducedMotion,
} from 'motion/react'
import { GripVertical, Trash2, Undo2 } from 'lucide-react'

import { SparkleBurst } from '@/components/SparkleBurst'
import { deletePersonV2, reorderPeopleV2 } from '../_actions/members'

export type MemberRowData = {
  member_number: number | null
  id: string
  full_name: string
  current_title: string | null
  current_company: string | null
  photo_url: string | null
  /** true se falta foto */
  missingPhoto: boolean
  /** true se endereço está totalmente vazio */
  missingAddress: boolean
}

type PendingDelete = { id: string; person: MemberRowData; index: number }

const GRID = '24px 44px minmax(0, 1.4fr) minmax(0, 1fr) 96px'
const EASE_OUT = [0.16, 1, 0.3, 1] as const

export function MembersList({
  members,
  reorderable,
  baseOffset = 0,
  justAddedId = null,
}: {
  members: MemberRowData[]
  /** false quando há busca/filtro ou paginação — drag desligado pra não bagunçar a ordem global */
  reorderable: boolean
  baseOffset?: number
  /** id vindo de /membros?novo=… — a linha recém-criada ganha um burst de sparkles (uma vez só) */
  justAddedId?: string | null
}) {
  const router = useRouter()
  const [order, setOrder] = useState<string[]>(() => members.map((m) => m.id))
  const [pending, setPending] = useState<PendingDelete[]>([])

  // Burst de celebração: inicializa UMA vez a partir do param; depois do burst
  // limpa a URL (replace) pra refresh não re-disparar. Flag em ref = uma vez só.
  const [burstId, setBurstId] = useState<string | null>(justAddedId)
  const burstCleanedRef = useRef(false)
  useEffect(() => {
    if (!justAddedId || burstCleanedRef.current) return
    burstCleanedRef.current = true
    const t = setTimeout(() => {
      setBurstId(null)
      router.replace('/membros', { scroll: false })
    }, 1500)
    return () => clearTimeout(t)
  }, [justAddedId, router])

  const byId = useRef<Map<string, MemberRowData>>(new Map())
  byId.current = new Map(members.map((m) => [m.id, m]))

  const orderRef = useRef(order)
  orderRef.current = order

  const pendingIds = useRef<Set<string>>(new Set())
  useEffect(() => {
    pendingIds.current = new Set(pending.map((p) => p.id))
  }, [pending])

  // Ressincroniza quando a lista do servidor muda (delete confirmado, novo cadastro,
  // filtro). Exclui ids com delete pendente pra não "ressuscitar" linhas na tela.
  useEffect(() => {
    setOrder(members.map((m) => m.id).filter((id) => !pendingIds.current.has(id)))
  }, [members])

  // O toast de desfazer é PERSISTENTE (Onda 18.2): o delete só executa no OK.
  // Ao desmontar (navegação) com toasts abertos, executa os deletes pendentes
  // — sair da tela vale como confirmação.
  useEffect(() => {
    const ids = pendingIds.current
    return () => {
      ids.forEach((id) => {
        void deletePersonV2(id)
      })
    }
  }, [])

  function persistOrder() {
    void reorderPeopleV2(orderRef.current, baseOffset).then((r) => {
      if (!r.ok) console.error('[reorder] falhou:', r.error)
    })
  }

  const commitDelete = useCallback(
    (id: string) => {
      setPending((prev) => prev.filter((p) => p.id !== id))
      void deletePersonV2(id).then((r) => {
        if (!r.ok) console.error('[delete] falhou:', r.error)
        router.refresh()
      })
    },
    [router],
  )

  const requestDelete = useCallback((id: string) => {
    const person = byId.current.get(id)
    if (!person) return
    const index = Math.max(0, orderRef.current.indexOf(id))
    setOrder((prev) => prev.filter((x) => x !== id))
    setPending((prev) => [...prev, { id, person, index }])
  }, [])

  const undoDelete = useCallback((entry: PendingDelete) => {
    setPending((prev) => prev.filter((p) => p.id !== entry.id))
    setOrder((prev) => {
      if (prev.includes(entry.id)) return prev
      const next = [...prev]
      next.splice(Math.min(entry.index, next.length), 0, entry.id)
      return next
    })
  }, [])

  const rows = order.map((id) => byId.current.get(id)).filter(Boolean) as MemberRowData[]

  return (
    <>
      {!reorderable ? (
        <div className="cn-people-list">
          <Head reorderable={false} />
          {rows.map((m) => (
            <StaticRow
              key={m.id}
              person={m}
              onDelete={requestDelete}
              justAdded={m.id === burstId}
            />
          ))}
        </div>
      ) : (
        <div className="cn-people-list">
          <Head reorderable />
          <Reorder.Group
            axis="y"
            values={order}
            onReorder={setOrder}
            as="div"
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            {rows.map((m) => (
              <DraggableRow
                key={m.id}
                person={m}
                onDelete={requestDelete}
                onCommit={persistOrder}
                justAdded={m.id === burstId}
              />
            ))}
          </Reorder.Group>
        </div>
      )}

      <UndoToasts pending={pending} onUndo={undoDelete} onConfirm={commitDelete} />
    </>
  )
}

// ============================================================
// Head
// ============================================================

function Head({ reorderable }: { reorderable: boolean }) {
  const headCell: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--bf-text-secondary)',
    fontWeight: 500,
  }
  return (
    <div
      className="cn-people-head"
      role="row"
      aria-hidden
      style={{ gridTemplateColumns: GRID }}
    >
      <span />
      <span />
      <span style={headCell}>Nome / Cargo</span>
      <span style={headCell}>Empresa</span>
      <span style={{ ...headCell, textAlign: 'right' }}>{reorderable ? 'Mover' : ''}</span>
    </div>
  )
}

// ============================================================
// Rows
// ============================================================

function DraggableRow({
  person,
  onDelete,
  onCommit,
  justAdded = false,
}: {
  person: MemberRowData
  onDelete: (id: string) => void
  onCommit: () => void
  justAdded?: boolean
}) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const controls = useDragControls()
  const draggingRef = useRef(false)

  // Spring criticamente amortecido (ζ ≈ 1.0 → stiffness 700 / damping 53): fluido,
  // assenta rápido e SEM overshoot (respeita a regra de motion "y ≤ 1").
  const layoutTransition = reduce
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 700, damping: 53, mass: 1 }

  return (
    <Reorder.Item
      value={person.id}
      dragListener={false}
      dragControls={controls}
      as="div"
      className="cn-people-row cn-people-row--draggable"
      style={{ gridTemplateColumns: GRID, position: 'relative', listStyle: 'none' }}
      transition={layoutTransition}
      whileDrag={
        reduce
          ? undefined
          : {
              scale: 1.025,
              boxShadow: '0 12px 32px -10px rgba(28, 22, 16, 0.28)',
              zIndex: 50,
              cursor: 'grabbing',
            }
      }
      onDragStart={() => {
        draggingRef.current = true
      }}
      onDragEnd={() => {
        // micro-atraso: o click pós-drag não deve navegar
        setTimeout(() => {
          draggingRef.current = false
        }, 0)
        onCommit()
      }}
      onClick={() => {
        if (draggingRef.current) return
        router.push(`/membros/${person.id}`)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          router.push(`/membros/${person.id}`)
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Abrir ficha de ${person.full_name}`}
    >
      <Handle
        onPointerDown={(e) => {
          e.stopPropagation()
          controls.start(e)
        }}
      />
      <RowCells person={person} onDelete={onDelete} />
      {justAdded && <SparkleBurst />}
    </Reorder.Item>
  )
}

function StaticRow({
  person,
  onDelete,
  justAdded = false,
}: {
  person: MemberRowData
  onDelete: (id: string) => void
  justAdded?: boolean
}) {
  const router = useRouter()
  return (
    <div
      className="cn-people-row"
      // position: relative — âncora do overlay SparkleBurst (não afeta o grid)
      style={{ gridTemplateColumns: GRID, position: 'relative' }}
      onClick={() => router.push(`/membros/${person.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          router.push(`/membros/${person.id}`)
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Abrir ficha de ${person.full_name}`}
    >
      <span aria-hidden />
      <RowCells person={person} onDelete={onDelete} />
      {justAdded && <SparkleBurst />}
    </div>
  )
}

/** Avatar + nome/cargo + empresa + ação (apagar) + pendência. */
function RowCells({
  person,
  onDelete,
}: {
  person: MemberRowData
  onDelete: (id: string) => void
}) {
  const tooltip = pendencyTooltip(person.missingPhoto, person.missingAddress)
  const hasPendency = person.missingPhoto || person.missingAddress

  return (
    <>
      <Avatar name={person.full_name} photoUrl={person.photo_url} />

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontWeight: 500,
              color: 'var(--bf-text-primary)',
              fontSize: 14,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {person.full_name}
          </span>
          {person.member_number != null && (
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--bf-text-subtle)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Sócio nº {person.member_number}
            </span>
          )}
        </div>
        {person.current_title && (
          <div
            style={{
              fontSize: 12,
              color: 'var(--bf-text-secondary)',
              marginTop: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {person.current_title}
          </div>
        )}
      </div>

      <div
        style={{
          color: 'var(--bf-text-primary)',
          fontSize: 14,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {person.current_company ?? '—'}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 8,
        }}
      >
        {hasPendency ? (
          <span
            aria-label={tooltip}
            title={tooltip}
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--bf-ops-danger)',
              flexShrink: 0,
            }}
          />
        ) : null}
        <IconButton
          label={`Apagar ${person.full_name}`}
          color="var(--bf-text-subtle)"
          className="cn-row-delete"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(person.id)
          }}
        >
          <Trash2 size={20} strokeWidth={1.5} />
        </IconButton>
      </div>
    </>
  )
}

// ============================================================
// Undo toasts
// ============================================================

function UndoToasts({
  pending,
  onUndo,
  onConfirm,
}: {
  pending: PendingDelete[]
  onUndo: (entry: PendingDelete) => void
  onConfirm: (id: string) => void
}) {
  const reduce = useReducedMotion()
  return (
    <div
      aria-live="polite"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 24,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 8,
        zIndex: 80,
        pointerEvents: 'none',
        width: 'max-content',
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      <AnimatePresence initial={false}>
        {pending.map((entry) => (
          <motion.div
            key={entry.id}
            layout={!reduce}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={reduce ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '12px 16px',
              borderRadius: 12,
              background: 'var(--bf-text-primary)',
              color: 'var(--bf-bg-page)',
              boxShadow: '0 12px 32px -12px rgba(28, 22, 16, 0.4)',
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 280,
              }}
            >
              {entry.person.full_name} apagado
            </span>
            <button
              type="button"
              onClick={() => onUndo(entry)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                border: 'none',
                background: 'transparent',
                color: 'var(--bf-cn-napoli)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                padding: 0,
                whiteSpace: 'nowrap',
              }}
            >
              <Undo2 size={20} strokeWidth={1.5} />
              Desfazer
            </button>
            <button
              type="button"
              onClick={() => onConfirm(entry.id)}
              aria-label={`Confirmar exclusão de ${entry.person.full_name}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                border: '1px solid var(--bf-bg-page)',
                borderRadius: 9999,
                background: 'transparent',
                color: 'var(--bf-bg-page)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                padding: '4px 14px',
                whiteSpace: 'nowrap',
              }}
            >
              OK
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ============================================================
// Handle / botão de ícone
// ============================================================

function Handle({ onPointerDown }: { onPointerDown: (e: React.PointerEvent) => void }) {
  return (
    <button
      type="button"
      className="cn-row-handle"
      aria-label="Arrastar para reordenar"
      title="Arrastar para reordenar"
      onPointerDown={onPointerDown}
      onClick={(e) => e.stopPropagation()}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 24,
        height: 24,
        border: 'none',
        background: 'transparent',
        color: 'var(--bf-text-subtle)',
        cursor: 'grab',
        touchAction: 'none',
        padding: 0,
      }}
    >
      <GripVertical size={20} strokeWidth={1.5} />
    </button>
  )
}

function IconButton({
  children,
  label,
  color,
  className,
  onClick,
}: {
  children: React.ReactNode
  label: string
  color: string
  className?: string
  onClick: (e: React.MouseEvent) => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={className}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 32,
        height: 32,
        border: 'none',
        borderRadius: 9999,
        background: 'transparent',
        color,
        cursor: 'pointer',
        padding: 0,
      }}
    >
      {children}
    </button>
  )
}

// ============================================================
// Helpers
// ============================================================

function pendencyTooltip(missingPhoto: boolean, missingAddress: boolean): string {
  if (missingPhoto && missingAddress) return 'Falta foto e endereço'
  if (missingPhoto) return 'Falta foto'
  if (missingAddress) return 'Falta endereço'
  return ''
}

function Avatar({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('')

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt=""
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    )
  }

  return (
    <div
      aria-hidden
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'var(--bf-surface-subtle)',
        border: '1px solid var(--bf-border)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--bf-text-secondary)',
        letterSpacing: '0.04em',
        flexShrink: 0,
      }}
    >
      {initials || '—'}
    </div>
  )
}
