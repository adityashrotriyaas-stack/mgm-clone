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
import PhotoCaptureField from './PhotoCaptureField'
import NonRefundableCheckbox from './NonRefundableCheckbox'
import MobileNumberField from './MobileNumberField'
import AadhaarNumberField from './AadhaarNumberField'
import { upcomingEvents, registrationCategories, passOptions, navratriNights } from '../data/siteData'
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
      'Discover the latest innovations in fertilizers and crop nutrition',
      'Connect with global industry leaders and decision-makers',
      'Explore emerging technologies and sustainable solutions',
      'Gain valuable insights from expert speakers and industry professionals',
      'Build strategic partnerships and expand your business network',
      'Access new market opportunities and potential collaborations',
    ],
    highlights: [
      'International B2B Exhibition',
      'Industry Expert Conference Sessions',
      'Product Launches & Live Demonstrations',
      'Networking Opportunities',
      'Global Exhibitors & Delegates',
      'Business Matchmaking Sessions',
    ],
    singer: {
      name: 'Raj Gadhvi',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop',
    },
    organizer: {
      name: 'MGM Event',
      mark: 'R',
    },
    layoutZones: ['Main Stage', 'Fanpit Zone', 'VIP Lounge', 'Food Court', 'Entry Gate'],
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

Couples gather for partner Dandiya workshops before the main circle begins. Learn the steps together, find your rhythm, and then join the larger Garba circle as the night takes over.`,
    whyAttend: [
      'Enjoy a special date-night experience during Navratri',
      'Learn Dandiya steps together in partner workshops',
      'Reserved couple seating zone',
      'Complimentary welcome mocktail per couple',
      'Dance in a romantic Garba circle',
      'Capture the night at themed photo installations',
    ],
    highlights: [
      'Couple Dandiya Workshop',
      'Romantic Garba Circle',
      'Complimentary Mocktail per Couple',
      'Reserved Couple Seating',
      'Fairy-Light Themed Decor',
      'Live Folk & Romantic Beats',
    ],
    singer: {
      name: 'Aishwarya Majmudar',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop',
    },
    organizer: {
      name: 'MGM Event',
      mark: 'R',
    },
    layoutZones: ['Couple Zone', 'Main Stage', 'Mocktail Bar', 'Photo Booth', 'Entry Gate'],
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

Night five turns up the tempo. Bollywood Beats blends the soul of folk tradition with the pulse of contemporary music — creating a high-energy night that keeps the ground moving until 2 AM.`,
    whyAttend: [
      'Dance to Bollywood anthems fused with live folk beats',
      'Experience the LED dance floor with synchronised light shows',
      'Join the Bollywood costume contest',
      'Extended hours until 2 AM',
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
    singer: {
      name: 'Parthiv Gohil',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop',
    },
    organizer: {
      name: 'MGM Event',
      mark: 'R',
    },
    layoutZones: ['LED Dance Floor', 'Main Stage', 'Food Court', 'Lounge Deck', 'Entry Gate'],
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

Ten nights lead to this one moment. The Grand Finale of MGM Cultural Navratri begins with a sacred Maha Aarti — a powerful ceremony of light, sound, and collective prayer that fills the entire venue with devotion.`,
    whyAttend: [
      'Witness the sacred Maha Aarti ceremony',
      'Enjoy a grand fireworks display',
      'Watch live finale performances',
      'Receive a premium welcome gift pack',
      'Be part of the final Garba circle',
      'Experience the most spectacular closing night',
    ],
    highlights: [
      'Sacred Maha Aarti Ceremony',
      'Grand Fireworks Display',
      'Live Finale Performances',
      'Closing Garba Circle',
      'Premium Welcome Gift Pack',
      'Farewell Community Photo',
    ],
    singer: {
      name: 'Falguni Pathak Tribute Live',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&auto=format&fit=crop',
    },
    organizer: {
      name: 'MGM Event',
      mark: 'R',
    },
    layoutZones: ['Maha Aarti Stage', 'Premium Deck', 'Garba Arena', 'Food Court', 'Entry Gate'],
    cta: 'Book Premium Pass',
  },
}

const categoryKeys = ['male', 'female', 'couple']

const passModes = [
  { id: 'seasonal', title: 'Seasonal Pass', subtitle: '10 Nights Garba', data: passOptions.seasonal },
  { id: 'daily', title: 'Daily Pass', subtitle: '1 Night Garba', data: passOptions.daily },
]

const emptyPerson = () => ({
  name: '',
  mobile: '',
  email: '',
  aadhaar: '',
  selfiePreview: '',
})

function formatRupees(amount) {
  return `₹${new Intl.NumberFormat('en-IN').format(amount)}`
}

function getPriceAmount(price) {
  const digits = Number(String(price || '').replace(/[^\d]/g, ''))
  return Number.isFinite(digits) ? digits : 0
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#fff',
    color: '#000',
    borderRadius: '8px',
    '& fieldset': { borderColor: '#E5E4E9' },
    '&:hover fieldset': { borderColor: '#ccc' },
    '&.Mui-focused fieldset': { borderColor: '#ff9466' },
  },
  '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 },
  '& .MuiInputAdornment-root': { mr: 0.5 },
  '& .MuiSelect-select': { textAlign: 'left' },
}

function getNightLabel(nightId) {
  const night = navratriNights.find((item) => String(item.id) === String(nightId))
  if (!night) return ''
  return `${night.label} · ${night.date} · ${night.theme}`
}

function PersonFields({ title, person, onFieldChange, onPhotoChange }) {
  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      {title && (
        <Typography sx={{ fontWeight: 700, color: '#000', fontSize: '0.95rem', mb: 0.25 }}>
          {title}
        </Typography>
      )}
      <TextField required placeholder="Full Name" value={person.name} onChange={onFieldChange('name')} fullWidth />
      <MobileNumberField value={person.mobile} onChange={onFieldChange('mobile')} />
      <TextField required placeholder="Email Address" type="email" value={person.email} onChange={onFieldChange('email')} fullWidth />
      <PhotoCaptureField preview={person.selfiePreview} onChange={onPhotoChange} />
      <AadhaarNumberField value={person.aadhaar} onChange={onFieldChange('aadhaar')} />
    </Box>
  )
}

function DetailInfoCard({ title, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: '1.25rem' }}>
        {title}
      </Typography>
      <Box
        sx={{
          maxWidth: 360,
          bgcolor: '#fff',
          border: '1px solid #E5E4E9',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 8px 22px rgba(15, 23, 42, 0.08)',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

function EventLayoutCard({ zones = [] }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: '1.25rem' }}>
        Event Layout
      </Typography>
      <Box
        sx={{
          maxWidth: 420,
          bgcolor: '#fff',
          border: '1px solid #E5E4E9',
          borderRadius: '14px',
          p: 1.5,
          boxShadow: '0 8px 22px rgba(15, 23, 42, 0.08)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            minHeight: 190,
            background: 'linear-gradient(180deg, #F6A7C1 0 10%, #D7ED9A 10% 82%, #4A4F65 82% 100%)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <Box sx={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', fontWeight: 800, color: '#4B2D18', fontSize: '0.92rem' }}>
            Main Stage
          </Box>
          <Box sx={{ position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)', px: 1.5, py: 0.75, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.68)', color: '#4B2D18', fontWeight: 700, fontSize: '0.82rem' }}>
            Fanpit Zone
          </Box>
          <Box sx={{ position: 'absolute', left: 12, bottom: 18, px: 1.25, py: 0.65, borderRadius: '10px', bgcolor: 'rgba(0,0,0,0.36)', color: '#fff', fontSize: '0.76rem', fontWeight: 700 }}>
            Entry Gate
          </Box>
          <Box sx={{ position: 'absolute', right: 12, bottom: 18, px: 1.25, py: 0.65, borderRadius: '10px', bgcolor: 'rgba(0,0,0,0.36)', color: '#fff', fontSize: '0.76rem', fontWeight: 700 }}>
            Food Court
          </Box>
        </Box>
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 1.5 }}>
          {zones.map((zone) => (
            <Box
              key={zone}
              sx={{
                px: 1.1,
                py: 0.55,
                borderRadius: '999px',
                bgcolor: '#f8f9fa',
                border: '1px solid #E5E4E9',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: '#555',
              }}
            >
              {zone}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default function EventDetail() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const id = Number(eventId)
  const event = upcomingEvents.find(e => e.id === id)
  const info = eventInfo[id]
  const [tab, setTab] = useState('registration')
  const [regStep, setRegStep] = useState(0)
  const [passMode, setPassMode] = useState('')
  const [category, setCategory] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [personForm, setPersonForm] = useState(emptyPerson)
  const [secondPersonForm, setSecondPersonForm] = useState(emptyPerson)
  const [maleForm, setMaleForm] = useState(emptyPerson)
  const [femaleForm, setFemaleForm] = useState(emptyPerson)
  const [ticketCount, setTicketCount] = useState('1')
  const [acceptedNonRefundable, setAcceptedNonRefundable] = useState(false)
  const selected = category ? registrationCategories[category] : null
  const selectedPass = passModes.find((item) => item.id === passMode)
  const isSeasonalPass = passMode === 'seasonal'
  const pricingSource = isSeasonalPass ? selectedPass?.data : selected
  const isCoupleCategory = category === 'couple'
  const pricingMultiplier = isCoupleCategory ? 1 : Number(ticketCount || 1)
  const totalTickets = isCoupleCategory ? 2 : Number(ticketCount || 1)
  const totalPrice = formatRupees(getPriceAmount(pricingSource?.price) * pricingMultiplier)

  const scrollToRegistration = () => {
    setTab('registration')
    setRegStep(0)
    setTimeout(() => {
      document.getElementById('event-registration')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const makeFieldUpdater = (setter) => (field) => (event) => {
    let value = event.target.value
    if (field === 'mobile') {
      value = value.replace(/\D/g, '').slice(0, 10)
    }
    if (field === 'aadhaar') {
      value = value.replace(/\D/g, '').slice(0, 12)
    }
    setter((prev) => ({ ...prev, [field]: value }))
  }

  const makePhotoUpdater = (setter) => (previewUrl) => {
    setter((prev) => {
      if (prev.selfiePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(prev.selfiePreview)
      }
      return { ...prev, selfiePreview: previewUrl }
    })
  }

  const isPersonComplete = (person) =>
    person.name &&
    person.mobile.length === 10 &&
    person.email &&
    person.aadhaar.length === 12 &&
    person.selfiePreview

  const canSubmitForm = () => {
    if (!acceptedNonRefundable) return false
    if (!isSeasonalPass && !selectedDay) return false
    if (isCoupleCategory) {
      return isPersonComplete(maleForm) && isPersonComplete(femaleForm)
    }
    if (ticketCount === '2') {
      return isPersonComplete(personForm) && isPersonComplete(secondPersonForm)
    }
    return isPersonComplete(personForm)
  }

  const selectCategory = (key) => {
    setCategory(key)
    setTicketCount(key === 'couple' ? '2' : '1')
    setRegStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmitForm()) return

    const passLabel = selectedPass?.data.title || passMode
    const dayDetails = !isSeasonalPass && selectedDay
      ? {
          selectedDay,
          selectedDayLabel: getNightLabel(selectedDay),
        }
      : {}
    const registration =
      isCoupleCategory
        ? {
            category,
            passMode,
            passLabel,
            passPrice: totalPrice,
            passPriceUnit: pricingSource?.priceUnit,
            ticketCount: totalTickets,
            eventId: id,
            male: maleForm,
            female: femaleForm,
            name: `${maleForm.name} & ${femaleForm.name}`,
            mobile: maleForm.mobile,
            email: maleForm.email,
            ...dayDetails,
          }
        : {
            category,
            passMode,
            passLabel,
            passPrice: totalPrice,
            passPriceUnit: pricingSource?.priceUnit,
            ticketCount: totalTickets,
            eventId: id,
            ...personForm,
            secondGuest: ticketCount === '2' ? secondPersonForm : null,
            ...dayDetails,
          }

    navigate(`/book?event=${eventId}`, { state: { registration } })
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
    <Box sx={{ bgcolor: '#FFFDF8', minHeight: '100vh', overflowX: 'clip' }}>
      {/* Top Bar */}
      <Box sx={{ borderBottom: '1px solid #E5E4E9' }}>
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

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, sm: 2.5, md: 3 } }}>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {/* Left — Event Image & Title */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '18/10',
              borderRadius: { xs: '14px', md: '20px' },
              overflow: 'hidden',
              bgcolor: '#f5f5f5',
            }}>
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

            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1} sx={{ mt: 2, mb: 1 }}>
              <Typography sx={{ fontWeight: 700, color: '#000', fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.625rem' }, lineHeight: 1.25, flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
                {event.title}
              </Typography>
              <ShareRoundedIcon sx={{ color: '#000', fontSize: '1.25rem', cursor: 'pointer', flexShrink: 0, mt: 0.25 }} />
            </Stack>

            <Stack direction="row" spacing={1}>
              <Chip label={event.night} sx={{ bgcolor: '#1F1F1F', color: '#fff', fontWeight: 500, fontSize: '0.8125rem', borderRadius: '6px', textTransform: 'none' }} />
            </Stack>
          </Grid>

          {/* Right — Booking Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              border: '1px solid #E5E4E9',
              borderRadius: { xs: '10px', md: '12px' },
              p: { xs: 2, md: 2.5 },
              position: { xs: 'static', md: 'sticky' },
              top: { md: 24 },
            }}>
              <Stack spacing={2}>
                <Box>
                  <Typography sx={{ fontSize: { xs: '1.35rem', md: '1.5rem' }, fontWeight: 700, color: '#000' }}>
                    {info.price}
                    <Box component="span" sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#777', ml: 0.5 }}>onwards</Box>
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' }, color: '#555', mt: 0.5, lineHeight: 1.55, wordBreak: 'break-word' }}>
                    {info.ticketInfo}
                  </Typography>
                </Box>

                <Button
                  onClick={scrollToRegistration}
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    minHeight: 48,
                    borderRadius: '8px',
                    background: '#1F1F1F',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    textTransform: 'none',
                    '&:hover': { background: '#333' },
                  }}
                >
                  <ConfirmationNumberRoundedIcon sx={{ mr: 1, fontSize: '1.25rem' }} />
                  {info.cta}
                </Button>

                <Divider />

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
                      <Box component="span" sx={{ color: '#000', fontWeight: 600, fontSize: '0.8125rem' }}>✓</Box>
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
              onClick={() => setTab('registration')}
              sx={{
                py: 1.5,
                px: { xs: 2.5, sm: 3 },
                flex: 1,
                maxWidth: 200,
                minHeight: 48,
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
            <Button
              onClick={() => setTab('info')}
              sx={{
                py: 1.5,
                px: { xs: 2.5, sm: 3 },
                flex: 1,
                maxWidth: 200,
                minHeight: 48,
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
          </Stack>
        </Container>
      </Box>

      {/* Tab Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, sm: 2.5, md: 3 } }}>
        {tab === 'info' ? (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: '1.25rem' }}>About</Typography>
              <Typography sx={{ color: '#555', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: '0.9375rem' }}>
                {info.description}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: '1.25rem' }}>Why Attend</Typography>
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 2, fontSize: '1.25rem' }}>Event Highlights</Typography>
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

            <Divider sx={{ mb: 3 }} />

            <DetailInfoCard title="Singer">
              <Box
                component="img"
                src={info.singer.image}
                alt={info.singer.name}
                sx={{ width: '100%', height: 150, objectFit: 'cover', display: 'block' }}
              />
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 700, color: '#000', fontSize: '1rem' }}>
                  {info.singer.name}
                </Typography>
              </Box>
            </DetailInfoCard>

            <Divider sx={{ mb: 3 }} />

            <DetailInfoCard title="Organized by">
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 1.5,
                    borderRadius: '16px',
                    border: '1px solid #E5E4E9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '3rem',
                    color: '#4B2D18',
                    position: 'relative',
                  }}
                >
                  {info.organizer.mark}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      border: '4px solid #D4AF37',
                      left: 18,
                      top: 18,
                      opacity: 0.9,
                    }}
                  />
                </Box>
                <Typography sx={{ fontWeight: 700, color: '#000', fontSize: '1rem' }}>
                  {info.organizer.name}
                </Typography>
              </Box>
            </DetailInfoCard>

            <Divider sx={{ mb: 3 }} />

            <EventLayoutCard zones={info.layoutZones} />
          </Box>
        ) : (
          <Box id="event-registration" sx={{ maxWidth: 600, mx: 'auto', width: '100%' }}>
            <Box sx={{ border: '1px solid #E5E4E9', borderRadius: { xs: '10px', md: '12px' }, p: { xs: 1.75, sm: 2, md: 3 } }}>
              <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 3 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', mb: 0.5, fontSize: { xs: '1.15rem', md: '1.5rem' } }}>
                  Reserve Your Spot
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#777' }}>
                  {regStep === 0 && 'Step 1 — Choose your pass type'}
                  {regStep === 1 && 'Step 2 — Choose your category'}
                  {regStep === 2 && 'Step 3 — Fill registration details'}
                </Typography>
              </Box>

              <Stack direction="row" spacing={0.75} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: { xs: 2, md: 3 } }}>
                {['Pass Type', 'Category', 'Details'].map((label, index) => (
                  <Box
                    key={label}
                    sx={{
                      px: { xs: 1, sm: 1.25 },
                      py: 0.5,
                      borderRadius: '50px',
                      fontSize: { xs: '0.65rem', sm: '0.72rem' },
                      fontWeight: 700,
                      bgcolor: regStep >= index ? '#1F1F1F' : '#f0f0f0',
                      color: regStep >= index ? '#fff' : '#777',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {index + 1}. {label}
                  </Box>
                ))}
              </Stack>

              {regStep === 0 && (
                <Stack spacing={1.5}>
                  {passModes.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => {
                        setPassMode(item.id)
                        if (item.id === 'seasonal') setSelectedDay('')
                        setRegStep(1)
                      }}
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 0.75, sm: 0 },
                        textAlign: 'left',
                        px: 2,
                        py: 1.75,
                        minHeight: 48,
                        borderRadius: '10px',
                        border: '1px solid #E5E4E9',
                        bgcolor: '#fff',
                        color: '#000',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#f8f9fa', borderColor: '#ff9466' },
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                        <Typography sx={{ fontSize: '0.82rem', color: '#777' }}>{item.subtitle}</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 800, color: '#000', alignSelf: { xs: 'flex-start', sm: 'center' } }}>{item.data.price}</Typography>
                    </Button>
                  ))}
                </Stack>
              )}

              {regStep === 1 && selectedPass && (
                <Stack spacing={2}>
                  <Box sx={{ bgcolor: '#f8f9fa', border: '1px solid #E5E4E9', borderRadius: '8px', p: 1.5, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#777', fontWeight: 600 }}>
                      Selected: {selectedPass.title}
                    </Typography>
                  </Box>

                  <Stack spacing={1}>
                    {categoryKeys.map((key) => {
                      const cat = registrationCategories[key]
                      const optionPrice = isSeasonalPass ? selectedPass.data : cat
                      return (
                        <Button
                          key={key}
                          onClick={() => selectCategory(key)}
                          sx={{
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 0.5, sm: 0 },
                            textAlign: 'left',
                            px: 2,
                            py: 1.5,
                            minHeight: 48,
                            borderRadius: '10px',
                            border: category === key ? '2px solid #1F1F1F' : '1px solid #E5E4E9',
                            bgcolor: category === key ? '#1F1F1F' : '#fff',
                            color: category === key ? '#fff' : '#000',
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: category === key ? '#333' : '#f8f9fa',
                              borderColor: category === key ? '#1F1F1F' : '#ff9466',
                            },
                          }}
                        >
                          <Box>
                            <Typography sx={{ fontWeight: 700, textTransform: 'capitalize' }}>{key}</Typography>
                            <Typography
                              sx={{
                                fontSize: '0.78rem',
                                color: category === key ? 'rgba(255,255,255,0.75)' : '#777',
                              }}
                            >
                              {cat.title}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontWeight: 800, alignSelf: { xs: 'flex-start', sm: 'center' } }}>
                            {optionPrice.price}
                            <Box
                              component="span"
                              sx={{
                                fontSize: '0.78rem',
                                fontWeight: 500,
                                ml: 0.25,
                                color: category === key ? 'rgba(255,255,255,0.75)' : '#777',
                              }}
                            >
                              {optionPrice.priceUnit}
                            </Box>
                          </Typography>
                        </Button>
                      )
                    })}
                  </Stack>

                  <Button
                    onClick={() => setRegStep(0)}
                    fullWidth
                    sx={{ py: 1.35, minHeight: 48, borderRadius: '8px', border: '1px solid #E5E4E9', color: '#555', textTransform: 'none' }}
                  >
                    Back
                  </Button>
                </Stack>
              )}

              {regStep === 2 && selected && selectedPass && (
                <Box component="form" onSubmit={handleSubmit} sx={fieldSx}>
                  <Box sx={{ bgcolor: '#f8f9fa', border: '1px solid #E5E4E9', borderRadius: '8px', p: 1.5, mb: 2.5, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.82rem', color: '#555' }}>
                      {selectedPass.title} · {selected.title}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, color: '#000' }}>{totalPrice}{pricingSource?.priceUnit}</Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: '#777', mt: 0.5 }}>
                      {totalTickets} ticket{totalTickets > 1 ? 's' : ''}
                    </Typography>
                    {!isSeasonalPass && selectedDay && (
                      <Typography sx={{ fontSize: '0.78rem', color: '#777', mt: 0.75 }}>
                        {getNightLabel(selectedDay)}
                      </Typography>
                    )}
                  </Box>

                  {!isSeasonalPass && (
                    <FormControl fullWidth required sx={{ mb: 2 }}>
                      <Select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        displayEmpty
                        renderValue={(value) =>
                          value ? getNightLabel(value) : <Box sx={{ color: '#999' }}>Select Day</Box>
                        }
                        inputProps={{ 'aria-label': 'Select Day' }}
                        sx={{
                          bgcolor: '#fff',
                          color: selectedDay ? '#000' : '#999',
                          borderRadius: '8px',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E4E9' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9466' },
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Day
                        </MenuItem>
                        {navratriNights.map((night) => (
                          <MenuItem key={night.id} value={String(night.id)}>
                            {night.label} · {night.date} · {night.theme}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  <FormControl fullWidth required sx={{ mb: 2 }}>
                    <Select
                      value={ticketCount}
                      onChange={(e) => setTicketCount(e.target.value)}
                      disabled={isCoupleCategory}
                      inputProps={{ 'aria-label': 'Number of Tickets' }}
                      sx={{
                        bgcolor: '#fff',
                        color: '#000',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E4E9' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9466' },
                      }}
                    >
                      {!isCoupleCategory && <MenuItem value="1">1 Ticket</MenuItem>}
                      <MenuItem value="2">2 Tickets</MenuItem>
                    </Select>
                  </FormControl>
                  {isCoupleCategory && (
                    <Typography sx={{ fontSize: '0.78rem', color: '#777', mb: 2 }}>
                      Couple pass includes 2 tickets.
                    </Typography>
                  )}

                  {isCoupleCategory ? (
                    <Stack spacing={3}>
                      <PersonFields
                        title="Male Details"
                        person={maleForm}
                        onFieldChange={makeFieldUpdater(setMaleForm)}
                        onPhotoChange={makePhotoUpdater(setMaleForm)}
                      />
                      <Divider />
                      <PersonFields
                        title="Female Details"
                        person={femaleForm}
                        onFieldChange={makeFieldUpdater(setFemaleForm)}
                        onPhotoChange={makePhotoUpdater(setFemaleForm)}
                      />
                    </Stack>
                  ) : (
                    <Stack spacing={3}>
                      <PersonFields
                        title={ticketCount === '2' ? 'Ticket 1 Details' : category === 'male' ? 'Male Details' : 'Female Details'}
                        person={personForm}
                        onFieldChange={makeFieldUpdater(setPersonForm)}
                        onPhotoChange={makePhotoUpdater(setPersonForm)}
                      />
                      {ticketCount === '2' && (
                        <>
                          <Divider />
                          <PersonFields
                            title="Ticket 2 Details"
                            person={secondPersonForm}
                            onFieldChange={makeFieldUpdater(setSecondPersonForm)}
                            onPhotoChange={makePhotoUpdater(setSecondPersonForm)}
                          />
                        </>
                      )}
                    </Stack>
                  )}

                  <Box sx={{ mt: 2.5 }}>
                    <NonRefundableCheckbox
                      checked={acceptedNonRefundable}
                      onChange={setAcceptedNonRefundable}
                    />
                  </Box>

                  <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ mt: 2 }}>
                    <Button
                      type="button"
                      onClick={() => setRegStep(1)}
                      sx={{ flex: 1, py: 1.5, minHeight: 48, borderRadius: '8px', border: '1px solid #E5E4E9', color: '#555', textTransform: 'none' }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={!canSubmitForm()}
                      sx={{
                        flex: { xs: 1, sm: 2 },
                        py: 1.5,
                        minHeight: 48,
                        borderRadius: '8px',
                        background: '#1F1F1F',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        textTransform: 'none',
                        '&:hover': { background: '#333' },
                        '&.Mui-disabled': { bgcolor: '#ccc', color: '#fff' },
                      }}
                    >
                      Proceed to Payment
                    </Button>
                  </Stack>
                </Box>
              )}
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