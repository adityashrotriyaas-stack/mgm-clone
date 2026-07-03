import { useEffect, useRef, useState } from 'react'
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
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded'
import MicIcon from '@mui/icons-material/Mic'
import BusinessIcon from '@mui/icons-material/Business'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import PhotoCaptureField from './PhotoCaptureField'
import ShareSheet from './ShareSheet'
import { colors, gradients } from '../constants/colors'
import { upcomingEvents, registrationCategories, passOptions, navratriNights } from '../data/siteData'
import promoBanner from '../assets/image.png'

const eventInfo = {
  1: {
    dateRange: '13 Oct 2026', time: '7:30 PM – 1:00 AM', ticketInfo: 'Stag ₹499 | Couple ₹899 | Seasonal Pass Valid for All 10 Nights',
    venue: 'Seasons Hotel', location: 'Rajkot, Gujarat', price: '₹499',
    description: `About Rangeeli Raat\n\nThe third night of MGM Cultural Navratri is where the energy peaks. Rangeeli Raat — the colourful night — brings together devotion, dance, and dandiya under one open sky.\n\nHundreds gather in a single rhythmic circle as the dhol sets the beat and the air fills with the sound of clashing sticks and cheerful chants. From garba newbies dancing at the edge to seasoned raas performers spinning through the centre, every hand moves, every foot follows, and the circle never breaks.\n\nThe venue glows with rangoli, marigold strings, and diya-lined pathways. Folk artists take the stage between sets, keeping the spirit rooted in tradition. Stalls line the periphery with handcrafted souvenirs, fresh sugarcane juice, and hot kachori — because no night of garba is complete without a chai break at 1 AM.`,
    whyAttend: ['Experience the most vibrant night of Garba and Dandiya', 'Dance under the open sky with hundreds of fellow celebrants', 'Enjoy live folk performances between Garba sets', 'Savour fresh sugarcane juice, kachori, and handcrafted souvenirs', 'Join a welcoming circle — beginners and experts alike', 'Capture the colourful night at themed photo spots'],
    highlights: ['Live Dhol & Folk Performances', 'Grand Garba Circle', 'Rangoli & Marigold-Themed Decor', 'Handicraft & Food Stalls', 'Professional Photo Installations', 'Late-Night Chai & Snacks'],
    cta: 'Book Stag Pass',
  },
  2: {
    dateRange: '14 Oct 2026', time: '7:30 PM – 1:00 AM', ticketInfo: 'Couple ₹899 | Includes Complimentary Mocktail',
    venue: 'Seasons Hotel', location: 'Rajkot, Gujarat', price: '₹899',
    description: `About Dhoom Dhamaka\n\nNight four is made for two. Dhoom Dhamaka is a celebration of togetherness — where love and tradition meet on the dance floor.\n\nCouples gather for partner Dandiya workshops before the main circle begins. Learn the steps together, find your rhythm, and then join the larger Garba circle as the night takes over.`,
    whyAttend: ['Enjoy a special date-night experience during Navratri', 'Learn Dandiya steps together in partner workshops', 'Reserved couple seating zone', 'Complimentary welcome mocktail per couple', 'Dance in a romantic Garba circle', 'Capture the night at themed photo installations'],
    highlights: ['Couple Dandiya Workshop', 'Romantic Garba Circle', 'Complimentary Mocktail per Couple', 'Reserved Couple Seating', 'Fairy-Light Themed Decor', 'Live Folk & Romantic Beats'],
    cta: 'Book Couple Pass',
  },
  3: {
    dateRange: '15 Oct 2026', time: '7:30 PM – 2:00 AM', ticketInfo: 'Stag ₹599 | Entry to All Stalls Included',
    venue: 'Seasons Hotel', location: 'Rajkot, Gujarat', price: '₹599',
    description: `About Bollywood Beats\n\nNight five turns up the tempo. Bollywood Beats blends the soul of folk tradition with the pulse of contemporary music — creating a high-energy night that keeps the ground moving until 2 AM.`,
    whyAttend: ['Dance to Bollywood anthems fused with live folk beats', 'Experience the LED dance floor with synchronised light shows', 'Join the Bollywood costume contest', 'Extended hours until 2 AM', 'Perfect fusion of tradition and contemporary energy', 'High-energy crowd, incredible atmosphere'],
    highlights: ['Live DJ — Bollywood & Folk Fusion', 'LED Dance Floor with Light Show', 'Bollywood Costume Contest', 'Extended Session til 2 AM', 'Fusion-Themed Stage Decor', 'Late-Night Snack Counters Open'],
    cta: 'Book Your Pass',
  },
  4: {
    dateRange: '20 Oct 2026', time: '7:00 PM – 1:00 AM', ticketInfo: 'Premium ₹1,299 | Includes Welcome Gift Pack',
    venue: 'Seasons Hotel', location: 'Rajkot, Gujarat', price: '₹1,299',
    description: `About Maha Aarti & Grand Finale\n\nTen nights lead to this one moment. The Grand Finale of MGM Cultural Navratri begins with a sacred Maha Aarti — a powerful ceremony of light, sound, and collective prayer that fills the entire venue with devotion.`,
    whyAttend: ['Witness the sacred Maha Aarti ceremony', 'Enjoy a grand fireworks display', 'Watch live finale performances', 'Receive a premium welcome gift pack', 'Be part of the final Garba circle', 'Experience the most spectacular closing night'],
    highlights: ['Sacred Maha Aarti Ceremony', 'Grand Fireworks Display', 'Live Finale Performances', 'Closing Garba Circle', 'Premium Welcome Gift Pack', 'Farewell Community Photo'],
    cta: 'Book Premium Pass',
  },
}

const categoryKeys = ['male', 'female', 'couple']
const passModes = [
  { id: 'seasonal', title: 'Seasonal Pass', subtitle: '10 Nights Garba', data: passOptions.seasonal },
  { id: 'daily', title: 'Daily Pass', subtitle: '1 Night Garba', data: passOptions.daily },
]

const emptyPerson = () => ({ name: '', mobile: '', email: '', aadhaar: '', selfiePreview: '' })

const fieldSx = {
  '& .MuiOutlinedInput-root': { bgcolor: colors.bg, color: colors.ivory, borderRadius: '10px', transition: 'box-shadow 0.2s, border-color 0.2s', '& fieldset': { borderColor: 'rgba(184,134,11,0.12)' }, '&:hover fieldset': { borderColor: 'rgba(184,134,11,0.25)' }, '&.Mui-focused fieldset': { borderColor: colors.gold }, '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(184,134,11,0.08)' } },
  '& .MuiInputBase-input::placeholder': { color: colors.muted, opacity: 1 },
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
      {title && <Typography sx={{ fontWeight: 700, color: colors.ivory, fontSize: '0.92rem', mb: 0.15, letterSpacing: '0.3px' }}>{title}</Typography>}
      <TextField required placeholder="Full Name" value={person.name} onChange={onFieldChange('name')} fullWidth />
      <TextField required placeholder="Mobile Number" type="tel" value={person.mobile} onChange={onFieldChange('mobile')} fullWidth />
      <TextField required placeholder="Email Address" type="email" value={person.email} onChange={onFieldChange('email')} fullWidth />
      <PhotoCaptureField preview={person.selfiePreview} onChange={onPhotoChange} />
      <TextField required placeholder="Aadhaar Card Number" value={person.aadhaar} onChange={onFieldChange('aadhaar')} fullWidth slotProps={{ htmlInput: { inputMode: 'numeric', pattern: '[0-9]{12}', maxLength: 12 } }} />
    </Box>
  )
}

export default function EventDetail() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const id = Number(eventId)
  const event = upcomingEvents.find(e => e.id === id)
  const info = eventInfo[id]
  const [tab, setTab] = useState('info')
  const [regStep, setRegStep] = useState(0)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [passMode, setPassMode] = useState('')
  const [category, setCategory] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [personForm, setPersonForm] = useState(emptyPerson)
  const [maleForm, setMaleForm] = useState(emptyPerson)
  const [femaleForm, setFemaleForm] = useState(emptyPerson)
  const selected = category ? registrationCategories[category] : null
  const selectedPass = passModes.find((item) => item.id === passMode)
  const isSeasonalPass = passMode === 'seasonal'
  const pricingSource = isSeasonalPass ? selectedPass?.data : selected

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 120)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToRegistration = () => { setTab('registration'); setRegStep(0); setTimeout(() => { document.getElementById('event-registration')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 100) }

  const makeFieldUpdater = (setter) => (field) => (event) => setter((prev) => ({ ...prev, [field]: event.target.value }))
  const makePhotoUpdater = (setter) => (previewUrl) => setter((prev) => { if (prev.selfiePreview?.startsWith('blob:')) { URL.revokeObjectURL(prev.selfiePreview) }; return { ...prev, selfiePreview: previewUrl } })
  const isPersonComplete = (person) => person.name && person.mobile && person.email && person.aadhaar.length === 12 && person.selfiePreview
  const canSubmitForm = () => { if (!isSeasonalPass && !selectedDay) return false; if (category === 'couple') return isPersonComplete(maleForm) && isPersonComplete(femaleForm); return isPersonComplete(personForm) }

  const goToDetailsStep = () => setRegStep(2)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmitForm()) return
    const passLabel = selectedPass?.data.title || passMode
    const dayDetails = !isSeasonalPass && selectedDay ? { selectedDay, selectedDayLabel: getNightLabel(selectedDay) } : {}
    const registration = category === 'couple'
      ? { category, passMode, passLabel, passPrice: pricingSource?.price, passPriceUnit: pricingSource?.priceUnit, eventId: id, male: maleForm, female: femaleForm, name: `${maleForm.name} & ${femaleForm.name}`, mobile: maleForm.mobile, email: maleForm.email, ...dayDetails }
      : { category, passMode, passLabel, passPrice: pricingSource?.price, passPriceUnit: pricingSource?.priceUnit, eventId: id, ...personForm, ...dayDetails }
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
    <Box sx={{ bgcolor: colors.bg, minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.06, backgroundImage: `radial-gradient(circle at 15% 20%, ${colors.gold} 1px, transparent 1px), radial-gradient(circle at 85% 80%, ${colors.gold} 1px, transparent 1px)`, backgroundSize: '50px 50px, 70px 70px', backgroundPosition: '0 0, 35px 25px' }} />
      <Box sx={{ borderBottom: headerScrolled ? '1px solid rgba(184,134,11,0.06)' : '1px solid rgba(184,134,11,0.10)', background: `linear-gradient(135deg, ${colors.heroCream} 0%, ${colors.bg} 100%)`, position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(8px)', transition: 'box-shadow 0.3s ease, border-color 0.3s ease', boxShadow: headerScrolled ? '0 4px 20px rgba(44,31,16,0.08)' : 'none', '&::before': { content: '""', position: 'absolute', bottom: -1, left: 0, right: 0, height: '2px', background: gradients.primary, opacity: headerScrolled ? 0.8 : 0.6, transition: 'opacity 0.3s ease' } }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: headerScrolled ? 0.5 : 0.75, transition: 'padding 0.3s ease' }}>
            <Button onClick={() => navigate('/')} startIcon={<ChevronLeftRoundedIcon />} sx={{ color: colors.ivory, fontWeight: 600, textTransform: 'none', fontSize: '0.85rem', '&:hover': { bgcolor: 'transparent', color: colors.gold }, '& .MuiButton-startIcon': { mr: 0.5 } }}>Back</Button>
            <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '0.9rem', background: gradients.heroText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: headerScrolled ? 1 : 0, transition: 'opacity 0.3s ease' }}>MGM Navratri</Typography>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, sm: 2.5, md: 3 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '18/10', borderRadius: { xs: '16px', md: '22px' }, overflow: 'hidden', bgcolor: colors.bgSoft, border: '1px solid rgba(184,134,11,0.12)', boxShadow: '0 12px 32px rgba(44,31,16,0.08)' }}>
              <Box sx={{ width: '100%', height: '100%', backgroundImage: `url(${promoBanner})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.4s ease', '@media (hover: hover)': { '&:hover': { transform: 'scale(1.03)' } } }} />
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(0deg, rgba(44,31,16,0.15) 0%, transparent 100%)' }} />
            </Box>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1} sx={{ mt: { xs: 1.5, md: 2 }, mb: 0.75 }}>
              <Typography sx={{ fontWeight: 700, color: colors.ivory, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.85rem' }, lineHeight: 1.2, flex: 1, minWidth: 0, wordBreak: 'break-word' }}>{event.title}</Typography>
              <ShareRoundedIcon onClick={() => setShareOpen(true)} sx={{ color: colors.muted, fontSize: '1.25rem', cursor: 'pointer', flexShrink: 0, mt: 0.5, transition: 'color 0.2s', '&:hover': { color: colors.gold } }} />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ gap: 0.75 }}>
              <Chip label={event.night} sx={{ background: gradients.primary, color: '#fff', fontWeight: 700, fontSize: '0.78rem', borderRadius: '20px', textTransform: 'none' }} />
              <Chip icon={<MusicNoteOutlinedIcon sx={{ fontSize: '0.85rem !important', color: `${colors.gold} !important` }} />} label={info.dateRange} sx={{ bgcolor: colors.bgSoft, color: colors.muted, fontWeight: 600, fontSize: '0.78rem', borderRadius: '20px', border: '1px solid rgba(184,134,11,0.10)', textTransform: 'none' }} />
              <Chip icon={<AccessTimeOutlinedIcon sx={{ fontSize: '0.85rem !important', color: `${colors.gold} !important` }} />} label={info.time} sx={{ bgcolor: colors.bgSoft, color: colors.muted, fontWeight: 600, fontSize: '0.78rem', borderRadius: '20px', border: '1px solid rgba(184,134,11,0.10)', textTransform: 'none' }} />
              <Chip component="a" href="https://www.google.com/maps/search/?api=1&query=Seasons+Hotel+Rajkot+Gujarat" target="_blank" rel="noopener noreferrer" clickable icon={<LocationOnOutlinedIcon sx={{ fontSize: '0.85rem !important', color: `${colors.gold} !important` }} />} label={`${info.venue}, ${info.location}`} sx={{ bgcolor: colors.bgSoft, color: colors.muted, fontWeight: 600, fontSize: '0.78rem', borderRadius: '20px', border: '1px solid rgba(184,134,11,0.10)', textTransform: 'none', '&:hover': { bgcolor: colors.bg, borderColor: colors.gold } }} />
              {event.badge && (
                <Chip icon={<LocalFireDepartmentRoundedIcon sx={{ fontSize: '0.85rem !important' }} />} label={event.badge} sx={{ background: 'rgba(184,92,58,0.12)', color: colors.coral, fontWeight: 700, fontSize: '0.78rem', borderRadius: '20px', textTransform: 'none' }} />
              )}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ border: '1px solid rgba(184,134,11,0.14)', borderRadius: { xs: '16px', md: '18px' }, p: { xs: 2, md: 2.5 }, position: { xs: 'static', md: 'sticky' }, top: { md: 24 }, bgcolor: colors.bgSoft, boxShadow: '0 8px 24px rgba(44,31,16,0.04)', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, right: 0, width: 100, height: 100, borderRadius: '0 0 0 100%', background: 'radial-gradient(circle at top right, rgba(212,175,55,0.15), transparent 68%)', pointerEvents: 'none' } }}>
              <Stack spacing={2}>
                <Box>
                  <Typography sx={{ fontSize: { xs: '1.5rem', md: '1.65rem' }, fontWeight: 800, color: colors.ivory, fontFamily: '"Unbounded", sans-serif' }}>{info.price}<Box component="span" sx={{ fontSize: '0.85rem', fontWeight: 500, color: colors.muted, ml: 0.5 }}>onwards</Box></Typography>
                  <Typography sx={{ fontSize: { xs: '0.78rem', md: '0.85rem' }, color: colors.mutedLight, mt: 0.5, lineHeight: 1.55, wordBreak: 'break-word' }}>{info.ticketInfo}</Typography>
                </Box>
                <Button onClick={scrollToRegistration} fullWidth size="large" sx={{ py: 1.5, minHeight: 48, borderRadius: '10px', background: gradients.primary, color: '#fff', fontWeight: 700, fontSize: '0.9rem', textTransform: 'none', boxShadow: '0 8px 20px rgba(184,134,11,0.22)', transition: 'transform 0.25s ease, box-shadow 0.25s ease', '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-2px)', boxShadow: '0 12px 28px rgba(184,134,11,0.32)' } }}>
                  <ConfirmationNumberRoundedIcon sx={{ mr: 1, fontSize: '1.15rem' }} />{info.cta}
                </Button>
                <Divider sx={{ borderColor: 'rgba(184,134,11,0.08)' }} />
                <Typography sx={{ fontWeight: 700, color: colors.ivory, fontSize: '0.85rem' }}>What's Included</Typography>
                <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                  {['Entry to event grounds', 'Welcome tilak & kalash blessing', 'Access to food & handicraft stalls', 'Free parking at venue', '24/7 customer support'].map((item, i) => (
                    <Stack key={i} direction="row" spacing={1} sx={{ mb: 0.5 }}>
                      <CheckRoundedIcon sx={{ color: colors.success, fontSize: '0.9rem' }} />
                      <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>{item}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ borderBottom: '1px solid rgba(184,134,11,0.10)', bgcolor: colors.heroCream, mt: 2 }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={0} sx={{ justifyContent: 'center' }}>
            <Button onClick={() => setTab('info')} sx={{ py: 1.5, px: { xs: 2.5, sm: 3 }, flex: 1, maxWidth: 200, minHeight: 52, borderRadius: 0, fontWeight: tab === 'info' ? 700 : 500, fontSize: '0.9rem', textTransform: 'none', color: tab === 'info' ? colors.gold : colors.muted, borderBottom: tab === 'info' ? `3px solid ${colors.gold}` : '3px solid transparent', letterSpacing: '0.3px', transition: 'color 0.2s, border-color 0.2s', '&:hover': { bgcolor: 'transparent', color: colors.gold } }}>Info</Button>
            <Button onClick={() => setTab('registration')} sx={{ py: 1.5, px: { xs: 2.5, sm: 3 }, flex: 1, maxWidth: 200, minHeight: 52, borderRadius: 0, fontWeight: tab === 'registration' ? 700 : 500, fontSize: '0.9rem', textTransform: 'none', color: tab === 'registration' ? colors.gold : colors.muted, borderBottom: tab === 'registration' ? `3px solid ${colors.gold}` : '3px solid transparent', letterSpacing: '0.3px', transition: 'color 0.2s, border-color 0.2s', '&:hover': { bgcolor: 'transparent', color: colors.gold } }}>Registration</Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, sm: 2.5, md: 3 }, position: 'relative', zIndex: 1 }}>
        {tab === 'info' ? (
          <Box sx={{ maxWidth: 720, mx: 'auto' }}>
            <Box sx={{ mb: 5, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: -40, right: -20, width: 150, height: 150, borderRadius: '50%', background: `radial-gradient(circle, ${colors.marigold}06, transparent 70%)`, pointerEvents: 'none' }} />
              <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: { xs: '1.35rem', md: '1.6rem' }, mb: 2.5 }}>About</Typography>
              <Box sx={{ bgcolor: colors.bgSoft, borderRadius: '16px', p: { xs: 2, md: 3 }, border: '1px solid rgba(184,134,11,0.08)' }}>
                <Typography sx={{ color: colors.muted, lineHeight: 1.85, whiteSpace: 'pre-line', fontSize: '0.95rem' }}>{info.description}</Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 4, borderColor: 'rgba(184,134,11,0.08)' }} />
            <Box sx={{ mb: 5, position: 'relative' }}>
              <Box sx={{ position: 'absolute', bottom: -30, left: -20, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${colors.coral}06, transparent 70%)`, pointerEvents: 'none' }} />
              <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: { xs: '1.35rem', md: '1.6rem' }, mb: 2.5 }}>Why Attend</Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {info.whyAttend.map((item, i) => (
                  <Stack key={i} direction="row" spacing={1.5} sx={{ mb: 1.25, p: { xs: 1.25, md: 1.5 }, bgcolor: colors.bgSoft, borderRadius: '10px', border: '1px solid rgba(184,134,11,0.06)' }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: colors.successBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.15 }}>
                      <StarBorderRoundedIcon sx={{ fontSize: '0.9rem', color: colors.success }} />
                    </Box>
                    <Typography sx={{ color: colors.muted, lineHeight: 1.65, fontSize: '0.92rem', pt: 0.15 }}>{item}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>
            <Divider sx={{ mb: 4, borderColor: 'rgba(184,134,11,0.08)' }} />
            <Box sx={{ mb: 4, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: -20, right: -10, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${colors.marigold}06, transparent 70%)`, pointerEvents: 'none' }} />
              <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: { xs: '1.35rem', md: '1.6rem' }, mb: 2.5 }}>Event Highlights</Typography>
              <Grid container spacing={1.5}>
                {info.highlights.map((item, i) => (
                  <Grid key={i} size={{ xs: 12, sm: 6 }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: { xs: 1.5, md: 1.75 }, bgcolor: colors.bgSoft, borderRadius: '12px', border: '1px solid rgba(184,134,11,0.08)', height: '100%', transition: 'border-color 0.2s, box-shadow 0.2s', '@media (hover: hover)': { '&:hover': { borderColor: 'rgba(184,134,11,0.20)', boxShadow: '0 4px 12px rgba(44,31,16,0.05)' } } }}>
                      <CelebrationOutlinedIcon sx={{ fontSize: '1rem', color: colors.gold, flexShrink: 0 }} />
                      <Typography sx={{ color: colors.muted, fontSize: '0.9rem', lineHeight: 1.4 }}>{item}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider sx={{ mb: 4, borderColor: 'rgba(184,134,11,0.08)' }} />

            <Box sx={{ mb: 4, position: 'relative' }}>
              <Box sx={{ position: 'absolute', bottom: -20, left: -15, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${colors.coral}06, transparent 70%)`, pointerEvents: 'none' }} />
              <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: { xs: '1.35rem', md: '1.6rem' }, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MicIcon sx={{ color: colors.coral, fontSize: '1.2rem' }} />
                Artist
              </Typography>
              <Box sx={{ bgcolor: colors.bgSoft, borderRadius: '16px', p: { xs: 2, md: 2.5 }, border: '1px solid rgba(184,134,11,0.08)', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease', '@media (hover: hover)': { '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(44,31,16,0.10)', borderColor: colors.glassBorder } } }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                  <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: gradients.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 16px rgba(184,92,58,0.2)', position: 'relative', '&::after': { content: '""', position: 'absolute', inset: -3, borderRadius: '50%', border: '2px solid rgba(184,134,11,0.12)' } }}>
                    <MicIcon sx={{ color: '#fff', fontSize: '1.6rem' }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: colors.ivory, lineHeight: 1.3 }}>Raj Gadhvi</Typography>
                    <Typography sx={{ fontSize: '0.88rem', color: colors.mutedLight, mt: 0.25, display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.coral, flexShrink: 0 }} />
                      Live Garba & Folk Vocalist
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ mb: 4, borderColor: 'rgba(184,134,11,0.08)' }} />

            <Box sx={{ mb: 4, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: -15, right: -10, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${colors.marigold}06, transparent 70%)`, pointerEvents: 'none' }} />
              <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: { xs: '1.35rem', md: '1.6rem' }, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <BusinessIcon sx={{ color: colors.marigold, fontSize: '1.2rem' }} />
                Organized by
              </Typography>
              <Box sx={{ bgcolor: colors.bgSoft, borderRadius: '16px', p: { xs: 2, md: 2.5 }, border: '1px solid rgba(184,134,11,0.08)', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease', '@media (hover: hover)': { '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(44,31,16,0.10)', borderColor: colors.glassBorder } } }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: '16px', background: gradients.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 16px rgba(184,134,11,0.2)' }}>
                    <BusinessIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: colors.ivory, lineHeight: 1.3 }}>MGM Event</Typography>
                    <Typography sx={{ fontSize: '0.88rem', color: colors.mutedLight, mt: 0.25, display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <LocationOnOutlinedIcon sx={{ fontSize: '0.9rem', color: colors.marigold }} />
                      Rajkot, Gujarat
                    </Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: colors.muted, mt: 0.5, lineHeight: 1.5 }}>Dedicated to curating premium cultural experiences that celebrate tradition, music, and community.</Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ mb: 4, borderColor: 'rgba(184,134,11,0.08)' }} />

            <Box sx={{ mb: 4, position: 'relative' }}>
              <Box sx={{ position: 'absolute', bottom: -20, right: -15, width: 90, height: 90, borderRadius: '50%', background: `radial-gradient(circle, ${colors.marigold}06, transparent 70%)`, pointerEvents: 'none' }} />
              <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: { xs: '1.35rem', md: '1.6rem' }, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <GridViewRoundedIcon sx={{ color: colors.gold, fontSize: '1.2rem' }} />
                Event Layout
              </Typography>
              <Box sx={{ bgcolor: colors.bgSoft, borderRadius: '16px', p: { xs: 2, md: 2.5 }, border: '1px solid rgba(184,134,11,0.08)', transition: 'box-shadow 0.3s ease, border-color 0.3s ease', '@media (hover: hover)': { '&:hover': { boxShadow: '0 12px 32px rgba(44,31,16,0.10)', borderColor: colors.glassBorder } } }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 1.5, md: 2 }, mb: 2.5, position: 'relative' }}>
                  <Box sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1' }, textAlign: 'center', py: 2, borderRadius: '12px', background: `radial-gradient(circle at 50% 50%, rgba(184,134,11,0.06) 0%, transparent 80%)`, border: '1px dashed rgba(184,134,11,0.12)' }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 3, py: 1.25, borderRadius: '30px', bgcolor: 'rgba(255,255,255,0.5)', boxShadow: '0 2px 8px rgba(44,31,16,0.04)', transition: 'transform 0.25s ease', '@media (hover: hover)': { '&:hover': { transform: 'scale(1.03)' } } }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: gradients.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MicIcon sx={{ color: '#fff', fontSize: '0.85rem' }} />
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: colors.ivory }}>Main Stage</Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: colors.mutedLight, fontWeight: 500 }}>Live Performances</Typography>
                    </Box>
                  </Box>
                </Box>
                <Stack spacing={1.25} sx={{ px: 0.5 }}>
                  {[
                    { label: 'Fanpit Zone', sub: 'Standing · Closest to Stage', color: colors.gold, icon: 'standing' },
                    { label: 'VIP Lounge', sub: 'Reserved Seating · Premium View', color: colors.coral, icon: 'vip' },
                    { label: 'Food Court', sub: 'Snacks · Drinks · Handicraft Stalls', color: colors.teal, icon: 'food' },
                    { label: 'Entry Gate', sub: 'Check-in · QR Verification', color: colors.marigoldSoft, icon: 'gate' },
                  ].map(({ label, sub, color }) => (
                    <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: { xs: 1, md: 1.5 }, py: 1.25, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.3)', border: '1px solid rgba(184,134,11,0.05)', transition: 'all 0.25s ease', cursor: 'default', '@media (hover: hover)': { '&:hover': { bgcolor: 'rgba(255,255,255,0.55)', transform: 'translateX(4px)', borderColor: 'rgba(184,134,11,0.10)' } } }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: '8px', bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.85 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#fff', opacity: 0.7 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: colors.ivory }}>{label}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: colors.muted }}>{sub}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box id="event-registration" sx={{ maxWidth: 600, mx: 'auto', width: '100%' }}>
            <Box sx={{ border: '1px solid rgba(184,134,11,0.12)', borderRadius: { xs: '16px', md: '20px' }, p: { xs: 1.75, sm: 2, md: 3.5 }, bgcolor: colors.heroCream, boxShadow: '0 8px 24px rgba(44,31,16,0.04)', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: '50%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)', transform: 'translateX(-50%)', pointerEvents: 'none' } }}>
              <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 3 }, position: 'relative', zIndex: 1 }}>
                <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, mb: 0.5, fontSize: { xs: '1.25rem', md: '1.55rem' } }}>Reserve Your Spot</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: colors.mutedLight }}>{regStep === 0 && 'Step 1 — Choose your pass type'}{regStep === 1 && 'Step 2 — Choose your category'}{regStep === 2 && 'Step 3 — Fill registration details'}</Typography>
              </Box>
              <Stack direction="row" spacing={0.75} justifyContent="center" flexWrap="wrap" sx={{ mb: { xs: 2, md: 3 }, position: 'relative', zIndex: 1 }}>
                {['Pass Type', 'Category', 'Details'].map((label, index) => (
                  <Box key={label} sx={{ px: { xs: 1, sm: 1.25 }, py: 0.5, borderRadius: '50px', fontSize: { xs: '0.65rem', sm: '0.72rem' }, fontWeight: 700, background: regStep >= index ? gradients.primary : colors.bgSoft, color: regStep >= index ? '#fff' : colors.muted, whiteSpace: 'nowrap', boxShadow: regStep >= index ? '0 4px 10px rgba(184,134,11,0.18)' : 'none' }}>{index + 1}. {label}</Box>
                ))}
              </Stack>

              {regStep === 0 && (
                <Stack spacing={1.5} sx={{ position: 'relative', zIndex: 1 }}>
                  {passModes.map((item) => (
                    <Button key={item.id} onClick={() => { setPassMode(item.id); if (item.id === 'seasonal') setSelectedDay(''); setRegStep(1) }} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0.75, sm: 0 }, textAlign: 'left', px: 2.5, py: 2, minHeight: 48, borderRadius: '14px', border: '1px solid rgba(184,134,11,0.12)', bgcolor: colors.bg, color: colors.ivory, textTransform: 'none', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s', '&:hover': { bgcolor: colors.bg, borderColor: colors.gold, boxShadow: '0 8px 20px rgba(184,134,11,0.12)', transform: 'translateY(-2px)' } }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</Typography>
                        <Typography sx={{ fontSize: '0.82rem', color: colors.muted }}>{item.subtitle}</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 800, color: colors.gold, fontSize: '1.05rem', alignSelf: { xs: 'flex-start', sm: 'center' } }}>{item.data.price}</Typography>
                    </Button>
                  ))}
                </Stack>
              )}

              {regStep === 1 && selectedPass && (
                <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ bgcolor: colors.bg, border: '1px solid rgba(184,134,11,0.10)', borderRadius: '10px', p: 1.5, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.75rem', color: colors.muted, fontWeight: 600 }}>Selected: <Box component="span" sx={{ color: colors.gold, fontWeight: 700 }}>{selectedPass.title}</Box></Typography>
                  </Box>
                  <Stack direction="row" spacing={0.75} sx={{ bgcolor: colors.bg, borderRadius: '10px', p: 0.5, border: '1px solid rgba(184,134,11,0.08)' }}>
                    {categoryKeys.map((key) => (
                      <Button key={key} onClick={() => setCategory(key)} sx={{ flex: 1, py: { xs: 1.1, sm: 1 }, minHeight: 44, borderRadius: '8px', color: category === key ? '#fff' : colors.muted, background: category === key ? gradients.primary : 'transparent', fontWeight: 700, fontSize: '0.85rem', textTransform: 'capitalize', boxShadow: category === key ? '0 4px 12px rgba(184,134,11,0.18)' : 'none', transition: 'all 0.2s', '&:hover': { background: category === key ? gradients.primary : colors.bgSoft, color: category === key ? '#fff' : colors.ivory } }}>{key}</Button>
                    ))}
                  </Stack>
                  {selected && (
                    <Box sx={{ bgcolor: colors.bg, border: '1px solid rgba(184,134,11,0.10)', borderRadius: '14px', p: { xs: 1.75, md: 2.25 }, textAlign: 'center', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: gradients.primary } }}>
                      <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5, color: colors.muted, fontWeight: 600 }}>{isSeasonalPass ? 'Seasonal Entry' : selected.eyebrow}</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: colors.ivory, mt: 0.5 }}>{selected.title}</Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.65rem', color: colors.ivory, my: 1, fontFamily: '"Unbounded", sans-serif' }}>{pricingSource?.price}<Box component="span" sx={{ fontSize: '0.85rem', fontWeight: 500, color: colors.muted }}>{pricingSource?.priceUnit}</Box></Typography>
                      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.85rem', color: colors.muted }}>
                        {(pricingSource?.perks || []).map((perk) => (
                          <Stack key={perk} direction="row" spacing={0.75} alignItems="center" sx={{ py: 0.5, justifyContent: 'center' }}>
                            <StarRoundedIcon sx={{ fontSize: '0.75rem', color: colors.gold, flexShrink: 0 }} />
                            <Box component="li">{perk}</Box>
                          </Stack>
                        ))}
                      </Box>
                    </Box>
                  )}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <Button onClick={() => setRegStep(0)} sx={{ flex: 1, py: 1.35, minHeight: 48, borderRadius: '10px', border: '1px solid rgba(184,134,11,0.12)', color: colors.muted, textTransform: 'none', fontWeight: 600, '&:hover': { borderColor: colors.gold, color: colors.ivory } }}>Back</Button>
                    <Button disabled={!category} onClick={goToDetailsStep} sx={{ flex: { xs: 1, sm: 2 }, py: 1.35, minHeight: 48, borderRadius: '10px', background: gradients.primary, color: '#fff', fontWeight: 700, fontSize: '0.9rem', textTransform: 'none', boxShadow: '0 6px 16px rgba(184,134,11,0.20)', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-1px)', boxShadow: '0 10px 24px rgba(184,134,11,0.30)' }, '&.Mui-disabled': { bgcolor: colors.glassBorder, color: '#fff', boxShadow: 'none' } }}>Continue</Button>
                  </Stack>
                </Stack>
              )}

              {regStep === 2 && selected && selectedPass && (
                <Box component="form" onSubmit={handleSubmit} sx={fieldSx}>
                  <Box sx={{ bgcolor: colors.bg, border: '1px solid rgba(184,134,11,0.10)', borderRadius: '12px', p: { xs: 1.5, md: 1.75 }, mb: 2.5, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <Typography sx={{ fontSize: '0.85rem', color: colors.muted }}>{selectedPass.title} · <Box component="span" sx={{ fontWeight: 700, color: colors.ivory }}>{selected.title}</Box></Typography>
                    <Typography sx={{ fontWeight: 800, color: colors.gold, fontSize: '1.1rem', mt: 0.25 }}>{pricingSource?.price}{pricingSource?.priceUnit}</Typography>
                    {!isSeasonalPass && selectedDay && <Typography sx={{ fontSize: '0.78rem', color: colors.mutedLight, mt: 0.75 }}>{getNightLabel(selectedDay)}</Typography>}
                  </Box>
                  {!isSeasonalPass && (
                    <FormControl fullWidth required sx={{ mb: 2.5, position: 'relative', zIndex: 1 }}>
                      <Select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} displayEmpty renderValue={(value) => value ? getNightLabel(value) : <Box sx={{ color: colors.muted }}>Select Day</Box>} slotProps={{ htmlInput: { 'aria-label': 'Select Day' } }} sx={{ bgcolor: colors.bg, color: selectedDay ? colors.ivory : colors.muted, borderRadius: '10px', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(184,134,11,0.12)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.glassBorder }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.gold } }}>
                        <MenuItem value="" disabled>Select Day</MenuItem>
                        {navratriNights.map((night) => (
                          <MenuItem key={night.id} value={String(night.id)}>{night.label} · {night.date} · {night.theme}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {category === 'couple' ? (
                    <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                      <PersonFields title="Male Details" person={maleForm} onFieldChange={makeFieldUpdater(setMaleForm)} onPhotoChange={makePhotoUpdater(setMaleForm)} />
                      <Divider sx={{ borderColor: 'rgba(184,134,11,0.08)' }} />
                      <PersonFields title="Female Details" person={femaleForm} onFieldChange={makeFieldUpdater(setFemaleForm)} onPhotoChange={makePhotoUpdater(setFemaleForm)} />
                    </Stack>
                  ) : (
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <PersonFields title={category === 'male' ? 'Male Details' : 'Female Details'} person={personForm} onFieldChange={makeFieldUpdater(setPersonForm)} onPhotoChange={makePhotoUpdater(setPersonForm)} />
                    </Box>
                  )}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 2.5, position: 'relative', zIndex: 1 }}>
                    <Button type="button" onClick={() => setRegStep(1)} sx={{ flex: 1, py: 1.5, minHeight: 48, borderRadius: '10px', border: '1px solid rgba(184,134,11,0.12)', color: colors.muted, textTransform: 'none', fontWeight: 600, '&:hover': { borderColor: colors.gold, color: colors.ivory } }}>Back</Button>
                    <Button type="submit" disabled={!canSubmitForm()} sx={{ flex: { xs: 1, sm: 2 }, py: 1.5, minHeight: 48, borderRadius: '10px', background: gradients.primary, color: '#fff', fontWeight: 700, fontSize: '0.9rem', textTransform: 'none', boxShadow: '0 6px 16px rgba(184,134,11,0.20)', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-1px)', boxShadow: '0 10px 24px rgba(184,134,11,0.30)' }, '&.Mui-disabled': { bgcolor: colors.glassBorder, color: '#fff', boxShadow: 'none' } }}>Proceed to Payment</Button>
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Container>

      <Box sx={{ mt: 3, borderTop: '1px solid rgba(184,134,11,0.10)', bgcolor: colors.heroCream, py: { xs: 2.5, md: 3 }, textAlign: 'center', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: '3px', borderRadius: '0 0 4px 4px', background: gradients.primary }} />
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 } }}>
          <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '0.95rem', background: gradients.heroText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', mb: 0.5 }}>MGM Cultural Navratri</Typography>
          <Typography sx={{ color: colors.muted, fontSize: '0.8rem', fontWeight: 500 }}><Box component="a" href="https://www.google.com/maps/search/?api=1&query=Seasons+Hotel+Rajkot+Gujarat" target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: colors.gold } }}>Seasons Hotel, Rajkot</Box> · Ten Nights of Devotion & Dance</Typography>
        </Container>
      </Box>
      <ShareSheet open={shareOpen} onClose={() => setShareOpen(false)} title={event?.title || 'MGM Cultural Navratri'} />
    </Box>
  )
}
