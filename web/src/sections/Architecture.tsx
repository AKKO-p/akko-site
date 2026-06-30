import { motion, useReducedMotion } from 'framer-motion'
import '../styles/architecture.css'
import Blason from '../components/Blason'
import { useContent } from '../i18n/lang'

// role per layer (bottom-up), language-independent; merged with translated labels
const ROLES = ['storage', 'storage', 'engine', 'engine', 'science', 'gov', 'science', 'ai', 'ai'] as const

export default function Architecture() {
  const t = useContent()
  const reduce = useReducedMotion()
  const layers = t.arch.layers.map((l, i) => ({ ...l, role: ROLES[i] }))

  return (
    <section className="arc" id="architecture">
      <div className="shell arc__inner">
        <aside className="arc__intro">
          <span className="eyebrow">{t.arch.eyebrow}</span>
          <h2 className="arc__title">
            {t.arch.titleA}
            <span className="grad-text">{t.arch.grad}</span>
            {t.arch.titleB}
          </h2>
          <p className="arc__lead">{t.arch.lead}</p>
          <div className="arc__emblem" aria-hidden>
            <Blason size={132} mode="static" breathe />
          </div>
          <ul className="arc__legend">
            <li><i className="dot dot--storage" /> {t.arch.legend[0]}</li>
            <li><i className="dot dot--engine" /> {t.arch.legend[1]}</li>
            <li><i className="dot dot--gov" /> {t.arch.legend[2]}</li>
            <li><i className="dot dot--science" /> {t.arch.legend[3]}</li>
            <li><i className="dot dot--ai" /> {t.arch.legend[4]}</li>
          </ul>
          <p className="arc__note">{t.arch.note}</p>
        </aside>

        <div className="arc__stack" role="list" aria-label="AKKO layers">
          <span className="arc__spine" aria-hidden />
          {layers.map((l, i) => (
            <motion.div
              role="listitem"
              className={`arc__layer arc__layer--${l.role}${l.key ? ' is-key' : ''}`}
              key={i}
              initial={reduce ? false : { opacity: 0, z: -70, y: 8 }}
              whileInView={{ opacity: 1, z: 0, y: 0 }}
              whileHover={reduce ? undefined : { z: 40 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <span className="arc__layer-idx">{String(layers.length - i).padStart(2, '0')}</span>
              <span className="arc__layer-body">
                <span className="arc__layer-label">{l.label}</span>
                <span className="arc__layer-vendor">{l.vendor}</span>
              </span>
              {l.key && <span className="arc__layer-tag">{t.arch.coreTag}</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
