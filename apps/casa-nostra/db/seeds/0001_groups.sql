-- Casa Nostra — seeds iniciais
-- Grupos master conforme briefing. Fabio adiciona novos via UI.

insert into public.groups (name, group_type) values
  ('Clube Pinheiros',                    'clube'),
  ('Clube Atlético São Paulo',           'clube'),
  ('Esporte Clube Sírio',                'clube'),
  ('Hebraica',                           'clube'),
  ('Harmonia',                           'clube'),
  ('CBF',                                'entidade'),
  ('CONMEBOL',                           'entidade'),
  ('FIFA',                               'entidade'),
  ('Federação Paulista de Futebol',      'entidade'),
  ('Grupo Empresários',                  'empresarial'),
  ('Grupo Publicitários',                'profissional'),
  ('Mundo Corporativo',                  'profissional'),
  ('Financeiro / Wealth',                'profissional'),
  ('Mídia / Jornalistas',                'profissional'),
  ('Colégio Bandeirantes',               'educacional'),
  ('Colégio Dante Alighieri',            'educacional'),
  ('Colégio Móbile',                     'educacional'),
  ('FGV',                                'educacional'),
  ('Insper',                             'educacional'),
  ('USP',                                'educacional'),
  ('Amigos Particulares',                'pessoal'),
  ('Família',                            'pessoal')
on conflict (name) do nothing;
