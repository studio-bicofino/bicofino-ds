export type ExperimentStatus = 'rascunho' | 'aprovado' | 'canonizado'

export type Experiment = {
  slug: string
  index: string
  title: string
  summary: string
  tags: string[]
  libs: string[]
  status: ExperimentStatus
  reference?: string
}

export const EXPERIMENTS: Experiment[] = [
  {
    slug: '01-split-text-reveal',
    index: '01',
    title: 'Split Text Reveal',
    summary:
      'Título editorial revelando por linhas, palavras ou caracteres — o clássico de awwwards aplicado ao display Inter.',
    tags: ['texto', 'entrada'],
    libs: ['gsap', 'SplitText'],
    status: 'rascunho',
    reference: 'grids.obys.agency',
  },
  {
    slug: '02-scroll-pin-chapters',
    index: '02',
    title: 'Scroll Pin — Capítulos',
    summary:
      'Capítulos editoriais pinados com scrub: o scroll vira a timeline. Número mono gigante + título que se monta.',
    tags: ['scroll', 'narrativa'],
    libs: ['gsap', 'ScrollTrigger'],
    status: 'rascunho',
    reference: 'wantedfornothing.com',
  },
  {
    slug: '03-drawsvg-schematic',
    index: '03',
    title: 'DrawSVG — Grafismo Técnico',
    summary:
      'O M-01 ganhando vida: fios, órbitas e ticks se desenhando. "Wires forming" do §8 executado com DrawSVG.',
    tags: ['svg', 'm-01', 'scroll'],
    libs: ['gsap', 'DrawSVG', 'ScrollTrigger'],
    status: 'rascunho',
  },
  {
    slug: '04-scramble-mono',
    index: '04',
    title: 'Scramble — Micro-type Mono',
    summary:
      'Micro-tipo em JetBrains Mono resolvendo caractere a caractere — o "micro-type forming" do organismo vivo.',
    tags: ['texto', 'm-01', 'ambient'],
    libs: ['gsap', 'ScrambleText'],
    status: 'rascunho',
  },
  {
    slug: '05-lenis-smooth',
    index: '05',
    title: 'Lenis — Smooth Scroll + Parallax',
    summary:
      'A inércia "manteiga" dos sites premium: Lenis integrado ao ScrollTrigger, com parallax sutil de blocos editoriais.',
    tags: ['scroll', 'feel'],
    libs: ['lenis', 'gsap', 'ScrollTrigger'],
    status: 'rascunho',
    reference: 'lenis.dev',
  },
  {
    slug: '06-flip-grid',
    index: '06',
    title: 'Flip — Grade com Filtro',
    summary:
      'Cards reorganizando com FLIP ao filtrar por vertical (On Pitch / Off Pitch / Club) — transição de layout real.',
    tags: ['layout', 'interação'],
    libs: ['gsap', 'Flip'],
    status: 'rascunho',
  },
  {
    slug: '07-blur-reveal',
    index: '07',
    title: 'Blur Reveal — Abertura',
    summary:
      'Abertura de site com transparência + blur: o logo e o título chegam desfocados e resolvem em foco, painéis frosted revelam o conteúdo.',
    tags: ['entrada', 'intro', 'blur'],
    libs: ['gsap', 'SplitText'],
    status: 'rascunho',
    reference: 'wantedfornothing.com/vibes',
  },
  {
    slug: '08-gotham-impact',
    index: '08',
    title: 'Gotham Impact — Heavy/Light',
    summary:
      'O bloco de título assinatura: Gotham Black + contracanto Light (KERCHNER / present future) montando em cena, caractere a caractere.',
    tags: ['texto', 'impact', 'gotham'],
    libs: ['gsap', 'SplitText'],
    status: 'rascunho',
  },
  {
    slug: '09-mouse-schematic',
    index: '09',
    title: 'Grafismo Segue-Mouse',
    summary:
      'O M-01 no fundo da tela acompanhando o cursor com inércia — camadas em profundidades diferentes, vivo mas discreto.',
    tags: ['m-01', 'cursor', 'ambient'],
    libs: ['gsap', 'quickTo'],
    status: 'rascunho',
    reference: 'madness.ai',
  },
  {
    slug: '10-card-stack',
    index: '10',
    title: 'Card Stack — Pilha no Scroll',
    summary:
      'Cards empilhando conforme o scroll: cada um desliza por cima do anterior, que recua em escala — o deck se forma diante de você.',
    tags: ['scroll', 'narrativa', 'cards'],
    libs: ['gsap', 'ScrollTrigger'],
    status: 'rascunho',
    reference: 'madness.ai',
  },
  {
    slug: '11-iphone-showcase',
    index: '11',
    title: 'iPhone Showcase — Produção Viva',
    summary:
      'Os Stories da rodada rodando em mockups de iPhone (CSS puro) — catavento girando, cascata surgindo ou esteira infinita, à escolha no tuner.',
    tags: ['showcase', 'video', '3 modos'],
    libs: ['gsap', 'ScrollTrigger'],
    status: 'rascunho',
    reference: 'card-jogos-motion',
  },
  {
    slug: '12-orbital-figure',
    index: '12',
    title: 'Câmera Orbital + Figura 3D',
    summary:
      'A câmera gira sozinha (e ao arrasto) revelando uma figura 3D em wireframe — o gesto-assinatura do Hubtown trazido pro nosso WebGL: forma técnica, um único nó vibrante.',
    tags: ['3d', 'webgl', 'câmera'],
    libs: ['three', 'OrbitControls'],
    status: 'rascunho',
    reference: 'hubtown.co.in',
  },
  {
    slug: '13-dolly-zoom',
    index: '13',
    title: 'Dolly — Aproximação no Scroll',
    summary:
      'Um corredor de anéis recuando no -Z; o scroll dá dolly na câmera pra dentro da profundidade, com névoa e dolly-zoom (vertigo) opcional. A "aproximação" do Hubtown.',
    tags: ['3d', 'scroll', 'zoom'],
    libs: ['three', 'gsap', 'ScrollTrigger'],
    status: 'rascunho',
    reference: 'hubtown.co.in',
  },
  {
    slug: '14-particle-field',
    index: '14',
    title: 'Campo de Partículas',
    summary:
      'Milhares de partículas à deriva lenta em 3D, respondendo ao mouse com inércia — poeira que respira. O organismo M-01 virando campo de pontos WebGL.',
    tags: ['3d', 'webgl', 'partículas', 'ambient'],
    libs: ['three', 'Points'],
    status: 'rascunho',
    reference: 'hubtown.co.in',
  },
  {
    slug: '15-depth-parallax',
    index: '15',
    title: 'Parallax de Profundidade 3D',
    summary:
      'Paralaxe de câmera de verdade: camadas de grafismo técnico em profundidades reais (Z), cada uma se movendo no seu ritmo pela perspectiva. O irmão 3D do EXP-09.',
    tags: ['3d', 'cursor', 'parallax'],
    libs: ['three'],
    status: 'rascunho',
    reference: 'hubtown.co.in',
  },
  {
    slug: '16-cinematic-entry',
    index: '16',
    title: 'Entrada Cinematográfica',
    summary:
      'O contador 000%→100% que carrega e então revela a cena com um movimento de câmera — a entrada-assinatura do Hubtown ("ready to explore"), replayável pelo tuner.',
    tags: ['3d', 'entrada', 'loader'],
    libs: ['three', 'gsap'],
    status: 'rascunho',
    reference: 'hubtown.co.in',
  },
]

export function getExperiment(slug: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.slug === slug)
}
