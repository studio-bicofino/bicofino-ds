// Cria (acha-ou-cria) a árvore de pastas de um atleta no Shared Drive
// CENTRAL BICOFINO: ATLETAS/<NOME>/{FOTOS,VIDEOS}. Idempotente.
// Credenciais via Infisical (GOOGLE_OAUTH_*) + GOOGLE_DRIVE_ID.
//   infisical run --projectId db5128c3-... --env dev -- \
//     node scripts/create-athlete-folder.mjs "LUCAS OVIES"

const folderName = process.argv[2]
if (!folderName) { console.error('Uso: node scripts/create-athlete-folder.mjs "<NOME DA PASTA>"'); process.exit(1) }

const id = process.env.GOOGLE_OAUTH_CLIENT_ID
const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
const refresh = process.env.GOOGLE_OAUTH_REFRESH_TOKEN
const drive = process.env.GOOGLE_DRIVE_ID
if (!id || !secret || !refresh || !drive) { console.error('Faltam GOOGLE_OAUTH_CLIENT_ID/SECRET/REFRESH_TOKEN ou GOOGLE_DRIVE_ID.'); process.exit(1) }

const FOLDER_MIME = 'application/vnd.google-apps.folder'

const tok = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: 'refresh_token' }),
})
if (!tok.ok) { console.error('Refresh token inválido:', await tok.text()); process.exit(1) }
const { access_token } = await tok.json()
const auth = { Authorization: `Bearer ${access_token}` }

async function findFolder(name, parentId) {
  const q = [
    `name = '${name.replace(/'/g, "\\'")}'`,
    `mimeType = '${FOLDER_MIME}'`,
    `'${parentId}' in parents`,
    'trashed = false',
  ].join(' and ')
  const url = new URL('https://www.googleapis.com/drive/v3/files')
  url.searchParams.set('q', q)
  url.searchParams.set('fields', 'files(id,name)')
  url.searchParams.set('supportsAllDrives', 'true')
  url.searchParams.set('includeItemsFromAllDrives', 'true')
  url.searchParams.set('corpora', 'drive')
  url.searchParams.set('driveId', drive)
  const res = await fetch(url, { headers: auth, cache: 'no-store' })
  if (!res.ok) throw new Error(`Drive busca falhou (${res.status}): ${await res.text()}`)
  const data = await res.json()
  return data.files[0]?.id ?? null
}

async function createFolder(name, parentId) {
  const url = new URL('https://www.googleapis.com/drive/v3/files')
  url.searchParams.set('supportsAllDrives', 'true')
  url.searchParams.set('fields', 'id')
  const res = await fetch(url, {
    method: 'POST',
    headers: { ...auth, 'content-type': 'application/json' },
    body: JSON.stringify({ name, mimeType: FOLDER_MIME, parents: [parentId] }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Drive criar pasta falhou (${res.status}): ${await res.text()}`)
  return (await res.json()).id
}

async function ensure(name, parentId) {
  const found = await findFolder(name, parentId)
  if (found) { console.log(`  = ${name} (já existe) ${found}`); return found }
  const created = await createFolder(name, parentId)
  console.log(`  + ${name} (criada) ${created}`)
  return created
}

console.log(`Resolvendo ATLETAS/${folderName}/{FOTOS,VIDEOS} no driveId ${drive}…`)
const atletas = await ensure('ATLETAS', drive)
const atleta = await ensure(folderName, atletas)
await ensure('FOTOS', atleta)
await ensure('VIDEOS', atleta)
console.log('✓ Pronto.')
