// Backfill de content_hash p/ linhas antigas: baixa os bytes do Drive (alt=media,
// que NÃO transcoda imagem) e grava o SHA-256 — igual ao que o navegador calcula.
import { createClient } from '@supabase/supabase-js'
import { createHash } from 'node:crypto'
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const tok = await fetch('https://oauth2.googleapis.com/token', { method:'POST', headers:{'content-type':'application/x-www-form-urlencoded'}, body:new URLSearchParams({client_id:process.env.GOOGLE_OAUTH_CLIENT_ID,client_secret:process.env.GOOGLE_OAUTH_CLIENT_SECRET,refresh_token:process.env.GOOGLE_OAUTH_REFRESH_TOKEN,grant_type:'refresh_token'})})
const { access_token } = await tok.json()
const { data } = await sb.from('media_items').select('id,filename,drive_file_id').is('content_hash', null).not('drive_file_id','is',null)
console.log(`linhas sem hash: ${data.length}`)
for (const row of data) {
  const r = await fetch(`https://www.googleapis.com/drive/v3/files/${row.drive_file_id}?alt=media&supportsAllDrives=true`, { headers:{Authorization:`Bearer ${access_token}`} })
  if (!r.ok) { console.log(`  ✗ ${row.filename}: download ${r.status}`); continue }
  const buf = Buffer.from(await r.arrayBuffer())
  const hash = createHash('sha256').update(buf).digest('hex')
  const { error } = await sb.from('media_items').update({ content_hash: hash }).eq('id', row.id)
  console.log(`  ${error ? '✗' : '✓'} ${row.filename} → ${hash.slice(0,12)}…`)
}
