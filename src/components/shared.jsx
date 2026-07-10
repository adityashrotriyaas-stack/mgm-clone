import { Children, createContext, isValidElement, useContext, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { colors } from '../constants/colors'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const REVEAL_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, transform: 'translateY(36px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeDown: {
    hidden: { opacity: 0, transform: 'translateY(-28px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeLeft: {
    hidden: { opacity: 0, transform: 'translateX(48px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  fadeRight: {
    hidden: { opacity: 0, transform: 'translateX(-48px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  scaleUp: {
    hidden: { opacity: 0, transform: 'scale(0.9)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  blurUp: {
    hidden: { opacity: 0, transform: 'translateY(28px)', filter: 'blur(10px)' },
    visible: { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
  },
  zoomIn: {
    hidden: { opacity: 0, transform: 'scale(0.82)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
}

const StaggerContext = createContext({ visible: false, stagger: 0.1 })

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

export function useInView({ threshold = 0.12, rootMargin = '0px 0px -6% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, visible }
}

function useRevealRef(threshold = 0.12) {
  return useInView({ threshold })
}

function getRevealStyles({ visible, variant, delay, duration, reduced }) {
  const motion = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.fadeUp
  const state = visible || reduced ? motion.visible : motion.hidden

  if (reduced) {
    return {
      opacity: 1,
      transform: 'none',
      filter: 'none',
      transition: 'none',
    }
  }

  const transitions = [
    `opacity ${duration}s ${EASE} ${delay}s`,
    `transform ${duration}s ${EASE} ${delay}s`,
  ]

  if (motion.hidden.filter !== undefined) {
    transitions.push(`filter ${duration}s ease ${delay}s`)
  }

  return {
    opacity: state.opacity,
    transform: state.transform,
    filter: state.filter,
    transition: transitions.join(', '),
    willChange: visible ? 'auto' : 'opacity, transform',
  }
}

export function Eyebrow({ children, sx }) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '2.5px',
        color: colors.gold,
        fontWeight: 700,
        mb: 1,
        display: 'inline-block',
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}

export function SectionHead({ eyebrow, title, description, variant = 'blurUp' }) {
  const { ref, visible } = useRevealRef()
  const reduced = usePrefersReducedMotion()
  const motion = getRevealStyles({ visible, variant, delay: 0, duration: 0.8, reduced })

  return (
    <Box ref={ref} sx={{ mb: 3.25, textAlign: 'center', ...motion }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.45rem', sm: '1.85rem', md: '2.2rem' },
          color: colors.ivory,
          lineHeight: 1.25,
          px: { xs: 0.5, sm: 0 },
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: colors.muted,
            maxWidth: 480,
            mx: 'auto',
            mt: 1,
            fontSize: { xs: '0.88rem', md: '0.95rem' },
            lineHeight: 1.65,
            px: { xs: 0.5, sm: 0 },
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  )
}

export function RevealBox({
  children,
  sx,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.75,
  threshold,
}) {
  const { ref, visible } = useInView(threshold !== undefined ? { threshold } : undefined)
  const reduced = usePrefersReducedMotion()
  const motion = getRevealStyles({ visible, variant, delay, duration, reduced })

  return (
    <Box ref={ref} sx={{ ...motion, ...sx }}>
      {children}
    </Box>
  )
}

export function RevealStagger({ children, sx, stagger = 0.1, threshold }) {
  const { ref, visible } = useInView(threshold !== undefined ? { threshold } : undefined)

  return (
    <StaggerContext.Provider value={{ visible, stagger }}>
      <Box ref={ref} sx={sx}>
        {children}
      </Box>
    </StaggerContext.Provider>
  )
}

export function RevealStaggerItem({
  children,
  index = 0,
  sx,
  variant = 'fadeUp',
  duration = 0.7,
}) {
  const { visible, stagger } = useContext(StaggerContext)
  const reduced = usePrefersReducedMotion()
  const motion = getRevealStyles({
    visible,
    variant,
    delay: index * stagger,
    duration,
    reduced,
  })

  return (
    <Box sx={{ ...motion, ...sx }}>
      {children}
    </Box>
  )
}

export function RevealGroup({ children, sx, stagger = 0.08, variant = 'fadeUp' }) {
  return (
    <RevealStagger sx={sx} stagger={stagger}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        return (
          <RevealStaggerItem key={child.key ?? index} index={index} variant={variant}>
            {child}
          </RevealStaggerItem>
        )
      })}
    </RevealStagger>
  )
}
