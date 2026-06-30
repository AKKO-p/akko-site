import { motion, useReducedMotion } from 'framer-motion'
import Blason from '../components/Blason'
import { useContent } from '../i18n/lang'
import '../styles/contact.css'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.09 },
  }),
}

export default function Contact() {
  const t = useContent()
  const reduce = useReducedMotion()
  const inView = reduce
    ? {}
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, margin: '-100px' } }

  return (
    <section className="cta" id="contact">
      <div className="cta__aurora" aria-hidden />
      <div className="shell cta__inner">
        <motion.div
          className="cta__mark"
          {...inView}
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: () => ({ opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } }) }}
          aria-hidden
        >
          <div className="cta__halo" />
          <Blason size={120} mode="static" breathe />
        </motion.div>

        <motion.div className="cta__panel" {...inView} variants={rise}>
          <motion.span className="eyebrow" variants={rise} custom={0} style={{ justifyContent: 'center' }}>
            {t.contact.eyebrow}
          </motion.span>
          <motion.h2 className="cta__title" variants={rise} custom={1}>
            {t.contact.titleA}<span className="grad-text">{t.contact.grad}</span>
          </motion.h2>
          <motion.p className="cta__sub" variants={rise} custom={2}>
            {t.contact.sub}
          </motion.p>
          <motion.div className="cta__actions" variants={rise} custom={3}>
            <a className="btn btn-primary" href="mailto:contact@akko-ai.com">
              {t.contact.ctaPrimary}
            </a>
            <a className="cta__secondary" href="https://demo.akko-ai.com" target="_blank" rel="noreferrer">
              {t.contact.secondary}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <footer className="foot">
        <div className="shell">
          <div className="foot__inner">
            <div className="foot__brand">
              <span className="foot__row">
                <Blason size={28} mode="static" breathe={false} />
                <span className="foot__word">AKKO</span>
              </span>
              <span className="foot__tag">{t.contact.footTag}</span>
            </div>
            <nav className="foot__links" aria-label="Liens de pied de page">
              <span className="foot__lh">{t.contact.footHead}</span>
              {t.contact.footLinks.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="foot__bottom">
            <span className="foot__copy">{t.contact.copy}</span>
            <span className="foot__own">{t.contact.own}</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
