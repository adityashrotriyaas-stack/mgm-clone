import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import heroVideo from '../assets/navratri video.mp4'
import { colors } from '../constants/colors'
import { patternNight } from '../constants/navratriTheme'
import { heroFeatures } from '../data/siteData'

const heroVideoSrc = heroVideo

const iconMap = {
  calendar: CalendarMonthOutlinedIcon,
  location: LocationOnOutlinedIcon,
  people: GroupsOutlinedIcon,
  food: RestaurantOutlinedIcon,
}

const barTheme = {
  bg: 'rgba(30, 18, 16, 0.72)',
  iconBg: 'rgba(53, 36, 24, 0.85)',
  title: '#FFF5E6',
  subtitle: 'rgba(255, 235, 210, 0.72)',
  icon: '#E8B84A',
  border: 'rgba(232, 184, 74, 0.22)',
}

function HeroFeatureBar() {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        px: { xs: 1.25, sm: 2, md: 3 },
        py: { xs: 1.15, sm: 1.35, md: 1.6 },
        bgcolor: barTheme.bg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: `1px solid ${barTheme.border}`,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: { xs: 1.25, sm: 1.5, md: 2 },
        }}
      >
        {heroFeatures.map(({ icon, title, subtitle }) => {
          const Icon = iconMap[icon]

          return (
            <Stack key={title} direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  width: { xs: 38, sm: 42, md: 46 },
                  height: { xs: 38, sm: 42, md: 46 },
                  borderRadius: '12px',
                  bgcolor: barTheme.iconBg,
                  border: `1px solid ${barTheme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Icon sx={{ fontSize: { xs: '1.15rem', md: '1.3rem' }, color: barTheme.icon }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '0.78rem', sm: '0.85rem', md: '0.92rem' },
                    color: barTheme.title,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.68rem', sm: '0.72rem', md: '0.78rem' },
                    color: barTheme.subtitle,
                    lineHeight: 1.35,
                    mt: 0.15,
                  }}
                >
                  {subtitle}
                </Typography>
              </Box>
            </Stack>
          )
        })}
      </Box>
    </Box>
  )
}

export default function Hero() {
  const videoRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const frame = frameRef.current
    if (!video || !frame) return undefined

    const tryPlay = () => {
      video.play().catch(() => {})
    }

    // Start video immediately on first load
    tryPlay()
    video.addEventListener('loadeddata', tryPlay)
    video.addEventListener('canplay', tryPlay)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay()
        } else {
          video.pause()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(frame)

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause()
        return
      }
      const rect = frame.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (inView) {
        tryPlay()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      observer.disconnect()
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

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
          ref={frameRef}
          sx={{
            position: 'relative',
            borderRadius: { xs: '20px', md: '28px' },
            overflow: 'hidden',
            border: '1px solid rgba(232, 184, 74, 0.22)',
            boxShadow: '0 24px 60px rgba(26, 10, 18, 0.45)',
            aspectRatio: { xs: '9 / 14', sm: '16 / 10', lg: '16 / 7.4' },
            bgcolor: colors.nightMid,
          }}
        >
          <Box
            ref={videoRef}
            component="video"
            src={heroVideoSrc}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              backgroundColor: colors.nightMid,
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
          <HeroFeatureBar />
        </Box>
      </Container>
    </Box>
  )
}
