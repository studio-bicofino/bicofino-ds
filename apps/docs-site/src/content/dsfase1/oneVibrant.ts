export const oneVibrantI18n = {
  br: {
    // Section header
    'vibrant.eyebrow': '// 02.3 · Regra 90/10',
    'vibrant.title': 'Um Vibrante',
    'vibrant.lead':
      'Cada composição usa um único destaque cromático — `--current-accent` — limitado a ~10% da superfície. O restante, ~90%, é neutro. Restrição gera sinal; sinal gera luxo.',

    // Rule sub-section
    'vibrant.rule.label': '// A Regra',
    'vibrant.rule.title': 'Um destaque por composição',
    'vibrant.rule.desc':
      'O acento é sorteado a cada reload a partir dos 12 Destaques do sistema — a casa sempre veste uma de suas cores, nunca a mesma duas vezes consecutivas. Qualquer seção pode fixar seu próprio vibrant sobrescrevendo a variável localmente. Mais de um vibrant por composição é exceção, usada apenas sob solicitação explícita.',

    // 90/10 callout
    'vibrant.ratio.neutral': '90%',
    'vibrant.ratio.neutral.label': 'Neutro',
    'vibrant.ratio.neutral.desc': 'Estrutura, tipografia, superfícies — tudo em tons de base',
    'vibrant.ratio.accent': '10%',
    'vibrant.ratio.accent.label': 'Vibrante',
    'vibrant.ratio.accent.desc': 'Um único Destaque marca o que importa',

    // Live demo cards
    'vibrant.demo.label': '// Demonstração ao Vivo',
    'vibrant.demo.title': 'O acento muda a cada refresh',
    'vibrant.demo.desc':
      'As três composições abaixo são idênticas em estrutura. Apenas `--current-accent` difere — demonstrando como um único token reconfigura o registro visual sem alterar hierarquia ou layout.',

    // Demo card fields
    'vibrant.card.stat': '94,2',
    'vibrant.card.tag': 'on pitch',
    'vibrant.card.bar.label': 'participação de mercado',

    'vibrant.card.a.name': 'composição A',
    'vibrant.card.b.name': 'composição B',
    'vibrant.card.c.name': 'composição C',

    // Token callout
    'vibrant.token.label': '// Token Canônico',
    'vibrant.token.title': '--current-accent',
    'vibrant.token.desc':
      'Sorteado por script pré-render em `layout.tsx` a partir dos 12 Destaques. Fallback SSR: coral SPFC. Alias de retrocompatibilidade: `--bf-signal`.',
    'vibrant.token.row.var': 'variável',
    'vibrant.token.row.source': 'fonte',
    'vibrant.token.row.fallback': 'fallback SSR',
    'vibrant.token.row.alias': 'alias',
    'vibrant.token.val.var': '--current-accent',
    'vibrant.token.val.source': 'sorteio dos 12 Destaques por refresh',
    'vibrant.token.val.fallback': 'var(--bf-spfc) · coral #f0535e',
    'vibrant.token.val.alias': '--bf-signal (retrocompat)',

    // Rules list
    'vibrant.rules.label': '// Regras Hard',
    'vibrant.rules.title': 'O que o sistema proíbe',
    'vibrant.rule1': 'Nunca fixar um hex de acento fora do conjunto de Destaques.',
    'vibrant.rule2': 'Nunca usar mais de um vibrant por composição sem solicitação explícita.',
    'vibrant.rule3': 'Nunca usar `--current-accent` como cor decorativa — é sinal, não ornamento.',
    'vibrant.rule4': 'Nunca introduzir gradientes com o acento.',
    'vibrant.rule5': 'O acento não deve ultrapassar ~10% da área total da composição.',

    // Pin example
    'vibrant.pin.label': '// Fixar o Vibrant',
    'vibrant.pin.title': 'Fixação por tema',
    'vibrant.pin.desc':
      'Contextos temáticos (um clube, um parceiro, uma vertical) podem fixar seu próprio vibrant sobrescrevendo `--current-accent` no container pai.',
  },

  en: {
    'vibrant.eyebrow': '// 02.3 · 90/10 Rule',
    'vibrant.title': 'One Vibrant',
    'vibrant.lead':
      'Each composition uses a single chromatic accent — `--current-accent` — capped at ~10% of the surface. The remaining ~90% is neutral. Restraint creates signal; signal creates luxury.',

    'vibrant.rule.label': '// The Rule',
    'vibrant.rule.title': 'One accent per composition',
    'vibrant.rule.desc':
      'The accent is randomly picked on each reload from the 12 system Highlights — the house always wears one of its colors, never the same one twice in a row. Any section can pin its own vibrant by overriding the variable locally. More than one vibrant per composition is an exception, used only upon explicit request.',

    'vibrant.ratio.neutral': '90%',
    'vibrant.ratio.neutral.label': 'Neutral',
    'vibrant.ratio.neutral.desc': 'Structure, typography, surfaces — everything in base tones',
    'vibrant.ratio.accent': '10%',
    'vibrant.ratio.accent.label': 'Vibrant',
    'vibrant.ratio.accent.desc': 'A single Highlight marks what matters',

    'vibrant.demo.label': '// Live Demo',
    'vibrant.demo.title': 'The accent changes every refresh',
    'vibrant.demo.desc':
      'The three compositions below are structurally identical. Only `--current-accent` differs — demonstrating how a single token reconfigures the visual register without altering hierarchy or layout.',

    'vibrant.card.stat': '94.2',
    'vibrant.card.tag': 'on pitch',
    'vibrant.card.bar.label': 'market share',

    'vibrant.card.a.name': 'composition A',
    'vibrant.card.b.name': 'composition B',
    'vibrant.card.c.name': 'composition C',

    'vibrant.token.label': '// Canonical Token',
    'vibrant.token.title': '--current-accent',
    'vibrant.token.desc':
      'Set by a pre-render script in `layout.tsx` picking from 12 Highlights. SSR fallback: SPFC coral. Back-compat alias: `--bf-signal`.',
    'vibrant.token.row.var': 'variable',
    'vibrant.token.row.source': 'source',
    'vibrant.token.row.fallback': 'SSR fallback',
    'vibrant.token.row.alias': 'alias',
    'vibrant.token.val.var': '--current-accent',
    'vibrant.token.val.source': 'randomised from 12 Highlights per refresh',
    'vibrant.token.val.fallback': 'var(--bf-spfc) · coral #f0535e',
    'vibrant.token.val.alias': '--bf-signal (back-compat)',

    'vibrant.rules.label': '// Hard Rules',
    'vibrant.rules.title': 'What the system forbids',
    'vibrant.rule1': 'Never hardcode an accent hex outside the Highlights set.',
    'vibrant.rule2': 'Never use more than one vibrant per composition without explicit request.',
    'vibrant.rule3': 'Never use `--current-accent` as decoration — it is signal, not ornament.',
    'vibrant.rule4': 'Never apply gradients using the accent.',
    'vibrant.rule5': 'The accent must not exceed ~10% of the total composition area.',

    'vibrant.pin.label': '// Pinning the Vibrant',
    'vibrant.pin.title': 'Theme-based pinning',
    'vibrant.pin.desc':
      'Thematic contexts (a club, a partner, a vertical) can pin their own vibrant by overriding `--current-accent` on the parent container.',
  },

  it: {
    'vibrant.eyebrow': '// 02.3 · Regola 90/10',
    'vibrant.title': 'Un Vibrante',
    'vibrant.lead':
      'Ogni composizione usa un unico accento cromatico — `--current-accent` — limitato a ~10% della superficie. Il restante ~90% è neutro. La restrizione crea segnale; il segnale crea lusso.',

    'vibrant.rule.label': '// La Regola',
    'vibrant.rule.title': 'Un accento per composizione',
    'vibrant.rule.desc':
      "L'accento viene estratto ad ogni reload dai 12 Highlights del sistema — la casa indossa sempre uno dei suoi colori, mai lo stesso due volte di seguito. Ogni sezione può fissare il proprio vibrant sovrascrivendo la variabile localmente. Più di un vibrant per composizione è un'eccezione, usata solo su richiesta esplicita.",

    'vibrant.ratio.neutral': '90%',
    'vibrant.ratio.neutral.label': 'Neutro',
    'vibrant.ratio.neutral.desc': 'Struttura, tipografia, superfici — tutto in toni di base',
    'vibrant.ratio.accent': '10%',
    'vibrant.ratio.accent.label': 'Vibrante',
    'vibrant.ratio.accent.desc': 'Un singolo Highlight segna ciò che conta',

    'vibrant.demo.label': '// Demo Live',
    'vibrant.demo.title': "L'accento cambia ad ogni refresh",
    'vibrant.demo.desc':
      'Le tre composizioni qui sotto sono strutturalmente identiche. Solo `--current-accent` differisce — dimostrando come un singolo token riconfigura il registro visivo senza alterare gerarchia o layout.',

    'vibrant.card.stat': '94,2',
    'vibrant.card.tag': 'on pitch',
    'vibrant.card.bar.label': 'quota di mercato',

    'vibrant.card.a.name': 'composizione A',
    'vibrant.card.b.name': 'composizione B',
    'vibrant.card.c.name': 'composizione C',

    'vibrant.token.label': '// Token Canonico',
    'vibrant.token.title': '--current-accent',
    'vibrant.token.desc':
      'Impostato da uno script pre-render in `layout.tsx` che sceglie tra i 12 Highlights. Fallback SSR: corallo SPFC. Alias retrocompat: `--bf-signal`.',
    'vibrant.token.row.var': 'variabile',
    'vibrant.token.row.source': 'fonte',
    'vibrant.token.row.fallback': 'fallback SSR',
    'vibrant.token.row.alias': 'alias',
    'vibrant.token.val.var': '--current-accent',
    'vibrant.token.val.source': 'estratto dai 12 Highlights ad ogni refresh',
    'vibrant.token.val.fallback': 'var(--bf-spfc) · corallo #f0535e',
    'vibrant.token.val.alias': '--bf-signal (retrocompat)',

    'vibrant.rules.label': '// Regole Hard',
    'vibrant.rules.title': 'Cosa il sistema vieta',
    'vibrant.rule1': "Non usare mai un hex di accento fisso fuori dall'insieme degli Highlights.",
    'vibrant.rule2': 'Mai usare più di un vibrant per composizione senza richiesta esplicita.',
    'vibrant.rule3': 'Non usare `--current-accent` come decorazione — è segnale, non ornamento.',
    'vibrant.rule4': "Non applicare mai gradienti usando l'accento.",
    'vibrant.rule5': "L'accento non deve superare ~10% dell'area totale della composizione.",

    'vibrant.pin.label': '// Fissare il Vibrant',
    'vibrant.pin.title': 'Pinning per tema',
    'vibrant.pin.desc':
      'I contesti tematici (un club, un partner, una vertical) possono fissare il proprio vibrant sovrascrivendo `--current-accent` sul contenitore padre.',
  },
} as const
