import 'server-only'
import { getAccessToken, driveId } from './google'

/* ─────────────────────────────────────────────────────────────
   Google Drive API v3 (REST puro, sem googleapis) — escreve no Shared
   Drive CENTRAL BICOFINO. Num Shared Drive a raiz é o próprio driveId,
   então resolvemos ATLETAS/<atleta>/{FOTOS,VIDEOS} a partir dele.
   Toda chamada leva supportsAllDrives:true (e corpora=drive na busca).

   D2: o servidor só INICIA a sessão resumable e devolve a uploadUrl;
   os bytes vão direto do navegador para o Google (não passam pela Vercel).
   ───────────────────────────────────────────────────────────── */

const FOLDER_MIME = 'application/vnd.google-apps.folder'

// Cache de folderId por caminho ('ATLETAS/SALVATORE BRANCATELLI/FOTOS'),
// vivo enquanto a função serverless estiver quente. Pastas não mudam.
const folderCache = new Map<string, string>()

async function authHeaders(): Promise<Record<string, string>> {
  return { Authorization: `Bearer ${await getAccessToken()}` }
}

/** Acha uma subpasta pelo nome dentro de um parent; null se não existir. */
async function findFolder(name: string, parentId: string): Promise<string | null> {
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
  url.searchParams.set('driveId', driveId())

  const res = await fetch(url, { headers: await authHeaders(), cache: 'no-store' })
  if (!res.ok) throw new Error(`Drive busca falhou (${res.status}): ${await res.text()}`)
  const data = (await res.json()) as { files: { id: string }[] }
  return data.files[0]?.id ?? null
}

/** Cria uma subpasta dentro de um parent e devolve o id. */
async function createFolder(name: string, parentId: string): Promise<string> {
  const url = new URL('https://www.googleapis.com/drive/v3/files')
  url.searchParams.set('supportsAllDrives', 'true')
  url.searchParams.set('fields', 'id')

  const res = await fetch(url, {
    method: 'POST',
    headers: { ...(await authHeaders()), 'content-type': 'application/json' },
    body: JSON.stringify({ name, mimeType: FOLDER_MIME, parents: [parentId] }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Drive criar pasta falhou (${res.status}): ${await res.text()}`)
  return ((await res.json()) as { id: string }).id
}

/** Resolve (achando ou criando) a árvore de pastas e devolve o folderId final. */
export async function resolveFolderId(segments: string[]): Promise<string> {
  const key = segments.join('/')
  const cached = folderCache.get(key)
  if (cached) return cached

  let parent = driveId() // raiz = o próprio Shared Drive
  let path = ''
  for (const name of segments) {
    path = path ? `${path}/${name}` : name
    let id = folderCache.get(path)
    if (!id) {
      id = (await findFolder(name, parent)) ?? (await createFolder(name, parent))
      folderCache.set(path, id)
    }
    parent = id
  }
  return parent
}

/** Inicia uma sessão de upload resumable e devolve a URL descartável p/ o PUT do navegador. */
export async function startResumableUpload(opts: {
  name: string
  mimeType: string
  parentId: string
  sizeBytes: number
  origin: string
}): Promise<string> {
  const url = new URL('https://www.googleapis.com/upload/drive/v3/files')
  url.searchParams.set('uploadType', 'resumable')
  url.searchParams.set('supportsAllDrives', 'true')
  // Campos que o Google devolve no PUT final (concluído pelo navegador).
  url.searchParams.set('fields', 'id,name,webViewLink,webContentLink')

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...(await authHeaders()),
      'content-type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Type': opts.mimeType,
      'X-Upload-Content-Length': String(opts.sizeBytes),
      // Vincula a sessão à origem do app para liberar o PUT cross-origin (CORS).
      Origin: opts.origin,
    },
    body: JSON.stringify({ name: opts.name, parents: [opts.parentId] }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Drive iniciar resumable falhou (${res.status}): ${await res.text()}`)

  const location = res.headers.get('location')
  if (!location) throw new Error('Drive não devolveu a Location da sessão resumable.')
  return location
}
