// Teste ponta-a-ponta do cano de upload contra o dev server em :3042.
// session → (CORS preflight) → PUT direto no Google → complete.
const BASE = process.env.E2E_BASE || 'http://localhost:3042'
const ORIGIN = process.env.E2E_ORIGIN || BASE

// PNG 1x1 válido.
const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMBAQDJ/pLvAAAAAElFTkSuQmCC',
  'base64',
)

const meta = {
  athleteSlug: 'salvatore-brancatelli',
  batchIndex: 0,
  mimeType: 'image/png',
  originalName: 'teste-e2e.png',
  sizeBytes: png.length,
  date: '2026-06-02',
  match: 'Teste E2E',
  competition: '',
  category: 'jogo',
}

console.log('1) POST /api/upload/session …')
const sres = await fetch(`${BASE}/api/upload/session`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: ORIGIN },
  body: JSON.stringify(meta),
})
const session = await sres.json()
if (!sres.ok) { console.error('   ✗ session falhou:', session); process.exit(1) }
console.log('   ✓ filename:', session.filename)
console.log('   ✓ drivePath:', session.drivePath)
console.log('   ✓ uploadUrl:', session.uploadUrl.slice(0, 80) + '…')

console.log('\n2) OPTIONS preflight CORS no uploadUrl (simula o navegador) …')
const pre = await fetch(session.uploadUrl, {
  method: 'OPTIONS',
  headers: {
    Origin: ORIGIN,
    'Access-Control-Request-Method': 'PUT',
    'Access-Control-Request-Headers': 'content-type',
  },
})
console.log('   status:', pre.status)
console.log('   Access-Control-Allow-Origin:', pre.headers.get('access-control-allow-origin'))
console.log('   Access-Control-Allow-Methods:', pre.headers.get('access-control-allow-methods'))

console.log('\n3) PUT dos bytes direto no Google …')
const put = await fetch(session.uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': 'image/png', Origin: ORIGIN },
  body: png,
})
if (!put.ok) { console.error('   ✗ PUT falhou:', put.status, await put.text()); process.exit(1) }
const drive = await put.json()
console.log('   ✓ driveFileId:', drive.id)
console.log('   ✓ webViewLink:', drive.webViewLink)

console.log('\n4) POST /api/upload/complete …')
const cres = await fetch(`${BASE}/api/upload/complete`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: ORIGIN },
  body: JSON.stringify({
    athleteSlug: meta.athleteSlug,
    filename: session.filename,
    originalName: meta.originalName,
    mimeType: meta.mimeType,
    sizeBytes: meta.sizeBytes,
    date: meta.date,
    match: meta.match,
    competition: null,
    category: meta.category,
    tags: ['teste-e2e'],
    notes: 'upload de verificação automática',
    drivePath: session.drivePath,
    driveFileId: drive.id,
    webViewLink: drive.webViewLink,
  }),
})
const done = await cres.json()
if (!cres.ok) { console.error('   ✗ complete falhou:', done); process.exit(1) }
console.log('   ✓ row no Supabase id:', done.item.id)
console.log('   ✓ status:', done.item.status)

console.log('\n✅ PONTA-A-PONTA OK')
// Imprime o id do Drive p/ limpeza posterior.
console.log('CLEANUP_DRIVE_FILE_ID=' + drive.id)
console.log('CLEANUP_ROW_ID=' + done.item.id)
