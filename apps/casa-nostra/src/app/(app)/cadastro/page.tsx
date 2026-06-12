import { createClient } from '@/lib/supabase/server'
import { buildSuggestions, type Suggestion } from '@/lib/utils/strings'
import { listTags } from './_actions/tags'
import { CadastroV2 } from './_components/CadastroV2'

export const dynamic = 'force-dynamic'

type SuggestionRow = {
  current_title: string | null
  current_company: string | null
  home_city: string | null
}

async function getFormSuggestions(): Promise<{
  current_title: Suggestion[]
  current_company: Suggestion[]
  home_city: Suggestion[]
}> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('people')
    .select('current_title, current_company, home_city')

  const rows = (data ?? []) as SuggestionRow[]
  return {
    current_title: buildSuggestions(rows.map((r) => r.current_title)),
    current_company: buildSuggestions(rows.map((r) => r.current_company)),
    home_city: buildSuggestions(rows.map((r) => r.home_city)),
  }
}

/** Menor Sócio nº positivo ainda livre (preenche buracos: 1,2,4 → sugere 3). */
async function getNextMemberNumber(): Promise<number> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('people')
    .select('member_number')
    .not('member_number', 'is', null)
  const used = new Set(
    ((data ?? []) as Array<{ member_number: number | null }>)
      .map((r) => r.member_number)
      .filter((n): n is number => n != null && n > 0),
  )
  let n = 1
  while (used.has(n)) n++
  return n
}

export default async function CadastroPage() {
  const [allTags, suggestions, nextMemberNumber] = await Promise.all([
    listTags(),
    getFormSuggestions(),
    getNextMemberNumber(),
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
      <CadastroV2
        allTags={allTags}
        suggestions={suggestions}
        suggestedMemberNumber={nextMemberNumber}
      />
    </div>
  )
}
