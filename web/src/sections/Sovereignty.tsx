import '../styles/sovereignty.css'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Blason from '../components/Blason'
import Reveal from '../components/Reveal'
import { useContent } from '../i18n/lang'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Sovereignty() {
  const t = useContent()
  const reduce = useReducedMotion()

  const tokensWrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  }
  const token: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  }
  const perimeter: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.6, ease: EASE } },
  }

  // scroll-driven draw when motion is allowed; resting state otherwise
  const stage = reduce
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, margin: '-80px' } as const,
      }

  return (
    <section className="sov section" id="plateforme">
      <span className="sov__watermark" aria-hidden>
        {t.sov.watermark}
      </span>

      <div className="shell sov__inner">
        {/* ---- editorial copy ---- */}
        <div className="sov__copy">
          <Reveal>
            <span className="eyebrow">{t.sov.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="heading sov__title">
              {t.sov.titleA}
              <span className="accent-text">{t.sov.grad}</span>
              {t.sov.titleB}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lead sov__body">{t.sov.body}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="sov__caption">{t.sov.caption}</p>
          </Reveal>
        </div>

        {/* ---- the sovereign perimeter ---- */}
        <div className="sov__stage" aria-hidden>
          {/* enclosure: a faint static vault line + the accent perimeter that
              draws itself on scroll — the accent is the governance signal */}
          <motion.svg className="sov__svg" viewBox="0 0 400 360" fill="none" {...stage}>
            <rect
              x="24" y="24" width="352" height="312" rx="18"
              stroke="var(--line-faint)" strokeWidth="1"
            />
            <motion.rect
              x="10" y="10" width="380" height="340" rx="24"
              stroke="var(--accent-line)" strokeWidth="1.5"
              variants={reduce ? undefined : perimeter}
            />
          </motion.svg>

          {/* blason seal, cutting the top perimeter line */}
          <motion.div
            className="sov__seal"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.9 }}
          >
            <Blason size={38} mode="static" breathe />
          </motion.div>

          {/* the four things that never leave the perimeter */}
          <motion.div
            className="sov__tokens"
            variants={reduce ? undefined : tokensWrap}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {t.sov.tokens.map((tok) => (
              <motion.div className="sov-token" key={tok.name} variants={reduce ? undefined : token}>
                <span className="sov-token__glyph" aria-hidden />
                <span className="sov-token__name">{tok.name}</span>
                <span className="sov-token__tag">{tok.tag}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* "never leaves" gate on the bottom perimeter line */}
          <motion.span
            className="sov__never"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
          >
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
              <rect x="1.5" y="5.5" width="9" height="6.5" rx="1.4" stroke="var(--accent)" strokeWidth="1.3" />
              <path d="M3.4 5.5V3.7a2.6 2.6 0 0 1 5.2 0v1.8" stroke="var(--accent)" strokeWidth="1.3" />
            </svg>
            {t.sov.never}
          </motion.span>
        </div>
      </div>
    </section>
  )
}
