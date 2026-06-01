/**
 * BentoData — M-05 i18n
 * All keys prefixed `bento.`
 * BR is authoritative; EN and IT are full-parity translations.
 */

export const bentoDataI18n = {
  br: {
    // ── Section header ──────────────────────────────────────────────────────
    'bento.eyebrow':        '// 04.5 · Componentes',
    'bento.title':          'Bento de Dados',
    'bento.lead':           'Chassi modular de dashboard: células variadas em tamanho, separação por hairline e agrupamento em pill. Noventa por cento em tom único, um vibrant demarcando o que importa. A grelha lê os tokens de corner do container — sharp ou soft, conforme o contexto.',

    // ── Anatomy sub-section ──────────────────────────────────────────────────
    'bento.anatomy.label':  '// anatomia',
    'bento.anatomy.title':  'Leitura em Grelha',
    'bento.anatomy.desc':   'Cada célula é uma unidade de informação autônoma: label mono em topo, valor em destaque, unidade em subtle. O conjunto lê como um bloco — variedade de tamanho cria hierarquia sem necessidade de cor adicional.',

    // ── Cell labels ──────────────────────────────────────────────────────────
    'bento.cell.atleta':    'atleta',
    'bento.cell.indice':    'índice',
    'bento.cell.onfield':   'on pitch',
    'bento.cell.dossie':    'dossiê',
    'bento.cell.velocidade':'velocidade',
    'bento.cell.passe':     'passe',
    'bento.cell.temporada': 'temporada · forma',
    'bento.cell.jogos':     'jogos',

    // ── Anatomy rules ────────────────────────────────────────────────────────
    'bento.rule1.label':    '// hairline',
    'bento.rule1.desc':     'Separação funcional via 1px border. Sem sombra, sem gradiente.',

    'bento.rule2.label':    '// vibrant · 1',
    'bento.rule2.desc':     'Um único `--current-accent` por composição — em pill ativa ou célula de destaque.',

    'bento.rule3.label':    '// corner language',
    'bento.rule3.desc':     'Células herdam `--bf-corner-*` do container. Sharp ou soft, conforme o tema.',

    // ── KPI cluster sub-section ──────────────────────────────────────────────
    'bento.kpi.label':      '// cluster de kpi',
    'bento.kpi.title':      'Cluster de KPI',
    'bento.kpi.desc':       'Quatro colunas em dois registros: ícone + número + label. A célula accent encerra a primeira linha, puxando o olhar. Segunda linha escala métricas de contexto.',

    // ── KPI cell labels ──────────────────────────────────────────────────────
    'bento.kpi.minutos':    'minutos em campo',
    'bento.kpi.gols':       'gols na temporada',
    'bento.kpi.assistencias':'assistências',
    'bento.kpi.nota':       'nota geral',
    'bento.kpi.distancia':  'distância total',
    'bento.kpi.sprints':    'sprints realizados',
    'bento.kpi.clubes':     'clubes',
    'bento.kpi.temporadas': 'temporadas',

    // ── KPI footer note ──────────────────────────────────────────────────────
    'bento.kpi.nota.label': '// nota de rodapé',
    'bento.kpi.nota.desc':  'Dados fictícios para fins de demonstração do padrão visual. Em produção, células recebem dados reais via prop — a estrutura visual permanece idêntica.',

    // ── Tokens strip ─────────────────────────────────────────────────────────
    'bento.tokens.label':   '// tokens utilizados',
    'bento.tokens.pattern': '// padrão de composição',
    'bento.tokens.desc':    '90% neutro (surface, border, text-secondary) + 10% vibrant (current-accent em pill ativa ou célula de destaque). Corners lidos via --bf-corner-* — o container decide o idioma.',
  },

  en: {
    // ── Section header ──────────────────────────────────────────────────────
    'bento.eyebrow':        '// 04.5 · Components',
    'bento.title':          'Data Bento',
    'bento.lead':           'Modular dashboard chassis: varied-size cells, hairline separation, pill grouping. Ninety percent in a single tone, one vibrant marking what matters. The grid reads the container\'s corner tokens — sharp or soft, depending on context.',

    // ── Anatomy sub-section ──────────────────────────────────────────────────
    'bento.anatomy.label':  '// anatomy',
    'bento.anatomy.title':  'Grid Reading',
    'bento.anatomy.desc':   'Each cell is a self-contained unit of information: mono label at top, value in prominence, unit in subtle. Together they read as a block — size variety creates hierarchy without additional color.',

    // ── Cell labels ──────────────────────────────────────────────────────────
    'bento.cell.atleta':    'athlete',
    'bento.cell.indice':    'index',
    'bento.cell.onfield':   'on pitch',
    'bento.cell.dossie':    'dossier',
    'bento.cell.velocidade':'speed',
    'bento.cell.passe':     'passing',
    'bento.cell.temporada': 'season · form',
    'bento.cell.jogos':     'matches',

    // ── Anatomy rules ────────────────────────────────────────────────────────
    'bento.rule1.label':    '// hairline',
    'bento.rule1.desc':     'Functional separation via 1px border. No shadow, no gradient.',

    'bento.rule2.label':    '// vibrant · 1',
    'bento.rule2.desc':     'A single `--current-accent` per composition — on active pill or highlight cell.',

    'bento.rule3.label':    '// corner language',
    'bento.rule3.desc':     'Cells inherit `--bf-corner-*` from the container. Sharp or soft, per theme.',

    // ── KPI cluster sub-section ──────────────────────────────────────────────
    'bento.kpi.label':      '// kpi cluster',
    'bento.kpi.title':      'KPI Cluster',
    'bento.kpi.desc':       'Four columns in two registers: icon + number + label. The accent cell closes the first row, drawing the eye. Second row scales contextual metrics.',

    // ── KPI cell labels ──────────────────────────────────────────────────────
    'bento.kpi.minutos':    'minutes on pitch',
    'bento.kpi.gols':       'season goals',
    'bento.kpi.assistencias':'assists',
    'bento.kpi.nota':       'overall rating',
    'bento.kpi.distancia':  'total distance',
    'bento.kpi.sprints':    'sprints logged',
    'bento.kpi.clubes':     'clubs',
    'bento.kpi.temporadas': 'seasons',

    // ── KPI footer note ──────────────────────────────────────────────────────
    'bento.kpi.nota.label': '// footnote',
    'bento.kpi.nota.desc':  'Fictitious data for visual pattern demonstration. In production, cells receive real data via prop — the visual structure remains identical.',

    // ── Tokens strip ─────────────────────────────────────────────────────────
    'bento.tokens.label':   '// tokens used',
    'bento.tokens.pattern': '// composition pattern',
    'bento.tokens.desc':    '90% neutral (surface, border, text-secondary) + 10% vibrant (current-accent on active pill or highlight cell). Corners read via --bf-corner-* — the container decides the language.',
  },

  it: {
    // ── Section header ──────────────────────────────────────────────────────
    'bento.eyebrow':        '// 04.5 · Componenti',
    'bento.title':          'Bento di Dati',
    'bento.lead':           'Chassis modulare per dashboard: celle di dimensione variabile, separazione hairline e raggruppamento in pill. Novanta per cento in un solo tono, un vibrant che segna ciò che conta. La griglia legge i token di corner del container — sharp o soft, secondo il contesto.',

    // ── Anatomy sub-section ──────────────────────────────────────────────────
    'bento.anatomy.label':  '// anatomia',
    'bento.anatomy.title':  'Lettura a Griglia',
    'bento.anatomy.desc':   'Ogni cella è un\'unità informativa autonoma: label mono in alto, valore in rilievo, unità in subtle. L\'insieme si legge come un blocco — la varietà di dimensione crea gerarchia senza colore aggiuntivo.',

    // ── Cell labels ──────────────────────────────────────────────────────────
    'bento.cell.atleta':    'atleta',
    'bento.cell.indice':    'indice',
    'bento.cell.onfield':   'on pitch',
    'bento.cell.dossie':    'dossier',
    'bento.cell.velocidade':'velocità',
    'bento.cell.passe':     'passaggio',
    'bento.cell.temporada': 'stagione · forma',
    'bento.cell.jogos':     'partite',

    // ── Anatomy rules ────────────────────────────────────────────────────────
    'bento.rule1.label':    '// hairline',
    'bento.rule1.desc':     'Separazione funzionale tramite bordo 1px. Nessuna ombra, nessun gradiente.',

    'bento.rule2.label':    '// vibrant · 1',
    'bento.rule2.desc':     'Un solo `--current-accent` per composizione — su pill attiva o cella in evidenza.',

    'bento.rule3.label':    '// corner language',
    'bento.rule3.desc':     'Le celle ereditano `--bf-corner-*` dal container. Sharp o soft, secondo il tema.',

    // ── KPI cluster sub-section ──────────────────────────────────────────────
    'bento.kpi.label':      '// cluster kpi',
    'bento.kpi.title':      'Cluster KPI',
    'bento.kpi.desc':       'Quattro colonne su due registri: icona + numero + label. La cella accent chiude la prima riga, attirando lo sguardo. La seconda riga scala le metriche di contesto.',

    // ── KPI cell labels ──────────────────────────────────────────────────────
    'bento.kpi.minutos':    'minuti in campo',
    'bento.kpi.gols':       'gol in stagione',
    'bento.kpi.assistencias':'assist',
    'bento.kpi.nota':       'valutazione complessiva',
    'bento.kpi.distancia':  'distanza totale',
    'bento.kpi.sprints':    'sprint effettuati',
    'bento.kpi.clubes':     'club',
    'bento.kpi.temporadas': 'stagioni',

    // ── KPI footer note ──────────────────────────────────────────────────────
    'bento.kpi.nota.label': '// nota a piè di pagina',
    'bento.kpi.nota.desc':  'Dati fittizi a scopo dimostrativo del pattern visivo. In produzione, le celle ricevono dati reali tramite prop — la struttura visiva rimane identica.',

    // ── Tokens strip ─────────────────────────────────────────────────────────
    'bento.tokens.label':   '// token utilizzati',
    'bento.tokens.pattern': '// pattern di composizione',
    'bento.tokens.desc':    '90% neutro (surface, border, text-secondary) + 10% vibrant (current-accent su pill attiva o cella in evidenza). Corner letti via --bf-corner-* — il container decide il linguaggio.',
  },
} as const
