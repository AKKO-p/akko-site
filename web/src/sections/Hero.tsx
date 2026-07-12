import '../styles/hero.css'
import Blason from '../components/Blason'
import Frame from '../components/Frame'
import Reveal from '../components/Reveal'
import GovernedDemo from '../components/GovernedDemo'
import { useContent, useLang } from '../i18n/lang'

const FRAME_LABEL = {
  fr: 'ADEN · réponse gouvernée',
  en: 'ADEN · governed answer',
} as const

export default function Hero() {
  const t = useContent()
  const { lang } = useLang()

  return (
    <section className="hero" id="top">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <Reveal className="hero__eyebrow-row">
            {/* signature: the living blason — the three squares are the layers */}
            <Blason size={26} mode="draw" breathe />
            <span className="eyebrow">{t.hero.eyebrow}</span>
          </Reveal>

          <Reveal as="span" delay={0.06}>
            <h1 className="hero__title">
              {t.hero.titleLines.map((line) => (
                <span className="hero__tline" key={line}>
                  {line}
                </span>
              ))}
              <span className="hero__tline">
                <span className="accent-text">{t.hero.grad}</span>
              </span>
            </h1>
          </Reveal>

          <Reveal as="span" delay={0.12}>
            <p className="hero__sub">{t.hero.sub}</p>
          </Reveal>

          <Reveal className="hero__cta" delay={0.18}>
            <a className="btn btn-primary" href="#contact">
              {t.hero.ctaPrimary}
            </a>
            <a className="btn btn-ghost" href="#topologie">
              {t.hero.ctaSecondary} →
            </a>
          </Reveal>

          <Reveal as="span" delay={0.24}>
            <p className="hero__context">{t.hero.context}</p>
          </Reveal>
        </div>

        {/* the proof, not the claim: the real ADEN product frame, with the
            governed demo floating over it — the masked column made legible. */}
        <Reveal className="hero__stage" delay={0.1}>
          <Frame
            src="/shots/new-aden-result.png"
            label={FRAME_LABEL[lang]}
            ratio="16 / 11"
            className="hero__frame"
            priority
          />
          <GovernedDemo className="hero__gdemo" />
        </Reveal>
      </div>

      <Reveal className="hero__facts" delay={0.32}>
        <div className="shell hero__facts-row">
          {t.hero.facts.map((f) => (
            <div className="fact" key={f.k}>
              <span className="fact__k">{f.k}</span>
              <span className="fact__v">{f.v}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
