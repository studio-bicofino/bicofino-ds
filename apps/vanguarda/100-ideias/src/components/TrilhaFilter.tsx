'use client'

import { useState } from 'react'
import { ideias, trilhaMeta, edicoes, type Trilha, type Ideia, type Edicao } from '@/content/curadoria'

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  display: 'block',
  marginBottom: 6,
}

const cardStyle: React.CSSProperties = {
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border)',
  borderRadius: 8,
  padding: 28,
  marginBottom: 20,
}

function IdeiaCard({ item }: { item: Ideia }) {
  const meta = trilhaMeta[item.trilha]
  return (
    <article style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            color: meta.cor,
            border: `1px solid ${meta.cor}`,
            padding: '2px 8px',
            borderRadius: 2,
          }}
        >
          {item.codigo}
        </span>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.08em',
            color: 'var(--bf-text-subtle)',
          }}
        >
          rank #{item.rank} · score {item.score.toFixed(1)}
        </span>
      </div>
      <h3
        style={{
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
          marginBottom: 6,
        }}
      >
        {item.titulo}
      </h3>
      <p
        className="mono"
        style={{
          fontSize: 11,
          color: 'var(--bf-text-secondary)',
          marginBottom: 22,
          letterSpacing: '0.01em',
        }}
      >
        {item.categoria}
      </p>

      <div style={{ marginBottom: 16 }}>
        <span style={labelStyle}>Angulação Bicofino para {meta.nome}</span>
        <p style={{ fontSize: 15, lineHeight: 1.65 }}>{item.angulacao}</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <span style={labelStyle}>Conexão On/Off Pitch</span>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--bf-text-primary)' }}>{item.conexao}</p>
      </div>
      <div>
        <span style={labelStyle}>Cuidado / risco</span>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--bf-text-secondary)' }}>{item.cuidado}</p>
      </div>
    </article>
  )
}

function EdicaoBloco({ item }: { item: Edicao }) {
  const meta = trilhaMeta[item.trilha]
  return (
    <article style={{ ...cardStyle, padding: 40, marginBottom: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: '0.16em',
            color: meta.cor,
            textTransform: 'uppercase',
          }}
        >
          Trilha {meta.nome}
        </span>
        <h3
          style={{
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '10px 0 8px',
          }}
        >
          {item.titulo}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--bf-text-secondary)', fontStyle: 'italic', marginBottom: 6 }}>
          {item.subtitulo}
        </p>
        <p className="mono" style={{ fontSize: 11, color: 'var(--bf-text-subtle)', letterSpacing: '0.06em' }}>
          {item.fonte}
        </p>
      </div>
      <div className="bf-measure-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {item.paragrafos.map((p, i) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--bf-text-primary)' }}>
            {p}
          </p>
        ))}
      </div>
    </article>
  )
}

type Filtro = 'todas' | Trilha

export function TrilhaFilter() {
  const [filtro, setFiltro] = useState<Filtro>('todas')

  const ideiasFiltradas =
    filtro === 'todas' ? ideias : ideias.filter((i) => i.trilha === filtro)
  const edicoesFiltradas =
    filtro === 'todas' ? edicoes : edicoes.filter((e) => e.trilha === filtro)

  const contagem: Record<Filtro, number> = {
    todas: ideias.length,
    patriarca: ideias.filter((i) => i.trilha === 'patriarca').length,
    construtor: ideias.filter((i) => i.trilha === 'construtor').length,
    atleta: ideias.filter((i) => i.trilha === 'atleta').length,
  }

  const filtros: { id: Filtro; label: string; cor?: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'patriarca', label: 'Patriarca', cor: trilhaMeta.patriarca.cor },
    { id: 'construtor', label: 'Construtor', cor: trilhaMeta.construtor.cor },
    { id: 'atleta', label: 'Atleta', cor: trilhaMeta.atleta.cor },
  ]

  return (
    <div>
      {/* Tabs */}
      <div
        style={{
          position: 'sticky',
          top: 64,
          zIndex: 40,
          background: 'var(--bf-bg-page)',
          borderBottom: '1px solid var(--bf-border)',
          padding: '20px 0',
          marginBottom: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {filtros.map((f) => {
            const active = filtro === f.id
            return (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                style={{
                  background: active ? (f.cor ?? 'var(--bf-text-primary)') : 'transparent',
                  color: active ? '#fff' : 'var(--bf-text-primary)',
                  border: `1px solid ${active ? (f.cor ?? 'var(--bf-text-primary)') : 'var(--bf-border-strong)'}`,
                  padding: '8px 16px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  transition: 'all 180ms ease-out',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {f.label}
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    opacity: 0.7,
                    letterSpacing: '0.04em',
                  }}
                >
                  {contagem[f.id]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Trilha descrição quando filtrada */}
      {filtro !== 'todas' && (
        <div
          style={{
            padding: 28,
            borderLeft: `3px solid ${trilhaMeta[filtro].cor}`,
            background: 'var(--bf-surface-subtle)',
            marginBottom: 40,
            borderRadius: '0 4px 4px 0',
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              color: trilhaMeta[filtro].cor,
              textTransform: 'uppercase',
            }}
          >
            {trilhaMeta[filtro].cluster}
          </span>
          <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 14px' }}>
            Trilha {trilhaMeta[filtro].nome}
          </h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--bf-text-secondary)' }}
          >
            {trilhaMeta[filtro].descricao}
          </p>
        </div>
      )}

      {/* Ideias */}
      <div>
        {ideiasFiltradas.map((i) => (
          <IdeiaCard key={i.codigo} item={i} />
        ))}
      </div>

      {/* Edições */}
      <div style={{ marginTop: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <span
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bf-text-secondary)',
            }}
          >
            Trilha de prova de voz · 3 edições-piloto
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginTop: 8,
              lineHeight: 1.1,
            }}
          >
            Edição-piloto Club
          </h2>
        </div>
        {edicoesFiltradas.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--bf-text-secondary)', fontStyle: 'italic' }}>
            Nenhuma edição-piloto na trilha selecionada.
          </p>
        ) : (
          edicoesFiltradas.map((e) => <EdicaoBloco key={e.titulo} item={e} />)
        )}
      </div>
    </div>
  )
}
