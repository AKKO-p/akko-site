import '../styles/frame.css'
import BlasonChip from './BlasonChip'

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
  /** layer hue for the perimeter liset + corner brackets + corner seal.
   *  Absent = neutral perimeter (no layer zone). */
  tint?: string
  /** exhibit number — renders a "Pièce 0X" seal in the chrome bar */
  piece?: number
}

/**
 * Frame — the product treated as an exhibit ("pièce à conviction"). A real
 * screenshot in a dark chrome, wrapped by the sovereign perimeter liset with
 * corner brackets (message: what you see is INSIDE the cluster), a numbered
 * piece seal, and a blason corner-chip in the layer's hue. Full-bleed image,
 * lazy by default. Never a placeholder.
 */
export default function Frame({
  src,
  label,
  ratio = '16 / 10',
  className,
  priority = false,
  tint,
  piece,
}: Props) {
  const style = tint ? ({ '--frame-tint': tint } as React.CSSProperties) : undefined
  return (
    <figure className={`frame${tint ? ' frame--tinted' : ''}${className ? ` ${className}` : ''}`} style={style}>
      {/* corner brackets — the perimeter, drawn */}
      <span className="frame__bracket frame__bracket--tl" aria-hidden />
      <span className="frame__bracket frame__bracket--tr" aria-hidden />
      <span className="frame__bracket frame__bracket--bl" aria-hidden />
      <span className="frame__bracket frame__bracket--br" aria-hidden />

      <div className="frame__bar">
        <span className="frame__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        {label && <span className="frame__label mono">{label}</span>}
        {piece != null && (
          <span className="frame__piece mono">
            <BlasonChip size={13} tint={tint ?? 'var(--accent)'} />
            Pièce {String(piece).padStart(2, '0')}
          </span>
        )}
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
