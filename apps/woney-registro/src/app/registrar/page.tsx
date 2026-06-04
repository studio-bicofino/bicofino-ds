'use client'

import { useState, useRef } from 'react'
import { UploadCloud, Check } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Reveal } from '@/components/Reveal'
import { sistemas } from '@/lib/seed'

const EFIC = sistemas.filter((s) => s.tipo === 'eficiencia')

export default function Registrar() {
  const [sistemaId, setSistemaId] = useState(EFIC[0]?.id ?? '')
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10))
  const [legenda, setLegenda] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [saved, setSaved] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file?: File) {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    // Seed-first: confirma localmente. Ao conectar o Supabase, grava em `usos` + Storage.
    setSaved(true)
    setTimeout(() => setSaved(false), 2600)
    setLegenda('')
    setPreview(null)
  }

  const sistema = EFIC.find((s) => s.id === sistemaId)
  const economia = sistema ? `${sistema.tempo_depois_min} min em vez de ${sistema.tempo_antes_min} min` : ''

  return (
    <>
      <Nav />
      <main id="main-content" className="shell shell-main" style={{ maxWidth: 720 }}>
        <Reveal>
          <header style={{ marginBottom: 'var(--sp-6)' }}>
            <span className="bf-eyebrow">// captura</span>
            <h1 className="bf-h1" style={{ marginTop: 'var(--sp-3)' }}>Registrar uso</h1>
            <p className="bf-body" style={{ marginTop: 'var(--sp-3)' }}>
              Três campos e uma imagem. A complexidade do cálculo mora no código.
            </p>
          </header>
        </Reveal>

        <Reveal delay={80}>
        <form onSubmit={submit} className="cell" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
          <Field label="Sistema">
            <select
              value={sistemaId}
              onChange={(e) => setSistemaId(e.target.value)}
              style={inputStyle}
            >
              {EFIC.map((s) => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
            {economia && (
              <span className="pill pill--accent" style={{ alignSelf: 'flex-start' }}>{economia}</span>
            )}
          </Field>

          <Field label="Data">
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} style={inputStyle} />
          </Field>

          <Field label="Legenda">
            <input
              type="text"
              value={legenda}
              onChange={(e) => setLegenda(e.target.value)}
              placeholder="Ex: Story Kerchner x Santos"
              style={inputStyle}
              required
            />
          </Field>

          <Field label="Imagem da peça">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
              onClick={() => inputRef.current?.click()}
              style={{
                border: `1px dashed ${dragOver ? 'var(--current-accent)' : 'var(--bf-border-strong)'}`,
                borderRadius: 'var(--bf-corner-3)',
                padding: 'var(--sp-6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--sp-3)',
                cursor: 'pointer',
                background: dragOver ? 'color-mix(in srgb, var(--current-accent) 5%, transparent)' : 'var(--bf-surface-subtle)',
                transition: 'border-color var(--dur-fast), background var(--dur-fast)',
              }}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Prévia" style={{ maxHeight: 200, borderRadius: 'var(--bf-corner-2)' }} />
              ) : (
                <>
                  <UploadCloud size={20} strokeWidth={1.5} color="var(--bf-text-subtle)" />
                  <span className="bf-body-sm">Arraste a screenshot da peça, ou clique para escolher</span>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          </Field>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
            <button type="submit" className="btn btn--primary">
              {saved ? <Check size={16} strokeWidth={1.5} /> : null}
              {saved ? 'Registrado' : 'Registrar uso'}
            </button>
            <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
              // seed-first — persiste no Supabase quando conectado
            </span>
          </div>
        </form>
        </Reveal>
      </main>
    </>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--sp-2) var(--sp-3)',
  border: '1px solid var(--bf-border-strong)',
  borderRadius: 'var(--bf-corner-2)',
  background: 'var(--bf-bg-page)',
  color: 'var(--bf-text-primary)',
  fontFamily: 'inherit',
  fontSize: '0.9375rem',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
      <span className="bf-eyebrow">{label}</span>
      {children}
    </label>
  )
}
