import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type Props = {
  children: React.ReactNode
  /** seconds before the reveal starts (stagger siblings with 0.06–0.12) */
  delay?: number
  /** rise distance in px (default 20) */
  y?: number
  /** replay every time it enters, instead of once (default once) */
  repeat?: boolean
  className?: string
  /** underlying element, default a <div> */
  as?: 'div' | 'section' | 'li' | 'span' | 'article'
} & Omit<HTMLMotionProps<'div'>, 'children'>

/**
 * Scroll-reveal wrapper: a restrained fade + rise as the element enters the
 * viewport. Honours prefers-reduced-motion by rendering the content statically.
 * The single motion vocabulary for the site — sections compose it, they do not
 * reinvent per-element transitions.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  repeat = false,
  className,
  as = 'div',
  ...rest
}: Props) {
  const reduce = useReducedMotion()
  // one motion component, rendered as the requested element; cast keeps the
  // prop types anchored to motion.div (all our tags accept the same props).
  const MotionTag = motion[as] as typeof motion.div

  if (reduce) {
    return (
      <MotionTag className={className} {...rest}>
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: !repeat, amount: 0.35, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
