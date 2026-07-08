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
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined'
import promoBanner from '../assets/image.png'
import { gradients } from '../constants/colors'

const section = {
  bg: '#FAF9F6',
  heading: '#2D1B10',
  body: '#6D5D54',
  chipBg: '#FFFCF8',
  chipBorder: 'rgba(139, 107, 78, 0.28)',
  cardBorder: 'rgba(255, 255, 255, 0.9)',
  frameShadow: '0 18px 44px rgba(45, 27, 16, 0.1)',
  btnOutline: 'rgba(109, 93, 84, 0.35)',
}

const metaChips = [
  { icon: CalendarMonthOutlinedIcon, label: 'Oct 11 – Oct 20, 2026' },
  { icon: LocationOnOutlinedIcon, label: 'Seasons Hotel, Rajkot' },
  { icon: TheaterComedyOutlinedIcon, label: 'Garba & Dandiya' },
]

export default function UpcomingNights() {
  const navigate = useNavigate()

  return (
    <Box
      component="section"
      id="featured-event"
      sx={{
        py: { xs: 4.5, md: 6.5 },
        bgcolor: section.bg,
        backgroundImage: `
          repeating-linear-gradient(90deg, rgba(45, 27, 16, 0.025) 0 1px, transparent 1px 44px),
          repeating-linear-gradient(0deg, rgba(45, 27, 16, 0.02) 0 1px, transparent 1px 44px)
        `,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 2.5, md: 4 } }}>
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
                bgcolor: '#FFFFFF',
                borderRadius: { xs: '18px', md: '22px' },
                p: { xs: 0.75, md: 1 },
                border: `1px solid ${section.cardBorder}`,
                boxShadow: section.frameShadow,
              }}
            >
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
                background: gradients.primary,
                color: section.heading,
                fontSize: { xs: '0.62rem', sm: '0.68rem' },
                fontWeight: 700,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                px: 1.5,
                py: 0.6,
                borderRadius: '50px',
                mb: { xs: 1.5, md: 2 },
                boxShadow: '0 6px 16px rgba(201, 139, 46, 0.22)',
              }}
            >
              MGM Cultural · Exclusive Event
            </Box>

            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '1.9rem', sm: '2.45rem', md: '3rem', lg: '3.35rem' },
                lineHeight: 1.1,
                color: section.heading,
                mb: { xs: 1.25, md: 1.5 },
              }}
            >
              Ten Nights of Garba
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '0.9rem', md: '1.02rem' },
                color: section.body,
                lineHeight: 1.75,
                maxWidth: 520,
                mb: { xs: 2, md: 2.5 },
              }}
            >
              Devotion. Dance. Dandiya. Experience the joy of Navratri like never before at
              Rajkot&apos;s grand ten-night celebration.
            </Typography>

            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mb: { xs: 2.5, md: 3 } }}>
              {metaChips.map(({ icon: Icon, label }) => (
                <Chip
                  key={label}
                  icon={<Icon sx={{ fontSize: '0.95rem !important', color: `${section.heading} !important` }} />}
                  label={label}
                  sx={{
                    bgcolor: section.chipBg,
                    border: `1px solid ${section.chipBorder}`,
                    color: section.heading,
                    fontWeight: 600,
                    fontSize: { xs: '0.72rem', sm: '0.8rem' },
                    height: 'auto',
                    py: 0.5,
                    maxWidth: '100%',
                    boxShadow: '0 2px 8px rgba(45, 27, 16, 0.04)',
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
                sx={{
                  background: 'linear-gradient(135deg, #C98B2E, #A0522D)',
                  color: '#FFFFFF',
                  px: 3,
                  py: { xs: 1.35, md: 1.5 },
                  minHeight: 48,
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  fontWeight: 700,
                  borderRadius: '50px',
                  boxShadow: '0 10px 24px rgba(160, 82, 45, 0.28)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D49A3A, #B05E32)',
                    filter: 'brightness(1.03)',
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
                  bgcolor: '#FFFFFF',
                  color: section.heading,
                  border: `1.5px solid ${section.btnOutline}`,
                  px: 3,
                  py: { xs: 1.35, md: 1.5 },
                  minHeight: 48,
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  fontWeight: 700,
                  borderRadius: '50px',
                  '&:hover': {
                    bgcolor: '#FFFFFF',
                    borderColor: '#C98B2E',
                    color: section.heading,
                  },
                }}
              >
                Explore Events
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
