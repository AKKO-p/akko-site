import Blason from '../components/Blason'
import Reveal from '../components/Reveal'
import { useContent, useLang } from '../i18n/lang'
import '../styles/contact.css'

/** brand trust signals — a governed-visual micro-label set, lang-aware like GovernedDemo */
const SIGNALS: Record<'fr' | 'en', string[]> = {
  fr: ['Souverain', 'Open-core', 'Air-gap'],
  en: ['Sovereign', 'Open-core', 'Air-gap'],
}

export default function Contact() {
  const t = useContent()
  const { lang } = useLang()

  return (
    <section className="cta" id="contact">
      <div className="shell cta__inner">
        <Reveal className="cta__mark" y={12}>
          <Blason size={64} mode="static" breathe />
        </Reveal>

        <Reveal delay={0.06}>
          <span className="eyebrow cta__eyebrow">{t.contact.eyebrow}</span>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="cta__title">
            {t.contact.titleA}
            <span className="accent-text">{t.contact.grad}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="cta__sub">{t.contact.sub}</p>
        </Reveal>

        <Reveal className="cta__actions" delay={0.24}>
          <a className="btn btn-primary" href="mailto:contact@akko-ai.com">
            {t.contact.ctaPrimary}
          </a>
          <a className="cta__secondary" href="https://demo.akko-ai.com" target="_blank" rel="noreferrer">
            {t.contact.secondary}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>

        <Reveal className="cta__signals" delay={0.3}>
          {SIGNALS[lang].map((s) => (
            <span className="cta__signal" key={s}>
              {s}
            </span>
          ))}
        </Reveal>
      </div>

      <footer className="foot">
        <div className="shell foot__inner">
          <div className="foot__brand">
            <span className="foot__row">
              <Blason size={26} mode="static" breathe={false} />
              <span className="foot__word">AKKO</span>
            </span>
            <span className="foot__tag">{t.contact.footTag}</span>
          </div>
          <nav className="foot__links" aria-label={t.contact.footHead}>
            <span className="foot__lh">{t.contact.footHead}</span>
            {t.contact.footLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="shell foot__bottom">
          <span className="foot__copy">{t.contact.copy}</span>
          <span className="foot__own">{t.contact.own}</span>
        </div>
      </footer>
    </section>
  )
}
