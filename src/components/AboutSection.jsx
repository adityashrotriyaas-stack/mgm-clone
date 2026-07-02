import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import { colors, gradients } from '../constants/colors'
import { Eyebrow, HoverGlow, StaggerReveal } from './shared'

const aboutHighlights = [
  { icon: AutoAwesomeOutlinedIcon, title: 'Ten Nights · Garba & Dandiya', description: 'A festive atmosphere designed around tradition, celebration, and unforgettable energy.' },
  { icon: MusicNoteOutlinedIcon, title: 'Music, Rhythm, and Community', description: 'From dhol beats to live performances, every night is planned to keep the celebration alive.' },
  { icon: FavoriteBorderOutlinedIcon, title: 'Moments to Remember', description: 'Beautiful decor, joyful crowds, and a premium venue experience that feels special from entry to finale.' },
]

function HighlightCard({ icon: Icon, title, description }) {
  return (
    <HoverGlow sx={{ bgcolor: colors.bgSoft, borderRadius: '20px', p: { xs: 2.25, md: 3 }, border: '1px solid rgba(184,134,11,0.12)', boxShadow: '0 10px 26px rgba(44,31,16,0.05)', height: '100%' }}>
      <Box sx={{ width: 52, height: 52, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: gradients.primary, color: '#fff', mb: 2, transition: 'transform 0.3s ease', '@media (hover: hover)': { '&:hover': { transform: 'scale(1.1) rotate(-5deg)' } } }}>
        <Icon />
      </Box>
      <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: colors.ivory, mb: 1 }}>{title}</Typography>
      <Typography sx={{ fontSize: '0.92rem', color: colors.muted, lineHeight: 1.75 }}>{description}</Typography>
    </HoverGlow>
  )
}

export default function AboutSection() {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 6, md: 9 }, background: `linear-gradient(180deg, ${colors.heroCream} 0%, ${colors.bg} 100%)`, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${colors.glassBorder}, transparent)`, opacity: 0.5 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={{ xs: 4, lg: 6 }} alignItems="stretch">
          <Box sx={{ flex: 1, maxWidth: { lg: '48%' } }}>
            <Eyebrow>About The Celebration</Eyebrow>
            <Typography sx={{ fontSize: { xs: '0.92rem', sm: '1rem' }, color: colors.mutedLight, mb: 2.5, fontStyle: 'italic', maxWidth: 480, lineHeight: 1.6 }}>
              Each night brings a new theme — book early, ground passes are limited.
            </Typography>
            <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.65rem', sm: '2rem', md: '3rem' }, lineHeight: 1.15, mb: 2.5 }}>
              MGM CULTURAL
              <Box component="span" sx={{ display: 'block', background: gradients.heroText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Navratri 2026</Box>
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.08rem' }, color: colors.mutedLight, lineHeight: 1.85, mb: 2, position: 'relative', pl: { md: 3 }, borderLeft: { md: `2px solid ${colors.glassBorder}` } }}>
              Lights, dhol beats and a thousand swirling chaniya cholis — Rajkot&apos;s biggest Garba celebration returns to Seasons Hotel for ten unforgettable nights.
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: colors.muted, lineHeight: 1.85, mb: 2 }}>
              Rooted in devotion and elevated with premium hospitality, MGM Cultural Navratri brings together families, friends, dancers, and music lovers for a festive experience that feels grand, warm, and deeply traditional.
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: colors.muted, lineHeight: 1.85 }}>
              Expect vibrant decor, energetic performances, curated food stalls, and the kind of atmosphere where every evening feels like a celebration of culture, connection, and joy.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, position: 'relative', '&::before': { content: '""', position: { md: 'absolute' }, top: 0, bottom: 0, left: -12, width: '1px', background: `linear-gradient(180deg, transparent, ${colors.glassBorder}, transparent)`, display: { xs: 'none', md: 'block' } } }}>
            <StaggerReveal staggerMs={100} sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
              {aboutHighlights.map((item, index) => (
                <Box key={item.title} sx={{ gridColumn: { md: index === 0 ? '1 / -1' : 'auto' } }}>
                  <HighlightCard {...item} />
                </Box>
              ))}
            </StaggerReveal>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
