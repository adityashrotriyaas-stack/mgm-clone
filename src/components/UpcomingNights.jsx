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
import { RevealBox, SectionHead } from './shared'
import { colors } from '../constants/colors'
import { upcomingEvents } from '../data/siteData'

function EventCard({ event, onBook }) {
  return (
    <RevealBox
      sx={{
        flex: '0 0 auto',
        width: { xs: 'min(85vw, 300px)', sm: 320, md: 340 },
        scrollSnapAlign: 'start',
        bgcolor: colors.bgSoft,
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: 'rgba(255,178,62,0.35)',
            boxShadow: '0 16px 36px rgba(0,0,0,0.35)',
          },
        },
      }}
    >
      <Box
        sx={{
          height: { xs: 150, sm: 160 },
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: colors.coral,
            color: '#fff',
            fontSize: '0.66rem',
            fontWeight: 700,
            px: 1.5,
            py: 0.6,
            borderRadius: '20px',
          }}
        >
          {event.badge}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(255,247,230,0.85)',
            color: colors.teal,
            fontSize: '0.68rem',
            fontWeight: 700,
            px: 1.25,
            py: 0.6,
            borderRadius: '20px',
          }}
        >
          {event.night}
        </Box>
      </Box>

      <Box sx={{ p: { xs: 1.75, sm: 2 } }}>
        <Typography
          sx={{
            fontSize: { xs: '1rem', sm: '1.05rem' },
            color: colors.ivory,
            fontWeight: 600,
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          {event.title}
        </Typography>
        <Stack
          spacing={0.7}
          sx={{ mb: 1.5, fontSize: '0.78rem', color: colors.muted }}
        >
          <Stack direction="row" spacing={0.8} alignItems="center">
            <CalendarMonthOutlinedIcon sx={{ fontSize: '0.95rem', color: colors.teal }} />
            <Typography sx={{ fontSize: '0.78rem', color: colors.muted }}>{event.date}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.8} alignItems="center">
            <AccessTimeOutlinedIcon sx={{ fontSize: '0.95rem', color: colors.teal }} />
            <Typography sx={{ fontSize: '0.78rem', color: colors.muted }}>{event.time}</Typography>
          </Stack>
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          spacing={1.25}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 800, color: colors.marigoldSoft, fontSize: '1rem', minWidth: 0 }}>
            {event.price}{' '}
            <Box component="span" sx={{ fontWeight: 500, color: colors.muted, fontSize: '0.72rem' }}>
              {event.priceUnit}
            </Box>
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: colors.muted, mt: 0.25 }}>
              Limited passes available
            </Typography>
          </Box>
          <Button
            onClick={() => onBook(event.id)}
            sx={{
              background: `linear-gradient(135deg, ${colors.marigold}, ${colors.coral})`,
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.84rem',
              px: 2.5,
              py: 1.2,
              minHeight: 46,
              minWidth: { xs: '100%', sm: 120 },
              borderRadius: '999px',
              flexShrink: 0,
              boxShadow: '0 10px 22px rgba(184,92,58,0.22)',
              '&:hover': {
                background: `linear-gradient(135deg, ${colors.marigold}, ${colors.coral})`,
                filter: 'brightness(1.04)',
              },
            }}
          >
            Book Pass
          </Button>
        </Stack>
      </Box>
    </RevealBox>
  )
}

export default function UpcomingNights() {
  const navigate = useNavigate()
  const sliderRef = useRef(null)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)

  const scrollSlider = (direction) => {
    const node = sliderRef.current
    if (!node) return

    const amount = Math.min(node.clientWidth * 0.85, 340)
    node.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
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

  return (
    <Box component="section" id="upcoming" sx={{ py: { xs: 4.5, md: 6.25 }, overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 } }}>
        <SectionHead
          eyebrow="What's Next"
          title="Upcoming Nights"
          description="Each night brings a new theme — book early, ground passes are limited."
        />
      </Container>

      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2, md: 3 } }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            aria-label="Previous events"
            onClick={() => scrollSlider('left')}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              position: 'absolute',
              left: { sm: 4, md: 0 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: colors.bgSoft,
              border: '1px solid rgba(139,107,46,0.16)',
              color: colors.ivory,
              width: 44,
              height: 44,
              zIndex: 2,
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
              '&:hover': { bgcolor: '#fff7ea' },
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <IconButton
            aria-label="Next events"
            onClick={() => scrollSlider('right')}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              position: 'absolute',
              right: { sm: 4, md: 0 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: colors.bgSoft,
              border: '1px solid rgba(139,107,46,0.16)',
              color: colors.ivory,
              width: 44,
              height: 44,
              zIndex: 2,
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
              '&:hover': { bgcolor: '#fff7ea' },
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>

          <Box
            ref={sliderRef}
            onMouseEnter={() => setIsAutoScrollPaused(true)}
            onMouseLeave={() => setIsAutoScrollPaused(false)}
            onTouchStart={() => setIsAutoScrollPaused(true)}
            onTouchEnd={() => {
              window.setTimeout(() => setIsAutoScrollPaused(false), 2500)
            }}
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: { xs: 1.5, sm: 2 },
              overflowX: 'auto',
              px: { xs: 2, sm: 3, md: 7 },
              pb: 2.25,
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} onBook={(id) => navigate(`/event/${id}`)} />
            ))}
          </Box>

          <Typography
            sx={{
              display: { xs: 'block', sm: 'none' },
              textAlign: 'center',
              fontSize: '0.72rem',
              color: colors.muted,
              mt: 0.5,
              px: 2,
            }}
          >
            Swipe to see more nights →
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
