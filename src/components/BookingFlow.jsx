import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { colors, gradients } from '../constants/colors'
import { registrationCategories } from '../data/siteData'

const steps = [
  'Book Now',
  'Pass Type',
  'Category',
  'Details',
  'Payment',
  'QR Pass',
]

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: AccountBalanceWalletOutlinedIcon, note: 'GPay · PhonePe · Paytm · BHIM' },
  { id: 'card', label: 'Cards', icon: CreditCardOutlinedIcon, note: 'Visa · Mastercard · RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: AccountBalanceOutlinedIcon, note: 'All major banks' },
  { id: 'wallet', label: 'Wallets', icon: AccountBalanceWalletOutlinedIcon, note: 'Paytm · Amazon Pay' },
]

const stepShortLabels = ['Book', 'Pass', 'Category', 'Details', 'Pay', 'QR']

function StepDots({ activeStep }) {
  return (
    <Stack direction="row" spacing={0.75} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 3, gap: 0.75 }}>
      {steps.map((label, index) => (
        <Box
          key={label}
          sx={{
            px: { xs: 0.9, sm: 1.25 },
            py: 0.5,
            borderRadius: '50px',
            fontSize: { xs: '0.62rem', sm: '0.68rem' },
            fontWeight: 700,
            bgcolor: index <= activeStep ? colors.gold : 'rgba(184,134,11,0.1)',
            color: index <= activeStep ? '#fff' : colors.muted,
            whiteSpace: 'nowrap',
          }}
        >
          {index + 1}. {stepShortLabels[index]}
        </Box>
      ))}
    </Stack>
  )
}

export default function BookingFlow() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const eventId = searchParams.get('event') || '1'
  const registration = location.state?.registration

  const [activeStep, setActiveStep] = useState(4)
  const [paymentMethod, setPaymentMethod] = useState('upi')

  const selectedCategory = registrationCategories[registration?.category || 'male']

  useEffect(() => {
    if (!registration) {
      navigate(`/event/${eventId}`, { replace: true })
    }
  }, [registration, eventId, navigate])

  const progress = useMemo(() => ((activeStep + 1) / steps.length) * 100, [activeStep])

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (activeStep === 4) {
      navigate(`/event/${eventId}`)
      return
    }
    setActiveStep((prev) => prev - 1)
  }

  if (!registration) {
    return null
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.heroCream, py: { xs: 2, md: 4 }, px: { xs: 0, sm: 0 } }}>
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ mb: 2, color: colors.ivory, fontWeight: 600, textTransform: 'none' }}
        >
          Back
        </Button>

        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: { xs: '18px', md: '24px' },
            border: '1px solid rgba(184,134,11,0.14)',
            boxShadow: '0 18px 48px rgba(44,31,16,0.08)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: { xs: 2, md: 3 }, pt: { xs: 2.5, md: 3 } }}>
            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '1.15rem', md: '1.35rem' },
                color: colors.ivory,
                mb: 0.5,
              }}
            >
              Complete Your Booking
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: '0.82rem', color: colors.muted, mb: 2 }}>
              Registration done — finish payment to get your QR pass
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mb: 2,
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(184,134,11,0.12)',
                '& .MuiLinearProgress-bar': { background: gradients.primary },
              }}
            />
            <StepDots activeStep={activeStep} />
          </Box>

          <Box sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2.5, md: 3 } }}>
            {activeStep === 4 && (
              <Stack spacing={1.5}>
                <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: colors.ivory, mb: 0.5 }}>
                  Complete Payment
                </Typography>
                <Box sx={{ bgcolor: '#FFF9EA', borderRadius: '12px', p: 1.5, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>Order Summary</Typography>
                  <Typography sx={{ fontWeight: 700, color: colors.ivory }}>
                    {registration.passLabel || registration.passMode}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: colors.muted }}>
                    {selectedCategory.title}
                    {registration.category === 'couple' ? ' · 2 persons' : ''}
                  </Typography>
                  <Typography sx={{ fontWeight: 800, color: colors.gold, fontSize: '1.2rem', mt: 0.5 }}>
                    {registration.passPrice || selectedCategory.price}
                    {registration.passPriceUnit ? (
                      <Box component="span" sx={{ fontSize: '0.82rem', fontWeight: 500, color: colors.muted, ml: 0.5 }}>
                        {registration.passPriceUnit}
                      </Box>
                    ) : null}
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: colors.muted, mt: 0.5 }}>
                    {registration.name} · {registration.mobile}
                  </Typography>
                </Box>
                {paymentMethods.map(({ id, label, icon: Icon, note }) => (
                  <Button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    sx={{
                      justifyContent: 'flex-start',
                      gap: 1.5,
                      px: 2,
                      py: 1.5,
                      borderRadius: '14px',
                      border: paymentMethod === id ? `2px solid ${colors.gold}` : '1px solid rgba(184,134,11,0.18)',
                      bgcolor: paymentMethod === id ? 'rgba(184,134,11,0.08)' : '#fff',
                      color: colors.ivory,
                      textTransform: 'none',
                    }}
                  >
                    <Icon sx={{ color: colors.gold }} />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography sx={{ fontWeight: 700 }}>{label}</Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: colors.muted }}>{note}</Typography>
                    </Box>
                  </Button>
                ))}
              </Stack>
            )}

            {activeStep === 5 && (
              <Stack spacing={2} alignItems="center" textAlign="center">
                <CheckCircleRoundedIcon sx={{ color: '#22c55e', fontSize: '3rem' }} />
                <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: colors.ivory }}>
                  Booking Confirmed!
                </Typography>
                <Box
                  sx={{
                    width: 180,
                    height: 180,
                    borderRadius: '16px',
                    border: '2px solid rgba(184,134,11,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                  }}
                >
                  <QrCode2RoundedIcon sx={{ fontSize: '7rem', color: colors.ivory }} />
                </Box>
                <Typography sx={{ color: colors.muted, lineHeight: 1.7 }}>
                  Your QR pass for MGM Cultural Navratri has been sent to WhatsApp and Email.
                  Show this QR at the entry gate.
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>
                  {registration.name} · {registration.mobile}
                </Typography>
                <Button
                  startIcon={<DownloadRoundedIcon />}
                  sx={{
                    borderRadius: '12px',
                    border: `1px solid ${colors.gold}`,
                    color: colors.gold,
                    fontWeight: 700,
                    px: 3,
                  }}
                >
                  Download Pass
                </Button>
              </Stack>
            )}

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {activeStep < 5 && (
                <Button
                  onClick={handleNext}
                  endIcon={<ArrowForwardRoundedIcon />}
                  fullWidth
                  sx={{
                    py: 1.4,
                    minHeight: 48,
                    borderRadius: '12px',
                    background: gradients.primary,
                    color: '#fff',
                    fontWeight: 700,
                    '&:hover': { background: gradients.primary, filter: 'brightness(1.05)' },
                  }}
                >
                  Pay Securely
                </Button>
              )}
              {activeStep === 5 && (
                <Button
                  onClick={() => navigate('/')}
                  fullWidth
                  sx={{
                    py: 1.4,
                    minHeight: 48,
                    borderRadius: '12px',
                    background: gradients.primary,
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  Back to Home
                </Button>
              )}
            </Stack>
          </Box>
        </Box>

        <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '0.78rem', color: colors.muted }}>
          Safe · Secure · Seamless · Enjoy 10 Nights of Divine Celebration
        </Typography>
      </Container>
    </Box>
  )
}
