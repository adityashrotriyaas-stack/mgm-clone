import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import artistsBg from '../assets/artists-bg.webp'
import nightSlide1 from '../assets/night-slide-1.webp'
import nightSlide2 from '../assets/night-slide-2.webp'
import nightSlide3 from '../assets/night-slide-3.webp'
import nightSlide4 from '../assets/night-slide-4.webp'
import nightSlide5 from '../assets/night-slide-5.webp'
import { colors } from '../constants/colors'
import { patternDiya, patternGarland, patternMandala, patternNight } from '../constants/navratriTheme'
import { navratriNights } from '../data/siteData'
import { RevealBox } from './shared'

const nightSlides = [nightSlide1, nightSlide2, nightSlide3, nightSlide4, nightSlide5]

const nightImages = Array.from({ length: 10 }, (_, i) => nightSlides[i % nightSlides.length])

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

const features = [
  { icon: CelebrationOutlinedIcon, title: 'Amit Dhorda & Team', subtitle: 'Authentic live Garba every evening' },
  { icon: NightsStayOutlinedIcon, title: '10 Grand Days', subtitle: 'A unique cultural experience each night' },
  { icon: VerifiedUserOutlinedIcon, title: 'Renowned Artists', subtitle: 'A different featured performer daily' },
  { icon: WorkspacePremiumOutlinedIcon, title: 'Mandli Garba', subtitle: 'Traditional celebration late into the night' },
]

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

function NightStoryCard({ night, image, isActive, imageAlign = 'center' }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: '22px',
        overflow: 'hidden',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        zIndex: isActive ? 1 : 0,
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
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'contain',
          backgroundPosition: imageAlign,
          backgroundRepeat: 'no-repeat',
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

export default function UpcomingNightsTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nights = useMemo(
    () =>
      navratriNights.map((night, index) => ({
        ...night,
        ...cardDetails[index],
        image: nightImages[index % nightImages.length],
      })),
    [],
  )

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((i) => (i + 1) % nights.length), 4000)
    return () => clearInterval(timer)
  }, [nights.length])

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
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: { xs: '100%', lg: '1100px' },
              mx: 'auto',
              aspectRatio: '3 / 2',
              borderRadius: '22px',
              overflow: 'hidden',
              border: '1.5px solid rgba(255, 180, 80, 0.4)',
              boxShadow: '0 0 16px rgba(255, 160, 60, 0.12), 0 14px 28px rgba(0, 0, 0, 0.35)',
            }}
          >
            {nights.map((night, index) => (
              <NightStoryCard
                key={night.id}
                night={night}
                image={night.image}
                isActive={index === activeIndex}
                imageAlign={index % 5 === 3 ? 'center' : 'left center'}
              />
            ))}
          </Box>
        </RevealBox>

        <RevealBox variant="fadeUp" delay={0.2} duration={0.6}>
          <Box
            sx={{
              mt: 2,
              mx: 'auto',
              maxWidth: { xs: '100%', lg: '1100px' },
              overflowX: 'auto',
              pb: 1,
              px: 1,
              display: 'flex',
              justifyContent: 'center',
              '&::-webkit-scrollbar': { height: 4 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255, 179, 0,0.3)', borderRadius: 4 },
            }}
          >
<Stack direction="row" spacing={1} sx={{ py: 1 }}>
              {nights.slice(0, 5).map((night, index) => {
                const isThumbActive = index === activeIndex % 5
                return (
                  <Box
                    key={night.id}
                    onClick={() => setActiveIndex(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(index)}
                    aria-label={night.label}
                    sx={{
                      position: 'relative',
                      flexShrink: 0,
                      width: isThumbActive ? 56 : 44,
                      height: isThumbActive ? 56 : 44,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isThumbActive ? `2px solid ${colors.gold}` : '1.5px solid rgba(255,255,255,0.15)',
                      boxShadow: isThumbActive ? '0 0 16px rgba(255, 179, 0,0.35)' : 'none',
                      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                      opacity: isThumbActive ? 1 : 0.55,
                      transform: isThumbActive ? 'translateY(-4px) scale(1.05)' : 'none',
                      '&:hover': { opacity: 1, borderColor: colors.gold },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${night.image})`,
backgroundSize: 'contain',
                        backgroundPosition: 'center',
                      }}
                    />
                  </Box>
                )
              })}
            </Stack>
          </Box>
        </RevealBox>

        <RevealBox variant="fadeUp" delay={0.22} duration={0.75}>
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
