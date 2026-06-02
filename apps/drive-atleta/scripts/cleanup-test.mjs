// Remove um artefato de teste: arquivo no Drive + linha no Supabase.
//   infisical run --projectId <id> --env dev -- \
//     node scripts/cleanup-test.mjs <DRIVE_FILE_ID> <ROW_ID>
import { createClient } from '@supabase/supabase-js'

const [fileId, rowId] = process.argv.slice(2)
if (!fileId || !rowId) { console.error('uso: cleanup-test.mjs <DRIVE_FILE_ID> <ROW_ID>'); process.exit(1) }

// access token
const tok = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  }),
})
const { access_token } = await tok.json()

// Content manager não pode deletar permanentemente em Shared Drive → manda pra lixeira.
const del = await fetch(
  `https://www.googleapis.com/drive/v3/files/${fileId}?supportsAllDrives=true`,
  {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${access_token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ trashed: true }),
  },
)
console.log('Drive trash:', del.status)

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const { error } = await sb.from('media_items').delete().eq('id', rowId)
console.log('Supabase delete:', error ? error.message : 'ok')
