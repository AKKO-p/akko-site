import { motion } from 'framer-motion'
import Blason from './Blason'
import { useContent, useLang } from '../i18n/lang'
import { useTheme } from '../theme'

export default function Nav() {
  const t = useContent()
  const { lang, setLang } = useLang()
  const { theme, toggle } = useTheme()

  return (
    <motion.header
      className="nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="shell nav__inner">
        <a className="nav__brand" href="#top" aria-label="AKKO">
          <Blason size={30} mode="static" breathe={false} />
          <span className="nav__word">AKKO</span>
        </a>
        <nav className="nav__links" aria-label="Navigation">
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__lang" role="group" aria-label="Language">
          <button
            className={lang === 'fr' ? 'is-active' : ''}
            onClick={() => setLang('fr')}
            aria-pressed={lang === 'fr'}
          >
            FR
          </button>
          <span aria-hidden>/</span>
          <button
            className={lang === 'en' ? 'is-active' : ''}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>
        <button
          className="nav__theme"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'}
          title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
        >
          {theme === 'dark' ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M12 2.5v2.4M12 19.1v2.4M21.5 12h-2.4M4.9 12H2.5M18.7 5.3l-1.7 1.7M7 17l-1.7 1.7M18.7 18.7L17 17M7 7 5.3 5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <a className="btn btn-primary nav__cta" href="#contact">
          {t.nav.cta}
        </a>
      </div>
    </motion.header>
  )
}
