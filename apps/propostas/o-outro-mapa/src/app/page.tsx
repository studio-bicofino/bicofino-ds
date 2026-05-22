import { ProposalHero }      from '@/components/ProposalHero'
import { TeseBlock }         from '@/components/TeseBlock'
import { MapaBrasil }        from '@/components/MapaBrasil'
import { DataCard }          from '@/components/DataCard'
import { TierCard }          from '@/components/TierCard'
import { EntregavelGrid }    from '@/components/EntregavelGrid'
import { InvestimentoTable } from '@/components/InvestimentoTable'
import { CronogramaTable }   from '@/components/CronogramaTable'
import { ProposalFooter }    from '@/components/ProposalFooter'

const C = {
  border: 'var(--bf-border)',
  text:   'var(--bf-text-primary)',
  muted:  'var(--bf-text-secondary)',
  subtle: 'var(--bf-text-subtle)',
  accent: 'var(--current-accent)',
  bg:     'var(--bf-bg-page)',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const H_PAD = 72
const hairline = '1px solid var(--bf-border)'

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{
        fontFamily:    mono,
        fontSize:      11,
        letterSpacing: '0.12em',
        color:         C.accent,
        margin:        '0 0 12px',
        fontWeight:    600,
        textTransform: 'uppercase',
      }}>
        {eyebrow}
      </p>
      <h2
        className="text-balance"
        style={{
          fontFamily:    sans,
          fontSize:      40,
          fontWeight:    700,
          letterSpacing: '-0.03em',
          color:         C.text,
          margin:        0,
          lineHeight:    1.1,
        }}
      >
        {title}
      </h2>
    </div>
  )
}

export default function Page() {
  return (
    <div lang="pt-BR" style={{ background: C.bg }}>

      {/* SEÇÃO 1 — HERO */}
      <section id="hero">
        <ProposalHero
          eyebrow="PROPOSTA ✦ CONFIDENCIAL"
          title="O OUTRO MAPA"
          subtitle="23 estados fora do eixo. 14 federações no primeiro recorte. Uma marca."
          lead="Quando Casas Bahia comprou o Paulistão, Superbet o Carioca, Sicoob o Mineiro e Bet365 o Gaúcho, o mapa do patrocínio esportivo brasileiro virou um quadrado. Fora dele estão os outros 23 estados do país — três regiões inteiras e algumas das torcidas mais fanáticas do Brasil. Esta é uma proposta para ocupar esse mapa inteiro de forma coordenada, começando por catorze federações estratégicas."
        />
      </section>

      {/* SEÇÃO 2 — A TESE */}
      <section id="tese" style={{ padding: `80px ${H_PAD}px 0`, borderBottom: hairline }}>
        <SectionHeader eyebrow="A TESE" title="O mercado que o eixo não viu" />
        <TeseBlock
          paragraphs={[
            'O futebol brasileiro sustenta dois mercados de marca simultâneos. O primeiro é o eixo dos quatro grandes estaduais — Paulista, Carioca, Mineiro, Gaúcho —, hoje completamente tomado por contratos que vão de R$ 20 a R$ 30 milhões anuais. O segundo é o que sobra do mapa: 23 federações que organizam competições com torcidas fiéis, audiência regional consolidada e abertura comercial real — mas que negociam patrocínios fragmentados, individualmente, para anunciantes locais.',
            'O Outro Mapa organiza esse mercado em um único produto comercial. O recorte inicial cobre catorze federações estratégicas em quatro regiões. O horizonte de expansão é todo o restante do país.',
          ]}
          quote="18 das 27 federações estaduais já firmaram naming rights em 2026."
          quoteSource="CNN Brasil, fev/2026"
        />
      </section>

      {/* SEÇÃO 3 — O MAPA */}
      <section id="mapa" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>
          {/* Coluna texto */}
          <div style={{ minWidth: 300, maxWidth: 360 }}>
            <p style={{
              fontFamily:    mono,
              fontSize:      11,
              letterSpacing: '0.12em',
              color:         C.accent,
              fontWeight:    600,
              textTransform: 'uppercase',
              margin:        '0 0 16px',
            }}>
              ✦ O MAPA
            </p>
            <h2
              className="text-balance"
              style={{
                fontFamily: sans,
                fontSize:   28,
                fontWeight: 600,
                color:      C.text,
                margin:     '0 0 24px',
                lineHeight: 1.2,
              }}
            >
              Onde o pacote opera
            </h2>
            <p
              className="text-pretty"
              style={{
                fontFamily: sans,
                fontSize:   15,
                lineHeight: 1.7,
                color:      C.muted,
                margin:     '0 0 32px',
              }}
            >
              Vinte e três estados compõem o Outro Mapa — os 27 estados brasileiros menos os quatro Big 4 (São Paulo, Rio, Minas, Rio Grande do Sul). O recorte inicial deste pacote cobre catorze federações estratégicas em quatro regiões, com 57,7 milhões de habitantes na cobertura direta e alcance qualificado estimado em 73 milhões.¹ As outras nove federações do Outro Mapa permanecem como horizonte de expansão para temporadas seguintes.
            </p>
            {/* Legenda */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { color: 'var(--current-accent)', opacity: 0.85, label: 'Recorte inicial do pacote (14 estados)' },
                { color: '#a8c9e5',               opacity: 1,    label: 'Expansão futura — outras 9 federações' },
                { color: '#6d7886',               opacity: 0.6,  label: 'Big 4 — já comprados' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width:        12,
                    height:       12,
                    borderRadius: 2,
                    background:   item.color,
                    opacity:      item.opacity,
                    flexShrink:   0,
                    display:      'block',
                  }} />
                  <span style={{ fontFamily: sans, fontSize: 13, color: C.muted }}>{item.label}</span>
                </div>
              ))}
            </div>
            {/* Nota de rodapé */}
            <p style={{
              fontFamily: sans,
              fontSize:   11,
              color:      C.subtle,
              marginTop:  24,
              lineHeight: 1.6,
            }}>
              ¹ Alcance qualificado inclui transmissões regionais (afiliadas Globo, TVs estaduais, canais digitais). Soma exata de habitantes dos 14 estados: 57.730.915 (IBGE 2025).
            </p>
          </div>
          {/* Mapa SVG */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <MapaBrasil />
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — CONTEXTO */}
      <section id="contexto" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="CONTEXTO DE MERCADO" title="Os dados que sustentam a tese" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <DataCard
            number="47%"
            text="dos brasileiros assistem a pelo menos um jogo de futebol por semana"
            source="Nexus / CBF, 2025"
          />
          <DataCard
            number="158 milhões"
            text="é o tamanho da audiência total do mercado esportivo brasileiro"
            source="Meio e Mensagem, 2025"
          />
          <DataCard
            number="R$ 1,3 tri"
            text="foi o consumo das famílias do Nordeste em 2024 — 17,9% do consumo nacional"
            source="IPC Maps, 2024"
          />
          <DataCard
            number="R$ 20–30 mi"
            text="é a faixa anual dos contratos de naming rights das federações líderes"
            source="CNN Brasil, 2026"
          />
        </div>
      </section>

      {/* SEÇÃO 5 — OS TIERS */}
      <section id="tiers" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="O CAMINHO BICOFINO" title="Três tiers, três lógicas de valor" />
        <p
          className="text-pretty"
          style={{
            fontFamily: sans,
            fontSize:   17,
            lineHeight: 1.75,
            color:      C.muted,
            maxWidth:   680,
            margin:     '0 0 48px',
          }}
        >
          O pacote é construído em três níveis. Cada tier oferece um tipo distinto de retorno ao patrocinador. A combinação garante densidade de exposição no Nordeste, alcance institucional no Norte e Centro-Oeste, e narrativa de capilaridade nacional.
        </p>
        <TierCard
          tierNumber={1}
          tierName="Os clássicos regionais"
          states={['Bahia', 'Pernambuco']}
          description="Os dois estaduais mais antigos e populares do Nordeste, com clubes de torcida nacional (Bahia, Vitória, Sport, Náutico, Santa Cruz)."
          deliveries="Média de público acima de 7.000 pagantes por jogo, finais com audiência de 1,4 milhão de telespectadores em cada estado, redes oficiais ativas (97 mil seguidores no Instagram da FBF, 40 mil na FPF-PE), transmissão em TV aberta e YouTube."
          valuePerCamp="R$ 1,5 milhão por campeonato"
          tierTotal="R$ 3 milhões (2 campeonatos)"
        />
        <TierCard
          tierNumber={2}
          tierName="Os mercados estratégicos"
          states={['Mato Grosso', 'Amazonas', 'Espírito Santo', 'Paraíba', 'Alagoas', 'Sergipe']}
          description="Cobrem quatro regiões do país, com clubes em ascensão nacional (Cuiabá na Série A, Manaus FC na Série B, Botafogo-PB na Série C, CRB e CSA em AL)."
          deliveries="Transmissões consolidadas (TV Centro-América, FAF TV, TVE-ES, TV Cabo Branco). O Capixabão registrou 1,6 milhão de visualizações no YouTube e 12 milhões no Instagram em 2024. Exclusividade comercial maior pela menor saturação de patrocinadores."
          valuePerCamp="R$ 650 mil por campeonato"
          tierTotal="R$ 3,9 milhões (6 campeonatos)"
        />
        <TierCard
          tierNumber={3}
          tierName="A capilaridade institucional"
          states={['Mato Grosso do Sul', 'Piauí', 'Tocantins', 'Rondônia', 'Acre', 'Roraima']}
          description="Seis estados onde marcas grandes raramente investem. A escala futebolística é menor, mas a densidade simbólica é alta — o patrocinador chega a praças onde concorrência nenhuma chegou."
          deliveries="Exclusividade total em cada competição. Narrativa de marca que apoia a base do esporte brasileiro, com reverberação em mídia institucional."
          valuePerCamp="R$ 350 mil por campeonato"
          tierTotal="R$ 2,1 milhões (6 campeonatos)"
        />
      </section>

      {/* SEÇÃO 6 — PACOTE */}
      <section id="pacote" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="INVESTIMENTO" title="A estrutura financeira" />
        <InvestimentoTable />
      </section>

      {/* SEÇÃO 7 — ENTREGÁVEIS */}
      <section id="entregaveis" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="PROPRIEDADES" title="O que está incluído em cada campeonato" />
        <EntregavelGrid blocks={[
          {
            eyebrow: 'Identidade e presença',
            title:   'Naming & Visibilidade',
            items: [
              'Naming rights da competição',
              'Exclusividade no segmento de atuação',
              'Naming rights no troféu, medalhas e pódio',
              'Marca em destaque nos releases e posts oficiais',
            ],
          },
          {
            eyebrow: 'Ativações físicas',
            title:   'Em campo',
            items: [
              'Placa central 12×1 metros em todos os jogos',
              'Placas atrás dos dois gols em todos os jogos',
              'Backdrop de entrevistas no intervalo e ao final',
              '50 ingressos por partida (100 nas fases finais)',
              'Área dedicada de ativação nas finais',
            ],
          },
          {
            eyebrow: 'Ativações digitais',
            title:   'Conteúdo e redes',
            items: [
              'Três posts exclusivos nas redes oficiais de até dez campeonatos',
              'Uma live em redes sociais de até cinco campeonatos',
              'Uma ativação especial nas finais de até cinco campeonatos',
              'Duas credenciais para influenciadores com acesso ao backstage',
              'Direito de produção de conteúdo próprio',
            ],
          },
          {
            eyebrow: 'Direitos comerciais',
            title:   'Licenciamento',
            items: [
              'Direito de licenciamento de produto ou serviço oficial',
              'Uso da logo dos campeonatos para promoções, sorteios e sampling',
              'Brindes, tour do troféu, Fan Zone e ações de abertura',
              'Material de PDV e campanhas de engajamento',
            ],
          },
        ]} />
      </section>

      {/* SEÇÃO 8 — GARANTIAS */}
      <section id="garantias" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="EXECUÇÃO" title="Catorze federações sob uma única coordenação contratual" />
        {[
          'O patrocinador conduz uma negociação única em vez de catorze. Aprova um fluxo em vez de catorze. Recebe um dashboard consolidado em vez de catorze relatórios paralelos.',
          'O Bicofino atua como interface única entre o anunciante e as federações estaduais. Padronizamos os entregáveis, consolidamos os calendários, centralizamos os assets digitais, garantimos auditoria mensal e entregamos relatório final de temporada com ROI estimado por praça.',
          'A operação é coordenada por equipe dedicada do Studio Bicofino, com cobertura geográfica garantida em todas as catorze federações ao longo da temporada.',
        ].map((text, i) => (
          <p
            key={i}
            className="text-pretty"
            style={{
              fontFamily:   sans,
              fontSize:     17,
              lineHeight:   1.75,
              color:        C.muted,
              maxWidth:     720,
              marginBottom: 24,
            }}
          >
            {text}
          </p>
        ))}
      </section>

      {/* SEÇÃO 9 — INVESTIMENTO & CRONOGRAMA */}
      <section id="investimento" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="PRAZOS" title="Os marcos da operação" />
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily:    mono,
              fontSize:      10,
              letterSpacing: '0.1em',
              color:         C.subtle,
              textTransform: 'uppercase',
              margin:        '0 0 16px',
            }}>
              Estrutura de valor
            </p>
            <InvestimentoTable />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily:    mono,
              fontSize:      10,
              letterSpacing: '0.1em',
              color:         C.subtle,
              textTransform: 'uppercase',
              margin:        '0 0 16px',
            }}>
              Cronograma
            </p>
            <CronogramaTable />
          </div>
        </div>
      </section>

      {/* SEÇÃO 10 — PRÓXIMO PASSO */}
      <section id="proximo-passo" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: sans,
            fontSize:   18,
            lineHeight: 1.7,
            color:      C.muted,
            margin:     '0 0 8px',
          }}>
            Esta proposta foi desenhada para ser apresentada em conversa estruturada. Para agendar, escreva para
          </p>
          <a
            href="mailto:propostas@bicofino.com"
            style={{
              fontFamily: sans,
              fontSize:   18,
              fontWeight: 600,
              color:      C.text,
              display:    'block',
              margin:     '8px 0 40px',
            }}
          >
            propostas@bicofino.com
          </a>
          <p style={{ fontFamily: sans, fontSize: 14, color: C.subtle }}>
            Studio Bicofino — São Paulo
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <ProposalFooter />
    </div>
  )
}
