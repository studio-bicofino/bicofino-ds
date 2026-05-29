#!/usr/bin/env node
// Casa Nostra v2 — runner do seed 0002_tags_v2.sql via REST.
// Idempotente via UNIQUE (kind, name_key) + Prefer: resolution=merge-duplicates.
//
// Uso:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node seed-tags-v2.mjs
//   ou (via Infisical):  infisical run --env=dev -- node seed-tags-v2.mjs

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const TAGS = [
  // skills
  ['Tech', 'skill'],
  ['Software / SaaS', 'skill'],
  ['Fintech', 'skill'],
  ['E-commerce', 'skill'],
  ['AI / Dados', 'skill'],
  ['Adtech', 'skill'],
  ['Financeiro', 'skill'],
  ['Bancos', 'skill'],
  ['Investimentos', 'skill'],
  ['Private Equity / VC', 'skill'],
  ['Seguros', 'skill'],
  ['Publicidade', 'skill'],
  ['Marketing', 'skill'],
  ['Branding', 'skill'],
  ['Mídia / Jornalismo', 'skill'],
  ['Audiovisual', 'skill'],
  ['Música', 'skill'],
  ['Agro', 'skill'],
  ['Energia', 'skill'],
  ['Mineração', 'skill'],
  ['Indústria', 'skill'],
  ['Construção / Imobiliário', 'skill'],
  ['Logística', 'skill'],
  ['Varejo', 'skill'],
  ['Moda', 'skill'],
  ['Gastronomia / F&B', 'skill'],
  ['Hospitalidade', 'skill'],
  ['Luxo', 'skill'],
  ['Turismo', 'skill'],
  ['Saúde', 'skill'],
  ['Farma', 'skill'],
  ['Educação', 'skill'],
  ['Consultoria', 'skill'],
  ['Direito', 'skill'],
  ['Auditoria', 'skill'],
  ['Futebol Atleta', 'skill'],
  ['Futebol Dirigente', 'skill'],
  ['Marketing Esportivo', 'skill'],
  ['Política / Governo', 'skill'],
  ['Diplomacia', 'skill'],
  ['Empreendedorismo', 'skill'],
  ['Investidor', 'skill'],
  ['Conselheiro', 'skill'],

  // grupos
  ['Clube Pinheiros', 'grupo'],
  ['Clube Hebraica', 'grupo'],
  ['Iate Clube SP', 'grupo'],
  ['Jockey Club SP', 'grupo'],
  ['Harmonia', 'grupo'],
  ['Monte Líbano', 'grupo'],
  ['Colégio Bandeirantes', 'grupo'],
  ['Colégio Móbile', 'grupo'],
  ['Dante Alighieri', 'grupo'],
  ['Visconde de Porto Seguro', 'grupo'],
  ['Graded School', 'grupo'],
  ['Liceu Pasteur', 'grupo'],
  ['USP', 'grupo'],
  ['FGV', 'grupo'],
  ['Insper', 'grupo'],
  ['FAAP', 'grupo'],
  ['Mackenzie', 'grupo'],
  ['ESPM', 'grupo'],
  ['PUC-SP', 'grupo'],
  ['Harvard', 'grupo'],
  ['Stanford', 'grupo'],
  ['MIT', 'grupo'],
  ['Wharton', 'grupo'],
  ['INSEAD', 'grupo'],
  ['LBS', 'grupo'],
  ['Endeavor', 'grupo'],
  ['YPO', 'grupo'],
  ['EO', 'grupo'],
  ['Global Shapers', 'grupo'],
  ['Mercado Publicitário', 'grupo'],
  ['Mercado Financeiro', 'grupo'],
  ['Mercado Esportivo', 'grupo'],

  // afiliações
  ['Palmeiras', 'afiliacao'],
  ['Corinthians', 'afiliacao'],
  ['São Paulo', 'afiliacao'],
  ['Santos', 'afiliacao'],
  ['Flamengo', 'afiliacao'],
  ['Vasco', 'afiliacao'],
  ['Botafogo', 'afiliacao'],
  ['Fluminense', 'afiliacao'],
  ['Grêmio', 'afiliacao'],
  ['Internacional', 'afiliacao'],
  ['Atlético Mineiro', 'afiliacao'],
  ['Cruzeiro', 'afiliacao'],
  ['Napoli', 'afiliacao'],
  ['Real Madrid', 'afiliacao'],
  ['Barcelona', 'afiliacao'],
  ['Manchester City', 'afiliacao'],
  ['Liverpool', 'afiliacao'],
  ['FIFA', 'afiliacao'],
  ['UEFA', 'afiliacao'],
  ['CBF', 'afiliacao'],
  ['CONMEBOL', 'afiliacao'],
  ['Federação Paulista de Futebol', 'afiliacao'],
  ['Adidas', 'afiliacao'],
  ['Nike', 'afiliacao'],
  ['Puma', 'afiliacao'],
  ['Itaú', 'afiliacao'],
  ['Bradesco', 'afiliacao'],
  ['Santander', 'afiliacao'],
  ['BTG Pactual', 'afiliacao'],
  ['XP', 'afiliacao'],
  ['Nubank', 'afiliacao'],
  ['iFood', 'afiliacao'],
  ['Mercado Livre', 'afiliacao'],
  ['Stone', 'afiliacao'],
  ['Apple', 'afiliacao'],
  ['Google', 'afiliacao'],
  ['Meta', 'afiliacao'],
  ['Microsoft', 'afiliacao'],
  ['Amazon', 'afiliacao'],
  ['Ambev', 'afiliacao'],
  ['Coca-Cola', 'afiliacao'],
  ['Heineken', 'afiliacao'],
  ['Red Bull', 'afiliacao'],
  ['Globo', 'afiliacao'],
  ['Netflix', 'afiliacao'],
]

// normalizeKey mirror of @/lib/utils/strings#normalizeKey (sem stripOrnaments aqui — entradas
// curadas não têm emojis).
function normalizeKey(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

const payload = TAGS.map(([name, kind]) => ({
  name,
  name_key: normalizeKey(name),
  kind,
}))

const url = `${SUPABASE_URL}/rest/v1/tags?on_conflict=kind,name_key`
const res = await fetch(url, {
  method: 'POST',
  headers: {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates,return=representation',
  },
  body: JSON.stringify(payload),
})

if (!res.ok) {
  const txt = await res.text()
  console.error(`POST failed ${res.status}: ${txt}`)
  process.exit(1)
}

const inserted = await res.json()
const bySkill = inserted.filter((t) => t.kind === 'skill').length
const byGrupo = inserted.filter((t) => t.kind === 'grupo').length
const byAfil = inserted.filter((t) => t.kind === 'afiliacao').length
console.log(
  `OK · ${inserted.length} tags upserted (skill=${bySkill}, grupo=${byGrupo}, afiliacao=${byAfil})`,
)
