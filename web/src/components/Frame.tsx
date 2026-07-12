import '../styles/frame.css'

type Props = {
  /** screenshot path served from /public, e.g. "/shots/new-aden-result.png" */
  src: string
  /** optional chrome label (a page name or route), shown centred in the bar */
  label?: string
  /** CSS aspect-ratio for the media area, default "16 / 10" */
  ratio?: string
  /** extra classes for layout (margins, max-width) from the calling section */
  className?: string
  /** eager-load the hero frame; everything below the fold stays lazy */
  priority?: boolean
}

/**
 * Frame — the product is the hero. A real screenshot inside a discreet browser
 * chrome (three dots + optional label), a thin border and a soft shadow for
 * depth. Full-bleed image, lazy by default. Never a placeholder.
 */
export default function Frame({ src, label, ratio = '16 / 10', className, priority = false }: Props) {
  return (
    <figure className={className ? `frame ${className}` : 'frame'}>
      <div className="frame__bar">
        <span className="frame__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        {label && <span className="frame__label">{label}</span>}
      </div>
      <div className="frame__media" style={{ '--frame-ratio': ratio } as React.CSSProperties}>
        <img
          className="frame__img"
          src={src}
          alt={label ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </figure>
  )
}
