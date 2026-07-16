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
        bgcolor: 'rgba(42, 14, 0, 0.82)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        px: 2,
        py: 1.25,
        pb: 'calc(12px + env(safe-area-inset-bottom, 0px))',
        display: { xs: 'flex', lg: 'none' },
        gap: 1.25,
        alignItems: 'center',
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.45), 0 0 24px rgba(255, 179, 0, 0.08)',
        borderTop: '1px solid rgba(255, 179, 0, 0.3)',
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
            color: colors.gold,
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
        sx={{
          background: gradients.button,
          color: colors.textLight,
          px: { xs: 2.5, sm: 3 },
          py: 1.35,
          minHeight: 48,
          minWidth: 120,
          fontSize: '0.9rem',
          fontWeight: 700,
          borderRadius: '50px',
          flexShrink: 0,
          boxShadow: '0 8px 20px rgba(234, 90, 0, 0.28)',
          transition: 'transform 0.15s ease, box-shadow 0.2s ease',
          '&:hover': { background: gradients.buttonHover, transform: 'scale(1.03) translateY(-2px)', boxShadow: '0 14px 30px rgba(234, 90, 0, 0.45)' },
          '&:active': { transform: 'scale(0.97)' },
        }}
      >
        Book Now
      </Button>
    </Box>
  )
}
