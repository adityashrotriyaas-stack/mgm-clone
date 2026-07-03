import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import Tooltip from '@mui/material/Tooltip'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import { SectionHead } from './shared'
import { colors, gradients } from '../constants/colors'
import { navratriNights, nightTracker, upcomingEvents } from '../data/siteData'

function EventCard({ event, onBook }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 6, y: y * -6 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <Box
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        flex: '0 0 auto',
        width: { xs: 'min(85vw, 300px)', sm: 320, md: 340 },
        scrollSnapAlign: 'start',
        bgcolor: colors.bgSoft,
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(184,134,11,0.10)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${tilt.x || tilt.y ? -4 : 0}px)`,
        boxShadow: tilt.x || tilt.y ? '0 24px 48px rgba(44,31,16,0.14)' : '0 8px 24px rgba(44,31,16,0.05)',
        '@media (hover: hover)': {
          '&:hover': {
            borderColor: 'rgba(184,134,11,0.25)',
          },
        },
      }}>
      <Box sx={{ height: { xs: 150, sm: 160 }, backgroundImage: `url(${event.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', '&::after': { content: '""', position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(44,31,16,0.15) 100%)' } }}>
        <Box sx={{ position: 'absolute', top: 12, left: 12, background: gradients.primary, color: '#fff', fontSize: '0.66rem', fontWeight: 700, px: 1.5, py: 0.6, borderRadius: '20px', zIndex: 1 }}>{event.badge}</Box>
        <Box sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(255,255,255,0.90)', color: colors.teal, fontSize: '0.68rem', fontWeight: 700, px: 1.25, py: 0.6, borderRadius: '20px', zIndex: 1, backdropFilter: 'blur(4px)' }}>{event.night}</Box>
      </Box>
      <Box sx={{ p: { xs: 1.75, sm: 2 } }}>
        <Typography sx={{ fontSize: { xs: '1rem', sm: '1.05rem' }, color: colors.ivory, fontWeight: 600, mb: 1, lineHeight: 1.3 }}>{event.title}</Typography>
        <Stack spacing={0.7} sx={{ mb: 1.5, fontSize: '0.78rem', color: colors.muted }}>
          <Stack direction="row" spacing={0.8} alignItems="center">
            <CalendarMonthOutlinedIcon sx={{ fontSize: '0.95rem', color: colors.teal }} />
            <Typography sx={{ fontSize: '0.78rem', color: colors.muted }}>{event.date}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.8} alignItems="center">
            <AccessTimeOutlinedIcon sx={{ fontSize: '0.95rem', color: colors.teal }} />
            <Typography sx={{ fontSize: '0.78rem', color: colors.muted }}>{event.time}</Typography>
          </Stack>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between" spacing={1.25}>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 800, color: colors.marigoldSoft, fontSize: '1rem', minWidth: 0 }}>{event.price} <Box component="span" sx={{ fontWeight: 500, color: colors.muted, fontSize: '0.72rem' }}>{event.priceUnit}</Box></Typography>
            <Typography sx={{ fontSize: '0.72rem', color: colors.muted, mt: 0.25 }}>Limited passes available</Typography>
          </Box>
          <Button onClick={() => onBook(event.id)} sx={{ background: gradients.primary, color: '#fff', fontWeight: 700, fontSize: '0.84rem', px: 2.5, py: 1.2, minHeight: 46, minWidth: { xs: '100%', sm: 120 }, borderRadius: '999px', flexShrink: 0, boxShadow: '0 10px 22px rgba(184,92,58,0.22)', transition: 'transform 0.25s ease, box-shadow 0.25s ease', '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-1px)', boxShadow: '0 12px 28px rgba(184,92,58,0.30)' } }}>Book Pass</Button>
        </Stack>
      </Box>
    </Box>
  )
}

function NightProgressTracker() {
  const statusIcon = { done: CheckCircleRoundedIcon, today: RadioButtonCheckedRoundedIcon, upcoming: RadioButtonUncheckedRoundedIcon }
  const statusColor = { done: colors.marigold, today: colors.coral, upcoming: colors.glassBorder }
  const statusLabel = { done: 'Completed', today: 'Tonight!', upcoming: 'Upcoming' }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 0.5, sm: 1 }, mb: 3, px: 2, flexWrap: 'wrap' }}>
      {nightTracker.map(({ night, status }) => {
        const Icon = statusIcon[status]
        const nightData = navratriNights.find((n) => n.id === night)
        return (
          <Tooltip key={night} title={nightData ? `${nightData.label} · ${nightData.date} · ${nightData.theme} (${statusLabel[status]})` : `Night ${night}`} arrow placement="top" slotProps={{ tooltip: { sx: { bgcolor: colors.ivory, color: '#fff', fontSize: '0.72rem', fontWeight: 600, borderRadius: '8px', px: 1.25, py: 0.75 } }, arrow: { sx: { color: colors.ivory } } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4, cursor: 'pointer', transition: 'transform 0.2s ease', '@media (hover: hover)': { '&:hover': { transform: 'translateY(-3px)' } } }}>
              <Box sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 }, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: status === 'today' ? `${colors.coral}15` : 'transparent', animation: status === 'today' ? 'pulseGlow 2s ease-in-out infinite' : 'none' }}>
                <Icon sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, color: statusColor[status] }} />
              </Box>
              <Typography sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' }, fontWeight: status === 'today' ? 700 : 500, color: status === 'today' ? colors.coral : colors.muted, display: { xs: status === 'today' ? 'block' : 'none', sm: 'block' } }}>
                {status === 'today' ? 'Tonight' : `N${night}`}
              </Typography>
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

export default function UpcomingNights() {
  const navigate = useNavigate()
  const sliderRef = useRef(null)
  const scrollTimerRef = useRef(null)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActiveIndex = () => {
    const node = sliderRef.current
    if (!node) return
    const cardWidth = node.children[0]?.offsetWidth || 340
    const gap = 16
    const scrollPos = node.scrollLeft
    const index = Math.round(scrollPos / (cardWidth + gap))
    setActiveIndex(Math.min(index, upcomingEvents.length - 1))
  }

  const scrollSlider = (direction) => {
    const node = sliderRef.current
    if (!node) return
    const amount = Math.min(node.clientWidth * 0.85, 340)
    node.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  useEffect(() => {
    const node = sliderRef.current
    if (!node || isAutoScrollPaused) return undefined
    const interval = window.setInterval(() => {
      const maxScrollLeft = node.scrollWidth - node.clientWidth
      const amount = Math.min(node.clientWidth * 0.85, 340)
      if (node.scrollLeft >= maxScrollLeft - 8) {
        node.scrollTo({ left: 0, behavior: 'smooth' })
        return
      }
      node.scrollBy({ left: amount, behavior: 'smooth' })
    }, 3200)
    return () => window.clearInterval(interval)
  }, [isAutoScrollPaused])

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [])

  return (
    <Box component="section" id="upcoming" sx={{ py: { xs: 4.5, md: 6.25 }, overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 } }}>
        <SectionHead eyebrow="What's Next" title="Upcoming Nights" description="Each night brings a new theme — book early, ground passes are limited." />
      </Container>
      <NightProgressTracker />
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2, md: 3 } }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton aria-label="Previous events" onClick={() => scrollSlider('left')} sx={{
            display: 'inline-flex', position: 'absolute', left: { xs: 0, sm: 4, md: 0 }, top: { xs: 'calc(50% - 20px)', sm: '50%' }, transform: 'translateY(-50%)',
            bgcolor: colors.bgSoft, border: '1px solid rgba(139,107,46,0.16)', color: colors.ivory, width: { xs: 32, sm: 44 }, height: { xs: 32, sm: 44 }, zIndex: 2, boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            '&:hover': { bgcolor: '#fff7ea' }, '& .MuiSvgIcon-root': { fontSize: { xs: '1.1rem', sm: '1.5rem' } },
          }}>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton aria-label="Next events" onClick={() => scrollSlider('right')} sx={{
            display: 'inline-flex', position: 'absolute', right: { xs: 0, sm: 4, md: 0 }, top: { xs: 'calc(50% - 20px)', sm: '50%' }, transform: 'translateY(-50%)',
            bgcolor: colors.bgSoft, border: '1px solid rgba(139,107,46,0.16)', color: colors.ivory, width: { xs: 32, sm: 44 }, height: { xs: 32, sm: 44 }, zIndex: 2, boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            '&:hover': { bgcolor: '#fff7ea' }, '& .MuiSvgIcon-root': { fontSize: { xs: '1.1rem', sm: '1.5rem' } },
          }}>
            <ChevronRightRoundedIcon />
          </IconButton>
          <Box ref={sliderRef} onMouseEnter={() => setIsAutoScrollPaused(true)} onMouseLeave={() => setIsAutoScrollPaused(false)} onTouchStart={() => setIsAutoScrollPaused(true)} onTouchEnd={() => { const t = setTimeout(() => setIsAutoScrollPaused(false), 2500); scrollTimerRef.current = t }} onScroll={updateActiveIndex} sx={{ display: 'flex', flexWrap: 'nowrap', gap: { xs: 1.5, sm: 2 }, overflowX: 'auto', px: { xs: 2, sm: 3, md: 7 }, pb: 2.25, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} onBook={(id) => navigate(`/event/${id}`)} />
            ))}
          </Box>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2, display: { xs: 'flex', sm: 'none' } }}>
            {upcomingEvents.map((_, index) => (
              <Box key={index} onClick={() => { const node = sliderRef.current; if (!node) return; const card = node.children[index]; if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }) }} sx={{ width: activeIndex === index ? 20 : 8, height: 8, borderRadius: '4px', bgcolor: activeIndex === index ? colors.marigold : colors.glassBorder, cursor: 'pointer', transition: 'all 0.3s ease' }} />
            ))}
          </Stack>
          <Typography sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'center', fontSize: '0.72rem', color: colors.muted, mt: 0.5, px: 2 }}>Swipe to see more nights</Typography>
        </Box>
      </Container>
    </Box>
  )
}
