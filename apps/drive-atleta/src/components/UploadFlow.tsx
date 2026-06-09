'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X, Plus, Lock, AlertTriangle } from 'lucide-react'
import type { Athlete } from '@/lib/athletes'
import type { BatchMeta, Category, MediaItem, MediaKind } from '@/lib/types'
import { CATEGORIES, TAG_SUGGESTIONS } from '@/lib/categories'
import { kindFromMime } from '@/lib/filename'
import { destinationFolder } from '@/lib/destination'
import { uploadOne } from '@/lib/upload-client'
import { sha256Hex } from '@/lib/hash'
import { formatBytes, formatDate } from '@/lib/format'
import { TopBar } from './TopBar'
import { Dropzone } from './Dropzone'
import { Thumb } from './Thumb'
import { SendingState } from './SendingState'
import { SuccessState } from './SuccessState'
import { BicofinoDiamond } from './BicofinoDiamond'
import { AthleteGallery } from './AthleteGallery'

type Stage = 'intro' | 'form' | 'sending' | 'success'

interface Picked {
  id: string
  file: File
  kind: MediaKind
  previewUrl?: string
  hash?: string
  /** Preenchido se um arquivo idêntico já existe no acervo do atleta. */
  dup?: { filename: string; date: string | null } | null
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
  const [sent, setSent] = useState<MediaItem[]>([])

  // Progresso real do envio.
  const [ratio, setRatio] = useState(0)
  const [current, setCurrent] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const sentRef = useRef<MediaItem[]>([]) // permite retomar de onde parou

  const urls = useRef<Set<string>>(new Set())

  const revokeAll = useCallback(() => {
    urls.current.forEach((u) => URL.revokeObjectURL(u))
    urls.current.clear()
  }, [])

  useEffect(() => () => revokeAll(), [revokeAll])

  // Hasheia as fotos do lote e marca as que já existem no acervo do atleta.
  // Só avisa — nunca bloqueia. Silencioso em caso de erro (é conveniência).
  const checkDuplicates = useCallback(async (items: Picked[]) => {
    const fotos = items.filter((p) => p.kind === 'foto')
    if (fotos.length === 0) return
    const hashed = await Promise.all(
      fotos.map(async (p) => ({ id: p.id, hash: await sha256Hex(p.file) })),
    )
    setPicked((prev) => prev.map((p) => {
      const h = hashed.find((x) => x.id === p.id)
      return h ? { ...p, hash: h.hash } : p
    }))
    try {
      const res = await fetch('/api/check-duplicate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ athleteSlug: athlete.slug, hashes: hashed.map((x) => x.hash) }),
      })
      const json = (await res.json()) as { matches: Record<string, { filename: string; date: string | null }> }
      setPicked((prev) => prev.map((p) => {
        const h = hashed.find((x) => x.id === p.id)
        if (!h) return p
        return { ...p, dup: json.matches?.[h.hash] ?? null }
      }))
    } catch {
      /* dedup é só conveniência — ignora falha */
    }
  }, [athlete.slug])

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
    void checkDuplicates(next)
  }, [checkDuplicates])

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

  /* Envia o lote de verdade: por arquivo, sessão → PUT direto no Google →
     grava no Supabase. Sequencial (mais gentil no celular) e retomável: o
     que já subiu fica em sentRef, então "tentar de novo" continua do ponto. */
  const runUploads = useCallback(async () => {
    setUploadError(null)
    setStage('sending')
    const total = picked.length
    const date = meta.date || todayISO()

    try {
      for (let i = sentRef.current.length; i < total; i++) {
        setCurrent(i + 1)
        setRatio(i / total)
        const item = await uploadOne({
          file: picked[i].file,
          athlete,
          meta,
          date,
          batchIndex: 0, // sequencial: a contagem no banco já reflete os anteriores
          contentHash: picked[i].hash ?? null,
          onProgress: (r) => setRatio((i + r) / total),
        })
        sentRef.current = [...sentRef.current, item]
        setSent(sentRef.current)
      }
      setRatio(1)
      setStage('success')
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Falha no envio. Tente de novo.')
    }
  }, [picked, meta, athlete])

  function resetToForm() {
    revokeAll()
    setPicked([])
    setMeta(emptyMeta())
    setTagInput('')
    setSent([])
    sentRef.current = []
    setRatio(0)
    setCurrent(0)
    setUploadError(null)
    setStage('form')
  }

  // Destino previsto (para a prévia no topo do form).
  const destFolders = Array.from(new Set(picked.map((p) => destinationFolder(athlete, p.kind).join(' / '))))

  return (
    <div className="surface-dark" data-surface="dark">
      {/* Página do atleta: marca inerte, sem pill p/ o painel interno. */}
      <TopBar brandHref={null} rightHref={null} />

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
                      {p.dup && (
                        <span className="bf-mono row" style={{ gap: 'var(--sp-2)', alignItems: 'flex-start', color: 'var(--current-accent-ink)' }}>
                          <AlertTriangle size={13} strokeWidth={1.5} aria-hidden style={{ flex: '0 0 auto', marginTop: 2 }} />
                          <span>Já no acervo{p.dup.date ? ` (${formatDate(p.dup.date)})` : ''} — você pode enviar mesmo assim.</span>
                        </span>
                      )}
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
                  <button className="btn btn--accent btn--lg btn--block" onClick={runUploads} disabled={picked.length === 0}>
                    Enviar para Bicofino <ArrowRight size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {stage === 'sending' && (
          <SendingState
            ratio={ratio}
            current={current}
            total={picked.length}
            error={uploadError}
            onRetry={runUploads}
          />
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

      <AthleteGallery slug={athlete.slug} />
    </div>
  )
}
