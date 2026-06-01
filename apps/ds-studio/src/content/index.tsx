'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { br } from './br'
import { en } from './en'
import { it } from './it'

export type Lang = 'br' | 'en' | 'it'

type ContentMap = typeof br
export type ContentKey = keyof ContentMap

const CONTENT: Record<Lang, ContentMap> = { br, en, it }
const STORAGE_KEY = 'bf-lang'

type LangContext = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: ContentKey) => string
}

const Ctx = createContext<LangContext>({
  lang: 'br',
  setLang: () => {},
  t: (key) => br[key] ?? key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('br')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
    if (stored && ['br', 'en', 'it'].includes(stored)) setLangState(stored)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }

  function t(key: ContentKey): string {
    return CONTENT[lang][key] ?? CONTENT.br[key] ?? key
  }

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useLang() {
  return useContext(Ctx)
}
