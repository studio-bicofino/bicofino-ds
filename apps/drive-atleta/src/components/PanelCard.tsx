'use client'

import type { MediaItem, Status } from '@/lib/types'
import { CATEGORY_LABEL, STATUSES } from '@/lib/categories'
import { formatBytes, formatDate } from '@/lib/format'
import { Thumb } from './Thumb'

/* Card de material no Painel — preview, metadados catalogados, caminho
   no Drive e controle de curadoria (muda o status). */
export function PanelCard({
  item,
  onStatusChange,
}: {
  item: MediaItem
  onStatusChange: (id: string, status: Status) => void
}) {
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
        <span style={{ fontWeight: 500 }}>{item.athleteName}</span>
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

      <hr className="rule" />

      <div className="between" style={{ gap: 'var(--sp-3)' }}>
        <span className="field__label">Status</span>
        <select
          className="select"
          value={item.status}
          onChange={(e) => onStatusChange(item.id, e.target.value as Status)}
          style={{ width: 'auto', padding: 'var(--sp-2) var(--sp-3)', fontSize: '0.8125rem' }}
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
