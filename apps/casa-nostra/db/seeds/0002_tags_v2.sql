-- Casa Nostra v2 — seeds de tags (Onda 6)
-- Skills/Atuação, Grupos e Afiliações comuns no mercado BR + global,
-- pra facilitar o cadastro do Fabio via autocomplete do TagInput.
--
-- Fabio pode adicionar tags custom on-the-fly (TagInput já tem "criar nova").
-- Idempotente via UNIQUE (kind, name_key).
--
-- name_key segue a regra de @/lib/utils/strings#normalizeKey:
--   stripOrnaments → NFD → remove diacritics → lowercase → trim → collapse spaces.

-- ============================================================
-- SKILLS / ATUAÇÃO (43)
-- ============================================================
insert into public.tags (name, name_key, kind) values
  ('Tech',                       'tech',                       'skill'),
  ('Software / SaaS',            'software / saas',            'skill'),
  ('Fintech',                    'fintech',                    'skill'),
  ('E-commerce',                 'e-commerce',                 'skill'),
  ('AI / Dados',                 'ai / dados',                 'skill'),
  ('Adtech',                     'adtech',                     'skill'),
  ('Financeiro',                 'financeiro',                 'skill'),
  ('Bancos',                     'bancos',                     'skill'),
  ('Investimentos',              'investimentos',              'skill'),
  ('Private Equity / VC',        'private equity / vc',        'skill'),
  ('Seguros',                    'seguros',                    'skill'),
  ('Publicidade',                'publicidade',                'skill'),
  ('Marketing',                  'marketing',                  'skill'),
  ('Branding',                   'branding',                   'skill'),
  ('Mídia / Jornalismo',         'midia / jornalismo',         'skill'),
  ('Audiovisual',                'audiovisual',                'skill'),
  ('Música',                     'musica',                     'skill'),
  ('Agro',                       'agro',                       'skill'),
  ('Energia',                    'energia',                    'skill'),
  ('Mineração',                  'mineracao',                  'skill'),
  ('Indústria',                  'industria',                  'skill'),
  ('Construção / Imobiliário',   'construcao / imobiliario',   'skill'),
  ('Logística',                  'logistica',                  'skill'),
  ('Varejo',                     'varejo',                     'skill'),
  ('Moda',                       'moda',                       'skill'),
  ('Gastronomia / F&B',          'gastronomia / f&b',          'skill'),
  ('Hospitalidade',              'hospitalidade',              'skill'),
  ('Luxo',                       'luxo',                       'skill'),
  ('Turismo',                    'turismo',                    'skill'),
  ('Saúde',                      'saude',                      'skill'),
  ('Farma',                      'farma',                      'skill'),
  ('Educação',                   'educacao',                   'skill'),
  ('Consultoria',                'consultoria',                'skill'),
  ('Direito',                    'direito',                    'skill'),
  ('Auditoria',                  'auditoria',                  'skill'),
  ('Futebol Atleta',             'futebol atleta',             'skill'),
  ('Futebol Dirigente',          'futebol dirigente',          'skill'),
  ('Marketing Esportivo',        'marketing esportivo',        'skill'),
  ('Política / Governo',         'politica / governo',         'skill'),
  ('Diplomacia',                 'diplomacia',                 'skill'),
  ('Empreendedorismo',           'empreendedorismo',           'skill'),
  ('Investidor',                 'investidor',                 'skill'),
  ('Conselheiro',                'conselheiro',                'skill')
on conflict (kind, name_key) do nothing;

-- ============================================================
-- GRUPOS (32) — clubes, colégios, universidades, networks
-- ============================================================
insert into public.tags (name, name_key, kind) values
  -- Clubes
  ('Clube Pinheiros',                       'clube pinheiros',                       'grupo'),
  ('Clube Hebraica',                        'clube hebraica',                        'grupo'),
  ('Iate Clube SP',                         'iate clube sp',                         'grupo'),
  ('Jockey Club SP',                        'jockey club sp',                        'grupo'),
  ('Harmonia',                              'harmonia',                              'grupo'),
  ('Monte Líbano',                          'monte libano',                          'grupo'),
  -- Colégios
  ('Colégio Bandeirantes',                  'colegio bandeirantes',                  'grupo'),
  ('Colégio Móbile',                        'colegio mobile',                        'grupo'),
  ('Dante Alighieri',                       'dante alighieri',                       'grupo'),
  ('Visconde de Porto Seguro',              'visconde de porto seguro',              'grupo'),
  ('Graded School',                         'graded school',                         'grupo'),
  ('Liceu Pasteur',                         'liceu pasteur',                         'grupo'),
  -- Universidades BR
  ('USP',                                   'usp',                                   'grupo'),
  ('FGV',                                   'fgv',                                   'grupo'),
  ('Insper',                                'insper',                                'grupo'),
  ('FAAP',                                  'faap',                                  'grupo'),
  ('Mackenzie',                             'mackenzie',                             'grupo'),
  ('ESPM',                                  'espm',                                  'grupo'),
  ('PUC-SP',                                'puc-sp',                                'grupo'),
  -- Universidades global
  ('Harvard',                               'harvard',                               'grupo'),
  ('Stanford',                              'stanford',                              'grupo'),
  ('MIT',                                   'mit',                                   'grupo'),
  ('Wharton',                               'wharton',                               'grupo'),
  ('INSEAD',                                'insead',                                'grupo'),
  ('LBS',                                   'lbs',                                   'grupo'),
  -- Networks
  ('Endeavor',                              'endeavor',                              'grupo'),
  ('YPO',                                   'ypo',                                   'grupo'),
  ('EO',                                    'eo',                                    'grupo'),
  ('Global Shapers',                        'global shapers',                        'grupo'),
  -- Mercados
  ('Mercado Publicitário',                  'mercado publicitario',                  'grupo'),
  ('Mercado Financeiro',                    'mercado financeiro',                    'grupo'),
  ('Mercado Esportivo',                     'mercado esportivo',                     'grupo')
on conflict (kind, name_key) do nothing;

-- ============================================================
-- AFILIAÇÕES (45) — orgs grandes recorrentes
-- ============================================================
insert into public.tags (name, name_key, kind) values
  -- Futebol BR
  ('Palmeiras',                             'palmeiras',                             'afiliacao'),
  ('Corinthians',                           'corinthians',                           'afiliacao'),
  ('São Paulo',                             'sao paulo',                             'afiliacao'),
  ('Santos',                                'santos',                                'afiliacao'),
  ('Flamengo',                              'flamengo',                              'afiliacao'),
  ('Vasco',                                 'vasco',                                 'afiliacao'),
  ('Botafogo',                              'botafogo',                              'afiliacao'),
  ('Fluminense',                            'fluminense',                            'afiliacao'),
  ('Grêmio',                                'gremio',                                'afiliacao'),
  ('Internacional',                         'internacional',                         'afiliacao'),
  ('Atlético Mineiro',                      'atletico mineiro',                      'afiliacao'),
  ('Cruzeiro',                              'cruzeiro',                              'afiliacao'),
  -- Futebol global + entidades
  ('Napoli',                                'napoli',                                'afiliacao'),
  ('Real Madrid',                           'real madrid',                           'afiliacao'),
  ('Barcelona',                             'barcelona',                             'afiliacao'),
  ('Manchester City',                       'manchester city',                       'afiliacao'),
  ('Liverpool',                             'liverpool',                             'afiliacao'),
  ('FIFA',                                  'fifa',                                  'afiliacao'),
  ('UEFA',                                  'uefa',                                  'afiliacao'),
  ('CBF',                                   'cbf',                                   'afiliacao'),
  ('CONMEBOL',                              'conmebol',                              'afiliacao'),
  ('Federação Paulista de Futebol',         'federacao paulista de futebol',         'afiliacao'),
  -- Marcas esporte
  ('Adidas',                                'adidas',                                'afiliacao'),
  ('Nike',                                  'nike',                                  'afiliacao'),
  ('Puma',                                  'puma',                                  'afiliacao'),
  -- Bancos
  ('Itaú',                                  'itau',                                  'afiliacao'),
  ('Bradesco',                              'bradesco',                              'afiliacao'),
  ('Santander',                             'santander',                             'afiliacao'),
  ('BTG Pactual',                           'btg pactual',                           'afiliacao'),
  ('XP',                                    'xp',                                    'afiliacao'),
  -- Tech BR
  ('Nubank',                                'nubank',                                'afiliacao'),
  ('iFood',                                 'ifood',                                 'afiliacao'),
  ('Mercado Livre',                         'mercado livre',                         'afiliacao'),
  ('Stone',                                 'stone',                                 'afiliacao'),
  -- Tech global
  ('Apple',                                 'apple',                                 'afiliacao'),
  ('Google',                                'google',                                'afiliacao'),
  ('Meta',                                  'meta',                                  'afiliacao'),
  ('Microsoft',                             'microsoft',                             'afiliacao'),
  ('Amazon',                                'amazon',                                'afiliacao'),
  -- Bebidas / Consumo
  ('Ambev',                                 'ambev',                                 'afiliacao'),
  ('Coca-Cola',                             'coca-cola',                             'afiliacao'),
  ('Heineken',                              'heineken',                              'afiliacao'),
  ('Red Bull',                              'red bull',                              'afiliacao'),
  -- Mídia
  ('Globo',                                 'globo',                                 'afiliacao'),
  ('Netflix',                               'netflix',                               'afiliacao')
on conflict (kind, name_key) do nothing;
