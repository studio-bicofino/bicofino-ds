'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { ATHLETES } from '@/lib/athletes'
import { TopBar } from '@/components/TopBar'

/* Página interna (Woney) — um link de envio por atleta, com botão de copiar.
   Cada link é o /a/<slug> que abre só a área daquele atleta. Não é
   athlete-facing: fica sob /painel, junto das ferramentas de bastidor. */
export default function LinksPage() {
  return (
    <>
      <TopBar rightHref="/painel" rightLabel="// painel" />

      <main className="shell shell-main">
        <div className="stack-6">
          <div className="stack-3">
            <span className="bf-eyebrow">// links dos atletas</span>
            <h1 className="bf-h1">Links de envio</h1>
            <p className="bf-body" style={{ color: 'var(--bf-text-subtle)', maxWidth: '56ch' }}>
              Um link por atleta. Cada um abre só a área dele para enviar fotos e vídeos —
              copie e mande pelo WhatsApp.
            </p>
          </div>

          <div className="stack-2">
            {ATHLETES.map((a) => (
              <LinkRow key={a.slug} name={a.name} slug={a.slug} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

function LinkRow({ name, slug }: { name: string; slug: string }) {
  const [copied, setCopied] = useState(false)
  const path = `/a/${slug}`

  async function copy() {
    const url = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard bloqueado — silencioso; o link fica visível pra copiar à mão.
    }
  }

  return (
    <div
      className="cell cell--pad-sm between"
      style={{ gap: 'var(--sp-4)', alignItems: 'center', borderRadius: 'var(--bf-corner-2)' }}
    >
      <div className="stack-2" style={{ minWidth: 0 }}>
        <span style={{ fontWeight: 500 }}>{name}</span>
        <span
          className="mono-path"
          style={{ color: 'var(--bf-text-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {path}
        </span>
      </div>

      <button
        className="btn btn--ghost bf-mono"
        onClick={copy}
        aria-label={`Copiar link de ${name}`}
        style={{ flex: '0 0 auto' }}
      >
        {copied ? (
          <><Check size={14} strokeWidth={1.5} aria-hidden /> copiado</>
        ) : (
          <><Copy size={14} strokeWidth={1.5} aria-hidden /> copiar</>
        )}
      </button>
    </div>
  )
}
