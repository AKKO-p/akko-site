import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Theme = 'dark' | 'light'
type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void }

const ThemeCtx = createContext<Ctx>({ theme: 'dark', setTheme: () => {}, toggle: () => {} })
const KEY = 'akko-theme'

function initial(): Theme {
  if (typeof document !== 'undefined') {
    const set = document.documentElement.dataset.theme
    if (set === 'dark' || set === 'light') return set
  }
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem(KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(initial)
  const setTheme = (t: Theme) => setThemeState(t)
  const toggle = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(KEY, theme)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme])
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  return useContext(ThemeCtx)
}
