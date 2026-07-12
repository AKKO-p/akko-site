import '../styles/architecture.css'
import Blason from '../components/Blason'
import Reveal from '../components/Reveal'
import { useContent } from '../i18n/lang'

// role per layer (bottom-up), language-independent; merged with translated labels
const ROLES = ['storage', 'storage', 'engine', 'engine', 'science', 'gov', 'science', 'ai', 'ai'] as const

export default function Architecture() {
  const t = useContent()
  // content is authored bottom-up (storage first); render top-down so the
  // foundation sits at the bottom of the stack, numbered 01 upward.
  const layers = t.arch.layers.map((l, i) => ({ ...l, role: ROLES[i] }))
  const stack = [...layers].reverse()

  return (
    <section className="arc section section--alt" id="architecture">
      <div className="shell arc__inner">
        <aside className="arc__intro">
          <Reveal>
            <span className="eyebrow">{t.arch.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="arc__title heading">
              {t.arch.titleA}
              <span className="accent-text">{t.arch.grad}</span>
              {t.arch.titleB}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="arc__lead lead">{t.arch.lead}</p>
          </Reveal>

          <Reveal delay={0.15} className="arc__emblem" aria-hidden>
            <Blason size={116} mode="static" breathe />
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="arc__legend">
              <li><i className="arc__dot arc__dot--storage" /> {t.arch.legend[0]}</li>
              <li><i className="arc__dot arc__dot--engine" /> {t.arch.legend[1]}</li>
              <li><i className="arc__dot arc__dot--gov" /> {t.arch.legend[2]}</li>
              <li><i className="arc__dot arc__dot--science" /> {t.arch.legend[3]}</li>
              <li><i className="arc__dot arc__dot--ai" /> {t.arch.legend[4]}</li>
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="arc__note">{t.arch.note}</p>
          </Reveal>
        </aside>

        <ul className="arc__stack" aria-label="AKKO layers">
          <span className="arc__spine" aria-hidden />
          {stack.map((l, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 0.05}
              className={`arc__layer arc__layer--${l.role}${l.key ? ' is-key' : ''}`}
            >
              <span className="arc__idx">{String(stack.length - i).padStart(2, '0')}</span>
              <span className="arc__body">
                <span className="arc__label">{l.label}</span>
                <span className="arc__vendor">{l.vendor}</span>
              </span>
              {l.key && <span className="arc__core">{t.arch.coreTag}</span>}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
