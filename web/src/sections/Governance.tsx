import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import '../styles/governance.css'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
}

type Persona = 'admin' | 'analyste'

type Col = { key: 'client' | 'pays' | 'email' | 'montant'; label: string; mask?: boolean; num?: boolean }
const COLS: Col[] = [
  { key: 'client', label: 'Client' },
  { key: 'pays', label: 'Pays' },
  { key: 'email', label: 'Contact', mask: true },
  { key: 'montant', label: 'Encours (€)', mask: true, num: true },
]

type Row = { client: string; pays: string; email: string; montant: string; fr: boolean }
const ROWS: Row[] = [
  { client: 'Dupont S.A.', pays: 'France', email: 'tresorerie@dupont.fr', montant: '184 200', fr: true },
  { client: 'Lefèvre & Cie', pays: 'France', email: 'compta@lefevre.fr', montant: '76 540', fr: true },
  { client: 'Klein GmbH', pays: 'Allemagne', email: 'finanz@klein.de', montant: '213 600', fr: false },
  { client: 'Rossi SRL', pays: 'Italie', email: 'info@rossi.it', montant: '47 800', fr: false },
]

function MaskDots({ n = 4 }: { n?: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="gov-mask" aria-label="masqué">
      {Array.from({ length: n }).map((_, i) => (
        <motion.i
          key={i}
          initial={reduce ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE, delay: 0.04 * i }}
        />
      ))}
    </span>
  )
}

export default function Governance() {
  const reduce = useReducedMotion()
  const [persona, setPersona] = useState<Persona>('analyste')
  const inView = reduce
    ? {}
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, margin: '-90px' } }

  const cell = (row: Row, col: Col) => {
    const masked = persona === 'analyste' && col.mask && row.fr
    if (masked) return <MaskDots key={`${persona}-${col.key}`} n={col.num ? 3 : 4} />
    return <span>{row[col.key]}</span>
  }

  return (
    <section className="gov" id="gouvernance">
      <div className="shell">
        <motion.div className="gov__head" {...inView} variants={rise}>
          <motion.span className="eyebrow gov-eyebrow" variants={rise} custom={0}>
            Gouvernance
          </motion.span>
          <motion.h2 className="gov__title" variants={rise} custom={1}>
            Un seul plan de contrôle <span className="grad-text">des accès.</span>
          </motion.h2>
          <motion.p className="gov__body" variants={rise} custom={2}>
            Masquage des colonnes et filtrage des lignes <b>par utilisateur</b>, appliqués au moteur
            (OPA), pour chaque outil : BI, notebooks, ADEN. La gouvernance suit la donnée, du client à la
            source.
          </motion.p>
        </motion.div>

        <motion.div className="gov__stage" {...inView} variants={rise} custom={1}>
          {/* live control plane */}
          <motion.div className="gov-plane" variants={rise} custom={2}>
            <div className="gov-plane__title">
              <span>banking.clients</span>
              <span>même table · deux regards</span>
            </div>

            <div className="gov-seg" role="tablist" aria-label="Persona">
              <motion.span
                className="gov-seg__pill"
                aria-hidden
                animate={{
                  left: persona === 'admin' ? 4 : '50%',
                  right: persona === 'admin' ? '50%' : 4,
                  background:
                    persona === 'admin'
                      ? 'var(--grad)'
                      : 'rgba(255,180,84,0.16)',
                  border: persona === 'admin' ? '0px solid transparent' : '1px solid rgba(255,180,84,0.4)',
                }}
                transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
              />
              <button
                role="tab"
                aria-selected={persona === 'admin'}
                className="gov-seg__btn"
                data-on={persona === 'admin'}
                onClick={() => setPersona('admin')}
              >
                <span className="gov-seg__dot" style={{ background: 'var(--cyan)' }} />
                Admin données
              </button>
              <button
                role="tab"
                aria-selected={persona === 'analyste'}
                className="gov-seg__btn is-analyste"
                data-on={persona === 'analyste'}
                onClick={() => setPersona('analyste')}
              >
                <span className="gov-seg__dot" style={{ background: 'var(--c-gov)' }} />
                Analyste · FR
              </button>
            </div>

            <div className="gov-opa">
              <span className="gov-opa__badge">OPA</span>
              <span className="gov-opa__rule">
                {persona === 'admin' ? (
                  <>Aucune restriction : <code>policy: allow</code>. Toutes les colonnes, tous les pays.</>
                ) : (
                  <>
                    Politique active : <code>mask(contact, encours)</code> +{' '}
                    <code>row_filter(pays = 'France')</code>.
                  </>
                )}
              </span>
            </div>

            <table className="gov-tbl">
              <thead>
                <tr>
                  {COLS.map((c) => (
                    <th key={c.key} className={c.num ? 'gov-cell--num' : undefined}>
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => {
                  const filtered = persona === 'analyste' && !row.fr
                  return (
                    <tr key={row.client} className={filtered ? 'gov-row--filtered' : undefined}>
                      {COLS.map((c, ci) => {
                        if (filtered) {
                          return (
                            <td key={c.key} className={c.num ? 'gov-cell--num' : undefined}>
                              {ci === 0 ? (
                                <span className="gov-flag">▪ hors périmètre</span>
                              ) : (
                                <span style={{ color: 'var(--ink-faint)' }}>·</span>
                              )}
                            </td>
                          )
                        }
                        return (
                          <td
                            key={c.key}
                            className={[
                              c.num ? 'gov-cell--num' : '',
                              c.key === 'client' ? 'gov-cell--client' : '',
                            ]
                              .join(' ')
                              .trim() || undefined}
                          >
                            {cell(row, c)}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </motion.div>

          {/* tilted real capture */}
          <motion.figure className="gov-shot" variants={rise} custom={3}>
            <div className="gov-shot__inner">
              <div className="gov-shot__bar">
                <span />
                <span />
                <span />
              </div>
              <img src="/shots/governance-roles.png" alt="Gestion des rôles et accès aux données dans le cockpit AKKO" loading="lazy" />
            </div>
            <figcaption className="gov-shot__cap">cockpit · rôles &amp; accès données</figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  )
}
