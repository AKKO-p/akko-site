import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { CONTENT, type Lang } from './content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void }
const LangCtx = createContext<Ctx>({ lang: 'fr', setLang: () => {}, toggle: () => {} })

const KEY = 'akko-lang'

function initial(): Lang {
  if (typeof window === 'undefined') return 'fr'
  const saved = window.localStorage.getItem(KEY)
  if (saved === 'fr' || saved === 'en') return saved
  // default French, but honour an English browser if nothing saved
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'fr'
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial)

  const setLang = (l: Lang) => setLangState(l)
  const toggle = () => setLangState((l) => (l === 'fr' ? 'en' : 'fr'))

  useEffect(() => {
    window.localStorage.setItem(KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang])
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export function useLang() {
  return useContext(LangCtx)
}

/** the content tree for the active language */
export function useContent() {
  const { lang } = useLang()
  return CONTENT[lang]
}
