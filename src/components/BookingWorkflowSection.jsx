import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { colors, gradients } from '../constants/colors'
import { SectionHead } from './shared'

const workflowSteps = [
  { step: 1, title: 'Book Now', description: 'Click Book Now to start your booking.', icon: ShoppingCartOutlinedIcon },
  { step: 2, title: 'Select Pass Type', description: 'Choose Season Pass or Daily Pass.', icon: ConfirmationNumberOutlinedIcon },
  { step: 3, title: 'Choose Category', description: 'Select Male, Female, or Couple.', icon: GroupOutlinedIcon },
  { step: 4, title: 'Fill Registration', description: 'Enter details and upload pass photo + Aadhaar.', icon: BadgeOutlinedIcon },
  { step: 5, title: 'Complete Payment', description: 'Pay securely via UPI, card, or wallet.', icon: PaymentsOutlinedIcon },
  { step: 6, title: 'Receive QR Pass', description: 'Get your QR pass on WhatsApp, email & download.', icon: QrCodeScannerOutlinedIcon },
]

function FlowStep({ item, index }) {
  const Icon = item.icon
  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: '14px', background: gradients.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, boxShadow: '0 4px 12px rgba(184,134,11,0.20)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '@media (hover: hover)': { '&:hover': { transform: 'scale(1.1)', boxShadow: '0 8px 20px rgba(184,134,11,0.30)' } } }}>
          <Icon sx={{ fontSize: '1.15rem' }} />
        </Box>
        {index < workflowSteps.length - 1 && (
          <Box sx={{ width: '2px', flex: 1, minHeight: { xs: 20, md: 28 }, background: `linear-gradient(180deg, ${colors.glassBorder} 0%, rgba(184,134,11,0.06) 100%)`, my: 0.5 }} />
        )}
      </Box>
      <Box sx={{ pt: 0.5, flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 0.35 }}>
          <Typography sx={{ fontSize: '0.62rem', fontWeight: 800, color: colors.gold, letterSpacing: '0.5px' }}>STEP {item.step}</Typography>
          <ArrowForwardRoundedIcon sx={{ fontSize: '0.7rem', color: colors.glassBorder }} />
        </Box>
        <Typography sx={{ fontWeight: 700, color: colors.ivory, fontSize: '0.95rem', mb: 0.35 }}>{item.title}</Typography>
        <Typography sx={{ fontSize: '0.82rem', color: colors.muted, lineHeight: 1.6 }}>{item.description}</Typography>
      </Box>
    </Box>
  )
}

export default function BookingWorkflowSection() {
  const navigate = useNavigate()
  return (
    <Box component="section" id="register" sx={{ py: { xs: 5, md: 7 }, background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSoft} 100%)`, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: '50%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)', transform: 'translate(-50%, -30%)', pointerEvents: 'none' } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 3 }, position: 'relative', zIndex: 1 }}>
        <SectionHead eyebrow="Booking Flow" title="Ticket Booking & QR Pass Workflow" description="Follow these simple steps to book your pass and receive your QR entry pass instantly." />
        <Box sx={{ maxWidth: 720, mx: 'auto', bgcolor: colors.bg, borderRadius: '24px', border: '1px solid rgba(184,134,11,0.08)', p: { xs: 2.5, sm: 3, md: 4 }, boxShadow: '0 8px 24px rgba(44,31,16,0.04)', mb: 3 }}>
          {workflowSteps.map((item, index) => (
            <FlowStep key={item.step} item={item} index={index} />
          ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={() => navigate('/event/1')} endIcon={<ArrowForwardRoundedIcon />} sx={{
            display: 'inline-flex', px: { xs: 4, sm: 5 }, py: 1.5, minHeight: 48, borderRadius: '50px', background: gradients.primary, color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.3px',
            boxShadow: '0 10px 24px rgba(184,134,11,0.28)', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-2px)', boxShadow: '0 14px 32px rgba(184,134,11,0.35)' },
          }}>
            Start Booking Now
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
