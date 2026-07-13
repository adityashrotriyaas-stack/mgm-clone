import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import { colors } from '../constants/colors'
import { contactInfo, getWhatsAppUrl } from '../data/contactInfo'
import { RevealBox } from './shared'
import FestiveSection from './FestiveSection'
import WhatsAppIcon from './WhatsAppIcon'
import MobileNumberField from './MobileNumberField'
import helpBg from '../assets/help-bg.png'

const infoLines = [
  { icon: CallOutlinedIcon, label: 'Phone', value: contactInfo.phone, href: contactInfo.phoneHref },
  { icon: CallOutlinedIcon, label: 'Phone 2', value: contactInfo.phone2, href: contactInfo.phone2Href },
  { icon: EmailOutlinedIcon, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: LocationOnOutlinedIcon, label: 'Venue', value: contactInfo.venue },
]

const ornateCardSx = {
  position: 'relative',
  p: { xs: 2.5, md: 3.25 },
  borderRadius: '20px',
  background: 'linear-gradient(180deg, rgba(42, 18, 22, 0.82) 0%, rgba(22, 9, 14, 0.9) 100%)',
  border: '1px solid rgba(255, 179, 0, 0.55)',
  boxShadow: '0 0 0 1px rgba(255, 179, 0,0.08), 0 16px 40px rgba(0,0,0,0.32), 0 0 28px rgba(255, 179, 0,0.12)',
  backdropFilter: 'blur(8px)',
  overflow: 'hidden',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: 18,
    height: 18,
    borderColor: 'rgba(234, 90, 0, 0.75)',
    borderStyle: 'solid',
    pointerEvents: 'none',
  },
  '&::before': {
    top: 10,
    left: 10,
    borderWidth: '1.5px 0 0 1.5px',
    borderTopLeftRadius: 4,
  },
  '&::after': {
    top: 10,
    right: 10,
    borderWidth: '1.5px 1.5px 0 0',
    borderTopRightRadius: 4,
  },
}

function StarIconFrame({ children, size = 42 }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.gold,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(255, 179, 0, 0.7)',
          borderRadius: '10px',
          transform: 'rotate(45deg)',
          boxShadow: '0 0 12px rgba(255, 179, 0,0.15)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 4,
          border: '1px solid rgba(255, 179, 0, 0.28)',
          borderRadius: '8px',
          transform: 'rotate(45deg)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </Box>
    </Box>
  )
}

function LotusDivider({ maxWidth = 220 }) {
  return (
    <Box
      aria-hidden
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        maxWidth,
        width: '100%',
        mx: 'auto',
        color: colors.gold,
        my: 1.25,
      }}
    >
      <Box sx={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${colors.gold})` }} />
      <Box sx={{ fontSize: '0.5rem', lineHeight: 1, opacity: 0.85 }}>◈</Box>
      <Box sx={{ fontSize: '1.05rem', lineHeight: 1 }}>❀</Box>
      <Box sx={{ fontSize: '0.5rem', lineHeight: 1, opacity: 0.85 }}>◈</Box>
      <Box sx={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${colors.gold}, transparent)` }} />
    </Box>
  )
}

function InfoRow({ icon: Icon, label, value, href, showDivider }) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.75} sx={{ py: 1.35 }}>
        <StarIconFrame size={40}>
          <Icon sx={{ fontSize: '1.05rem' }} />
        </StarIconFrame>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: '0.66rem',
              textTransform: 'uppercase',
              letterSpacing: '1.6px',
              color: colors.gold,
              fontWeight: 700,
              mb: 0.3,
            }}
          >
            {label}
          </Typography>
          {href ? (
            <Link
              href={href}
              sx={{
                fontSize: { xs: '0.95rem', md: '1.02rem' },
                fontWeight: 600,
                color: '#FFF8EE',
                textDecoration: 'none',
                '&:hover': { color: colors.gold },
              }}
            >
              {value}
            </Link>
          ) : (
            <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.02rem' }, fontWeight: 600, color: '#FFF8EE' }}>
              {value}
            </Typography>
          )}
        </Box>
      </Stack>
      {showDivider && (
        <Box
          aria-hidden
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            color: 'rgba(255, 179, 0,0.55)',
          }}
        >
          <Box sx={{ flex: 1, borderTop: '1px dotted rgba(255, 179, 0,0.45)' }} />
          <Box sx={{ fontSize: '0.4rem', lineHeight: 1 }}>◆</Box>
          <Box sx={{ flex: 1, borderTop: '1px dotted rgba(255, 179, 0,0.45)' }} />
        </Box>
      )}
    </Box>
  )
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(28, 12, 16, 0.72)',
    color: '#FFF8EE',
    borderRadius: '14px',
    '& fieldset': {
      borderColor: 'rgba(255, 179, 0, 0.35)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 179, 0, 0.55)',
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.gold,
      borderWidth: '1.5px',
      boxShadow: '0 0 14px rgba(255, 179, 0,0.18)',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255, 248, 240, 0.52)',
    opacity: 1,
  },
  '& .MuiInputAdornment-root': {
    color: colors.gold,
  },
}

function ContactForm() {
  const [mobile, setMobile] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const mobileValue = data.get('mobile')
    const message = data.get('message')

    const text = [
      'Hi MGM Cultural Navratri,',
      '',
      `Name: ${name}`,
      `Mobile: +91 ${mobileValue}`,
      `Message: ${message}`,
    ].join('\n')

    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
    event.currentTarget.reset()
    setMobile('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 1.5, ...fieldSx }}>
      <Box sx={{ mb: 0.35 }}>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.35rem', md: '1.55rem' },
            fontWeight: 700,
            color: colors.gold,
            mb: 0.6,
          }}
        >
          Send an Enquiry
        </Typography>
        <Typography sx={{ fontSize: '0.86rem', color: 'rgba(255,245,230,0.78)', lineHeight: 1.6 }}>
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
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineRoundedIcon sx={{ fontSize: '1.15rem', color: colors.gold }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <MobileNumberField
        name="mobile"
        value={mobile}
        onChange={(event) => setMobile(event.target.value)}
        sx={{
          ...fieldSx,
          '& .MuiTypography-root': { color: `${colors.gold} !important` },
          '& .MuiDivider-root': { borderColor: 'rgba(255, 179, 0,0.4) !important' },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" disablePointerEvents sx={{ mr: 1.1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneOutlinedIcon sx={{ fontSize: '1.05rem', color: colors.gold }} />
                  <Typography sx={{ fontWeight: 700, color: colors.gold, fontSize: '0.9rem' }}>+91</Typography>
                  <Box sx={{ width: 1, height: 18, bgcolor: 'rgba(255, 179, 0,0.4)' }} />
                </Stack>
              </InputAdornment>
            ),
          },
          htmlInput: {
            inputMode: 'numeric',
            maxLength: 10,
          },
        }}
      />

      <TextField
        required
        name="message"
        placeholder="How can we help you?"
        multiline
        rows={3.2}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.25 }}>
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: '1.1rem', color: colors.gold }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        startIcon={<WhatsAppIcon size={18} />}
        endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '1.1rem !important' }} />}
        sx={{
          mt: 0.5,
          py: 1.3,
          borderRadius: '999px',
          background: 'linear-gradient(135deg, #FFB300 0%, #EA5A00 50%, #C04E00 100%)',
          color: '#3A1C00',
          fontWeight: 800,
          fontSize: '0.92rem',
          textTransform: 'none',
          boxShadow: '0 10px 28px rgba(255, 179, 0, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFB300 0%, #EA5A00 50%, #C04E00 100%)',
            filter: 'brightness(1.05)',
            transform: 'translateY(-1px)',
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
    <FestiveSection
      id="contact"
      variant="warm"
      showAccent={false}
      sx={{
        py: { xs: 5, md: 7 },
        backgroundColor: '#3A1C00',
        backgroundImage: `
          linear-gradient(180deg, rgba(234,90,0,0.12) 0%, rgba(10,6,0,0.40) 40%, rgba(10,6,0,0.60) 100%),
          url(${helpBg})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': { display: 'none' },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 } }}>
        <RevealBox variant="blurUp" duration={0.85}>
          <Box sx={{ textAlign: 'center', mb: { xs: 3.5, md: 4.5 } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: colors.gold, mb: 1 }}>
              <Box sx={{ width: { xs: 22, md: 36 }, height: 1, bgcolor: 'rgba(255, 179, 0,0.5)' }} />
              <Box sx={{ fontSize: '0.55rem', lineHeight: 1 }}>◈</Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.68rem', md: '0.76rem' },
                  letterSpacing: { xs: '2.8px', md: '3.6px' },
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Contact
              </Typography>
              <Box sx={{ fontSize: '0.55rem', lineHeight: 1 }}>◈</Box>
              <Box sx={{ width: { xs: 22, md: 36 }, height: 1, bgcolor: 'rgba(255, 179, 0,0.5)' }} />
            </Box>

            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '1.9rem', sm: '2.4rem', md: '3rem' },
                lineHeight: 1.1,
                fontWeight: 700,
                color: '#FFF8EE',
                letterSpacing: '-0.02em',
              }}
            >
              We&apos;re Here to Help
            </Typography>

            <LotusDivider maxWidth={240} />

            <Typography
              sx={{
                maxWidth: 520,
                mx: 'auto',
                color: 'rgba(255,245,230,0.84)',
                fontSize: { xs: '0.88rem', md: '0.98rem' },
                lineHeight: 1.7,
              }}
            >
              Reach out for passes, venue details, group bookings, or any event support.
            </Typography>
          </Box>
        </RevealBox>

        <RevealBox variant="scaleUp" delay={0.15} duration={0.85}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
              gap: { xs: 2.25, md: 2 },
              alignItems: 'stretch',
              maxWidth: 980,
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                ...ornateCardSx,
                '& > .corner-bl, & > .corner-br': {
                  position: 'absolute',
                  width: 18,
                  height: 18,
                  borderColor: 'rgba(234, 90, 0, 0.75)',
                  borderStyle: 'solid',
                  pointerEvents: 'none',
                },
              }}
            >
              <Box className="corner-bl" sx={{ bottom: 10, left: 10, borderWidth: '0 0 1.5px 1.5px', borderBottomLeftRadius: 4 }} />
              <Box className="corner-br" sx={{ bottom: 10, right: 10, borderWidth: '0 1.5px 1.5px 0', borderBottomRightRadius: 4 }} />

              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: { xs: '1.35rem', md: '1.55rem' },
                    fontWeight: 700,
                    color: colors.gold,
                  }}
                >
                  Get in Touch
                </Typography>
                <StarIconFrame size={36}>
                  <CallOutlinedIcon sx={{ fontSize: '1rem' }} />
                </StarIconFrame>
              </Stack>

              <Typography
                sx={{
                  fontSize: '0.88rem',
                  color: 'rgba(255,245,230,0.76)',
                  lineHeight: 1.7,
                  mb: 1.5,
                }}
              >
                Our team responds quickly during the Navratri season. Reach us directly for the fastest reply.
              </Typography>

              <Stack spacing={0}>
                {infoLines.map((item, index) => (
                  <InfoRow key={`${item.label}-${index}`} {...item} showDivider={index < infoLines.length - 1} />
                ))}
              </Stack>
            </Box>

            <Box
              aria-hidden
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.gold,
                px: 0.5,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ width: 1, height: 48, mx: 'auto', bgcolor: 'rgba(255, 179, 0,0.35)', mb: 1 }} />
                <Box sx={{ fontSize: '0.7rem', lineHeight: 1 }}>◈</Box>
                <Box sx={{ width: 1, height: 48, mx: 'auto', bgcolor: 'rgba(255, 179, 0,0.35)', mt: 1 }} />
              </Box>
            </Box>

            <Box
              sx={{
                ...ornateCardSx,
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  width: 18,
                  height: 18,
                  borderColor: 'rgba(234, 90, 0, 0.75)',
                  borderStyle: 'solid',
                  borderWidth: '0 0 1.5px 1.5px',
                  borderBottomLeftRadius: 4,
                  pointerEvents: 'none',
                }}
              />
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  width: 18,
                  height: 18,
                  borderColor: 'rgba(234, 90, 0, 0.75)',
                  borderStyle: 'solid',
                  borderWidth: '0 1.5px 1.5px 0',
                  borderBottomRightRadius: 4,
                  pointerEvents: 'none',
                }}
              />
              <ContactForm />
            </Box>
          </Box>
        </RevealBox>
      </Container>
    </FestiveSection>
  )
}
