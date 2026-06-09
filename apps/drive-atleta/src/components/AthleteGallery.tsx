'use client'

import { useEffect, useState } from 'react'
import type { MediaItem } from '@/lib/types'
import { loadItemsByAthlete } from '@/lib/storage'
import { PanelCard } from './PanelCard'
import { Reveal } from './Reveal'

/* "Meus envios" — galeria read-only do próprio atleta na página /a/<slug>.
   Só visualização (sem ações de curadoria/apagar — isso fica no painel
   interno). Filtrada pelo slug; some quando o atleta ainda não enviou nada. */
export function AthleteGallery({ slug }: { slug: string }) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadItemsByAthlete(slug)
      .then(setItems)
      .catch((e) => setError(e instanceof Error ? e.message : 'Não consegui carregar seus envios.'))
      .finally(() => setMounted(true))
  }, [slug])

  if (!mounted || error || items.length === 0) return null

  return (
    <section className="stack-4 bf-reveal">
      <div className="stack-2">
        <span className="bf-eyebrow">// meus envios</span>
        <span className="bf-mono" style={{ color: 'var(--bf-text-subtle)' }}>
          {items.length} {items.length === 1 ? 'arquivo enviado' : 'arquivos enviados'}
        </span>
      </div>
      <div className="cards-grid">
        {items.map((it, i) => (
          <Reveal key={it.id} delay={Math.min(i * 40, 240)}>
            <PanelCard item={it} readOnly />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
