import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { RevealBox, SectionHead } from './shared'
import { colors } from '../constants/colors'
import { upcomingEvents } from '../data/siteData'

function EventCard({ event, onBook }) {
  return (
    <RevealBox
      sx={{
        flex: '0 0 auto',
        width: { xs: 280, sm: 320, md: 340 },
        scrollSnapAlign: 'start',
        bgcolor: colors.bgSoft,
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: 'rgba(255,178,62,0.35)',
          boxShadow: '0 16px 36px rgba(0,0,0,0.35)',
        },
      }}
    >
      <Box
        sx={{
          height: 160,
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

      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontSize: '1.05rem',
            color: colors.ivory,
            fontWeight: 600,
            mb: 0.75,
          }}
        >
          {event.title}
        </Typography>
        <Stack direction="row" flexWrap="wrap" spacing={1.5} sx={{ mb: 1.75, fontSize: '0.78rem', color: colors.muted }}>
          <span>{event.date}</span>
          <span>{event.time}</span>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography sx={{ fontWeight: 800, color: colors.marigoldSoft, fontSize: '0.95rem' }}>
            {event.price}{' '}
            <Box component="span" sx={{ fontWeight: 500, color: colors.muted, fontSize: '0.72rem' }}>
              {event.priceUnit}
            </Box>
          </Typography>
          <Button
            onClick={() => onBook(event.id)}
            sx={{
              bgcolor: 'rgba(255,255,255,0.08)',
              color: colors.ivory,
              fontWeight: 700,
              fontSize: '0.8rem',
              px: 2,
              py: 1.1,
              borderRadius: '24px',
              minWidth: 'auto',
              '&:hover': {
                background: `linear-gradient(135deg, ${colors.marigold}, ${colors.coral})`,
                color: colors.bg,
              },
            }}
          >
            Book
          </Button>
        </Stack>
      </Box>
    </RevealBox>
  )
}

export default function UpcomingNights() {
  const navigate = useNavigate()
  const sliderRef = useRef(null)

  const scrollSlider = (direction) => {
    const node = sliderRef.current
    if (!node) return

    const amount = Math.min(node.clientWidth * 0.9, 360)
    node.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <Box component="section" id="upcoming" sx={{ py: 6.25 }}>
      <Container maxWidth="lg">
        <SectionHead
          eyebrow="What's Next"
          title="Upcoming Nights"
          description="Each night brings a new theme — book early, ground passes are limited."
        />
      </Container>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ position: 'relative', px: { xs: 0, md: 7 } }}>
          <IconButton
            aria-label="Previous events"
            onClick={() => scrollSlider('left')}
            sx={{
              position: { xs: 'static', md: 'absolute' },
              left: 0,
              top: '50%',
              transform: { md: 'translateY(-50%)' },
              mb: { xs: 2, md: 0 },
              bgcolor: colors.bgSoft,
              border: '1px solid rgba(139,107,46,0.16)',
              color: colors.ivory,
              width: 52,
              height: 52,
              zIndex: 2,
              '&:hover': { bgcolor: '#fff7ea' },
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <IconButton
            aria-label="Next events"
            onClick={() => scrollSlider('right')}
            sx={{
              position: { xs: 'static', md: 'absolute' },
              right: 0,
              top: '50%',
              transform: { md: 'translateY(-50%)' },
              mb: { xs: 2, md: 0 },
              ml: { xs: 1, md: 0 },
              bgcolor: colors.bgSoft,
              border: '1px solid rgba(139,107,46,0.16)',
              color: colors.ivory,
              width: 52,
              height: 52,
              zIndex: 2,
              '&:hover': { bgcolor: '#fff7ea' },
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>

          <Box
            ref={sliderRef}
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: 2,
              overflowX: 'auto',
              px: 0.5,
              pb: 2.25,
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} onBook={(id) => navigate(`/event/${id}`)} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
