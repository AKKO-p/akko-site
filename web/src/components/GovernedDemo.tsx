import '../styles/governed-demo.css'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n/lang'

/* Fabricated but realistic banking rows. The sensitive column (IBAN) is never
   present as data — it is masked at the engine before the model is called. */
const ROWS = [
  { client: 'Léa Fontaine', region: 'Île-de-France' },
  { client: 'M. Haddad', region: "Provence-Alpes-Côte d'Azur" },
  { client: 'S. Berger', region: 'Grand Est' },
  { client: 'A. Nkomo', region: 'Occitanie' },
]

const COPY = {
  fr: {
    badge: 'gouverné',
    question: 'Montre les clients premium par région, avec leur IBAN.',
    colClient: 'Client',
    colRegion: 'Région',
    colLocked: 'IBAN',
    lockedTag: 'borné',
    footLead: "L'IA n'a jamais vu la colonne masquée",
    foot: 'IBAN masqué au moteur — borné par vos droits.',
  },
  en: {
    badge: 'governed',
    question: 'Show premium clients by region, with their IBAN.',
    colClient: 'Client',
    colRegion: 'Region',
    colLocked: 'IBAN',
    lockedTag: 'bounded',
    footLead: 'The AI never saw the masked column',
    foot: 'IBAN masked at the engine — bounded by your rights.',
  },
} as const

function Lock({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

/**
 * GovernedDemo — a compact ADEN answer where a sensitive column is masked with a
 * lock and a "bounded by your rights" tag. The proof of the differentiator: the
 * model is answering over data it is not allowed to fully see.
 */
export default function GovernedDemo({ className }: { className?: string }) {
  const { lang } = useLang()
  const c = COPY[lang]
  const reduce = useReducedMotion()

  return (
    <div className={className ? `gdemo ${className}` : 'gdemo'}>
      <div className="gdemo__head">
        <span className="gdemo__brand">ADEN</span>
        <span className="gdemo__badge">
          <Lock size={11} />
          {c.badge}
        </span>
      </div>

      <div className="gdemo__q">
        <span className="gdemo__q-dot" aria-hidden>
          Q
        </span>
        <span className="gdemo__q-text">{c.question}</span>
      </div>

      <table className="gdemo__table">
        <thead>
          <tr>
            <th>{c.colClient}</th>
            <th>{c.colRegion}</th>
            <th className="gdemo__col-locked">
              <span className="gdemo__th-locked">
                <Lock size={12} />
                {c.colLocked}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr key={r.client}>
              <td>{r.client}</td>
              <td>{r.region}</td>
              <td>
                <motion.span
                  className="gdemo__lockcell"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={reduce ? undefined : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                >
                  <Lock size={12} />
                  ••••
                </motion.span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="gdemo__foot">
        <Lock size={15} />
        <span className="gdemo__foot-text">
          <b>{c.footLead}</b> — {c.foot}
        </span>
      </div>
    </div>
  )
}
