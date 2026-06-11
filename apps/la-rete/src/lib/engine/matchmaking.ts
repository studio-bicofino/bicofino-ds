import type { Edge, Opportunity, Person, Signal, SignalType, Tag } from '../data/types'

/**
 * LA RETE — motor de matchmaking.
 *
 * Três famílias de oportunidade:
 *   'entre-membros' — pares com skills complementares (a casa faz a ponte);
 *   'com-bicofino'  — pessoa × frentes operadas pela própria Bicofino;
 *   'mercado'       — sinais da rede cruzados com demanda externa mapeada.
 *
 * Determinístico por contrato: sem Math.random, sem Date.now.
 * Mesma entrada → mesma lista, mesma ordem (score desc, depois id asc).
 */

/* ── Tabela de complementaridade (entre-membros) ────────────────────── */

interface ComplementRule {
  /** nomes de skill exatamente como em tags.ts */
  x: string
  y: string
  slug: string
  /** título curto, voz Bicofino — sóbrio, concreto */
  title: string
  /** primeira frase do rationale: a tese */
  reason: string
  /** palavras-chave (minúsculas) que ativam o boost de sinal */
  keywords: string[]
}

const COMPLEMENT_RULES: ComplementRule[] = [
  {
    x: 'Agro',
    y: 'Fintech',
    slug: 'agro-fintech',
    title: 'Crédito e risco agro — campo × fintech',
    reason: 'Originação no campo de um lado, motor de crédito e risco do outro.',
    keywords: ['agro', 'crédito', 'credito', 'safra', 'fiagro', 'capital'],
  },
  {
    x: 'Agro',
    y: 'Energia',
    slug: 'agro-energia',
    title: 'Energia no campo — agro × energia',
    reason: 'Demanda energética da fazenda encontra geração e contrato de longo prazo.',
    keywords: ['agro', 'energia', 'solar', 'biomassa'],
  },
  {
    x: 'Futebol Atleta',
    y: 'Wealth Management',
    slug: 'atleta-wealth',
    title: 'Patrimônio do atleta — mesa de gestão',
    reason: 'Carreira curta, capital concentrado: gestão de patrimônio do atleta.',
    keywords: ['patrimônio', 'patrimonio', 'capital', 'carreira', 'invest'],
  },
  {
    x: 'Futebol Atleta',
    y: 'Saúde / Longevidade',
    slug: 'atleta-longevidade',
    title: 'Corpo como ativo — atleta × longevidade',
    reason: 'Performance e pós-carreira do atleta pedem protocolo de longevidade.',
    keywords: ['longevidade', 'saúde', 'saude', 'performance', 'clínica', 'clinica'],
  },
  {
    x: 'Futebol Dirigente',
    y: 'Mídia',
    slug: 'dirigente-midia',
    title: 'Direitos do clube — mesa × mídia',
    reason: 'Quem decide no clube ao lado de quem distribui: direitos de transmissão e conteúdo.',
    keywords: ['direitos', 'mídia', 'midia', 'transmiss', 'clube'],
  },
  {
    x: 'Direito',
    y: 'M&A',
    slug: 'direito-ma',
    title: 'Mesa de transação — jurídico × M&A',
    reason: 'Estrutura jurídica e originação de transação na mesma mesa.',
    keywords: ['m&a', 'aquisi', 'jurídic', 'juridic', 'venda', 'capital'],
  },
  {
    x: 'Real Estate',
    y: 'Wealth Management',
    slug: 'real-estate-wealth',
    title: 'Tijolo na carteira — real estate × gestão',
    reason: 'Ativo imobiliário entra na alocação patrimonial com tese e saída.',
    keywords: ['imobili', 'tijolo', 'capital', 'aloca', 'patrimônio', 'patrimonio'],
  },
  {
    x: 'Tech',
    y: 'Publicidade',
    slug: 'tech-publicidade',
    title: 'Produto × campanha — tech × publicidade',
    reason: 'Produto digital ganha distribuição; a agência ganha tecnologia própria.',
    keywords: ['publicid', 'mídia', 'midia', 'digital', 'marca'],
  },
  {
    x: 'IA / Dados',
    y: 'Direito',
    slug: 'ia-direito',
    title: 'Legal AI — dados × jurídico',
    reason: 'Volume jurídico repetitivo é matéria-prima para IA aplicada.',
    keywords: ['intelig', 'jurídic', 'juridic', 'legal', 'dados'],
  },
  {
    x: 'Luxo',
    y: 'Mídia',
    slug: 'luxo-midia',
    title: 'Marca de luxo — casa editorial',
    reason: 'Luxo compra contexto; a mídia certa fornece.',
    keywords: ['luxo', 'marca', 'editorial', 'itália', 'italia'],
  },
  {
    x: 'Venture Capital',
    y: 'Tech',
    slug: 'vc-tech',
    title: 'Rodada na mesa — venture × tech',
    reason: 'Tese de investimento de um lado, empresa investível do outro.',
    keywords: ['rodada', 'venture', 'startup', 'capital', 'invest'],
  },
  {
    x: 'Logística',
    y: 'Agro',
    slug: 'logistica-agro',
    title: 'Escoamento da safra — logística × agro',
    reason: 'Produção sem escoamento é estoque; o corredor logístico fecha a conta.',
    keywords: ['logístic', 'logistic', 'agro', 'escoa', 'safra'],
  },
]

/* ── Frentes da própria Bicofino (com-bicofino) ─────────────────────── */

interface BicofinoFront {
  /** nome da skill exatamente como em tags.ts */
  skill: string
  slug: string
  title: string
  reason: string
}

const BICOFINO_FRONTS: BicofinoFront[] = [
  {
    skill: 'Publicidade',
    slug: 'publicidade',
    title: 'Publicidade — campanha com a casa',
    reason: 'Atua em publicidade — frente que a Bicofino opera diretamente.',
  },
  {
    skill: 'Mídia',
    slug: 'midia',
    title: 'Mídia — conteúdo e direitos com a casa',
    reason: 'Atua em mídia — território natural da produção Bicofino.',
  },
  {
    skill: 'Futebol Atleta',
    slug: 'atleta',
    title: 'Atleta — carreira e imagem com a casa',
    reason: 'Atleta em atividade — gestão de imagem é mesa da casa.',
  },
  {
    skill: 'Futebol Dirigente',
    slug: 'dirigente',
    title: 'Mesa de clube — dirigente com a casa',
    reason: 'Cadeira de decisão no futebol — porta direta para projetos da casa.',
  },
  {
    skill: 'Tech',
    slug: 'tech',
    title: 'Produto digital — tech com a casa',
    reason: 'Atua em tecnologia — frente digital que a Bicofino constrói.',
  },
  {
    skill: 'Luxo',
    slug: 'luxo',
    title: 'Luxo — colaboração de marca com a casa',
    reason: 'Atua em luxo — estética e contexto que a casa domina.',
  },
]

/* ── Tabela de demanda de mercado (mercado) ─────────────────────────── */

interface MarketDemand {
  slug: string
  title: string
  /** frase sobre a demanda externa, vai no rationale */
  demand: string
  /** palavras-chave (minúsculas) que casam com o conteúdo do sinal */
  keywords: string[]
  /** skills que reforçam a capacidade de operar a tese */
  skills: string[]
}

const MARKET_DEMANDS: MarketDemand[] = [
  {
    slug: 'credito-agro',
    title: 'Crédito agro regulado — janela aberta',
    demand: 'Mercado de crédito agro regulado em expansão, com Fiagro e CRA puxando volume.',
    keywords: ['agro', 'crédito', 'credito', 'fiagro', 'cra', 'safra'],
    skills: ['Agro', 'Fintech'],
  },
  {
    slug: 'legal-ai',
    title: 'Legal AI — tese em formação',
    demand: 'Escritórios e departamentos jurídicos buscando IA aplicada a contencioso e contratos.',
    keywords: ['legal', 'jurídic', 'juridic', 'intelig', 'dados'],
    skills: ['IA / Dados', 'Direito'],
  },
  {
    slug: 'longevidade-premium',
    title: 'Longevidade premium — demanda crescente',
    demand: 'Clínicas e protocolos de longevidade premium com fila de espera no topo da pirâmide.',
    keywords: ['longevidade', 'saúde', 'saude', 'clínica', 'clinica', 'performance'],
    skills: ['Saúde / Longevidade'],
  },
  {
    slug: 'infra-pagamentos',
    title: 'Infra de pagamentos — consolidação em curso',
    demand: 'Infraestrutura de pagamentos em consolidação; quem tem trilho atrai capital.',
    keywords: ['pagamento', 'pix', 'adquir', 'banking', 'fintech'],
    skills: ['Fintech', 'Tech'],
  },
  {
    slug: 'direitos-midia',
    title: 'Direitos de mídia esportiva — ciclo de renegociação',
    demand: 'Ciclo de renegociação de direitos esportivos abre espaço para novos arranjos.',
    keywords: ['direitos', 'mídia', 'midia', 'transmiss', 'clube', 'futebol'],
    skills: ['Mídia', 'Futebol Dirigente'],
  },
  {
    slug: 'residencia-italia',
    title: 'Residência fiscal na Itália — rota patrimonial',
    demand: 'Regimes fiscais italianos seguem atraindo patrimônio brasileiro com lastro familiar.',
    keywords: ['itália', 'italia', 'residência', 'residencia', 'fiscal', 'cidadania'],
    skills: ['Wealth Management', 'Direito'],
  },
]

/* ── Constantes de pontuação ────────────────────────────────────────── */

/** Sinais que contam como demanda ativa; 'lifeevent' e 'recusa' ficam de fora. */
const ACTIVE_SIGNAL_TYPES: ReadonlySet<SignalType> = new Set(['ask', 'interesse', 'capital_move'])

/** Rótulo PT-BR de cada tipo de sinal, para o rationale. */
const SIGNAL_LABEL: Record<SignalType, string> = {
  interesse: 'interesse declarado',
  lifeevent: 'evento de vida',
  capital_move: 'capital em movimento',
  ask: 'pedido direto',
  recusa: 'recusa registrada',
}

/** Meses PT-BR para datar o sinal sem depender de locale do runtime. */
const MONTHS_PT = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

/* ── API principal ──────────────────────────────────────────────────── */

/**
 * Calcula TODAS as oportunidades da rede, ordenadas por score desc
 * (desempate por id asc, para saída estável).
 */
export function computeOpportunities(
  people: Person[],
  tagById: Record<string, Tag>,
  edges: Edge[],
): Opportunity[] {
  const sorted = [...people].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  const edgeWeight = buildEdgeWeightIndex(edges)

  const all: Opportunity[] = [
    ...memberPairOpportunities(sorted, tagById, edgeWeight),
    ...bicofinoOpportunities(sorted, tagById),
    ...marketOpportunities(sorted, tagById),
  ]

  return all.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  })
}

/** Oportunidades em que a pessoa aparece como ponta a ou b. */
export function opportunitiesFor(personId: string, all: Opportunity[]): Opportunity[] {
  return all.filter((op) => op.a === personId || op.b === personId)
}

/* ── (a) entre-membros ──────────────────────────────────────────────── */

function memberPairOpportunities(
  sorted: Person[],
  tagById: Record<string, Tag>,
  edgeWeight: Map<string, number>,
): Opportunity[] {
  const ops: Opportunity[] = []

  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const a = sorted[i]
      const b = sorted[j]
      const aSkills = skillNamesOf(a, tagById)
      const bSkills = skillNamesOf(b, tagById)

      for (const rule of COMPLEMENT_RULES) {
        const direct = aSkills.has(rule.x) && bSkills.has(rule.y)
        const inverse = aSkills.has(rule.y) && bSkills.has(rule.x)
        if (!direct && !inverse) continue

        ops.push(pairOpportunity(a, b, rule, tagById, edgeWeight))
      }
    }
  }

  return ops
}

function pairOpportunity(
  a: Person,
  b: Person,
  rule: ComplementRule,
  tagById: Record<string, Tag>,
  edgeWeight: Map<string, number>,
): Opportunity {
  const weight = edgeWeight.get(pairKey(a.id, b.id)) ?? 0
  const sharedGround = sharedGroupOrAffiliation(a, b, tagById)
  const signal = matchingSignal(a, rule.keywords) ?? matchingSignal(b, rule.keywords)

  // Componentes em ordem de peso — o rationale segue esta ordem.
  const parts: { points: number; sentence: string }[] = []

  // Tese complementar: base de 40 pontos — a razão de existir do par.
  parts.push({ points: pairBaseScore(), sentence: rule.reason })

  // Sinal ativo casando com a tese: o boost mais forte (+20).
  if (signal) parts.push({ points: signalBoost(), sentence: signalSentence(signal) })

  // Disposição alta dos dois lados (+15).
  if (bothDisposed(a, b)) {
    parts.push({ points: dispositionBoost(), sentence: 'Os dois com disposição alta para mover negócio via casa.' })
  }

  // Sem ligação forte hoje: valor de intermediação da casa (+15).
  if (weight < 0.5) {
    parts.push({ points: intermediationBoost(), sentence: 'Sem ligação direta forte hoje — a casa faz a ponte.' })
  }

  // Terreno comum (grupo/afiliação) reduz atrito (+10).
  if (sharedGround.length > 0) {
    parts.push({
      points: sharedGroundBoost(),
      sentence: `Terreno comum em ${sharedGround[0]} reduz o atrito da aproximação.`,
    })
  }

  const score = clampScore(parts.reduce((sum, p) => sum + p.points, 0))
  const rationale = parts
    .slice()
    .sort((p, q) => q.points - p.points)
    .slice(0, 4)
    .map((p) => p.sentence)

  return {
    id: `op-${a.id}-${b.id}-${rule.slug}`,
    a: a.id,
    b: b.id,
    kind: 'entre-membros',
    score,
    title: rule.title,
    rationale,
    via: [rule.x, rule.y, ...sharedGround],
  }
}

/** Base da tese complementar: o par existir já vale 40 pontos. */
function pairBaseScore(): number {
  return 40
}

/** Sinal ativo alinhado à tese é o indício mais quente: +20. */
function signalBoost(): number {
  return 20
}

/** Disposição >= 4 dos dois lados: a porta já está aberta, +15. */
function dispositionBoost(): number {
  return 15
}

/** Par fraco ou desconectado no grafo: a ponte tem valor, +15. */
function intermediationBoost(): number {
  return 15
}

/** Grupo ou afiliação em comum: menos atrito na primeira mesa, +10. */
function sharedGroundBoost(): number {
  return 10
}

/* ── (b) com-bicofino ───────────────────────────────────────────────── */

function bicofinoOpportunities(sorted: Person[], tagById: Record<string, Tag>): Opportunity[] {
  const ops: Opportunity[] = []

  for (const person of sorted) {
    // Só entra quem tem disposição real de fazer negócio com a casa.
    if (person.bicofinoDisposition < 4) continue

    const skills = skillNamesOf(person, tagById)
    const fronts = BICOFINO_FRONTS.filter((f) => skills.has(f.skill))
    if (fronts.length === 0) continue

    const primary = fronts[0]
    const parts: { points: number; sentence: string }[] = []

    // Base: disposição alta + frente operada pela casa.
    parts.push({ points: bicofinoBaseScore(), sentence: primary.reason })

    // Disposição acima do corte: +10 por ponto acima de 3 (4→10, 5→20).
    parts.push({
      points: bicofinoDispositionScore(person),
      sentence: `Disposição ${person.bicofinoDisposition} de 5 para mover negócio com a Bicofino.`,
    })

    // Cada frente extra além da primeira soma capacidade de execução (+8, máx. +16).
    if (fronts.length > 1) {
      parts.push({
        points: extraFrontsScore(fronts.length),
        sentence: `Cobre mais de uma frente da casa: ${fronts.map((f) => f.skill).join(', ')}.`,
      })
    }

    // Proximidade com a casa encurta o caminho até a mesa (+2 por ponto, máx. +10).
    parts.push({
      points: intimacyScore(person),
      sentence: 'Proximidade com a casa encurta o caminho até a primeira mesa.',
    })

    const score = clampScore(parts.reduce((sum, p) => sum + p.points, 0))
    const rationale = parts
      .slice()
      .sort((p, q) => q.points - p.points)
      .slice(0, 4)
      .map((p) => p.sentence)

    ops.push({
      id: `op-${person.id}-bicofino-${primary.slug}`,
      a: person.id,
      b: null,
      kind: 'com-bicofino',
      score,
      title: primary.title,
      rationale,
      via: fronts.map((f) => f.skill),
    })
  }

  return ops
}

/** Base com-bicofino: frente da casa + disposição já filtrada valem 40. */
function bicofinoBaseScore(): number {
  return 40
}

/** +10 por ponto de disposição acima de 3 (4→10, 5→20). */
function bicofinoDispositionScore(person: Person): number {
  return (person.bicofinoDisposition - 3) * 10
}

/** Frentes extras além da primeira: +8 cada, teto em +16. */
function extraFrontsScore(frontCount: number): number {
  return Math.min(frontCount - 1, 2) * 8
}

/** Intimidade com a casa: +2 por ponto da escala 1–5 (máx. +10). */
function intimacyScore(person: Person): number {
  return person.intimacy * 2
}

/* ── (c) mercado ────────────────────────────────────────────────────── */

function marketOpportunities(sorted: Person[], tagById: Record<string, Tag>): Opportunity[] {
  const ops: Opportunity[] = []

  for (const person of sorted) {
    const skills = skillNamesOf(person, tagById)

    for (const demand of MARKET_DEMANDS) {
      // Primeiro sinal ativo que casa com as keywords do tema — determinístico.
      const signal = matchingSignal(person, demand.keywords)
      if (!signal) continue

      const fitSkills = demand.skills.filter((s) => skills.has(s))
      const parts: { points: number; sentence: string }[] = []

      // Base: existe sinal da pessoa apontando para o tema (30).
      parts.push({ points: marketBaseScore(), sentence: signalSentence(signal) })

      // Temperatura do sinal: capital em movimento > pedido > interesse.
      parts.push({ points: signalHeatScore(signal.type), sentence: demand.demand })

      // A pessoa opera o setor da tese, não só observa (+15).
      if (fitSkills.length > 0) {
        parts.push({
          points: skillFitScore(),
          sentence: `Atua em ${fitSkills.join(' e ')} — posição para operar a tese.`,
        })
      }

      // Disposição alta de mover via casa (+10).
      if (person.bicofinoDisposition >= 4) {
        parts.push({ points: marketDispositionScore(), sentence: 'Disposição alta para mover o tema via casa.' })
      }

      // Alcance de rede amplia o efeito da jogada (+5).
      if (person.networkReach >= 4) {
        parts.push({ points: reachScore(), sentence: 'Alcance de rede amplia o efeito da jogada.' })
      }

      const score = clampScore(parts.reduce((sum, p) => sum + p.points, 0))
      const rationale = parts
        .slice()
        .sort((p, q) => q.points - p.points)
        .slice(0, 4)
        .map((p) => p.sentence)

      ops.push({
        id: `op-${person.id}-mercado-${demand.slug}`,
        a: person.id,
        b: null,
        kind: 'mercado',
        score,
        title: demand.title,
        rationale,
        via: fitSkills.length > 0 ? fitSkills : demand.skills,
      })
    }
  }

  return ops
}

/** Base mercado: sinal ativo apontando para demanda mapeada vale 30. */
function marketBaseScore(): number {
  return 30
}

/** Temperatura do sinal: capital_move +25, ask +20, interesse +12. */
function signalHeatScore(type: SignalType): number {
  if (type === 'capital_move') return 25
  if (type === 'ask') return 20
  if (type === 'interesse') return 12
  return 0
}

/** Skill da pessoa cobre o setor da demanda: +15. */
function skillFitScore(): number {
  return 15
}

/** Disposição >= 4 para mover via casa: +10. */
function marketDispositionScore(): number {
  return 10
}

/** networkReach >= 4 multiplica o alcance da tese: +5. */
function reachScore(): number {
  return 5
}

/* ── Auxiliares compartilhados ──────────────────────────────────────── */

/** Nomes das skills da pessoa, resolvidos via tagById (pessoas carregam ids). */
function skillNamesOf(person: Person, tagById: Record<string, Tag>): Set<string> {
  const names = new Set<string>()
  for (const tagId of person.tags) {
    const tag = tagById[tagId]
    if (tag && tag.kind === 'skill') names.add(tag.name)
  }
  return names
}

/** Nomes de grupos/afiliações compartilhados entre as duas pessoas. */
function sharedGroupOrAffiliation(a: Person, b: Person, tagById: Record<string, Tag>): string[] {
  const bTags = new Set(b.tags)
  const shared: string[] = []
  for (const tagId of a.tags) {
    if (!bTags.has(tagId)) continue
    const tag = tagById[tagId]
    if (tag && (tag.kind === 'grupo' || tag.kind === 'afiliacao')) shared.push(tag.name)
  }
  return shared
}

/**
 * Primeiro sinal ativo (ask/interesse/capital_move) cujo conteúdo,
 * em minúsculas, contém alguma das keywords. Ordem do array = determinismo.
 */
function matchingSignal(person: Person, keywords: string[]): Signal | null {
  for (const signal of person.signals) {
    if (!ACTIVE_SIGNAL_TYPES.has(signal.type)) continue
    const content = signal.content.toLowerCase()
    if (keywords.some((kw) => content.includes(kw))) return signal
  }
  return null
}

/** Frase do rationale para um sinal, datada pelo mês do registro. */
function signalSentence(signal: Signal): string {
  const month = monthFromIso(signal.observedAt)
  const label = SIGNAL_LABEL[signal.type]
  return month
    ? `Sinal de ${label} observado em ${month}.`
    : `Sinal de ${label} registrado na rede.`
}

/** Extrai o mês PT-BR de uma data ISO 'YYYY-MM-DD' sem depender de locale. */
function monthFromIso(iso: string): string | null {
  const monthIndex = Number(iso.slice(5, 7)) - 1
  return MONTHS_PT[monthIndex] ?? null
}

/** Ambos dispostos a mover negócio via casa (escala 1–5, corte em 4). */
function bothDisposed(a: Person, b: Person): boolean {
  return a.bicofinoDisposition >= 4 && b.bicofinoDisposition >= 4
}

/** Score final sempre inteiro entre 0 e 100. */
function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)))
}

/** Chave canônica de par (menor id primeiro) para indexar arestas. */
function pairKey(idA: string, idB: string): string {
  return idA < idB ? `${idA}|${idB}` : `${idB}|${idA}`
}

/** Índice peso-por-par para consulta O(1) durante o matchmaking. */
function buildEdgeWeightIndex(edges: Edge[]): Map<string, number> {
  const index = new Map<string, number>()
  for (const edge of edges) {
    index.set(pairKey(edge.source, edge.target), edge.weight)
  }
  return index
}
