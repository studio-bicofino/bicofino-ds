'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { br } from './br'
import { en } from './en'

export type Lang = 'br' | 'en'

type Dict = Record<string, string>
const dicts: Record<Lang, Dict> = { br: br as Dict, en: en as Dict }

interface LangContext {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const Ctx = createContext<LangContext>({
  lang: 'br',
  setLang: () => {},
  t: (key) => (br as Dict)[key] ?? key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('br')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bf-lang') as Lang | null
      if (stored === 'en' || stored === 'br') setLangState(stored)
    } catch {
      // localStorage unavailable
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('bf-lang', l)
    } catch {
      // localStorage unavailable
    }
  }

  const t = (key: string): string =>
    dicts[lang][key] ?? dicts.br[key] ?? key

  return React.createElement(Ctx.Provider, { value: { lang, setLang, t } }, children)
}

export function useLang(): LangContext {
  return useContext(Ctx)
}
