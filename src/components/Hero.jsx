import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import heroBanner from '../assets/hero-banner.jpeg'
import { colors } from '../constants/colors'
import bookingWorkflowBg from '../assets/booking-workflow-bg.png'
import { patternNight } from '../constants/navratriTheme'
import { heroFeatures } from '../data/siteData'

const iconMap = {
  calendar: CalendarMonthOutlinedIcon,
  location: LocationOnOutlinedIcon,
  people: GroupsOutlinedIcon,
  food: RestaurantOutlinedIcon,
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function HeroFeatureCard({ icon, title, subtitle, index }) {
  const Icon = iconMap[icon]
  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      sx={{
        opacity: 0,
        animation: `mgm-hero-bar-in 0.7s ${EASE} ${0.35 + index * 0.1}s forwards`,
      }}
    >
      <Box
        sx={{
          width: { xs: 38, sm: 42 },
          height: { xs: 38, sm: 42 },
          borderRadius: '14px',
          bgcolor: 'rgba(42, 14, 0, 0.75)',
          border: '1px solid rgba(255, 179, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 179, 0, 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Icon sx={{ fontSize: { xs: '1.15rem', md: '1.3rem' }, color: colors.gold }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '0.78rem', sm: '0.85rem' },
            color: colors.textLight,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.68rem', sm: '0.72rem' },
            color: 'rgba(255, 245, 230, 0.65)',
            lineHeight: 1.35,
            mt: 0.15,
          }}
        >
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
        backgroundImage: `linear-gradient(180deg, rgba(42,14,0,0.88) 0%, rgba(255,179,0,0.15) 50%, rgba(42,14,0,0.92) 100%), url(${bookingWorkflowBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 1.5, sm: 2, md: 3 },
          pt: { xs: 1, sm: 1.5, md: 2 },
          pb: { xs: 1.5, sm: 2, md: 2.5 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: '20px', md: '28px' },
            overflow: 'hidden',
            border: '1px solid rgba(255, 179, 0, 0.35)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 179, 0, 0.12)',
            bgcolor: colors.nightMid,
            opacity: 0,
            animation: 'mgm-hero-in 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            lineHeight: 0,
            maxWidth: { xs: '100%', lg: '1100px' },
            mx: 'auto',
          }}
        >
          <Box
            component="img"
            src={heroBanner}
            alt="MGM Navratri 2026"
            loading="eager"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(26,10,18,0.04) 0%, rgba(26,10,18,0.12) 50%, rgba(26,10,18,0.55) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: { xs: 1, sm: 1.25, md: 1.5 },
            mt: { xs: 0.5, md: 1.5 },
            px: { xs: 0.5, sm: 0 },
            maxWidth: { xs: '100%', lg: '1100px' },
            mx: 'auto',
          }}
        >
          {heroFeatures.map((item, index) => (
            <HeroFeatureCard key={item.title} {...item} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}
