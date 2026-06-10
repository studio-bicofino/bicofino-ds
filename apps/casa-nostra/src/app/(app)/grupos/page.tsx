/**
 * Casa Nostra v2 — /grupos: gestão de tags dos kinds 'grupo' e 'afiliacao'.
 *
 * 'afiliacao' é exibido como "Domínios" (rename de label apenas;
 * o valor no banco continua 'afiliacao').
 */

import { createClient } from '@/lib/supabase/server'
import type { Tag } from '@/lib/db/types'
import { TagManager, type TagRow } from './_components/TagManager'

export const dynamic = 'force-dynamic'

export default async function GruposPage() {
  const supabase = await createClient()

  const [tagsResult, linksResult] = await Promise.all([
    supabase
      .from('tags')
      .select('*')
      .in('kind', ['grupo', 'afiliacao'])
      .order('name', { ascending: true }),
    supabase.from('person_tags').select('tag_id'),
  ])

  const tags = (tagsResult.data ?? []) as Tag[]
  const links = (linksResult.data ?? []) as Array<{ tag_id: string }>
  const error = tagsResult.error?.message ?? linksResult.error?.message ?? null

  // Contagem de uso por tag (quantas pessoas usam cada uma).
  const counts: Record<string, number> = {}
  for (const link of links) {
    counts[link.tag_id] = (counts[link.tag_id] ?? 0) + 1
  }

  const toRow = (tag: Tag): TagRow => ({
    id: tag.id,
    name: tag.name,
    count: counts[tag.id] ?? 0,
  })

  const groups = tags.filter((t) => t.kind === 'grupo').map(toRow)
  const domains = tags.filter((t) => t.kind === 'afiliacao').map(toRow)

  return (
    <div className="cn-page cn-page--narrow">
      <Hero groupCount={groups.length} domainCount={domains.length} />

      <div style={{ height: 1, background: 'var(--bf-border)' }} aria-hidden />

      {error ? <ErrorBlock message={error} /> : <TagManager groups={groups} domains={domains} />}
    </div>
  )
}

function Hero({ groupCount, domainCount }: { groupCount: number; domainCount: number }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-secondary)',
        }}
      >
        Bicofino · Casa Nostra · Grupos
      </p>
      <h1
        style={{
          fontSize: 'clamp(32px, 4vw, 44px)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          color: 'var(--bf-text-primary)',
        }}
      >
        Grupos &amp; Domínios
      </h1>
      <p
        style={{
          fontSize: 15,
          color: 'var(--bf-text-secondary)',
          maxWidth: 560,
        }}
      >
        Os rótulos que organizam a rede — crie, renomeie ou apague.
        {' '}
        <span className="mono" style={{ fontSize: 12, letterSpacing: '0.04em' }}>
          {groupCount} {groupCount === 1 ? 'grupo' : 'grupos'} · {domainCount}{' '}
          {domainCount === 1 ? 'domínio' : 'domínios'}
        </span>
      </p>
    </header>
  )
}

function ErrorBlock({ message }: { message: string }) {
  return (
    <div
      style={{
        background: 'var(--bf-surface)',
        border: '1px solid var(--bf-ops-danger)',
        borderRadius: 16,
        padding: 24,
        color: 'var(--bf-ops-danger)',
        fontSize: 14,
      }}
    >
      <p className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', marginBottom: 8 }}>
        ERRO AO CARREGAR
      </p>
      <p>{message}</p>
    </div>
  )
}
