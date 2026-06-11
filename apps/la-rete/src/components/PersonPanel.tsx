'use client'

import type { Opportunity, Person, Tag, TagKind } from '@/lib/data/types'
import { Avatar } from './Avatar'
import { OpportunityCard } from './OpportunityCard'

const SCORE_ROWS: { key: keyof Person; label: string }[] = [
  { key: 'intimacy', label: 'intimidade' },
  { key: 'contactEase', label: 'facilidade' },
  { key: 'bicofinoDisposition', label: 'disposição' },
  { key: 'networkReach', label: 'alcance' },
]

const KIND_LABELS: { kind: TagKind; label: string }[] = [
  { kind: 'cargo', label: 'cargo' },
  { kind: 'empresa', label: 'empresa' },
  { kind: 'skill', label: 'skills' },
  { kind: 'familia', label: 'família' },
  { kind: 'afiliacao', label: 'domínios' },
  { kind: 'grupo', label: 'grupos' },
]

const SIGNAL_LABEL: Record<string, string> = {
  interesse: 'interesse',
  lifeevent: 'evento',
  capital_move: 'capital',
  ask: 'pedido',
  recusa: 'recusa',
}

interface PersonPanelProps {
  person: Person
  tagById: Record<string, Tag>
  personById: Record<string, Person>
  opportunities: Opportunity[]
  activeOppId: string | null
  onSelectOpp: (opp: Opportunity) => void
  onClose: () => void
}

export function PersonPanel({
  person,
  tagById,
  personById,
  opportunities,
  activeOppId,
  onSelectOpp,
  onClose,
}: PersonPanelProps) {
  const intro = person.introBy ? personById[person.introBy] : null

  return (
    <>
      <button className="lr-panel__close" onClick={onClose}>
        ← rede
      </button>
      <div className="lr-panel__head">
        <span className="lr-panel__photo">
          <Avatar personId={person.id} size={64} />
        </span>
        <div>
          <div className="lr-panel__eyebrow">
            <span className="diamond">✦</span> sócio nº {person.memberNumber ?? '—'}
            {person.generation ? ` · ${person.generation}` : ''}
          </div>
          <h2 className="lr-panel__name">{person.fullName}</h2>
          <div className="lr-panel__sub">
            {person.homeCity} · {person.citizenships.join(' / ')} · cluster {person.cluster}
          </div>
        </div>
      </div>
      <p className="lr-panel__bio">{person.bio}</p>

      <div className="lr-panel__section">
        {SCORE_ROWS.map(({ key, label }) => {
          const v = person[key] as number
          return (
            <div className="lr-score" key={key}>
              <span className="lr-score__label">{label}</span>
              <span className="lr-score__track">
                <span className="lr-score__fill" style={{ transform: `scaleX(${v / 5})` }} />
              </span>
              <span className="lr-score__num">{v}</span>
            </div>
          )
        })}
      </div>

      <div className="lr-panel__section">
        {KIND_LABELS.map(({ kind, label }) => {
          const tags = person.tags.map((id) => tagById[id]).filter((t) => t && t.kind === kind)
          if (!tags.length) return null
          return (
            <div className="lr-taggroup" key={kind}>
              <div className="lr-taggroup__kind">{label}</div>
              {tags.map((t) => (
                <span className="lr-pill" key={t.id}>
                  {t.name}
                </span>
              ))}
            </div>
          )
        })}
        {intro && (
          <div className="lr-taggroup">
            <div className="lr-taggroup__kind">apresentado por</div>
            <span className="lr-pill">{intro.preferredName}</span>
          </div>
        )}
      </div>

      {person.signals.length > 0 && (
        <div className="lr-panel__section">
          <div className="lr-panel__eyebrow">// sinais</div>
          {person.signals.map((s, i) => (
            <div className="lr-signal" key={i}>
              <span className="lr-signal__type">{SIGNAL_LABEL[s.type] ?? s.type}</span>
              <span>{s.content}</span>
            </div>
          ))}
        </div>
      )}

      <div className="lr-panel__section">
        <div className="lr-panel__eyebrow">// oportunidades</div>
        {opportunities.length === 0 && (
          <p className="lr-empty">Nenhuma oportunidade mapeada para este membro ainda.</p>
        )}
        {opportunities.slice(0, 6).map((opp) => (
          <OpportunityCard
            key={opp.id}
            opp={opp}
            personById={personById}
            active={opp.id === activeOppId}
            onClick={() => onSelectOpp(opp)}
          />
        ))}
      </div>
    </>
  )
}
