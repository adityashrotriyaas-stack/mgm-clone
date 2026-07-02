import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { colors, gradients } from '../constants/colors'
import { upcomingEvents } from '../data/siteData'

const featuredEvent = upcomingEvents[0]

function cleanLabel(value = '') {
  return value.replace(/^[^\w]+/u, '').trim()
}

export default function StickyCTA() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        bgcolor: 'rgba(255,247,230,0.96)',
        backdropFilter: 'blur(12px)',
        px: 2,
        py: 1.25,
        pb: 'calc(12px + env(safe-area-inset-bottom, 0px))',
        display: { xs: 'flex', lg: 'none' },
        gap: 1.25,
        alignItems: 'center',
        boxShadow: '0 -4px 20px rgba(44,31,16,0.12)',
        borderTop: '1px solid rgba(184,134,11,0.15)',
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0, pr: 1 }}>
        <Typography
          sx={{
            color: colors.ivory,
            fontSize: { xs: '0.72rem', sm: '0.75rem' },
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            mb: 0.25,
          }}
        >
          Upcoming Event
        </Typography>
        <Typography
          sx={{
            color: colors.marigoldSoft,
            fontSize: { xs: '0.98rem', sm: '1.05rem' },
            fontWeight: 800,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {featuredEvent.title}
        </Typography>
        <Typography
          component="small"
          sx={{
            display: 'block',
            fontSize: '0.68rem',
            color: colors.muted,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mt: 0.25,
          }}
        >
          {featuredEvent.night} · {cleanLabel(featuredEvent.date)} · {cleanLabel(featuredEvent.time)}
        </Typography>
      </Box>
      <Button
        onClick={() => navigate(`/event/${featuredEvent.id}`)}
        sx={{
          background: gradients.primary,
          color: colors.bg,
          px: { xs: 2.5, sm: 3 },
          py: 1.35,
          minHeight: 48,
          minWidth: 120,
          fontSize: '0.9rem',
          fontWeight: 700,
          borderRadius: '50px',
          flexShrink: 0,
          boxShadow: '0 8px 20px rgba(184,134,11,0.28)',
          '&:hover': { background: gradients.primary, filter: 'brightness(1.05)' },
        }}
      >
        Book Now
      </Button>
    </Box>
  )
}
