import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { colors, gradients } from '../constants/colors'

function useRevealRef(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

export function Eyebrow({ children, sx }) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '2.5px',
        color: colors.teal,
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

export function SectionHead({ eyebrow, title, description }) {
  const { ref, visible } = useRevealRef()

  return (
    <Box
      ref={ref}
      sx={{
        mb: 3.25,
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
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

export function RevealBox({ children, sx }) {
  const { ref, visible } = useRevealRef()

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export function StaggerReveal({ children, sx, staggerMs = 80 }) {
  const { ref, visible } = useRevealRef()

  return (
    <Box
      ref={ref}
      sx={{
        '& > *': {
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          transitionDelay: visible
            ? (_, i) => `${i * staggerMs}ms`
            : '0ms',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export function HoverGlow({ children, sx }) {
  return (
    <Box
      sx={{
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease',
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 20px 40px rgba(44,31,16,0.10)',
            borderColor: 'rgba(184,134,11,0.25)',
          },
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export function SectionDivider() {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      justifyContent="center"
      sx={{ py: { xs: 2, md: 2.5 }, px: 2 }}
    >
      <Box sx={{ width: 40, height: '1px', background: `linear-gradient(90deg, transparent, ${colors.glassBorder})` }} />
      <Stack direction="row" spacing={0.5}>
        <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: colors.gold, opacity: 0.4 }} />
        <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: colors.gold, opacity: 0.6 }} />
        <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: colors.gold, opacity: 0.4 }} />
      </Stack>
      <Box sx={{ width: 40, height: '1px', background: `linear-gradient(90deg, ${colors.glassBorder}, transparent)` }} />
    </Stack>
  )
}
