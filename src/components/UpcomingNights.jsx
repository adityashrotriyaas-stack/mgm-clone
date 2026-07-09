import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import StarsRoundedIcon from '@mui/icons-material/StarsRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import promoBanner from '../assets/image.png'
import { colors, gradients } from '../constants/colors'
import { patternDiya, patternGarland, patternMandala } from '../constants/navratriTheme'
import { aboutContent } from '../data/siteData'

const section = {
  bg: '#180A0F',
  bgSoft: '#2A1118',
  heading: '#FFF8F0',
  body: '#D7C5B8',
  chipBg: 'rgba(255,255,255,0.05)',
  chipBorder: 'rgba(232,176,74,.25)',
  cardBorder: 'rgba(232,176,74,.28)',
  frameShadow: '0 28px 70px rgba(0, 0, 0, 0.42)',
  btnOutline: 'rgba(232,176,74,.3)',
  gold: '#E8B04A',
  goldLight: '#FFD87A',
}

const metaChips = [
  { icon: CalendarMonthOutlinedIcon, label: 'Oct 10 – Oct 19, 2026' },
  { icon: LocationOnOutlinedIcon, label: 'Seasons Hotel, Rajkot' },
  { icon: AccessTimeOutlinedIcon, label: 'From 9:00 PM Daily' },
]

const trustPoints = [
  { icon: '🛡', label: 'Secure Booking' },
  { icon: '⚡', label: 'Instant QR Pass' },
  { icon: '🎟', label: 'Easy Entry' },
]

const features = [
  {
    icon: CelebrationOutlinedIcon,
    title: 'Amit Dhorda & Team',
    subtitle: 'Authentic live Garba every evening',
  },
  {
    icon: NightsStayOutlinedIcon,
    title: '10 Grand Days',
    subtitle: 'A unique cultural experience each night',
  },
  {
    icon: VerifiedUserOutlinedIcon,
    title: 'Renowned Artists',
    subtitle: 'A different featured performer daily',
  },
  {
    icon: WorkspacePremiumOutlinedIcon,
    title: 'Mandli Garba',
    subtitle: 'Traditional celebration late into the night',
  },
]

export default function UpcomingNights() {
  const navigate = useNavigate()

  return (
    <Box
      component="section"
      id="featured-event"
      sx={{
        position: 'relative',
        py: { xs: 5, md: 7 },
        bgcolor: section.bg,
        backgroundImage: `
          radial-gradient(circle at 72% 34%, rgba(232,176,74,0.16), transparent 24%),
          radial-gradient(circle at 24% 72%, rgba(168,50,72,0.14), transparent 22%),
          linear-gradient(180deg, ${section.bg} 0%, ${section.bgSoft} 100%),
          ${patternDiya},
          ${patternMandala},
          ${patternGarland}
        `,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0 1px, transparent 1px 28px)',
          opacity: 0.35,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 44%, rgba(0,0,0,0.36) 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          width: 140,
          height: 140,
          opacity: 0.1,
          borderRadius: '50%',
          border: `1px solid ${section.chipBorder}`,
          backgroundImage: patternMandala,
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 140,
          height: 140,
          opacity: 0.1,
          borderRadius: '50%',
          border: `1px solid ${section.chipBorder}`,
          backgroundImage: patternMandala,
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          width: 120,
          height: 120,
          opacity: 0.08,
          borderRadius: '50%',
          border: `1px solid ${section.chipBorder}`,
          backgroundImage: patternMandala,
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 120,
          height: 120,
          opacity: 0.08,
          borderRadius: '50%',
          border: `1px solid ${section.chipBorder}`,
          backgroundImage: patternMandala,
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 2.5, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 3, md: 4, lg: 5 },
            alignItems: 'center',
          }}
        >
          {/* Left — framed poster card */}
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                position: 'relative',
                bgcolor: 'rgba(255,255,255,0.03)',
                borderRadius: { xs: '22px', md: '24px' },
                p: { xs: 0.8, md: 1 },
                border: `1px solid ${section.cardBorder}`,
                boxShadow: section.frameShadow,
                backdropFilter: 'blur(8px)',
                animation: 'featuredFloat 6s ease-in-out infinite',
                '@keyframes featuredFloat': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-6px)' },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 14,
                  borderRadius: { xs: '18px', md: '20px' },
                  border: '1px solid rgba(255,216,122,0.16)',
                  pointerEvents: 'none',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: -1,
                  borderRadius: { xs: '22px', md: '24px' },
                  boxShadow: '0 0 36px rgba(232,176,74,0.16)',
                  pointerEvents: 'none',
                },
              }}
            >
              <Box sx={{ position: 'absolute', top: 12, left: 12, width: 18, height: 18, borderTop: `2px solid ${section.goldLight}`, borderLeft: `2px solid ${section.goldLight}`, borderTopLeftRadius: 8, opacity: 0.75 }} />
              <Box sx={{ position: 'absolute', top: 12, right: 12, width: 18, height: 18, borderTop: `2px solid ${section.goldLight}`, borderRight: `2px solid ${section.goldLight}`, borderTopRightRadius: 8, opacity: 0.75 }} />
              <Box sx={{ position: 'absolute', bottom: 12, left: 12, width: 18, height: 18, borderBottom: `2px solid ${section.goldLight}`, borderLeft: `2px solid ${section.goldLight}`, borderBottomLeftRadius: 8, opacity: 0.75 }} />
              <Box sx={{ position: 'absolute', bottom: 12, right: 12, width: 18, height: 18, borderBottom: `2px solid ${section.goldLight}`, borderRight: `2px solid ${section.goldLight}`, borderBottomRightRadius: 8, opacity: 0.75 }} />
              <Box
                component="img"
                src={promoBanner}
                alt="MGM Cultural Navratri 2025 — Rajkot event poster"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: { xs: '14px', md: '16px' },
                }}
              />
            </Box>
          </Box>

          {/* Right — open content on cream (no extra card) */}
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.04)',
                color: section.goldLight,
                fontSize: { xs: '0.62rem', sm: '0.68rem' },
                fontWeight: 700,
                letterSpacing: '1.6px',
                textTransform: 'uppercase',
                px: 1.75,
                py: 0.72,
                borderRadius: '50px',
                mb: { xs: 1.5, md: 2 },
                border: `1px solid ${section.chipBorder}`,
                boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              ✦ MGM Cultural • Exclusive Event ✦
            </Box>

            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '1.9rem', sm: '2.45rem', md: '3rem', lg: '3.35rem' },
                lineHeight: 1.1,
                color: section.heading,
                mb: { xs: 1.25, md: 1.2 },
              }}
            >
              Ten Days of{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #FFD87A 0%, #E8B04A 55%, #C98B2E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Culture
              </Box>
            </Typography>
            <Box
              sx={{
                width: 126,
                height: 2,
                mb: { xs: 1.5, md: 1.8 },
                background: 'linear-gradient(90deg, transparent, rgba(255,216,122,0.95), transparent)',
                position: 'relative',
                '&::before': {
                  content: '"✦"',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -58%)',
                  color: section.goldLight,
                  fontSize: '0.8rem',
                  bgcolor: section.bgSoft,
                  px: 0.75,
                },
              }}
            />

            <Typography
              sx={{
                fontSize: { xs: '0.94rem', md: '1.04rem' },
                color: section.body,
                lineHeight: 1.9,
                maxWidth: 620,
                mb: { xs: 2.2, md: 2.7 },
              }}
            >
              {aboutContent.featuredSummary}
            </Typography>

            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mb: { xs: 2.5, md: 3 } }}>
              {metaChips.map(({ icon: Icon, label }) => (
                <Chip
                  key={label}
                  icon={<Icon sx={{ fontSize: '0.98rem !important', color: `${section.goldLight} !important` }} />}
                  label={label}
                  sx={{
                    bgcolor: section.chipBg,
                    border: `1px solid ${section.chipBorder}`,
                    color: section.heading,
                    fontWeight: 600,
                    fontSize: { xs: '0.72rem', sm: '0.8rem' },
                    height: 'auto',
                    py: 0.6,
                    maxWidth: '100%',
                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.16)',
                    backdropFilter: 'blur(8px)',
                    transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                      borderColor: 'rgba(255,216,122,0.45)',
                      transform: 'translateY(-2px)',
                    },
                    '& .MuiChip-label': { px: 0.75, whiteSpace: 'normal' },
                  }}
                />
              ))}
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Button
                onClick={() => navigate('/event/1')}
                startIcon={<ConfirmationNumberOutlinedIcon />}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  background: 'linear-gradient(180deg, #FFD76A 0%, #D19128 100%)',
                  color: '#180A0F',
                  px: 3,
                  py: { xs: 1.35, md: 1.5 },
                  minHeight: 48,
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  fontWeight: 700,
                  borderRadius: '50px',
                  boxShadow: '0 14px 30px rgba(209, 145, 40, 0.28), 0 0 28px rgba(232,176,74,0.12)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease',
                  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                    color: '#180A0F',
                  },
                  '&:hover': {
                    background: 'linear-gradient(180deg, #FFD76A 0%, #D19128 100%)',
                    filter: 'brightness(1.04)',
                    transform: 'translateY(-2px) scale(1.03)',
                    boxShadow: '0 18px 38px rgba(209, 145, 40, 0.35), 0 0 34px rgba(232,176,74,0.18)',
                  },
                }}
              >
                Book Tickets
              </Button>
              <Button
                component="a"
                href="#past"
                startIcon={<CalendarMonthOutlinedIcon />}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: section.heading,
                  border: `1.5px solid ${section.btnOutline}`,
                  px: 3,
                  py: { xs: 1.35, md: 1.5 },
                  minHeight: 48,
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  fontWeight: 700,
                  borderRadius: '50px',
                  backdropFilter: 'blur(10px)',
                  '& .MuiButton-startIcon': { color: section.goldLight },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,216,122,0.48)',
                    color: section.heading,
                    boxShadow: '0 0 22px rgba(232,176,74,0.12)',
                  },
                }}
              >
                Explore Events
              </Button>
            </Stack>

            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              spacing={1.4}
              sx={{
                mt: 1.6,
                color: 'rgba(255,248,240,0.72)',
                fontSize: { xs: '0.76rem', md: '0.82rem' },
              }}
            >
              {trustPoints.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.65,
                  }}
                >
                  <Box component="span" sx={{ fontSize: '0.9rem' }}>
                    {item.icon}
                  </Box>
                  <Typography component="span" sx={{ fontSize: 'inherit', color: 'inherit' }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 3.5, md: 4.5 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 1.5,
          }}
        >
          {features.map(({ icon: Icon, title, subtitle }) => (
            <Box
              key={title}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.25,
                px: { xs: 1.4, md: 1.6 },
                py: { xs: 1.35, md: 1.55 },
                borderRadius: '18px',
                bgcolor: 'rgba(255,255,255,0.04)',
                border: `1px solid ${section.chipBorder}`,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.16)',
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '12px',
                  border: `1px solid rgba(255,216,122,0.28)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  bgcolor: 'rgba(255,255,255,0.03)',
                }}
              >
                <Icon sx={{ color: section.goldLight, fontSize: '1.1rem' }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: section.heading, fontWeight: 700, fontSize: '0.9rem', mb: 0.2 }}>
                  {title}
                </Typography>
                <Typography sx={{ color: section.body, fontSize: '0.75rem', lineHeight: 1.55 }}>
                  {subtitle}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
