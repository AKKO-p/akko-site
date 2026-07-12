import { useContent } from '../i18n/lang'
import Frame from '../components/Frame'
import Reveal from '../components/Reveal'
import '../styles/filmstrip.css'

export default function Filmstrip() {
  const t = useContent()
  const strip = t.strip.items
  // duplicated once for a seamless marquee loop; the copy is decorative
  const loop = [...strip, ...strip]
  return (
    <section className="strip section" aria-label={t.strip.eyebrow}>
      <div className="shell strip__head">
        <Reveal>
          <span className="eyebrow">{t.strip.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="lead strip__lead">{t.strip.lead}</p>
        </Reveal>
      </div>

      <Reveal className="strip__viewport" delay={0.12}>
        <div className="strip__track" role="list">
          {loop.map((it, i) => (
            <div
              className="strip__cell"
              key={i}
              role="listitem"
              aria-hidden={i >= strip.length}
            >
              <Frame src={it.src} label={it.label} className="strip__card" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
