import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { colors, gradients } from '../constants/colors'
import { usePageMeta } from '../hooks/usePageMeta'

export default function PrivacyPolicy() {
  const navigate = useNavigate()
  usePageMeta('Privacy Policy', 'How MGM Cultural Navratri collects, uses, and protects your personal information when you book passes and attend our events.')

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
          Privacy Policy
        </Typography>
        <Typography sx={{ color: colors.muted, fontSize: '0.9rem', mb: 4 }}>Last updated: October 2026</Typography>

        <Box>
          <Typography component="h3" sx={{ color: colors.textLight, fontWeight: 700, fontSize: '1.1rem', mt: 3, mb: 1 }}>Information We Collect</Typography>
          <Typography sx={{ color: colors.muted, fontSize: '0.92rem', lineHeight: 1.7, mb: 1.5 }}>We collect personal information you provide during registration, including name, mobile number, email address, and a photograph for pass verification. We also collect Aadhaar number solely for government-mandated verification at event entry.</Typography>

          <Typography component="h3" sx={{ color: colors.textLight, fontWeight: 700, fontSize: '1.1rem', mt: 3, mb: 1 }}>How We Use Your Information</Typography>
          <Typography sx={{ color: colors.muted, fontSize: '0.92rem', lineHeight: 1.7, mb: 1.5 }}>Your information is used to process bookings, generate QR passes, communicate event updates, and comply with legal verification requirements at venue entry. We do not sell or share your data with third parties for marketing purposes.</Typography>

          <Typography component="h3" sx={{ color: colors.textLight, fontWeight: 700, fontSize: '1.1rem', mt: 3, mb: 1 }}>Data Security</Typography>
          <Typography sx={{ color: colors.muted, fontSize: '0.92rem', lineHeight: 1.7, mb: 1.5 }}>We implement reasonable security measures to protect your personal data. Payment transactions are processed through secure, PCI-compliant gateways. We do not store full payment card details on our servers.</Typography>

          <Typography component="h3" sx={{ color: colors.textLight, fontWeight: 700, fontSize: '1.1rem', mt: 3, mb: 1 }}>Data Retention</Typography>
          <Typography sx={{ color: colors.muted, fontSize: '0.92rem', lineHeight: 1.7, mb: 1.5 }}>Your personal data is retained for the duration of the event season and up to 6 months after for audit and compliance purposes. After this period, data is securely deleted or anonymized.</Typography>

          <Typography component="h3" sx={{ color: colors.textLight, fontWeight: 700, fontSize: '1.1rem', mt: 3, mb: 1 }}>Contact</Typography>
          <Typography sx={{ color: colors.muted, fontSize: '0.92rem', lineHeight: 1.7, mb: 1.5 }}>For privacy-related inquiries, contact us at mgmculturalnavratri23@gmail.com or call +91 89800 09014.</Typography>
        </Box>
      </Container>
    </Box>
  )
}
