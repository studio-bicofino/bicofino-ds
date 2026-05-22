const ROWS = [
  { label: 'Tier 1 — Baiano e Pernambucano (2 × R$ 1,5 mi)',    value: 'R$ 3.000.000',           isTotal: false },
  { label: 'Tier 2 — Seis campeonatos (6 × R$ 650 mil)',         value: 'R$ 3.900.000',           isTotal: false },
  { label: 'Tier 3 — Seis campeonatos (6 × R$ 350 mil)',         value: 'R$ 2.100.000',           isTotal: false },
  { label: 'Coordenação, padronização e garantias Bicofino',     value: 'R$ 3.000.000–5.000.000', isTotal: false },
  { label: 'TOTAL — Pacote base',                                value: 'R$ 12.000.000',          isTotal: true  },
  { label: 'TOTAL — Pacote ampliado (com ativações expandidas)', value: 'R$ 14.000.000',          isTotal: true  },
]

const firstTotalIndex = ROWS.findIndex((r) => r.isTotal)

export function InvestimentoTable() {
  return (
    <div>
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
              Componente
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
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => {
            const isFirstTotal = row.isTotal && i === firstTotalIndex

            return (
              <tr key={i}>
                <td
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: row.isTotal ? 14 : 13,
                    fontWeight: row.isTotal ? 600 : 400,
                    color: row.isTotal ? 'var(--bf-text-primary)' : 'var(--bf-text-secondary)',
                    padding: '11px 0',
                    borderBottom: '1px solid var(--bf-border)',
                    borderTop: isFirstTotal ? '2px solid var(--bf-border-strong)' : undefined,
                  }}
                >
                  {row.label}
                </td>
                <td
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 12,
                    fontWeight: row.isTotal ? 600 : 400,
                    color: row.isTotal ? 'var(--bf-text-primary)' : 'var(--bf-text-secondary)',
                    padding: '11px 0',
                    borderBottom: '1px solid var(--bf-border)',
                    borderTop: isFirstTotal ? '2px solid var(--bf-border-strong)' : undefined,
                    textAlign: 'right',
                  }}
                >
                  {row.value}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 12,
          color: 'var(--bf-text-subtle)',
          fontStyle: 'italic',
          marginTop: 16,
        }}
      >
        Pagamento em parcelas trimestrais, primeiro aporte na assinatura. Temporada 2027 (janeiro–abril). Opção de renovação para 2028.
      </p>
    </div>
  )
}
