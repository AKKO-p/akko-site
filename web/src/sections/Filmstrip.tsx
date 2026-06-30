import { useContent } from '../i18n/lang'
import '../styles/filmstrip.css'

export default function Filmstrip() {
  const t = useContent()
  const strip = t.strip.items
  // duplicated once for a seamless marquee loop
  const items = [...strip, ...strip]
  return (
    <section className="strip" aria-label="Les autres couches de la plateforme">
      <div className="shell strip__head">
        <span className="eyebrow">{t.strip.eyebrow}</span>
        <p className="strip__lead">{t.strip.lead}</p>
      </div>
      <div className="strip__track-wrap">
        <div className="strip__track">
          {items.map((it, i) => (
            <figure className="strip__item" key={i} aria-hidden={i >= strip.length}>
              <div className="strip__frame">
                <span className="strip__dots"><i /><i /><i /></span>
                <img src={it.src} alt={it.label} loading="lazy" />
              </div>
              <figcaption>{it.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
