import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined'
import { useNavigate } from 'react-router-dom'
import { patternMandala } from '../constants/navratriTheme'

const workflowSteps = [
  {
    step: '01',
    title: 'Book Now',
    description: 'Click Book Now to start your booking.',
    Icon: CalendarMonthOutlinedIcon,
  },
  {
    step: '02',
    title: 'Select Pass Type',
    description: 'Choose Season Pass or Daily Pass.',
    Icon: ConfirmationNumberOutlinedIcon,
  },
  {
    step: '03',
    title: 'Choose Category',
    description: 'Select Male, Female, or Couple.',
    Icon: GroupsOutlinedIcon,
  },
  {
    step: '04',
    title: 'Fill Registration',
    description: 'Enter details and upload pass photo + Aadhaar.',
    Icon: AppRegistrationOutlinedIcon,
  },
  {
    step: '05',
    title: 'Complete Payment',
    description: 'Pay securely via UPI, card, or wallet.',
    Icon: PaymentsOutlinedIcon,
  },
  {
    step: '06',
    title: 'Receive QR Pass',
    description: 'Get your QR pass on WhatsApp, email & download.',
    Icon: QrCode2OutlinedIcon,
  },
]

const goldGradient = 'linear-gradient(135deg, #FFB300 0%, #EA5A00 100%)'
const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${6 + (i * 6.8) % 88}%`,
  top: `${10 + (i * 11.3) % 78}%`,
  size: 3 + (i % 3),
  delay: `${i * 0.7}s`,
  duration: `${14 + (i % 5) * 2}s`,
}))

function useRevealStagger() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function CornerOrnament({ sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        width: { xs: 120, md: 180 },
        height: { xs: 120, md: 180 },
        opacity: 0.1,
        backgroundImage: patternMandala,
        backgroundSize: 'cover',
        pointerEvents: 'none',
        ...sx,
      }}
    />
  )
}

function TimelineConnector({ vertical = false }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'relative',
        display: { xs: vertical ? 'flex' : 'none', md: 'none', lg: vertical ? 'none' : 'flex' },
        flex: vertical ? '0 0 auto' : '1 1 28px',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: vertical ? 0 : 16,
        maxWidth: vertical ? 0 : 52,
        height: vertical ? 36 : 'auto',
        mx: vertical ? 'auto' : 0,
        my: vertical ? 0.25 : 0,
        mt: vertical ? 0 : 4.5,
        ...(vertical
          ? { borderLeft: '2px dotted rgba(255, 196, 78, 0.45)', minHeight: 32 }
          : { borderTop: '2px dotted rgba(255, 196, 78, 0.45)' }),
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 7,
          height: 7,
          bgcolor: '#FFB300',
          transform: 'rotate(45deg)',
          boxShadow: '0 0 10px rgba(255, 196, 78, 0.55)',
          ...(vertical
            ? { left: -4, top: '50%', mt: '-3.5px' }
            : { top: -4, left: '50%', ml: '-3.5px' }),
        }}
      />
    </Box>
  )
}

function StepIcon({ step }) {
  const Icon = step.Icon
  return <Icon sx={{ fontSize: 48, color: '#F0E8E0' }} />
}

function WorkflowStep({ step, index, visible }) {
  return (
    <Box
      sx={{
        position: 'relative',
        flex: { lg: '1 1 0' },
        minWidth: { xs: '100%', sm: 280, md: 'auto', lg: 0 },
        maxWidth: { xs: 340, lg: 200 },
        width: { lg: '100%' },
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -28,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: goldGradient,
          color: '#1A0800',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1rem',
          letterSpacing: '0.02em',
          boxShadow: '0 8px 22px rgba(255, 196, 78, 0.35)',
          zIndex: 2,
        }}
      >
        {step.step}
      </Box>

      <Box
        sx={{
          pt: 5,
          pb: 2.5,
          px: 1.5,
          textAlign: 'center',
          borderRadius: '72px 72px 16px 16px',
          border: '1px solid rgba(255, 179, 0, 0.35)',
          bgcolor: 'rgba(42, 14, 0, 0.45)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 179, 0, 0.12)',
          minHeight: { xs: 220, lg: 240 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            borderColor: 'rgba(255, 196, 78, 0.75)',
            boxShadow: '0 18px 40px rgba(255, 196, 78, 0.18), 0 0 24px rgba(255, 196, 78, 0.12)',
          },
        }}
      >
        <Box sx={{ mb: 1.5, mt: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52 }}>
          <StepIcon step={step} />
        </Box>

        <Box
          sx={{
            width: 48,
            height: 1,
            mb: 1.25,
            background: 'linear-gradient(90deg, transparent, rgba(255,196,78,0.5), transparent)',
          }}
        />

        <Typography
          sx={{
            fontWeight: 700,
            color: '#FFF8EE',
            fontSize: { xs: '1.05rem', md: '1.15rem', lg: '1.1rem' },
            lineHeight: 1.3,
            mb: 1,
            px: 0.5,
          }}
        >
          {step.title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '0.9rem', md: '0.95rem' },
            color: 'rgba(255, 220, 160, 0.78)',
            lineHeight: 1.55,
            px: 0.5,
          }}
        >
          {step.description}
        </Typography>
      </Box>
    </Box>
  )
}

export default function BookingWorkflowSection() {
  const navigate = useNavigate()
  const { ref: timelineRef, visible } = useRevealStagger()

  return (
    <Box
      component="section"
      id="register"
      sx={{
        position: 'relative',
        py: { xs: 6, md: 9 },
        overflow: 'hidden',
        backgroundImage: `
          linear-gradient(180deg, rgba(42,14,0,0.85) 0%, rgba(255,179,0,0.12) 100%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: patternMandala,
          backgroundSize: 'cover',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
          pointerEvents: 'none',
        }}
      />

      <CornerOrnament sx={{ top: 16, left: 16 }} />
      <CornerOrnament sx={{ top: 16, right: 16, transform: 'scaleX(-1)' }} />
      <CornerOrnament sx={{ bottom: 16, left: 16, transform: 'scaleY(-1)' }} />
      <CornerOrnament sx={{ bottom: 16, right: 16, transform: 'scale(-1)' }} />

      {particles.map((p) => (
        <Box
          key={p.id}
          aria-hidden
          sx={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 196, 78, 0.35)',
            boxShadow: '0 0 8px rgba(255, 196, 78, 0.4)',
            animation: `bfFloat ${p.duration} ease-in-out ${p.delay} infinite`,
            pointerEvents: 'none',
            '@keyframes bfFloat': {
              '0%, 100%': { transform: 'translateY(0)', opacity: 0.35 },
              '50%': { transform: 'translateY(-14px)', opacity: 0.75 },
            },
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontWeight: 700,
              color: '#F0E8E0',
              mb: 1.5,
            }}
          >
            BOOKING FLOW
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3.5rem' },
              fontWeight: 800,
              lineHeight: 1.12,
              color: '#FFF8EE',
              mb: 2,
              letterSpacing: '-0.02em',
            }}
          >
            Ticket Booking &amp; QR Pass Workflow
          </Typography>

          <Box
            sx={{
              width: 120,
              height: 2,
              mx: 'auto',
              mb: 2,
              background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                width: 8,
                height: 8,
                bgcolor: '#FFB300',
                boxShadow: '0 0 10px rgba(255,196,78,0.5)',
              },
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'rgba(255, 220, 160, 0.82)',
              lineHeight: 1.7,
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            Follow these simple steps to book your pass and receive your QR entry pass instantly.
          </Typography>
        </Box>

        <Box
          ref={timelineRef}
          sx={{
            display: { xs: 'flex', md: 'grid', lg: 'flex' },
            flexDirection: { xs: 'column', lg: 'row' },
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
            gap: { xs: 0, md: 3, lg: 0 },
            alignItems: { xs: 'center', lg: 'flex-start' },
            justifyContent: 'center',
            maxWidth: 1400,
            mx: 'auto',
            px: { lg: 1 },
            pt: 3,
          }}
        >
          {workflowSteps.map((step, index) => (
            <Box
              key={step.step}
              sx={{
                display: 'contents',
              }}
            >
              <WorkflowStep step={step} index={index} visible={visible} />
              {index < workflowSteps.length - 1 && (
                <>
                  <Box sx={{ display: { xs: 'block', md: 'none', lg: 'none' } }}>
                    <TimelineConnector vertical />
                  </Box>
                  <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
                    <TimelineConnector />
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>

        <Stack alignItems="center" sx={{ width: '100%', mt: { xs: 5, md: 7 } }}>
          <Button
            onClick={() => navigate('/event/1')}
            sx={{
              width: { xs: '100%', sm: 320 },
              maxWidth: 360,
              mx: 'auto',
              height: 60,
              borderRadius: '999px',
              background: goldGradient,
              color: '#1A0800',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '0.02em',
              boxShadow: '0 12px 32px rgba(255, 196, 78, 0.28)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                background: goldGradient,
                transform: 'scale(1.03)',
                boxShadow: '0 16px 40px rgba(255, 196, 78, 0.42)',
              },
            }}
          >
            Start Booking Now →
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
