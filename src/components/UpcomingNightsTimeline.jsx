import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { useNavigate } from 'react-router-dom'
import artistsBg from '../assets/artists-bg.png'
import dandiyaDeco from '../assets/dandiya-deco.png'
import artistBg1 from '../assets/artist-bg-1.jpeg'
import artistBg2 from '../assets/artist-bg-2.jpeg'
import artistBg3 from '../assets/artist-bg-3.jpeg'
import artistBg4 from '../assets/artist-bg-4.jpeg'
import { colors } from '../constants/colors'
import { patternDiya, patternGarland, patternMandala, patternNight } from '../constants/navratriTheme'
import { navratriNights, pastHighlights } from '../data/siteData'
import { RevealBox } from './shared'

const bgImgs = [artistBg1, artistBg2, artistBg3, artistBg4]

const nightImages = Array.from({ length: 10 }, (_, i) => bgImgs[i % bgImgs.length])

const cardDetails = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]

const TOTAL = navratriNights.length
const VISIBLE_RANGE = 3

const features = [
  { icon: CelebrationOutlinedIcon, title: 'Amit Dhorda & Team', subtitle: 'Authentic live Garba every evening' },
  { icon: NightsStayOutlinedIcon, title: '10 Grand Days', subtitle: 'A unique cultural experience each night' },
  { icon: VerifiedUserOutlinedIcon, title: 'Renowned Artists', subtitle: 'A different featured performer daily' },
  { icon: WorkspacePremiumOutlinedIcon, title: 'Mandli Garba', subtitle: 'Traditional celebration late into the night' },
]

function getCircularOffset(index, activeIndex, total) {
  let offset = index - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

function getCardTransform(offset, compact = false) {
  const abs = Math.abs(offset)
  const maxVisible = compact ? 1 : VISIBLE_RANGE
  if (abs > maxVisible) {
    return {
      opacity: 0,
      pointerEvents: 'none',
      transform: 'translateX(0) rotateY(0deg) scale(0.5)',
    }
  }

  const step = compact ? 78 : 132
  const x = offset * (offset === 0 ? 0 : offset > 0 ? step : -step)
  const rotateY = compact ? offset * -10 : offset * -26
  const scale = offset === 0 ? 1 : compact ? 0.86 - abs * 0.04 : 0.82 - abs * 0.05
  const translateZ = offset === 0 ? (compact ? 28 : 60) : -abs * (compact ? 18 : 35)

  return {
    opacity: compact ? 1 - abs * 0.22 : 1 - abs * 0.14,
    zIndex: 30 - abs,
    transform: `translateX(${x}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    pointerEvents: abs <= (compact ? 1 : 2) ? 'auto' : 'none',
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
    borderColor: 'rgba(255, 179, 0, 0.65)',
    color: colors.gold,
    transform: 'scale(1.06)',
    boxShadow: '0 0 20px rgba(255, 179, 0, 0.2)',
  },
}

function NightStoryCard({ night, image, detail, offset, isActive, onSelect, isTransitioning, compact = false }) {
  const { opacity, zIndex, transform, pointerEvents } = getCardTransform(offset, compact)

  return (
    <Box
      onClick={onSelect}
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: { xs: 260, sm: 320, md: 400 },
        height: { xs: 146, sm: 180, md: 225 },
        ml: { xs: '-130px', sm: '-160px', md: '-200px' },
        mt: { xs: '-73px', sm: '-90px', md: '-112px' },
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
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(ellipse, rgba(255,179,0,0.15) 0%, transparent 70%)',
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
            mt: 0.5,
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.05rem', md: '1.18rem' },
            fontWeight: 700,
            color: '#FFF8E7',
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {night.theme}
        </Typography>
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
        boxShadow: isActive ? '0 0 16px rgba(255, 179, 0,0.35)' : 'none',
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
  const [hoverPaused, setHoverPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const isPaused = hoverPaused || !inView
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(null)
  const carouselRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 900)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const nights = useMemo(
    () =>
      navratriNights.map((night, index) => ({
        ...night,
        ...cardDetails[index],
        image: pastHighlights[index % pastHighlights.length]?.image,
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
      id="artists"
      sx={{
        position: 'relative',
        pt: { xs: 2, md: 2.5 },
        pb: { xs: 5, md: 6 },
        backgroundImage: `linear-gradient(180deg, rgba(10,6,0,0.70) 0%, rgba(234,90,0,0.25) 50%, rgba(10,6,0,0.85) 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
        <RevealBox variant="blurUp" duration={0.85}>
          <Box sx={{ textAlign: 'center', mb: { xs: 2.25, md: 2.75 } }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: { xs: 0.8, md: 1.2 },
                mb: 1,
              }}
            >
              <Box
                sx={{
                  width: { xs: 28, md: 44 },
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${colors.gold})`,
                }}
              />
              <Box sx={{ color: colors.gold, fontSize: { xs: '0.62rem', md: '0.72rem' }, lineHeight: 1 }}>◈</Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.66rem', md: '0.76rem' },
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '2.5px', md: '4px' },
                  fontWeight: 600,
                  color: colors.gold,
                }}
              >
                What's On
              </Typography>
              <Box sx={{ color: colors.gold, fontSize: { xs: '0.62rem', md: '0.72rem' }, lineHeight: 1 }}>◈</Box>
              <Box
                sx={{
                  width: { xs: 28, md: 44 },
                  height: 1,
                  background: `linear-gradient(90deg, ${colors.gold}, transparent)`,
                }}
              />
            </Box>

            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '1.95rem', sm: '2.55rem', md: '3.15rem' },
                lineHeight: 1.06,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 0.9,
              }}
            >
              <Box component="span" sx={{ color: '#FFFFFF' }}>
                Artists &{' '}
              </Box>
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(180deg, #FFB300 0%, #EA5A00 55%, #C04E00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Performers
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 520,
                mx: 'auto',
                fontSize: { xs: '0.86rem', md: '0.96rem' },
                color: 'rgba(255, 255, 255, 0.88)',
                lineHeight: 1.6,
                mb: 1.5,
              }}
            >
              Swipe through our lineup — each night features a different artist.
            </Typography>

            <Box
              aria-hidden
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                maxWidth: 260,
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${colors.gold})`,
                  position: 'relative',
                  '&::after': {
                    content: '"◆"',
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.35rem',
                    color: colors.gold,
                  },
                }}
              />
              <Box
                sx={{
                  color: colors.gold,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1,
                  opacity: 0.95,
                }}
              >
                ❀
              </Box>
              <Box
                sx={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(90deg, ${colors.gold}, transparent)`,
                  position: 'relative',
                  '&::before': {
                    content: '"◆"',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.35rem',
                    color: colors.gold,
                  },
                }}
              />
            </Box>
          </Box>
        </RevealBox>

        <RevealBox variant="scaleUp" delay={0.15} duration={0.9}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              width: '100%',
              height: { xs: 280, sm: 340, md: 400 },
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                width: { xs: 40, sm: 52, md: 64 },
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton onClick={goPrev} aria-label="Previous night" sx={arrowBtnSx}>
                <ArrowBackRoundedIcon sx={{ fontSize: { xs: '1.15rem', md: '1.4rem' } }} />
              </IconButton>
            </Box>

            <Box
              sx={{
                position: 'relative',
                flex: 1,
                minWidth: 0,
                height: '100%',
                overflow: 'hidden',
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
                  perspective: { xs: '900px', md: '1600px' },
                  perspectiveOrigin: '50% 50%',
                  outline: 'none',
                  zIndex: 2,
                  touchAction: 'pan-y',
                }}
              >
                {nights.map((night, index) => {
                  const offset = getCircularOffset(index, activeIndex, TOTAL)
                  if (Math.abs(offset) > (isMobile ? 1 : VISIBLE_RANGE)) return null
                  return (
                    <NightStoryCard
                      key={night.id}
                      night={night}
                      image={night.image}
                      detail={night}
                      offset={offset}
                      isActive={index === activeIndex}
                      isTransitioning={isTransitioning}
                      compact={isMobile}
                      onSelect={() => goTo(index)}
                    />
                  )
                })}
              </Box>

              <Box
                component="img"
                src={dandiyaDeco}
                alt=""
                loading="lazy"
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
                width: { xs: 40, sm: 52, md: 64 },
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton onClick={goNext} aria-label="Next night" sx={arrowBtnSx}>
                <ArrowForwardRoundedIcon sx={{ fontSize: { xs: '1.15rem', md: '1.4rem' } }} />
              </IconButton>
            </Box>
          </Stack>
        </RevealBox>

        <RevealBox variant="fadeUp" delay={0.22} duration={0.75}>
          <Box
            sx={{
              mt: 3,
              mx: 'auto',
              maxWidth: 680,
              overflowX: 'auto',
              pb: 1,
              px: 1,
              '&::-webkit-scrollbar': { height: 4 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255, 179, 0,0.3)', borderRadius: 4 },
            }}
          >
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ minWidth: 'max-content', py: 1 }}>
              {nights.map((night, index) => (
                <NightThumb
                  key={night.id}
                  night={night}
                  image={night.image}
                  isActive={index === activeIndex}
                />
              ))}
            </Stack>
          </Box>

          <Stack alignItems="center" sx={{ mt: 2.5, width: '100%' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: 1.5,
                width: '100%',
                maxWidth: 900,
                mx: 'auto',
              }}
            >
              {features.map(({ icon: Icon, title, subtitle }) => (
                <Box
                  key={title}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    px: { xs: 1.4, md: 1.6 },
                    py: { xs: 1.35, md: 1.55 },
                    borderRadius: '18px',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,179,0,.25)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.16)',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 32px rgba(0,0,0,0.22)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      minWidth: 38,
                      borderRadius: '12px',
                      border: '1px solid rgba(234, 90, 0,0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      bgcolor: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <Icon sx={{ color: '#FFFFFF', fontSize: '1.1rem' }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ color: '#FFF8F0', fontWeight: 700, fontSize: '0.9rem', mb: 0.2 }}>
                      {title}
                    </Typography>
                    <Typography sx={{ color: '#D7C5B8', fontSize: '0.75rem', lineHeight: 1.55 }}>
                      {subtitle}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Stack>
        </RevealBox>
      </Container>
    </Box>
  )
}
