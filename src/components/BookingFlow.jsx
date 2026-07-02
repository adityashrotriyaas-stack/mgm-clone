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
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { colors, gradients } from '../constants/colors'
import { registrationCategories } from '../data/siteData'

const steps = ['Book Now', 'Pass Type', 'Category', 'Details', 'Payment', 'QR Pass']
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
        <Box key={label} sx={{ px: { xs: 0.9, sm: 1.25 }, py: 0.5, borderRadius: '50px', fontSize: { xs: '0.62rem', sm: '0.68rem' }, fontWeight: 700, background: index <= activeStep ? gradients.primary : 'rgba(184,134,11,0.10)', color: index <= activeStep ? '#fff' : colors.muted, whiteSpace: 'nowrap', boxShadow: index <= activeStep ? '0 4px 12px rgba(184,134,11,0.18)' : 'none', transition: 'all 0.3s ease' }}>
          {index + 1}. {stepShortLabels[index]}
        </Box>
      ))}
    </Stack>
  )
}

function AnimatedCheckmark() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t) }, [])
  return (
    <Box sx={{ width: 72, height: 72, borderRadius: '50%', background: colors.successBg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease', transform: visible ? 'scale(1)' : 'scale(0)', opacity: visible ? 1 : 0 }}>
      <CheckCircleRoundedIcon sx={{ color: colors.success, fontSize: '2.8rem' }} />
    </Box>
  )
}

function DecorativeOrb({ size, top, left, right, bottom }) {
  return <Box sx={{ position: 'absolute', width: size, height: size, borderRadius: '50%', top, left, right, bottom, background: `radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
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

  useEffect(() => { if (!registration) { navigate(`/event/${eventId}`, { replace: true }) } }, [registration, eventId, navigate])

  const progress = useMemo(() => ((activeStep + 1) / steps.length) * 100, [activeStep])

  const handleNext = () => { if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1) }
  const handleBack = () => { if (activeStep === 4) { navigate(`/event/${eventId}`); return }; setActiveStep((prev) => prev - 1) }

  if (!registration) return null

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.heroCream, py: { xs: 2, md: 4 }, px: { xs: 0, sm: 0 }, position: 'relative', overflow: 'hidden' }}>
      <DecorativeOrb size={350} top="-100px" right="-80px" />
      <DecorativeOrb size={250} bottom="-60px" left="-60px" />
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.05, backgroundImage: `radial-gradient(circle at 20% 40%, ${colors.gold} 1px, transparent 1px), radial-gradient(circle at 70% 60%, ${colors.gold} 1px, transparent 1px)`, backgroundSize: '60px 60px, 80px 80px', backgroundPosition: '0 0, 40px 20px' }} />
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1 }}>
        <Button onClick={handleBack} startIcon={<ArrowBackRoundedIcon />} sx={{ mb: 2, color: colors.ivory, fontWeight: 600, textTransform: 'none', fontSize: '0.85rem', '&:hover': { color: colors.gold, bgcolor: 'transparent' } }}>
          {activeStep === 4 ? 'Back to Event' : 'Back'}
        </Button>
        <Box sx={{ bgcolor: colors.bg, borderRadius: { xs: '18px', md: '24px' }, border: '1px solid rgba(184,134,11,0.14)', boxShadow: '0 18px 48px rgba(44,31,16,0.08)', overflow: 'hidden' }}>
          <Box sx={{ px: { xs: 2, md: 3 }, pt: { xs: 2.5, md: 3 }, position: 'relative', '&::before': { content: '""', position: 'absolute', top: 0, left: '50%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,134,11,0.04) 0%, transparent 60%)', transform: 'translateX(-50%)', pointerEvents: 'none' } }}>
            <Typography sx={{ textAlign: 'center', fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: { xs: '1.15rem', md: '1.4rem' }, color: colors.ivory, mb: 0.5, position: 'relative' }}>Complete Your Booking</Typography>
            <Typography sx={{ textAlign: 'center', fontSize: '0.82rem', color: colors.muted, mb: 2.5 }}>
              {activeStep === 4 ? 'Registration done — finish payment to get your QR pass' : 'Payment confirmed — here\'s your pass'}
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 6, borderRadius: 3, bgcolor: 'rgba(184,134,11,0.12)', '& .MuiLinearProgress-bar': { background: gradients.primary, borderRadius: 3 } }} />
            <StepDots activeStep={activeStep} />
          </Box>
          <Box key={activeStep} sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2.5, md: 3 }, animation: 'fadeSlideUp 0.4s ease' }}>
            {activeStep === 4 && (
              <Stack spacing={2}>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: colors.ivory }}>Complete Payment</Typography>
                <Box sx={{ bgcolor: colors.heroCream, borderRadius: '14px', border: '1px solid rgba(184,134,11,0.08)', p: { xs: 1.5, md: 1.75 } }}>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: colors.mutedLight, textTransform: 'uppercase', letterSpacing: '1px', mb: 1.25 }}>Order Summary</Typography>
                  <Stack spacing={1.25}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                        <ShoppingBagOutlinedIcon sx={{ fontSize: '0.95rem', color: colors.gold, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: colors.ivory, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{registration.passLabel || registration.passMode}</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: '0.82rem', color: colors.muted, flexShrink: 0, ml: 1 }}>{registration.category === 'couple' ? '× 2' : '× 1'}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                        <PersonOutlineOutlinedIcon sx={{ fontSize: '0.95rem', color: colors.gold, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.82rem', color: colors.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedCategory.title}</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: '0.82rem', color: colors.muted, flexShrink: 0, ml: 1 }}>{registration.name}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                        <SmartphoneOutlinedIcon sx={{ fontSize: '0.95rem', color: colors.gold, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>Contact</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: '0.82rem', color: colors.muted, flexShrink: 0, ml: 1 }}>{registration.mobile}</Typography>
                    </Stack>
                    {registration.selectedDayLabel && (
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                          <LocationOnOutlinedIcon sx={{ fontSize: '0.9rem', color: colors.gold, flexShrink: 0 }} />
                          <Typography sx={{ fontSize: '0.82rem', color: colors.mutedLight, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Venue</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: '0.82rem', color: colors.mutedLight, flexShrink: 0, ml: 1, textAlign: 'right' }}>{registration.selectedDayLabel}</Typography>
                      </Stack>
                    )}
                    <Box sx={{ borderTop: '1px solid rgba(184,134,11,0.08)', pt: 1.25 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: colors.ivory }}>Total</Typography>
                        <Stack direction="row" spacing={0.25} alignItems="baseline">
                          <Typography sx={{ fontWeight: 800, color: colors.gold, fontSize: '1.25rem', fontFamily: '"Unbounded", sans-serif' }}>
                            ₹{(registration.passPrice || selectedCategory.price + '').replace(/[^0-9,]/g, '')}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: colors.ivory }}>Choose Payment Method</Typography>
                {paymentMethods.map(({ id, label, icon: Icon, note }) => (
                  <Button key={id} onClick={() => setPaymentMethod(id)} sx={{ justifyContent: 'flex-start', gap: 1.5, px: 2.5, py: 1.5, borderRadius: '14px', border: paymentMethod === id ? `2px solid ${colors.gold}` : '1px solid rgba(184,134,11,0.12)', background: paymentMethod === id ? 'rgba(184,134,11,0.06)' : colors.heroCream, color: colors.ivory, textTransform: 'none', transition: 'all 0.2s', '&:hover': { borderColor: colors.gold, background: 'rgba(184,134,11,0.04)' } }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '10px', background: paymentMethod === id ? gradients.primary : 'rgba(184,134,11,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                      <Icon sx={{ color: paymentMethod === id ? '#fff' : colors.gold, fontSize: '1.15rem' }} />
                    </Box>
                    <Box sx={{ textAlign: 'left', flex: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>{label}</Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: colors.muted }}>{note}</Typography>
                    </Box>
                  </Button>
                ))}
              </Stack>
            )}
            {activeStep === 5 && (
              <Stack spacing={2} alignItems="center" textAlign="center" sx={{ py: 1 }}>
                <AnimatedCheckmark />
                <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: colors.ivory }}>Booking Confirmed!</Typography>
                <Box sx={{ width: 200, background: '#fff', borderRadius: '16px', border: '1px solid rgba(184,134,11,0.18)', boxShadow: '0 8px 24px rgba(44,31,16,0.06)', p: 2, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: gradients.primary } }}>
                  <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: colors.gold, letterSpacing: '1px', mb: 0.75 }}>MGM NAVRATRI</Typography>
                  <QrCode2RoundedIcon sx={{ fontSize: '6rem', color: colors.ivory }} />
                  <Typography sx={{ fontSize: '0.6rem', color: colors.mutedLight, mt: 0.75, fontFamily: 'monospace' }}>#{registration.mobile?.slice(-6) || '000000'}</Typography>
                </Box>
                <Typography sx={{ color: colors.muted, fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 320 }}>Your QR pass has been sent to your WhatsApp and Email. Show this QR at the entry gate for a seamless check-in.</Typography>
                <Stack direction="row" spacing={0.75} alignItems="center" sx={{ bgcolor: colors.heroCream, borderRadius: '10px', border: '1px solid rgba(184,134,11,0.08)', px: 2, py: 1.25 }}>
                  <PersonOutlineOutlinedIcon sx={{ fontSize: '0.9rem', color: colors.gold }} />
                  <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>{registration.name} · {registration.mobile}</Typography>
                </Stack>
                <Button startIcon={<DownloadRoundedIcon />} fullWidth sx={{ borderRadius: '12px', border: `2px solid ${colors.gold}`, color: colors.gold, fontWeight: 700, py: 1.25, background: 'transparent', transition: 'all 0.2s', '&:hover': { background: 'rgba(184,134,11,0.06)', transform: 'translateY(-1px)' } }}>Download Pass</Button>
              </Stack>
            )}
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {activeStep < 5 && (
                <Button onClick={handleNext} endIcon={<ArrowForwardRoundedIcon />} fullWidth sx={{ py: 1.4, minHeight: 48, borderRadius: '12px', background: gradients.primary, color: '#fff', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 8px 20px rgba(184,134,11,0.22)', transition: 'transform 0.25s ease, box-shadow 0.25s ease', '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-2px)', boxShadow: '0 12px 28px rgba(184,134,11,0.32)' } }}>
                  Pay ₹{((registration.passPrice || selectedCategory?.price || '') + '').replace(/[^0-9]/g, '') || '0'} Securely
                </Button>
              )}
              {activeStep === 5 && (
                <Button onClick={() => navigate('/')} fullWidth sx={{ py: 1.4, minHeight: 48, borderRadius: '12px', background: gradients.primary, color: '#fff', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 8px 20px rgba(184,134,11,0.22)', '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-1px)' } }}>Back to Home</Button>
              )}
            </Stack>
          </Box>
        </Box>
        <Typography sx={{ textAlign: 'center', mt: 2.5, fontSize: '0.78rem', color: colors.muted }}>
          <LockOutlinedIcon sx={{ fontSize: '0.78rem', color: colors.gold, verticalAlign: 'middle', mr: 0.5 }} />Safe · Secure · Seamless
        </Typography>
      </Container>
    </Box>
  )
}
