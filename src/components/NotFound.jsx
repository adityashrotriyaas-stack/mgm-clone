import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { usePageMeta } from '../hooks/usePageMeta'
import { colors, gradients } from '../constants/colors'

export default function NotFound() {
  const navigate = useNavigate()
  usePageMeta('Page Not Found', 'The page you are looking for does not exist.')
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: { xs: '5rem', md: '7rem' }, fontWeight: 800, background: gradients.heroText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, mb: 1 }}>404</Typography>
        <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 700, color: colors.ivory, mb: 1 }}>Page Not Found</Typography>
        <Typography sx={{ color: colors.muted, fontSize: '0.9rem', mb: 3, maxWidth: 360, mx: 'auto' }}>The page you're looking for doesn't exist or has been moved. Let's get you back to the Garba.</Typography>
        <Button onClick={() => navigate('/')} startIcon={<ArrowBackRoundedIcon />} sx={{ px: 4, py: 1.4, borderRadius: '50px', background: gradients.primary, color: '#F0E8E0', fontWeight: 700, '&:hover': { background: gradients.primaryReversed } }}>Back to Home</Button>
      </Container>
    </Box>
  )
}