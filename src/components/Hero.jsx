import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import promoBanner from '../assets/image.png'
import { colors, gradients } from '../constants/colors'
import { heroFeatures } from '../data/siteData'

const featureIcons = {
  calendar: CalendarMonthOutlinedIcon,
  location: LocationOnOutlinedIcon,
  people: GroupsOutlinedIcon,
  food: RestaurantOutlinedIcon,
}

const heroMetaChips = [
  { icon: CalendarMonthOutlinedIcon, label: 'Oct 11 – Oct 20, 2026' },
  { icon: LocationOnOutlinedIcon, label: 'Seasons Hotel, Rajkot', href: 'https://www.google.com/maps/search/?api=1&query=Seasons+Hotel+Rajkot+Gujarat' },
  { icon: PaymentsOutlinedIcon, label: 'Garba & Dandiya' },
]

function FeatureItem({ icon, title, subtitle }) {
  const Icon = featureIcons[icon]
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ width: '100%', minWidth: 0 }}>
      <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'rgba(184,134,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon sx={{ color: colors.gold, fontSize: '1.35rem' }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.85rem', md: '0.9rem' }, color: colors.ivory, lineHeight: 1.2 }}>{title}</Typography>
        <Typography sx={{ fontSize: { xs: '0.72rem', md: '0.75rem' }, color: colors.muted, lineHeight: 1.3 }}>{subtitle}</Typography>
      </Box>
    </Stack>
  )
}

function DecorativeOrb({ size, top, left, right, bottom, delay = 0, duration = 8 }) {
  return (
    <Box sx={{ position: 'absolute', width: size, height: size, borderRadius: '50%', top, left, right, bottom, background: `radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)`, animation: `float ${duration}s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: 'none', zIndex: 0 }} />
  )
}

function RangoliDot({ top, left, right, size = 6, delay = 0 }) {
  return (
    <Box sx={{ position: 'absolute', width: size, height: size, borderRadius: '50%', top, left, right, background: colors.glow, animation: `pulseGlow 3s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: 'none', zIndex: 0 }} />
  )
}

export default function Hero() {
  const navigate = useNavigate()
  return (
    <Box component="section" id="home" sx={{ display: 'flex', flexDirection: 'column', background: gradients.heroBg, overflow: 'hidden', position: 'relative' }}>
      <DecorativeOrb size={400} top="-120px" right="-100px" delay={0} duration={8} />
      <DecorativeOrb size={300} bottom="-80px" left="-80px" delay={1.5} duration={10} />
      <RangoliDot top="15%" left="10%" delay={0} />
      <RangoliDot top="25%" right="15%" delay={0.8} size={8} />
      <RangoliDot bottom="30%" left="20%" delay={1.6} size={5} />
      <RangoliDot top="45%" right="8%" delay={2.4} />

      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.04, backgroundImage: `
        radial-gradient(circle at 20% 30%, ${colors.gold} 1px, transparent 1px),
        radial-gradient(circle at 80% 70%, ${colors.gold} 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, ${colors.coral} 1px, transparent 1px)
      `, backgroundSize: '60px 60px, 80px 80px, 100px 100px', backgroundPosition: '0 0, 40px 20px, 80px 40px' }} />

      <Container maxWidth="xl" sx={{ flex: 1, px: { xs: 2, sm: 2.5, md: 4 }, py: { xs: 3, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 2.5, sm: 3.5, lg: 5 }, alignItems: 'center' }}>
          <Box sx={{ order: { xs: 1, lg: 0 }, minWidth: 0 }}>
            <Box sx={{ bgcolor: colors.bg, borderRadius: { xs: '16px', md: '20px' }, p: { xs: 0.75, md: 1.25 }, boxShadow: '0 20px 50px rgba(44,31,16,0.12)', border: '1px solid rgba(184,134,11,0.12)', transition: 'transform 0.4s ease, box-shadow 0.4s ease', '@media (hover: hover)': { '&:hover': { transform: 'scale(1.01)', boxShadow: '0 28px 60px rgba(44,31,16,0.18)' } } }}>
              <Box sx={{ position: 'relative', '&::after': { content: '""', position: 'absolute', inset: '-3px', borderRadius: { xs: '15px', md: '17px' }, border: '1px solid rgba(184,134,11,0.12)', pointerEvents: 'none' } }}>
                <Box component="img" src={promoBanner} alt="MGM Cultural Navratri 2026 — Rajkot event poster" sx={{ width: '100%', height: 'auto', display: 'block', borderRadius: { xs: '12px', md: '14px' } }} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ order: { xs: 2, lg: 0 }, minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: { xs: 1.5, md: 2 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, background: gradients.primary, color: '#fff', fontSize: { xs: '0.62rem', sm: '0.68rem' }, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', px: 1.5, py: 0.6, borderRadius: '50px' }}>
                <AutoAwesomeIcon sx={{ fontSize: '0.75rem' }} />
                MGM Cultural · Exclusive Event
              </Box>
            </Stack>

            <Typography component="h1" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: { xs: '1.85rem', sm: '2.4rem', md: '3.2rem', lg: '3.6rem' }, lineHeight: 1.12, color: colors.ivory, mb: { xs: 1.25, md: 1.5 } }}>
              Ten Nights of{' '}
              <Box component="span" sx={{ background: gradients.heroText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundSize: '200% auto', animation: 'shimmer 4s ease-in-out infinite' }}>
                Garba
              </Box>
            </Typography>

            <Typography sx={{ fontSize: { xs: '0.9rem', md: '1.02rem' }, color: colors.mutedLight, lineHeight: 1.7, maxWidth: 500, mb: { xs: 2, md: 2.5 } }}>
              Devotion. Dance. Dandiya. Experience the joy of Navratri like never before at Rajkot&apos;s grand ten-night celebration.
            </Typography>

            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mb: { xs: 2.5, md: 3 } }}>
              {heroMetaChips.map(({ icon: Icon, label, href }) => (
                <Chip key={label} component={href ? 'a' : undefined} href={href} target={href ? '_blank' : undefined} rel={href ? 'noopener noreferrer' : undefined} clickable={!!href} icon={<Icon sx={{ fontSize: '0.95rem !important', color: `${colors.gold} !important` }} />} label={label} sx={{ bgcolor: colors.bg, border: '1px solid rgba(184,134,11,0.18)', color: colors.ivory, fontWeight: 600, fontSize: { xs: '0.72rem', sm: '0.8rem' }, height: 'auto', py: 0.5, maxWidth: '100%', boxShadow: '0 2px 8px rgba(44,31,16,0.04)', '& .MuiChip-label': { px: 0.75, whiteSpace: 'normal' }, '&:hover': href ? { bgcolor: colors.bg, borderColor: colors.gold } : {} }} />
              ))}
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
              <Button onClick={() => navigate('/event/1')} startIcon={<ConfirmationNumberOutlinedIcon />} sx={{
                background: gradients.primary, color: '#fff', px: 3, py: { xs: 1.35, md: 1.5 }, minHeight: 48, fontSize: { xs: '0.9rem', md: '0.95rem' }, fontWeight: 700, borderRadius: '50px',
                boxShadow: '0 8px 24px rgba(184,134,11,0.3)', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(184,134,11,0.4)' },
                '&:active': { transform: 'translateY(0)' },
              }}>
                Book Tickets
              </Button>
              <Button component="a" href="#upcoming" startIcon={<CalendarMonthOutlinedIcon />} sx={{
                bgcolor: colors.bg, color: colors.ivory, border: '1.5px solid rgba(184,134,11,0.35)', px: 3, py: { xs: 1.35, md: 1.5 }, minHeight: 48, fontSize: { xs: '0.9rem', md: '0.95rem' }, fontWeight: 700, borderRadius: '50px',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                '&:hover': { bgcolor: colors.bg, borderColor: colors.gold, transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(44,31,16,0.10)' },
              }}>
                Explore Events
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>

      <Box sx={{ borderTop: '1px solid rgba(184,134,11,0.15)', bgcolor: 'rgba(255,255,255,0.40)', backdropFilter: 'blur(4px)', py: { xs: 2, md: 3 }, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 2.5, md: 4 } }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 2, md: 3 } }}>
            {heroFeatures.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
