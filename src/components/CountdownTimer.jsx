import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { colors, gradients } from '../constants/colors'

const TARGET = new Date('2026-10-11T19:30:00+05:30')

function calcTimeLeft() {
  const diff = TARGET.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function TimeUnit({ value, label }) {
  return (
    <Box sx={{ textAlign: 'center', px: { xs: 0.5, sm: 1 } }}>
      <Typography
        sx={{
          fontFamily: '"Unbounded", sans-serif',
          fontWeight: 800,
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
          background: gradients.heroText,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.1,
          minWidth: { xs: 28, sm: 36 },
        }}
      >
        {String(value).padStart(2, '0')}
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' }, color: colors.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </Typography>
    </Box>
  )
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calcTimeLeft), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: { xs: 0.75, sm: 1.5 },
        bgcolor: 'rgba(255,255,255,0.35)',
        borderRadius: '14px',
        px: { xs: 1.5, sm: 2.5 },
        py: { xs: 1, sm: 1.25 },
        border: '1px solid rgba(234, 90, 0,0.08)',
        backdropFilter: 'blur(4px)',
        mb: { xs: 2, md: 2.5 },
      }}
    >
      <Typography sx={{ fontSize: { xs: '0.65rem', sm: '0.72rem' }, color: colors.mutedLight, fontWeight: 600, mr: { xs: 0.25, sm: 0.5 } }}>
        Starts in
      </Typography>
      <TimeUnit value={timeLeft.days} label="Days" />
      <Typography sx={{ color: colors.gold, fontSize: '1rem', fontWeight: 300 }}>:</Typography>
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <Typography sx={{ color: colors.gold, fontSize: '1rem', fontWeight: 300 }}>:</Typography>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <Typography sx={{ color: colors.gold, fontSize: '1rem', fontWeight: 300 }}>:</Typography>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </Box>
  )
}
