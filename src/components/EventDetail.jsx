import { useEffect, useState } from 'react'
import { isWowslyConfigured, updateNightSlotMap } from '../config/wowsly'
import {
  applyQuotedPriceToRegistration,
  prepareWowslyBooking,
} from '../services/wowslyBooking'
import { getPublicSchedule, getEventTickets } from '../services/wowslyApi'
import { buildFallbackSchedule, getScheduleStepLabel, normalizeScheduleResponse } from '../utils/schedule'
import ScheduleStep from './ScheduleStep'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
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
import wowslyLogo from '../assets/wowsly-logo.png'
import FestiveSection from './FestiveSection'
import { colors } from '../constants/colors'
import {
  personSectionSx,
  personTitleSx,
  registrationBackButtonSx,
  registrationCardSx,
  registrationFieldSx,
  registrationSubmitButtonSx,
  registrationSummarySx,
  registrationUi,
} from '../constants/registrationFormTheme'

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

function PassTypeOption({ item, selected, onSelect }) {
  const sx = {
    cursor: 'pointer',
    p: 2,
    borderRadius: '16px',
    bgcolor: selected ? 'rgba(234, 90, 0, 0.2)' : 'rgba(26, 14, 0, 0.65)',
    border: selected ? `2px solid ${colors.gold}` : `1px solid ${colors.border}`,
    transition: 'all 0.2s',
    '&:hover': { borderColor: colors.gold, bgcolor: 'rgba(234, 90, 0, 0.12)' },
  }
  return (
    <Box sx={sx} onClick={onSelect}>
      <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: selected ? colors.gold : colors.textLight }}>
        {item.title}
      </Typography>
      <Typography sx={{ fontSize: '0.82rem', color: colors.muted, mt: 0.25 }}>
        {item.subtitle}
      </Typography>
    </Box>
  )
}

const passModes = [
  { id: 'seasonal', title: 'Seasonal Pass', subtitle: '10 Nights Garba', data: passOptions.seasonal },
  { id: 'daily', title: 'Daily Pass', subtitle: '1 Night Garba', data: passOptions.daily },
]

function buildFallbackEvent(id) {
  const night = navratriNights.find((item) => item.id === id)
  if (!night) return null

  return {
    id: night.id,
    title: night.theme,
    badge: 'Now Booking',
    night: night.label,
    date: `🗓️ ${night.date}`,
    time: '🕰️ 9:00 PM',
    price: '₹499',
    priceUnit: '/ pass',
    image: promoBanner,
  }
}

function buildFallbackInfo(id) {
  const night = navratriNights.find((item) => item.id === id)
  if (!night) return null

  return {
    dateRange: night.date.replace(',', ' 2026'),
    time: '9:00 PM – Late Night',
    ticketInfo: 'Daily Pass ₹499 | Couple ₹899 | Seasonal Pass Valid for All 10 Nights',
    venue: 'Seasons Hotel',
    location: 'Rajkot, Gujarat',
    price: '₹499',
    description: `About ${night.theme}

${night.label} of MGM Cultural Navratri 2026 celebrates ${night.theme.toLowerCase()} with live Garba, festive performances, and a vibrant cultural atmosphere in Rajkot.

From the opening aarti to the late-night Mandli Garba session, guests can enjoy music, tradition, decorated festival grounds, and a memorable celebration with family and friends.`,
    whyAttend: [
      `Experience ${night.theme.toLowerCase()} in a live Navratri atmosphere`,
      'Enjoy authentic Garba and Raas with a festive crowd',
      'Celebrate with music, decor, devotion, and food stalls',
      'Join one of Rajkot’s most vibrant cultural nights',
      'Capture memorable moments with friends and family',
      'Stay for the late-night Mandli Garba celebration',
    ],
    highlights: [
      'Live Garba Performance',
      'Festival Decor & Lighting',
      'Food & Handicraft Stalls',
      'Mandli Garba Late Night',
      'Cultural Stage Experience',
      'Family-Friendly Celebration',
    ],
    singer: {
      name: 'Amit Dhorda & Team',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop',
    },
    organizer: {
      name: 'MGM Event',
      mark: 'R',
    },
    layoutZones: ['Main Stage', 'Garba Arena', 'Food Court', 'Entry Gate', 'Seating Zone'],
    cta: `Book ${night.theme}`,
  }
}

const accentFestive = '#EA5A00'
const ui = {
  card: colors.bgCard,
  surface: colors.bgSoft,
  surfaceMuted: colors.bgWarm,
  text: colors.textLight,
  muted: colors.muted,
  border: colors.border,
}

const categoryMeta = {
  male: { Icon: ManOutlinedIcon, bg: 'rgba(255,179,0,0.12)', color: '#FFB300' },
  female: { Icon: WomanOutlinedIcon, bg: 'rgba(234,90,0,0.12)', color: '#EA5A00' },
  couple: { Icon: PeopleOutlinedIcon, bg: 'rgba(255,179,0,0.08)', color: '#C88F00' },
}

function RegistrationStepPills({ activeStep, stepLabels }) {
  return (
    <Stack direction="row" spacing={0.75} useFlexGap sx={{ mb: { xs: 2, md: 3 }, justifyContent: 'center', flexWrap: 'wrap', px: { xs: 0.5, sm: 0 } }}>
      {stepLabels.map((label, index) => {
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
              minWidth: 0,
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
                  fontSize: { xs: '0.7rem', sm: '0.65rem' },
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
    <Box
      sx={{
        p: 2,
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(234, 90, 0, 0.25), rgba(234, 90, 0, 0.08))',
        border: `1px solid ${colors.gold}`,
        textAlign: 'center',
      }}
    >
      <Typography sx={{ fontSize: '0.78rem', color: colors.muted, mb: 0.25 }}>Selected Pass</Typography>
      <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: colors.gold }}>{title}</Typography>
    </Box>
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
      <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0, alignItems: 'center' }}>
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
          {selected && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.textLight }} />}
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

const fieldSx = registrationFieldSx

const selectFieldSx = {
  bgcolor: registrationUi.inputBg,
  color: registrationUi.text,
  borderRadius: '12px',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: registrationUi.border },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 179, 0, 0.45)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.gold, borderWidth: '1.5px' },
  '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(255, 179, 0, 0.15)' },
  '& .MuiSelect-icon': { color: registrationUi.muted },
}

function getNightLabel(nightId) {
  const night = navratriNights.find((item) => String(item.id) === String(nightId))
  if (!night) return ''
  return `${night.label} · ${night.date} · ${night.theme}`
}

function PersonFields({ title, person, onFieldChange, onPhotoChange }) {
  return (
    <Box sx={personSectionSx}>
      {title && (
        <Typography sx={personTitleSx}>
          {title}
        </Typography>
      )}
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        <TextField required placeholder="Full Name" value={person.name} onChange={onFieldChange('name')} fullWidth />
        <MobileNumberField tone="festive" value={person.mobile} onChange={onFieldChange('mobile')} />
        <TextField required placeholder="Email Address" type="email" value={person.email} onChange={onFieldChange('email')} fullWidth />
        <PhotoCaptureField preview={person.selfiePreview} onChange={onPhotoChange} variant="festive" />
        <AadhaarNumberField value={person.aadhaar} onChange={onFieldChange('aadhaar')} />
      </Box>
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
            background: 'linear-gradient(180deg, #FFB300 0 10%, #7A4200 10% 82%, #3A1C00 82% 100%)',
            border: `1px solid ${colors.border}`,
          }}
        >
          <Box sx={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', fontWeight: 800, color: '#FFF8F0', fontSize: '0.92rem' }}>
            Main Stage
          </Box>
          <Box sx={{ position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)', px: 1.5, py: 0.75, borderRadius: '10px', bgcolor: 'rgba(255,248,240,0.85)', color: '#EA5A00', fontWeight: 700, fontSize: '0.82rem' }}>
            Fanpit Zone
          </Box>
          <Box sx={{ position: 'absolute', left: 12, bottom: 18, px: 1.25, py: 0.65, borderRadius: '10px', bgcolor: 'rgba(0,0,0,0.36)', color: '#fff', fontSize: '0.76rem', fontWeight: 700 }}>
            Entry Gate
          </Box>
          <Box sx={{ position: 'absolute', right: 12, bottom: 18, px: 1.25, py: 0.65, borderRadius: '10px', bgcolor: 'rgba(0,0,0,0.36)', color: '#fff', fontSize: '0.76rem', fontWeight: 700 }}>
            Food Court
          </Box>
        </Box>
        <Stack direction="row" useFlexGap spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap' }}>
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
  const event = upcomingEvents.find((e) => e.id === id) || buildFallbackEvent(id)
  const info = eventInfo[id] || buildFallbackInfo(id)
  const SESSION_KEY = `eventDetailForm_${eventId}`

  const stripPreview = (obj) => {
    if (!obj) return obj
    const { selfiePreview, ...rest } = obj
    return rest
  }

  const ss = (key) => sessionStorage.getItem(`${SESSION_KEY}_${key}`)
  const ssJSON = (key) => { try { return JSON.parse(ss(key)) } catch { return null } }

  function saveFormState() {
    try {
      sessionStorage.setItem(`${SESSION_KEY}_step`, String(regStep))
      sessionStorage.setItem(`${SESSION_KEY}_pm`, passMode)
      sessionStorage.setItem(`${SESSION_KEY}_cat`, category)
      sessionStorage.setItem(`${SESSION_KEY}_slot`, JSON.stringify(slotSelection))
      sessionStorage.setItem(`${SESSION_KEY}_pf`, JSON.stringify(stripPreview(personForm)))
      sessionStorage.setItem(`${SESSION_KEY}_spf`, JSON.stringify(stripPreview(secondPersonForm)))
      sessionStorage.setItem(`${SESSION_KEY}_mf`, JSON.stringify(stripPreview(maleForm)))
      sessionStorage.setItem(`${SESSION_KEY}_ff`, JSON.stringify(stripPreview(femaleForm)))
      sessionStorage.setItem(`${SESSION_KEY}_tc`, ticketCount)
      sessionStorage.setItem(`${SESSION_KEY}_anr`, String(acceptedNonRefundable))
      sessionStorage.setItem(`${SESSION_KEY}_ap`, String(acceptedPolicies))
    } catch {}
  }

  function clearFormState() {
    try {
      sessionStorage.removeItem(`${SESSION_KEY}_step`)
      sessionStorage.removeItem(`${SESSION_KEY}_pm`)
      sessionStorage.removeItem(`${SESSION_KEY}_cat`)
      sessionStorage.removeItem(`${SESSION_KEY}_slot`)
      sessionStorage.removeItem(`${SESSION_KEY}_pf`)
      sessionStorage.removeItem(`${SESSION_KEY}_spf`)
      sessionStorage.removeItem(`${SESSION_KEY}_mf`)
      sessionStorage.removeItem(`${SESSION_KEY}_ff`)
      sessionStorage.removeItem(`${SESSION_KEY}_tc`)
      sessionStorage.removeItem(`${SESSION_KEY}_anr`)
      sessionStorage.removeItem(`${SESSION_KEY}_ap`)
    } catch {}
  }

  const initialStep = (() => {
    const s = new URLSearchParams(window.location.search).get('step')
    return s ? Math.min(parseInt(s, 10), 3) : 0
  })()
  const [regStep, setRegStep] = useState(() => {
    const s = parseInt(ss('step'), 10)
    return !isNaN(s) ? s : (isNaN(initialStep) ? 0 : initialStep)
  })
  const [passMode, setPassMode] = useState(() => ss('pm') || '')
  const [category, setCategory] = useState(() => ss('cat') || '')
  const [slotSelection, setSlotSelection] = useState(() => ssJSON('slot'))
  const [schedule, setSchedule] = useState(null)
  const [scheduleLoading, setScheduleLoading] = useState(false)
  const [scheduleError, setScheduleError] = useState('')
  const [personForm, setPersonForm] = useState(() => ssJSON('pf') || emptyPerson())
  const [secondPersonForm, setSecondPersonForm] = useState(() => ssJSON('spf') || emptyPerson())
  const [maleForm, setMaleForm] = useState(() => ssJSON('mf') || emptyPerson())
  const [femaleForm, setFemaleForm] = useState(() => ssJSON('ff') || emptyPerson())
  const [ticketCount, setTicketCount] = useState(() => ss('tc') || '1')
  const [acceptedNonRefundable, setAcceptedNonRefundable] = useState(() => ss('anr') === 'true')
  const [acceptedPolicies, setAcceptedPolicies] = useState(() => ss('ap') === 'true')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [ticketsList, setTicketsList] = useState([])
  const [holder2Expanded, setHolder2Expanded] = useState(false)

  const changeStep = (step) => {
    setRegStep(step)
    const url = new URL(window.location.href)
    url.searchParams.set('step', step)
    window.history.replaceState(null, '', url.toString())
  }

  const selected = category ? registrationCategories[category] : null
  const selectedPass = passModes.find((item) => item.id === passMode)
  const isSeasonalPass = passMode === 'seasonal'
  const pricingSource = isSeasonalPass ? selectedPass?.data : selected
  const isCoupleCategory = category === 'couple'
  const pricingMultiplier = isCoupleCategory ? 1 : Number(ticketCount || 1)
  const totalTickets = isCoupleCategory ? 2 : Number(ticketCount || 1)
  const totalPrice = formatRupees(getPriceAmount(pricingSource?.price) * pricingMultiplier)
  const scheduleStep = 2
  const detailsStep = isSeasonalPass ? 2 : 3
  const registrationStepLabels = isSeasonalPass
    ? ['Pass Type', 'Category', 'Details']
    : ['Pass Type', 'Category', 'Date & Time', 'Details']

  useEffect(() => {
    let cancelled = false

    async function loadSchedule() {
      setScheduleLoading(true)
      setScheduleError('')
      try {
        const response = isWowslyConfigured() ? await getPublicSchedule() : null
        if (response) {
          updateNightSlotMap(response)
        }
        if (!cancelled) {
          setSchedule(normalizeScheduleResponse(response || buildFallbackSchedule()))
        }
      } catch {
        if (!cancelled) {
          setSchedule(normalizeScheduleResponse(buildFallbackSchedule()))
          setScheduleError('')
        }
      } finally {
        if (!cancelled) setScheduleLoading(false)
      }
    }

    loadSchedule()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    async function loadTickets() {
      try {
        const res = isWowslyConfigured() ? await getEventTickets('') : null
        const tickets = res?.data?.tickets || res?.tickets || res?.data || res || []
        if (Array.isArray(tickets)) {
          setTicketsList(tickets)
        }
      } catch (err) {
        console.warn('Failed to load tickets list:', err)
      }
    }
    loadTickets()
  }, [])

  const activeTicketObj = ticketsList.find((t) => {
    const isSeasonal = passMode === 'seasonal'
    const name = String(t.name || t.ticket_name || '').toLowerCase()
    return isSeasonal ? name.includes('season') : (name.includes('single') || name.includes('daily'))
  })

  const ticketFacilities = activeTicketObj?.facilities || []

  if (!event || !info) return <Navigate to="/" replace />

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
    if (!acceptedNonRefundable || !acceptedPolicies) return false
    if (!isSeasonalPass && !slotSelection?.eventSlotId) return false
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
    changeStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmitForm() || submitting) return

    const passLabel = selectedPass?.data.title || passMode
    const scheduleDetails = !isSeasonalPass && slotSelection?.eventSlotId
      ? {
          eventSlotId: slotSelection.eventSlotId,
          eventDateId: slotSelection.eventDateId,
          eventVenueId: slotSelection.eventVenueId,
          eventShowId: slotSelection.eventShowId,
          selectedDayLabel: getScheduleStepLabel(slotSelection),
          scheduleSelection: slotSelection,
        }
      : {}
    let registration =
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
            selectedFacilities: ticketFacilities,
            ...scheduleDetails,
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
            selectedFacilities: ticketFacilities,
            ...scheduleDetails,
          }

    setSubmitError('')
    setSubmitting(true)

    try {
      let wowslySession = null
      if (isWowslyConfigured()) {
        wowslySession = await prepareWowslyBooking(registration)
        registration = applyQuotedPriceToRegistration(registration, wowslySession)
      }

      clearFormState()
      navigate(`/book?event=${eventId}`, { state: { registration, wowslySession } })
    } catch (error) {
      setSubmitError(error?.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
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
          <Stack direction="row" sx={{ py: 1, alignItems: 'center' }}>
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
          <Box id="event-registration" sx={{ maxWidth: !isSeasonalPass ? 720 : 600, mx: 'auto', width: '100%' }}>
            <Box sx={registrationCardSx}>
              <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 2.5 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: ui.text, mb: 0.5, fontSize: { xs: '1.15rem', md: '1.5rem' } }}>
                  Reserve Your Spot
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: ui.muted }}>
                  {regStep === 0 && 'Step 1 — Choose your pass type'}
                  {regStep === 1 && `Step 2 — Choose your category`}
                  {!isSeasonalPass && regStep === scheduleStep && 'Step 3 — Select date, venue & time'}
                  {regStep === detailsStep && `Step ${registrationStepLabels.length} — Fill registration details`}
                </Typography>
              </Box>

              <RegistrationStepPills activeStep={regStep} stepLabels={registrationStepLabels} />

              {regStep === 0 && (
                <Stack spacing={1.5}>
                  {passModes.map((item) => (
                    <PassTypeOption
                      key={item.id}
                      item={item}
                      selected={passMode === item.id}
                      onSelect={() => {
                        setPassMode(item.id)
                        if (item.id === 'seasonal') setSlotSelection(null)
                        changeStep(1)
                      }}
                    />
                  ))}

                  <Stack direction="row" spacing={1} sx={{ pt: 0.5, alignItems: 'flex-start' }}>
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
                    onClick={() => changeStep(0)}
                    fullWidth
                    startIcon={<ChevronLeftRoundedIcon />}
                    sx={{ ...registrationBackButtonSx, flex: 'unset', width: '100%' }}
                  >
                    Back
                  </Button>
                </Stack>
              )}

              {!isSeasonalPass && regStep === scheduleStep && (
                <ScheduleStep
                  schedule={schedule}
                  loading={scheduleLoading}
                  error={scheduleError}
                  selection={slotSelection}
                  onSelectionChange={setSlotSelection}
                  defaultNightId={id}
                  onBack={() => changeStep(1)}
                  onContinue={() => changeStep(detailsStep)}
                />
              )}

              {regStep === detailsStep && selected && selectedPass && (
                <Box component="form" onSubmit={handleSubmit} sx={fieldSx}>
                  <Box sx={registrationSummarySx}>
                    <Typography sx={{ fontSize: '0.82rem', color: registrationUi.muted }}>
                      {selectedPass.title} · {selected.title}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, color: colors.gold, fontSize: '1.2rem', mt: 0.35 }}>
                      {totalPrice}
                      <Box component="span" sx={{ fontSize: '0.82rem', fontWeight: 500, color: registrationUi.muted, ml: 0.5 }}>
                        {pricingSource?.priceUnit}
                      </Box>
                    </Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: ui.muted, mt: 0.5 }}>
                      {totalTickets} ticket{totalTickets > 1 ? 's' : ''}
                    </Typography>
                    {!isSeasonalPass && slotSelection?.dateLabel && (
                      <Typography sx={{ fontSize: '0.78rem', color: ui.muted, mt: 0.75 }}>
                        {getScheduleStepLabel(slotSelection)}
                      </Typography>
                    )}
                    {!isSeasonalPass && slotSelection?.timeLabel && (
                      <Typography sx={{ fontSize: '0.76rem', color: ui.muted, mt: 0.35 }}>
                        {slotSelection.timeLabel}
                      </Typography>
                    )}
                  </Box>

                  <FormControl fullWidth required sx={{ mb: 2 }}>
                    <Select
                      value={ticketCount}
                      onChange={(e) => setTicketCount(e.target.value)}
                      disabled={isCoupleCategory}
                      inputProps={{ 'aria-label': 'Number of Tickets' }}
                      sx={selectFieldSx}
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
                      <Divider sx={{ borderColor: 'rgba(232, 184, 74, 0.18)' }} />
                      <Box>
                        <Button
                          type="button"
                          onClick={() => setHolder2Expanded(!holder2Expanded)}
                          fullWidth
                          sx={{
                            justifyContent: 'space-between',
                            color: colors.gold,
                            textTransform: 'none',
                            fontWeight: 700,
                            py: 1.5,
                            px: 2,
                            borderRadius: '12px',
                            border: '1px solid rgba(232, 184, 74, 0.3)',
                            bgcolor: 'rgba(232, 184, 74, 0.04)',
                            '&:hover': { bgcolor: 'rgba(232, 184, 74, 0.08)' }
                          }}
                        >
                          <span>Female Details (Guest 2)</span>
                          <span>{holder2Expanded ? 'Collapse ▲' : 'Add Details ▼'}</span>
                        </Button>
                        {holder2Expanded && (
                          <Box sx={{ mt: 3 }}>
                            <PersonFields
                              title=""
                              person={femaleForm}
                              onFieldChange={makeFieldUpdater(setFemaleForm)}
                              onPhotoChange={makePhotoUpdater(setFemaleForm)}
                            />
                          </Box>
                        )}
                      </Box>
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
                          <Divider sx={{ borderColor: 'rgba(232, 184, 74, 0.18)' }} />
                          <Box>
                            <Button
                              type="button"
                              onClick={() => setHolder2Expanded(!holder2Expanded)}
                              fullWidth
                              sx={{
                                justifyContent: 'space-between',
                                color: colors.gold,
                                textTransform: 'none',
                                fontWeight: 700,
                                py: 1.5,
                                px: 2,
                                borderRadius: '12px',
                                border: '1px solid rgba(232, 184, 74, 0.3)',
                                bgcolor: 'rgba(232, 184, 74, 0.04)',
                                '&:hover': { bgcolor: 'rgba(232, 184, 74, 0.08)' }
                              }}
                            >
                              <span>Ticket 2 Details</span>
                              <span>{holder2Expanded ? 'Collapse ▲' : 'Add Details ▼'}</span>
                            </Button>
                            {holder2Expanded && (
                              <Box sx={{ mt: 3 }}>
                                <PersonFields
                                  title=""
                                  person={secondPersonForm}
                                  onFieldChange={makeFieldUpdater(setSecondPersonForm)}
                                  onPhotoChange={makePhotoUpdater(setSecondPersonForm)}
                                />
                              </Box>
                            )}
                          </Box>
                        </>
                      )}
                    </Stack>
                  )}

                  {ticketFacilities.length > 0 && (
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', border: '1px solid rgba(232, 184, 74, 0.15)' }}>
                      <Typography sx={{ fontWeight: 700, color: colors.gold, fontSize: '0.9rem', mb: 1 }}>
                        Included Access & Facilities:
                      </Typography>
                      <Stack spacing={0.75}>
                        {ticketFacilities.map((fac) => (
                          <Typography key={fac.id} sx={{ fontSize: '0.8rem', color: registrationUi.text, display: 'flex', alignItems: 'center', gap: 1 }}>
                            • {fac.name}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  <Box sx={{ mt: 2.5 }}>
                    <NonRefundableCheckbox
                      checked={acceptedNonRefundable}
                      onChange={setAcceptedNonRefundable}
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 1.5,
                      p: 1.75,
                      borderRadius: '14px',
                      bgcolor: 'rgba(30, 18, 16, 0.55)',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptedPolicies}
                          onChange={(e) => setAcceptedPolicies(e.target.checked)}
                          sx={{
                            color: 'rgba(255, 179, 0, 0.45)',
                            pt: 0.25,
                            '&.Mui-checked': {
                              color: colors.gold,
                            },
                            '&.Mui-checked .MuiSvgIcon-root': {
                              filter: 'drop-shadow(0 0 6px rgba(255, 179, 0, 0.45))',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: '0.88rem', color: colors.muted, lineHeight: 1.65 }}>
                          I agree to the{' '}
                          <Box component="span" sx={{ color: colors.gold, cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: colors.textLight } }} onClick={() => { saveFormState(); navigate('/privacy-policy') }}>
                            Privacy Policy
                          </Box>{' '}
                          and{' '}
                          <Box component="span" sx={{ color: colors.gold, cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: colors.textLight } }} onClick={() => { saveFormState(); navigate('/refund-policy') }}>
                            Refund Policy
                          </Box>
                        </Typography>
                      }
                      sx={{ alignItems: 'flex-start', m: 0, gap: 0.75 }}
                    />
                  </Box>

                  {submitError && (
                    <Typography sx={{ fontSize: '0.82rem', color: '#ef4444', mt: 1.5 }}>
                      {submitError}
                    </Typography>
                  )}

                  <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ mt: 2.5 }}>
                    <Button
                      type="button"
                      onClick={() => changeStep(isSeasonalPass ? 1 : scheduleStep)}
                      sx={registrationBackButtonSx}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={!canSubmitForm() || submitting}
                      sx={registrationSubmitButtonSx}
                    >
                      {submitting ? 'Processing…' : 'Proceed to Payment'}
                    </Button>
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>
      </Container>
      <Box sx={{ textAlign: 'center', py: 1, borderTop: '1px solid rgba(255,179,0,0.12)' }}>
        <Box
          component="img"
          src={wowslyLogo}
          alt="Wowsly"
          loading="lazy"
           sx={{ width: 72, height: 'auto', display: 'block', mx: 'auto', mb: 0.3 }}
        />
        <Typography sx={{ color: colors.muted, fontSize: '0.78rem' }}>
          Powered by Wowsly
        </Typography>
      </Box>
    </FestiveSection>
  )
}