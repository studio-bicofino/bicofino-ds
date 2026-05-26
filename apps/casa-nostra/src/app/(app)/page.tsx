export default function PeoplePage() {
  return (
    <div style={{ padding: 32 }}>
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-secondary)',
          marginBottom: 8,
        }}
      >
        Casa · Pessoas
      </p>
      <h1 style={{ fontSize: 32, letterSpacing: '-0.02em', marginBottom: 16 }}>
        Pessoas
      </h1>
      <p style={{ color: 'var(--bf-text-secondary)', fontSize: 14, maxWidth: 560 }}>
        Placeholder. Aqui virá a lista com search, filtros, e botão "+ Adicionar pessoa".
        Aguardando conexão Supabase + migrations rodadas pra começar a popular.
      </p>
    </div>
  )
}
