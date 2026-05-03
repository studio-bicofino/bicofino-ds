// Bilingual content for BrandSystem.tsx — BR + EN
// Keep co-located here; do not scatter into br.ts / en.ts

export type BsLang = 'br' | 'en'

export const bsContent = {
  br: {
    footer: 'Brand System — Bicofino Group SA · v3.0 · São Paulo, BR · Maio 2026',

    cover: {
      tagline: 'O sistema vivo que organiza, protege e expande o universo Bicofino.',
      version: 'v3.0 · São Paulo, BR · Maio 2026',
    },

    indice: {
      eyebrow: '// 00.1',
      title: 'Índice',
      complement: 'Universo Visual, Visual System e Operações — ver documento complementar.',
      groups: [
        { title: 'Fundamentos',     items: ['Overview', 'A Origem do Nome', 'Por que existimos', 'Princípios', 'Cuidados e Riscos'] },
        { title: 'Posicionamento',  items: ['Público-chave', 'Buyer Personas', 'Posicionamento de Marca', 'Internacionalidade'] },
        { title: 'Núcleo da Marca', items: ['Direção', 'Visão e Propósito', 'Os 4 Cs — O Filtro de Toda Decisão', 'Arquétipos', 'Craft', 'Proxies e Personas'] },
        { title: 'Universo Verbal', items: ['Manifesto', 'Tom de Voz', 'Vocabulário', 'Território de Palavras', 'Glossário'] },
      ],
    },

    fundamentos: {
      header: { eyebrow: '// 00.2 · Fundamentos', title: 'Fundamentos' },
      overview: {
        sub: { label: '// Overview', title: 'Unlike Any Other.' },
        p1: 'Você está prestes a entrar num sistema que não foi feito para todos. Este documento é o código operacional do Bicofino — a referência interna que governa como essa marca pensa, decide, se expressa e existe no mundo. Ele reúne, num único lugar, tudo o que define o universo Bicofino: dos princípios filosóficos aos critérios visuais, do manifesto à forma de atender o telefone.',
        p2: 'Este sistema existe para garantir três coisas fundamentais:',
        clarity: { label: 'Clareza', text: '— todos entendem o que o Bicofino representa.' },
        consistency: { label: 'Consistência', text: '— a identidade se mantém coerente em qualquer contexto.' },
        evolution: { label: 'Evolução', text: '— o sistema pode crescer sem perder sua essência.' },
        forWhom: {
          title: 'Para quem este sistema existe',
          body: 'Designers, produtores de conteúdo, redatores, parceiros de produção, colaboradores de qualquer vertente e qualquer marca ou pessoa que atue sob o guarda-chuva Bicofino. Se você cria algo em nome do Bicofino, este documento é seu ponto de partida obrigatório.',
        },
        living: {
          title: 'Um sistema vivo',
          body: 'Este Brand System não é estático. O Bicofino cresce, e este documento cresce junto. Cada atualização representa um refinamento do entendimento sobre o que significa operar no mais alto nível — com beleza, inteligência e obsessão por detalhes.',
        },
      },
      origem: {
        label: '// A Origem do Nome',
        title: 'Bico. Fino.',
        p1: 'Imagine um funil. Agora imagine que o bico desse funil é tão estreito que só atravessa o que realmente merece atravessar. Cada parceiro, cada cliente, cada projeto entra pelo topo — e só chega ao outro lado quem passou pelo critério. Não existe atalho, não existe exceção. A saída também é estreita: relações aqui são construídas para durar.',
        p2: 'Esse é o primeiro sentido do nome. Curadoria máxima na entrada. Profundidade máxima na relação.',
        p3: 'Há um segundo sentido, mais sutil, que vive dentro do universo do futebol — e diz muito sobre como o Bicofino pensa excelência.',
        p4: 'Chutar de bico é, em geral, o gesto de quem ainda está aprendendo. Desajeitado. Previsível. Pouca força, menos controle. Mas observe o que acontece quando o mesmo movimento passa pelas chuteiras de um Ronaldo, de um Romário. O bico vira arma. Sai antes que o goleiro processe. Surpreende porque o movimento não é o esperado. Aquilo que parecia limitação se transforma, nas mãos certas, em elegância e precisão cirúrgica.',
        p5: 'O nome carrega os dois lados com igual peso:',
        filter: { label: 'O filtro', text: '— rigor e critério máximo em tudo que entra no raio de ação do Bicofino.' },
        execution: { label: 'A execução', text: '— talento e precisão que transformam o simples no singular.' },
      },
      porQue: {
        label: '// Por que existimos',
        title: 'A pergunta que não faz concessão',
        p1: 'O mercado está cheio de agências, agenciamentos, studios e consultorias. A maioria promete resultado. Muitas entregam produto. Poucas constroem algo que dura.',
        p2: 'O Bicofino existe porque acredita que a combinação de acesso genuíno, critério estético radical e inteligência estratégica aplicada é escassa. Escassa não pela falta de gente capaz — mas porque a maioria das operações comerciais escolhe volume, velocidade e padronização em vez de profundidade, curadoria e singularidade.',
        p3: 'A pergunta que fundou o Bicofino foi simples: o que acontece quando você aplica os padrões de uma maison de luxo a um ecossistema de conexões, talentos e criatividade?',
        p4: 'A resposta é o que você está lendo agora.',
        different: {
          title: 'O que o Bicofino faz de forma diferente',
          p1: 'O Bicofino faz a curadoria do mercado — escolhe os players certos, os projetos certos, os momentos certos. A seletividade é a ferramenta. O tempo de relação é o ativo. A confiança é o produto mais valioso entregue.',
          p2: 'Operamos num ponto de interseção raro: onde o mundo do esporte encontra o luxo, onde a estratégia encontra a estética, onde o acesso encontra o bom gosto. Esse cruzamento foi construído com décadas de trabalho consistente, negociações limpas e relacionamentos genuínos — e é o que nos posiciona diferente de qualquer outra coisa no mercado.',
        },
        forWhom: {
          title: 'Para quem o Bicofino existe',
          p1: 'O Bicofino existe para pessoas que entendem que imagem, reputação e presença são ativos — e que a execução desses ativos exige parceiros que sejam, eles mesmos, referência naquilo que fazem.',
          p2: 'Existimos para o atleta que quer que sua carreira seja maior que os jogos que joga. Para a marca que quer que suas conexões esportivas gerem cultura, não apenas exposição. Para o cliente que entende que pagar menos e esperar mais é uma equação que nunca fecha.',
        },
        notForWhom: {
          title: 'Para quem o Bicofino não existe',
          p1: 'O Bicofino não existe para quem busca opção. Não existe para quem negocia qualidade por urgência, ou elegância por conveniência. Não existe para quem trata marca como custo operacional.',
          p2: 'Quem precisa de muito por pouco, rápido e sem critério, encontrará outras portas abertas. A nossa tem lista de espera — por escolha.',
        },
      },
      principios: {
        label: '// Princípios',
        title: 'Princípios',
        intro: 'Princípios são critérios de decisão e ação que funcionam como eixo de coerência ao longo do tempo. No Bicofino, os princípios não são valores decorativos de slide de apresentação — são filtros reais que governam cada entrega, cada escolha de cliente e cada palavra produzida.',
        howToApply: 'Como aplicar este princípio',
        items: [
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
        ],
      },
      riscos: {
        label: '// Cuidados e Riscos',
        title: 'Cuidados e Riscos',
        items: [
          { title: 'O risco da autodeclaração',          body: 'O maior risco de uma marca premium é começar a proclamar o que deveria demonstrar. A sofisticação que precisa ser declarada não foi conquistada.',                                         guard: 'Antes de publicar qualquer comunicação, pergunte: isso mostra ou diz? Prefira sempre mostrar.' },
          { title: 'O risco da imitação',                 body: 'O Bicofino tem referências — e há sabedoria nisso. O perigo é quando a referência vira pastiche.',                                                                                              guard: 'Referências existem para calibrar padrão, não para ser replicadas. O Bicofino deve soar como Bicofino, não como a versão brasileira de outra coisa.' },
          { title: 'O risco da inconsistência entre vertentes', body: null,                                                                                                                                                                                       guard: 'Cada vertente deve soar como filha do Bicofino — mesma estética de fundo, adaptada para seu contexto. Um card de atleta On Field e uma proposta Off Field devem ser reconhecivelmente da mesma família.' },
          { title: 'O risco do crescimento sem critério', body: null,                                                                                                                                                                                            guard: 'Crescimento no Bicofino é medido em qualidade de relação, não em número de clientes ativos. Uma lista de espera é preferível a um portfólio diluído.' },
          { title: 'O risco da IA como substituto',       body: null,                                                                                                                                                                                            guard: '"IA ilumina, humanos decidem." Toda entrega final passa pelo filtro de julgamento criativo humano. A IA acelera o caminho; o critério humano valida o destino.' },
        ],
      },
    },

    posicionamento: {
      header: { eyebrow: '// 00.3 · Posicionamento', title: 'Posicionamento' },
      publicoChave: {
        label: '// Público-chave',
        title: 'Público-chave',
        p1: 'O Bicofino não define seu público por faixa etária ou renda. Define por mentalidade.',
        p2: 'O público-chave é formado por pessoas e marcas que entendem que imagem é estratégia, que tempo de relação é ativo, que bom gosto não é subjetivo — é educável e valorizável. São agentes que operam nas camadas superiores de seus respectivos mercados e que buscam parceiros no mesmo nível de exigência que eles.',
        clusters: [
          { label: 'Cluster 1 — O Atleta com Visão de Carreira', tag: '(On Field)', body: 'Jovem talento esportivo que entende que sua trajetória é maior que os contratos que assina. Busca construção de marca pessoal, acesso a mercados internacionais e gestão de imagem com o mesmo rigor com que treina. Vê o Bicofino como sócio estratégico, não como agência.', ref: 'Guilherme Kerchner — 17 anos, Palmeiras, Nike, passaporte italiano. From Palmeiras to the World.' },
          { label: 'Cluster 2 — A Marca que Quer Mais que Exposição', tag: '(Off Field)', body: 'Empresa ou marca que quer que sua conexão com o universo esportivo gere cultura, narrativa e pertencimento — não apenas logo em camisa. Entende ROI mas valoriza percepção. Sabe que a qualidade da associação importa tanto quanto o alcance.', ref: 'Nike, Loro Piana, Piaggio/Vespa — marcas com herança, estética e propósito que se complementam ao universo Bicofino.' },
          { label: 'Cluster 3 — O Cliente Premium Off Field', tag: null, body: 'Empresa ou executivo que precisa de identidade visual, estratégia de marca, consultoria criativa ou acesso a players específicos de mercado no mais alto nível. Sabe que pagar pelo melhor é mais econômico do que corrigir o mediano.', ref: 'BoviChain — empresa de tech no agronegócio premium que entende que sua marca visual precisa refletir o padrão da tecnologia que entrega.' },
          { label: 'Cluster 4 — O Membro do Club', tag: '(Território da Raposa)', body: 'Ver seção Club em Operações.', ref: null },
        ],
        refLabel: 'Perfil de referência:',
      },
      personas: {
        label: '// Buyer Personas',
        title: 'Buyer Personas',
        a: {
          title: 'A — O Talento em Ascensão',
          rows: [
            ['Perfil', 'Atleta de 16–22 anos em clube de primeiro time ou base de grande clube brasileiro. Nike ou outra marca global no horizonte. Família presente e envolvida nas decisões.'],
            ['O que ele quer', 'Entender como transformar performance em carreira internacional. Acesso, não apenas representação.'],
            ['O que ele teme', 'Ser mais um no portfólio de uma agência grande que não vai aprender seu nome.'],
            ['Como o Bicofino fala com ele', 'Direto, sem corporativismo. Autenticidade é tudo. Narrativa concreta, não promessa abstrata.'],
          ],
        },
        b: {
          title: 'B — O Executivo de Marca / Parceiro Estratégico',
          profileLabel: 'Perfil',
          profileText: 'CMO, diretora de marketing ou fundador de empresa premium ou em processo de premiumização. Tem budget e aprovação interna, mas responde por resultado e percepção.',
          wantsLabel: 'O que ele quer — e onde o Bicofino é insubstituível',
          wantsP1: 'O executivo de marca não busca apenas execução criativa ou design de qualidade. Busca o que está fora do alcance da maioria: acesso direto a atletas, celebridades, personalidades e marcas globais que não atendem cold calls. Essa porta existe no Bicofino porque foi construída ao longo de anos com caráter, negociação limpa e relacionamentos conduzidos com ética, respeito genuíno e inteligência de longo prazo.',
          wantsP2: 'Quando o Bicofino conecta uma marca a um atleta, a um influenciador de peso ou a uma personalidade de mercado, a conexão já vem filtrada, contextualizada e estruturada para que todos os lados ganhem. Esse diferencial não se replica: o acesso não está à venda, é consequência de uma rede construída com décadas de presença consistente e caráter inabalável.',
          rows: [
            ['O que ele teme', 'Pagar por entrega que parece premium mas não move agulha de percepção real. Ser apresentado a contatos de segunda linha disfarçados de grandes parcerias.'],
            ['Como o Bicofino fala com ele', 'Linguagem de negócio primeiro, estética depois. ROI traduzido em percepção e métricas tangíveis. Com a segurança de quem sabe que as conexões entregues são genuínas.'],
          ],
        },
        c: {
          title: 'C — O Patriarca do Network',
          rows: [
            ['Perfil', 'Empresário de 45–65 anos, bem-sucedido em setor tradicional (agro, finanças, construção, indústria), que transita entre o mundo corporativo e o do esporte e luxo por afinidade genuína.'],
            ['O que ele quer', 'Pertencer a uma rede de pares de altíssimo nível. Conversas que agregam. Experiências que justificam o padrão de vida que construiu.'],
            ['O que ele teme', 'Vulgaridade disfarçada de exclusividade. Ostentatório demais. Ou invisível demais para justificar o investimento.'],
            ['Como o Bicofino fala com ele', 'Com a elegância de quem pertence ao mesmo universo. Como Consigliere, nunca como vendedor.'],
          ],
        },
      },
      posicMarca: {
        label: '// Posicionamento de Marca',
        title: 'Posicionamento de Marca',
        declaration: {
          title: 'A declaração interna',
          body: 'O Bicofino é o único ecossistema que combina acesso genuíno ao mundo do esporte e do luxo com curadoria estética de nível de atelier e inteligência estratégica de longo prazo. Operamos com poucos para entregar profundo — e essa seletividade é o produto, não a limitação.',
        },
        differentiates: {
          title: 'O que nos diferencia na prática',
          cols: ['Dimensão', 'Mercado comum', 'Bicofino'],
          rows: [
            ['Acesso',             'Contatos disponíveis para qualquer agência',    'Rede construída por décadas, não replicável'],
            ['Volume de clientes', 'Carteira ampla para diluir risco',              'Agenda reduzida por escolha'],
            ['Entrega',            'Execução conforme briefing',                    'Consultoria + execução + antecipação'],
            ['Preço',              'Negociável, pacotes com desconto',              'Fixo, ajuste apenas por escopo'],
            ['Relação',            'Transacional',                                  'Parceria de longo prazo'],
            ['Linguagem',          'Profissional genérica',                         'Atelier premium — sofisticação pela execução'],
            ['IA',                 'Ferramenta de corte de custo',                  'Amplificador criativo — qualidade inalterada'],
            ['Cobertura',          'Local ou regional',                             'Multicultural: Brasil · Europa · EUA'],
          ],
        },
      },
      internacionalidade: {
        label: '// Internacionalidade',
        title: 'Internacionalidade',
        intro: 'O Bicofino opera em três idiomas principais — português, inglês e italiano — e essa não é uma decisão apenas linguística. É um posicionamento de mundo.',
        whyThree: {
          title: 'Por que esses três idiomas',
          p1: 'Português é a língua de origem e de raiz. É onde o Bicofino nasceu, onde seus primeiros atletas treinaram, onde suas primeiras conexões foram construídas. É a língua da autenticidade.',
          p2: 'Inglês é a língua do jogo global. Clubes europeus, marcas globais, scouts internacionais e investidores falam inglês. É a língua do mercado que o Bicofino quer alcançar — e já alcança. Todo material de posicionamento de atletas para o mercado europeu, apresentações institucionais e comunicação com parceiros internacionais opera em inglês americano.',
          p3: 'Italiano é a língua da herança e do refinamento. A conexão com a Itália é genuína: atletas com passaporte italiano, parceiros de marca com herança italiana (Piaggio/Vespa, Loro Piana, Brunello Cucinelli), e uma sensibilidade estética que compartilha os mesmos códigos — couro, artesanato, permanência, forma sobre velocidade. O italiano não é apenas um idioma de comunicação; é uma referência cultural que molda o gosto Bicofino.',
        },
        bond: {
          title: 'O modelo James Bond de internacionalidade',
          p1: 'Há uma figura que captura com precisão o modo Bicofino de transitar no mundo: James Bond.',
          p2: 'Bond não é de um lugar só. Entra em qualquer sala, em qualquer país, em qualquer idioma — e pertence. Não está nunca no lugar errado, nunca sem propósito. É chamado quando o problema é impossível demais para o caminho convencional. Mantém a elegância e o raciocínio calibrado mesmo sob pressão extrema. Adapta o estilo ao contexto sem perder a identidade.',
          p3: 'Esse é o padrão de internacionalidade que o Bicofino busca: a capacidade de estar em Milão, em Londres ou em São Paulo com a mesma desenvoltura — absorvendo o melhor de cada cultura para operar com vantagem onde quer que esteja.',
        },
        practice: {
          title: 'O que isso significa na prática',
          body: 'Materiais, propostas e comunicações são produzidos no idioma mais estratégico para cada contexto. Nunca tradução automática. Sempre adaptação cultural com critério.',
        },
      },
    },

    nucleo: {
      header: { eyebrow: '// 00.4 · Núcleo da Marca', title: 'Núcleo da Marca' },
      direcao: {
        label: '// Direção',
        title: 'Unlike Any Other.',
        p1: 'Esta tagline não é slogan. É posição.',
        unlike: { label: 'Unlike', text: '— somos diferentes, mas a diferença não é proclamada, é percebida. Diferença pela execução, não pela promessa.' },
        any:    { label: 'Any',    text: '— o padrão de comparação é amplo. O Bicofino está fora da categoria de qualquer coisa que exista nesse cruzamento.' },
        other:  { label: 'Other',  text: '— tudo aquilo que é genérico, padronizado, replicável. O Bicofino existe fora dessa categoria.' },
        metaphor: {
          title: 'A metáfora central',
          p1: 'O quarteto de câmara íntimo. Não o show de estádio.',
          p2: 'Num quarteto de câmara, cada nota de cada instrumento importa. O silêncio entre as notas importa. A acústica da sala importa. O público escolhido para estar ali importa. O objetivo nunca é atingir o máximo de gente — é atingir as pessoas certas com a máxima intensidade.',
        },
      },
      visaoPropósito: {
        label: '// Visão e Propósito',
        title: 'Visão e Propósito',
        vision: { title: 'Visão', body: 'Ser reconhecido como o ecossistema de referência em conexão, curadoria e criatividade aplicadas ao universo do esporte e do luxo — no Brasil e no circuito internacional.' },
        purpose: { title: 'Propósito', body: 'Transformar carreiras, marcas e momentos em patrimônio de longo prazo, por meio de conexões genuínas, curadoria radical e execução de nível de atelier.' },
      },
      quatroCs: {
        label: '// Os 4 Cs',
        title: 'Os 4 Cs — O Filtro de Toda Decisão',
        intro: 'Toda decisão, entrega e projeto Bicofino pode ser lido através dessas quatro lentes. São questão de honra. A ordem importa.',
        footerMuted: 'Ao receber qualquer demanda, avalie: Esta conexão envolve os players certos? Está dentro do padrão de curadoria do Bicofino? A execução proposta é a mais simples e elegante possível? Estamos aprofundando a relação com o cliente ou apenas entregando uma peça?',
        items: [
          { label: '1. CONNECT — O primeiro e mais fundamental',         body: 'A habilidade central e mais rara do Bicofino. Reunir e engajar dois ou mais players — pessoas, negócios, atletas, celebridades, marcas — que não estão ao alcance da maioria. Acesso genuíno a decisores, figuras de influência e marcas premium, combinado com a inteligência de criar encontros que geram valor real para todos os lados.', body2: 'CONNECT é o principal diferencial competitivo do Bicofino. Cada conexão foi construída com anos de caráter, presença consistente e negociação limpa. Nenhuma delas é superficial, nenhuma delas é descartável.', rule: 'Regra fundamental: toda conexão feita pelo Bicofino deve beneficiar todos os lados da equação. A ética da conexão é inegociável.' },
          { label: '2. CURATE — O filtro que define o padrão',            body: 'Bom gosto e exclusividade acima de tudo. O Bicofino não apresenta opções — apresenta a escolha certa, filtrada por critério estético e estratégico. Isso vale para clientes aceitos, parceiros escolhidos, projetos assumidos, referências usadas e entregas feitas. Dizer não é parte da curadoria, não uma limitação.', body2: null, rule: null },
          { label: '3. CREATE — Consequência natural dos dois primeiros', body: 'Aparece como resultado direto de CONNECT e CURATE, e se manifesta na execução dos projetos. O padrão interno é buscar a saída mais simples e elegante possível, com o menor gasto de recursos — tempo, dinheiro, atenção. Criatividade aqui é precisão cirúrgica na escolha da melhor saída, não volume de ideias.', body2: null, rule: null },
          { label: '4. CONSULT — A profundidade que cresce com o tempo', body: 'O Bicofino serve como guia dos seus clientes — não apenas entregando resultados, mas aprofundando o relacionamento ao longo do tempo. A postura é de parceiro estratégico de longo prazo: conhecer o negócio do cliente em profundidade, antecipar necessidades, orientar decisões além do escopo imediato. O valor cresce com o tempo de relação.', body2: null, rule: null },
        ],
      },
      arquetipos: {
        label: '// Arquétipos',
        title: 'Arquétipos',
        triadTitle: 'A Tríade',
        triadIntro: 'A identidade do Bicofino se ancora em três arquétipos complementares — cada um operando num registro distinto, juntos formando o caráter único da marca.',
        items: [
          { title: 'O Soberano (Primário)',  ref: 'Hermès, Don Corleone, o chefe de Estado que não precisa levantar a voz.', body: 'O Soberano governa pelo critério. Tem o mais alto padrão e não negocia. A autoridade não é proclamada — é reconhecida. Conhece as regras melhor do que qualquer um, e por isso sabe exatamente quando e como dobrá-las com elegância.', body2: 'No Bicofino, o Soberano aparece na postura de curadoria absoluta: na seletividade de clientes, na recusa elegante, na agenda limitada. Aparece no silêncio calculado de uma marca que não precisa de barulho para ser percebida.', never: 'O que o Soberano nunca faz: Se explica demais. Pede desculpas pelo padrão. Cede sob pressão de mercado.' },
          { title: 'O Sábio (Secundário)',   ref: 'Ray Dalio, Mozart, o Consigliere que fala menos e acerta mais.', body: 'O Sábio observa antes de agir. Acumula perspectiva e a entrega no momento exato — não antes, não depois. Não tem pressa de provar que sabe; a profundidade da análise faz isso por ele.', body2: 'No Bicofino, o Sábio aparece na qualidade da consultoria estratégica, na leitura de mercado de longo prazo, na integração de IA como ferramenta de amplificação do julgamento humano.', never: 'O que o Sábio nunca faz: Entrega análise sem síntese. Fala por falar. Confunde volume de informação com sabedoria.' },
          { title: 'O Criador (Terciário)', ref: 'Steve Jobs, a Raposa Bicofino, o artista que também é editor implacável.', body: 'O Criador vê possibilidades onde outros veem restrições. Produz com obsessão pelos detalhes. Mas o Criador Bicofino é também editor. Sabe que a diferença entre o mediano e o excelente é o que você decide tirar, não o que você adiciona.', body2: 'No Bicofino, o Criador aparece no Studio, no Bicofino Inspired, nas assinaturas animadas, nos media kits, nas identidades visuais. Aparece em cada entrega que foi trabalhada até o ponto de não ter mais nada para cortar.', never: 'O que o Criador nunca faz: Entrega volume sem edição. Confunde ocupação com produtividade criativa. Valoriza processo mais que resultado.' },
        ],
        foxBond: {
          title: 'A Raposa e James Bond — O Arquétipo da Mobilidade',
          p1: 'A Raposa Bicofino e James Bond compartilham o mesmo DNA de comportamento — e juntos formam a camada de mobilidade e adaptação da marca.',
          p2: 'A Raposa é ágil, inteligente e elegante sob pressão. Aparece nos momentos certos, desaparece quando não há nada a acrescentar. Nunca está no lugar errado. Observa antes de agir. Nunca latidora.',
          p3: 'Bond amplia essa leitura para a dimensão internacional: transita em qualquer lugar do mundo sem perder a identidade. Entra em qualquer sala — em qualquer idioma, em qualquer cultura — e pertence. É chamado quando o problema é impossível demais para o caminho convencional. Mantém elegância e raciocínio calibrado mesmo sob pressão extrema. Adapta o método ao contexto. Nunca o caráter.',
          p4: 'Esses dois arquétipos, sobrepostos, definem como o Bicofino se move no mundo: com presença calculada, propósito claro e elegância que não precisa anunciar a si mesma.',
        },
        semanticPanel: {
          title: 'Painel Semântico dos Arquétipos',
          rows: [
            ['Metáforas Bicofino', 'A raposa (agilidade e inteligência), o quarteto de câmara (precisão e intimidade), o atelier (artesanato e exclusividade), o Consigliere (confiança e acesso), o couro patinado (tempo e qualidade), o diamond ✦ (filtro e precisão), o campo de jogo à noite (tensão e beleza simultâneas), a piazza italiana (encontro, elegância e tempo de qualidade), Bond atravessando a fronteira (mobilidade com propósito).'],
            ['Referências culturais', 'Hermès (heritage e recusa ao óbvio), LVMH (arquitetura de marca), Brunello Cucinelli (humanismo e luxo com ética), Audemars Piguet (artesanato que transcende gerações), Loro Piana (silêncio como sofisticação), The Row (minimalismo como posição), James Bond (elegância sob pressão, mobilidade internacional), Don Corleone (poder discreto e relação de confiança), Mozart (gênio com disciplina de forma), Steve Jobs (estética como estratégia), Johnnie Walker Striding Man (mascote como ativo de marca de longo prazo), o futebol italiano dos anos 80 e 90 (quando a escassez de vagas para estrangeiros colocava os melhores do mundo em times de menor expressão — Zico na Udinese — e a elegância tática definia o jogo antes da velocidade).'],
            ['Evitar', 'O maestro que pede palmas. O guru que vende método. A agência que promete transformação em 30 dias.'],
          ],
        },
      },
      craft: {
        label: '// Craft',
        title: 'Craft',
        intro: 'O Craft do Bicofino não são valores de parede de escritório. São comportamentos observáveis em cada entrega, cada reunião, cada interação com cliente ou parceiro.',
        items: [
          ['Obsessão pelo Detalhe', 'O que parece perfeito ao olhar descuidado tem algo a ser refinado. Sempre. O Bicofino encontra esse algo e corrige antes de entregar.'],
          ['Beleza com Inteligência', 'Estética sem estratégia é decoração. Estratégia sem estética é planilha. O Bicofino opera na interseção.'],
          ['Entrega além do esperado', 'O briefing é o piso, não o teto. O cliente pede o que sabe pedir; o Bicofino entrega o que o cliente ainda não sabia que precisava.'],
          ['Simplicidade radical', 'A versão mais elegante de qualquer coisa é sempre a mais simples que ainda funciona. Cortar é a habilidade mais difícil e mais valiosa.'],
          ['Contundência com elegância', 'Dizer algo difícil com precisão e sem crueldade. Ter uma posição e sustentá-la. O Bicofino não hesita.'],
          ['Tecnologia a serviço da criatividade', 'IA, dados e ferramentas digitais amplificam o julgamento humano — nunca o substituem.'],
          ['O Toque Artesanal', 'O pano de fundo da comunicação Bicofino segue sempre as quatro qualidades visuais centrais: minimalismo sofisticado, quiet luxury, hierarquia clara, permanência sobre tendência. Mas o que diferencia o Bicofino de qualquer sistema de marca bem executado é o que acontece pontualmente e com intenção: um post de atleta que rompe o grid de forma calculada, um tratamento artístico inesperado numa campanha, uma peça que surpreende porque ninguém esperava aquele nível de cuidado humano num contexto digital. Esses momentos não são frequentes — e não devem ser. Aparecem estrategicamente, quando a ocasião justifica, e é exatamente essa raridade que os torna poderosos. O toque artesanal é o diferencial estético do Bicofino. O fator humano que não se replica em escala.'],
        ],
      },
      proxies: {
        label: '// Proxies e Personas',
        title: 'Proxies e Personas',
        intro: 'Proxies são figuras reais ou ficcionais que ajudam a calibrar o padrão interno de decisão. Quando em dúvida sobre tom, postura ou escolha, pergunte: o que essas referências fariam?',
        items: [
          { name: 'Hermès',              use: 'Para decisões de curadoria e padrão de produto. A Hermès recusa tendência. Lança quando está pronto. Sua fila de espera é estratégia, não coincidência.',                                                                                                                                                                                  arrow: 'O Bicofino também recusa o que está em moda se não é verdadeiro para a marca.' },
          { name: 'Brunello Cucinelli',  use: 'Para decisões sobre humanismo e ética do luxo. Cucinelli construiu um império sobre a crença de que lucro e dignidade humana coexistem — que a qualidade máxima e o respeito ao processo são a mesma coisa.',                                                                                                                            arrow: 'O Bicofino entende que excelência e ética de relacionamento não são trade-offs.' },
          { name: 'Audemars Piguet',     use: 'Para decisões de herança e artesanato de longo prazo. A AP não explica por que seus relógios custam o que custam — a complexidade interna, visível apenas para quem sabe olhar, faz esse trabalho.',                                                                                                                                    arrow: 'O Bicofino não precisa explicar seu valor. A profundidade da entrega faz isso.' },
          { name: 'Don Corleone',        use: 'Para decisões de relacionamento e poder de rede. O Padrinho não negocia publicamente. Suas relações são de longa data e mútua conveniência. Quando faz um favor, não cobra imediatamente.',                                                                                                                                              arrow: 'O Bicofino constrói relações onde o valor cresce com o tempo, não se esgota na primeira transação.' },
          { name: 'Steve Jobs',          use: 'Para decisões de produto e execução. Jobs eliminava features até o produto ser apenas o essencial mais bem executado possível.',                                                                                                                                                                                                          arrow: 'O Bicofino elimina o supérfluo até restar apenas o necessário — executado impecavelmente.' },
          { name: 'James Bond',          use: 'Para decisões de mobilidade, presença e adaptação. Bond entra em qualquer sala do mundo e pertence. Resolve o impossível com elegância. Mantém o caráter mesmo quando o método muda.',                                                                                                                                                  arrow: 'O Bicofino transita em qualquer mercado, em qualquer idioma, sem perder a identidade.' },
          { name: 'A Raposa Bicofino',   use: 'A mascote da marca. Ágil, inteligente, elegante sob pressão. Aparece quando tem algo a acrescentar; desaparece quando não tem.',                                                                                                                                                                                                        arrow: 'O que a Raposa faria? O que ela vestiria? Onde ela estaria?' },
        ],
      },
    },

    verbal: {
      header: { eyebrow: '// 00.5 · Universo Verbal', title: 'Universo Verbal' },
      manifesto: {
        label: '// Manifesto',
        title: 'Quem decide o jogo raramente grita.',
        paras: [
          'Há uma geração inteira ensinada a acreditar que visibilidade é valor. Que presença é poder. Que se você não está sendo visto, não está acontecendo.',
          'O Bicofino discorda.',
          'Os negócios que mais importam acontecem em salas pequenas. As conexões que movem carreiras são feitas por pessoas que se conhecem de verdade — não por algoritmos de rede social. As marcas que duram décadas não perseguem tendências; elas as ignoram com elegância calculada.',
          'Vivemos numa era em que qualquer um pode parecer sofisticado. Filtros, templates, conteúdo gerado por IA em escala industrial — a superfície nunca foi tão acessível. Por isso, paradoxalmente, a profundidade nunca foi tão rara. E tão valiosa.',
          'O Bicofino foi construído sobre essa crença: que o que dura é o que tem substância. Que o acesso real não se compra, se constrói — com tempo, com critério, com a disposição de dizer não para o que não merece sim. Que beleza e inteligência não são opostos — são a mesma coisa quando a execução está no nível certo.',
          'Não atendemos a todos. Cada relação que construímos exige profundidade. Cada projeto que assumimos exige o melhor que temos. Uma agenda ilimitada é uma agenda diluída.',
          'Fomos criados na tensão entre três culturas. Da garra e autenticidade brasileira. Da escala e precisão do mundo anglo-saxão. Da herança e do refinamento italiano. Essa mistura não é acidente — é vantagem.',
          'O esporte é o nosso território de origem não porque é grande, mas porque revela caráter. Numa partida, não há onde se esconder. O talento aparece sob pressão. A preparação decide antes do apito inicial. O Bicofino leva esse mesmo rigor para tudo que faz: cada entrega é uma performance que deixa registro.',
          'Conexão. Curadoria. Criação. Consultoria.',
          'Quatro palavras. Um método. Uma obsessão.',
        ],
        tagline: 'Unlike Any Other.',
      },
      tomDeVoz: {
        label: '// Tom de Voz',
        title: 'Tom de Voz',
        intro: 'O tom de voz do Bicofino é determinado por quatro eixos que precisam coexistir em qualquer comunicação da marca.',
        weakLabel: 'FRACO',
        bicofinoLabel: 'BICOFINO',
        axes: [
          { axis: 'Autoridade sem arrogância', body: 'O Bicofino tem ponto de vista e o sustenta. Não pede licença para ter uma posição. Mas nunca a impõe com volume — a impõe com precisão.', weak: '"Somos líderes em branding esportivo premium."', right: '"Escolhemos os projetos em que podemos entregar o melhor que sabemos fazer."' },
          { axis: 'Sofisticação pela execução, não pela autodeclaração', body: 'A qualidade de uma entrega Bicofino dispensa apresentação. O texto bem escrito, o visual bem editado, a proposta bem estruturada — esses elementos comunicam sofisticação antes de qualquer palavra sobre sofisticação ser dita.', weak: '"Uma abordagem premium e exclusiva para sua marca."', right: 'Escreva o briefing tão bem que o cliente não precise de adjetivos para saber o que está recebendo.' },
          { axis: 'Direto, nunca rude', body: 'O Bicofino vai ao ponto. Não usa rodeios, não usa enchimento, não usa jargão de agência para parecer mais técnico. Mas ir ao ponto com elegância é diferente de ser abrupto.', weak: null, right: null },
          { axis: 'Específico, nunca genérico', body: 'Superlativos vazios são o oposto do padrão Bicofino. Preferir sempre o concreto, o específico, o verificável.', weak: '"Experiências únicas e exclusivas para clientes de altíssimo padrão."', right: '"Um concerto privado de Lang Lang. Um lugar intimista. Poucas pessoas. Curado pelo Bicofino."' },
        ],
        restrictions: {
          title: 'Restrições de escrita — filtros obrigatórios',
          p1: 'A construção "Não é X. É Y." é proibida no Bicofino.',
          p2: 'Esta é a restrição verbal mais importante do Brand System. A estrutura — "Premium, não caro.", "Estratégia, não execução.", "Não é uma agência. É um atelier." — foi usada em excesso por marcas que querem soar sofisticadas mas precisam declarar essa sofisticação porque não a demonstram. O efeito hoje é exatamente o oposto do pretendido: em vez de força, sinaliza automação; em vez de posição, sinaliza insegurança.',
          p3: 'O padrão Bicofino exige frases que afirmem sem precisar negar, que demonstrem sem precisar explicar, que confiem no leitor para completar o raciocínio. A inteligência do texto está em nunca precisar dizer o que não é — apenas mostrar o que é, com precisão suficiente para que o contraste apareça sozinho.',
          p4: 'Esta restrição vale para todo tipo de output: copy de marca, posts de Instagram, propostas, manifestos, playbooks e análises estratégicas.',
          othersLabel: 'Outras restrições',
          items: [
            'Superlativos sem referência concreta ("o mais", "o melhor", "o único")',
            'Urgência artificial ("vagas limitadas", "por tempo limitado")',
            'Corporativês ("ecossistema robusto", "soluções integradas", "entrega de valor")',
            'Elogiar o cliente pela pergunta antes de responder',
            'Usar "genuíno", "honestamente" ou "sinceramente" como intensificadores',
          ],
        },
      },
      vocabulario: {
        label: '// Vocabulário',
        title: 'Vocabulário',
        bicofinoWords: {
          title: 'Palavras do universo Bicofino',
          items: [
            ['Curadoria',   'Escolha deliberada e criteriosa. Mais que seleção; é edição com padrão.'],
            ['Atelier',     'O modo de operação. Artesanal em escala reduzida, irrepetível em profundidade.'],
            ['Consigliere', 'O conselheiro de confiança. Acesso ao círculo decisório, com discrição absoluta.'],
            ['Portfólio',   'Relações de longo prazo com padrão curado. Nunca apenas clientes.'],
            ['Legado',      'O que fica depois da entrega. Toda ação Bicofino deve deixar algo que cresce com o tempo.'],
            ['Acesso',      'O ativo mais raro. Construído com anos, entregue com precisão.'],
            ['Quarteto',    'A metáfora do tamanho ideal de operação. Poucos. Precisos. Essenciais.'],
            ['Dossiê',      'O formato de proposta Bicofino. Documento que conta uma história estratégica, não uma lista de serviços.'],
            ['Raposa',      'O mascote. O ponto de vista interno. Ágil, inteligente, invisível quando não há nada a acrescentar.'],
            ['Diamond',     'O símbolo ✦. A marca isolada. O filtro com forma: quatro pontos de precisão.'],
            ['On Field',    'Tudo relativo ao atleta em campo e à sua performance integral.'],
            ['Off Field',   'Tudo que existe fora do campo: marca, negócio, imagem, legado, conexões.'],
          ],
        },
        avoidWords: {
          title: 'Palavras a evitar',
          cols: ['Evitar', 'Por quê', 'Alternativa'],
          rows: [
            ['Premium (isolado)',    'Overused, perdeu significado',       'Descreva o padrão em vez de nomeá-lo'],
            ['Exclusivo',           'Idem',                                'Diga o que torna a experiência singular'],
            ['Inovador',            'Jargão vazio',                        'Especifique o que é diferente'],
            ['Soluções',            'Corporativês',                        'Projetos, entregas, trabalho'],
            ['Parceria estratégica','Clichê B2B',                          'Relação de longo prazo, aliança'],
            ['Transformador',       'Promessa sem lastro',                 'Especifique o que muda e como'],
            ['Genuíno',             'Intensificador desgastado',           'Demonstre no texto, não declare'],
          ],
        },
      },
      territorio: {
        label: '// Território de Palavras',
        title: 'Território de Palavras',
        intro: 'O território verbal do Bicofino se move em três camadas semânticas. Atenção à terceira — quando evocada no contexto errado, torna-se clichê. Use com critério e parcimônia.',
        layers: [
          { layer: 'Camada 1 — Luxo com Substância',                              body: 'Herança, craft, patina, tempo, argila, linho, couro, madeira nobre, silêncio, forma, peso, permanência. A piazza ao entardecer. O couro que melhora com o uso. O atelier que recusa a pressa.' },
          { layer: 'Camada 2 — Inteligência Estratégica',                         body: 'Ângulo, perspectiva, filtro, critério, mapa, rota, janela, acesso, círculo, sala pequena, conversa que muda direção, rede construída com décadas.' },
          { layer: 'Camada 3 — Esporte como Metáfora (usar com extrema parcimônia)', body: 'Campo, apito, treino, pressão, preparação, timing, escalação. Evocações esportivas têm força quando surgem de forma inesperada num contexto que não as pede — e perdem toda a força quando se tornam o registro padrão. Metáforas de futebol fora do contexto certo soam bregas. Reserve-as para momentos em que o contraste gera impacto.' },
        ],
      },
      glossario: {
        label: '// Glossário',
        title: 'Glossário',
        items: [
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
        ],
      },
    },
  },

  en: {
    footer: 'Brand System — Bicofino Group SA · v3.0 · São Paulo, BR · May 2026',

    cover: {
      tagline: 'The living system that organizes, protects and expands the Bicofino universe.',
      version: 'v3.0 · São Paulo, BR · May 2026',
    },

    indice: {
      eyebrow: '// 00.1',
      title: 'Index',
      complement: 'Visual Universe, Visual System and Operations — see supplementary document.',
      groups: [
        { title: 'Foundations',    items: ['Overview', 'The Origin of the Name', 'Why We Exist', 'Principles', 'Risks & Guardrails'] },
        { title: 'Positioning',    items: ['Key Audience', 'Buyer Personas', 'Brand Positioning', 'Internationality'] },
        { title: 'Brand Core',     items: ['Direction', 'Vision & Purpose', 'The 4 Cs — The Filter for Every Decision', 'Archetypes', 'Craft', 'Proxies & Personas'] },
        { title: 'Verbal Universe',items: ['Manifesto', 'Voice & Tone', 'Vocabulary', 'Semantic Territory', 'Glossary'] },
      ],
    },

    fundamentos: {
      header: { eyebrow: '// 00.2 · Foundations', title: 'Foundations' },
      overview: {
        sub: { label: '// Overview', title: 'Unlike Any Other.' },
        p1: 'You are about to enter a system that was not made for everyone. This document is the operational code of Bicofino — the internal reference that governs how this brand thinks, decides, expresses itself and exists in the world. It brings together, in one place, everything that defines the Bicofino universe: from philosophical principles to visual criteria, from the manifesto to how to answer the phone.',
        p2: 'This system exists to ensure three fundamental things:',
        clarity:     { label: 'Clarity',     text: '— everyone understands what Bicofino represents.' },
        consistency: { label: 'Consistency', text: '— identity remains coherent in any context.' },
        evolution:   { label: 'Evolution',   text: '— the system can grow without losing its essence.' },
        forWhom: {
          title: 'Who this system is for',
          body: 'Designers, content producers, copywriters, production partners, collaborators from any vertical, and any brand or person operating under the Bicofino umbrella. If you create something in the name of Bicofino, this document is your mandatory starting point.',
        },
        living: {
          title: 'A living system',
          body: 'This Brand System is not static. Bicofino grows, and this document grows with it. Each update represents a refinement of understanding what it means to operate at the highest level — with beauty, intelligence, and obsession for detail.',
        },
      },
      origem: {
        label: '// The Origin of the Name',
        title: 'Bico. Fino.',
        p1: 'Imagine a funnel. Now imagine that the tip of that funnel is so narrow that only what truly deserves to pass through does. Every partner, every client, every project enters from the top — and only those who passed the criterion make it to the other side. There are no shortcuts, no exceptions. The exit is also narrow: relationships here are built to last.',
        p2: 'That is the first meaning of the name. Maximum curation at the entry. Maximum depth in the relationship.',
        p3: 'There is a second meaning, more subtle, that lives within the world of football — and says a great deal about how Bicofino thinks about excellence.',
        p4: "Striking with the toe ('bico') is generally the gesture of someone still learning. Awkward. Predictable. Little power, less control. But watch what happens when the same movement comes from the boots of a Ronaldo or a Romário. The toe-poke becomes a weapon. It leaves before the goalkeeper can process it. It surprises because the movement is not expected. What seemed like a limitation transforms, in the right hands, into elegance and surgical precision.",
        p5: 'The name carries both sides with equal weight:',
        filter:    { label: 'The filter',    text: '— rigor and maximum discernment in everything that enters the Bicofino sphere of action.' },
        execution: { label: 'The execution', text: '— talent and precision that transform the simple into the singular.' },
      },
      porQue: {
        label: '// Why We Exist',
        title: 'The question that makes no concessions',
        p1: 'The market is full of agencies, management firms, studios and consultancies. Most promise results. Many deliver product. Few build something that lasts.',
        p2: 'Bicofino exists because it believes that the combination of genuine access, radical aesthetic discernment, and applied strategic intelligence is scarce. Scarce not for lack of capable people — but because most commercial operations choose volume, speed and standardization over depth, curation and singularity.',
        p3: 'The question that founded Bicofino was simple: what happens when you apply the standards of a luxury maison to an ecosystem of connections, talents and creativity?',
        p4: 'The answer is what you are reading now.',
        different: {
          title: 'What Bicofino does differently',
          p1: 'Bicofino curates the market — choosing the right players, the right projects, the right moments. Selectivity is the tool. Time of relationship is the asset. Trust is the most valuable product delivered.',
          p2: 'We operate at a rare intersection: where the world of sport meets luxury, where strategy meets aesthetics, where access meets good taste. This crossroads was built with decades of consistent work, clean negotiations and genuine relationships — and it is what positions us differently from anything else in the market.',
        },
        forWhom: {
          title: 'Who Bicofino is for',
          p1: 'Bicofino exists for people who understand that image, reputation and presence are assets — and that executing those assets requires partners who are themselves a reference in what they do.',
          p2: 'We exist for the athlete who wants their career to be larger than the games they play. For the brand that wants its sports connections to generate culture, not just exposure. For the client who understands that paying less and expecting more is an equation that never adds up.',
        },
        notForWhom: {
          title: 'Who Bicofino is not for',
          p1: 'Bicofino does not exist for those seeking an option. Does not exist for those who trade quality for urgency, or elegance for convenience. Does not exist for those who treat brand as an operational cost.',
          p2: 'Those who need a lot for little, quickly and without discernment, will find other doors open. Ours has a waiting list — by choice.',
        },
      },
      principios: {
        label: '// Principles',
        title: 'Principles',
        intro: 'Principles are decision and action criteria that function as a coherence axis over time. At Bicofino, principles are not decorative values on a presentation slide — they are real filters that govern every delivery, every client choice and every word produced.',
        howToApply: 'How to apply this principle',
        items: [
          {
            title: 'The Connection Principle — The access that took years to build',
            paras: [
              "Bicofino's rarest asset is not technical competence, aesthetics or methodology. It is access. Real access, earned over years of consistent presence, character and negotiations conducted with ethics and mutual respect. Decision-makers, athletes, personalities, global brands and celebrities beyond the reach of most — these connections are the house's gold.",
              'Connection is the first principle because everything begins here. Without it, curation, creativity and consulting lose the ground in which they are planted.',
            ],
            items: [
              'Every connection made by Bicofino must generate value for all sides — it is never a one-way transaction.',
              'The relationship is treated as a long-term asset. Never as a project tool.',
              'The network was built with character. Any use of it that compromises a partner\'s trust is unacceptable.',
              'When presenting a connection, context matters as much as the contact. Present with intelligence and purpose.',
            ],
          },
          {
            title: 'The Curation Principle — Saying no is part of the work',
            paras: [
              'Curation is the ability to filter before presenting. Bicofino does not offer options — it presents the right choice, after rigorous aesthetic and strategic discernment. This applies to accepted clients, chosen partners, assumed projects, used references and completed deliveries.',
              'Saying no is the most sophisticated exercise of good taste. A full schedule is not a sign of success — it is a sign of absent discernment. The size of the portfolio is not our metric; the quality of each relationship is.',
            ],
            items: [
              'Before accepting any project, ask: does this strengthen or dilute what Bicofino represents?',
              'Present one solution, not a menu.',
              'Reduce scope when necessary. Never reduce standard.',
              'Treat a refusal as an act of service to the client — you protect them from a mediocre delivery.',
            ],
          },
          {
            title: 'The Elegance Principle — Simple, never simplistic',
            paras: [
              'The most intelligent solution is always the most economical — in words, in visual elements, in visible effort. Elegance is precision. It is arriving at the point with the least possible waste of attention, resources and time.',
            ],
            items: [
              'Cut the superfluous before delivering. The client does not need to see the effort — they need to feel the result.',
              'Prefer one exact sentence over one correct paragraph.',
              'Prefer one precise visual element over a rich composition.',
              'Sophistication and density are different things.',
            ],
          },
          {
            title: 'The Depth Principle — Few, well',
            paras: [
              'Bicofino operates like a chamber quartet, not a stadium show. In a quartet, every note from every musician matters. Every relationship built with a client is a relationship of deep knowledge, not transactional service.',
            ],
            items: [
              'Know the client beyond the brief. Know the business, the ambition, what they do not say.',
              'Do not treat projects as isolated tasks — treat them as chapters of a long-term relationship.',
              'Deliver beyond what was asked, with the elegance of someone who knows the limit of excess.',
            ],
          },
        ],
      },
      riscos: {
        label: '// Risks & Guardrails',
        title: 'Risks & Guardrails',
        items: [
          { title: 'The self-declaration risk',               body: 'The greatest risk of a premium brand is starting to proclaim what it should demonstrate. The sophistication that needs to be declared has not been earned.',                                       guard: 'Before publishing any communication, ask: does this show or say? Always prefer to show.' },
          { title: 'The imitation risk',                      body: 'Bicofino has references — and there is wisdom in that. The danger is when the reference becomes pastiche.',                                                                                          guard: 'References exist to calibrate standard, not to be replicated. Bicofino must sound like Bicofino, not like the Brazilian version of something else.' },
          { title: 'The cross-vertical inconsistency risk',   body: null,                                                                                                                                                                                                guard: 'Each vertical must sound like a child of Bicofino — same underlying aesthetic, adapted to its context. An On Field athlete card and an Off Field proposal must be recognizably from the same family.' },
          { title: 'The growth-without-discernment risk',     body: null,                                                                                                                                                                                                guard: 'Growth at Bicofino is measured in quality of relationship, not number of active clients. A waiting list is preferable to a diluted portfolio.' },
          { title: 'The AI-as-substitute risk',               body: null,                                                                                                                                                                                                guard: '"AI illuminates, humans decide." Every final delivery passes through the filter of human creative judgment. AI accelerates the path; human discernment validates the destination.' },
        ],
      },
    },

    posicionamento: {
      header: { eyebrow: '// 00.3 · Positioning', title: 'Positioning' },
      publicoChave: {
        label: '// Key Audience',
        title: 'Key Audience',
        p1: 'Bicofino does not define its audience by age group or income. It defines by mindset.',
        p2: 'The key audience is formed by people and brands who understand that image is strategy, that relationship time is an asset, that good taste is not subjective — it is educable and valuable. These are agents who operate in the upper layers of their respective markets and who seek partners at the same level of exigence as themselves.',
        clusters: [
          { label: 'Cluster 1 — The Athlete with Career Vision', tag: '(On Field)', body: 'Young sports talent who understands their trajectory is larger than the contracts they sign. Seeks personal brand building, access to international markets and image management with the same rigor with which they train. Sees Bicofino as a strategic partner, not an agency.', ref: 'Guilherme Kerchner — 17 years old, Palmeiras, Nike, Italian passport. From Palmeiras to the World.' },
          { label: 'Cluster 2 — The Brand That Wants More Than Exposure', tag: '(Off Field)', body: 'Company or brand that wants its connection with the sports universe to generate culture, narrative and belonging — not just a logo on a shirt. Understands ROI but values perception. Knows that the quality of the association matters as much as the reach.', ref: 'Nike, Loro Piana, Piaggio/Vespa — brands with heritage, aesthetics and purpose that complement the Bicofino universe.' },
          { label: 'Cluster 3 — The Premium Off Field Client', tag: null, body: 'Company or executive who needs visual identity, brand strategy, creative consulting or access to specific market players at the highest level. Knows that paying for the best is more economical than correcting the mediocre.', ref: 'BoviChain — premium agribusiness tech company that understands its visual brand must reflect the standard of the technology it delivers.' },
          { label: 'Cluster 4 — The Club Member', tag: '(Raposa Territory)', body: 'See Club section in Operations.', ref: null },
        ],
        refLabel: 'Reference profile:',
      },
      personas: {
        label: '// Buyer Personas',
        title: 'Buyer Personas',
        a: {
          title: 'A — The Rising Talent',
          rows: [
            ['Profile',                     'Athlete aged 16–22 in the first team or academy of a major Brazilian club. Nike or another global brand on the horizon. Family present and involved in decisions.'],
            ['What they want',              'To understand how to transform performance into an international career. Access, not just representation.'],
            ['What they fear',              "Being just another name in a large agency's portfolio that won't learn their name."],
            ['How Bicofino speaks with them','Direct, without corporate language. Authenticity is everything. Concrete narrative, not abstract promise.'],
          ],
        },
        b: {
          title: 'B — The Brand Executive / Strategic Partner',
          profileLabel: 'Profile',
          profileText: 'CMO, marketing director or founder of a premium company or one undergoing premiumization. Has budget and internal approval, but answers for results and perception.',
          wantsLabel: 'What they want — and where Bicofino is irreplaceable',
          wantsP1: 'The brand executive is not just looking for creative execution or quality design. They seek what is beyond the reach of most: direct access to athletes, celebrities, personalities and global brands that do not take cold calls. This door exists at Bicofino because it was built over years with character, clean negotiation and relationships conducted with ethics, genuine respect and long-term intelligence.',
          wantsP2: 'When Bicofino connects a brand to an athlete, a high-profile influencer or a market personality, the connection already comes filtered, contextualized and structured so that all sides win. This differentiator cannot be replicated: the access is not for sale, it is the consequence of a network built with decades of consistent presence and unwavering character.',
          rows: [
            ['What they fear',              'Paying for a delivery that looks premium but does not move the needle of real perception. Being presented with second-rate contacts disguised as major partnerships.'],
            ['How Bicofino speaks with them','Business language first, aesthetics second. ROI translated into perception and tangible metrics. With the confidence of those who know the connections delivered are genuine.'],
          ],
        },
        c: {
          title: 'C — The Network Patriarch',
          rows: [
            ['Profile',                     'Businessman aged 45–65, successful in a traditional sector (agriculture, finance, construction, industry), who moves between the corporate world and that of sport and luxury by genuine affinity.'],
            ['What they want',              'To belong to a peer network of the highest level. Conversations that add value. Experiences that justify the standard of living they built.'],
            ['What they fear',              'Vulgarity disguised as exclusivity. Too ostentatious. Or too invisible to justify the investment.'],
            ['How Bicofino speaks with them','With the elegance of someone who belongs to the same universe. As a Consigliere, never as a salesperson.'],
          ],
        },
      },
      posicMarca: {
        label: '// Brand Positioning',
        title: 'Brand Positioning',
        declaration: {
          title: 'The internal declaration',
          body: 'Bicofino is the only ecosystem that combines genuine access to the world of sport and luxury with atelier-level aesthetic curation and long-term strategic intelligence. We operate with few to deliver deep — and this selectivity is the product, not the limitation.',
        },
        differentiates: {
          title: 'What sets us apart in practice',
          cols: ['Dimension', 'Common market', 'Bicofino'],
          rows: [
            ['Access',         'Contacts available to any agency',    'Network built over decades, not replicable'],
            ['Client volume',  'Broad portfolio to dilute risk',       'Reduced schedule by choice'],
            ['Delivery',       'Execution per brief',                  'Consulting + execution + anticipation'],
            ['Price',          'Negotiable, discounted packages',      'Fixed, adjustment by scope only'],
            ['Relationship',   'Transactional',                        'Long-term partnership'],
            ['Language',       'Generic professional',                 'Premium atelier — sophistication through execution'],
            ['AI',             'Cost-cutting tool',                    'Creative amplifier — unchanged quality'],
            ['Coverage',       'Local or regional',                    'Multicultural: Brazil · Europe · USA'],
          ],
        },
      },
      internacionalidade: {
        label: '// Internationality',
        title: 'Internationality',
        intro: 'Bicofino operates in three main languages — Portuguese, English and Italian — and this is not merely a linguistic decision. It is a worldview positioning.',
        whyThree: {
          title: 'Why these three languages',
          p1: 'Portuguese is the language of origin and roots. It is where Bicofino was born, where its first athletes trained, where its first connections were built. It is the language of authenticity.',
          p2: 'English is the language of the global game. European clubs, global brands, international scouts and investors speak English. It is the language of the market Bicofino wants to reach — and already reaches. All athlete positioning materials for the European market, institutional presentations and communications with international partners operate in American English.',
          p3: 'Italian is the language of heritage and refinement. The connection with Italy is genuine: athletes with Italian passports, brand partners with Italian heritage (Piaggio/Vespa, Loro Piana, Brunello Cucinelli), and an aesthetic sensibility that shares the same codes — leather, craftsmanship, permanence, form over velocity. Italian is not just a communication language; it is a cultural reference that shapes Bicofino\'s taste.',
        },
        bond: {
          title: 'The James Bond model of internationality',
          p1: 'There is a figure who captures the Bicofino way of moving through the world with precision: James Bond.',
          p2: 'Bond is not from just one place. He enters any room, in any country, in any language — and belongs. He is never in the wrong place, never without purpose. He is called when the problem is too impossible for the conventional path. He maintains elegance and calibrated reasoning even under extreme pressure. He adapts his style to the context without losing his identity.',
          p3: 'That is the standard of internationality Bicofino seeks: the ability to be in Milan, London or São Paulo with the same ease — absorbing the best of each culture to operate with advantage wherever it finds itself.',
        },
        practice: {
          title: 'What this means in practice',
          body: 'Materials, proposals and communications are produced in the most strategic language for each context. Never automatic translation. Always cultural adaptation with discernment.',
        },
      },
    },

    nucleo: {
      header: { eyebrow: '// 00.4 · Brand Core', title: 'Brand Core' },
      direcao: {
        label: '// Direction',
        title: 'Unlike Any Other.',
        p1: 'This tagline is not a slogan. It is a position.',
        unlike: { label: 'Unlike', text: '— we are different, but the difference is not proclaimed, it is perceived. Difference through execution, not through promise.' },
        any:    { label: 'Any',    text: '— the frame of comparison is broad. Bicofino is outside the category of anything that exists at this intersection.' },
        other:  { label: 'Other',  text: '— everything that is generic, standardized, replicable. Bicofino exists outside that category.' },
        metaphor: {
          title: 'The central metaphor',
          p1: 'The intimate chamber quartet. Not the stadium show.',
          p2: 'In a chamber quartet, every note of every instrument matters. The silence between the notes matters. The acoustics of the room matter. The audience chosen to be there matters. The goal is never to reach the most people — it is to reach the right people with maximum intensity.',
        },
      },
      visaoPropósito: {
        label: '// Vision & Purpose',
        title: 'Vision & Purpose',
        vision:  { title: 'Vision',   body: 'To be recognized as the reference ecosystem for connection, curation and creativity applied to the world of sport and luxury — in Brazil and on the international circuit.' },
        purpose: { title: 'Purpose',  body: 'To transform careers, brands and moments into long-term heritage, through genuine connections, radical curation and atelier-level execution.' },
      },
      quatroCs: {
        label: '// The 4 Cs',
        title: 'The 4 Cs — The Filter for Every Decision',
        intro: 'Every Bicofino decision, delivery and project can be read through these four lenses. They are a matter of honor. The order matters.',
        footerMuted: 'When receiving any demand, evaluate: Does this connection involve the right players? Is it within the Bicofino curation standard? Is the proposed execution as simple and elegant as possible? Are we deepening the relationship with the client or just delivering a piece?',
        items: [
          { label: '1. CONNECT — The first and most fundamental',         body: "Bicofino's most central and rarest ability. Bringing together and engaging two or more players — people, businesses, athletes, celebrities, brands — who are beyond the reach of most. Genuine access to decision-makers, figures of influence and premium brands, combined with the intelligence to create encounters that generate real value for all sides.", body2: "CONNECT is Bicofino's primary competitive differentiator. Each connection was built with years of character, consistent presence and clean negotiation. None of them are superficial, none of them are disposable.", rule: 'Fundamental rule: every connection made by Bicofino must benefit all sides of the equation. The ethics of connection are non-negotiable.' },
          { label: '2. CURATE — The filter that defines the standard',    body: 'Good taste and exclusivity above all. Bicofino does not present options — it presents the right choice, filtered by aesthetic and strategic discernment. This applies to accepted clients, chosen partners, assumed projects, used references and completed deliveries. Saying no is part of curation, not a limitation.', body2: null, rule: null },
          { label: '3. CREATE — Natural consequence of the first two',    body: 'It appears as a direct result of CONNECT and CURATE, and manifests in the execution of projects. The internal standard is to seek the simplest and most elegant output possible, with the least expenditure of resources — time, money, attention. Creativity here is surgical precision in choosing the best output, not volume of ideas.', body2: null, rule: null },
          { label: '4. CONSULT — The depth that grows over time',         body: 'Bicofino serves as a guide to its clients — not just delivering results, but deepening the relationship over time. The posture is that of a long-term strategic partner: knowing the client\'s business in depth, anticipating needs, guiding decisions beyond the immediate scope. The value grows with the time of the relationship.', body2: null, rule: null },
        ],
      },
      arquetipos: {
        label: '// Archetypes',
        title: 'Archetypes',
        triadTitle: 'The Triad',
        triadIntro: "Bicofino's identity anchors on three complementary archetypes — each operating in a distinct register, together forming the brand's unique character.",
        items: [
          { title: 'The Sovereign (Primary)',  ref: 'Hermès, Don Corleone, the head of state who needs not raise their voice.', body: 'The Sovereign governs through discernment. Has the highest standard and does not negotiate. Authority is not proclaimed — it is recognized. Knows the rules better than anyone, and for that reason knows exactly when and how to bend them with elegance.', body2: 'At Bicofino, the Sovereign appears in the posture of absolute curation: in client selectivity, in the elegant refusal, in the limited schedule. It appears in the calculated silence of a brand that needs no noise to be perceived.', never: 'What the Sovereign never does: Over-explains. Apologizes for the standard. Yields under market pressure.' },
          { title: 'The Sage (Secondary)',     ref: 'Ray Dalio, Mozart, the Consigliere who speaks less and gets more right.', body: 'The Sage observes before acting. Accumulates perspective and delivers it at the exact moment — not before, not after. Has no rush to prove what it knows; the depth of analysis does that.', body2: 'At Bicofino, the Sage appears in the quality of strategic consulting, in the long-term market reading, in the integration of AI as a tool for amplifying human judgment.', never: 'What the Sage never does: Delivers analysis without synthesis. Speaks for the sake of speaking. Confuses volume of information with wisdom.' },
          { title: 'The Creator (Tertiary)',   ref: 'Steve Jobs, the Bicofino Fox, the artist who is also a ruthless editor.', body: 'The Creator sees possibilities where others see constraints. Produces with obsession for detail. But the Bicofino Creator is also an editor. Knows that the difference between the mediocre and the excellent is what you decide to remove, not what you add.', body2: 'At Bicofino, the Creator appears in the Studio, in Bicofino Inspired, in animated signatures, in media kits, in visual identities. It appears in every delivery that was worked until there was nothing more to cut.', never: 'What the Creator never does: Delivers volume without editing. Confuses occupation with creative productivity. Values process over result.' },
        ],
        foxBond: {
          title: 'The Fox and James Bond — The Mobility Archetype',
          p1: 'The Bicofino Fox and James Bond share the same behavioral DNA — and together form the brand\'s mobility and adaptation layer.',
          p2: 'The Fox is agile, intelligent and elegant under pressure. It appears at the right moments, disappears when there is nothing to add. It is never in the wrong place. It observes before acting. Never barks.',
          p3: 'Bond extends this reading to the international dimension: he moves anywhere in the world without losing his identity. He enters any room — in any language, in any culture — and belongs. He is called when the problem is too impossible for the conventional path. He maintains elegance and calibrated reasoning even under extreme pressure. He adapts the method to the context. Never the character.',
          p4: 'These two archetypes, overlaid, define how Bicofino moves through the world: with calculated presence, clear purpose and elegance that needs no announcement.',
        },
        semanticPanel: {
          title: 'Archetype Semantic Panel',
          rows: [
            ['Bicofino Metaphors', 'The fox (agility and intelligence), the chamber quartet (precision and intimacy), the atelier (craft and exclusivity), the Consigliere (trust and access), the patinated leather (time and quality), the diamond ✦ (filter and precision), the pitch at night (tension and beauty simultaneously), the Italian piazza (encounter, elegance and quality time), Bond crossing the border (mobility with purpose).'],
            ['Cultural references', 'Hermès (heritage and refusal of the obvious), LVMH (brand architecture), Brunello Cucinelli (humanism and luxury with ethics), Audemars Piguet (craftsmanship that transcends generations), Loro Piana (silence as sophistication), The Row (minimalism as position), James Bond (elegance under pressure, international mobility), Don Corleone (discreet power and trust relationship), Mozart (genius with formal discipline), Steve Jobs (aesthetics as strategy), Johnnie Walker Striding Man (mascot as long-term brand asset), Italian football of the 80s and 90s (when the scarcity of spots for foreigners placed the world\'s best in lesser-known teams — Zico at Udinese — and tactical elegance defined the game before speed).'],
            ['Avoid', 'The conductor who asks for applause. The guru who sells a method. The agency that promises transformation in 30 days.'],
          ],
        },
      },
      craft: {
        label: '// Craft',
        title: 'Craft',
        intro: "Bicofino's Craft is not office wall values. They are observable behaviors in every delivery, every meeting, every interaction with clients or partners.",
        items: [
          ['Detail Obsession',                    'What appears perfect to the careless eye has something to be refined. Always. Bicofino finds that something and corrects it before delivering.'],
          ['Beauty with Intelligence',             'Aesthetics without strategy is decoration. Strategy without aesthetics is a spreadsheet. Bicofino operates at the intersection.'],
          ['Deliver beyond expected',              'The brief is the floor, not the ceiling. The client asks for what they know to ask; Bicofino delivers what the client did not yet know they needed.'],
          ['Radical simplicity',                   'The most elegant version of anything is always the simplest that still works. Cutting is the most difficult and most valuable skill.'],
          ['Punch with elegance',                  'Saying something difficult with precision and without cruelty. Having a position and sustaining it. Bicofino does not hesitate.'],
          ['Technology in service of creativity',  'AI, data and digital tools amplify human judgment — they never replace it.'],
          ["The Artisanal Touch",                  "The backdrop of Bicofino communication always follows the four central visual qualities: sophisticated minimalism, quiet luxury, clear hierarchy, permanence over trend. But what differentiates Bicofino from any well-executed brand system is what happens punctually and with intention: an athlete post that breaks the grid in a calculated way, an unexpected artistic treatment in a campaign, a piece that surprises because no one expected that level of human care in a digital context. These moments are not frequent — and must not be. They appear strategically, when the occasion justifies it, and it is precisely this rarity that makes them powerful. The artisanal touch is Bicofino's aesthetic differentiator. The human factor that does not scale."],
        ],
      },
      proxies: {
        label: '// Proxies & Personas',
        title: 'Proxies & Personas',
        intro: 'Proxies are real or fictional figures that help calibrate the internal decision standard. When in doubt about tone, posture or choice, ask: what would these references do?',
        items: [
          { name: 'Hermès',             use: 'For curation and product standard decisions. Hermès refuses trend. Launches when ready. Its waiting list is strategy, not coincidence.',                                                                                                                     arrow: 'Bicofino also refuses what is in fashion if it is not true to the brand.' },
          { name: 'Brunello Cucinelli', use: 'For decisions about humanism and the ethics of luxury. Cucinelli built an empire on the belief that profit and human dignity coexist — that maximum quality and respect for the process are the same thing.',                                             arrow: 'Bicofino understands that excellence and relationship ethics are not trade-offs.' },
          { name: 'Audemars Piguet',    use: 'For decisions of heritage and long-term craft. AP does not explain why its watches cost what they cost — the internal complexity, visible only to those who know how to look, does that work.',                                                            arrow: 'Bicofino does not need to explain its value. The depth of the delivery does that.' },
          { name: 'Don Corleone',       use: 'For relationship and network power decisions. The Godfather does not negotiate publicly. His relationships are long-standing and of mutual convenience. When he does a favor, he does not collect immediately.',                                          arrow: 'Bicofino builds relationships where value grows over time, not exhausted in the first transaction.' },
          { name: 'Steve Jobs',         use: 'For product and execution decisions. Jobs eliminated features until the product was only the most essential thing most well executed possible.',                                                                                                           arrow: 'Bicofino eliminates the superfluous until only the necessary remains — executed impeccably.' },
          { name: 'James Bond',         use: 'For mobility, presence and adaptation decisions. Bond enters any room in the world and belongs. He resolves the impossible with elegance. He maintains character even when the method changes.',                                                           arrow: 'Bicofino moves through any market, in any language, without losing its identity.' },
          { name: 'The Bicofino Fox',   use: 'The brand mascot. Agile, intelligent, elegant under pressure. It appears when it has something to add; disappears when it does not.',                                                                                                                    arrow: 'What would the Fox do? What would it wear? Where would it be?' },
        ],
      },
    },

    verbal: {
      header: { eyebrow: '// 00.5 · Verbal Universe', title: 'Verbal Universe' },
      manifesto: {
        label: '// Manifesto',
        title: 'Those who decide the game rarely shout.',
        paras: [
          'There is an entire generation taught to believe that visibility is value. That presence is power. That if you are not being seen, it is not happening.',
          'Bicofino disagrees.',
          'The deals that matter most happen in small rooms. The connections that move careers are made by people who genuinely know each other — not by social media algorithms. The brands that last decades do not chase trends; they ignore them with calculated elegance.',
          'We live in an age when anyone can look sophisticated. Filters, templates, AI-generated content at industrial scale — the surface has never been more accessible. Paradoxically, depth has never been rarer. Or more valuable.',
          'Bicofino was built on this belief: that what endures has substance. That real access is not bought, it is built — with time, with discernment, with the willingness to say no to what does not deserve a yes. That beauty and intelligence are not opposites — they are the same thing when execution is at the right level.',
          'We do not serve everyone. Every relationship we build requires depth. Every project we take on demands our best. An unlimited schedule is a diluted schedule.',
          'We were shaped by the tension between three cultures. The grit and authenticity of Brazil. The scale and precision of the Anglo-Saxon world. The heritage and refinement of Italy. This mix is not an accident — it is an advantage.',
          'Sport is our territory of origin not because it is large, but because it reveals character. In a match, there is nowhere to hide. Talent shows under pressure. Preparation decides before the opening whistle. Bicofino brings this same rigor to everything it does: every delivery is a performance that leaves a record.',
          'Connection. Curation. Creation. Consulting.',
          'Four words. One method. One obsession.',
        ],
        tagline: 'Unlike Any Other.',
      },
      tomDeVoz: {
        label: '// Voice & Tone',
        title: 'Voice & Tone',
        intro: "Bicofino's voice and tone is determined by four axes that must coexist in any brand communication.",
        weakLabel: 'WEAK',
        bicofinoLabel: 'BICOFINO',
        axes: [
          { axis: 'Authority without arrogance',                         body: 'Bicofino has a point of view and sustains it. It does not ask permission to have a position. But it never imposes it with volume — it imposes it with precision.', weak: '"We are leaders in premium sports branding."', right: '"We choose the projects where we can deliver the best we know how to do."' },
          { axis: 'Sophistication through execution, not self-declaration', body: 'The quality of a Bicofino delivery needs no introduction. The well-written text, the well-edited visual, the well-structured proposal — these elements communicate sophistication before any word about sophistication is said.', weak: '"A premium and exclusive approach for your brand."', right: 'Write the brief so well that the client needs no adjectives to know what they are receiving.' },
          { axis: 'Direct, never rude',                                  body: 'Bicofino gets to the point. Does not use filler, does not use agency jargon to seem more technical. But getting to the point with elegance is different from being abrupt.', weak: null, right: null },
          { axis: 'Specific, never generic',                             body: 'Empty superlatives are the opposite of the Bicofino standard. Always prefer the concrete, the specific, the verifiable.', weak: '"Unique and exclusive experiences for ultra-high-standard clients."', right: '"A private Lang Lang concert. An intimate venue. Few people. Curated by Bicofino."' },
        ],
        restrictions: {
          title: 'Writing restrictions — mandatory filters',
          p1: 'The construction "It is not X. It is Y." is prohibited at Bicofino.',
          p2: 'This is the most important verbal restriction in the Brand System. The structure — "Premium, not expensive.", "Strategy, not execution.", "Not an agency. An atelier." — was overused by brands that want to sound sophisticated but need to declare that sophistication because they do not demonstrate it. The effect today is exactly the opposite of the intended: instead of strength, it signals automation; instead of position, it signals insecurity.',
          p3: 'The Bicofino standard requires sentences that affirm without having to negate, that demonstrate without having to explain, that trust the reader to complete the reasoning. The intelligence of the text is in never needing to say what it is not — only showing what it is, with enough precision that the contrast appears by itself.',
          p4: 'This restriction applies to all types of output: brand copy, Instagram posts, proposals, manifestos, playbooks and strategic analyses.',
          othersLabel: 'Other restrictions',
          items: [
            'Superlatives without concrete reference ("the most", "the best", "the only")',
            'Artificial urgency ("limited spots", "limited time offer")',
            'Corporate speak ("robust ecosystem", "integrated solutions", "value delivery")',
            'Complimenting the client for asking a question before answering',
            'Using "genuine", "honestly" or "sincerely" as intensifiers',
          ],
        },
      },
      vocabulario: {
        label: '// Vocabulary',
        title: 'Vocabulary',
        bicofinoWords: {
          title: 'Bicofino universe words',
          items: [
            ['Curation',    'Deliberate, discerning choice. More than selection; it is editing with standard.'],
            ['Atelier',     'The mode of operation. Artisanal at reduced scale, unrepeatable in depth.'],
            ['Consigliere', 'The trusted advisor. Access to the decision-making circle, with absolute discretion.'],
            ['Portfolio',   'Long-term relationships with curated standard. Never just clients.'],
            ['Legacy',      'What remains after the delivery. Every Bicofino action must leave something that grows over time.'],
            ['Access',      'The rarest asset. Built over years, delivered with precision.'],
            ['Quartet',     'The metaphor for the ideal size of operation. Few. Precise. Essential.'],
            ['Dossier',     'The Bicofino proposal format. A document that tells a strategic story, not a list of services.'],
            ['Fox',         'The mascot. The internal point of view. Agile, intelligent, invisible when there is nothing to add.'],
            ['Diamond',     'The symbol ✦. The isolated brand mark. The filter with form: four points of precision.'],
            ['On Field',    'Everything related to the athlete on the pitch and their overall performance.'],
            ['Off Field',   'Everything that exists off the pitch: brand, business, image, legacy, connections.'],
          ],
        },
        avoidWords: {
          title: 'Words to avoid',
          cols: ['Avoid', 'Why', 'Alternative'],
          rows: [
            ['Premium (alone)',       'Overused, lost its meaning',       'Describe the standard instead of naming it'],
            ['Exclusive',             'Same',                             'Say what makes the experience singular'],
            ['Innovative',            'Empty jargon',                     'Specify what is different'],
            ['Solutions',             'Corporate speak',                  'Projects, deliveries, work'],
            ['Strategic partnership', 'B2B cliché',                       'Long-term relationship, alliance'],
            ['Transformative',        'Promise without backing',           'Specify what changes and how'],
            ['Genuine',               'Worn intensifier',                 'Demonstrate in the text, do not declare it'],
          ],
        },
      },
      territorio: {
        label: '// Semantic Territory',
        title: 'Semantic Territory',
        intro: "Bicofino's verbal territory moves in three semantic layers. Attention to the third — when evoked in the wrong context, it becomes cliché. Use with discernment and sparingly.",
        layers: [
          { layer: 'Layer 1 — Luxury with Substance',                      body: 'Heritage, craft, patina, time, clay, linen, leather, noble wood, silence, form, weight, permanence. The piazza at dusk. The leather that improves with use. The atelier that refuses haste.' },
          { layer: 'Layer 2 — Strategic Intelligence',                      body: 'Angle, perspective, filter, discernment, map, route, window, access, circle, small room, conversation that changes direction, network built over decades.' },
          { layer: 'Layer 3 — Sport as Metaphor (use extremely sparingly)', body: 'Pitch, whistle, training, pressure, preparation, timing, lineup. Sports evocations have force when they appear unexpectedly in a context that does not call for them — and lose all force when they become the default register. Football metaphors outside the right context sound cheap. Reserve them for moments when the contrast creates impact.' },
        ],
      },
      glossario: {
        label: '// Glossary',
        title: 'Glossary',
        items: [
          ['Bicofino OS',             "The internal operating system for athlete and operations management. Cognitive architecture built on Claude Code with AI agents, Supabase as database, Google Drive as long-term memory. Under continuous development and deployment."],
          ['Bicofino Inspired',       'Audiovisual editorial concept. Each production is an aspirational short film starring the Bicofino Fox. Launched when the experience justifies it — no calendar, no obligation of sequence.'],
          ['The 4 Cs',                'CONNECT (first), CURATE (second), CREATE and CONSULT (natural consequences). The filter for every Bicofino decision.'],
          ['Brand System Bicofino',   'This document. The living brand playbook.'],
          ['Dossier',                 'Bicofino commercial proposal format. Structure: Vision → Brand Challenge → Bicofino Path → Investment → Timelines.'],
          ['Brand Diagnosis',         'In-depth discovery service that maps the real state of a brand before any proposal. Final name under definition.'],
          ["Gentleman's Gesture",     'Internal code for the practice of crossing out the last name in email signatures and business cards, leaving only the first name visible. The gesture says, without words: "you can call me by my name." An act of intimacy and trust — the creation of a personal bond where formality existed before.'],
          ['Image as Presence. Data as Proof.', 'The editorial principle of the On Field image system. The athlete is the main visual asset. The image creates hierarchy and tension. The data supports the narrative with precision.'],
          ['On Field / Off Field',    'The two major operational verticals of Bicofino.'],
          ['Club',                    'Confidential project. Raposa Territory.'],
          ['The Connector',           'Fábio Brancatelli. CEO and founder. The network is the product.'],
          ['The Investor',            'Flaviano Galhardo. Pragmatic, ROI-focused.'],
          ['The Artist',              'Woney Malian. Consigliere and Creative Director. Strategic aesthetics of the Group.'],
          ['Unlike Any Other',        'The tagline. Not a slogan. A position.'],
        ],
      },
    },
  },
} as const
