import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { SectionHead } from './shared'
import { colors, gradients } from '../constants/colors'

const testimonials = [
  {
    quote: 'The energy at MGM Navratri is unlike anything I\'ve experienced. The dhol beats, the whirl of colours, and thousands dancing as one — pure magic.',
    name: 'Priya Sharma',
    location: 'Rajkot',
    rating: 5,
  },
  {
    quote: 'We\'ve been coming since 2023 and it gets better every year. The venue, the decor, the food stalls — everything is so well organized.',
    name: 'Rahil Mehta',
    location: 'Jamnagar',
    rating: 5,
  },
  {
    quote: 'The couple pass is such a lovely idea! Reserved seating, complimentary mocktails, and dancing under the stars — a perfect date night.',
    name: 'Neha & Karan',
    location: 'Ahmedabad',
    rating: 5,
  },
  {
    quote: 'As a first-timer, I was nervous about joining the Garba circle. But everyone was so welcoming, and within minutes I was twirling along!',
    name: 'Anika Patel',
    location: 'Surat',
    rating: 5,
  },
  {
    quote: 'MGM Cultural has truly put Rajkot on the Navratri map. The Grand Finale with the Maha Aarti is an experience every Gujarati must witness.',
    name: 'Dr. Jayesh Trivedi',
    location: 'Rajkot',
    rating: 5,
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const intervalRef = useRef(null)

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    intervalRef.current = setInterval(next, 4500)
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 45) {
      if (diff > 0) next()
      else prev()
    }
    setTouchStart(null)
  }

  const t = testimonials[activeIndex]

  return (
    <Box component="section" sx={{ py: { xs: 5, md: 7 }, bgcolor: colors.bg, overflow: 'hidden', position: 'relative' }}>
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 2.5, md: 3 }, position: 'relative', zIndex: 1 }}>
        <SectionHead
          eyebrow="Testimonials"
          title="What People Say"
          description="Hear from those who have danced the nights away."
        />
        <Box
          sx={{ position: 'relative' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Box
            key={activeIndex}
            sx={{
              bgcolor: 'rgba(26, 8, 0, 0.85)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 179, 0, 0.15)',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25), 0 0 20px rgba(255, 179, 0, 0.04)',
              backdropFilter: 'blur(8px)',
              px: { xs: 2.5, md: 4 },
              py: { xs: 3, md: 3.5 },
              textAlign: 'center',
              animation: 'fadeSlideUp 0.4s ease',
              position: 'relative',
              '&::before': {
                content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: gradients.primary, borderRadius: '20px 20px 0 0',
              },
            }}
          >
            <FormatQuoteRoundedIcon sx={{ color: colors.gold, fontSize: '2.2rem', opacity: 0.2, mb: 1 }} />
            <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.02rem' }, color: colors.ivory, lineHeight: 1.8, fontStyle: 'italic', mb: 2, px: { xs: 0.5, md: 2 } }}>
              &ldquo;{t.quote}&rdquo;
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.3, mb: 1.5 }}>
              {Array.from({ length: t.rating }, (_, i) => (
                <StarRoundedIcon key={i} sx={{ color: colors.gold, fontSize: '0.95rem' }} />
              ))}
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: colors.ivory }}>{t.name}</Typography>
            <Typography sx={{ fontSize: '0.78rem', color: colors.muted }}>{t.location}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mt: 2.5 }}>
            <IconButton
              onClick={prev}
              sx={{ width: 36, height: 36, bgcolor: 'rgba(255, 179, 0, 0.08)', color: colors.ivory, '&:hover': { bgcolor: 'rgba(255, 179, 0, 0.18)' } }}
            >
              <ChevronLeftRoundedIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
            <Box sx={{ display: 'flex', gap: 0.6 }}>
              {testimonials.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  sx={{
                    width: i === activeIndex ? 20 : 8, height: 8,
                    borderRadius: '4px',
                    bgcolor: i === activeIndex ? colors.gold : 'rgba(255, 179, 0, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
            <IconButton
              onClick={next}
              sx={{ width: 36, height: 36, bgcolor: 'rgba(255, 179, 0, 0.08)', color: colors.ivory, '&:hover': { bgcolor: 'rgba(255, 179, 0, 0.18)' } }}
            >
              <ChevronRightRoundedIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
