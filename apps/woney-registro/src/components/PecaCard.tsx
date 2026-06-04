import { ArrowUpRight } from 'lucide-react'
import { dataCurta, fmtMin } from '@/lib/format'
import type { UsoExpandido } from '@/lib/data'
import { PecaMedia } from './PecaMedia'

/* Rótulo do pill conforme a natureza do sistema:
   eficiência fala em tempo por peça; projeto em dias; infra é ativo permanente. */
function pillLabel(s: UsoExpandido['sistema']): string {
  if (s.tipo === 'projeto') {
    const a = s.tempo_antes_dias ?? 0
    const d = s.tempo_depois_dias ?? 0
    return `${d} dias em vez de ${a} dias`
  }
  if (s.tipo === 'infraestrutura') return 'ativo permanente'
  const antes = s.tempo_antes_min ?? 0
  const depois = s.tempo_depois_min ?? 0
  return `${fmtMin(depois)} em vez de ${fmtMin(antes)}`
}

/* A arte é a evidência; o número é o argumento — sempre amarrados. */
export function PecaCard({ peca, compact = false }: { peca: UsoExpandido; compact?: boolean }) {
  return (
    <figure
      className="cell"
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minWidth: compact ? 230 : undefined,
      }}
    >
      <PecaMedia video={peca.video_url} image={peca.imagem_url} alt={peca.legenda} />
      <figcaption
        style={{
          padding: 'var(--sp-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-2)',
          borderTop: 'var(--bf-hairline)',
        }}
      >
        <span style={{ fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.3 }}>{peca.legenda}</span>
        <span className="bf-mono" style={{ color: 'var(--bf-text-subtle)', fontSize: '0.6875rem' }}>
          {peca.sistema.nome} · {dataCurta(peca.data)}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-2)', marginTop: 'var(--sp-1)' }}>
          <span className="pill">{pillLabel(peca.sistema)}</span>
          {peca.link && (
            <a
              href={peca.link}
              target="_blank"
              rel="noreferrer"
              className="bf-mono"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-1)', fontSize: '0.6875rem', color: 'var(--current-accent-ink)', whiteSpace: 'nowrap' }}
            >
              ver ao vivo <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
