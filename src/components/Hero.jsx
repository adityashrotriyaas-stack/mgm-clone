import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import promoBanner from '../assets/image.png'
import { colors, gradients } from '../constants/colors'
import { heroFeatures } from '../data/siteData'

const featureIcons = {
  calendar: CalendarMonthOutlinedIcon,
  location: LocationOnOutlinedIcon,
  people: GroupsOutlinedIcon,
  food: RestaurantOutlinedIcon,
}

const heroMetaChips = [
  { icon: CalendarMonthOutlinedIcon, label: 'Oct 11 – Oct 20, 2026' },
  { icon: LocationOnOutlinedIcon, label: 'Seasons Hotel, Rajkot' },
  { icon: PaymentsOutlinedIcon, label: 'Garba & Dandiya' },
]

function FeatureItem({ icon, title, subtitle }) {
  const Icon = featureIcons[icon]

  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          bgcolor: 'rgba(184,134,11,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ color: colors.gold, fontSize: '1.35rem' }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.85rem', md: '0.9rem' }, color: colors.ivory, lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: { xs: '0.72rem', md: '0.75rem' }, color: colors.muted, lineHeight: 1.3 }}>
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  return (
    <Box
      component="section"
      id="home"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.heroCream,
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          px: { xs: 2, sm: 2.5, md: 4 },
          py: { xs: 3, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 2.5, sm: 3.5, lg: 5 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ order: { xs: 1, lg: 0 }, minWidth: 0 }}>
            <Box
              sx={{
                bgcolor: '#fff',
                borderRadius: { xs: '16px', md: '20px' },
                p: { xs: 0.75, md: 1.25 },
                boxShadow: '0 20px 50px rgba(44,31,16,0.12)',
                border: '1px solid rgba(184,134,11,0.12)',
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
                  borderRadius: { xs: '12px', md: '14px' },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ order: { xs: 2, lg: 0 }, minWidth: 0 }}>
            <Box
              sx={{
                display: 'inline-block',
                background: gradients.primary,
                color: '#fff',
                fontSize: { xs: '0.62rem', sm: '0.68rem' },
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                px: 1.5,
                py: 0.6,
                borderRadius: '50px',
                mb: { xs: 1.5, md: 2 },
              }}
            >
              MGM Cultural · Exclusive Event
            </Box>

            <Typography
              component="h1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '1.85rem', sm: '2.4rem', md: '3.2rem', lg: '3.6rem' },
                lineHeight: 1.12,
                color: colors.ivory,
                mb: { xs: 1.25, md: 1.5 },
              }}
            >
              Ten Nights of Garba
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '0.9rem', md: '1.02rem' },
                color: colors.muted,
                lineHeight: 1.7,
                maxWidth: 500,
                mb: { xs: 2, md: 2.5 },
              }}
            >
              Devotion. Dance. Dandiya. Experience the joy of Navratri like never before at
              Rajkot&apos;s grand ten-night celebration.
            </Typography>

            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mb: { xs: 2.5, md: 3 } }}>
              {heroMetaChips.map(({ icon: Icon, label }) => (
                <Chip
                  key={label}
                  icon={<Icon sx={{ fontSize: '0.95rem !important', color: `${colors.gold} !important` }} />}
                  label={label}
                  sx={{
                    bgcolor: '#fff',
                    border: '1px solid rgba(184,134,11,0.18)',
                    color: colors.ivory,
                    fontWeight: 600,
                    fontSize: { xs: '0.72rem', sm: '0.8rem' },
                    height: 'auto',
                    py: 0.5,
                    maxWidth: '100%',
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
                  background: gradients.primary,
                  color: '#fff',
                  px: 3,
                  py: { xs: 1.35, md: 1.5 },
                  minHeight: 48,
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  fontWeight: 700,
                  borderRadius: '50px',
                  boxShadow: '0 8px 24px rgba(184,134,11,0.3)',
                  '&:hover': {
                    background: gradients.primary,
                    filter: 'brightness(1.05)',
                  },
                }}
              >
                Book Tickets
              </Button>
              <Button
                component="a"
                href="#upcoming"
                startIcon={<CalendarMonthOutlinedIcon />}
                sx={{
                  bgcolor: '#fff',
                  color: colors.ivory,
                  border: `1.5px solid rgba(184,134,11,0.35)`,
                  px: 3,
                  py: { xs: 1.35, md: 1.5 },
                  minHeight: 48,
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  fontWeight: 700,
                  borderRadius: '50px',
                  '&:hover': {
                    bgcolor: '#fff',
                    borderColor: colors.gold,
                  },
                }}
              >
                Explore Events
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          borderTop: '1px solid rgba(184,134,11,0.15)',
          bgcolor: colors.heroCream,
          py: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 2.5, md: 4 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: { xs: 2, md: 3 },
            }}
          >
            {heroFeatures.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
