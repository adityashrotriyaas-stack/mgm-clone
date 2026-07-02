import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import { colors, gradients } from '../constants/colors'
import { contactInfo, getWhatsAppUrl } from '../data/contactInfo'
import { RevealBox, SectionHead } from './shared'
import WhatsAppIcon from './WhatsAppIcon'

const infoLines = [
  { icon: CallOutlinedIcon, label: 'Phone', value: contactInfo.phone, href: contactInfo.phoneHref },
  { icon: EmailOutlinedIcon, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: LocationOnOutlinedIcon, label: 'Venue', value: contactInfo.venue },
  { icon: AccessTimeOutlinedIcon, label: 'Event Hours', value: contactInfo.gatesOpen },
]

function InfoRow({ icon: Icon, label, value, href }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          bgcolor: 'rgba(184,134,11,0.08)',
          border: '1px solid rgba(184,134,11,0.14)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ color: colors.gold, fontSize: '1.2rem' }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '1.4px',
            color: colors.muted,
            fontWeight: 600,
            mb: 0.25,
          }}
        >
          {label}
        </Typography>
        {href ? (
          <Link
            href={href}
            sx={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: colors.ivory,
              textDecoration: 'none',
              '&:hover': { color: colors.gold },
            }}
          >
            {value}
          </Link>
        ) : (
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: colors.ivory }}>
            {value}
          </Typography>
        )}
      </Box>
    </Stack>
  )
}

function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const mobile = data.get('mobile')
    const message = data.get('message')

    const text = [
      'Hi MGM Cultural Navratri,',
      '',
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Message: ${message}`,
    ].join('\n')

    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
    event.currentTarget.reset()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'grid',
        gap: 1.5,
        '& .MuiOutlinedInput-root': {
          bgcolor: colors.bg,
          borderRadius: '12px',
          fontSize: '0.9rem',
          '& fieldset': { borderColor: 'rgba(139,107,46,0.16)' },
          '&:hover fieldset': { borderColor: 'rgba(139,107,46,0.32)' },
          '&.Mui-focused fieldset': { borderColor: colors.gold, borderWidth: '1.5px' },
        },
        '& .MuiInputBase-input::placeholder': {
          color: colors.muted,
          opacity: 0.85,
        },
      }}
    >
      <Box sx={{ mb: 0.5 }}>
        <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: colors.ivory }}>
          Send an Enquiry
        </Typography>
        <Typography sx={{ fontSize: '0.84rem', color: colors.muted, mt: 0.5, lineHeight: 1.6 }}>
          Share your details and we&apos;ll connect with you on WhatsApp.
        </Typography>
      </Box>

      <TextField
        required
        name="name"
        placeholder="Full Name"
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><PersonOutlineOutlinedIcon sx={{ color: colors.gold, fontSize: '1.15rem' }} /></InputAdornment>,
          },
        }}
      />
      <TextField
        required
        name="mobile"
        placeholder="Mobile Number"
        type="tel"
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon sx={{ color: colors.gold, fontSize: '1.15rem' }} /></InputAdornment>,
          },
        }}
      />
      <TextField
        required
        name="message"
        placeholder="How can we help you?"
        multiline
        rows={3}
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 0.6 }}><HelpOutlineOutlinedIcon sx={{ color: colors.gold, fontSize: '1.15rem' }} /></InputAdornment>,
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        startIcon={<WhatsAppIcon size={20} />}
        sx={{
          mt: 0.5,
          py: 1.35,
          borderRadius: '12px',
          background: gradients.primary,
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.9rem',
          boxShadow: '0 8px 20px rgba(184,134,11,0.22)',
          '&:hover': {
            background: gradients.primary,
            filter: 'brightness(1.05)',
          },
        }}
      >
        Continue on WhatsApp
      </Button>
    </Box>
  )
}

export default function ContactSection() {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 5, md: 7 },
        bgcolor: colors.bg,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.marigold}06, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 3 } }}>
        <SectionHead
          eyebrow="Contact"
          title="We're Here to Help"
          description="Reach out for passes, venue details, group bookings, or any event support."
        />

        <RevealBox>
          <Box
            sx={{
              maxWidth: 920,
              mx: 'auto',
              bgcolor: colors.bg,
              borderRadius: '24px',
              border: '1px solid rgba(184,134,11,0.12)',
              boxShadow: '0 18px 48px rgba(44,31,16,0.07)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: gradients.primary,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-30%',
                right: '-8%',
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${colors.marigold}08, transparent 70%)`,
                pointerEvents: 'none',
              },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              }}
            >
              <Box sx={{ p: { xs: 2.25, sm: 3, md: 4 } }}>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: { xs: '1.15rem', md: '1.35rem' },
                    fontWeight: 700,
                    color: colors.ivory,
                    mb: 1,
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.88rem',
                    color: colors.muted,
                    lineHeight: 1.75,
                    mb: 3,
                  }}
                >
                  Our team responds quickly during the Navratri season. Use the form or
                  the WhatsApp button for the fastest reply.
                </Typography>

                <Stack spacing={2.25} divider={<Divider sx={{ borderColor: 'rgba(184,134,11,0.1)' }} />}>
                  {infoLines.map((item) => (
                    <InfoRow key={item.label} {...item} />
                  ))}
                </Stack>
              </Box>

              <Box
                sx={{
                  p: { xs: 2.25, sm: 3, md: 4 },
                  bgcolor: colors.heroCream,
                  borderLeft: { md: '1px solid rgba(184,134,11,0.1)' },
                  borderTop: { xs: '1px solid rgba(184,134,11,0.1)', md: 'none' },
                }}
              >
                <ContactForm />
              </Box>
            </Box>
          </Box>
        </RevealBox>
      </Container>
    </Box>
  )
}
