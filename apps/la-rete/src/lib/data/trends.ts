import type { Trend } from './types'

/**
 * LA RETE — tendências observadas.
 *
 * Curadoria a partir dos três volumes VANGUARDA (Mercados Globais,
 * 100 Ideias, Italia 2027) + 3 sinais externos de imprensa.
 *
 * Sobre os pesos dos hooks:
 * - 0.9–1.0 → a tag É o território da tendência (quem a carrega está no centro).
 * - 0.5–0.8 → adjacência forte: empresa, afiliação ou skill que dá porta de entrada.
 * - 0.2–0.4 → adjacência fraca: cruza com a tendência mas não a define.
 * Os tagName são EXATOS como em tags.ts — o motor de aderência casa por nome.
 */
export const TRENDS: Trend[] = [
  {
    id: 'tr-eudr-rastreabilidade',
    title: 'Rastreabilidade EUDR no agro exportador',
    source: 'VANGUARDA · 100 Ideias',
    observedAt: '2026-04-14',
    summary:
      'O regulamento antidesmatamento europeu transforma rastreabilidade de diferencial em condição de embarque para soja, café e carne. Quem controla o dado da fazenda à doca passa a controlar o acesso ao comprador europeu. A janela regulatória é compulsória — o produtor médio vai aderir quando a venda vier de um par.',
    hooks: [
      { tagName: 'Agro', weight: 1.0 },
      { tagName: 'Solaria Agro', weight: 0.7 },
      { tagName: 'Logística', weight: 0.5 },
      { tagName: 'IA / Dados', weight: 0.4 },
      { tagName: 'Direito', weight: 0.3 },
    ],
    sectors: ['AGRO', 'COMPLIANCE'],
  },
  {
    id: 'tr-legal-ai',
    title: 'IA aplicada à prática jurídica',
    source: 'VANGUARDA · 100 Ideias',
    observedAt: '2026-04-22',
    summary:
      'Os grandes escritórios brasileiros passaram da fase de piloto e tratam IA como infraestrutura de produção. Revisão contratual e due diligence assistida cortam horas faturáveis — o que muda o modelo de preço antes de mudar o organograma. A vantagem fica com quem tem base de casos proprietária e cliente que aceita o novo formato.',
    hooks: [
      { tagName: 'Direito', weight: 1.0 },
      { tagName: 'Ferraz & Associados', weight: 0.8 },
      { tagName: 'IA / Dados', weight: 0.7 },
      { tagName: 'M&A', weight: 0.4 },
      { tagName: 'Tech', weight: 0.3 },
    ],
    sectors: ['LEGALTECH', 'IA'],
  },
  {
    id: 'tr-longevidade-premium',
    title: 'Longevidade e diagnóstico preventivo premium',
    source: 'VANGUARDA · 100 Ideias',
    observedAt: '2026-05-02',
    summary:
      'Check-up executivo virou produto de assinatura: painel genético, imagem de corpo inteiro e acompanhamento contínuo, vendidos a famílias que já pagam wealth management. O atleta em fim de carreira é cliente e garoto-propaganda do mesmo serviço. Margem de luxo com regulação de saúde — quem opera bem os dois lados fica sozinho no segmento.',
    hooks: [
      { tagName: 'Saúde / Longevidade', weight: 1.0 },
      { tagName: 'Faro Saúde', weight: 0.8 },
      { tagName: 'Futebol Atleta', weight: 0.4 },
      { tagName: 'Wealth Management', weight: 0.3 },
    ],
    sectors: ['SAÚDE', 'LONGEVIDADE'],
  },
  {
    id: 'tr-vertical-ai-family-office',
    title: 'IA vertical para family offices',
    source: 'VANGUARDA · Mercados Globais',
    observedAt: '2026-04-08',
    summary:
      'Family offices de porte médio operam com planilha e memória institucional de duas pessoas. Software vertical com IA — consolidação de posições, governança de comitê, sucessão documentada — resolve um problema que o private bank não tem incentivo de resolver. Ticket alto, churn baixo, venda por confiança.',
    hooks: [
      { tagName: 'Wealth Management', weight: 1.0 },
      { tagName: 'IA / Dados', weight: 0.7 },
      { tagName: 'Vetrina Capital', weight: 0.6 },
      { tagName: 'Investidor', weight: 0.4 },
      { tagName: 'BTG Pactual', weight: 0.3 },
    ],
    sectors: ['WEALTH', 'IA'],
  },
  {
    id: 'tr-direitos-midia-esportiva',
    title: 'Reprecificação dos direitos de mídia do futebol',
    source: 'Reuters',
    observedAt: '2026-05-18',
    summary:
      'Streamers globais disputam pacotes de ligas sul-americanas e fragmentam o valor que antes se concentrava na TV aberta. Clube com marca própria e biblioteca de conteúdo negocia de outro patamar; clube sem isso vira commodity de calendário. A próxima rodada de contratos no Brasil define quem captura a diferença.',
    hooks: [
      { tagName: 'Mídia', weight: 0.9 },
      { tagName: 'Futebol Dirigente', weight: 0.8 },
      { tagName: 'Globo', weight: 0.7 },
      { tagName: 'Futebol Atleta', weight: 0.5 },
      { tagName: 'CBF', weight: 0.4 },
      { tagName: 'Publicidade', weight: 0.3 },
    ],
    sectors: ['ESPORTE', 'MÍDIA'],
  },
  {
    id: 'tr-calcio-ativo-cultural',
    title: 'Calcio como ativo cultural e de capital',
    source: 'VANGUARDA · Italia 2027',
    observedAt: '2026-04-30',
    summary:
      'Como 1907 provou a tese: clube italiano de cidade média, comprado barato, reposicionado como marca de estilo de vida com lago ao fundo. O calcio fora do G7 da Serie A virou classe de ativo para capital paciente que entende narrativa tanto quanto balanço. O preço de entrada ainda não reflete o que a próxima década de mídia vai pagar.',
    hooks: [
      { tagName: 'Futebol Dirigente', weight: 0.9 },
      { tagName: 'Como 1907', weight: 0.8 },
      { tagName: 'M&A', weight: 0.6 },
      { tagName: 'Napoli', weight: 0.5 },
      { tagName: 'Torino', weight: 0.5 },
      { tagName: 'Investidor', weight: 0.4 },
    ],
    sectors: ['CALCIO', 'CAPITAL'],
  },
  {
    id: 'tr-regime-impatriati',
    title: 'Regime impatriati e residência fiscal na Itália',
    source: 'VANGUARDA · Italia 2027',
    observedAt: '2026-05-10',
    summary:
      'O regime de impatriados e a flat tax para novos residentes seguem atraindo patrimônio e atletas para a Itália, mesmo após o aperto de 2024. Para a família ítalo-brasileira com passaporte encaminhado, a mudança deixa de ser afetiva e passa a ser estrutura fiscal. A execução exige advogado dos dois lados do Atlântico — é aí que a maioria erra.',
    hooks: [
      { tagName: 'Wealth Management', weight: 0.8 },
      { tagName: 'Direito', weight: 0.6 },
      { tagName: 'Futebol Atleta', weight: 0.5 },
      { tagName: 'Família Lombardi', weight: 0.4 },
      { tagName: 'Investidor', weight: 0.3 },
    ],
    sectors: ['FISCAL', 'ITÁLIA'],
  },
  {
    id: 'tr-open-finance-credito',
    title: 'Crédito sobre Pix e Open Finance',
    source: 'VANGUARDA · 100 Ideias',
    observedAt: '2026-04-18',
    summary:
      'O dado consentido do Open Finance e o fluxo do Pix permitem underwriting em tempo real para PMEs que o crédito tradicional nunca leu direito. O flywheel é de dados: cada operação melhora o modelo do próximo cliente. Acesso a meia dúzia de bancos médios vale mais do que capital — é tese de Connect antes de ser tese de cheque.',
    hooks: [
      { tagName: 'Fintech', weight: 1.0 },
      { tagName: 'IA / Dados', weight: 0.5 },
      { tagName: 'Itaú', weight: 0.5 },
      { tagName: 'BTG Pactual', weight: 0.4 },
      { tagName: 'Tech', weight: 0.3 },
    ],
    sectors: ['FINTECH', 'CRÉDITO'],
  },
  {
    id: 'tr-luxo-italiano-digital',
    title: 'Luxo italiano acelera o canal digital direto',
    source: 'Sifted',
    observedAt: '2026-05-26',
    summary:
      'As casas do norte da Itália — têxteis de Biella incluídas — estão internalizando e-commerce, dado de cliente e clienteling digital depois de décadas terceirizando o canal. O movimento abre espaço para operadores que falam a língua da casa e a do software ao mesmo tempo. O Brasil é mercado de teste natural: cliente de luxo maduro, distribuição fraca.',
    hooks: [
      { tagName: 'Luxo', weight: 1.0 },
      { tagName: 'Loro Piana', weight: 0.8 },
      { tagName: 'Mídia', weight: 0.4 },
      { tagName: 'Publicidade', weight: 0.4 },
      { tagName: 'Tech', weight: 0.3 },
    ],
    sectors: ['LUXO', 'DIGITAL'],
  },
  {
    id: 'tr-stablecoin-treasury',
    title: 'Stablecoins na tesouraria corporativa',
    source: 'VANGUARDA · Mercados Globais',
    observedAt: '2026-05-06',
    summary:
      'Tesourarias de empresas exportadoras começaram a usar stablecoins reguladas para liquidação internacional e proteção cambial intradiária. É infraestrutura de pagamento com custo menor que o correspondente bancário. O CFO que estruturar isso primeiro vira referência para os pares do setor.',
    hooks: [
      { tagName: 'Fintech', weight: 0.8 },
      { tagName: 'Wealth Management', weight: 0.7 },
      { tagName: 'CFO', weight: 0.6 },
      { tagName: 'Tech', weight: 0.3 },
      { tagName: 'Logística', weight: 0.2 },
    ],
    sectors: ['TESOURARIA', 'FINTECH'],
  },
  {
    id: 'tr-proptech-renda',
    title: 'PropTech de renda recorrente no Brasil',
    source: 'Bloomberg Línea',
    observedAt: '2026-06-03',
    summary:
      'Gestão de portfólio residencial para renda — aluguel de média estadia, build-to-rent, administração digital de multipropriedade — atrai capital institucional que antes só olhava laje corporativa. O software é o que separa margem de dor de cabeça. Operador com terra e reputação local tem vantagem que a startup de fora não compra.',
    hooks: [
      { tagName: 'Real Estate', weight: 1.0 },
      { tagName: 'Bastione Real Estate', weight: 0.8 },
      { tagName: 'Tech', weight: 0.4 },
      { tagName: 'IA / Dados', weight: 0.3 },
      { tagName: 'Investidor', weight: 0.3 },
    ],
    sectors: ['REAL ESTATE', 'TECH'],
  },
  {
    id: 'tr-newsletter-atleta',
    title: 'Newsletter paga e comunidade fechada de atleta',
    source: 'VANGUARDA · 100 Ideias',
    observedAt: '2026-05-20',
    summary:
      'O atleta que escreve — bastidor, método, leitura de jogo — monetiza audiência sem depender de patrocínio nem de algoritmo. Creator economy discreta: mil assinantes pagantes valem mais que um milhão de seguidores. O ativo é a relação direta, e ela sobrevive à aposentadoria.',
    hooks: [
      { tagName: 'Futebol Atleta', weight: 1.0 },
      { tagName: 'Mídia', weight: 0.6 },
      { tagName: 'Quadra Sports', weight: 0.5 },
      { tagName: 'Atleta', weight: 0.4 },
      { tagName: 'Publicidade', weight: 0.4 },
    ],
    sectors: ['CREATOR', 'ESPORTE'],
  },
]
