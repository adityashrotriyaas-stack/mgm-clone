import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { patternDiya, patternGarland, patternMandala } from '../constants/navratriTheme'
import { getWhatsAppUrl } from '../data/contactInfo'

const section = {
  bg: '#1A0800',
  bgSoft: '#3A1C00',
  chipBorder: 'rgba(255,179,0,.25)',
}

export default function UpcomingNights() {
  return (
  <Box
    component="section"
    id="featured-event"
    sx={{
      position: 'relative',
      py: { xs: 5, md: 7 },
      bgcolor: section.bg,
      backgroundImage: `
          radial-gradient(circle at 72% 34%, rgba(255,179,0,0.16), transparent 24%),
          radial-gradient(circle at 24% 72%, rgba(234,90,0,0.14), transparent 22%),
          linear-gradient(180deg, ${section.bg} 0%, ${section.bgSoft} 100%),
          ${patternDiya},
          ${patternMandala},
          ${patternGarland}
        `,
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background:
          'repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0 1px, transparent 1px 28px)',
        opacity: 0.35,
        pointerEvents: 'none',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 44%, rgba(0,0,0,0.36) 100%)',
        pointerEvents: 'none',
      },
    }}
  >
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        top: 24,
        left: 24,
        width: 140,
        height: 140,
        opacity: 0.1,
        borderRadius: '50%',
        border: `1px solid ${section.chipBorder}`,
        backgroundImage: patternMandala,
        pointerEvents: 'none',
        animation: 'mgm-float-slow 8s ease-in-out infinite',
      }}
    />
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        top: 24,
        right: 24,
        width: 140,
        height: 140,
        opacity: 0.1,
        borderRadius: '50%',
        border: `1px solid ${section.chipBorder}`,
        backgroundImage: patternMandala,
        pointerEvents: 'none',
        animation: 'mgm-float-slow 9s ease-in-out infinite reverse',
      }}
    />
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        width: 120,
        height: 120,
        opacity: 0.08,
        borderRadius: '50%',
        border: `1px solid ${section.chipBorder}`,
        backgroundImage: patternMandala,
        pointerEvents: 'none',
        animation: 'mgm-float 7s ease-in-out infinite',
      }}
    />
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 120,
        height: 120,
        opacity: 0.08,
        borderRadius: '50%',
        border: `1px solid ${section.chipBorder}`,
        backgroundImage: patternMandala,
        pointerEvents: 'none',
        animation: 'mgm-float 6.5s ease-in-out infinite reverse',
      }}
    />
    <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 2.5, md: 4 } }}>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          onClick={() => window.open(getWhatsAppUrl(), '_blank')}
          sx={{
            background: 'linear-gradient(135deg, #FFB300 0%, #EA5A00 50%, #C04E00 100%)',
            color: '#3A1C00',
            px: { xs: 3, md: 3 },
            py: { xs: 1.2, md: 1 },
            borderRadius: '999px',
            fontWeight: 800,
            fontSize: { xs: '0.86rem', md: '0.92rem' },
            textTransform: 'none',
            letterSpacing: '0.15px',
            boxShadow: '0 10px 26px rgba(255, 179, 0, 0.32)',
            '& .MuiButton-startIcon': { mr: 0.7 },
            '& .MuiButton-endIcon': { ml: 0.7 },
          }}
          startIcon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
          endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '1rem !important' }} />}
        >
          Enquire Now
        </Button>
      </Box>
    </Container>
  </Box>
)
}
