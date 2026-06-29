import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  size?: number
  /** "draw" plays the assemble-on-load sequence; "static" renders the finished mark. */
  mode?: 'draw' | 'static'
  /** continuous breathing once assembled */
  breathe?: boolean
  className?: string
}

/**
 * The AKKO blason — three concentric rounded squares = the Lego layers metaphor.
 * Source mark: akko/branding/logo/akko-icon.svg. Here it is alive: the squares
 * draw themselves outside-in, the core pulses, then the whole mark breathes.
 */
export default function Blason({ size = 80, mode = 'draw', breathe = true, className }: Props) {
  const reduce = useReducedMotion()
  const animate = mode === 'draw' && !reduce

  // stroke-dash draw for the two outline squares; the perimeters are ~ 4*(side)
  const drawOuter = animate
    ? { strokeDashoffset: [304, 0], opacity: [0, 1] }
    : { strokeDashoffset: 0, opacity: 1 }
  const drawMiddle = animate
    ? { strokeDashoffset: [184, 0], opacity: [0, 1] }
    : { strokeDashoffset: 0, opacity: 1 }

  return (
    <motion.svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      fill="none"
      className={className}
      role="img"
      aria-label="AKKO"
      initial={animate ? 'hidden' : false}
      animate={breathe && !reduce ? { scale: [1, 1.035, 1] } : undefined}
      transition={breathe && !reduce ? { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } : undefined}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="ak-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c5cff" />
          <stop offset="1" stopColor="#4dd4e5" />
        </linearGradient>
        <filter id="ak-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* outer layer */}
      <motion.rect
        x="4" y="4" width="72" height="72" rx="6"
        stroke="url(#ak-grad)" strokeWidth="3"
        strokeDasharray="304"
        initial={animate ? { strokeDashoffset: 304, opacity: 0 } : false}
        animate={drawOuter}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0 }}
      />
      {/* middle layer */}
      <motion.rect
        x="18" y="18" width="44" height="44" rx="4"
        stroke="url(#ak-grad)" strokeWidth="2.5"
        strokeDasharray="184"
        initial={animate ? { strokeDashoffset: 184, opacity: 0 } : false}
        animate={drawMiddle}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
      />
      {/* core */}
      <motion.rect
        x="30" y="30" width="20" height="20" rx="3"
        fill="url(#ak-grad)"
        filter="url(#ak-glow)"
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={
          animate
            ? { scale: 1, opacity: 1 }
            : { opacity: 1 }
        }
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.56 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </motion.svg>
  )
}
