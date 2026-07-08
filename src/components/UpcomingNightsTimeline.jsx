import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useNavigate } from 'react-router-dom'
import dandiyaDeco from '../assets/dandiya-deco.png'
import { colors, gradients } from '../constants/colors'
import { navratriNights, pastHighlights } from '../data/siteData'

const nightImages = [
  'https://images.unsplash.com/photo-1601122210027-a3082d6f9a99?w=800',
  'https://images.unsplash.com/photo-1604608672516-f1a8f9b94c6f?w=800',
  'https://images.unsplash.com/photo-1576487248805-cf45f6bdc67c?w=800',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800',
  'https://images.unsplash.com/photo-1572014652523-cb71e1f5e5d4?w=800',
  'https://images.unsplash.com/photo-1601122210027-a3082d6f9a99?w=800',
  'https://images.unsplash.com/photo-1604608672516-f1a8f9b94c6f?w=800',
  'https://images.unsplash.com/photo-1576487248805-cf45f6bdc67c?w=800',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800',
  'https://images.unsplash.com/photo-1572014652523-cb71e1f5e5d4?w=800',
]

const cardDetails = [
  { accent: 'Opening Aarti' },
  { accent: 'Classic Raas' },
  { accent: 'Color Burst' },
  { accent: 'High Energy' },
  { accent: 'Bollywood Night' },
  { accent: 'Folk Fusion' },
  { accent: 'Dandiya Special' },
  { accent: 'Celebration' },
  { accent: 'Raas Rhythm' },
  { accent: 'Grand Finale' },
]

const TOTAL = navratriNights.length
const VISIBLE_RANGE = 3

function getCircularOffset(index, activeIndex, total) {
  let offset = index - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

function getCardTransform(offset) {
  const abs = Math.abs(offset)
  if (abs > VISIBLE_RANGE) {
    return {
      opacity: 0,
      pointerEvents: 'none',
      transform: 'translateX(0) rotateY(0deg) scale(0.5)',
    }
  }

  const x = offset * (offset === 0 ? 0 : offset > 0 ? 132 : -132)
  const rotateY = offset * -26
  const scale = offset === 0 ? 1 : 0.82 - abs * 0.05
  const translateZ = offset === 0 ? 60 : -abs * 35

  return {
    opacity: 1 - abs * 0.14,
    zIndex: 30 - abs,
    transform: `translateX(${x}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    pointerEvents: abs <= 2 ? 'auto' : 'none',
  }
}

const arrowBtnSx = {
  width: { xs: 44, md: 52 },
  height: { xs: 44, md: 52 },
  border: '1px solid rgba(255, 255, 255, 0.28)',
  borderRadius: '50%',
  color: 'rgba(255, 255, 255, 0.92)',
  bgcolor: 'rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.3s ease',
  flexShrink: 0,
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(232, 184, 74, 0.65)',
    color: colors.gold,
    transform: 'scale(1.06)',
    boxShadow: '0 0 20px rgba(232, 184, 74, 0.2)',
  },
}

function NightStoryCard({ night, image, detail, offset, isActive, onSelect, onPlay, isTransitioning }) {
  const { opacity, zIndex, transform, pointerEvents } = getCardTransform(offset)

  return (
    <Box
      onClick={onSelect}
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: { xs: 200, sm: 230, md: 260 },
        height: { xs: 340, sm: 390, md: 430 },
        ml: { xs: '-100px', sm: '-115px', md: '-130px' },
        mt: { xs: '-170px', sm: '-195px', md: '-215px' },
        borderRadius: '22px',
        overflow: 'hidden',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        transform,
        opacity,
        zIndex,
        pointerEvents,
        transition: isTransitioning
          ? 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, box-shadow 0.5s ease'
          : 'none',
        border: isActive
          ? '2px solid rgba(255, 180, 80, 0.95)'
          : '1.5px solid rgba(255, 180, 80, 0.4)',
        boxShadow: isActive
          ? '0 0 40px rgba(255, 160, 60, 0.4), 0 28px 56px rgba(0, 0, 0, 0.5)'
          : '0 0 16px rgba(255, 160, 60, 0.12), 0 14px 28px rgba(0, 0, 0, 0.35)',
        '&::before': isActive
          ? {
              content: '""',
              position: 'absolute',
              inset: -1,
              borderRadius: '23px',
              padding: '1px',
              background: 'linear-gradient(160deg, rgba(255,220,140,0.9), rgba(255,140,40,0.3), rgba(255,220,140,0.7))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
              zIndex: 2,
              animation: 'borderPulse 2.5s ease-in-out infinite',
            }
          : {},
        '@keyframes borderPulse': {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 1 },
        },
        '&:hover': {
          borderColor: 'rgba(255, 190, 90, 1)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: isActive ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.7s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8,6,18,0.1) 0%, rgba(8,6,18,0.2) 38%, rgba(8,6,18,0.88) 100%)',
        }}
      />

      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            top: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: '40%',
            background: 'radial-gradient(ellipse, rgba(255,180,60,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'cardGlow 3s ease-in-out infinite',
            '@keyframes cardGlow': {
              '0%, 100%': { opacity: 0.5 },
              '50%': { opacity: 1 },
            },
          }}
        />
      )}

      <Box sx={{ position: 'relative', zIndex: 1, height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '1.6px',
            fontWeight: 700,
            color: 'rgba(255, 220, 160, 0.9)',
          }}
        >
          {night.label}
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.05rem', md: '1.18rem' },
            fontWeight: 700,
            color: '#FFF8E7',
            lineHeight: 1.2,
          }}
        >
          {night.theme}
        </Typography>

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              onPlay()
            }}
            aria-label={`Explore ${night.theme}`}
            sx={{
              width: 58,
              height: 58,
              border: '2px solid rgba(255, 190, 90, 0.85)',
              bgcolor: 'rgba(12, 8, 20, 0.5)',
              backdropFilter: 'blur(8px)',
              color: '#FFD98A',
              boxShadow: '0 0 28px rgba(255, 170, 60, 0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              animation: isActive ? 'playPulse 2s ease-in-out infinite' : 'none',
              '@keyframes playPulse': {
                '0%, 100%': { boxShadow: '0 0 28px rgba(255, 170, 60, 0.3)' },
                '50%': { boxShadow: '0 0 42px rgba(255, 170, 60, 0.55)' },
              },
              '&:hover': {
                bgcolor: 'rgba(12, 8, 20, 0.7)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: '1.9rem' }} />
          </IconButton>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 235, 210, 0.85)' }}>
            {night.date}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255, 220, 160, 0.7)', mt: 0.35 }}>
            {detail.accent}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

function NightThumb({ night, image, isActive, onClick }) {
  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={night.label}
      sx={{
        position: 'relative',
        flexShrink: 0,
        width: isActive ? 56 : 44,
        height: isActive ? 56 : 44,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: isActive ? `2px solid ${colors.gold}` : '1.5px solid rgba(255,255,255,0.15)',
        boxShadow: isActive ? '0 0 16px rgba(232,184,74,0.35)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: isActive ? 1 : 0.55,
        transform: isActive ? 'translateY(-4px) scale(1.05)' : 'none',
        '&:hover': { opacity: 1, borderColor: colors.gold },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: isActive ? '0.72rem' : '0.62rem',
            fontWeight: 700,
            color: '#FFF8E7',
          }}
        >
          {night.id}
        </Typography>
      </Box>
    </Box>
  )
}

export default function UpcomingNightsTimeline() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)
  const carouselRef = useRef(null)

  const nights = useMemo(
    () =>
      navratriNights.map((night, index) => ({
        ...night,
        ...cardDetails[index],
        image: nightImages[index] || pastHighlights[index % pastHighlights.length]?.image,
      })),
    [],
  )

  const goTo = useCallback((index) => {
    setIsTransitioning(true)
    setActiveIndex(index)
  }, [])

  const goPrev = useCallback(() => {
    setIsTransitioning(true)
    setActiveIndex((i) => (i === 0 ? TOTAL - 1 : i - 1))
  }, [])

  const goNext = useCallback(() => {
    setIsTransitioning(true)
    setActiveIndex((i) => (i === TOTAL - 1 ? 0 : i + 1))
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (!carouselRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  useEffect(() => {
    if (isPaused) return undefined
    const timer = setInterval(goNext, 5500)
    return () => clearInterval(timer)
  }, [goNext, isPaused, activeIndex])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  const activeNight = nights[activeIndex]

  return (
    <Box
      component="section"
      id="upcoming"
      sx={{
        position: 'relative',
        py: { xs: 5, md: 6 },
        bgcolor: colors.night,
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(255,180,60,0.08), transparent 40%),
          radial-gradient(circle at 15% 80%, rgba(168,50,72,0.08), transparent 30%),
          repeating-linear-gradient(45deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 24px)
        `,
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 280, md: 360 },
          height: { xs: 280, md: 360 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,170,60,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 2.5, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.82rem', md: '0.95rem' },
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontWeight: 700,
              color: colors.gold,
              mb: 1.2,
            }}
          >
            What&apos;s Next
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Unbounded", sans-serif',
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
              lineHeight: 1.05,
              fontWeight: 700,
              color: colors.textLight,
              letterSpacing: '-0.04em',
              mb: 1.25,
            }}
          >
            Upcoming Nights
          </Typography>
          <Typography
            sx={{
              maxWidth: 560,
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: colors.muted,
              lineHeight: 1.7,
            }}
          >
            Each night brings a new theme — book early, ground passes are limited.
          </Typography>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            width: '100%',
            height: { xs: 380, sm: 440, md: 500 },
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              width: { xs: 48, sm: 56, md: 64 },
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton onClick={goPrev} aria-label="Previous night" sx={arrowBtnSx}>
              <ArrowBackRoundedIcon sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' } }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              position: 'relative',
              flex: 1,
              minWidth: 0,
              height: '100%',
            }}
          >
            <Box
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              tabIndex={0}
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                perspective: '1600px',
                perspectiveOrigin: '50% 50%',
                outline: 'none',
                zIndex: 2,
              }}
            >
              {nights.map((night, index) => {
                const offset = getCircularOffset(index, activeIndex, TOTAL)
                if (Math.abs(offset) > VISIBLE_RANGE) return null
                return (
                  <NightStoryCard
                    key={night.id}
                    night={night}
                    image={night.image}
                    detail={night}
                    offset={offset}
                    isActive={index === activeIndex}
                    isTransitioning={isTransitioning}
                    onSelect={() => goTo(index)}
                    onPlay={() => navigate(`/event/${night.id}`)}
                  />
                )
              })}
            </Box>

            <Box
              component="img"
              src={dandiyaDeco}
              alt=""
              aria-hidden
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'absolute',
                left: { md: '11%', lg: '13%' },
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: { md: 200, lg: 250 },
                height: 'auto',
                maxHeight: { md: 300, lg: 360 },
                objectFit: 'contain',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 1,
              }}
            />
          </Box>

          <Box
            sx={{
              width: { xs: 48, sm: 56, md: 64 },
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton onClick={goNext} aria-label="Next night" sx={arrowBtnSx}>
              <ArrowForwardRoundedIcon sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' } }} />
            </IconButton>
          </Box>
        </Stack>

          <Box
            sx={{
              mt: 3,
              mx: 'auto',
              maxWidth: 680,
              overflowX: 'auto',
              pb: 1,
              px: 1,
              '&::-webkit-scrollbar': { height: 4 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(232,184,74,0.3)', borderRadius: 4 },
            }}
          >
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ minWidth: 'max-content', py: 1 }}>
              {nights.map((night, index) => (
                <NightThumb
                  key={night.id}
                  night={night}
                  image={night.image}
                  isActive={index === activeIndex}
                  onClick={() => goTo(index)}
                />
              ))}
            </Stack>
          </Box>

          <Stack alignItems="center" sx={{ mt: 2.5 }}>
            <Button
              onClick={() => navigate(`/event/${activeNight.id}`)}
              sx={{
                background: gradients.primary,
                color: colors.night,
                px: 3.5,
                py: 1.35,
                borderRadius: '999px',
                fontWeight: 700,
                boxShadow: '0 10px 28px rgba(201, 139, 46, 0.3)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  background: gradients.primary,
                  filter: 'brightness(1.05)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 14px 32px rgba(201, 139, 46, 0.4)',
                },
              }}
            >
              Book {activeNight.theme}
            </Button>
          </Stack>
        </Container>
    </Box>
  )
}
