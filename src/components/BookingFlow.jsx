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
import { colors, gradients } from '../constants/colors'
import { festiveCardSx } from '../constants/navratriTheme'
import FestiveSection from './FestiveSection'
import { isWowslyConfigured } from '../config/wowsly'
import { registrationCategories } from '../data/siteData'
import {
  completeWowslyPayment,
  loadWowslySession,
} from '../services/wowslyBooking'
import NonRefundableCheckbox from './NonRefundableCheckbox'

const steps = [
  'Book Now',
  'Pass Type',
  'Category',
  'Details',
  'Payment',
  'QR Pass',
]

const stepShortLabels = ['Book', 'Pass', 'Category', 'Details', 'Pay', 'QR']

function StepDots({ activeStep }) {
  return (
    <Stack direction="row" spacing={0.75} useFlexGap sx={{ mb: 3, gap: 0.75, justifyContent: 'center', flexWrap: 'wrap' }}>
      {steps.map((label, index) => (
        <Box
          key={label}
          sx={{
            px: { xs: 0.9, sm: 1.25 },
            py: 0.5,
            borderRadius: '50px',
            fontSize: { xs: '0.65rem', sm: '0.72rem' },
            fontWeight: 700,
            bgcolor: index <= activeStep ? colors.gold : 'rgba(234, 90, 0,0.1)',
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
  const [searchParams, setSearchParams] = useSearchParams()
  const eventId = searchParams.get('event') || '1'
  const stepParam = parseInt(searchParams.get('step') || '4', 10)
  const registration = location.state?.registration || (() => { try { return JSON.parse(sessionStorage.getItem('bookingFlowRegistration')) } catch { return null } })()
  const wowslySession = location.state?.wowslySession || loadWowslySession()

  useEffect(() => {
    if (registration) {
      try { sessionStorage.setItem('bookingFlowRegistration', JSON.stringify(registration)) } catch {}
    }
  }, [registration])

  const [activeStep, setActiveStep] = useState(isNaN(stepParam) ? 4 : Math.min(stepParam, steps.length - 1))
  const [acceptedNonRefundable, setAcceptedNonRefundable] = useState(false)
  const [paying, setPaying] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  const selectedCategory = registrationCategories[registration?.category || 'male']

  useEffect(() => {
    if (!registration) {
      navigate(`/event/${eventId}`, { replace: true })
    }
  }, [registration, eventId, navigate])

  useEffect(() => {
    setSearchParams({ event: eventId, step: activeStep }, { replace: true })
  }, [activeStep, eventId, setSearchParams])

  const progress = useMemo(() => ((activeStep + 1) / steps.length) * 100, [activeStep])

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handlePaySecurely = async () => {
    if (!acceptedNonRefundable || paying) return

    if (isWowslyConfigured() && wowslySession) {
      setPaymentError('')
      setPaying(true)
      try {
        console.log('[BookingFlow] Starting payment with session:', wowslySession)
        await completeWowslyPayment(registration, wowslySession)
        console.log('[BookingFlow] Payment completed successfully')
        setActiveStep(5)
      } catch (error) {
        console.error('[BookingFlow] Payment error:', error)
        setPaymentError(error?.message || error?.toString() || 'Payment failed. Please try again.')
      } finally {
        setPaying(false)
      }
      return
    }

    console.log('[BookingFlow] Demo mode - skipping payment, going to next step')
    handleNext()
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
    <FestiveSection variant="night" showAccent={false} sx={{ minHeight: '100vh', py: { xs: 2, md: 4 } }}>
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
            ...festiveCardSx,
            borderRadius: { xs: '18px', md: '24px' },
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
              Get Your Pass
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
                bgcolor: 'rgba(234, 90, 0,0.12)',
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
                <Box sx={{ bgcolor: colors.bgWarm, borderRadius: '12px', p: 1.5, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>Order Summary</Typography>
                  <Typography sx={{ fontWeight: 700, color: colors.ivory }}>
                    {registration.passLabel || registration.passMode}
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: colors.muted }}>
                    {selectedCategory.title}
                    {registration.category === 'couple' ? ' · 2 persons' : ''}
                  </Typography>
                  {registration.ticketCount ? (
                    <Typography sx={{ fontSize: '0.82rem', color: colors.muted, mt: 0.25 }}>
                      Tickets: {registration.ticketCount}
                    </Typography>
                  ) : null}
                  {registration.selectedDayLabel && (
                    <Typography sx={{ fontSize: '0.84rem', color: colors.muted, mt: 0.25 }}>
                      {registration.selectedDayLabel}
                    </Typography>
                  )}
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
                <NonRefundableCheckbox
                  checked={acceptedNonRefundable}
                  onChange={setAcceptedNonRefundable}
                />
                {paymentError && (
                  <Typography sx={{ fontSize: '0.82rem', color: '#ef4444' }}>
                    {paymentError}
                  </Typography>
                )}
              </Stack>
            )}

            {activeStep === 5 && (
              <Stack spacing={2} alignItems="center" textAlign="center">
                <CheckCircleRoundedIcon sx={{ color: '#22c55e', fontSize: '3rem' }} />
                <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', color: colors.ivory, mb: 1 }}>
                  Booking Confirmed!
                </Typography>
                <Typography sx={{ color: colors.muted, lineHeight: 1.7, maxWidth: 400 }}>
                  Thank you for booking with MGM Cultural Navratri. Your pass has been confirmed.
                </Typography>
                <Typography sx={{ color: colors.gold, fontWeight: 600, fontSize: '0.95rem', mb: 0.5 }}>
                  Check your WhatsApp and Gmail for your ticket.
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>
                  {registration.name} · {registration.mobile}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {activeStep < 5 && (
                <Button
                  onClick={handlePaySecurely}
                  disabled={activeStep === 4 && (!acceptedNonRefundable || paying)}
                  endIcon={<ArrowForwardRoundedIcon />}
                  fullWidth
                  sx={{
                    py: 1.4,
                    minHeight: 48,
                    borderRadius: '12px',
                    background: gradients.button,
                    color: '#3A1C00',
                    fontWeight: 700,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { background: gradients.buttonHover, transform: 'scale(1.02)', boxShadow: '0 12px 28px rgba(234, 90, 0, 0.45)' },
                    '&.Mui-disabled': { bgcolor: '#ccc', color: '#fff' },
                  }}
                >
                  {paying ? 'Opening payment…' : 'Pay Securely'}
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
                    background: gradients.button,
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
    </FestiveSection>
  )
}
