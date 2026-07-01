import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded'
import { colors, gradients } from '../constants/colors'
import { upcomingEvents, registrationCategories, passTypeOptions } from '../data/siteData'
import promoBanner from '../assets/image.png'

const eventInfo = {
  1: {
    dateRange: '13 Oct 2026',
    time: '7:30 PM – 1:00 AM',
    ticketInfo: 'Stag ₹499 | Couple ₹899 | Seasonal Pass Valid for All 10 Nights',
    venue: 'Seasons Hotel',
    location: 'Rajkot, Gujarat',
    price: '₹499',
    description: `About Rangeeli Raat

The third night of MGM Cultural Navratri is where the energy peaks. Rangeeli Raat — the colourful night — brings together devotion, dance, and dandiya under one open sky.

Hundreds gather in a single rhythmic circle as the dhol sets the beat and the air fills with the sound of clashing sticks and cheerful chants. From garba newbies dancing at the edge to seasoned raas performers spinning through the centre, every hand moves, every foot follows, and the circle never breaks.

The venue glows with rangoli, marigold strings, and diya-lined pathways. Folk artists take the stage between sets, keeping the spirit rooted in tradition. Stalls line the periphery with handcrafted souvenirs, fresh sugarcane juice, and hot kachori — because no night of garba is complete without a chai break at 1 AM.`,
    whyAttend: [
      'Dance in a massive live Garba circle with hundreds of participants',
      'Feel the energy of live Dhol & traditional folk orchestra',
      'Immerse in authentic Gujarati devotion through Garba & Raas',
      'Enjoy themed rangoli decor, photo zones, and diya-lit pathways',
      'Taste local favourites at food & handicraft stalls',
      'Make memories with family and friends under the Navratri sky',
    ],
    highlights: [
      'Live Dhol & Folk Orchestra',
      'Massive Community Garba Circle',
      'Rangoli & Marigold Decor',
      'Themed Photo Zones',
      'Food & Handicraft Stalls',
      'Late-Night Chai & Snacks',
    ],
    cta: 'Book Stag Pass',
  },
  2: {
    dateRange: '14 Oct 2026',
    time: '7:30 PM – 1:00 AM',
    ticketInfo: 'Couple ₹899 | Includes Complimentary Mocktail',
    venue: 'Seasons Hotel',
    location: 'Rajkot, Gujarat',
    price: '₹899',
    description: `About Dhoom Dhamaka

Night four is made for two. Dhoom Dhamaka is a celebration of togetherness — where love and tradition meet on the dance floor.

Couples gather for partner Dandiya workshops before the main circle begins. Learn the steps together, find your rhythm, and then join the larger Garba circle as the night takes over. The energy is festive, the mood is romantic, and every corner of the venue is designed for shared moments.

Reserved couple seating gives you space to rest between rounds. A complimentary mocktail awaits every couple at the welcome desk. Under the string lights and open sky, Dhoom Dhamaka is the perfect date night — Navratri-style.`,
    whyAttend: [
      'Enjoy a special date-night experience during Navratri',
      'Learn Dandiya steps together in partner workshops',
      'Reserved couple seating zone for breaks between dances',
      'Complimentary welcome mocktail per couple',
      'Dance together in a romantic Garba circle under fairy lights',
      'Capture the night at couple-themed photo installations',
    ],
    highlights: [
      'Couple Dandiya Workshop',
      'Romantic Garba Circle',
      'Complimentary Mocktail per Couple',
      'Reserved Couple Seating',
      'Fairy-Light Themed Decor',
      'Live Folk & Romantic Beats',
    ],
    cta: 'Book Couple Pass',
  },
  3: {
    dateRange: '15 Oct 2026',
    time: '7:30 PM – 2:00 AM',
    ticketInfo: 'Stag ₹599 | Entry to All Stalls Included',
    venue: 'Seasons Hotel',
    location: 'Rajkot, Gujarat',
    price: '₹599',
    description: `About Bollywood Beats

Night five turns up the tempo. Bollywood Beats blends the soul of folk tradition with the pulse of contemporary music — creating a high-energy night that keeps the ground moving until 2 AM.

A live DJ spins Bollywood chartbusters fused with folk dhol loops, while the LED dance floor lights up in sync with every drop. The Garba circle still holds strong, but now it shares the floor with Bollywood-style dance-offs, costume contests, and a crowd that feeds on energy.

Come dressed in your best fusion wear — traditional meets trendy. Show off your moves, compete for fun prizes, and experience Navratri the way a new generation celebrates it: rooted in tradition, alive with energy.`,
    whyAttend: [
      'Dance to Bollywood anthems fused with live folk beats',
      'Experience the LED dance floor with synchronised light shows',
      'Join the Bollywood costume contest — win exciting prizes',
      'Extended hours until 2 AM for the night owls',
      'Perfect fusion of tradition and contemporary energy',
      'High-energy crowd, incredible atmosphere',
    ],
    highlights: [
      'Live DJ — Bollywood & Folk Fusion',
      'LED Dance Floor with Light Show',
      'Bollywood Costume Contest',
      'Extended Session til 2 AM',
      'Fusion-Themed Stage Decor',
      'Late-Night Snack Counters Open',
    ],
    cta: 'Book Your Pass',
  },
  4: {
    dateRange: '20 Oct 2026',
    time: '7:00 PM – 1:00 AM',
    ticketInfo: 'Premium ₹1,299 | Includes Welcome Gift Pack',
    venue: 'Seasons Hotel',
    location: 'Rajkot, Gujarat',
    price: '₹1,299',
    description: `About Maha Aarti & Grand Finale

Ten nights lead to this one moment. The Grand Finale of MGM Cultural Navratri begins with a sacred Maha Aarti — a powerful ceremony of light, sound, and collective prayer that fills the entire venue with devotion.

As the aarti concludes, the celebration erupts into a spectacular finale. Fireworks light up the sky above Seasons Hotel. Renowned folk artists take the stage one last time. The final Garba circle of the season opens wide, inviting every guest to dance — from first-timers to the most dedicated Raas performers.

Every attendee receives a premium welcome gift pack as a token of gratitude. The night ends not with a closing, but with a promise to return next year.`,
    whyAttend: [
      'Witness the sacred Maha Aarti ceremony with hundreds of lamps',
      'Enjoy a grand fireworks display over Seasons Hotel',
      'Watch live finale performances by renowned folk artists',
      'Receive a premium welcome gift pack at entry',
      'Be part of the final Garba circle of Navratri 2026',
      'Experience the most spectacular closing night of the season',
    ],
    highlights: [
      'Sacred Maha Aarti Ceremony',
      'Grand Fireworks Display',
      'Live Finale Performances',
      'Closing Garba Circle',
      'Premium Welcome Gift Pack',
      'Farewell Community Photo',
    ],
    cta: 'Book Premium Pass',
  },
}

const categoryKeys = ['male', 'female', 'couple']

export default function EventDetail() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const id = Number(eventId)
  const event = upcomingEvents.find(e => e.id === id)
  const info = eventInfo[id]
  const [tab, setTab] = useState('info')
  const [category, setCategory] = useState('male')
  const [passType, setPassType] = useState('')
  const selected = registrationCategories[category]

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  if (!event || !info) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">Event not found</Typography>
        <Button onClick={() => navigate('/')} variant="contained">Back to Home</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: colors.heroCream, minHeight: '100vh' }}>
      {/* Top Bar */}
      <Box sx={{ borderBottom: '1px solid #E5E4E9', bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" sx={{ py: 1 }}>
            <Button
              onClick={() => navigate('/')}
              startIcon={<ChevronLeftRoundedIcon />}
              sx={{ color: '#000', fontWeight: 500, textTransform: 'none', fontSize: '0.875rem', '&:hover': { bgcolor: 'transparent' } }}
            >
              Back
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Hero + Booking Card Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        <Grid container spacing={2}>
          {/* Left Column — Event Image & Title */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '18/10',
                borderRadius: '20px',
                overflow: 'hidden',
                bgcolor: '#f5f5f5',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${promoBanner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Box>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2, mb: 1 }}>
              <Typography variant="h1" sx={{ fontWeight: 700, color: '#000', fontSize: { xs: '1.25rem', md: '1.625rem' }, lineHeight: 1.2 }}>
                {event.title}
              </Typography>
              <ShareRoundedIcon sx={{ color: '#000', fontSize: '1.25rem', cursor: 'pointer' }} />
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
              <Chip label={event.night} sx={{ bgcolor: '#1F1F1F', color: '#fff', fontWeight: 500, fontSize: '0.8125rem', borderRadius: '6px', textTransform: 'none' }} />
            </Stack>
          </Grid>

          {/* Right Column — Booking Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              border: '1px solid #E5E4E9',
              bgcolor: '#fff',
              borderRadius: { xs: '10px', md: '12px' },
              p: { xs: 2, md: 2.5 },
              position: 'sticky',
              top: 24,
            }}>
              <Stack spacing={2}>
                <Box>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#000' }}>
                    {info.price}
                    <Box component="span" sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#777', ml: 0.5 }}>
                      onwards
                    </Box>
                  </Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: '#555', mt: 0.5 }}>
                    {info.ticketInfo}
                  </Typography>
                </Box>

                <Button
                  onClick={() => setTab('registration')}
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: '8px',
                    background: gradients.primary,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    textTransform: 'none',
                    '&:hover': { background: gradients.primary, filter: 'brightness(1.08)' },
                  }}
                >
                  <ConfirmationNumberRoundedIcon sx={{ mr: 1, fontSize: '1.25rem' }} />
                  {info.cta}
                </Button>

                <Divider sx={{ my: 1 }} />

                <Typography sx={{ fontWeight: 600, color: '#000', fontSize: '0.875rem' }}>
                  What's Included
                </Typography>
                <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                  {[
                    'Entry to event grounds',
                    'Welcome tilak & kalash blessing',
                    'Access to food & handicraft stalls',
                    'Free parking at venue',
                    '24/7 customer support',
                  ].map((item, i) => (
                    <Stack key={i} direction="row" spacing={1} sx={{ mb: 0.5 }}>
                      <Box component="span" sx={{ color: colors.marigold, fontWeight: 600, fontSize: '0.8125rem' }}>✓</Box>
                      <Typography sx={{ fontSize: '0.8125rem', color: '#555' }}>{item}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid #E5E4E9' }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={0} sx={{ justifyContent: 'center' }}>
            <Button
              onClick={() => setTab('info')}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 0,
                fontWeight: tab === 'info' ? 600 : 400,
                fontSize: '1rem',
                textTransform: 'none',
                color: tab === 'info' ? '#ff9466' : '#777',
                borderBottom: tab === 'info' ? '3px solid #ff9466' : '3px solid transparent',
                '&:hover': { bgcolor: 'transparent' },
              }}
            >
              Info
            </Button>
            <Button
              onClick={() => setTab('registration')}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 0,
                fontWeight: tab === 'registration' ? 600 : 400,
                fontSize: '1rem',
                textTransform: 'none',
                color: tab === 'registration' ? '#ff9466' : '#777',
                borderBottom: tab === 'registration' ? '3px solid #ff9466' : '3px solid transparent',
                '&:hover': { bgcolor: 'transparent' },
              }}
            >
              Registration
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Tab Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        {tab === 'info' ? (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: '1.25rem' }}>
                About
              </Typography>
              <Typography sx={{ color: '#555', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: '0.9375rem' }}>
                {info.description}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: '1.25rem' }}>
                Why Attend
              </Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {info.whyAttend.map((item, i) => (
                  <Stack key={i} direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
                    <Box component="span" sx={{ color: '#22c55e', fontWeight: 600, fontSize: '1rem' }}>✅</Box>
                    <Typography sx={{ color: '#555', lineHeight: 1.6, fontSize: '0.9375rem' }}>{item}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: '1.25rem' }}>
                Event Highlights
              </Typography>
              <Grid container spacing={1.5}>
                {info.highlights.map((item, i) => (
                  <Grid key={i} size={{ xs: 12, sm: 6 }}>
                    <Stack direction="row" spacing={1} sx={{ p: 1.5, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                      <Box component="span" sx={{ color: '#ff9466', fontWeight: 700, fontSize: '1rem' }}>📌</Box>
                      <Typography sx={{ color: '#555', fontSize: '0.9375rem' }}>{item}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Box sx={{
              border: '1px solid #E5E4E9',
              borderRadius: '12px',
              p: { xs: 2, md: 3 },
            }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 0.5 }}>
                  Reserve Your Spot
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#777' }}>
                  Pick a category — pricing and perks update instantly.
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  bgcolor: '#f5f5f5',
                  borderRadius: '8px',
                  p: 0.5,
                  mb: 2,
                }}
              >
                {categoryKeys.map((key) => (
                  <Button
                    key={key}
                    role="tab"
                    aria-selected={category === key}
                    onClick={() => setCategory(key)}
                    sx={{
                      flex: 1,
                      py: 1,
                      borderRadius: '6px',
                      color: category === key ? '#fff' : '#555',
                      bgcolor: category === key ? '#1F1F1F' : 'transparent',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textTransform: 'capitalize',
                      '&:hover': {
                        bgcolor: category === key ? '#1F1F1F' : '#eaeaea',
                      },
                    }}
                  >
                    {key}
                  </Button>
                ))}
              </Stack>

              <Box sx={{
                bgcolor: '#f8f9fa',
                border: '1px solid #E5E4E9',
                borderRadius: '8px',
                p: 2,
                mb: 3,
                textAlign: 'center',
              }}>
                <Typography sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, color: '#777', fontWeight: 600 }}>
                  {selected.eyebrow}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#000', mt: 0.5 }}>
                  {selected.title}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#000', my: 1 }}>
                  {selected.price}
                  <Box component="span" sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#777' }}>
                    {selected.priceUnit}
                  </Box>
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.875rem', color: '#555' }}>
                  {selected.perks.map((perk) => (
                    <Box component="li" key={perk} sx={{ py: 0.5, pl: 2.5, position: 'relative', '&::before': { content: '"✦"', position: 'absolute', left: 0, color: '#22c55e', fontSize: '0.75rem' } }}>
                      {perk}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'grid',
                  gap: 1.5,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#fff',
                    color: '#000',
                    borderRadius: '8px',
                    '& fieldset': { borderColor: '#E5E4E9' },
                    '&:hover fieldset': { borderColor: '#ccc' },
                    '&.Mui-focused fieldset': { borderColor: '#ff9466' },
                  },
                  '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 },
                }}
              >
                <TextField required placeholder="Full Name" fullWidth />
                <TextField required placeholder="Mobile Number" type="tel" fullWidth />
                <TextField required placeholder="Email Address" type="email" fullWidth />
                <TextField required placeholder="Aadhaar Card Number" fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]{12}', maxLength: 12 }} />
                <FormControl fullWidth required>
                  <Select
                    value={passType}
                    onChange={(e) => setPassType(e.target.value)}
                    displayEmpty
                    renderValue={(v) => v ? v : <Box sx={{ color: '#999' }}>Select Pass Type</Box>}
                    inputProps={{ 'aria-label': 'Select Pass Type' }}
                    sx={{
                      bgcolor: '#fff',
                      color: passType ? '#000' : '#999',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E4E9' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9466' },
                    }}
                  >
                    <MenuItem value="" disabled>Select Pass Type</MenuItem>
                    {passTypeOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField required type="number" placeholder="Number of Tickets" inputProps={{ min: 1, max: 10 }} fullWidth />
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.5,
                    borderRadius: '8px',
                    background: gradients.primary,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    textTransform: 'none',
                    '&:hover': { background: gradients.primary, filter: 'brightness(1.08)' },
                  }}
                >
                  Proceed to Payment
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid #E5E4E9', bgcolor: '#f8f9fa', py: 3, textAlign: 'center' }}>
        <Typography sx={{ color: '#6F738B', fontSize: '0.9rem', fontWeight: 500 }}>
          Powered by MGM Cultural Navratri
        </Typography>
      </Box>
    </Box>
  )
}
