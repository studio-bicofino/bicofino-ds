// Runner de migrations — roda os .sql de supabase/migrations no Postgres do Supabase.
// Conexão: SUPABASE_DB_PASSWORD + ref do projeto (de NEXT_PUBLIC_SUPABASE_URL), ou
// DATABASE_URL explícito. Injetar segredos via Infisical:
//   infisical run --projectId <id> --env dev -- node scripts/migrate.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pg from 'pg'

const here = dirname(fileURLToPath(import.meta.url))
const migrationsDir = join(here, '..', 'supabase', 'migrations')

const pw = process.env.SUPABASE_DB_PASSWORD
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
if (!pw || !url) {
  console.error('Faltam SUPABASE_DB_PASSWORD e/ou NEXT_PUBLIC_SUPABASE_URL no ambiente.')
  process.exit(1)
}
const ref = new URL(url).hostname.split('.')[0] // epfqgyczujaroayqslwk
const region = process.env.SUPABASE_REGION || 'us-west-2'

// Candidatos de conexão, em ordem de robustez p/ IPv4.
const candidates = process.env.DATABASE_URL
  ? [process.env.DATABASE_URL]
  : [
      `postgresql://postgres.${ref}:${encodeURIComponent(pw)}@aws-0-${region}.pooler.supabase.com:5432/postgres`,
      `postgresql://postgres.${ref}:${encodeURIComponent(pw)}@aws-1-${region}.pooler.supabase.com:5432/postgres`,
      `postgresql://postgres:${encodeURIComponent(pw)}@db.${ref}.supabase.co:5432/postgres`,
    ]

const sql = readdirSync(migrationsDir)
  .filter((f) => f.endsWith('.sql'))
  .sort()
  .map((f) => `-- ${f}\n${readFileSync(join(migrationsDir, f), 'utf8')}`)
  .join('\n\n')

async function tryConnect(conn) {
  const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } })
  await client.connect()
  return client
}

let client
for (const conn of candidates) {
  const host = conn.replace(/:[^:@]+@/, ':***@')
  try {
    process.stdout.write(`Conectando: ${host} … `)
    client = await tryConnect(conn)
    console.log('ok')
    break
  } catch (e) {
    console.log(`falhou (${e.code || e.message})`)
  }
}
if (!client) {
  console.error('Não consegui conectar em nenhum candidato. Defina DATABASE_URL.')
  process.exit(1)
}

try {
  await client.query(sql)
  const { rows } = await client.query(
    `select column_name, data_type from information_schema.columns
     where table_schema='public' and table_name='media_items' order by ordinal_position`,
  )
  console.log(`\nTabela public.media_items — ${rows.length} colunas:`)
  for (const r of rows) console.log(`  ${r.column_name.padEnd(16)} ${r.data_type}`)
} finally {
  await client.end()
}
