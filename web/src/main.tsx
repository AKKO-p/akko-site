import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable fonts — bundled into the build, zero external request.
// display = Inter Tight (condensed institutional), body = Inter, mono = JetBrains.
import '@fontsource-variable/inter-tight/wght.css'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './styles/global.css'
import App from './App'
import { LangProvider } from './i18n/lang'
import { ThemeProvider } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </ThemeProvider>
  </StrictMode>,
)
