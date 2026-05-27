import { createClient } from '@/lib/supabase/server'
import { buildSuggestions, type Suggestion } from '@/lib/utils/strings'
import { listTags } from './_actions/tags'
import { CadastroV2 } from './_components/CadastroV2'

export const dynamic = 'force-dynamic'

type TitleRow = { current_title: string | null; current_company: string | null }

async function getTitleAndCompanySuggestions(): Promise<{
  current_title: Suggestion[]
  current_company: Suggestion[]
}> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('people')
    .select('current_title, current_company')

  const rows = (data ?? []) as TitleRow[]
  return {
    current_title: buildSuggestions(rows.map((r) => r.current_title)),
    current_company: buildSuggestions(rows.map((r) => r.current_company)),
  }
}

export default async function CadastroPage() {
  const [allTags, suggestions] = await Promise.all([
    listTags(),
    getTitleAndCompanySuggestions(),
  ])

  return (
    <div
      className="cn-cadastro-wrapper"
      style={{
        width: '100%',
        maxWidth: 1280,
        padding: '24px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CadastroV2 allTags={allTags} suggestions={suggestions} />
    </div>
  )
}
