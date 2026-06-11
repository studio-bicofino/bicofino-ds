'use client'

import type { Opportunity, Person } from '@/lib/data/types'

const KIND_LABEL: Record<Opportunity['kind'], string> = {
  'entre-membros': 'entre membros',
  'com-bicofino': 'com a bicofino',
  mercado: 'mercado',
}

interface OpportunityCardProps {
  opp: Opportunity
  personById: Record<string, Person>
  active: boolean
  onClick: () => void
}

export function OpportunityCard({ opp, personById, active, onClick }: OpportunityCardProps) {
  const a = personById[opp.a]
  const b = opp.b ? personById[opp.b] : null
  const counterpart = b ? b.preferredName : opp.kind === 'com-bicofino' ? 'Bicofino' : 'Mercado'

  return (
    <button className="lr-opp" data-active={active} onClick={onClick}>
      <div className="lr-opp__top">
        <span className="lr-opp__title">{opp.title}</span>
        <span className="lr-opp__score">{opp.score}</span>
      </div>
      <div className="lr-opp__pair">
        {a?.preferredName} ✦ {counterpart} · {KIND_LABEL[opp.kind]}
      </div>
      <ul className="lr-opp__why">
        {opp.rationale.slice(0, 3).map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </button>
  )
}
