import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import '../styles/flagships.css'

type Shot = { src: string; chrome: string }
type Flagship = {
  key: string
  layer: string
  role: 'engine' | 'gov' | 'storage' | 'ai' | 'science'
  title: string
  body: string
  change: string
  shots: Shot[]
}

// Layer-led, not vendor-led. Each item says what the layer DOES.
const FLAGSHIPS: Flagship[] = [
  {
    key: 'fed',
    layer: 'Couche de fédération',
    role: 'engine',
    title: 'Un seul moteur pour toutes vos données.',
    body: "Vos bases, vos fichiers, vos entrepôts répondent à la même requête, ensemble, sans copie. Plus de pipelines pour rassembler la donnée avant de l'utiliser : un seul point d'accès.",
    change: 'Aucune donnée déplacée, aucune copie à maintenir.',
    shots: [
      { src: '/shots/new-sources.png', chrome: 'Sources de données' },
      { src: '/shots/new-source-add.png', chrome: "Ajout d'une source" },
    ],
  },
  {
    key: 'access',
    layer: "Couche d'accès unique",
    role: 'gov',
    title: 'Les droits, définis une fois. Respectés partout.',
    body: "Le masquage des colonnes et le filtrage des lignes suivent chaque personne, du tableau de bord au notebook jusqu'à l'IA. Vous ne reconfigurez plus les droits outil par outil.",
    change: 'Une colonne sensible reste masquée pour tout le monde, partout.',
    shots: [
      { src: '/shots/new-access.png', chrome: 'Accès aux données' },
      { src: '/shots/new-roles.png', chrome: 'Rôles plateforme' },
    ],
  },
  {
    key: 'lake',
    layer: 'Couche lakehouse ouverte',
    role: 'storage',
    title: 'Vos données dans un format que personne ne verrouille.',
    body: "Vos données vivent dans un format de table ouvert, lisible par n'importe quel moteur, versionné, réversible. Vous changez d'outil sans tout réécrire.",
    change: 'Stockées une fois, lisibles par tout, sans dépendance.',
    shots: [
      { src: '/shots/new-tables.png', chrome: 'Tables ouvertes' },
      { src: '/shots/lineage.png', chrome: 'Lignage' },
    ],
  },
  {
    key: 'aden',
    layer: 'ADEN · agentique gouvernée',
    role: 'ai',
    title: 'Une question en français. Une réponse dans vos règles.',
    body: "ADEN comprend la question métier, écrit la requête, l'exécute, et rend un graphe. La réponse est fondée sur votre catalogue, bornée par vos droits, et l'IA tourne sur votre infrastructure.",
    change: "L'IA ne voit jamais ce que l'utilisateur n'a pas le droit de voir.",
    shots: [
      { src: '/shots/new-aden-result.png', chrome: 'ADEN · réponse' },
      { src: '/shots/new-aden-steps.png', chrome: 'ADEN · raisonnement' },
      { src: '/shots/new-aden-home.png', chrome: 'ADEN' },
    ],
  },
  {
    key: 'nora',
    layer: 'NORA · curation souveraine',
    role: 'gov',
    title: 'Un catalogue qui se documente et se relie tout seul.',
    body: "NORA profile vos données, en déduit descriptions, synonymes et relations, et propose le tout à un référent qui valide. Ce travail nourrit le catalogue et fonde l'IA.",
    change: "Le catalogue reste vivant et l'IA reste fondée, sans service à payer.",
    shots: [{ src: '/shots/new-nora.png', chrome: 'NORA · file de revue' }],
  },
  {
    key: 'lab',
    layer: 'Couche lab polyglotte',
    role: 'science',
    title: 'Python, R, Julia, Scala. Sur la donnée gouvernée.',
    body: "Un environnement de notebooks et d'édition de code, dans le langage de chacun, branché sur le moteur et le calcul, avec un assistant connecté à vos modèles. Les mêmes droits s'appliquent.",
    change: "La gouvernance ne s'arrête pas à la porte du lab.",
    shots: [
      { src: '/shots/new-lab.png', chrome: 'Lab · environnements' },
      { src: '/shots/lab-jupyter-ai.png', chrome: 'JupyterHub · assistant' },
      { src: '/shots/lab-code-server.png', chrome: 'Éditeur de code' },
    ],
  },
]

const AUTOPLAY_MS = 6000

const shotVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 64 : -64 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -64 : 64 }),
}

export default function Flagships() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | null>(null)

  const go = (i: number) => {
    setDir(i > active || (active === FLAGSHIPS.length - 1 && i === 0) ? 1 : -1)
    setActive(((i % FLAGSHIPS.length) + FLAGSHIPS.length) % FLAGSHIPS.length)
  }

  useEffect(() => {
    if (paused || reduce) return
    timer.current = window.setTimeout(() => {
      setDir(1)
      setActive((a) => (a + 1) % FLAGSHIPS.length)
    }, AUTOPLAY_MS)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [active, paused, reduce])

  const cur = FLAGSHIPS[active]

  return (
    <section className="flg" id="produit">
      <div className="shell">
        <div className="flg__head">
          <span className="eyebrow">Les couches, une par une</span>
          <h2 className="flg__title">
            Une plateforme. <span className="grad-text">Des couches qui font le travail.</span>
          </h2>
        </div>

        <div
          className={`flg__stage flg__stage--${cur.role}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* left: layer stepper (accordion) */}
          <div className="flg__steps" role="tablist" aria-label="Couches phares">
            {FLAGSHIPS.map((f, i) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={i === active}
                className={`flg__step flg__step--${f.role}${i === active ? ' is-active' : ''}`}
                onClick={() => go(i)}
              >
                <span className="flg__step-row">
                  <span className="flg__step-name">{f.layer}</span>
                  <span className="flg__step-i">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <AnimatePresence initial={false}>
                  {i === active && (
                    <motion.div
                      className="flg__detail"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="flg__detail-title">{f.title}</h3>
                      <p className="flg__detail-body">{f.body}</p>
                      <p className="flg__change">
                        <span className="flg__change-dot" aria-hidden />
                        {f.change}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {i === active && !reduce && !paused && (
                  <motion.span
                    className="flg__progress"
                    key={`p-${active}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* right: screenshot stage (defiles on change) */}
          <div className="flg__viewport">
            <div className="flg__halo" aria-hidden />
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.div
                className="flg__shots"
                key={cur.key}
                custom={dir}
                variants={shotVariants}
                initial={reduce ? false : 'enter'}
                animate="center"
                exit={reduce ? undefined : 'exit'}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {cur.shots.slice(0, 2).map((s, i) => (
                  <figure className={`flg__frame flg__frame--${i}`} key={s.src + i}>
                    <div className="flg__bar">
                      <span /><span /><span />
                      <em>{s.chrome}</em>
                    </div>
                    <img src={s.src} alt={`${cur.layer} : ${s.chrome}`} loading="lazy" />
                  </figure>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="flg__controls">
              <button className="flg__arrow" onClick={() => go(active - 1)} aria-label="Couche précédente">←</button>
              <span className="flg__count">
                <b>{String(active + 1).padStart(2, '0')}</b> / {String(FLAGSHIPS.length).padStart(2, '0')}
              </span>
              <button className="flg__arrow" onClick={() => go(active + 1)} aria-label="Couche suivante">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
