import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { colors, gradients } from '../constants/colors'

export default function StickyCTA() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        bgcolor: 'rgba(255,247,230,0.94)',
        backdropFilter: 'blur(12px)',
        px: 2.25,
        py: 1.5,
        display: { xs: 'flex', lg: 'none' },
        gap: 1.25,
        alignItems: 'center',
        boxShadow: '0 -6px 22px rgba(0,0,0,0.4)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ color: colors.marigoldSoft, fontSize: '1.05rem', fontWeight: 800 }}>
          ₹499
        </Typography>
        <Typography component="small" sx={{ display: 'block', fontSize: '0.66rem', color: colors.muted }}>
          Tonight · Rangeeli Raat
        </Typography>
      </Box>
      <Button
        component="a"
        href="#register"
        sx={{
          background: gradients.primary,
          color: colors.bg,
          px: 3,
          py: 1.6,
          boxShadow: '0 10px 28px rgba(255,94,126,0.32)',
          '&:hover': { background: gradients.primary },
        }}
      >
        Book Now
      </Button>
    </Box>
  )
}
