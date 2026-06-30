import '../styles/sovereignty.css'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Blason from '../components/Blason'
import { useContent } from '../i18n/lang'

const EASE = [0.22, 1, 0.36, 1] as const

/** colours for the four things that stay inside the perimeter */
const TOKEN_COLORS = ['var(--c-storage)', 'var(--c-engine)', 'var(--c-gov)', 'var(--c-science)']

export default function Sovereignty() {
  const t = useContent()
  const reduce = useReducedMotion()

  const tokensWrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.55 } },
  }
  const token: Variants = {
    hidden: { opacity: 0, scale: 0.92, y: 12 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  }
  const perimeter: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.7, ease: EASE } },
  }

  // when reduced motion, render the resting state and skip the scroll-draw
  const stage = reduce
    ? {}
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } as const }

  return (
    <section className="sov" id="plateforme">
      <span className="sov__watermark" aria-hidden>
        {t.sov.watermark}
      </span>

      <div className="shell sov__inner">
        {/* ---- editorial copy ---- */}
        <motion.div
          className="sov__copy"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="eyebrow">{t.sov.eyebrow}</span>
          <h2 className="sov__title">
            {t.sov.titleA}<span className="grad-text">{t.sov.grad}</span>{t.sov.titleB}
          </h2>
          <p className="sov__body">
            {t.sov.body}
          </p>
          <motion.div
            className="sov__thread"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            aria-hidden
          />
          <p className="sov__caption">{t.sov.caption}</p>
        </motion.div>

        {/* ---- the sovereign perimeter ---- */}
        <div className="sov__stage" aria-hidden>
          <div className="sov__glow" />

          <motion.svg className="sov__svg" viewBox="0 0 400 360" fill="none" {...stage}>
            <defs>
              <linearGradient id="sov-grad" x1="0" y1="0" x2="400" y2="360" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7c5cff" />
                <stop offset="1" stopColor="#4dd4e5" />
              </linearGradient>
            </defs>
            {/* the perimeter draws itself on scroll */}
            <motion.rect
              x="14" y="14" width="372" height="332" rx="26"
              stroke="url(#sov-grad)" strokeWidth="2"
              variants={reduce ? undefined : perimeter}
            />
          </motion.svg>

          {/* seal on the top line */}
          <motion.div
            className="sov__seal"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.9 }}
          >
            <Blason size={40} mode="static" breathe />
          </motion.div>

          {/* tokens that never leave the perimeter */}
          <motion.div
            className="sov__tokens"
            variants={reduce ? undefined : tokensWrap}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {t.sov.tokens.map((tok, i) => {
              const color = TOKEN_COLORS[i]
              return (
                <motion.div className="sov-token" key={tok.name} variants={reduce ? undefined : token}>
                  <span className="sov-token__top">
                    <span className="sov-token__dot" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                    <span className="sov-token__name">{tok.name}</span>
                  </span>
                  <span className="sov-token__tag">{tok.tag}</span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* the "never leaves" tag on the bottom line */}
          <motion.span
            className="sov__never"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
          >
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
              <rect x="1.5" y="5.5" width="9" height="6.5" rx="1.4" stroke="var(--c-science)" strokeWidth="1.3" />
              <path d="M3.4 5.5V3.7a2.6 2.6 0 0 1 5.2 0v1.8" stroke="var(--c-science)" strokeWidth="1.3" />
            </svg>
            {t.sov.never}
          </motion.span>
        </div>
      </div>
    </section>
  )
}
