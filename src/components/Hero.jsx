import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import { colors } from '../constants/colors'
import { heroFeatures } from '../data/siteData'

const featureIcons = {
  calendar: CalendarMonthOutlinedIcon,
  location: LocationOnOutlinedIcon,
  people: GroupsOutlinedIcon,
  food: RestaurantOutlinedIcon,
}

function FeatureItem({ icon, title, subtitle }) {
  const Icon = featureIcons[icon]

  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: { xs: '45%', sm: 200 } }}>
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
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: colors.ivory, lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: colors.muted, lineHeight: 1.3 }}>
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  )
}

export default function Hero() {
  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '88vh' },
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: colors.heroCream,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero-durga.png)',
          backgroundSize: 'cover',
          backgroundPosition: { xs: 'center 20%', md: 'right center' },
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: {
            xs: `linear-gradient(180deg, ${colors.heroCream} 0%, rgba(255,253,245,0.97) 35%, rgba(255,253,245,0.85) 60%, rgba(255,253,245,0.7) 100%)`,
            md: `linear-gradient(90deg, ${colors.heroCream} 0%, rgba(255,253,245,0.98) 28%, rgba(255,253,245,0.88) 42%, rgba(255,253,245,0.45) 58%, rgba(255,253,245,0.15) 72%, transparent 100%)`,
          },
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: { xs: 4, md: 6 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2.5, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: { xs: '100%', md: '52%' } }}>
          <Typography
            sx={{
              fontSize: '0.72rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: colors.gold,
              fontWeight: 600,
              mb: 2,
            }}
          >
            ··· Celebrate Tradition ···
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.2rem', lg: '4.6rem' },
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            <Box component="span" sx={{ color: colors.ivory, display: 'block' }}>
              Nine Nights
            </Box>
            <Box component="span" sx={{ color: colors.gold, display: 'block' }}>
              of Garba
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: colors.muted,
              lineHeight: 1.65,
              maxWidth: 480,
              mb: 3.5,
            }}
          >
            Devotion. Dance. Dandiya. Experience the joy of Navratri like never before.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Button
              component="a"
              href="#register"
              startIcon={<ConfirmationNumberOutlinedIcon />}
              sx={{
                bgcolor: colors.gold,
                color: '#fff',
                px: 3,
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '50px',
                boxShadow: '0 8px 24px rgba(184,134,11,0.35)',
                '&:hover': {
                  bgcolor: colors.marigold,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Get Your Pass
            </Button>
            <Button
              component="a"
              href="#upcoming"
              startIcon={<CalendarMonthOutlinedIcon />}
              sx={{
                bgcolor: '#fff',
                color: colors.ivory,
                border: `1.5px solid ${colors.gold}`,
                px: 3,
                py: 1.5,
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '50px',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  borderColor: colors.marigold,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Explore Events
            </Button>
          </Stack>
        </Box>
      </Container>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(184,134,11,0.15)',
          bgcolor: 'rgba(255,253,248,0.85)',
          backdropFilter: 'blur(8px)',
          py: { xs: 2.5, md: 3 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4 } }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            spacing={{ xs: 2.5, md: 4 }}
            justifyContent={{ xs: 'flex-start', md: 'space-between' }}
            sx={{ rowGap: 2.5 }}
          >
            {heroFeatures.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
