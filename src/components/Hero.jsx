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
          borderRadius: '12px',
          bgcolor: 'rgba(26, 26, 26, 0.85)',
          border: '1px solid rgba(192, 29, 22, 0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Icon sx={{ fontSize: { xs: '1.15rem', md: '1.3rem' }, color: '#E05040' }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '0.78rem', sm: '0.85rem' },
            color: '#F5EDE5',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.68rem', sm: '0.72rem' },
            color: 'rgba(255, 255, 255, 0.72)',
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
        bgcolor: colors.night,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: patternNight,
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 2.5, md: 4 },
          pt: { xs: 1.5, sm: 2, md: 2.5 },
          pb: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: '20px', md: '28px' },
            overflow: 'hidden',
            border: '1px solid rgba(232, 184, 74, 0.22)',
            boxShadow: '0 24px 60px rgba(26, 10, 18, 0.45)',
            aspectRatio: { xs: '16 / 9', sm: '16 / 10', lg: '16 / 7.4' },
            bgcolor: colors.nightMid,
            opacity: 0,
            animation: 'mgm-hero-in 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          <Box
            component="img"
            src={heroBanner}
            alt="MGM Navratri 2026"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              bgcolor: colors.nightMid,
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
            gap: { xs: 1.25, sm: 1.5, md: 2 },
            mt: { xs: 0, md: 2 },
            px: { xs: 0.5, sm: 0 },
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
