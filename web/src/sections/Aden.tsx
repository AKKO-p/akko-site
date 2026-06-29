import { motion, useReducedMotion } from 'framer-motion'
import '../styles/aden.css'

type Step = {
  n: string
  title: string
  detail: string
  role: 'q' | 'engine' | 'ai' | 'gov' | 'science'
  feed?: 'NORA' | 'OPA'
}

// ADEN is not "one LLM call": it is a governed 8-layer pipeline.
// Source of truth: docker/aden/ (catalog/, llm/, sqlgen/, query_phases/, security/, output/).
const STEPS: Step[] = [
  { n: '1', title: 'Question', detail: 'Langage naturel : « Combien de clients allemands à risque ? »', role: 'q' },
  { n: '2', title: 'Intention + raccourci vérifié', detail: 'Si une requête approuvée par un steward correspond, on la réutilise, sans appeler le modèle.', role: 'science' },
  { n: '3', title: 'Grounding sémantique', detail: 'Recherche vecteur, M-Schema, synonymes, relations, profils. Pré-filtré aux tables autorisées.', role: 'ai', feed: 'NORA' },
  { n: '4', title: 'LLM souverain', detail: 'Prompt fondé → modèles on-premises (Ollama) → SQL, avec cache et score de confiance.', role: 'ai' },
  { n: '5', title: 'SQL : génération + validation', detail: 'Parse, whitelist des tables, garde read-only et anti-injection.', role: 'engine' },
  { n: '6', title: 'Exécution gouvernée', detail: 'Trino sous OPA : masques de colonnes et filtres de lignes par utilisateur.', role: 'gov', feed: 'OPA' },
  { n: '7', title: 'Confiance + explicabilité', detail: 'Chaque étape tracée, raisonnement en cascade, reçu d\'audit signé.', role: 'gov' },
  { n: '8', title: 'Restitution', detail: 'Dataviz auto, partage, export notebook.', role: 'science' },
]

export default function Aden() {
  const reduce = useReducedMotion()
  return (
    <section className="ad" id="ia">
      <div className="shell">
        <header className="ad__head">
          <span className="eyebrow">IA gouvernée · ADEN &amp; NORA</span>
          <h2 className="ad__title">
            Une IA <span className="grad-text">gouvernée</span>, sur votre infrastructure.
          </h2>
          <p className="ad__lead">
            ADEN traduit une question en langage naturel en SQL gouverné, l'exécute sur le catalogue
            fédéré et renvoie un graphe, avec un reçu d'audit. NORA enrichit le catalogue
            (profilage, synonymes, relations) pour <strong>fonder</strong> l'IA. Les modèles tournent
            sur votre infrastructure ; aucune donnée ne sort.
          </p>
        </header>

        <div className="ad__pipe" aria-label="Pipeline gouverné ADEN en 8 couches">
          <span className="ad__rail" aria-hidden />
          {!reduce && (
            <motion.span
              className="ad__pulse"
              aria-hidden
              animate={{ top: ['2%', '98%'] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {STEPS.map((s, i) => (
            <motion.article
              className={`ad__step ad__step--${s.role}`}
              key={s.n}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <span className="ad__node" aria-hidden>{s.n}</span>
              <div className="ad__card">
                <div className="ad__card-top">
                  <h3>{s.title}</h3>
                  {s.feed && (
                    <span className={`ad__feed ad__feed--${s.feed.toLowerCase()}`}>
                      {s.feed === 'NORA' ? '↳ nourri par NORA' : '⛨ gardé par OPA'}
                    </span>
                  )}
                </div>
                <p>{s.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="ad__kicker">
          Une question métier → une réponse <span className="grad-text">gouvernée, tracée, souveraine</span>.
          L'IA n'invente pas : elle est fondée (grounding NORA) et bornée (OPA).
        </p>

        <div className="ad-proof" aria-label="Captures ADEN">
          {AD_SHOTS.map((s, i) => (
            <motion.figure
              className="ad-proof__frame"
              data-pos={i}
              key={s.src}
              initial={reduce ? false : { opacity: 0, y: 30, rotateY: i === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: i === 0 ? -7 : 7 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 * i }}
            >
              <div className="ad-proof__inner">
                <div className="ad-proof__bar">
                  <span /><span /><span />
                  <em>{s.chrome}</em>
                </div>
                <img src={s.src} alt={s.alt} loading="lazy" />
              </div>
              <figcaption className="ad-proof__cap">{s.cap}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

type AdShot = { src: string; chrome: string; cap: string; alt: string }
const AD_SHOTS: AdShot[] = [
  {
    src: '/shots/aden-result.png',
    chrome: 'cockpit · ADEN',
    cap: 'Réponse vérifiée, restituée en graphe, avec son score de confiance.',
    alt: 'Résultat ADEN : répartition des clients par pays, marquée vérifiée.',
  },
  {
    src: '/shots/aden-steps.png',
    chrome: 'cockpit · reçu d\'audit',
    cap: 'Reçu d\'audit : chaque étape du raisonnement est tracée et rejouable.',
    alt: 'Étapes de raisonnement ADEN, du contrôle d\'accès à la requête finale.',
  },
]
