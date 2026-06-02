// Backfill da descrição no Drive p/ os arquivos já existentes — escreve o
// mesmo texto que os novos uploads passam a gravar (atleta, data, contexto,
// tags, obs.). Reconstrói a partir das linhas do Supabase.
import { createClient } from '@supabase/supabase-js'

const CATEGORY_LABEL = { jogo:'Jogo', gol:'Gol', assistencia:'Assistência', treino:'Treino', bastidor:'Bastidor', entrevista:'Entrevista', viagem:'Viagem', outro:'Outro' }
const MONTHS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
function fmtDate(iso){ if(!iso) return '—'; const [y,m,d]=iso.split('-').map(Number); return (!y||!m||!d)?iso:`${String(d).padStart(2,'0')} ${MONTHS[m-1]} ${y}` }
function buildDescription(r){
  const lines=[`Atleta: ${r.athlete_name}`, `Data: ${fmtDate(r.date)} · Categoria: ${CATEGORY_LABEL[r.category]??r.category}`]
  if(r.match) lines.push(`Jogo: ${r.match}`)
  if(r.competition) lines.push(`Contexto: ${r.competition}`)
  if(r.tags?.length) lines.push(`Tags: ${r.tags.join(', ')}`)
  if(r.notes) lines.push(`Obs.: ${r.notes}`)
  lines.push('', '— Enviado via Drive do Atleta · Bicofino')
  return lines.join('\n')
}

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const tok = await fetch('https://oauth2.googleapis.com/token', { method:'POST', headers:{'content-type':'application/x-www-form-urlencoded'}, body:new URLSearchParams({client_id:process.env.GOOGLE_OAUTH_CLIENT_ID,client_secret:process.env.GOOGLE_OAUTH_CLIENT_SECRET,refresh_token:process.env.GOOGLE_OAUTH_REFRESH_TOKEN,grant_type:'refresh_token'})})
const { access_token } = await tok.json()
const { data } = await sb.from('media_items').select('*').not('drive_file_id','is',null)
console.log(`arquivos: ${data.length}`)
for (const row of data) {
  const description = buildDescription(row)
  const r = await fetch(`https://www.googleapis.com/drive/v3/files/${row.drive_file_id}?supportsAllDrives=true&fields=id`, {
    method:'PATCH', headers:{Authorization:`Bearer ${access_token}`,'content-type':'application/json'}, body:JSON.stringify({ description }) })
  console.log(`  ${r.ok?'✓':'✗'} ${row.filename} (${r.status})`)
}
