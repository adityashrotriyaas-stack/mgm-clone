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
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ManOutlinedIcon from '@mui/icons-material/ManOutlined'
import WomanOutlinedIcon from '@mui/icons-material/WomanOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import PhotoCaptureField from './PhotoCaptureField'
import NonRefundableCheckbox from './NonRefundableCheckbox'
import MobileNumberField from './MobileNumberField'
import AadhaarNumberField from './AadhaarNumberField'
import { upcomingEvents, registrationCategories, passOptions, navratriNights } from '../data/siteData'
import promoBanner from '../assets/image.png'
import FestiveSection from './FestiveSection'
import { colors } from '../constants/colors'
import { festiveCardSoftSx } from '../constants/navratriTheme'

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

const accentFestive = '#C98B2E'
const ui = {
  card: colors.bgCard,
  surface: colors.bgSoft,
  surfaceMuted: colors.bgWarm,
  text: colors.textLight,
  muted: colors.muted,
  border: colors.border,
}

const categoryMeta = {
  male: { Icon: ManOutlinedIcon, bg: '#E8F1FF', color: '#3B82F6' },
  female: { Icon: WomanOutlinedIcon, bg: '#FEECEC', color: '#EF4444' },
  couple: { Icon: PeopleOutlinedIcon, bg: '#E8F8EE', color: '#22C55E' },
}

function RegistrationStepPills({ activeStep }) {
  return (
    <Stack direction="row" spacing={0.75} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: { xs: 2, md: 3 } }}>
      {['Pass Type', 'Category', 'Details'].map((label, index) => {
        const isCompleted = index < activeStep
        const isActive = index === activeStep

        return (
          <Box
            key={label}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: { xs: 1.15, sm: 1.4 },
              py: 0.55,
              borderRadius: '50px',
              fontSize: { xs: '0.68rem', sm: '0.75rem' },
              fontWeight: 700,
              bgcolor: isActive ? accentFestive : ui.surfaceMuted,
              color: isActive ? colors.night : ui.muted,
              whiteSpace: 'nowrap',
            }}
          >
            {isCompleted ? (
              <CheckRoundedIcon sx={{ fontSize: '1rem', color: ui.muted }} />
            ) : (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: isActive ? colors.night : 'transparent',
                  border: isActive ? 'none' : `2px solid ${colors.border}`,
                  color: isActive ? accentFestive : ui.muted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {index + 1}
              </Box>
            )}
            {!isCompleted && label}
          </Box>
        )
      })}
    </Stack>
  )
}

function SelectedPassBanner({ title }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        bgcolor: ui.surfaceMuted,
        border: `1px solid ${accentFestive}55`,
        borderRadius: '12px',
        p: 1.5,
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: '10px',
          bgcolor: 'rgba(201, 139, 46, 0.16)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ConfirmationNumberRoundedIcon sx={{ color: accentFestive, fontSize: '1.3rem' }} />
      </Box>
      <Typography sx={{ fontSize: '0.9rem', color: ui.muted }}>
        Selected:{' '}
        <Box component="span" sx={{ fontWeight: 700, color: accentFestive }}>
          {title}
        </Box>
      </Typography>
    </Stack>
  )
}

function PassTypeOption({ item, selected, onSelect }) {
  return (
    <Button
      onClick={onSelect}
      sx={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 1.5,
        textAlign: 'left',
        px: 1.75,
        py: 1.75,
        width: '100%',
        borderRadius: '12px',
        border: selected ? `2px solid ${accentFestive}` : `1px solid ${ui.border}`,
        bgcolor: selected ? 'rgba(201, 139, 46, 0.12)' : ui.card,
        color: ui.text,
        textTransform: 'none',
        boxShadow: selected ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          bgcolor: selected ? 'rgba(201, 139, 46, 0.16)' : ui.surfaceMuted,
          borderColor: selected ? accentFestive : colors.border,
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '10px',
          bgcolor: selected ? 'rgba(201, 139, 46, 0.2)' : ui.surfaceMuted,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ConfirmationNumberRoundedIcon sx={{ color: selected ? accentFestive : ui.muted, fontSize: '1.35rem' }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</Typography>
        <Typography sx={{ fontSize: '0.8rem', color: ui.muted }}>{item.subtitle}</Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ flexShrink: 0 }}>
        <Typography sx={{ fontWeight: 800, color: selected ? accentFestive : ui.text, fontSize: '1rem' }}>
          {item.data.price}
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: selected ? 'none' : `2px solid ${colors.border}`,
            bgcolor: selected ? accentFestive : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selected && <CheckRoundedIcon sx={{ color: colors.night, fontSize: '1rem' }} />}
        </Box>
      </Stack>
    </Button>
  )
}

function CategoryOption({ categoryKey, label, subtitle, price, priceUnit, selected, onSelect }) {
  const { Icon, bg, color } = categoryMeta[categoryKey] || categoryMeta.male

  return (
    <Button
      onClick={onSelect}
      sx={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 1.5,
        textAlign: 'left',
        px: 1.75,
        py: 1.75,
        width: '100%',
        borderRadius: '12px',
        border: selected ? `2px solid ${accentFestive}` : `1px solid ${ui.border}`,
        bgcolor: ui.card,
        color: ui.text,
        textTransform: 'none',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          bgcolor: ui.surfaceMuted,
          borderColor: selected ? accentFestive : colors.border,
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '10px',
          bgcolor: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ color, fontSize: '1.35rem' }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', textTransform: 'capitalize' }}>{label}</Typography>
        <Typography sx={{ fontSize: '0.8rem', color: ui.muted }}>{subtitle}</Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexShrink: 0 }}>
        <Typography sx={{ fontWeight: 700, color: ui.text, fontSize: '0.92rem', whiteSpace: 'nowrap' }}>
          {price}
          {priceUnit ? (
            <Box component="span" sx={{ fontSize: '0.75rem', fontWeight: 500, color: ui.muted, ml: 0.35 }}>
              {priceUnit}
            </Box>
          ) : null}
        </Typography>
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: selected ? 'none' : `2px solid ${colors.border}`,
            bgcolor: selected ? accentFestive : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {selected && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.night }} />}
        </Box>
      </Stack>
    </Button>
  )
}

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
    bgcolor: ui.card,
    color: ui.text,
    borderRadius: '8px',
    '& fieldset': { borderColor: ui.border },
    '&:hover fieldset': { borderColor: colors.gold },
    '&.Mui-focused fieldset': { borderColor: accentFestive },
  },
  '& .MuiInputBase-input::placeholder': { color: ui.muted, opacity: 1 },
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
        <Typography sx={{ fontWeight: 700, color: ui.text, fontSize: '0.95rem', mb: 0.25 }}>
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
      <Typography variant="h5" sx={{ fontWeight: 700, color: ui.text, mb: 2, fontSize: '1.25rem' }}>
        {title}
      </Typography>
      <Box
        sx={{
          maxWidth: 360,
          bgcolor: ui.card,
          border: `1px solid ${ui.border}`,
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
      <Typography variant="h5" sx={{ fontWeight: 700, color: ui.text, mb: 2, fontSize: '1.25rem' }}>
        Event Layout
      </Typography>
      <Box
        sx={{
          maxWidth: 420,
          bgcolor: ui.card,
          border: `1px solid ${ui.border}`,
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
                bgcolor: ui.surfaceMuted,
                border: `1px solid ${ui.border}`,
                fontSize: '0.76rem',
                fontWeight: 600,
                color: ui.muted,
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
    <FestiveSection variant="night" showAccent={false} sx={{ minHeight: '100vh', overflowX: 'clip' }}>
      <Box sx={{ borderBottom: `1px solid ${colors.border}` }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" sx={{ py: 1 }}>
            <Button
              onClick={() => navigate('/')}
              startIcon={<ChevronLeftRoundedIcon />}
              sx={{ color: ui.text, fontWeight: 500, textTransform: 'none', fontSize: '0.875rem', '&:hover': { bgcolor: 'transparent' } }}
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
              bgcolor: ui.surfaceMuted,
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
              <Typography sx={{ fontWeight: 700, color: ui.text, fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.625rem' }, lineHeight: 1.25, flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
                {event.title}
              </Typography>
              <ShareRoundedIcon sx={{ color: ui.text, fontSize: '1.25rem', cursor: 'pointer', flexShrink: 0, mt: 0.25 }} />
            </Stack>

            <Stack direction="row" spacing={1}>
              <Chip label={event.night} sx={{ bgcolor: '#1F1F1F', color: '#fff', fontWeight: 500, fontSize: '0.8125rem', borderRadius: '6px', textTransform: 'none' }} />
            </Stack>
          </Grid>

          {/* Right — Booking Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              border: `1px solid ${ui.border}`,
              borderRadius: { xs: '10px', md: '12px' },
              p: { xs: 2, md: 2.5 },
              position: { xs: 'static', md: 'sticky' },
              top: { md: 24 },
            }}>
              <Stack spacing={2}>
                <Box>
                  <Typography sx={{ fontSize: { xs: '1.35rem', md: '1.5rem' }, fontWeight: 700, color: ui.text }}>
                    {info.price}
                    <Box component="span" sx={{ fontSize: '0.875rem', fontWeight: 500, color: ui.muted, ml: 0.5 }}>onwards</Box>
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' }, color: ui.muted, mt: 0.5, lineHeight: 1.55, wordBreak: 'break-word' }}>
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

                <Typography sx={{ fontWeight: 600, color: ui.text, fontSize: '0.875rem' }}>
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
                      <Box component="span" sx={{ color: ui.text, fontWeight: 600, fontSize: '0.8125rem' }}>✓</Box>
                      <Typography sx={{ fontSize: '0.8125rem', color: ui.muted }}>{item}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Tabs */}
      <Box sx={{ borderBottom: `1px solid ${ui.border}` }}>
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
                color: tab === 'registration' ? accentFestive : ui.muted,
                borderBottom: tab === 'registration' ? '3px solid accentFestive' : '3px solid transparent',
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
                color: tab === 'info' ? accentFestive : ui.muted,
                borderBottom: tab === 'info' ? '3px solid accentFestive' : '3px solid transparent',
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: ui.text, mb: 2, fontSize: '1.25rem' }}>About</Typography>
              <Typography sx={{ color: ui.muted, lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: '0.9375rem' }}>
                {info.description}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: ui.text, mb: 2, fontSize: '1.25rem' }}>Why Attend</Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {info.whyAttend.map((item, i) => (
                  <Stack key={i} direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
                    <Box component="span" sx={{ color: '#22c55e', fontWeight: 600, fontSize: '1rem' }}>✅</Box>
                    <Typography sx={{ color: ui.muted, lineHeight: 1.6, fontSize: '0.9375rem' }}>{item}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: ui.text, mb: 2, fontSize: '1.25rem' }}>Event Highlights</Typography>
              <Grid container spacing={1.5}>
                {info.highlights.map((item, i) => (
                  <Grid key={i} size={{ xs: 12, sm: 6 }}>
                    <Stack direction="row" spacing={1} sx={{ p: 1.5, bgcolor: ui.surfaceMuted, borderRadius: '8px' }}>
                      <Box component="span" sx={{ color: accentFestive, fontWeight: 700, fontSize: '1rem' }}>📌</Box>
                      <Typography sx={{ color: ui.muted, fontSize: '0.9375rem' }}>{item}</Typography>
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
                <Typography sx={{ fontWeight: 700, color: ui.text, fontSize: '1rem' }}>
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
                    border: `1px solid ${ui.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: ui.card,
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
                <Typography sx={{ fontWeight: 700, color: ui.text, fontSize: '1rem' }}>
                  {info.organizer.name}
                </Typography>
              </Box>
            </DetailInfoCard>

            <Divider sx={{ mb: 3 }} />

            <EventLayoutCard zones={info.layoutZones} />
          </Box>
        ) : (
          <Box id="event-registration" sx={{ maxWidth: 600, mx: 'auto', width: '100%' }}>
            <Box
              sx={{
                border: '1px solid #ECECEC',
                borderRadius: '16px',
                p: { xs: 2, sm: 2.25, md: 3 },
                bgcolor: ui.card,
                boxShadow: '0 10px 36px rgba(15, 23, 42, 0.06)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 2.5 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: ui.text, mb: 0.5, fontSize: { xs: '1.15rem', md: '1.5rem' } }}>
                  Reserve Your Spot
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: ui.muted }}>
                  {regStep === 0 && 'Step 1 — Choose your pass type'}
                  {regStep === 1 && 'Step 2 — Choose your category'}
                  {regStep === 2 && 'Step 3 — Fill registration details'}
                </Typography>
              </Box>

              <RegistrationStepPills activeStep={regStep} />

              {regStep === 0 && (
                <Stack spacing={1.5}>
                  {passModes.map((item) => (
                    <PassTypeOption
                      key={item.id}
                      item={item}
                      selected={passMode === item.id}
                      onSelect={() => {
                        setPassMode(item.id)
                        if (item.id === 'seasonal') setSelectedDay('')
                        setRegStep(1)
                      }}
                    />
                  ))}

                  <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ pt: 0.5 }}>
                    <InfoOutlinedIcon sx={{ color: accentFestive, fontSize: '1rem', mt: 0.15 }} />
                    <Typography sx={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.55 }}>
                      Pass once selected cannot be changed later.
                    </Typography>
                  </Stack>
                </Stack>
              )}

              {regStep === 1 && selectedPass && (
                <Stack spacing={2}>
                  <SelectedPassBanner title={selectedPass.title} />

                  <Stack spacing={1.25}>
                    {categoryKeys.map((key) => {
                      const cat = registrationCategories[key]
                      const optionPrice = isSeasonalPass ? selectedPass.data : cat
                      return (
                        <CategoryOption
                          key={key}
                          categoryKey={key}
                          label={key}
                          subtitle={cat.title}
                          price={optionPrice.price}
                          priceUnit={optionPrice.priceUnit}
                          selected={category === key}
                          onSelect={() => selectCategory(key)}
                        />
                      )
                    })}
                  </Stack>

                  <Button
                    onClick={() => setRegStep(0)}
                    fullWidth
                    startIcon={<ChevronLeftRoundedIcon />}
                    sx={{
                      py: 1.35,
                      minHeight: 48,
                      borderRadius: '10px',
                      bgcolor: ui.surfaceMuted,
                      border: `1px solid ${ui.border}`,
                      color: ui.muted,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#ececec' },
                    }}
                  >
                    Back
                  </Button>
                </Stack>
              )}

              {regStep === 2 && selected && selectedPass && (
                <Box component="form" onSubmit={handleSubmit} sx={fieldSx}>
                  <Box sx={{ bgcolor: ui.surfaceMuted, border: `1px solid ${ui.border}`, borderRadius: '8px', p: 1.5, mb: 2.5, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.82rem', color: ui.muted }}>
                      {selectedPass.title} · {selected.title}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, color: ui.text }}>{totalPrice}{pricingSource?.priceUnit}</Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: ui.muted, mt: 0.5 }}>
                      {totalTickets} ticket{totalTickets > 1 ? 's' : ''}
                    </Typography>
                    {!isSeasonalPass && selectedDay && (
                      <Typography sx={{ fontSize: '0.78rem', color: ui.muted, mt: 0.75 }}>
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
                          value ? getNightLabel(value) : <Box sx={{ color: ui.muted }}>Select Day</Box>
                        }
                        inputProps={{ 'aria-label': 'Select Day' }}
                        sx={{
                          bgcolor: ui.card,
                          color: selectedDay ? ui.text : ui.muted,
                          borderRadius: '8px',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: ui.border },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.gold },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentFestive },
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
                        bgcolor: ui.card,
                        color: ui.text,
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: ui.border },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.gold },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accentFestive },
                      }}
                    >
                      {!isCoupleCategory && <MenuItem value="1">1 Ticket</MenuItem>}
                      <MenuItem value="2">2 Tickets</MenuItem>
                    </Select>
                  </FormControl>
                  {isCoupleCategory && (
                    <Typography sx={{ fontSize: '0.78rem', color: ui.muted, mb: 2 }}>
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
                      sx={{ flex: 1, py: 1.5, minHeight: 48, borderRadius: '8px', border: `1px solid ${ui.border}`, color: ui.muted, textTransform: 'none' }}
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
      <Box sx={{ borderTop: `1px solid ${colors.border}`, bgcolor: colors.bgSoft, py: 3, textAlign: 'center' }}>
        <Typography sx={{ color: colors.muted, fontSize: '0.9rem', fontWeight: 500 }}>
          Powered by Wowsly
        </Typography>
      </Box>
    </FestiveSection>
  )
}