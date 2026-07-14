import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { colors, gradients } from '../constants/colors'

export default function RefundPolicy() {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.bg, py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ color: colors.gold, mb: 3, textTransform: 'none', fontWeight: 600, '&:hover': { color: colors.textLight } }}
        >
          Back
        </Button>
        <Typography
          sx={{ fontFamily: '"Playfair Display", serif', fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, color: colors.textLight, mb: 1 }}
        >
          Refund Policy
        </Typography>
        <Typography sx={{ color: colors.muted, fontSize: '0.9rem', mb: 4 }}>Last updated: October 2026</Typography>

        <Box sx={{ '& h3': { color: colors.textLight, fontWeight: 700, fontSize: '1.1rem', mt: 3, mb: 1 }, '& p': { color: colors.muted, fontSize: '0.92rem', lineHeight: 1.7, mb: 1.5 } }}>
          <h3>Cancellation & Refunds</h3>
          <p>All ticket sales are final unless the event is cancelled by the organizer. If MGM Cultural Navratri cancels any night or the entire event, a full refund will be processed to the original payment method within 7-10 business days.</p>

          <h3>No Refund Policy</h3>
          <p>We do not offer refunds for change of plans, late arrival, or inability to attend. Passes are non-transferable unless explicitly stated. Please ensure you select the correct date and pass type before completing your purchase.</p>

          <h3>Duplicate Purchases</h3>
          <p>In case of accidental duplicate purchases, contact us within 24 hours at mgmculturalnavratri23@gmail.com with your order details. Refunds for duplicates are processed at our discretion.</p>

          <h3>Event Changes</h3>
          <p>The organizer reserves the right to modify artist line-ups, event timings, or venue layouts without prior notice. Such changes do not qualify for refunds.</p>

          <h3>Contact</h3>
          <p>For refund-related inquiries, reach us at mgmculturalnavratri23@gmail.com or call +91 89800 09014.</p>
        </Box>
      </Container>
    </Box>
  )
}
