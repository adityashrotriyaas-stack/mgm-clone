import Box from '@mui/material/Box'
import { colors, gradients } from '../constants/colors'

export default function LoadingScreen({ minHeight = '100vh' }) {
  return (
    <Box sx={{ minHeight, bgcolor: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
      <Box sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '3px solid rgba(255,179,0,0.15)',
        borderTopColor: colors.gold,
        animation: 'mgm-spin 0.8s linear infinite',
        '@keyframes mgm-spin': { to: { transform: 'rotate(360deg)' } },
      }} />
      <Box sx={{ width: 120, height: 10, borderRadius: 4, background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`, backgroundSize: '200% 100%', animation: 'mgm-shimmer 1.5s ease-in-out infinite' }} />
    </Box>
  )
}
