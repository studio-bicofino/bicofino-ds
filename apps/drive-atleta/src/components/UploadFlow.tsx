'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X, Plus, Lock } from 'lucide-react'
import type { Athlete } from '@/lib/athletes'
import type { BatchMeta, Category, MediaItem, MediaKind } from '@/lib/types'
import { CATEGORIES, TAG_SUGGESTIONS } from '@/lib/categories'
import { generateFilename, kindFromMime } from '@/lib/filename'
import { buildDrivePath, destinationFolder } from '@/lib/destination'
import { addItems, countForAthlete } from '@/lib/storage'
import { formatBytes } from '@/lib/format'
import { TopBar } from './TopBar'
import { Dropzone } from './Dropzone'
import { Thumb } from './Thumb'
import { SendingState } from './SendingState'
import { SuccessState } from './SuccessState'
import { BicofinoDiamond } from './BicofinoDiamond'

type Stage = 'intro' | 'form' | 'sending' | 'success'

interface Picked {
  id: string
  file: File
  kind: MediaKind
  previewUrl?: string
}

function todayISO(): string {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

function dateFromFile(file: File): string {
  if (!file.lastModified) return todayISO()
  const d = new Date(file.lastModified)
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

const emptyMeta = (): BatchMeta => ({
  date: '',
  match: '',
  competition: '',
  category: 'jogo',
  tags: [],
  notes: '',
})

export function UploadFlow({ athlete }: { athlete: Athlete }) {
  const [stage, setStage] = useState<Stage>('intro')
  const [picked, setPicked] = useState<Picked[]>([])
  const [meta, setMeta] = useState<BatchMeta>(emptyMeta)
  const [tagInput, setTagInput] = useState('')
  const [pending, setPending] = useState<MediaItem[]>([])
  const [sent, setSent] = useState<MediaItem[]>([])
  const urls = useRef<Set<string>>(new Set())

  const revokeAll = useCallback(() => {
    urls.current.forEach((u) => URL.revokeObjectURL(u))
    urls.current.clear()
  }, [])

  useEffect(() => () => revokeAll(), [revokeAll])

  const addFiles = useCallback((files: File[]) => {
    const next: Picked[] = files.map((file) => {
      const kind = kindFromMime(file.type)
      let previewUrl: string | undefined
      if (kind === 'foto') {
        previewUrl = URL.createObjectURL(file)
        urls.current.add(previewUrl)
      }
      return { id: crypto.randomUUID(), file, kind, previewUrl }
    })
    setPicked((p) => [...p, ...next])
    // Prefill da data a partir do primeiro arquivo (lastModified) — toque de mobile.
    setMeta((m) => (m.date ? m : { ...m, date: dateFromFile(files[0]) }))
  }, [])

  function removeFile(id: string) {
    setPicked((p) => {
      const target = p.find((x) => x.id === id)
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl)
        urls.current.delete(target.previewUrl)
      }
      return p.filter((x) => x.id !== id)
    })
  }

  function addTag(raw: string) {
    const t = raw.trim().toLowerCase()
    if (!t) return
    setMeta((m) => (m.tags.includes(t) ? m : { ...m, tags: [...m.tags, t] }))
  }
  function removeTag(t: string) {
    setMeta((m) => ({ ...m, tags: m.tags.filter((x) => x !== t) }))
  }

  function handleSubmit() {
    if (picked.length === 0) return
    const base = countForAthlete(athlete.slug)
    const items: MediaItem[] = picked.map((p, i) => {
      const filename = generateFilename({
        athlete,
        date: meta.date || todayISO(),
        match: meta.match,
        competition: meta.competition,
        category: meta.category,
        mimeType: p.file.type,
        originalName: p.file.name,
        seq: base + i + 1,
      })
      return {
        id: crypto.randomUUID(),
        athleteSlug: athlete.slug,
        athleteName: athlete.name,
        kind: p.kind,
        filename,
        originalName: p.file.name,
        mimeType: p.file.type,
        sizeBytes: p.file.size,
        date: meta.date || todayISO(),
        match: meta.match.trim() || null,
        competition: meta.competition.trim() || null,
        category: meta.category,
        tags: meta.tags,
        notes: meta.notes.trim() || null,
        status: 'recebido',
        drivePath: buildDrivePath(athlete, p.kind, filename),
        uploadedAt: new Date().toISOString(),
      }
    })
    setPending(items)
    setStage('sending')
  }

  function handleSendingComplete() {
    addItems(pending)
    setSent(pending)
    setStage('success')
  }

  function resetToForm() {
    revokeAll()
    setPicked([])
    setMeta(emptyMeta())
    setTagInput('')
    setPending([])
    setSent([])
    setStage('form')
  }

  // Destino previsto (para a prévia no hero/topo do form).
  const destFolders = Array.from(new Set(picked.map((p) => destinationFolder(athlete, p.kind).join(' / '))))

  return (
    <div className="surface-dark" data-surface="dark">
      <TopBar />

      <main className="shell-narrow shell-main">
        {stage === 'intro' && (
          <Intro athlete={athlete} onStart={() => setStage('form')} />
        )}

        {stage === 'form' && (
          <div className="stack-6 bf-reveal">
            <div className="stack-3">
              <button className="btn btn--ghost" style={{ alignSelf: 'flex-start', paddingLeft: 0 }} onClick={() => setStage('intro')}>
                <ArrowLeft size={16} strokeWidth={1.5} /> Voltar
              </button>
              <div className="stack-2">
                <span className="bf-eyebrow">// enviar material</span>
                <h1 className="bf-h1">O que você quer guardar?</h1>
              </div>
            </div>

            {/* Upload / lista de arquivos */}
            {picked.length === 0 ? (
              <Dropzone onFiles={addFiles} />
            ) : (
              <div className="stack-3">
                {picked.map((p) => (
                  <div key={p.id} className="cell cell--pad-sm row" style={{ gap: 'var(--sp-4)', alignItems: 'center' }}>
                    <div style={{ width: 64, flex: '0 0 auto' }}>
                      <Thumb kind={p.kind} previewUrl={p.previewUrl} />
                    </div>
                    <div className="stack-2" style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ fontWeight: 500, color: 'var(--bf-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.file.name}
                      </span>
                      <span className="bf-mono" style={{ color: 'var(--bf-text-subtle)' }}>
                        {p.kind === 'video' ? 'Vídeo' : 'Foto'} · {formatBytes(p.file.size)}
                      </span>
                    </div>
                    <button className="btn btn--ghost" aria-label="Remover" onClick={() => removeFile(p.id)} style={{ flex: '0 0 auto', padding: 'var(--sp-2)' }}>
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
                <label className="btn btn--ghost" style={{ alignSelf: 'flex-start', cursor: 'pointer' }}>
                  <Plus size={16} strokeWidth={1.5} /> Adicionar mais
                  <input type="file" accept="image/*,video/*" multiple hidden onChange={(e) => { if (e.target.files) addFiles(Array.from(e.target.files)); e.target.value = '' }} />
                </label>
              </div>
            )}

            {/* Metadados */}
            {picked.length > 0 && (
              <>
                <hr className="rule" />
                <div className="form-grid-2">
                  <div className="field">
                    <label className="field__label" htmlFor="date">Data do material</label>
                    <input id="date" name="date" className="input" type="date" value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="category">Categoria</label>
                    <select id="category" className="select" value={meta.category} onChange={(e) => setMeta({ ...meta, category: e.target.value as Category })}>
                      {CATEGORIES.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="match">Jogo</label>
                  <input id="match" name="match" className="input" autoComplete="off" placeholder="ex. Palmeiras x São Paulo" value={meta.match} onChange={(e) => setMeta({ ...meta, match: e.target.value })} />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="competition">Campeonato ou contexto</label>
                  <input id="competition" name="competition" className="input" autoComplete="off" placeholder="ex. Campeonato Paulista · treino · viagem" value={meta.competition} onChange={(e) => setMeta({ ...meta, competition: e.target.value })} />
                </div>

                {/* Tags */}
                <div className="field">
                  <label className="field__label" htmlFor="tags">Tags</label>
                  {meta.tags.length > 0 && (
                    <div className="row-wrap" style={{ marginBottom: 'var(--sp-1)' }}>
                      {meta.tags.map((t) => (
                        <button key={t} type="button" className="chip is-on" aria-label={`Remover tag ${t}`} onClick={() => removeTag(t)}>
                          {t} <span className="chip__x" aria-hidden><X size={12} strokeWidth={2} /></span>
                        </button>
                      ))}
                    </div>
                  )}
                  <input
                    id="tags"
                    name="tags"
                    className="input"
                    autoComplete="off"
                    placeholder="Escreva uma tag e tecle Enter…"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput); setTagInput('') }
                    }}
                  />
                  <div className="row-wrap">
                    {TAG_SUGGESTIONS.filter((t) => !meta.tags.includes(t)).map((t) => (
                      <button key={t} type="button" className="chip" onClick={() => addTag(t)}>+ {t}</button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="notes">Observações</label>
                  <textarea id="notes" name="notes" className="textarea" placeholder="Algo que ajude a curadoria a entender o material…" value={meta.notes} onChange={(e) => setMeta({ ...meta, notes: e.target.value })} />
                </div>

                {/* Destino previsto */}
                <div className="cell cell--quiet cell--pad-sm stack-2">
                  <span className="bf-eyebrow">// destino no drive</span>
                  {destFolders.map((f) => (
                    <span key={f} className="mono-path">{f} /</span>
                  ))}
                </div>

                <div className="stack-3">
                  <p className="bf-body-sm row" style={{ gap: 'var(--sp-2)', alignItems: 'flex-start' }}>
                    <Lock size={14} strokeWidth={1.5} aria-hidden style={{ flex: '0 0 auto', marginTop: 4 }} />
                    Ao enviar, você autoriza a Bicofino a curar e arquivar este material no seu acervo.
                  </p>
                  <button className="btn btn--accent btn--lg btn--block" onClick={handleSubmit} disabled={picked.length === 0}>
                    Enviar para Bicofino <ArrowRight size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {stage === 'sending' && (
          <SendingState count={pending.length} onComplete={handleSendingComplete} />
        )}

        {stage === 'success' && (
          <SuccessState items={sent} athlete={athlete} onAnother={resetToForm} />
        )}
      </main>
    </div>
  )
}

/* ─── Hero do atleta (M-02: Gotham + assinatura) ─── */
function Intro({ athlete, onStart }: { athlete: Athlete; onStart: () => void }) {
  return (
    <div className="stack-6 bf-reveal" style={{ paddingTop: 'var(--sp-7)' }}>
      <div className="stack-4">
        <span className="bf-eyebrow row" style={{ gap: 'var(--sp-2)' }}>
          <BicofinoDiamond color="var(--current-accent-ink)" size={12} /> Drive do Atleta
        </span>
        <h1 className="bf-impact" style={{ fontSize: 'clamp(2.5rem, 9vw, 4.5rem)', color: 'var(--bf-text-primary)' }}>
          {athlete.name}
        </h1>
        {(athlete.position || athlete.club) && (
          <span className="bf-mono" style={{ color: 'var(--bf-text-subtle)' }}>
            {[athlete.position, athlete.club].filter(Boolean).join('  //  ')}
          </span>
        )}
      </div>

      <p className="bf-body" style={{ maxWidth: '34ch' }}>
        Envie fotos e vídeos do seu material esportivo para o acervo Bicofino.
      </p>

      <div>
        <button className="btn btn--accent btn--lg" onClick={onStart}>
          Enviar material <ArrowRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
