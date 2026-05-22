const MARCOS = [
  { marco: 'Apresentação ao anunciante',           periodo: 'Junho/2026',          isHighlight: false },
  { marco: 'Negociação',                           periodo: 'Junho a Agosto/2026', isHighlight: false },
  { marco: 'Assinatura do contrato master',        periodo: 'Setembro/2026',       isHighlight: false },
  { marco: 'Contratos individuais com federações', periodo: 'Outubro/2026',        isHighlight: false },
  { marco: 'Anúncio público da parceria',          periodo: 'Novembro/2026',       isHighlight: false },
  { marco: 'Estreia do pacote em campo',           periodo: 'Janeiro/2027',        isHighlight: true  },
]

export function CronogramaTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9,
              color: 'var(--bf-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500,
              paddingBottom: 8,
              borderBottom: '1px solid var(--bf-border-strong)',
              textAlign: 'left',
            }}
          >
            Marco
          </th>
          <th
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9,
              color: 'var(--bf-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500,
              paddingBottom: 8,
              borderBottom: '1px solid var(--bf-border-strong)',
              textAlign: 'right',
            }}
          >
            Período
          </th>
        </tr>
      </thead>
      <tbody>
        {MARCOS.map((row, i) => (
          <tr key={i}>
            <td
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                color: 'var(--bf-text-secondary)',
                padding: '11px 0',
                borderBottom: '1px solid var(--bf-border)',
              }}
            >
              {row.marco}
            </td>
            <td
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
                color: row.isHighlight ? 'var(--current-accent)' : 'var(--bf-text-secondary)',
                fontWeight: row.isHighlight ? 600 : 400,
                padding: '11px 0',
                borderBottom: '1px solid var(--bf-border)',
                textAlign: 'right',
              }}
            >
              {row.periodo}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
