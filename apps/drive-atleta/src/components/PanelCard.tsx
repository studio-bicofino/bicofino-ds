'use client'

import { useState } from 'react'
import { Eye, EyeOff, Copy, Check, Trash2, X } from 'lucide-react'
import type { MediaItem } from '@/lib/types'
import { CATEGORY_LABEL } from '@/lib/categories'
import { formatBytes, formatDate } from '@/lib/format'
import { Thumb } from './Thumb'

/* Card de material. No Painel (interno) traz as ações: copiar a URL aberta do
   arquivo e apagar (lixeira do Drive). Em `readOnly` (galeria do atleta) é só
   visualização — sem ações e sem o link do Drive (atleta não é membro). */
export function PanelCard({
  item,
  onCopyLink,
  onDelete,
  readOnly = false,
}: {
  item: MediaItem
  onCopyLink?: (id: string) => Promise<string>
  onDelete?: (id: string) => Promise<void>
  readOnly?: boolean
}) {
  const [showNote, setShowNote] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleCopy() {
    if (!onCopyLink) return
    setCopyState('loading')
    try {
      const url = await onCopyLink(item.id)
      await navigator.clipboard.writeText(url)
      setCopyState('done')
      window.setTimeout(() => setCopyState('idle'), 1800)
    } catch {
      setCopyState('error')
      window.setTimeout(() => setCopyState('idle'), 2400)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    setDeleting(true)
    try {
      await onDelete(item.id) // o pai remove o card da lista em caso de sucesso
    } catch {
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <div className="cell cell--pad-sm stack-3" style={{ borderRadius: 'var(--bf-corner-3)' }}>
      <Thumb
        kind={item.kind}
        previewUrl={item.kind === 'foto' && item.driveFileId ? `/api/thumb?id=${item.driveFileId}` : undefined}
      />

      <div className="row-wrap">
        <span className="pill pill--accent">{CATEGORY_LABEL[item.category]}</span>
        {item.match && <span className="pill">{item.match}</span>}
      </div>

      <div className="stack-2">
        {!readOnly && <span style={{ fontWeight: 500 }}>{item.athleteName}</span>}
        <span className="mono-path">{item.filename}</span>
        <span className="bf-mono" style={{ color: 'var(--bf-text-subtle)' }}>
          {formatDate(item.date)} · {formatBytes(item.sizeBytes)}
        </span>
      </div>

      {item.tags.length > 0 && (
        <div className="row-wrap">
          {item.tags.map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>
      )}

      {!readOnly && (
        <div className="stack-2">
          <span className="bf-eyebrow">// destino</span>
          <span className="mono-path">{item.drivePath}</span>
          {item.webViewLink && (
            <a
              className="bf-mono"
              href={item.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--current-accent-ink)' }}
            >
              ver no Drive ↗
            </a>
          )}
        </div>
      )}

      {item.notes && (
        <div className="stack-2">
          <button
            type="button"
            className="btn btn--ghost"
            aria-expanded={showNote}
            aria-label={showNote ? 'Ocultar observação' : 'Ver observação'}
            onClick={() => setShowNote((v) => !v)}
            style={{ alignSelf: 'flex-start', paddingLeft: 0, gap: 'var(--sp-2)' }}
          >
            {showNote ? <EyeOff size={14} strokeWidth={1.5} aria-hidden /> : <Eye size={14} strokeWidth={1.5} aria-hidden />}
            <span className="bf-mono">{showNote ? 'ocultar observação' : 'observação'}</span>
          </button>
          {showNote && (
            <p className="bf-body-sm cell cell--quiet cell--pad-sm bf-reveal" style={{ margin: 0 }}>
              {item.notes}
            </p>
          )}
        </div>
      )}

      {!readOnly && (
        <>
          <hr className="rule" />
          <div className="between" style={{ gap: 'var(--sp-3)' }}>
            <button
              className="btn btn--ghost bf-mono"
              onClick={handleCopy}
              disabled={copyState === 'loading'}
              title="Gera uma URL aberta (qualquer um com o link) e copia"
              style={{ paddingLeft: 0, gap: 'var(--sp-2)' }}
            >
              {copyState === 'done' ? (
                <><Check size={14} strokeWidth={1.5} aria-hidden /> copiado</>
              ) : copyState === 'loading' ? (
                'gerando…'
              ) : copyState === 'error' ? (
                'erro — tente de novo'
              ) : (
                <><Copy size={14} strokeWidth={1.5} aria-hidden /> copiar link</>
              )}
            </button>

            {confirming ? (
              <div className="row" style={{ gap: 'var(--sp-2)' }}>
                <span className="bf-mono" style={{ color: 'var(--bf-text-subtle)' }}>
                  {deleting ? 'apagando…' : 'apagar?'}
                </span>
                <button className="btn btn--ghost" onClick={handleDelete} disabled={deleting} aria-label="Confirmar apagar" style={{ padding: 'var(--sp-2)' }}>
                  <Check size={14} strokeWidth={1.5} aria-hidden />
                </button>
                <button className="btn btn--ghost" onClick={() => setConfirming(false)} disabled={deleting} aria-label="Cancelar" style={{ padding: 'var(--sp-2)' }}>
                  <X size={14} strokeWidth={1.5} aria-hidden />
                </button>
              </div>
            ) : (
              <button
                className="btn btn--ghost bf-mono"
                onClick={() => setConfirming(true)}
                aria-label="Apagar do Drive"
                style={{ gap: 'var(--sp-2)' }}
              >
                <Trash2 size={14} strokeWidth={1.5} aria-hidden /> apagar
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
