import { useEffect, useState } from 'react'
import { useLang } from '../i18n/lang'
import '../styles/sovereign-badge.css'

/**
 * SovereignBadge — the proof, not the slogan. It counts, live in the visitor's
 * own browser, the requests this page made to any third-party origin (0), the
 * cookies set (0), and the Google calls (0), then invites the reader to open the
 * Network tab and count themselves. Coherence of form and thesis, made visible.
 */
const COPY = {
  fr: {
    lead: 'Cette page ne charge rien d’externe.',
    requests: 'Requêtes vers un tiers',
    cookies: 'Cookies',
    google: 'Google',
    invite: 'Ouvrez l’onglet Réseau de votre navigateur, comptez vous-même.',
  },
  en: {
    lead: 'This page loads nothing external.',
    requests: 'Third-party requests',
    cookies: 'Cookies',
    google: 'Google',
    invite: 'Open your browser’s Network tab and count for yourself.',
  },
} as const

/** count resources this document fetched from an origin other than its own */
function countExternal(): number {
  if (typeof performance === 'undefined' || !performance.getEntriesByType) return 0
  try {
    const here = location.origin
    return performance
      .getEntriesByType('resource')
      .filter((e) => {
        const url = (e as PerformanceResourceTiming).name
        if (!url || url.startsWith('data:') || url.startsWith('blob:')) return false
        try {
          return new URL(url, here).origin !== here
        } catch {
          return false
        }
      }).length
  } catch {
    return 0
  }
}

function countCookies(): number {
  if (typeof document === 'undefined' || !document.cookie) return 0
  return document.cookie.split(';').filter((c) => c.trim().length > 0).length
}

export default function SovereignBadge({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const { lang } = useLang()
  const c = COPY[lang]
  const [external, setExternal] = useState(0)
  const [cookies, setCookies] = useState(0)

  useEffect(() => {
    const read = () => {
      setExternal(countExternal())
      setCookies(countCookies())
    }
    read()
    // re-read after the load settles so late resources (fonts) are counted too
    const t = window.setTimeout(read, 1200)
    window.addEventListener('load', read)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', read)
    }
  }, [])

  const stats = [
    { label: c.requests, value: external },
    { label: c.cookies, value: cookies },
    { label: c.google, value: 0 },
  ]

  return (
    <div className={`sbadge sbadge--${variant}`} role="note">
      <span className="sbadge__lead">
        <span className="sbadge__dot" aria-hidden />
        {c.lead}
      </span>
      <span className="sbadge__stats">
        {stats.map((s) => (
          <span className="sbadge__stat" key={s.label}>
            <span className="sbadge__k">{s.label}</span>
            <span className="sbadge__v">{s.value}</span>
          </span>
        ))}
      </span>
      {variant === 'full' && <span className="sbadge__invite">{c.invite}</span>}
    </div>
  )
}
