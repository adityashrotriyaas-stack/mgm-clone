import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded'
import { colors, gradients } from '../constants/colors'
import { upcomingEvents } from '../data/siteData'

const eventInfo = {
  1: {
    description: 'Get ready for the most colorful night of Navratri! Rangeeli Raat is all about vibrant energy, traditional Garba swings, and non-stop dhol beats. Come dressed in your brightest attire and lose yourself in the rhythm of the night.',
    highlights: [
      'Live Dhol & Folk Orchestra',
      'Garba Competition with Prizes',
      'Themed Decor — Rangoli & Lights',
      'Photobooth & Selfie Points',
    ],
    venue: 'Seasons Hotel, Rajkot',
    includes: 'Welcome tilak, entry to grounds, access to food & handicraft stalls',
  },
  2: {
    description: 'A night crafted for couples! Dhoom Dhamaka brings a romantic yet festive atmosphere with special couple-friendly Garba rounds, partner Dandiya games, and a enchanting evening under the stars.',
    highlights: [
      'Couple Dandiya Workshops',
      'Romantic Garba Circle',
      'Complimentary Mocktail per Couple',
      'Reserved Couple Seating Zone',
    ],
    venue: 'Seasons Hotel, Rajkot',
    includes: 'Entry for 2, reserved seating, welcome tilak, complimentary mocktail coupon',
  },
  3: {
    description: 'Bollywood meets Garba! Dance to the hottest Bollywood remixes mixed with traditional folk beats. Our live DJ keeps the energy soaring all night long with a perfect blend of retro and current chartbusters.',
    highlights: [
      'Live DJ spinning Bollywood & Folk',
      'LED Dance Floor Experience',
      'Bollywood Costume Contest',
      'Late-Night High-Energy Session',
    ],
    venue: 'Seasons Hotel, Rajkot',
    includes: 'Entry to grounds, welcome tilak, access to all stalls & dance floor',
  },
  4: {
    description: 'The grand finale of MGM Cultural Navratri! Witness the majestic Maha Aarti followed by an extravagant closing ceremony featuring fireworks, live performances, and a massive Garba circle that celebrates the spirit of nine nights.',
    highlights: [
      'Maha Aarti Ceremony',
      'Grand Fireworks Display',
      'Live Performances by Renowned Artists',
      'Closing Garba Circle — All Are Welcome',
    ],
    venue: 'Seasons Hotel, Rajkot',
    includes: 'Premium entry, aarti participation, fireworks viewing, welcome gift pack',
  },
}

export default function EventDetail() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const id = Number(eventId)
  const event = upcomingEvents.find(e => e.id === id)
  const info = eventInfo[id]

  if (!event || !info) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">Event not found</Typography>
        <Button onClick={() => navigate('/')} variant="contained">Back to Home</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: colors.bg, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: colors.bgSoft, borderBottom: '1px solid rgba(139,107,46,0.15)' }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" sx={{ py: 1.5 }}>
            <Button
              onClick={() => navigate('/')}
              startIcon={<ChevronLeftRoundedIcon />}
              sx={{ color: colors.teal, fontWeight: 600, textTransform: 'none' }}
            >
              Back to Home
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Hero Image */}
      <Box
        sx={{
          height: { xs: 240, sm: 360, md: 420 },
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(255,253,248,0) 50%, rgba(255,253,248,1) 100%)',
          },
        }}
      />

      {/* Event Content */}
      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Left — Main Info */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: { xs: 2.5, md: 4 }, boxShadow: '0 4px 24px rgba(139,107,46,0.1)' }}>
              <Typography
                sx={{
                  display: 'inline-block',
                  px: 1.5,
                  py: 0.5,
                  bgcolor: colors.marigold,
                  color: '#fff',
                  borderRadius: 2,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  mb: 2,
                }}
              >
                {event.night}
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: 800, color: colors.ivory, mb: 2 }}>
                {event.title}
              </Typography>

              <Stack spacing={1.5} sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CalendarMonthRoundedIcon sx={{ color: colors.teal, fontSize: '1.2rem' }} />
                  <Typography sx={{ color: colors.regBrown }}>{event.date.replace('🗓️ ', '')}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeRoundedIcon sx={{ color: colors.teal, fontSize: '1.2rem' }} />
                  <Typography sx={{ color: colors.regBrown }}>{event.time.replace('🕰️ ', '')}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnRoundedIcon sx={{ color: colors.teal, fontSize: '1.2rem' }} />
                  <Typography sx={{ color: colors.regBrown }}>{info.venue}</Typography>
                </Stack>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.ivory, mb: 1.5 }}>
                About This Event
              </Typography>
              <Typography sx={{ color: colors.regBrown, lineHeight: 1.7, mb: 3 }}>
                {info.description}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.ivory, mb: 1.5 }}>
                Event Highlights
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { mb: 1, color: colors.regBrown } }}>
                {info.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right — Booking Card */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{
              bgcolor: '#fff',
              borderRadius: 3,
              p: { xs: 2.5, md: 3.5 },
              boxShadow: '0 4px 24px rgba(139,107,46,0.1)',
              position: 'sticky',
              top: 24,
            }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: colors.ivory, mb: 0.5 }}>
                {event.price}
                <Box component="span" sx={{ fontSize: '0.9rem', fontWeight: 500, color: colors.muted }}>
                  {event.priceUnit}
                </Box>
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: colors.regBrown, mb: 2.5 }}>
                {info.includes}
              </Typography>

              <Button
                fullWidth
                size="large"
                sx={{
                  py: 1.8,
                  borderRadius: 2,
                  background: gradients.primary,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  mb: 1.5,
                  '&:hover': { background: gradients.primary, filter: 'brightness(1.08)' },
                }}
              >
                <ConfirmationNumberRoundedIcon sx={{ mr: 1 }} />
                Book Now — {event.price}
              </Button>

              <Typography sx={{ textAlign: 'center', fontSize: '0.75rem', color: colors.muted }}>
                Confirmation will be sent via SMS & Email
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography sx={{ fontWeight: 700, color: colors.ivory, mb: 1.5, fontSize: '0.9rem' }}>
                What's Included
              </Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {[
                  'Entry for 1 person',
                  'Welcome tilak & kalash blessing',
                  'Access to food & handicraft stalls',
                  'Free parking at venue',
                ].map((item, i) => (
                  <Stack key={i} direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Box component="span" sx={{ color: colors.marigold, fontWeight: 700 }}>✓</Box>
                    <Typography sx={{ fontSize: '0.85rem', color: colors.regBrown }}>{item}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: colors.bgSoft, mt: 6, py: 4, textAlign: 'center', borderTop: '1px solid rgba(139,107,46,0.1)' }}>
        <Typography sx={{ color: colors.regBrown, fontSize: '0.85rem' }}>
          © 2026 MGM Cultural Navratri. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}
