// Geografia Bicofino — edição 2027 · Itália
// Conteúdo-piloto baseado em cruzamento C3. Capítulos a expandir editorialmente.

export const cover = {
  ano: '2027',
  serie: 'Geografia Bicofino',
  titulo: 'Itália',
  subtitulo: 'Capital criativo, capital financeiro, capital esportivo.',
  abertura:
    'Esta é a primeira edição da Geografia Bicofino — um volume anual dedicado a um único eixo geográfico. A Itália abre a série não por nostalgia, mas por estrutura: é o vértice europeu do triângulo Brasil-Itália-Estados Unidos sobre o qual a casa opera. O que segue não é um guia. É uma leitura.',
  cadastro: {
    edicao: 'I',
    periodicidade: 'Anual',
    audiencia: 'Membros Club · Patriarcas selecionados',
    extensao: '6 capítulos',
  },
}

export type Capitulo = {
  numero: string
  titulo: string
  subtitulo: string
  paragrafos: string[]
}

export const capitulos: Capitulo[] = [
  {
    numero: 'I',
    titulo: 'As famílias do luxo',
    subtitulo: 'Solomeo, Quarona, Casette d\'Ete — três geografias, uma gramática.',
    paragrafos: [
      'Brunello Cucinelli não é, em primeira instância, uma marca de cashmere. É uma tese sobre como uma comunidade de 530 habitantes em Solomeo pode sustentar uma operação global de €1,1 bilhão em receita sem trair o vocabulário com que começou. A pergunta que importa para o leitor Bicofino não é o que a empresa vende — é o que a empresa recusa vender. Recusou marketplace, recusou venda direta na China em meados dos anos 2010, recusou a tentação de virar conglomerado. A recusa é, ela própria, o produto.',
      'Loro Piana opera outra escala da mesma gramática. Pertence ao grupo LVMH desde 2013, fato que poderia ter dissolvido a identidade em qualquer outro caso. Não dissolveu porque a família continuou no comando operacional e porque o ativo central da casa — relação direta com fazendeiros de vicuña no Peru, com criadores de cashmere na Mongólia, com tecelões no Piemonte — não é replicável por sinergia de portfólio. É replicável apenas por presença.',
      'Della Valle, com Tod\'s, escolheu um terceiro caminho: listou-se em bolsa em 2000, recomprou parte significativa do capital em 2024, retirou a empresa da Borsa em 2025. O movimento foi lido pelo mercado como conservador. Leu-se errado. Foi uma decisão sobre tempo. O tempo de família opera em décadas; o tempo de mercado público opera em trimestres. Quando os dois deixam de ser compatíveis, escolhe-se um.',
      'O que liga as três casas, para a leitura Bicofino, é a aposta de que a propriedade familiar concentrada é o moat mais defensável do luxo italiano. Não a herança, não o saber-fazer, não o território — a propriedade. Quem decide pode recusar; quem precisa explicar a investidor trimestralmente, não.',
    ],
  },
  {
    numero: 'II',
    titulo: 'A Borsa que aprendeu a esperar',
    subtitulo: 'Milão, Euronext, e o que muda quando o capital paciente brasileiro chega.',
    paragrafos: [
      'A Borsa Italiana é hoje parte do grupo Euronext, com capitalização total na casa dos € 800 bilhões. Os números são modestos comparados aos da NYSE ou da Deutsche Börse, mas a leitura quantitativa engana. A bolsa italiana é o canal de listagem do *industriale medio* — empresas familiares de €100M a €2B em receita que decidiram, em algum momento dos últimos quarenta anos, abrir 25% do capital para financiar uma transição geracional.',
      'É exatamente nessa faixa que o Patriarca brasileiro tem a janela mais clara de entrada na economia italiana. Não em deals de M&A de €5B, que estão no horizonte da Exor e do fundo soberano; mas em participações minoritárias em empresas industriais médias do Vêneto, da Emília-Romagna, da Lombardia — calçado, máquina-ferramenta, alimentação especializada, têxtil técnico — em que a família vendedora prefere capital paciente com pretexto cultural a private equity com tese de saída em cinco anos.',
      'A operação não acontece sozinha. Exige advisor italiano com história de família (não banco global), exige presença física em Milão e em uma cidade do Norte por ano, exige paciência para a primeira rodada de conversa não ser sobre preço. Bicofino-Wealth pode operar essa ponte com tradução cultural genuína — algo que advisor americano em Milão raramente entrega.',
      'A questão, para o Patriarca que olha esta tese, é uma só: quanto da sua alocação europeia está em ETF e quanto está em uma cadeira de board que custou três jantares em Bergamo? A diferença é o que separa diversificação de presença.',
    ],
  },
  {
    numero: 'III',
    titulo: 'Calcio como ativo cultural',
    subtitulo: 'Zico no Udinese, Kerchner na próxima década, e o futebol como acesso.',
    paragrafos: [
      'Em 1983 Zico assinou com o Udinese. O fato esportivo é conhecido. O fato cultural é menos: foi a partir desse contrato que Pordenone, Trieste, Tarvisio começaram a aparecer no vocabulário brasileiro de classe média alta. Não foi o Milan, não foi a Juventus, não foi a Inter — foi um clube de cidade média do Friuli-Venezia Giulia que abriu a primeira ponte de imaginação cultural sustentada entre Brasil e Itália via futebol.',
      'O Calcio italiano de 2027 é outra coisa. A Série A vive de direitos de transmissão domésticos comprimidos por uma RAI em retração e uma DAZN em ajuste. Os grandes clubes do Norte (Milão, Turim) operam orçamentos competitivos com a Liga em volume, mas não em padrão. Os clubes médios — Atalanta, Bologna, Verona, Lecce — operam com excedente de inteligência sobre o orçamento. É aí que a tese se desloca.',
      'Para o atleta brasileiro com passaporte italiano, o Calcio de 2027 é a melhor janela europeia em uma década. O Bosman não vale para extracomunitário; o passaporte italiano vale. O clube médio italiano, com folha de até €60M, compra atleta brasileiro de 19-22 anos com passaporte por um terço do que pagaria por equivalente francês ou belga. Para o atleta, é tempo de jogo em uma das melhores ligas táticas do mundo. Para o intermediário tradicional, é margem. Para Bicofino, é narrativa — porque o que se vende em campanha trilíngue não é o atleta, é a continuidade Zico → Kerchner → próximo.',
      'O acesso a esse circuito não está em São Paulo nem em Milão. Está em Udine, em Bergamo, em Sassuolo. Está nos diretores esportivos que falam três línguas, que jantam com o agente, que decidem em quarenta e oito horas. Bicofino conhece nominalmente esse circuito. É um ativo difícil de comprar.',
    ],
  },
  {
    numero: 'IV',
    titulo: 'Passaporte como instrumento',
    subtitulo: 'Cidadania italiana iure sanguinis, regime impatriati, e o cálculo que a família Patriarca não fez ainda.',
    paragrafos: [
      'A lei de cidadania italiana por ascendência (Lei 91/1992, com a reforma de 2024 que limitou a derivação a duas gerações) ainda permite, em 2027, que a maioria das famílias brasileiras descendentes de italianos do Vêneto, da Calábria e do Piemonte solicitem a cidadania por via judicial em Roma com prazo médio de 18-24 meses. Não é mais o instrumento massificado de uma década atrás — é, hoje, um instrumento residual de famílias específicas, muitas delas no Cluster C do Bicofino.',
      'O passaporte abre três portas que não se abriam antes. A primeira é a liberdade de residência em qualquer país da União Europeia, o que para o atleta extracomunitário do Cluster A muda o jogo profissional inteiramente. A segunda é o acesso ao regime impatriati — incentivo fiscal italiano para residentes que retornam ou se mudam, com isenção de até 50% sobre rendimentos do trabalho por cinco a dez anos, aplicável também a profissionais de alto patrimônio que estabelecem residência fiscal em determinados municípios do Sul. A terceira é menos óbvia: a porta cultural que o passaporte abre em famílias italianas de tradição. Negócios que demoram dez anos para começar entre americanos e italianos começam em dois entre italianos.',
      'O cálculo que o Patriarca brasileiro ainda não fez com rigor é o seguinte. Reorganizar a residência fiscal de um membro da família — tipicamente um filho de 25-40 anos, com patrimônio próprio em construção e mobilidade de carreira — em um município elegível ao regime impatriati pode economizar, ao longo de uma década, entre 30 e 45% da carga fiscal sobre rendimentos internacionais. Não é estratégia agressiva; é cálculo padrão. O que falta, em geral, não é a informação. É a tradução cultural e operacional para o português de família.',
      'Bicofino-Wealth ocupa exatamente esse espaço, em parceria com escritório tributário italiano nominal. Não vende cidadania; estrutura a sequência. O passaporte é o instrumento. O regime impatriati é a alavanca. A residência cultural é a consequência — e essa, sim, é o que de fato muda a próxima geração da família.',
    ],
  },
  {
    numero: 'V',
    titulo: 'O Norte da indústria',
    subtitulo: 'Bergamo, Vicenza, Brescia — family offices que não se chamam family offices.',
    paragrafos: [
      'Há uma classe de empresa, no Norte da Itália, que opera há três gerações sem se nomear oficialmente "family office". É a empresa industrial média — máquina-ferramenta em Bergamo, têxtil técnico em Biella, química de especialidades em Brescia, ouro em Vicenza, mobiliário de alto padrão na Brianza — em que a família proprietária consolida o patrimônio operacional, financeiro e imobiliário em uma única estrutura de governança informal, frequentemente comandada por um patriarca de 70-85 anos e uma diretora financeira que está há vinte anos no posto.',
      'Esses são os interlocutores naturais do Patriarca brasileiro do Cluster C. Não por similaridade de setor — agro brasileiro não é têxtil italiano — mas por similaridade de gramática. Dois patriarcas reconhecem-se mais rapidamente que dois portfolio managers. Falam de tempo, de continuidade, de sucessão, de imóvel, de neto. O que falta entre os dois mundos, em 2027, não é interesse. É curadoria da apresentação.',
      'Bicofino-Wealth não pretende substituir o consigliere milanês que essas famílias já têm. Pretende ser o consigliere brasileiro que essas famílias ainda não têm — o tradutor cultural por meio do qual uma família de Vicenza descobre que o patrimônio da família de São Paulo se beneficia tanto de uma minoritária no têxtil italiano quanto a família de Vicenza se beneficia de uma minoritária no agro brasileiro. A simetria é real. O que faltava era a mesa.',
      'O capítulo, na prática, fecha-se com a observação operacional de que cinco jantares por ano em cinco cidades do Norte — Bergamo, Brescia, Vicenza, Bolonha, Milão — em duas temporadas (primavera e outono) constroem a malha de relações que nenhum banco global constrói. Bicofino opera a mesa. O cheque, quando há, é entre famílias.',
    ],
  },
  {
    numero: 'VI',
    titulo: 'Voltar para ficar',
    subtitulo: 'Regime impatriati, residência fiscal, e o cálculo do retorno.',
    paragrafos: [
      'O regime impatriati italiano, na sua forma atualizada pelo decreto-legge 209/2023 e ajustada pela Legge di Bilancio 2024-2025, define-se em três variáveis: a isenção fiscal sobre rendimentos de trabalho (entre 50% e 70% do imposto devido, com piso mais alto para municípios de até 20.000 habitantes em determinadas regiões), o prazo de cinco anos prorrogáveis a dez sob condições específicas, e o requisito de residência fiscal anterior fora da Itália por pelo menos três anos seguidos.',
      'Para o leitor Bicofino, o detalhe que importa não está na taxa. Está na geografia: o regime é mais generoso para quem se estabelece em municípios do Sul (Sicília, Calábria, Basilicata) e em comunas pequenas. Não é coincidência. A Itália usa o instrumento fiscal para repopular regiões em declínio demográfico — e o efeito colateral, do ponto de vista do patrimônio brasileiro-italiano, é que o cálculo do retorno fica significativamente mais favorável em locais onde a vida cotidiana é, de qualquer forma, melhor.',
      'O cenário a desenhar, em 2027, para uma família Patriarca do Cluster C com herdeiros em idade de mobilidade é o seguinte: filho ou filha de 28-42 anos com cidadania italiana já obtida, com patrimônio próprio em USD/BRL em torno de US$3-15M, em transição de carreira ou em equilíbrio profissional remoto, estabelece residência fiscal em um municipio elegível por sete anos. A economia fiscal projetada ao longo do período cobre integralmente o custo de oportunidade de morar fora do Brasil, mais residência italiana, mais escolarização das crianças em colégios bilíngues. O ganho líquido — sem contar o ganho cultural, sem contar a presença instalada no eixo Norte-italiano que a família passa a ter — chega facilmente a US$1,5-4M ao final do período.',
      'A operação não é para todos. Exige planejamento que começa no mínimo dezoito meses antes da mudança, exige escolha cuidadosa do município (variáveis fiscais e variáveis de vida real não coincidem perfeitamente), exige acompanhamento patrimonial duplo (BR e IT) durante todo o período. Mas a operação existe. A maioria das famílias brasileiras com elegibilidade ainda não a considerou. É exatamente onde Bicofino-Wealth, em parceria com tributarista italiano nominal e cartório consular paulista, opera com vantagem.',
      'O capítulo encerra a edição com a observação que dá título à seção. Voltar à Itália, em 2027, não é projeto romântico. É instrumento patrimonial. A consequência cultural — o neto que cresce trilíngue, o domingo que volta a ter a estrutura mediterrânea, a mesa que se reorganiza em torno de outro relógio — é benefício, não pretexto. O pretexto é o cálculo. O resto é continuidade.',
    ],
  },
]

export const colofao = {
  titulo: 'Colofão',
  paragrafos: [
    'Esta edição é a primeira da série Geografia Bicofino. Tira-se a cada janeiro, em volume único, dedicada a um eixo geográfico do triângulo Brasil-Itália-Estados Unidos e dos países que orbitam essa rota.',
    'A edição 2027 cobre Itália. A edição 2028, em estudo, cobre Estados Unidos com foco em Miami-Nova York-corredor Texas. A edição 2029 fecha o triângulo com Brasil — em recorte que será definido ao longo do próximo ano.',
    'Geografia Bicofino circula entre membros Club e Patriarcas selecionados. Não está à venda. Não tem versão pública. Esta versão digital existe para registro e consulta. O volume impresso, em papel Munken Pure e capa em linho, é o que circula.',
  ],
  meta: [
    ['Edição', 'I — Itália'],
    ['Ano', '2027'],
    ['Volume', '90-120 pp.'],
    ['Encadernação', 'Munken Pure · linho'],
    ['Tiragem', 'Nominal'],
    ['Voz', 'Bicofino — autoridade sem arrogância, sofisticação pela execução'],
  ] as const,
}
