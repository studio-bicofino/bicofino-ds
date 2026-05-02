'use client'

import React from 'react'
import { BicofinoLogo } from '@/components/BicofinoLogo'

const C = {
  black:      '#2a2c2b',
  powerBlack: '#061015',
  bg:         '#f2f8ff',
  white:      '#ffffff',
  steel:      '#6d7886',
  aluminium:  '#e2eaf2',
  platinum:   '#a8c9e5',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid rgba(42,44,43,0.08)'
const H_PAD = 72
const MAX_W = 720

/* ─── Atoms ─── */

function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' as const }}>
      {children}
    </p>
  )
}

function BsHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ padding: `80px ${H_PAD}px 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance" style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
        {title}
      </h2>
      {sub && <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 600, fontFamily: sans }}>{sub}</p>}
    </div>
  )
}

function BsSub({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ padding: `56px ${H_PAD}px 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h2 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h2>
    </div>
  )
}

function H3({ children }: { children: string }) {
  return (
    <h3 className="text-balance" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: C.black, margin: '36px 0 14px', lineHeight: 1.2, fontFamily: sans }}>
      {children}
    </h3>
  )
}

function P({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.75, color: muted ? C.steel : C.black, margin: '0 0 20px', fontFamily: sans, maxWidth: MAX_W }}>
      {children}
    </p>
  )
}

function GuardRail({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, margin: '12px 0 0', fontFamily: sans, borderLeft: `2px solid ${C.aluminium}`, paddingLeft: 16 }}>
      <strong style={{ color: C.black, fontWeight: 700 }}>Guard rail:</strong> {children}
    </p>
  )
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ margin: '12px 0 20px', paddingLeft: 20, display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, lineHeight: 1.65, color: C.black, fontFamily: sans }}>{item}</li>
      ))}
    </ul>
  )
}

function Arrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, color: C.steel, margin: '8px 0 24px', fontFamily: sans, lineHeight: 1.65, paddingLeft: 16, borderLeft: `2px solid ${C.aluminium}` }}>
      {'→ '}<em>{children}</em>
    </p>
  )
}

function AccordionItem({ title, children, compact = false }: {
  title: React.ReactNode
  children: React.ReactNode
  compact?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const [hover, setHover] = React.useState(false)
  return (
    <div style={{ borderTop: hairline }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', padding: compact ? `14px ${H_PAD}px` : `20px ${H_PAD}px`,
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left' as const,
        }}
      >
        <span style={{
          display: 'inline-block',
          fontSize: compact ? 14 : 20,
          fontWeight: 700,
          letterSpacing: compact ? '-0.01em' : '-0.015em',
          color: hover ? C.steel : C.black,
          lineHeight: 1.2,
          fontFamily: sans,
          transform: hover ? 'translateX(6px)' : 'translateX(0)',
          transition: 'all 250ms ease-out',
        }}>
          {title}
        </span>
        <span style={{ 
          fontFamily: mono, fontSize: 13, 
          color: hover ? C.black : C.steel, 
          flexShrink: 0, marginLeft: 24,
          transform: hover ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 250ms ease-out',
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows 300ms ease-out',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: `4px ${H_PAD}px 28px` }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function BsFooter() {
  return (
    <div style={{ padding: `32px ${H_PAD}px 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        Brand System — Bicofino Group SA · v3.0 · São Paulo, BR · Maio 2026
      </p>
    </div>
  )
}

function TableHeader({ cols }: { cols: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols.map(() => '1fr').join(' '), padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.16)' }}>
      {cols.map(h => (
        <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
      ))}
    </div>
  )
}

function TableRow({ cells, cols }: { cells: string[]; cols: number }) {
  const template = Array(cols).fill('1fr').join(' ')
  return (
    <div style={{ display: 'grid', gridTemplateColumns: template, padding: '14px 0', borderBottom: hairline, alignItems: 'start', gap: 16 }}>
      {cells.map((cell, i) => (
        <span key={i} style={{ fontSize: 13, color: i === 0 ? C.black : C.steel, fontFamily: sans, lineHeight: 1.5, fontWeight: i === 0 ? 600 : 400 }}>{cell}</span>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   COVER — id: brand-system
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandSystemCover() {
  return (
    <section id="brand-system">
      <div style={{ padding: `80px ${H_PAD}px 72px`, borderBottom: hairline }}>
        <Eyebrow>// 00 · Brand System</Eyebrow>
        <h1 className="text-balance" style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 24px', lineHeight: 1.0, fontFamily: sans }}>
          Brand System
        </h1>
        <div style={{ marginBottom: 32 }}>
          <BicofinoLogo color={C.black} width={200} />
        </div>
        <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.black, margin: '0 0 20px', fontWeight: 600, textTransform: 'uppercase' }}>
          O sistema vivo que organiza, protege e expande o universo Bicofino.
        </p>
        <p style={{ fontFamily: mono, fontSize: 11, color: C.platinum, margin: 0, letterSpacing: '0.08em' }}>
          v3.0 · São Paulo, BR · Maio 2026
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ÍNDICE — id: brand-indice
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandIndice() {
  const groups = [
    { title: 'Fundamentos',      items: ['Overview', 'A Origem do Nome', 'Por que existimos', 'Princípios', 'Cuidados e Riscos'] },
    { title: 'Posicionamento',   items: ['Público-chave', 'Buyer Personas', 'Posicionamento de Marca', 'Internacionalidade'] },
    { title: 'Núcleo da Marca',  items: ['Direção', 'Visão e Propósito', 'Os 4 Cs — O Filtro de Toda Decisão', 'Arquétipos', 'Craft', 'Proxies e Personas'] },
    { title: 'Universo Verbal',  items: ['Manifesto', 'Tom de Voz', 'Vocabulário', 'Território de Palavras', 'Glossário'] },
  ]

  return (
    <section id="brand-indice">
      <BsHeader eyebrow="// 00.1" title="Índice" />
      <div style={{ padding: `0 ${H_PAD}px 64px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px 80px' }}>
          {groups.map(({ title, items }) => (
            <div key={title}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: '0 0 16px', fontFamily: sans, letterSpacing: '-0.01em' }}>
                {title}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {items.map((item) => (
                  <li key={item} style={{ fontSize: 13, lineHeight: 1.5, color: C.black, fontFamily: mono, display: 'flex', gap: 10 }}>
                    <span style={{ color: C.aluminium, flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: sans, fontSize: 13, color: C.steel, margin: '56px 0 0', fontStyle: 'italic' }}>
          Universo Visual, Visual System e Operações — ver documento complementar.
        </p>
      </div>
      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FUNDAMENTOS — id: brand-fundamentos
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandFundamentos() {
  return (
    <section id="brand-fundamentos">
      <BsHeader eyebrow="// 00.2 · Fundamentos" title="Fundamentos" />

      {/* Overview */}
      <BsSub label="// Overview" title="Unlike Any Other." />
      <div style={{ padding: `0 ${H_PAD}px 24px` }}>
        <P>Você está prestes a entrar num sistema que não foi feito para todos. Este documento é o código operacional do Bicofino — a referência interna que governa como essa marca pensa, decide, se expressa e existe no mundo. Ele reúne, num único lugar, tudo o que define o universo Bicofino: dos princípios filosóficos aos critérios visuais, do manifesto à forma de atender o telefone.</P>
        <P>Este sistema existe para garantir três coisas fundamentais:</P>
        <div style={{ margin: '0 0 0', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>Clareza</strong> — todos entendem o que o Bicofino representa.</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>Consistência</strong> — a identidade se mantém coerente em qualquer contexto.</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>Evolução</strong> — o sistema pode crescer sem perder sua essência.</p>
        </div>
      </div>
      <AccordionItem title="Para quem este sistema existe">
        <P>Designers, produtores de conteúdo, redatores, parceiros de produção, colaboradores de qualquer vertente e qualquer marca ou pessoa que atue sob o guarda-chuva Bicofino. Se você cria algo em nome do Bicofino, este documento é seu ponto de partida obrigatório.</P>
      </AccordionItem>
      <AccordionItem title="Um sistema vivo">
        <P>Este Brand System não é estático. O Bicofino cresce, e este documento cresce junto. Cada atualização representa um refinamento do entendimento sobre o que significa operar no mais alto nível — com beleza, inteligência e obsessão por detalhes.</P>
      </AccordionItem>

      {/* A Origem do Nome */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// A Origem do Nome" title="Bico. Fino." />
        <div style={{ padding: `0 ${H_PAD}px 56px` }}>
          <P>Imagine um funil. Agora imagine que o bico desse funil é tão estreito que só atravessa o que realmente merece atravessar. Cada parceiro, cada cliente, cada projeto entra pelo topo — e só chega ao outro lado quem passou pelo critério. Não existe atalho, não existe exceção. A saída também é estreita: relações aqui são construídas para durar.</P>
          <P>Esse é o primeiro sentido do nome. Curadoria máxima na entrada. Profundidade máxima na relação.</P>
          <P>Há um segundo sentido, mais sutil, que vive dentro do universo do futebol — e diz muito sobre como o Bicofino pensa excelência.</P>
          <P>Chutar de bico é, em geral, o gesto de quem ainda está aprendendo. Desajeitado. Previsível. Pouca força, menos controle. Mas observe o que acontece quando o mesmo movimento passa pelas chuteiras de um Ronaldo, de um Romário. O bico vira arma. Sai antes que o goleiro processe. Surpreende porque o movimento não é o esperado. Aquilo que parecia limitação se transforma, nas mãos certas, em elegância e precisão cirúrgica.</P>
          <P>O nome carrega os dois lados com igual peso:</P>
          <div style={{ margin: '0 0 20px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>O filtro</strong> — rigor e critério máximo em tudo que entra no raio de ação do Bicofino.</p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>A execução</strong> — talento e precisão que transformam o simples no singular.</p>
          </div>
        </div>
      </div>

      {/* Por que existimos */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Por que existimos" title="A pergunta que não faz concessão" />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>O mercado está cheio de agências, agenciamentos, studios e consultorias. A maioria promete resultado. Muitas entregam produto. Poucas constroem algo que dura.</P>
          <P>O Bicofino existe porque acredita que a combinação de acesso genuíno, critério estético radical e inteligência estratégica aplicada é escassa. Escassa não pela falta de gente capaz — mas porque a maioria das operações comerciais escolhe volume, velocidade e padronização em vez de profundidade, curadoria e singularidade.</P>
          <P>A pergunta que fundou o Bicofino foi simples: o que acontece quando você aplica os padrões de uma maison de luxo a um ecossistema de conexões, talentos e criatividade?</P>
          <P>A resposta é o que você está lendo agora.</P>
        </div>
        <AccordionItem title="O que o Bicofino faz de forma diferente">
          <P>O Bicofino faz a curadoria do mercado — escolhe os players certos, os projetos certos, os momentos certos. A seletividade é a ferramenta. O tempo de relação é o ativo. A confiança é o produto mais valioso entregue.</P>
          <P>Operamos num ponto de interseção raro: onde o mundo do esporte encontra o luxo, onde a estratégia encontra a estética, onde o acesso encontra o bom gosto. Esse cruzamento foi construído com décadas de trabalho consistente, negociações limpas e relacionamentos genuínos — e é o que nos posiciona diferente de qualquer outra coisa no mercado.</P>
        </AccordionItem>
        <AccordionItem title="Para quem o Bicofino existe">
          <P>O Bicofino existe para pessoas que entendem que imagem, reputação e presença são ativos — e que a execução desses ativos exige parceiros que sejam, eles mesmos, referência naquilo que fazem.</P>
          <P>Existimos para o atleta que quer que sua carreira seja maior que os jogos que joga. Para a marca que quer que suas conexões esportivas gerem cultura, não apenas exposição. Para o cliente que entende que pagar menos e esperar mais é uma equação que nunca fecha.</P>
        </AccordionItem>
        <AccordionItem title="Para quem o Bicofino não existe">
          <P>O Bicofino não existe para quem busca opção. Não existe para quem negocia qualidade por urgência, ou elegância por conveniência. Não existe para quem trata marca como custo operacional.</P>
          <P>Quem precisa de muito por pouco, rápido e sem critério, encontrará outras portas abertas. A nossa tem lista de espera — por escolha.</P>
        </AccordionItem>
      </div>

      {/* Princípios */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Princípios" title="Princípios" />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>Princípios são critérios de decisão e ação que funcionam como eixo de coerência ao longo do tempo. No Bicofino, os princípios não são valores decorativos de slide de apresentação — são filtros reais que governam cada entrega, cada escolha de cliente e cada palavra produzida.</P>
        </div>

        {[
          {
            title: 'Princípio da Conexão — O acesso que levou anos para construir',
            paras: [
              'O ativo mais raro do Bicofino não é competência técnica, estética ou metodologia. É acesso. Acesso real, conquistado ao longo de anos de presença consistente, caráter e negociações conduzidas com ética e respeito mútuo. Decisores, atletas, personalidades, marcas globais e celebridades que estão fora do alcance da grande maioria — essas conexões são o ouro da casa.',
              'A Conexão é o primeiro princípio porque tudo começa aqui. Sem ela, curadoria, criatividade e consultoria perdem o terreno onde se plantam.',
            ],
            items: [
              'Toda conexão feita pelo Bicofino deve gerar valor para todos os lados — nunca é uma transação de via única.',
              'O relacionamento é tratado como ativo de longo prazo. Nunca como ferramenta de projeto.',
              'A rede foi construída com caráter. Qualquer uso dela que comprometa a confiança de um parceiro é inaceitável.',
              'Ao apresentar uma conexão, o contexto importa tanto quanto o contato. Apresente com inteligência e propósito.',
            ],
          },
          {
            title: 'Princípio da Curadoria — Dizer não é parte do trabalho',
            paras: [
              'Curadoria é a capacidade de filtrar antes de apresentar. O Bicofino não oferece opções — apresenta a escolha certa, após critério estético e estratégico rigoroso. Isso vale para clientes aceitos, parceiros escolhidos, projetos assumidos, referências utilizadas e entregas feitas.',
              'Dizer não é o exercício mais sofisticado do bom gosto. Uma agenda cheia não é sinal de sucesso — é sinal de ausência de critério. O tamanho do portfólio não é nossa métrica; a qualidade de cada relação, sim.',
            ],
            items: [
              'Antes de aceitar qualquer projeto, pergunte: isso fortalece ou dilui o que o Bicofino representa?',
              'Apresente uma solução, não um cardápio.',
              'Reduza escopo quando necessário. Nunca reduza padrão.',
              'Trate a recusa como um ato de serviço ao cliente — você o protege de uma entrega mediana.',
            ],
          },
          {
            title: 'Princípio da Elegância — Simples, nunca simplista',
            paras: [
              'A solução mais inteligente é sempre a mais econômica — em palavras, em elementos visuais, em esforço visível. Elegância é precisão. É chegar ao ponto com o menor desperdício possível de atenção, recursos e tempo.',
            ],
            items: [
              'Corte o supérfluo antes de entregar. O cliente não precisa ver o esforço — precisa sentir o resultado.',
              'Prefira uma frase exata a um parágrafo correto.',
              'Prefira um elemento visual preciso a uma composição rica.',
              'Sofisticação e densidade são coisas diferentes.',
            ],
          },
          {
            title: 'Princípio da Profundidade — Poucos, bem',
            paras: [
              'O Bicofino opera como quarteto de câmara, não como show de estádio. Numa quarteto, cada nota de cada músico importa. Cada relação construída com um cliente é uma relação de conhecimento profundo, não de atendimento transacional.',
            ],
            items: [
              'Conheça o cliente além do briefing. Conheça o negócio, a ambição, o que ele não diz.',
              'Não trate projetos como tarefas isoladas — trate-os como capítulos de uma relação de longo prazo.',
              'Entregue além do que foi pedido, com a elegância de quem sabe o limite do excesso.',
            ],
          },
        ].map(({ title, paras, items }) => (
          <AccordionItem key={title} title={title}>
            {paras.map((p, i) => <P key={i}>{p}</P>)}
            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '20px 0 8px', textTransform: 'uppercase' as const }}>Como aplicar este princípio</p>
            <BulletList items={items} />
          </AccordionItem>
        ))}
      </div>

      {/* Cuidados e Riscos */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Cuidados e Riscos" title="Cuidados e Riscos" />

        {[
          {
            title: 'O risco da autodeclaração',
            body: 'O maior risco de uma marca premium é começar a proclamar o que deveria demonstrar. A sofisticação que precisa ser declarada não foi conquistada.',
            guard: 'Antes de publicar qualquer comunicação, pergunte: isso mostra ou diz? Prefira sempre mostrar.',
          },
          {
            title: 'O risco da imitação',
            body: 'O Bicofino tem referências — e há sabedoria nisso. O perigo é quando a referência vira pastiche.',
            guard: 'Referências existem para calibrar padrão, não para ser replicadas. O Bicofino deve soar como Bicofino, não como a versão brasileira de outra coisa.',
          },
          {
            title: 'O risco da inconsistência entre vertentes',
            body: null,
            guard: 'Cada vertente deve soar como filha do Bicofino — mesma estética de fundo, adaptada para seu contexto. Um card de atleta On Field e uma proposta Off Field devem ser reconhecivelmente da mesma família.',
          },
          {
            title: 'O risco do crescimento sem critério',
            body: null,
            guard: 'Crescimento no Bicofino é medido em qualidade de relação, não em número de clientes ativos. Uma lista de espera é preferível a um portfólio diluído.',
          },
          {
            title: 'O risco da IA como substituto',
            body: null,
            guard: '"IA ilumina, humanos decidem." Toda entrega final passa pelo filtro de julgamento criativo humano. A IA acelera o caminho; o critério humano valida o destino.',
          },
        ].map(({ title, body, guard }) => (
          <AccordionItem key={title} title={title}>
            {body && <P>{body}</P>}
            <GuardRail>{guard}</GuardRail>
          </AccordionItem>
        ))}
        <div style={{ height: 40 }} />
      </div>

      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   POSICIONAMENTO — id: brand-posicionamento
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandPosicionamento() {
  return (
    <section id="brand-posicionamento">
      <BsHeader eyebrow="// 00.3 · Posicionamento" title="Posicionamento" />

      {/* Público-chave */}
      <BsSub label="// Público-chave" title="Público-chave" />
      <div style={{ padding: `0 ${H_PAD}px 56px` }}>
        <P>O Bicofino não define seu público por faixa etária ou renda. Define por mentalidade.</P>
        <P>O público-chave é formado por pessoas e marcas que entendem que imagem é estratégia, que tempo de relação é ativo, que bom gosto não é subjetivo — é educável e valorizável. São agentes que operam nas camadas superiores de seus respectivos mercados e que buscam parceiros no mesmo nível de exigência que eles.</P>

        {[
          {
            label: 'Cluster 1 — O Atleta com Visão de Carreira',
            tag: '(On Field)',
            body: 'Jovem talento esportivo que entende que sua trajetória é maior que os contratos que assina. Busca construção de marca pessoal, acesso a mercados internacionais e gestão de imagem com o mesmo rigor com que treina. Vê o Bicofino como sócio estratégico, não como agência.',
            ref: 'Guilherme Kerchner — 17 anos, Palmeiras, Nike, passaporte italiano. From Palmeiras to the World.',
          },
          {
            label: 'Cluster 2 — A Marca que Quer Mais que Exposição',
            tag: '(Off Field)',
            body: 'Empresa ou marca que quer que sua conexão com o universo esportivo gere cultura, narrativa e pertencimento — não apenas logo em camisa. Entende ROI mas valoriza percepção. Sabe que a qualidade da associação importa tanto quanto o alcance.',
            ref: 'Nike, Loro Piana, Piaggio/Vespa — marcas com herança, estética e propósito que se complementam ao universo Bicofino.',
          },
          {
            label: 'Cluster 3 — O Cliente Premium Off Field',
            tag: null,
            body: 'Empresa ou executivo que precisa de identidade visual, estratégia de marca, consultoria criativa ou acesso a players específicos de mercado no mais alto nível. Sabe que pagar pelo melhor é mais econômico do que corrigir o mediano.',
            ref: 'BoviChain — empresa de tech no agronegócio premium que entende que sua marca visual precisa refletir o padrão da tecnologia que entrega.',
          },
          {
            label: 'Cluster 4 — O Membro do Club',
            tag: '(Território da Raposa)',
            body: 'Ver seção Club em Operações.',
            ref: null,
          },
        ].map(({ label, tag, body, ref }) => (
          <div key={label} style={{ borderTop: hairline, padding: '32px 0' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.black, margin: '0 0 4px', fontFamily: sans }}>
              {label} {tag && <span style={{ fontWeight: 400, color: C.steel }}>{tag}</span>}
            </p>
            <P>{body}</P>
            {ref && (
              <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, letterSpacing: '0.06em' }}>
                Perfil de referência: {ref}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Buyer Personas */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Buyer Personas" title="Buyer Personas" />

        <AccordionItem title="A — O Talento em Ascensão">
          {[
            ['Perfil', 'Atleta de 16–22 anos em clube de primeiro time ou base de grande clube brasileiro. Nike ou outra marca global no horizonte. Família presente e envolvida nas decisões.'],
            ['O que ele quer', 'Entender como transformar performance em carreira internacional. Acesso, não apenas representação.'],
            ['O que ele teme', 'Ser mais um no portfólio de uma agência grande que não vai aprender seu nome.'],
            ['Como o Bicofino fala com ele', 'Direto, sem corporativismo. Autenticidade é tudo. Narrativa concreta, não promessa abstrata.'],
          ].map(([label, text]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '14px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{text}</span>
            </div>
          ))}
        </AccordionItem>

        <AccordionItem title="B — O Executivo de Marca / Parceiro Estratégico">
          <div style={{ padding: '14px 0', borderBottom: hairline, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'start' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans }}>Perfil</span>
            <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>CMO, diretora de marketing ou fundador de empresa premium ou em processo de premiumização. Tem budget e aprovação interna, mas responde por resultado e percepção.</span>
          </div>
          <div style={{ padding: '14px 0', borderBottom: hairline }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: '0 0 10px', fontFamily: sans }}>O que ele quer — e onde o Bicofino é insubstituível</p>
            <P>O executivo de marca não busca apenas execução criativa ou design de qualidade. Busca o que está fora do alcance da maioria: <strong>acesso direto a atletas, celebridades, personalidades e marcas globais que não atendem cold calls</strong>. Essa porta existe no Bicofino porque foi construída ao longo de anos com caráter, negociação limpa e relacionamentos conduzidos com ética, respeito genuíno e inteligência de longo prazo.</P>
            <P>Quando o Bicofino conecta uma marca a um atleta, a um influenciador de peso ou a uma personalidade de mercado, a conexão já vem filtrada, contextualizada e estruturada para que todos os lados ganhem. Esse diferencial não se replica: o acesso não está à venda, é consequência de uma rede construída com décadas de presença consistente e caráter inabalável.</P>
          </div>
          {[
            ['O que ele teme', 'Pagar por entrega que parece premium mas não move agulha de percepção real. Ser apresentado a contatos de segunda linha disfarçados de grandes parcerias.'],
            ['Como o Bicofino fala com ele', 'Linguagem de negócio primeiro, estética depois. ROI traduzido em percepção e métricas tangíveis. Com a segurança de quem sabe que as conexões entregues são genuínas.'],
          ].map(([label, text]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '14px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{text}</span>
            </div>
          ))}
        </AccordionItem>

        <AccordionItem title="C — O Patriarca do Network">
          {[
            ['Perfil', 'Empresário de 45–65 anos, bem-sucedido em setor tradicional (agro, finanças, construção, indústria), que transita entre o mundo corporativo e o do esporte e luxo por afinidade genuína.'],
            ['O que ele quer', 'Pertencer a uma rede de pares de altíssimo nível. Conversas que agregam. Experiências que justificam o padrão de vida que construiu.'],
            ['O que ele teme', 'Vulgaridade disfarçada de exclusividade. Ostentatório demais. Ou invisível demais para justificar o investimento.'],
            ['Como o Bicofino fala com ele', 'Com a elegância de quem pertence ao mesmo universo. Como Consigliere, nunca como vendedor.'],
          ].map(([label, text]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '14px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.black, fontFamily: sans }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{text}</span>
            </div>
          ))}
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Posicionamento de Marca */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Posicionamento de Marca" title="Posicionamento de Marca" />
        <AccordionItem title="A declaração interna">
          <P>O Bicofino é o único ecossistema que combina acesso genuíno ao mundo do esporte e do luxo com curadoria estética de nível de atelier e inteligência estratégica de longo prazo. Operamos com poucos para entregar profundo — e essa seletividade é o produto, não a limitação.</P>
        </AccordionItem>
        <AccordionItem title="O que nos diferencia na prática">
          <div style={{ marginTop: 24 }}>
            <TableHeader cols={['Dimensão', 'Mercado comum', 'Bicofino']} />
            {[
              ['Acesso',             'Contatos disponíveis para qualquer agência',    'Rede construída por décadas, não replicável'],
              ['Volume de clientes', 'Carteira ampla para diluir risco',              'Agenda reduzida por escolha'],
              ['Entrega',            'Execução conforme briefing',                    'Consultoria + execução + antecipação'],
              ['Preço',              'Negociável, pacotes com desconto',              'Fixo, ajuste apenas por escopo'],
              ['Relação',            'Transacional',                                  'Parceria de longo prazo'],
              ['Linguagem',          'Profissional genérica',                         'Atelier premium — sofisticação pela execução'],
              ['IA',                 'Ferramenta de corte de custo',                  'Amplificador criativo — qualidade inalterada'],
              ['Cobertura',          'Local ou regional',                             'Multicultural: Brasil · Europa · EUA'],
            ].map(cells => (
              <TableRow key={cells[0]} cells={cells} cols={3} />
            ))}
          </div>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Internacionalidade */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Internacionalidade" title="Internacionalidade" />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>O Bicofino opera em três idiomas principais — <strong>português, inglês e italiano</strong> — e essa não é uma decisão apenas linguística. É um posicionamento de mundo.</P>
        </div>
        <AccordionItem title="Por que esses três idiomas">
          <P><strong>Português</strong> é a língua de origem e de raiz. É onde o Bicofino nasceu, onde seus primeiros atletas treinaram, onde suas primeiras conexões foram construídas. É a língua da autenticidade.</P>
          <P><strong>Inglês</strong> é a língua do jogo global. Clubes europeus, marcas globais, scouts internacionais e investidores falam inglês. É a língua do mercado que o Bicofino quer alcançar — e já alcança. Todo material de posicionamento de atletas para o mercado europeu, apresentações institucionais e comunicação com parceiros internacionais opera em inglês americano.</P>
          <P><strong>Italiano</strong> é a língua da herança e do refinamento. A conexão com a Itália é genuína: atletas com passaporte italiano, parceiros de marca com herança italiana (Piaggio/Vespa, Loro Piana, Brunello Cucinelli), e uma sensibilidade estética que compartilha os mesmos códigos — couro, artesanato, permanência, forma sobre velocidade. O italiano não é apenas um idioma de comunicação; é uma referência cultural que molda o gosto Bicofino.</P>
        </AccordionItem>
        <AccordionItem title="O modelo James Bond de internacionalidade">
          <P>Há uma figura que captura com precisão o modo Bicofino de transitar no mundo: James Bond.</P>
          <P>Bond não é de um lugar só. Entra em qualquer sala, em qualquer país, em qualquer idioma — e pertence. Não está nunca no lugar errado, nunca sem propósito. É chamado quando o problema é impossível demais para o caminho convencional. Mantém a elegância e o raciocínio calibrado mesmo sob pressão extrema. Adapta o estilo ao contexto sem perder a identidade.</P>
          <P>Esse é o padrão de internacionalidade que o Bicofino busca: a capacidade de estar em Milão, em Londres ou em São Paulo com a mesma desenvoltura — absorvendo o melhor de cada cultura para operar com vantagem onde quer que esteja.</P>
        </AccordionItem>
        <AccordionItem title="O que isso significa na prática">
          <P>Materiais, propostas e comunicações são produzidos no idioma mais estratégico para cada contexto. Nunca tradução automática. Sempre adaptação cultural com critério.</P>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NÚCLEO DA MARCA — id: brand-nucleo
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandNucleo() {
  return (
    <section id="brand-nucleo">
      <BsHeader eyebrow="// 00.4 · Núcleo da Marca" title="Núcleo da Marca" />

      {/* Direção */}
      <BsSub label="// Direção" title="Unlike Any Other." />
      <div style={{ padding: `0 ${H_PAD}px 24px` }}>
        <P>Esta tagline não é slogan. É posição.</P>
        <div style={{ margin: '0 0 0', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>Unlike</strong> — somos diferentes, mas a diferença não é proclamada, é percebida. Diferença pela execução, não pela promessa.</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>Any</strong> — o padrão de comparação é amplo. O Bicofino está fora da categoria de qualquer coisa que exista nesse cruzamento.</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.black, margin: 0, fontFamily: sans, maxWidth: MAX_W }}><strong>Other</strong> — tudo aquilo que é genérico, padronizado, replicável. O Bicofino existe fora dessa categoria.</p>
        </div>
      </div>
      <AccordionItem title="A metáfora central">
        <P><strong>O quarteto de câmara íntimo.</strong> Não o show de estádio.</P>
        <P>Num quarteto de câmara, cada nota de cada instrumento importa. O silêncio entre as notas importa. A acústica da sala importa. O público escolhido para estar ali importa. O objetivo nunca é atingir o máximo de gente — é atingir as pessoas certas com a máxima intensidade.</P>
      </AccordionItem>

      {/* Visão e Propósito */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Visão e Propósito" title="Visão e Propósito" />
        <AccordionItem title="Visão">
          <P>Ser reconhecido como o ecossistema de referência em conexão, curadoria e criatividade aplicadas ao universo do esporte e do luxo — no Brasil e no circuito internacional.</P>
        </AccordionItem>
        <AccordionItem title="Propósito">
          <P>Transformar carreiras, marcas e momentos em patrimônio de longo prazo, por meio de conexões genuínas, curadoria radical e execução de nível de atelier.</P>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Os 4 Cs */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Os 4 Cs" title="Os 4 Cs — O Filtro de Toda Decisão" />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>Toda decisão, entrega e projeto Bicofino pode ser lido através dessas quatro lentes. São questão de honra. A ordem importa.</P>
        </div>

        {[
          {
            label: '1. CONNECT — O primeiro e mais fundamental',
            body: 'A habilidade central e mais rara do Bicofino. Reunir e engajar dois ou mais players — pessoas, negócios, atletas, celebridades, marcas — que não estão ao alcance da maioria. Acesso genuíno a decisores, figuras de influência e marcas premium, combinado com a inteligência de criar encontros que geram valor real para todos os lados.',
            body2: 'CONNECT é o principal diferencial competitivo do Bicofino. Cada conexão foi construída com anos de caráter, presença consistente e negociação limpa. Nenhuma delas é superficial, nenhuma delas é descartável.',
            rule: 'Regra fundamental: toda conexão feita pelo Bicofino deve beneficiar todos os lados da equação. A ética da conexão é inegociável.',
          },
          {
            label: '2. CURATE — O filtro que define o padrão',
            body: 'Bom gosto e exclusividade acima de tudo. O Bicofino não apresenta opções — apresenta a escolha certa, filtrada por critério estético e estratégico. Isso vale para clientes aceitos, parceiros escolhidos, projetos assumidos, referências usadas e entregas feitas. Dizer não é parte da curadoria, não uma limitação.',
            body2: null,
            rule: null,
          },
          {
            label: '3. CREATE — Consequência natural dos dois primeiros',
            body: 'Aparece como resultado direto de CONNECT e CURATE, e se manifesta na execução dos projetos. O padrão interno é buscar a saída mais simples e elegante possível, com o menor gasto de recursos — tempo, dinheiro, atenção. Criatividade aqui é precisão cirúrgica na escolha da melhor saída, não volume de ideias.',
            body2: null,
            rule: null,
          },
          {
            label: '4. CONSULT — A profundidade que cresce com o tempo',
            body: 'O Bicofino serve como guia dos seus clientes — não apenas entregando resultados, mas aprofundando o relacionamento ao longo do tempo. A postura é de parceiro estratégico de longo prazo: conhecer o negócio do cliente em profundidade, antecipar necessidades, orientar decisões além do escopo imediato. O valor cresce com o tempo de relação.',
            body2: null,
            rule: null,
          },
        ].map(({ label, body, body2, rule }) => (
          <AccordionItem key={label} title={label}>
            <P>{body}</P>
            {body2 && <P>{body2}</P>}
            {rule && (
              <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, margin: '8px 0 0', fontFamily: sans, borderLeft: `2px solid ${C.aluminium}`, paddingLeft: 16 }}>
                {rule}
              </p>
            )}
          </AccordionItem>
        ))}

        <div style={{ borderTop: hairline, padding: `32px ${H_PAD}px 56px` }}>
          <P muted>Ao receber qualquer demanda, avalie: Esta conexão envolve os players certos? Está dentro do padrão de curadoria do Bicofino? A execução proposta é a mais simples e elegante possível? Estamos aprofundando a relação com o cliente ou apenas entregando uma peça?</P>
        </div>
      </div>

      {/* Arquétipos */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Arquétipos" title="Arquétipos" />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <H3>A Tríade</H3>
          <P>A identidade do Bicofino se ancora em três arquétipos complementares — cada um operando num registro distinto, juntos formando o caráter único da marca.</P>
        </div>

        {[
          {
            title: 'O Soberano (Primário)',
            ref: 'Hermès, Don Corleone, o chefe de Estado que não precisa levantar a voz.',
            body: 'O Soberano governa pelo critério. Tem o mais alto padrão e não negocia. A autoridade não é proclamada — é reconhecida. Conhece as regras melhor do que qualquer um, e por isso sabe exatamente quando e como dobrá-las com elegância.',
            body2: 'No Bicofino, o Soberano aparece na postura de curadoria absoluta: na seletividade de clientes, na recusa elegante, na agenda limitada. Aparece no silêncio calculado de uma marca que não precisa de barulho para ser percebida.',
            never: 'O que o Soberano nunca faz: Se explica demais. Pede desculpas pelo padrão. Cede sob pressão de mercado.',
          },
          {
            title: 'O Sábio (Secundário)',
            ref: 'Ray Dalio, Mozart, o Consigliere que fala menos e acerta mais.',
            body: 'O Sábio observa antes de agir. Acumula perspectiva e a entrega no momento exato — não antes, não depois. Não tem pressa de provar que sabe; a profundidade da análise faz isso por ele.',
            body2: 'No Bicofino, o Sábio aparece na qualidade da consultoria estratégica, na leitura de mercado de longo prazo, na integração de IA como ferramenta de amplificação do julgamento humano.',
            never: 'O que o Sábio nunca faz: Entrega análise sem síntese. Fala por falar. Confunde volume de informação com sabedoria.',
          },
          {
            title: 'O Criador (Terciário)',
            ref: 'Steve Jobs, a Raposa Bicofino, o artista que também é editor implacável.',
            body: 'O Criador vê possibilidades onde outros veem restrições. Produz com obsessão pelos detalhes. Mas o Criador Bicofino é também editor. Sabe que a diferença entre o mediano e o excelente é o que você decide tirar, não o que você adiciona.',
            body2: 'No Bicofino, o Criador aparece no Studio, no Bicofino Inspired, nas assinaturas animadas, nos media kits, nas identidades visuais. Aparece em cada entrega que foi trabalhada até o ponto de não ter mais nada para cortar.',
            never: 'O que o Criador nunca faz: Entrega volume sem edição. Confunde ocupação com produtividade criativa. Valoriza processo mais que resultado.',
          },
        ].map(({ title, ref, body, body2, never }) => (
          <AccordionItem key={title} title={title}>
            <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: '0 0 20px', letterSpacing: '0.06em', fontStyle: 'italic' }}>{ref}</p>
            <P>{body}</P>
            <P>{body2}</P>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, margin: 0, fontFamily: sans, borderLeft: `2px solid ${C.aluminium}`, paddingLeft: 16 }}>{never}</p>
          </AccordionItem>
        ))}

        <AccordionItem title="A Raposa e James Bond — O Arquétipo da Mobilidade">
          <P>A Raposa Bicofino e James Bond compartilham o mesmo DNA de comportamento — e juntos formam a camada de mobilidade e adaptação da marca.</P>
          <P>A Raposa é ágil, inteligente e elegante sob pressão. Aparece nos momentos certos, desaparece quando não há nada a acrescentar. Nunca está no lugar errado. Observa antes de agir. Nunca latidora.</P>
          <P>Bond amplia essa leitura para a dimensão internacional: transita em qualquer lugar do mundo sem perder a identidade. Entra em qualquer sala — em qualquer idioma, em qualquer cultura — e pertence. É chamado quando o problema é impossível demais para o caminho convencional. Mantém elegância e raciocínio calibrado mesmo sob pressão extrema. Adapta o método ao contexto. Nunca o caráter.</P>
          <P>Esses dois arquétipos, sobrepostos, definem como o Bicofino se move no mundo: com presença calculada, propósito claro e elegância que não precisa anunciar a si mesma.</P>
        </AccordionItem>

        <AccordionItem title="Painel Semântico dos Arquétipos">
          {[
            ['Metáforas Bicofino', 'A raposa (agilidade e inteligência), o quarteto de câmara (precisão e intimidade), o atelier (artesanato e exclusividade), o Consigliere (confiança e acesso), o couro patinado (tempo e qualidade), o diamond ✦ (filtro e precisão), o campo de jogo à noite (tensão e beleza simultâneas), a piazza italiana (encontro, elegância e tempo de qualidade), Bond atravessando a fronteira (mobilidade com propósito).'],
            ['Referências culturais', 'Hermès (heritage e recusa ao óbvio), LVMH (arquitetura de marca), Brunello Cucinelli (humanismo e luxo com ética), Audemars Piguet (artesanato que transcende gerações), Loro Piana (silêncio como sofisticação), The Row (minimalismo como posição), James Bond (elegância sob pressão, mobilidade internacional), Don Corleone (poder discreto e relação de confiança), Mozart (gênio com disciplina de forma), Steve Jobs (estética como estratégia), Johnnie Walker Striding Man (mascote como ativo de marca de longo prazo), o futebol italiano dos anos 80 e 90 (quando a escassez de vagas para estrangeiros colocava os melhores do mundo em times de menor expressão — Zico na Udinese — e a elegância tática definia o jogo antes da velocidade).'],
            ['Evitar', 'O maestro que pede palmas. O guru que vende método. A agência que promete transformação em 30 dias.'],
          ].map(([label, text]) => (
            <div key={label} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: '0 0 8px', fontFamily: sans }}>{label}</p>
              <P muted={label === 'Evitar'}>{text}</P>
            </div>
          ))}
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Craft */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Craft" title="Craft" />
        <div style={{ padding: `0 ${H_PAD}px 56px` }}>
          <P>O Craft do Bicofino não são valores de parede de escritório. São comportamentos observáveis em cada entrega, cada reunião, cada interação com cliente ou parceiro.</P>
          {[
            ['Obsessão pelo Detalhe', 'O que parece perfeito ao olhar descuidado tem algo a ser refinado. Sempre. O Bicofino encontra esse algo e corrige antes de entregar.'],
            ['Beleza com Inteligência', 'Estética sem estratégia é decoração. Estratégia sem estética é planilha. O Bicofino opera na interseção.'],
            ['Entrega além do esperado', 'O briefing é o piso, não o teto. O cliente pede o que sabe pedir; o Bicofino entrega o que o cliente ainda não sabia que precisava.'],
            ['Simplicidade radical', 'A versão mais elegante de qualquer coisa é sempre a mais simples que ainda funciona. Cortar é a habilidade mais difícil e mais valiosa.'],
            ['Contundência com elegância', 'Dizer algo difícil com precisão e sem crueldade. Ter uma posição e sustentá-la. O Bicofino não hesita.'],
            ['Tecnologia a serviço da criatividade', 'IA, dados e ferramentas digitais amplificam o julgamento humano — nunca o substituem.'],
            ['O Toque Artesanal', 'O pano de fundo da comunicação Bicofino segue sempre as quatro qualidades visuais centrais: minimalismo sofisticado, quiet luxury, hierarquia clara, permanência sobre tendência. Mas o que diferencia o Bicofino de qualquer sistema de marca bem executado é o que acontece pontualmente e com intenção: um post de atleta que rompe o grid de forma calculada, um tratamento artístico inesperado numa campanha, uma peça que surpreende porque ninguém esperava aquele nível de cuidado humano num contexto digital. Esses momentos não são frequentes — e não devem ser. Aparecem estrategicamente, quando a ocasião justifica, e é exatamente essa raridade que os torna poderosos. O toque artesanal é o diferencial estético do Bicofino. O fator humano que não se replica em escala.'],
          ].map(([label, text]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', padding: '18px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.black, fontFamily: sans, lineHeight: 1.4 }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Proxies e Personas */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Proxies e Personas" title="Proxies e Personas" />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>Proxies são figuras reais ou ficcionais que ajudam a calibrar o padrão interno de decisão. Quando em dúvida sobre tom, postura ou escolha, pergunte: o que essas referências fariam?</P>
        </div>

        {[
          {
            name: 'Hermès',
            use: 'Para decisões de curadoria e padrão de produto. A Hermès recusa tendência. Lança quando está pronto. Sua fila de espera é estratégia, não coincidência.',
            arrow: 'O Bicofino também recusa o que está em moda se não é verdadeiro para a marca.',
          },
          {
            name: 'Brunello Cucinelli',
            use: 'Para decisões sobre humanismo e ética do luxo. Cucinelli construiu um império sobre a crença de que lucro e dignidade humana coexistem — que a qualidade máxima e o respeito ao processo são a mesma coisa.',
            arrow: 'O Bicofino entende que excelência e ética de relacionamento não são trade-offs.',
          },
          {
            name: 'Audemars Piguet',
            use: 'Para decisões de herança e artesanato de longo prazo. A AP não explica por que seus relógios custam o que custam — a complexidade interna, visível apenas para quem sabe olhar, faz esse trabalho.',
            arrow: 'O Bicofino não precisa explicar seu valor. A profundidade da entrega faz isso.',
          },
          {
            name: 'Don Corleone',
            use: 'Para decisões de relacionamento e poder de rede. O Padrinho não negocia publicamente. Suas relações são de longa data e mútua conveniência. Quando faz um favor, não cobra imediatamente.',
            arrow: 'O Bicofino constrói relações onde o valor cresce com o tempo, não se esgota na primeira transação.',
          },
          {
            name: 'Steve Jobs',
            use: 'Para decisões de produto e execução. Jobs eliminava features até o produto ser apenas o essencial mais bem executado possível.',
            arrow: 'O Bicofino elimina o supérfluo até restar apenas o necessário — executado impecavelmente.',
          },
          {
            name: 'James Bond',
            use: 'Para decisões de mobilidade, presença e adaptação. Bond entra em qualquer sala do mundo e pertence. Resolve o impossível com elegância. Mantém o caráter mesmo quando o método muda.',
            arrow: 'O Bicofino transita em qualquer mercado, em qualquer idioma, sem perder a identidade.',
          },
          {
            name: 'A Raposa Bicofino',
            use: 'A mascote da marca. Ágil, inteligente, elegante sob pressão. Aparece quando tem algo a acrescentar; desaparece quando não tem.',
            arrow: 'O que a Raposa faria? O que ela vestiria? Onde ela estaria?',
          },
        ].map(({ name, use, arrow }) => (
          <AccordionItem key={name} title={name}>
            <P>{use}</P>
            <Arrow>{arrow}</Arrow>
          </AccordionItem>
        ))}
        <div style={{ height: 40 }} />
      </div>

      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   UNIVERSO VERBAL — id: brand-verbal
   ═══════════════════════════════════════════════════════════════════════════ */
function BrandVerbal() {
  return (
    <section id="brand-verbal">
      <BsHeader eyebrow="// 00.5 · Universo Verbal" title="Universo Verbal" />

      {/* Manifesto */}
      <BsSub label="// Manifesto" title="Quem decide o jogo raramente grita." />
      <div style={{ padding: `0 ${H_PAD}px 56px` }}>
        <P>Há uma geração inteira ensinada a acreditar que visibilidade é valor. Que presença é poder. Que se você não está sendo visto, não está acontecendo.</P>
        <P>O Bicofino discorda.</P>
        <P>Os negócios que mais importam acontecem em salas pequenas. As conexões que movem carreiras são feitas por pessoas que se conhecem de verdade — não por algoritmos de rede social. As marcas que duram décadas não perseguem tendências; elas as ignoram com elegância calculada.</P>
        <P>Vivemos numa era em que qualquer um pode parecer sofisticado. Filtros, templates, conteúdo gerado por IA em escala industrial — a superfície nunca foi tão acessível. Por isso, paradoxalmente, a profundidade nunca foi tão rara. E tão valiosa.</P>
        <P>O Bicofino foi construído sobre essa crença: que o que dura é o que tem substância. Que o acesso real não se compra, se constrói — com tempo, com critério, com a disposição de dizer não para o que não merece sim. Que beleza e inteligência não são opostos — são a mesma coisa quando a execução está no nível certo.</P>
        <P>Não atendemos a todos. Cada relação que construímos exige profundidade. Cada projeto que assumimos exige o melhor que temos. Uma agenda ilimitada é uma agenda diluída.</P>
        <P>Fomos criados na tensão entre três culturas. Da garra e autenticidade brasileira. Da escala e precisão do mundo anglo-saxão. Da herança e do refinamento italiano. Essa mistura não é acidente — é vantagem.</P>
        <P>O esporte é o nosso território de origem não porque é grande, mas porque revela caráter. Numa partida, não há onde se esconder. O talento aparece sob pressão. A preparação decide antes do apito inicial. O Bicofino leva esse mesmo rigor para tudo que faz: cada entrega é uma performance que deixa registro.</P>
        <P>Conexão. Curadoria. Criação. Consultoria.</P>
        <P>Quatro palavras. Um método. Uma obsessão.</P>
        <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, fontFamily: sans }}>Unlike Any Other.</p>
      </div>

      {/* Tom de Voz */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Tom de Voz" title="Tom de Voz" />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>O tom de voz do Bicofino é determinado por quatro eixos que precisam coexistir em qualquer comunicação da marca.</P>
        </div>

        {[
          {
            axis: 'Autoridade sem arrogância',
            body: 'O Bicofino tem ponto de vista e o sustenta. Não pede licença para ter uma posição. Mas nunca a impõe com volume — a impõe com precisão.',
            weak: '"Somos líderes em branding esportivo premium."',
            right: '"Escolhemos os projetos em que podemos entregar o melhor que sabemos fazer."',
          },
          {
            axis: 'Sofisticação pela execução, não pela autodeclaração',
            body: 'A qualidade de uma entrega Bicofino dispensa apresentação. O texto bem escrito, o visual bem editado, a proposta bem estruturada — esses elementos comunicam sofisticação antes de qualquer palavra sobre sofisticação ser dita.',
            weak: '"Uma abordagem premium e exclusiva para sua marca."',
            right: 'Escreva o briefing tão bem que o cliente não precise de adjetivos para saber o que está recebendo.',
          },
          {
            axis: 'Direto, nunca rude',
            body: 'O Bicofino vai ao ponto. Não usa rodeios, não usa enchimento, não usa jargão de agência para parecer mais técnico. Mas ir ao ponto com elegância é diferente de ser abrupto.',
            weak: null,
            right: null,
          },
          {
            axis: 'Específico, nunca genérico',
            body: 'Superlativos vazios são o oposto do padrão Bicofino. Preferir sempre o concreto, o específico, o verificável.',
            weak: '"Experiências únicas e exclusivas para clientes de altíssimo padrão."',
            right: '"Um concerto privado de Lang Lang. Um lugar intimista. Poucas pessoas. Curado pelo Bicofino."',
          },
        ].map(({ axis, body, weak, right }) => (
          <AccordionItem key={axis} title={axis}>
            <P>{body}</P>
            {weak && (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12, marginTop: 8 }}>
                <p style={{ fontSize: 14, color: C.steel, margin: 0, fontFamily: sans, lineHeight: 1.5 }}>
                  <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.platinum, marginRight: 10 }}>FRACO</span>
                  <em>{weak}</em>
                </p>
                <p style={{ fontSize: 14, color: C.black, margin: 0, fontFamily: sans, lineHeight: 1.5 }}>
                  <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, marginRight: 10 }}>BICOFINO</span>
                  {right}
                </p>
              </div>
            )}
          </AccordionItem>
        ))}

        <AccordionItem title="Restrições de escrita — filtros obrigatórios">
          <P><strong>A construção "Não é X. É Y." é proibida no Bicofino.</strong></P>
          <P>Esta é a restrição verbal mais importante do Brand System. A estrutura — "Premium, não caro.", "Estratégia, não execução.", "Não é uma agência. É um atelier." — foi usada em excesso por marcas que querem soar sofisticadas mas precisam declarar essa sofisticação porque não a demonstram. O efeito hoje é exatamente o oposto do pretendido: em vez de força, sinaliza automação; em vez de posição, sinaliza insegurança.</P>
          <P>O padrão Bicofino exige frases que afirmem sem precisar negar, que demonstrem sem precisar explicar, que confiem no leitor para completar o raciocínio. A inteligência do texto está em nunca precisar dizer o que não é — apenas mostrar o que é, com precisão suficiente para que o contraste apareça sozinho.</P>
          <P><strong>Esta restrição vale para todo tipo de output:</strong> copy de marca, posts de Instagram, propostas, manifestos, playbooks e análises estratégicas.</P>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '24px 0 12px', textTransform: 'uppercase' as const }}>Outras restrições</p>
          <BulletList items={[
            'Superlativos sem referência concreta ("o mais", "o melhor", "o único")',
            'Urgência artificial ("vagas limitadas", "por tempo limitado")',
            'Corporativês ("ecossistema robusto", "soluções integradas", "entrega de valor")',
            'Elogiar o cliente pela pergunta antes de responder',
            'Usar "genuíno", "honestamente" ou "sinceramente" como intensificadores',
          ]} />
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Vocabulário */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Vocabulário" title="Vocabulário" />
        <AccordionItem title="Palavras do universo Bicofino">
          {[
            ['Curadoria',  'Escolha deliberada e criteriosa. Mais que seleção; é edição com padrão.'],
            ['Atelier',    'O modo de operação. Artesanal em escala reduzida, irrepetível em profundidade.'],
            ['Consigliere','O conselheiro de confiança. Acesso ao círculo decisório, com discrição absoluta.'],
            ['Portfólio',  'Relações de longo prazo com padrão curado. Nunca apenas clientes.'],
            ['Legado',     'O que fica depois da entrega. Toda ação Bicofino deve deixar algo que cresce com o tempo.'],
            ['Acesso',     'O ativo mais raro. Construído com anos, entregue com precisão.'],
            ['Quarteto',   'A metáfora do tamanho ideal de operação. Poucos. Precisos. Essenciais.'],
            ['Dossiê',     'O formato de proposta Bicofino. Documento que conta uma história estratégica, não uma lista de serviços.'],
            ['Raposa',     'O mascote. O ponto de vista interno. Ágil, inteligente, invisível quando não há nada a acrescentar.'],
            ['Diamond',    'O símbolo ✦. A marca isolada. O filtro com forma: quatro pontos de precisão.'],
            ['On Field',   'Tudo relativo ao atleta em campo e à sua performance integral.'],
            ['Off Field',  'Tudo que existe fora do campo: marca, negócio, imagem, legado, conexões.'],
          ].map(([term, def]) => (
            <div key={term} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', padding: '14px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.black, fontFamily: sans }}>{term}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans }}>{def}</span>
            </div>
          ))}
        </AccordionItem>
        <AccordionItem title="Palavras a evitar">
          <div style={{ marginTop: 16 }}>
            <TableHeader cols={['Evitar', 'Por quê', 'Alternativa']} />
            {[
              ['Premium (isolado)',    'Overused, perdeu significado',       'Descreva o padrão em vez de nomeá-lo'],
              ['Exclusivo',           'Idem',                                'Diga o que torna a experiência singular'],
              ['Inovador',            'Jargão vazio',                        'Especifique o que é diferente'],
              ['Soluções',            'Corporativês',                        'Projetos, entregas, trabalho'],
              ['Parceria estratégica','Clichê B2B',                          'Relação de longo prazo, aliança'],
              ['Transformador',       'Promessa sem lastro',                 'Especifique o que muda e como'],
              ['Genuíno',             'Intensificador desgastado',           'Demonstre no texto, não declare'],
            ].map(cells => (
              <TableRow key={cells[0]} cells={cells} cols={3} />
            ))}
          </div>
        </AccordionItem>
        <div style={{ height: 40 }} />
      </div>

      {/* Território de Palavras */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Território de Palavras" title="Território de Palavras" />
        <div style={{ padding: `0 ${H_PAD}px 24px` }}>
          <P>O território verbal do Bicofino se move em três camadas semânticas. Atenção à terceira — quando evocada no contexto errado, torna-se clichê. Use com critério e parcimônia.</P>
        </div>
        {[
          {
            layer: 'Camada 1 — Luxo com Substância',
            body: 'Herança, craft, patina, tempo, argila, linho, couro, madeira nobre, silêncio, forma, peso, permanência. A piazza ao entardecer. O couro que melhora com o uso. O atelier que recusa a pressa.',
          },
          {
            layer: 'Camada 2 — Inteligência Estratégica',
            body: 'Ângulo, perspectiva, filtro, critério, mapa, rota, janela, acesso, círculo, sala pequena, conversa que muda direção, rede construída com décadas.',
          },
          {
            layer: 'Camada 3 — Esporte como Metáfora (usar com extrema parcimônia)',
            body: 'Campo, apito, treino, pressão, preparação, timing, escalação. Evocações esportivas têm força quando surgem de forma inesperada num contexto que não as pede — e perdem toda a força quando se tornam o registro padrão. Metáforas de futebol fora do contexto certo soam bregas. Reserve-as para momentos em que o contraste gera impacto.',
          },
        ].map(({ layer, body }) => (
          <AccordionItem key={layer} title={layer}>
            <P muted>{body}</P>
          </AccordionItem>
        ))}
        <div style={{ height: 40 }} />
      </div>

      {/* Glossário */}
      <div style={{ borderTop: hairline }}>
        <BsSub label="// Glossário" title="Glossário" />
        {[
          ['Bicofino OS',             'O sistema operacional interno de gestão de atletas e operações. Arquitetura cognitiva construída sobre Claude Code com agentes de IA, Supabase como banco de dados, Google Drive como memória de longo prazo. Em desenvolvimento e implementação contínua.'],
          ['Bicofino Inspired',       'Conceito editorial audiovisual. Cada produção é um filme de curta-metragem aspiracional protagonizado pela Raposa Bicofino. Lançado quando a experiência justifica — sem calendário, sem obrigação de sequência.'],
          ['Os 4 Cs',                 'CONNECT (primeiro), CURATE (segundo), CREATE e CONSULT (consequências naturais). O filtro de toda decisão Bicofino.'],
          ['Brand System Bicofino',   'Este documento. O Playbook vivo da marca.'],
          ['Dossiê',                  'Formato de proposta comercial Bicofino. Estrutura: Visão → Desafio de marca → Caminho Bicofino → Investimento → Prazos.'],
          ['Diagnóstico de Marca',    'Serviço de discovery aprofundado que mapeia o estado real de uma marca antes de qualquer proposta. Nome definitivo em definição.'],
          ['Gesto de Cavalheiro',     'Código interno para a prática de riscar o sobrenome na assinatura de email e no cartão de visitas, deixando apenas o primeiro nome visível. O gesto diz, sem palavras: "você pode me chamar pelo meu nome." Um ato de intimidade e confiança — a criação de um vínculo pessoal onde antes havia formalidade.'],
          ['Image as Presence. Data as Proof.', 'O princípio editorial do sistema de imagens On Field. O atleta é o ativo visual principal. A imagem cria hierarquia e tensão. O dado sustenta a narrativa com precisão.'],
          ['On Field / Off Field',    'As duas grandes vertentes operacionais do Bicofino.'],
          ['Club',                    'Projeto confidencial. Território da Raposa.'],
          ['O Connector',             'Fábio Brancatelli. CEO e fundador. A rede é o produto.'],
          ['O Investor',              'Flaviano Galhardo. Pragmático, foco em ROI.'],
          ['O Artista',               'Woney Malian. Consigliere e Diretor Criativo. Estética estratégica do Grupo.'],
          ['Unlike Any Other',        'A tagline. Não slogan. Posição.'],
        ].map(([term, def]) => (
          <AccordionItem key={term} compact title={term}>
            <p style={{ fontSize: 14, color: C.steel, lineHeight: 1.65, fontFamily: sans, margin: 0 }}>{def}</p>
          </AccordionItem>
        ))}
        <div style={{ height: 40 }} />
      </div>

      <BsFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function BrandSystem() {
  return (
    <>
      <BrandSystemCover />
      <BrandIndice />
      <BrandFundamentos />
      <BrandPosicionamento />
      <BrandNucleo />
      <BrandVerbal />
    </>
  )
}
