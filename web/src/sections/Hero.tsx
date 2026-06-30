import { motion } from 'framer-motion'
import Blason from '../components/Blason'
import { useContent } from '../i18n/lang'

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.12 },
  }),
}

export default function Hero() {
  const t = useContent()
  return (
    <section className="hero" id="top">
      <div className="shell hero__inner">
        <div className="hero__copy">
          <motion.span className="eyebrow" custom={0} variants={reveal} initial="hidden" animate="show">
            {t.hero.eyebrow}
          </motion.span>

          <h1 className="hero__title">
            {t.hero.titleLines.map((line, i) => (
              <Line i={i + 1} key={line}>{line}</Line>
            ))}
            <Line i={t.hero.titleLines.length + 1}>
              <span className="grad-text">{t.hero.grad}</span>
            </Line>
          </h1>

          <motion.p className="hero__sub" custom={4} variants={reveal} initial="hidden" animate="show">
            {t.hero.sub}
          </motion.p>

          <motion.div className="hero__cta" custom={5} variants={reveal} initial="hidden" animate="show">
            <a className="btn btn-primary" href="#contact">{t.hero.ctaPrimary}</a>
            <a className="btn btn-ghost" href="#topologie">{t.hero.ctaSecondary} →</a>
          </motion.div>

          <motion.p className="hero__context" custom={6} variants={reveal} initial="hidden" animate="show">
            {t.hero.context}
          </motion.p>
        </div>

        {/* signature: the living blason, with the layers it represents fanned behind it */}
        <motion.div
          className="hero__mark"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          aria-hidden
        >
          <div className="hero__halo" />
          <Blason size={300} mode="draw" breathe />
          <span className="hero__own">Own Every Layer</span>
        </motion.div>
      </div>

      <motion.div
        className="hero__facts"
        custom={7}
        variants={reveal}
        initial="hidden"
        animate="show"
      >
        <div className="shell hero__facts-row">
          {t.hero.facts.map((f) => (
            <div className="fact" key={f.k}>
              <span className="fact__k">{f.k}</span>
              <span className="fact__v">{f.v}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Line({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <span className="hero__line">
      <motion.span
        className="hero__line-in"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.11 }}
      >
        {children}
      </motion.span>
    </span>
  )
}
