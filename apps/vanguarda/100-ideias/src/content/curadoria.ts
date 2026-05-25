// Conteúdo extraído de .planning/vanguarda/outputs/bicofino-curadoria-100-ideias.md
// Estruturado para renderização editorial. Prosa preservada do original.

export const sumario = {
  data: '2026-05-25',
  versao: 'v1',
  paragrafos: [
    'Das 100 ideias ranqueadas pela rubrica VANGUARDA, 42 passaram nos quatro filtros Bicofino (Cluster · Estético · Triângulo Cultural · Conexão) e foram alocadas em três trilhas: Patriarca (12), Construtor (12) e Atleta (6) — totalizando 30 entradas curadas, com 12 ideias presentes em mais de uma trilha por terem angulações distintas.',
    'O encaixe é mais forte em Cluster C (Patriarca) do que o BRIEF original sugeria: regulação pesada (Reforma, EUDR, LGPD, BCB) cria uma classe de ideias em que o Patriarca aloca capital paciente e empresta acesso, sem precisar fundar nem operar. O Cluster B (Construtor) concentra-se nas ideias premium de software (Legal, Health, Marketing) onde margem e design importam tanto quanto código.',
    'O Cluster A (Atleta) é estruturalmente menos servido pelo corpus, mas há um eixo limpo — Wellness/Longevidade + Creator Economy discreta — com 6 entradas de alta densidade. Descartes (15) concentram-se no PME blue-collar e no info-produto vulgar, ambos fora do território Bicofino.',
  ],
}

export type Trilha = 'patriarca' | 'construtor' | 'atleta'

export type Ideia = {
  codigo: string
  rank: number
  score: number
  titulo: string
  categoria: string
  angulacao: string
  conexao: string
  cuidado: string
  trilha: Trilha
}

export const trilhaMeta: Record<Trilha, { nome: string; cluster: string; descricao: string; cor: string }> = {
  patriarca: {
    nome: 'Patriarca',
    cluster: 'Cluster C',
    descricao:
      'Empresários 45-65 (agro/finanças/construção/indústria) alocando capital paciente, sócios minoritários ou conselheiros estratégicos. Foco: estabilidade, herança, ativos que duram décadas, regulação como moat.',
    cor: '#2C3E50',
  },
  construtor: {
    nome: 'Construtor',
    cluster: 'Cluster B',
    descricao:
      'Fundadores premium (executivos de marca/CMO/founder design-forward) operando como negócio. Foco: alta margem, design-forward, mid-market SaaS, prosumer, creator. Não é PME mass market.',
    cor: '#BFA37A',
  },
  atleta: {
    nome: 'Atleta',
    cluster: 'Cluster A',
    descricao:
      'Atletas investindo patrimônio, emprestando imagem ou licenciando participação. Foco: lifestyle premium, creator economy discreta, hospitalidade boutique, performance, wellness, formação.',
    cor: '#6d7886',
  },
}

export const ideias: Ideia[] = [
  // ─── Patriarca (12) ───
  {
    codigo: 'P.1',
    rank: 1,
    score: 8.8,
    titulo: 'Tax Tech para a Reforma Tributária (IVA Dual CBS/IBS/IS)',
    categoria: 'LegalTech / Tax',
    angulacao:
      'O Patriarca não funda — banca. Capital Alto, squad sênior, janela regulatória obrigatória até a conclusão da transição. Horizonte 7-10 anos com vendor lock-in real assim que o motor estiver homologado por uma faixa relevante de ERPs. É a tese mais próxima da lógica TOTVS dos anos 90: regulação cria categoria, categoria cria standard, standard cria múltiplo.',
    conexao: 'Bicofino-Consult medeia o board (CFO de indústria, sócio de Big Four aposentado); Bicofino-Wealth estrutura o veículo.',
    cuidado: 'TOTVS e SAP têm vantagem de instalação; tese só funciona com squad sênior e capacidade de homologação tributária paralela ao calendário CBS/IBS. Não terceirizar produto.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.2',
    rank: 4,
    score: 8.4,
    titulo: 'Antifraude Pix com IA em Tempo Real',
    categoria: 'Fintech / Segurança',
    angulacao:
      'Tese de infraestrutura financeira sem risco de moda. Patriarca com cadeira de conselho em banco médio ou fintech leva esta empresa como fornecedor antes da escala — depois capitaliza. Flywheel real de dados (cada fraude bloqueada melhora o modelo do próximo cliente).',
    conexao: 'Acesso a 5-7 bancos médios via Patriarca abre o GTM inteiro. É o caso clássico em que Connect vale mais do que capital.',
    cuidado: 'Time-to-market apertado; players globais (Sift, Sardine) podem entrar via parceria local. Defensibilidade depende de profundidade no Pix, não em fraude genérica.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.3',
    rank: 7,
    score: 8.2,
    titulo: 'Motor de Crédito com IA sobre Pix e Open Finance',
    categoria: 'Fintech / Crédito',
    angulacao:
      'Para o Patriarca com origem em crédito ou cooperativa, é o produto que abre o capítulo seguinte: underwriting B2B em tempo real para PMEs e desbancarizados, com risco bem comportado se o dado consentido for proprietário. Capital paciente, retorno em ciclo de 5-8 anos.',
    conexao: 'Patriarca-fundador de fintech ou banco médio é cliente natural; Bicofino-Wealth co-investe.',
    cuidado: 'Exige licença correspondente bancária ou parceria com IP licenciado; risco de inadimplência precificado por flywheel ainda imaturo.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.4',
    rank: 37,
    score: 7.5,
    titulo: 'KYC/AML e Compliance Automatizado para Fintechs e VASPs',
    categoria: 'RegTech / Compliance',
    angulacao:
      'Demanda compulsória com prazo (Res. BCB 519-521, out/2026). Patriarca da geração Cosif entende intuitivamente o tipo de moat — "ninguém troca compliance por economia de 10%". Tese de capital médio com receita previsível, sem ciclo de moda.',
    conexao: 'Bicofino-Consult atrai diretores de Compliance saídos de bancos grandes como conselho consultivo.',
    cuidado: 'Aposta em segmento (fintechs/SPSAVs) que pode consolidar. Vendor concentration risk se 2-3 clientes dominarem o ARR.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.5',
    rank: 44,
    score: 7.4,
    titulo: 'Seguro Paramétrico Agrícola com IA e Satélite',
    categoria: 'Insurtech / AgriTech',
    angulacao:
      'Tese natural para o Patriarca-agro: capital paciente, ativo ligado à terra, subsídio (PSR) cobrindo a maturação. Não é "tech disruptivo" — é refinamento atuarial sobre dado de satélite. Pagamento por índice climático é exatamente o tipo de produto que o produtor médio aceita quando vendido por par.',
    conexao: 'Acesso a cooperativas e tradings via Patriarca é o que separa esta tese da próxima Insurtech genérica.',
    cuidado: 'Penetração ainda baixa (15-20%); ciclo educacional longo. Reservas regulamentadas — exige parceria com resseguradora.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.6',
    rank: 51,
    score: 7.4,
    titulo: 'Plataforma de Sensoriamento Remoto / EO Analytics para Agro',
    categoria: 'Space / AgriTech',
    angulacao:
      'Capital paciente sobre infraestrutura geoespacial — Sentinel-2 + IA viram mapas de manejo e compliance CAR no celular do produtor. Para o Patriarca com fazenda própria, é dogfooding seguido de investimento. YC RFS S26 prioridade #1 indica timing, mas a tese sobrevive ao hype porque o ativo final (camada de dados georreferenciados do agro brasileiro) é defensável por década.',
    conexao: 'Liga-se naturalmente à P.5 (seguro paramétrico), P.7 (EUDR) e P.8 (CAR) — capítulo "agro de precisão" do Club.',
    cuidado: 'Margem de SaaS pressionada se a comoditização do dado bruto Sentinel-2 acelerar; defensibilidade vem da camada de inferência, não da imagem.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.7',
    rank: 52,
    score: 7.3,
    titulo: 'Rastreabilidade Farm-to-Fork / EUDR Compliance',
    categoria: 'AgriTech',
    angulacao:
      'É a tese mais Bicofino do corpus: Brasil-Itália-anglosaxão num único vetor. Exportação de soja, café e cacau para a UE depende de rastreabilidade EUDR; sem isso, R$200bi em risco de bloqueio. Patriarca-exportador entende a urgência sem precisar de slide. Capital médio, ciclo 4-6 anos, receita atrelada ao trade balance real entre Brasil e Europa.',
    conexao: 'Editorial Bicofino-Itália tem ângulo natural (café como produto cultural, não commodity). Bicofino-Consult abre porta com tradings.',
    cuidado: 'Regulação EUDR foi adiada uma vez; pode adiar de novo. Tese precisa sobreviver a "ano de prorrogação" sem queimar caixa.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.8',
    rank: 85,
    score: 7.0,
    titulo: 'Plataforma de Compliance Ambiental e CAR para Agro',
    categoria: 'AgriTech / RegTech',
    angulacao:
      'Complementar à P.6 e P.7, é o produto que o Patriarca aloca para toda a operação familiar do agro, não para terceirizar. CAR, APP e Reserva Legal automatizados via geoprocessamento — funciona como serviço produtizado com retainer.',
    conexao: 'Casa com Bicofino-Wealth (estruturação patrimonial rural).',
    cuidado: 'Margem comprimida se virar commodity; defensibilidade vem do laudo assinado e da relação com cartórios rurais.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.9',
    rank: 88,
    score: 7.0,
    titulo: 'Gestão de Passivo Tributário e Recuperação de Créditos Fiscais',
    categoria: 'Tax Tech',
    angulacao:
      'Modelo success fee (25-40% do recuperado) é a linguagem que o Patriarca empresário fala melhor — não compra software, compra resultado. R$100-300bi em créditos PIS/Cofins/ICMS-ST não aproveitados é o tipo de número que abre conversa.',
    conexao: 'Bicofino-Consult medeia advogados tributaristas seniores como conselho técnico permanente.',
    cuidado: 'Reforma Tributária muda o jogo da recuperação; tese tem janela definida (próximos 4-6 anos, enquanto o estoque atual de créditos não prescreve).',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.10',
    rank: 93,
    score: 7.0,
    titulo: 'Software de Qualidade por Visão Computacional para Manufatura',
    categoria: 'Hardware / IA Industrial',
    angulacao:
      'Para o Patriarca industrial (têxtil, metal-mecânico, alimentos) é tese de ROI direto: 2-5% de perda em R$200bi de produção = R$4-10bi evitáveis/ano. Capital médio, instalação física, contrato anual. Não é venture — é equipamento com camada de software.',
    conexao: 'Bicofino-Wealth estrutura veículo de capital paciente para indústria média.',
    cuidado: 'Ciclo de venda industrial é longo (9-18 meses); CAC alto se não houver canal via Patriarca-cliente-âncora.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.11',
    rank: 94,
    score: 6.9,
    titulo: 'Open Finance Data Marketplace (Dados Consentidos)',
    categoria: 'Fintech / Dados',
    angulacao:
      'Para o Patriarca-financeiro, esta é a tese de ativo de dado com vida útil de décadas. 60M+ consentimentos ativos formam um substrato proprietário se a estruturação societária e jurídica forem corretas. Não é fintech — é infraestrutura.',
    conexao: 'Bicofino-Consult opera mesa de relação com BCB e com bancos médios fornecedores de dado.',
    cuidado: 'Risco regulatório alto — BCB pode definir tabelamento ou cesta gratuita. Tese só faz sentido com camada de inteligência sobre o dado, não com revenda crua.',
    trilha: 'patriarca',
  },
  {
    codigo: 'P.12',
    rank: 96,
    score: 6.9,
    titulo: 'Manutenção Preditiva via IIoT para Indústria (MRO-as-a-Service)',
    categoria: 'Hardware / IIoT',
    angulacao:
      'Casa com P.10 mas em chave diferente: sensores + IA previnem falha; downtime industrial custa US$260k/hora em média. Patriarca industrial entende a matemática sem slide. Modelo as-a-Service (sensor incluso + mensalidade) alinha incentivos.',
    conexao: 'Bicofino-Consult posiciona o Patriarca como sponsor estratégico de 3-5 fábricas-piloto.',
    cuidado: 'Hardware impõe capital de giro; calibrar sensores por vertical (metal, alimentos, têxtil) tem custo escondido.',
    trilha: 'patriarca',
  },

  // ─── Construtor (12) ───
  {
    codigo: 'B.1',
    rank: 2,
    score: 8.6,
    titulo: 'Agente Jurídico para Escritórios ("Harvey Brasileiro")',
    categoria: 'LegalTech / AI Agents',
    angulacao:
      'Categoria em que premium é precificável — escritório de banca-média paga por copiloto que entrega petição. Founder precisa de socio jurídico de carreira (não advogado júnior) + capacidade de produto. Margem de software premium; ticket médio sustenta GTM consultivo.',
    conexao: 'Bicofino-Studio entrega identidade visual e voice ("não é tech para escritório, é equipamento de escritório").',
    cuidado: 'Comparáveis globais (Harvey, Eve) já têm capital. Vantagem brasileira é direito local + PJe, não modelo. Não competir em horizontalidade.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.2',
    rank: 5,
    score: 8.3,
    titulo: 'AI Scribe Clínico para o Mercado Brasileiro (pt-BR)',
    categoria: 'HealthTech / IA Clínica',
    angulacao:
      'Premium pela experiência médica, não pelo preço. Founder com fluência em produto clínico (TISS/TUSS, fluxo ambulatorial) ganha de player horizontal. Margem SaaS, design importa — médico premium odeia interface ruim mais do que paga caro.',
    conexao: 'Bicofino-Studio escreve o manual de voz médico-clínico (categoria existe e é mal servida).',
    cuidado: 'Risco LGPD/CFM é real — dado de saúde exige arquitetura de privacidade desde o dia 1, não como afterthought.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.3',
    rank: 13,
    score: 8.0,
    titulo: 'Copiloto de IA para Psicólogos — Notas Clínicas (SOAP)',
    categoria: 'Mental Health / SaaS',
    angulacao:
      'Vertical estreito, ticket recorrente, founder com background em psicologia ou em design clínico. Categoria premium: profissional liberal de alto valor paga por ferramenta dignificada (poupa 30-40% de tempo administrativo).',
    conexao: 'Liga-se a A.3 (saúde mental marketplace) — Bicofino pode editorializar a tese conjunta.',
    cuidado: 'CFP e privacidade de prontuário psicológico têm exigência alta; vazamento mata categoria. Trust como produto, não como marketing.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.4',
    rank: 16,
    score: 7.9,
    titulo: 'Plataforma AEO + Monitor de Marca em LLMs',
    categoria: 'Marketing / MarTech',
    angulacao:
      'Categoria virgem em pt-BR. Founder premium (ex-CMO ou ex-Studio de branding) entende o produto como extensão natural do trabalho de marca, não como SaaS de SEO. Audita e otimiza presença em ChatGPT/Perplexity/AI Overviews. É a tese mais imediatamente útil para o próprio Bicofino consumir.',
    conexao: 'Capability que o Bicofino-Studio precisaria internamente para Off Pitch — Bicofino é cliente-piloto natural.',
    cuidado: 'Risco de comoditização rápida; defensibilidade vem do corpus de citações monitorado historicamente.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.5',
    rank: 40,
    score: 7.4,
    titulo: 'Plataforma CLM com IA para Contratos ("Ironclad do Brasil")',
    categoria: 'LegalTech / CLM',
    angulacao:
      'Mid-market premium (jurídicos de empresa de 200-2000 funcionários). Reforma Tributária força revisão de contratos longos. Founder com background jurídico-corporativo + product chops vence.',
    conexao: 'Bicofino-Consult abre 10 logos do mid-market como pilotos.',
    cuidado: 'Ciclo de venda longo, ICP-Brasil + integração SAP/TOTVS são tax de implementação real.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.6',
    rank: 47,
    score: 7.4,
    titulo: 'Agência de Marketing / Conteúdo Produtizada com IA',
    categoria: 'Marketing / Serviços',
    angulacao:
      'Serviço-produtizado com 60-80% de margem se vendido como retainer e operado com IA. Esta é a categoria mais próxima do modus operandi do próprio Bicofino-Off-Pitch: precisão cirúrgica, simples > complexo, valor cresce com a relação.',
    conexao: 'Tese serve de espelho do Bicofino-Studio — se você opera assim, este é o playbook documentado.',
    cuidado: 'Vulgariza rápido se virar "agência de IA"; só vence quem mantém disciplina de seleção de cliente.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.7',
    rank: 58,
    score: 7.3,
    titulo: 'Revenue Intelligence de Calls de Vendas (Gong/Clari do Brasil)',
    categoria: 'SaaS B2B / Sales',
    angulacao: 'Categoria com comparáveis globais avaliados em bilhões. Premium B2B mid-market. Founder com background em RevOps + produto.',
    conexao: 'Não há ligação Bicofino direta — entra na trilha por mérito de categoria.',
    cuidado: 'Gong em si pode entrar com versão pt-BR; janela é estreita.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.8',
    rank: 43,
    score: 7.4,
    titulo: 'Plataforma de ESG/Footprint e Compliance para PMEs Exportadoras',
    categoria: 'ESG / SaaS',
    angulacao:
      'Casa com P.7 (EUDR) mas em chave de produto SaaS. Founder com background em sustentabilidade corporativa + product chops. CSDDD/EUDR/Scope 3 forçam adoção em janela definida.',
    conexao: 'Editorial Bicofino-Itália — exportador BR para UE é o cliente que tem urgência hoje.',
    cuidado: 'Risco de virar checkbox compliance; defensibilidade só vem se o produto ajudar a operar melhor, não só a reportar.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.9',
    rank: 61,
    score: 7.3,
    titulo: 'AI FinOps — Visibilidade e Otimização de Custos de IA',
    categoria: 'AI Infra / FinOps',
    angulacao:
      'Categoria nasce agora — toda empresa com >R$50k/mês em LLM precisa. Founder com infra background + design (dashboard granular bem feito é metade do produto).',
    conexao: 'Bicofino-Studio interno é cliente-piloto.',
    cuidado: 'Provider lock-in (OpenAI/Anthropic) pode mudar regras de custo — produto precisa abstrair provedor.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.10',
    rank: 56,
    score: 7.3,
    titulo: 'ATS/CRM Nativo de IA para Recrutadoras e Staffing',
    categoria: 'SaaS B2B',
    angulacao: 'Vertical estreito, ICP claro (boutiques de RH e staffing), mid-market premium. Spott (YC S25) valida a categoria.',
    conexao: 'Bicofino-Consult conhece head-hunters de C-level — canal de venda natural.',
    cuidado: 'Categoria horizontal (ATS genérico) é cemitério; só vence quem entrega vertical específica.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.11',
    rank: 57,
    score: 7.3,
    titulo: 'Inteligência Competitiva / Battlecards Automatizados (Vendas B2B)',
    categoria: 'SaaS B2B',
    angulacao: 'Categoria nicho com pricing premium quando bem vendido. Crayon/Klue validam. Founder com background em product marketing.',
    conexao: 'Sem ligação direta.',
    cuidado: 'Risco de virar feature de outro produto (ATS ou CRM premium); defensibilidade depende de corpus competitivo proprietário.',
    trilha: 'construtor',
  },
  {
    codigo: 'B.12',
    rank: 62,
    score: 7.3,
    titulo: 'Copiloto de Segurança para Devs (Shift-Left Security)',
    categoria: 'Cybersecurity',
    angulacao: 'Founder técnico com background em security. PLG natural — IDE plugin com versão paga. Comparáveis globais (Snyk, Semgrep) provam o pricing premium quando o produto resolve.',
    conexao: 'Sem ligação direta.',
    cuidado: 'Categoria competitiva globalmente; vantagem brasileira tem que ser real (compliance LGPD/regulação setorial), não preço.',
    trilha: 'construtor',
  },

  // ─── Atleta (6) ───
  {
    codigo: 'A.1',
    rank: 100,
    score: 6.8,
    titulo: 'Plataforma de Diagnóstico Preventivo / Longevidade (Function BR)',
    categoria: 'HealthTech / Longevidade',
    angulacao:
      'A tese mais limpa do corpus para Cluster A. App + exames de sangue com IA → "relatório de saúde biológica" — exatamente o produto que o atleta consome em primeira pessoa e que pode endossar com legitimidade. Setor de longevidade absorveu centenas de milhões em rodadas recentes. Atleta entra como sócio-cliente, não como rosto pago.',
    conexao: 'Bicofino-On-Pitch viabiliza o lineup de 5-8 atletas-fundadores; Bicofino-Studio constrói a marca.',
    cuidado: 'Regulação CFM/Anvisa em diagnóstico preventivo é cinzenta; produto precisa ser desenhado para não tropeçar em "promessa terapêutica".',
    trilha: 'atleta',
  },
  {
    codigo: 'A.2',
    rank: 68,
    score: 7.2,
    titulo: 'Assistente IA para Personal Trainers e Nutricionistas',
    categoria: 'Wellness / SaaS',
    angulacao:
      'Atleta tem rede natural de personal trainers, preparadores e nutricionistas premium. Investir no SaaS que esses profissionais usam é tese de canal — não é o atleta que precisa vender, são os profissionais da rede dele.',
    conexao: 'On-Pitch entrega o canal; Off-Pitch entrega a marca.',
    cuidado: 'Categoria pode comoditizar (todo CRM PME ganha módulo de plano de treino); defensibilidade exige profundidade vertical real.',
    trilha: 'atleta',
  },
  {
    codigo: 'A.3',
    rank: 36,
    score: 7.5,
    titulo: 'Plataforma de Saúde Mental com IA (B2B + Marketplace Terapeutas)',
    categoria: 'Mental Health / Marketplace',
    angulacao:
      'Saúde mental do atleta é tema socialmente legitimado e comercialmente subatendido. Atleta de alta performance é embaixador natural (não pago — vivido). Tese resiste se for desenhada com curadoria, não com volume.',
    conexao: 'Encontra B.3 (copiloto SOAP para psicólogos) no lado da oferta.',
    cuidado: 'Marketplace em saúde mental tem ciclo CAC alto; modelo B2B (vendido a clubes, federações, RHs) tende a ser sustentável.',
    trilha: 'atleta',
  },
  {
    codigo: 'A.4',
    rank: 31,
    score: 7.6,
    titulo: 'Newsletter + Comunidade Paga de Curadoria de IA (pt-BR)',
    categoria: 'EdTech / Creator',
    angulacao:
      'Não é a IA o tema — é o formato: newsletter premium + comunidade fechada. Tese para atleta-criador que tem voz própria em outra vertical (treino, mentalidade, gestão de carreira). Capital mínimo, alavancagem por audiência.',
    conexao: 'Este formato é, ele mesmo, o protótipo do produto Club do Bicofino.',
    cuidado: 'Sem disciplina editorial, vira lista de e-mail. Curadoria é o produto.',
    trilha: 'atleta',
  },
  {
    codigo: 'A.5',
    rank: 60,
    score: 7.3,
    titulo: 'Plataforma de Cohort-Based Courses / Bootcamp por Vertical',
    categoria: 'EdTech / Creator',
    angulacao:
      'Atleta em transição (saída da carreira) é instrutor natural em vertical própria — gestão de carreira, contrato, finanças do atleta, performance. Cohort 4-8 semanas com placement transforma a expertise em ativo.',
    conexao: 'On-Pitch fornece o currículo (atletas como instrutores).',
    cuidado: 'Cohort exige operação síncrona; sem time, vira gravado e a margem cai.',
    trilha: 'atleta',
  },
  {
    codigo: 'A.6',
    rank: 76,
    score: 7.1,
    titulo: 'Diário/Journaling e Companion Emocional com IA (pt-BR)',
    categoria: 'Consumer / Wellness',
    angulacao:
      'Tese de produto de alta retenção em wellness, com memória persistente. Atleta como sócio + voz editorial (não imagem de campanha) — funciona se o produto tiver dignidade visual e narrativa de longa duração, não "app de chat com IA".',
    conexao: 'Bicofino-Studio responsável pela narrativa; sem ele, vira "ChatGPT para sentimentos".',
    cuidado: 'Risco regulatório monitorado (companion AI em saúde mental tem escrutínio crescente). Produto não pode prometer terapia.',
    trilha: 'atleta',
  },
]

export type Edicao = {
  titulo: string
  subtitulo: string
  trilha: Trilha
  fonte: string
  paragrafos: string[]
}

export const edicoes: Edicao[] = [
  {
    titulo: 'O Café que a Europa exige rastrear',
    subtitulo: 'Sobre a ideia "Rastreabilidade Farm-to-Fork / EUDR Compliance"',
    trilha: 'patriarca',
    fonte: 'Ranking VANGUARDA pos. 52 · score 7.3',
    paragrafos: [
      'A União Europeia decidiu que, a partir do prazo final do EUDR, não entra no continente saca de café, soja ou cacau cuja origem não esteja rastreada até o talhão. Para o produtor brasileiro de café especial — aquele que vende microlote para torrefador italiano específico, não commodity para bolsa de Nova York — a regra deixa de ser ônus e vira moat. O comprador europeu sempre quis saber de qual fazenda veio o lote; agora ele precisa saber. E precisa de prova auditável.',
      'O que se construiu enquanto isso, do lado da tecnologia, é a camada que faltava: geoprocessamento de Sentinel-2 cruzado com CAR, contratos de compra digitalizados, blockchain quando faz sentido e PDF quando basta. R$200 bilhões em exportações dependem desse traço de tinta. O ranking VANGUARDA pontua a ideia em 7.3 — não no topo, porque a regulação já foi adiada uma vez e pode adiar de novo. Mas o Patriarca-agro que conhece o calendário europeu sabe ler o sinal: regulação adiada não é regulação revogada.',
      'A pergunta que interessa não é "qual fornecedor de software escolher". A pergunta é qual fazenda da família vai ser a primeira a ter o dossiê EUDR completo. Quando o torrefador de Trieste pedir o documento — e ele vai pedir — o tempo de resposta separa quem vende premium de quem vende a granel. O café é, antes da tecnologia, uma conversa entre quem cultiva e quem torra. O que muda agora é que essa conversa precisa caber em um arquivo assinado.',
    ],
  },
  {
    titulo: 'O escritório de advocacia que aprendeu a ler petições à noite',
    subtitulo: 'Sobre a ideia "Agente Jurídico para Escritórios (Harvey Brasileiro)"',
    trilha: 'construtor',
    fonte: 'Ranking VANGUARDA pos. 2 · score 8.6',
    paragrafos: [
      'Há uma hierarquia silenciosa em escritórios de banca tradicional: o sócio recebe o caso, o associado faz a petição, o estagiário pesquisa a jurisprudência. O modelo durou um século. Sobreviveu à máquina de escrever, ao Microsoft Word, ao PJe, ao home office. Está sobrevivendo, de novo, a uma transformação que o mercado americano apelidou de "Harvey" — um copiloto que lê petições, cruza jurisprudência, sugere redação e devolve para o sócio em minutos o que o associado entregava em três dias.',
      'A versão brasileira ainda não existe em escala. Existe em fragmentos: cinco ou seis startups disputando a categoria, dezenas de escritórios usando GPT cru sob a mesa. O ranking VANGUARDA pontua a ideia em 8.6, segunda da lista de cem. O número alto vem do raro alinhamento de três variáveis: o mercado é grande, o comparável global está avaliado em bilhões, e o direito brasileiro é estranho o bastante para criar barreira natural a quem chega de fora.',
      'O que está em jogo, para o sócio que decide adotar ou não, não é eficiência — é hierarquia. Se o copiloto entrega o que o associado entregava, o que o associado faz no próximo ano? E no seguinte? A resposta razoável é que ele faz o que o sócio fazia: julga, escolhe, conversa com o cliente. Mas a transição custa. Custa folha, custa cultura, custa as conversas difíceis que o escritório adiou por uma década.',
      'Quem vai construir a empresa que vende o copiloto para esse escritório precisa ter passado o suficiente em uma banca tradicional para entender por que o sócio hesita. Sem essa passagem, vende software. Com ela, vende a transição.',
    ],
  },
  {
    titulo: 'O exame de sangue que conta o tempo',
    subtitulo: 'Sobre a ideia "Plataforma de Diagnóstico Preventivo / Longevidade"',
    trilha: 'atleta',
    fonte: 'Ranking VANGUARDA pos. 100 · score 6.8',
    paragrafos: [
      'O ranking VANGUARDA coloca a ideia em centésimo lugar. A leitura apressada concluiria que é a menos interessante das cem. A leitura cuidadosa nota outra coisa: é a única, entre as cem, que o atleta consome em primeira pessoa, antes de vender, antes de investir, antes de endossar.',
      'A categoria — longevidade clínica, quantified self sério, diagnóstico preventivo de assinatura — moveu centenas de milhões em rodadas recentes. O produto é, no essencial, antigo: exame de sangue trimestral. O que mudou foi a leitura. Uma camada de IA traduz cinquenta marcadores em um relatório de "idade biológica" — número único, comparável, longitudinal. O atleta de alta performance já fazia essa contagem há vinte anos, com um time de médicos e em silêncio. O que está sendo construído agora é a versão acessível, ainda assim premium, do mesmo serviço, com a estética de cabeceira que o público pretendido espera.',
      'A questão para o atleta que olha essa tese como investimento — não como assinante — é uma só: o produto sobrevive ao primeiro fundador que tentar fazer dele um app de massa? A categoria é vulnerável a ruído. A diferença entre "relatório de saúde que dura" e "ChatGPT da longevidade" é a disciplina editorial do produto. Quem entra cedo, em conselho, pode proteger essa linha.',
      'O Cluster A é, no Bicofino, a trilha mais natural para esta empresa. Não pelo motivo óbvio — porque atleta é embaixador. Pelo motivo opaco: porque atleta sabe ler exame.',
    ],
  },
]

export const descartes = [
  { rank: 14, titulo: 'Agente IA Restaurantes via WhatsApp (Pedidos + Pix Direto)', filtro: 'Estético + Cluster', razao: 'Categoria útil; território PME de delivery não é Bicofino.' },
  { rank: 34, titulo: 'Gestão IA para Salões de Beleza e Barbearias', filtro: 'Estético', razao: '1,5M de salões é mass market; fora da estética de permanência.' },
  { rank: 50, titulo: 'Copiloto IA para Odontologia', filtro: 'Cluster', razao: 'Sem ângulo premium claro; vertical PME profissional.' },
  { rank: 54, titulo: 'Micro-SaaS Gerador de Contratos para PMEs', filtro: 'Estético', razao: 'Self-serve barato; território correto, mas distante do Bicofino.' },
  { rank: 55, titulo: 'Marketplace Jurídico B2C (Acesso à Justiça)', filtro: 'Cluster + Estético', razao: 'Litigation funding em massa, fora do território Bicofino.' },
  { rank: 63, titulo: 'Microseguros via WhatsApp e Pix (Baixa Renda)', filtro: 'Cluster + Estético', razao: 'Vetor oposto ao Bicofino (volume baixo ticket × quiet luxury).' },
  { rank: 66, titulo: 'Monitoramento de Reputação IA para Negócios Locais', filtro: 'Cluster', razao: 'PME genérico; território é o "iFood do dono".' },
  { rank: 67, titulo: 'Social Media IA para PMEs e Criadores (Autopilot)', filtro: 'Estético', razao: 'Categoria útil; vulgariza com facilidade — não tem reframe Bicofino plausível.' },
  { rank: 71, titulo: 'AI Copywriter Especializado em Conversão (pt-BR)', filtro: 'Estético', razao: 'Mercado de info-produto. Fora da voz Bicofino mesmo com reframe.' },
  { rank: 74, titulo: 'Plataforma de Gestão de Aluguéis para Proprietários', filtro: 'Cluster', razao: 'Imobiliário PME; existe versão premium possível, mas o corpus original não a especifica.' },
  { rank: 75, titulo: 'Plataforma de Live Commerce / Shoppable Streaming', filtro: 'Estético', razao: 'TikTok Shop; estética de urgência, não de permanência.' },
  { rank: 79, titulo: 'Agente IA para Clínicas Veterinárias (PetTech)', filtro: 'Cluster', razao: 'Vertical pet PME; o premium pet existe (boutique animal) mas não é o que a ideia descreve.' },
  { rank: 82, titulo: 'Compliance Trabalhista Automatizado com IA (CCTs)', filtro: 'Cluster', razao: 'Operacional demais; o Patriarca já tem assessoria humana cara para isso.' },
  { rank: 95, titulo: 'SaaS de Compliance NR-12 / Segurança Industrial', filtro: 'Estético + Cluster', razao: 'Industrial blue-collar; território útil mas distante.' },
  { rank: 99, titulo: 'IA para Oficinas Mecânicas (Diagnóstico, Orçamento, OS)', filtro: 'Estético + Cluster', razao: 'Categoria fora do território Bicofino — alta volatilidade de relação vs. filosofia de permanência.' },
]

export const sinaisPlatform = [
  '"Wellness clínico de longa duração" é categoria editorial Club. A.1, A.3, B.2, B.3 e A.6 formam um eixo coerente — diagnóstico, terapia, saúde mental, journaling. Não como app, como capítulo recorrente da publicação Club.',
  'Brasil-Itália via exportação agro premium é a veia mais Bicofino do corpus. P.5, P.6, P.7, P.8, B.8 e a Edição 1 mostram que existe linha editorial natural sobre café, soja, cacau, vinho — ligando produtor BR a comprador IT/UE.',
  'Capability AEO/LLM-monitor é cliente interno antes de produto externo. B.4 e B.9 descrevem ferramentas que o próprio Bicofino-Studio consumiria antes de qualquer cliente — vale aceleração interna ou parceria de design-partner.',
  'Service-as-software premium (B.6) é o espelho documentado do Bicofino-Off-Pitch. A ideia é, na prática, a versão genérica do que o Bicofino opera — vale como benchmark de margem, gestão de retainer e disciplina de seleção de cliente.',
  'Creator economy "discreta" (A.4 newsletter + A.5 cohort) é o protótipo do produto Club. Antes de fazer Club, fazer uma publicação paga e um programa cohort com 20 nomes é o caminho de validação real — não com discurso, com assinaturas.',
]

export const comparativo = [
  { criterio: 'C1 — Tamanho de mercado (TAM)', peso: '15%', filtro: 'Filtro Cluster (parcial)', divergencia: 'Bicofino prefere TAM grande premium; rejeita TAM grande mass-market' },
  { criterio: 'C2 — Timing / Why now', peso: '15%', filtro: 'Filtro Conexão (parcial)', divergencia: 'Bicofino dá peso extra a timing regulatório (EUDR, Reforma, BCB 519) sobre timing de moda' },
  { criterio: 'C3 — Alavancagem', peso: '15%', filtro: 'Filtro Estético (inverso)', divergencia: 'Alta alavancagem por escala/IA pode bater na estética. Bicofino prefere alavancagem por relação (canal Patriarca > rede massificada)' },
  { criterio: 'C4 — Validação por aceleradoras/VCs', peso: '12%', filtro: '—', divergencia: 'Bicofino é agnóstico — YC RFS é sinal, não decisão' },
  { criterio: 'C5 — Defensibilidade / moat', peso: '10%', filtro: 'Filtro Estético + Conexão', divergencia: 'Bicofino dá peso extra a moats de relação (acesso) que a rubrica não pontua' },
  { criterio: 'C6 — Acessibilidade de capital', peso: '8%', filtro: 'Filtro Cluster (inverso para Patriarca)', divergencia: 'Bicofino inverte parcialmente — capital alto é aceitável quando casa com Patriarca' },
  { criterio: 'C7 — Velocidade de validação', peso: '8%', filtro: '—', divergencia: 'Bicofino tolera ciclos de 5-10 anos (capital paciente)' },
  { criterio: 'C8 — Acessibilidade para iniciantes', peso: '7%', filtro: 'Filtro Cluster (inverso)', divergencia: 'Bicofino tipicamente inverte — barreira de skill é desejável (Cluster B precisa de founder qualificado)' },
  { criterio: 'C9 — Potencial de escala global', peso: '6%', filtro: 'Filtro Triângulo Cultural', divergencia: 'Bicofino dá peso extra ao vetor Itália (ausente da rubrica)' },
  { criterio: 'C10 — Perfil de risco (invertido)', peso: '4%', filtro: '—', divergencia: 'Convergem' },
]
