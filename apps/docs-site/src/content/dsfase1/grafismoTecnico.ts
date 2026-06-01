/**
 * Grafismo Técnico — M-01
 * i18n strings for GrafismoTecnico.tsx
 * Keys are flat with the `grafismo.` prefix.
 * BR is authoritative; EN and IT are full parity translations.
 */

export const grafismoTecnicoI18n = {
  br: {
    'grafismo.eyebrow':           'Visual System — M-01',
    'grafismo.title':             'Grafismo Técnico',
    'grafismo.lead':              'Mono + fio + ✦ instrumentação. Movimento ambiente no nível de fundo — nós pulsando, fios se desenhando, números se formando, fileiras se movendo como um formigueiro. Loops longos e desincronizados; nunca rouba a cena. Para sob prefers-reduced-motion.',

    'grafismo.sub.anatomy.label': 'Anatomia',
    'grafismo.sub.anatomy.title': 'Componentes do sistema',

    'grafismo.anatomy.desc':      'O grafismo técnico é composto por quatro elementos sobrepostos: órbita vetorial (anéis + nós), grade de unidades (células pulsantes), contadores de dígito (números em formação) e etiquetas de especificação em mono. Cada elemento opera em loop independente para garantir que o campo nunca pulse em uníssono.',

    'grafismo.orbit.label':       'ÓRBITA',
    'grafismo.orbit.title':       'Anéis e nós',
    'grafismo.orbit.desc':        'Três anéis concêntricos se desenham usando stroke-dashoffset com comprimentos e delays distintos. Os nós pulsam em escala e opacidade em ciclos de 3–5 s. O nó principal (hot) carrega --current-accent; os demais usam o tom de platina.',

    'grafismo.counters.label':    'CONTADORES',
    'grafismo.counters.title':    'Micro-tipo em formação',
    'grafismo.counters.desc':     'Tiras de dígitos animadas por bf-digit-roll rolam em steps(1), simulando dados ao vivo. Cada tira usa um delay diferente para dessincronizar. O tempo de ciclo é 6–7 s — abaixo do limiar de atenção consciente.',

    'grafismo.units.label':       'GRADE DE UNIDADES',
    'grafismo.units.title':       'O formigueiro',
    'grafismo.units.desc':        'Grade 20 × 2 de células quadradas. Cada célula anima bf-ant em opacidade 0.25 → 0.95 com delays distribuídos. Células "hot" portam --current-accent com intensidade máxima. O conjunto cria a sensação de atividade constante e baixa amplitude.',

    'grafismo.specs.label':       'ESPECIFICAÇÕES',
    'grafismo.demo.label':        'DEMONSTRAÇÃO AO VIVO',
    'grafismo.demo.title':        'Living organism',
    'grafismo.demo.tag1':         'ON FIELD // DOSSIÊ',
    'grafismo.demo.tag2':         '[ TX2 ] · 2025',
    'grafismo.demo.idx.label':    'ÍNDICE',
    'grafismo.demo.spd.label':    'VELOCIDADE',
    'grafismo.demo.spd.unit':     'km/h',
    'grafismo.demo.height.label': 'ALTURA',
    'grafismo.demo.height.val':   '1,78 m',
    'grafismo.demo.foot.label':   'PÉ',
    'grafismo.demo.foot.val':     'DESTRO',
    'grafismo.demo.pass.label':   'PASSAPORTE',
    'grafismo.demo.pass.val':     'IT · BR',

    'grafismo.rules.label':       'REGRAS DE USO',
    'grafismo.rules.title':       'Princípios do movimento ambiente',
    'grafismo.rule1.title':       'Amplitude pequena',
    'grafismo.rule1.desc':        'Opacidade 0.2 → 1, translate ≤ 3 px, scale ≤ 3%. O campo se move; não dança.',
    'grafismo.rule2.title':       'Loops longos e desincronizados',
    'grafismo.rule2.desc':        '--dur-ambient ≈ 6 s; cada elemento tem seu próprio delay. O campo nunca pulsa em uníssono.',
    'grafismo.rule3.title':       'Stops no prefers-reduced-motion',
    'grafismo.rule3.desc':        'Toda animação para. O esquemático permanece legível como still. Os keyframes paradores já estão em globals.css.',
    'grafismo.rule4.title':       'Restrito ao .bf-schematic',
    'grafismo.rule4.desc':        'Os keyframes bf-orbit-draw / bf-node-pulse / bf-ant / bf-digit-roll são definidos globalmente mas ativados apenas dentro de .bf-schematic. UI e tipografia editorial ficam calmos.',

    'grafismo.note':              'amplitude pequena · loops longos & desincronizados · nunca rouba a cena',
  },

  en: {
    'grafismo.eyebrow':           'Visual System — M-01',
    'grafismo.title':             'Technical Schematic',
    'grafismo.lead':              'Mono + wire + ✦ instrumentation. Ambient motion at background level — pulsing nodes, wires drawing, numbers forming, rows shifting like an anthill. Long and desynchronised loops; never steals the scene. Stops under prefers-reduced-motion.',

    'grafismo.sub.anatomy.label': 'Anatomy',
    'grafismo.sub.anatomy.title': 'System components',

    'grafismo.anatomy.desc':      'The technical schematic is built from four layered elements: vector orbit (rings + nodes), unit grid (pulsing cells), digit counters (numbers forming), and mono spec-tags. Each element runs on an independent loop so the field never pulses in unison.',

    'grafismo.orbit.label':       'ORBIT',
    'grafismo.orbit.title':       'Rings and nodes',
    'grafismo.orbit.desc':        'Three concentric rings draw themselves using stroke-dashoffset with distinct lengths and delays. Nodes pulse in scale and opacity on 3–5 s cycles. The primary node (hot) carries --current-accent; the rest use the platinum tone.',

    'grafismo.counters.label':    'COUNTERS',
    'grafismo.counters.title':    'Micro-type forming',
    'grafismo.counters.desc':     'Digit strips animated by bf-digit-roll scroll in steps(1), simulating live data. Each strip uses a different delay for desynchronisation. Cycle time is 6–7 s — below the threshold of conscious attention.',

    'grafismo.units.label':       'UNIT GRID',
    'grafismo.units.title':       'The anthill',
    'grafismo.units.desc':        'A 20 × 2 grid of square cells. Each cell animates bf-ant in opacity 0.25 → 0.95 with distributed delays. "Hot" cells carry --current-accent at full intensity. The overall effect creates a sense of constant, low-amplitude activity.',

    'grafismo.specs.label':       'SPECIFICATIONS',
    'grafismo.demo.label':        'LIVE DEMO',
    'grafismo.demo.title':        'Living organism',
    'grafismo.demo.tag1':         'ON FIELD // DOSSIER',
    'grafismo.demo.tag2':         '[ TX2 ] · 2025',
    'grafismo.demo.idx.label':    'INDEX',
    'grafismo.demo.spd.label':    'SPEED',
    'grafismo.demo.spd.unit':     'km/h',
    'grafismo.demo.height.label': 'HEIGHT',
    'grafismo.demo.height.val':   '1.78 m',
    'grafismo.demo.foot.label':   'FOOT',
    'grafismo.demo.foot.val':     'RIGHT',
    'grafismo.demo.pass.label':   'PASSPORT',
    'grafismo.demo.pass.val':     'IT · BR',

    'grafismo.rules.label':       'USAGE RULES',
    'grafismo.rules.title':       'Ambient motion principles',
    'grafismo.rule1.title':       'Small amplitude',
    'grafismo.rule1.desc':        'Opacity 0.2 → 1, translate ≤ 3 px, scale ≤ 3%. The field moves; it does not dance.',
    'grafismo.rule2.title':       'Long and desynchronised loops',
    'grafismo.rule2.desc':        '--dur-ambient ≈ 6 s; each element has its own delay. The field never pulses in unison.',
    'grafismo.rule3.title':       'Stops on prefers-reduced-motion',
    'grafismo.rule3.desc':        'All animation stops. The schematic remains readable as a still. The stopping keyframes are already in globals.css.',
    'grafismo.rule4.title':       'Scoped to .bf-schematic',
    'grafismo.rule4.desc':        'The keyframes bf-orbit-draw / bf-node-pulse / bf-ant / bf-digit-roll are defined globally but activated only inside .bf-schematic. UI and editorial type remain calm.',

    'grafismo.note':              'small amplitude · long & desynchronised loops · never steals the scene',
  },

  it: {
    'grafismo.eyebrow':           'Visual System — M-01',
    'grafismo.title':             'Grafismo Tecnico',
    'grafismo.lead':              'Mono + filo + ✦ strumentazione. Movimento ambientale a livello di sfondo — nodi pulsanti, fili che si disegnano, numeri che si formano, file che scorrono come un formicaio. Loop lunghi e desincronizzati; non ruba mai la scena. Si ferma con prefers-reduced-motion.',

    'grafismo.sub.anatomy.label': 'Anatomia',
    'grafismo.sub.anatomy.title': 'Componenti del sistema',

    'grafismo.anatomy.desc':      'Il grafismo tecnico è composto da quattro elementi sovrapposti: orbita vettoriale (anelli + nodi), griglia di unità (celle pulsanti), contatori di cifre (numeri in formazione) ed etichette mono. Ogni elemento opera su un loop indipendente così che il campo non pulsi mai all\'unisono.',

    'grafismo.orbit.label':       'ORBITA',
    'grafismo.orbit.title':       'Anelli e nodi',
    'grafismo.orbit.desc':        'Tre anelli concentrici si disegnano usando stroke-dashoffset con lunghezze e delay distinti. I nodi pulsano in scala e opacità con cicli da 3–5 s. Il nodo principale (hot) porta --current-accent; gli altri usano il tono platino.',

    'grafismo.counters.label':    'CONTATORI',
    'grafismo.counters.title':    'Micro-tipo in formazione',
    'grafismo.counters.desc':     'Strisce di cifre animate da bf-digit-roll scorrono in steps(1), simulando dati in tempo reale. Ogni striscia ha un delay diverso per la desincronizzazione. Il tempo di ciclo è 6–7 s — sotto la soglia dell\'attenzione cosciente.',

    'grafismo.units.label':       'GRIGLIA UNITÀ',
    'grafismo.units.title':       'Il formicaio',
    'grafismo.units.desc':        'Una griglia 20 × 2 di celle quadrate. Ogni cella anima bf-ant in opacità 0.25 → 0.95 con delay distribuiti. Le celle "hot" portano --current-accent all\'intensità massima. L\'insieme crea la sensazione di attività costante e bassa ampiezza.',

    'grafismo.specs.label':       'SPECIFICHE',
    'grafismo.demo.label':        'DEMO DAL VIVO',
    'grafismo.demo.title':        'Organismo vivente',
    'grafismo.demo.tag1':         'ON FIELD // DOSSIER',
    'grafismo.demo.tag2':         '[ TX2 ] · 2025',
    'grafismo.demo.idx.label':    'INDICE',
    'grafismo.demo.spd.label':    'VELOCITÀ',
    'grafismo.demo.spd.unit':     'km/h',
    'grafismo.demo.height.label': 'ALTEZZA',
    'grafismo.demo.height.val':   '1,78 m',
    'grafismo.demo.foot.label':   'PIEDE',
    'grafismo.demo.foot.val':     'DESTRO',
    'grafismo.demo.pass.label':   'PASSAPORTO',
    'grafismo.demo.pass.val':     'IT · BR',

    'grafismo.rules.label':       'REGOLE DI UTILIZZO',
    'grafismo.rules.title':       'Principi del movimento ambientale',
    'grafismo.rule1.title':       'Ampiezza ridotta',
    'grafismo.rule1.desc':        'Opacità 0.2 → 1, translate ≤ 3 px, scale ≤ 3%. Il campo si muove; non danza.',
    'grafismo.rule2.title':       'Loop lunghi e desincronizzati',
    'grafismo.rule2.desc':        '--dur-ambient ≈ 6 s; ogni elemento ha il proprio delay. Il campo non pulsa mai all\'unisono.',
    'grafismo.rule3.title':       'Si ferma con prefers-reduced-motion',
    'grafismo.rule3.desc':        'Tutte le animazioni si fermano. Lo schema rimane leggibile come immagine statica. I keyframe di stop sono già in globals.css.',
    'grafismo.rule4.title':       'Limitato a .bf-schematic',
    'grafismo.rule4.desc':        'I keyframe bf-orbit-draw / bf-node-pulse / bf-ant / bf-digit-roll sono definiti globalmente ma attivati solo dentro .bf-schematic. UI e tipografia editoriale rimangono calme.',

    'grafismo.note':              'ampiezza ridotta · loop lunghi & desincronizzati · non ruba mai la scena',
  },
} as const
