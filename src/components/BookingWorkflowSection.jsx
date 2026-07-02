import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { colors, gradients } from '../constants/colors'
import { RevealBox, SectionHead } from './shared'

const workflowSteps = [
  { step: 1, title: 'Book Now', description: 'Click Book Now to start your booking.' },
  { step: 2, title: 'Select Pass Type', description: 'Choose Season Pass or Daily Pass.' },
  { step: 3, title: 'Choose Category', description: 'Select Male, Female, or Couple.' },
  { step: 4, title: 'Fill Registration', description: 'Enter details and upload selfie + Aadhaar.' },
  { step: 5, title: 'Complete Payment', description: 'Pay securely via UPI, card, or wallet.' },
  { step: 6, title: 'Receive QR Pass', description: 'Get your QR pass on WhatsApp, email & download.' },
]

export default function BookingWorkflowSection() {
  const navigate = useNavigate()

  return (
    <Box component="section" id="register" sx={{ py: { xs: 5, md: 7 }, bgcolor: colors.bg }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 3 } }}>
        <SectionHead
          eyebrow="Booking Flow"
          title="Ticket Booking & QR Pass Workflow"
          description="Follow these simple steps to book your pass and receive your QR entry pass instantly."
        />

        <RevealBox
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 2,
            mb: 3,
          }}
        >
          {workflowSteps.map((item) => (
            <Box
              key={item.step}
              sx={{
                bgcolor: colors.bgSoft,
                border: '1px solid rgba(184,134,11,0.14)',
                borderRadius: '18px',
                p: { xs: 2, md: 2.25 },
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: gradients.primary,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  mb: 1.25,
                }}
              >
                {item.step}
              </Box>
              <Typography sx={{ fontWeight: 700, color: colors.ivory, mb: 0.75 }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', color: colors.muted, lineHeight: 1.6 }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </RevealBox>

        <Stack alignItems="center">
          <Button
            onClick={() => navigate('/event/1')}
            sx={{
              px: { xs: 3, sm: 4 },
              py: 1.5,
              minHeight: 48,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: 360,
              borderRadius: '50px',
              background: gradients.primary,
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 10px 24px rgba(184,134,11,0.28)',
              '&:hover': { background: gradients.primary, filter: 'brightness(1.05)' },
            }}
          >
            Start Booking Now
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
