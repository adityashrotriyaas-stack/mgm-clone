import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined'
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined'
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined'
import StarsRoundedIcon from '@mui/icons-material/StarsRounded'
import { colors, gradients } from '../constants/colors'
import { patternDiya, patternGarland, patternMandala } from '../constants/navratriTheme'
import { navLinks, pastHighlights, aboutContent } from '../data/siteData'
import { contactInfo } from '../data/contactInfo'
import { RevealBox } from './shared'
import FestiveSection from './FestiveSection'
import logoImg from '../assets/logo.jpeg'
import wowslyLogo from '../assets/wowsly-logo.png'
import pastNightsBg from '../assets/past-nights-bg.png'
import legacyBg from '../assets/artists-bg.png'

const highlightIcons = [
  SelfImprovementOutlinedIcon,
  CelebrationOutlinedIcon,
  FavoriteBorderRoundedIcon,
  MilitaryTechOutlinedIcon,
  LocalFireDepartmentOutlinedIcon,
  CelebrationOutlinedIcon,
  StarsRoundedIcon,
]

function ThrowbackHeader() {
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          color: colors.gold,
          mb: 1,
        }}
      >
        <Box sx={{ width: { xs: 24, md: 34 }, height: 1, bgcolor: 'rgba(255, 179, 0, 0.45)' }} />
        <Typography
          sx={{
            fontSize: { xs: '0.7rem', md: '0.8rem' },
            textTransform: 'uppercase',
            letterSpacing: { xs: '3px', md: '4px' },
            fontWeight: 700,
          }}
        >
          Throwback
        </Typography>
        <Box sx={{ width: { xs: 24, md: 34 }, height: 1, bgcolor: 'rgba(255, 179, 0, 0.45)' }} />
      </Box>

      <Typography
        component="h2"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '4.2rem' },
          lineHeight: 1.02,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          mb: 1.5,
        }}
      >
        <Box component="span" sx={{ color: '#FFF8EE', display: 'block' }}>
          Past Nights,
        </Box>
        <Box
          component="span"
          sx={{
            display: 'block',
            background: 'linear-gradient(180deg, #FFB300 0%, #EA5A00 55%, #C04E00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Forever Memories
        </Box>
      </Typography>

      <Typography
        sx={{
          maxWidth: 560,
          mx: 'auto',
          color: 'rgba(255, 245, 230, 0.84)',
          fontSize: { xs: '0.95rem', md: '1.02rem' },
          lineHeight: 1.7,
          mb: 2,
        }}
      >
        Highlights from Navratri 2025 — over 25,000 dancers across ten nights.
      </Typography>

      <Box
        aria-hidden
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.1,
          maxWidth: 280,
          mx: 'auto',
        }}
      >
        <Box sx={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${colors.gold})` }} />
        <Box sx={{ color: colors.gold, fontSize: { xs: '1rem', md: '1.15rem' } }}>❀</Box>
        <Box sx={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${colors.gold}, transparent)` }} />
      </Box>
    </Box>
  )
}

function HighlightCard({ item, meta, active = false, offset = 0 }) {
  const Icon = meta.icon
  const absOffset = Math.abs(offset)
  const scale = active ? 0.95 : absOffset === 1 ? 0.9 : 0.82
  const rotateY = active ? 0 : offset < 0 ? 14 : -14
  const translateY = active ? -4 : absOffset === 1 ? -14 : -6
  const opacity = active ? 1 : absOffset === 1 ? 0.96 : 0.8

  return (
    <Box
      sx={{
        position: 'relative',
        width: active
          ? { xs: 'min(78vw, 260px)', sm: 220, md: 235 }
          : { xs: 'min(58vw, 176px)', sm: 160, md: 172 },
        height: active ? { xs: 300, sm: 330, md: 345 } : { xs: 248, sm: 280, md: 300 },
        borderRadius: '22px',
        overflow: 'hidden',
        flexShrink: 0,
        border: active ? '1px solid rgba(234, 90, 0, 0.88)' : '1px solid rgba(255, 179, 0, 0.45)',
        boxShadow: active
          ? '0 0 0 1px rgba(255, 179, 0, 0.16), 0 18px 44px rgba(0,0,0,0.34), 0 0 24px rgba(255, 179, 0,0.18)'
          : absOffset === 1
            ? '0 12px 28px rgba(0,0,0,0.24)'
            : '0 10px 22px rgba(0,0,0,0.18)',
        transform: {
          xs: `translateY(${translateY}px) scale(${active ? 1 : absOffset === 1 ? 0.94 : 0.88})`,
          md: `perspective(1200px) translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`,
        },
        transformStyle: 'preserve-3d',
        transformOrigin: offset < 0 ? 'right center' : offset > 0 ? 'left center' : 'center center',
        opacity,
        filter: active ? 'none' : absOffset === 1 ? 'saturate(0.92)' : 'saturate(0.78) brightness(0.9)',
        transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, opacity 0.35s ease, filter 0.35s ease',
        zIndex: active ? 4 : 3 - absOffset,
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: item.imagePosition || (active ? 'center center' : 'center top'),
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: active
            ? 'linear-gradient(180deg, rgba(20,10,12,0.03) 0%, rgba(20,10,12,0.12) 26%, rgba(20,10,12,0.64) 100%)'
            : 'linear-gradient(180deg, rgba(20,10,12,0.28) 0%, rgba(20,10,12,0.42) 36%, rgba(20,10,12,0.88) 100%)',
        },
        '&::after': active
          ? {
              content: '""',
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 0 1px rgba(234, 90, 0, 0.25)',
              borderRadius: '22px',
            }
          : undefined,
      }}
    >
      {active && (
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            zIndex: 2,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            px: 1.2,
            py: 0.7,
            borderRadius: '999px',
            bgcolor: 'rgba(36, 21, 16, 0.86)',
            border: '1px solid rgba(234, 90, 0, 0.18)',
color: '#F0E8E0',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.4px',
          }}
        >
          <StarsRoundedIcon sx={{ fontSize: '0.9rem' }} />
          Highlight
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: active ? 82 : 70,
          transform: 'translateX(-50%)',
          width: active ? 58 : 52,
          height: active ? 58 : 52,
          borderRadius: '50%',
          border: '1px solid rgba(234, 90, 0, 0.72)',
          bgcolor: 'rgba(28, 12, 16, 0.38)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.gold,
          zIndex: 2,
          boxShadow: active ? '0 0 18px rgba(255, 179, 0, 0.16)' : 'none',
        }}
      >
        <Icon sx={{ fontSize: active ? '1.7rem' : '1.55rem' }} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          px: active ? 2 : 1.6,
          pb: active ? 1.8 : 1.5,
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            color: '#FFF8EE',
            fontWeight: 700,
            fontSize: active ? { xs: '1rem', md: '1.16rem' } : { xs: '0.92rem', md: '1rem' },
            mb: 0.55,
          }}
        >
          {item.label}
        </Typography>
      </Box>
    </Box>
  )
}

function MemoryLightbox({ item, onClose }) {
  if (!item) return null

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 1.5, sm: 2, md: 4 },
        bgcolor: 'rgba(10, 4, 8, 0.9)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overscrollBehavior: 'contain',
        touchAction: 'none',
      }}
    >
      <Box
        onClick={(event) => event.stopPropagation()}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 760,
          borderRadius: { xs: '18px', md: '22px' },
          overflow: 'hidden',
          border: '1px solid rgba(234, 90, 0, 0.42)',
          boxShadow: '0 22px 60px rgba(0, 0, 0, 0.5), 0 0 28px rgba(255, 179, 0, 0.14)',
          bgcolor: '#12070D',
          maxHeight: 'calc(100vh - 24px)',
        }}
      >
        <IconButton
          aria-label="Close memory preview"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: { xs: 8, md: 12 },
            right: { xs: 8, md: 12 },
            zIndex: 2,
            color: '#FFF8EE',
            width: { xs: 38, md: 42 },
            height: { xs: 38, md: 42 },
            bgcolor: 'rgba(20, 10, 12, 0.82)',
            border: '1px solid rgba(234, 90, 0, 0.5)',
            boxShadow: '0 8px 22px rgba(0, 0, 0, 0.3)',
            '&:hover': { bgcolor: 'rgba(20, 10, 12, 0.95)' },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: '1.15rem' }} />
        </IconButton>

        <Box
          sx={{
            position: 'relative',
            bgcolor: '#12070D',
            maxHeight: 'calc(100vh - 24px)',
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.label}
            loading="lazy"
            sx={{
              width: '100%',
              maxHeight: 'calc(100vh - 24px)',
              display: 'block',
              objectFit: 'contain',
              objectPosition: item.imagePosition || 'center center',
              bgcolor: '#12070D',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(18,7,10,0.04) 0%, rgba(18,7,10,0.18) 48%, rgba(18,7,10,0.82) 100%)',
              pointerEvents: 'none',
            }}
        />

        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            p: { xs: 1.5, md: 2 },
            background: 'linear-gradient(180deg, rgba(18,7,10,0) 0%, rgba(18,7,10,0.92) 100%)',
          }}
        >
          <Typography
            sx={{
              color: '#FFF8EE',
              fontWeight: 700,
              fontSize: { xs: '0.96rem', md: '1.18rem' },
              mb: 0.3,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      </Box>
      </Box>
    </Box>
  )
}

export default function PastNights() {
  const showcase = pastHighlights
  const [activeIndex, setActiveIndex] = useState(3)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState(null)
  const touchStartX = useRef(null)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 900)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!selectedMemory) return undefined

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalOverscrollBehavior = document.documentElement.style.overscrollBehavior
    const originalTouchAction = document.body.style.touchAction

    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedMemory(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.documentElement.style.overflow = originalHtmlOverflow
      document.documentElement.style.overscrollBehavior = originalOverscrollBehavior
      document.body.style.overflow = originalBodyOverflow
      document.body.style.touchAction = originalTouchAction
    }
  }, [selectedMemory])

  const slides = useMemo(() => {
    const offsets = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2]
    return offsets.map((offset) => {
      const originalIndex = (activeIndex + offset + showcase.length) % showcase.length
      const item = showcase[originalIndex]
      return {
        item,
        meta: {
          icon: highlightIcons[originalIndex % highlightIcons.length],
          date: item.date,
          highlight: originalIndex === Math.floor(showcase.length / 2),
        },
        originalIndex,
        offset,
        isActive: offset === 0,
      }
    })
  }, [activeIndex, showcase, isMobile])

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + showcase.length) % showcase.length)
  }

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % showcase.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 45) {
      if (diff > 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  return (
    <FestiveSection
      id="past"
      variant="night"
      showAccent={false}
      sx={{
        py: { xs: 5.5, md: 7.5 },
        backgroundImage: `linear-gradient(180deg, rgba(10,6,0,0.65) 0%, rgba(234,90,0,0.35) 50%, rgba(10,6,0,0.9) 100%), url(${pastNightsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
          height: 90,
          pointerEvents: 'none',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            width: '36%',
            height: 54,
            borderTop: '3px solid rgba(255, 179, 0, 0.16)',
          },
          '&::before': { left: 0, borderTopRightRadius: 120 },
          '&::after': { right: 0, borderTopLeftRadius: 120 },
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => {
          const left = `${index * 8.5}%`
          const top = index < 6 ? 18 + index * 4 : 38 - (index - 6) * 4
          return (
            <Box
              key={left}
              sx={{
                position: 'absolute',
                left,
                top,
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#FFB300',
                boxShadow: '0 0 8px rgba(255, 215, 106, 0.95), 0 0 18px rgba(255, 176, 74, 0.45)',
              }}
            />
          )
        })}
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 2.5, md: 4 } }}>
        <RevealBox variant="blurUp" duration={0.85}>
          <ThrowbackHeader />
        </RevealBox>

        <RevealBox
          variant="scaleUp"
          delay={0.12}
          duration={0.9}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '40px minmax(0, 1fr) 40px', lg: '72px minmax(0, 1fr) 72px' },
            alignItems: 'center',
            gap: { xs: 0.75, lg: 2 },
          }}
        >
          <IconButton
            aria-label="Previous highlights"
            onClick={goPrev}
            sx={{
              width: { xs: 40, lg: 56 },
              height: { xs: 40, lg: 56 },
              border: '1px solid rgba(255, 179, 0, 0.5)',
              color: '#FFF8EE',
              justifySelf: 'center',
              transition: 'transform 0.25s ease, border-color 0.25s ease',
              '&:hover': {
                borderColor: 'rgba(234, 90, 0, 0.9)',
                transform: 'translateX(-2px)',
              },
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: { xs: '1.1rem', lg: '1.4rem' } }} />
          </IconButton>

          <Box
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            sx={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center',
              gap: { xs: 0.9, md: 1.45 },
              overflow: { xs: 'hidden', lg: 'visible' },
              pb: 1,
              px: { xs: 0.25, md: 1 },
              perspective: { xs: 'none', md: '1600px' },
              perspectiveOrigin: '50% 50%',
              scrollBehavior: 'smooth',
              touchAction: 'pan-y',
              width: '100%',
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 179, 0, 0.25)',
                borderRadius: 999,
              },
            }}
          >
            {slides.map(({ item, meta, isActive, originalIndex, offset }) => (
              <Box
                key={`${item.label}-${offset}`}
                onClick={() => {
                  setActiveIndex(originalIndex)
                  setSelectedMemory(item)
                }}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexShrink: 0,
                }}
              >
                <HighlightCard item={item} meta={meta} active={isActive} offset={offset} />
              </Box>
            ))}
          </Box>

          <IconButton
            aria-label="Next highlights"
            onClick={goNext}
            sx={{
              width: { xs: 40, lg: 56 },
              height: { xs: 40, lg: 56 },
              border: '1px solid rgba(255, 179, 0, 0.5)',
              color: '#FFF8EE',
              justifySelf: 'center',
              transition: 'transform 0.25s ease, border-color 0.25s ease',
              '&:hover': {
                borderColor: 'rgba(234, 90, 0, 0.9)',
                transform: 'translateX(2px)',
              },
            }}
          >
            <ArrowForwardRoundedIcon sx={{ fontSize: { xs: '1.1rem', lg: '1.4rem' } }} />
          </IconButton>
        </RevealBox>

        <RevealBox variant="fadeUp" delay={0.22} duration={0.75}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1.6}
            sx={{
              mt: 2.5,
              color: colors.gold,
              width: 'fit-content',
              mx: 'auto',
            }}
          >
            <Box sx={{ width: 42, height: 1, bgcolor: 'rgba(255, 179, 0, 0.42)' }} />
            <Typography sx={{ fontSize: '0.95rem', lineHeight: 1 }}>❀</Typography>
            {showcase.map((_, dot) => (
              <Box
                key={dot}
                sx={{
                  width: dot === activeIndex ? 28 : 7,
                  height: 7,
                  borderRadius: 999,
                  bgcolor: dot === activeIndex ? colors.gold : 'rgba(255, 179, 0, 0.55)',
                  boxShadow: dot === activeIndex ? '0 0 12px rgba(255, 179, 0, 0.4)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
            <Typography sx={{ fontSize: '0.95rem', lineHeight: 1 }}>❀</Typography>
            <Box sx={{ width: 42, height: 1, bgcolor: 'rgba(255, 179, 0, 0.42)' }} />
          </Stack>
        </RevealBox>
      </Container>

      <MemoryLightbox item={selectedMemory} onClose={() => setSelectedMemory(null)} />
    </FestiveSection>
  )
}

export function Footer() {
  const navigate = useNavigate()
  return (
    <FestiveSection
      component="footer"
      variant="night"
      showAccent={false}
      sx={{
        pt: { xs: 4, md: 5.25 },
        pb: { xs: 'calc(24px + env(safe-area-inset-bottom, 0px))', md: 3 },
        mt: 0,
        color: 'rgba(255, 245, 230, 0.72)',
        backgroundImage: `
          linear-gradient(180deg, rgba(42,14,0,0.85) 0%, rgba(255,179,0,0.12) 100%),
          url(${legacyBg})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            component="img"
            src={wowslyLogo}
            alt="Wowsly"
            sx={{ width: 64, height: 'auto', display: 'block', mx: 'auto', mb: 0.4 }}
          />
          <Typography sx={{ fontSize: '0.78rem', color: colors.muted }}>
            Powered by Wowsly
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 3.25 },
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.4fr 1fr 1fr 1fr' },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: '"Unbounded", sans-serif',
                color: colors.textLight,
                fontSize: '1.2rem',
                fontWeight: 700,
              }}
            >
              MGM Cultural
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', mt: 1.25, maxWidth: 320 }}>
              {aboutContent.footerTagline}
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 1.75 }}>
              {['IG', 'FB', 'YT'].map((label) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    '&:hover': {
                      background: gradients.button,
                      color: colors.bg,
                    },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '1.8px',
                color: colors.gold,
                mb: 1.5,
                fontWeight: 700,
              }}
            >
              Explore
            </Typography>
            <Stack component="ul" spacing={1.1} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              {navLinks.slice(0, 3).map((link) => (
                <Box component="li" key={link.href}>
                  <Link href={link.href} sx={{ color: 'inherit', '&:hover': { color: colors.textLight } }}>
                    {link.label === 'Past Nights' ? 'Past Highlights' : link.label}
                  </Link>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '1.8px',
                color: colors.gold,
                mb: 1.5,
                fontWeight: 700,
              }}
            >
              Venue
            </Typography>
            <Stack component="ul" spacing={1.1} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              <Box component="li">Seasons Hotel</Box>
              <Box component="li">Rajkot, Gujarat</Box>
              <Box component="li">Gates open 7:30 PM</Box>
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '1.8px',
                color: colors.gold,
                mb: 1.5,
                fontWeight: 700,
              }}
            >
              Support
            </Typography>
            <Stack component="ul" spacing={1.1} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              <Box component="li">{contactInfo.phone}</Box>
              <Box component="li">{contactInfo.phone2}</Box>
              <Box component="li">{contactInfo.email}</Box>
              <Box component="li" sx={{ color: colors.gold, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => navigate('/privacy-policy')}>Privacy Policy</Box>
              <Box component="li" sx={{ color: colors.gold, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => navigate('/refund-policy')}>Refund Policy</Box>
              <Box component="li">Organiser Login</Box>
            </Stack>
          </Box>
        </Box>


      </Container>
    </FestiveSection>
  )
}
