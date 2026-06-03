// Verifica o refresh token, lista os Shared Drives e imprime o driveId do
// CENTRAL BICOFINO. Credenciais via Infisical; o refresh token vem em
// GOOGLE_OAUTH_REFRESH_TOKEN (passado no comando).
//   infisical run --projectId <id> --env dev -- \
//     env GOOGLE_OAUTH_REFRESH_TOKEN="<token>" node scripts/drive-setup.mjs

const id = process.env.GOOGLE_OAUTH_CLIENT_ID
const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
const refresh = process.env.GOOGLE_OAUTH_REFRESH_TOKEN
if (!id || !secret) { console.error('Faltam GOOGLE_OAUTH_CLIENT_ID/SECRET.'); process.exit(1) }
if (!refresh) { console.error('Passe GOOGLE_OAUTH_REFRESH_TOKEN no ambiente.'); process.exit(1) }

const tok = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: 'refresh_token' }),
})
if (!tok.ok) { console.error('Refresh token inválido:', await tok.text()); process.exit(1) }
const { access_token } = await tok.json()
console.log('✓ Refresh token válido — access token obtido.')

const dres = await fetch('https://www.googleapis.com/drive/v3/drives?fields=drives(id,name)&pageSize=100', {
  headers: { Authorization: `Bearer ${access_token}` },
})
if (!dres.ok) { console.error('Falha ao listar Shared Drives:', await dres.text()); process.exit(1) }
const { drives = [] } = await dres.json()

console.log(`\nShared Drives visíveis (${drives.length}):`)
for (const d of drives) console.log(`  ${d.id}  ${d.name}`)

const central = drives.find((d) => /central\s*bicofino/i.test(d.name))
if (central) {
  console.log(`\n➜ CENTRAL BICOFINO driveId = ${central.id}`)
} else {
  console.log('\n⚠ Não achei um drive com "CENTRAL BICOFINO" no nome. Use o id correto da lista acima.')
}
