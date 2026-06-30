import { motion } from 'framer-motion'
import Blason from './Blason'
import { useContent, useLang } from '../i18n/lang'

export default function Nav() {
  const t = useContent()
  const { lang, setLang } = useLang()

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
        <a className="btn btn-primary nav__cta" href="#contact">
          {t.nav.cta}
        </a>
      </div>
    </motion.header>
  )
}
