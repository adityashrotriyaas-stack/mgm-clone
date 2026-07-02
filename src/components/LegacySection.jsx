import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { colors, gradients } from '../constants/colors'
import { legacyMoments } from '../data/siteData'
import { HoverGlow, SectionHead, StaggerReveal } from './shared'

const icons = [
  AccessTimeOutlinedIcon,
  CelebrationOutlinedIcon,
  WorkspacePremiumOutlinedIcon,
  CelebrationOutlinedIcon,
]

const yearColors = [colors.gold, colors.marigoldSoft, colors.coral, colors.marigold]

function LegacyCard({ item, index }) {
  const Icon = icons[index % icons.length]
  const yearAccent = yearColors[index % yearColors.length]
  return (
    <HoverGlow sx={{ position: 'relative', bgcolor: colors.bgSoft, borderRadius: '22px', p: { xs: 2.25, md: 3 }, border: '1px solid rgba(184,134,11,0.14)', boxShadow: '0 12px 28px rgba(44,31,16,0.05)', overflow: 'hidden', height: '100%' }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '0 0 0 100%', background: `radial-gradient(circle at top right, ${yearAccent}22, transparent 68%)` }} />
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: 4, height: '60%', borderRadius: '0 4px 4px 0', background: `linear-gradient(180deg, transparent, ${yearAccent}55)` }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 74, px: 1.75, py: 0.85, borderRadius: '999px', background: gradients.primary, color: '#fff', fontWeight: 800, fontSize: '0.92rem', transition: 'transform 0.3s ease', '@media (hover: hover)': { '&:hover': { transform: 'scale(1.05)' } } }}>
          {item.year}
        </Box>
        <Box sx={{ width: 42, height: 42, borderRadius: '14px', bgcolor: 'rgba(184,134,11,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.gold, transition: 'transform 0.3s ease, bgcolor 0.3s ease', '@media (hover: hover)': { '&:hover': { bgcolor: 'rgba(184,134,11,0.20)', transform: 'rotate(10deg) scale(1.1)' } } }}>
          <Icon fontSize="small" />
        </Box>
      </Stack>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: colors.ivory, mb: 1 }}>{item.title}</Typography>
      <Typography sx={{ fontSize: '0.95rem', color: colors.muted, lineHeight: 1.8, mb: 2 }}>{item.description}</Typography>
      <Typography sx={{ fontSize: '0.82rem', color: colors.gold, fontWeight: 700, letterSpacing: '0.4px' }}>{item.highlight}</Typography>
    </HoverGlow>
  )
}

function TimelineBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'space-between' }, gap: { xs: 1.5, md: 0 }, maxWidth: '90%', mx: 'auto', mb: 3, position: 'relative', overflow: { xs: 'auto', md: 'visible' }, px: { xs: 1, md: 0 }, pb: { xs: 1, md: 0 }, scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' }, '&::before': { content: '""', position: 'absolute', top: '50%', left: { xs: '24px', md: '4%' }, right: { xs: '24px', md: '4%' }, height: '2px', background: `linear-gradient(90deg, ${colors.glassBorder}, ${colors.glowStrong}, ${colors.glassBorder})`, transform: 'translateY(-50%)' } }}>
      {legacyMoments.map((item) => (
        <Box key={item.year} sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
          <Box sx={{ width: { xs: 12, md: 14 }, height: { xs: 12, md: 14 }, borderRadius: '50%', background: gradients.primary, boxShadow: `0 0 0 4px ${colors.bgSoft}` }} />
          <Typography sx={{ fontSize: { xs: '0.65rem', md: '0.72rem' }, fontWeight: 700, color: colors.gold, whiteSpace: 'nowrap' }}>{item.year}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default function LegacySection() {
  return (
    <Box component="section" id="legacy" sx={{ py: { xs: 6, md: 8 }, background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.heroCream} 100%)` }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4 } }}>
        <SectionHead eyebrow="Our Journey" title="A Celebration Through The Years" description="From the first season in 2023 to the fourth celebration in 2026, MGM Cultural Navratri has grown into a festive tradition people wait for every year." />
        <TimelineBar />
        <StaggerReveal staggerMs={80} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 2.25 }}>
          {legacyMoments.map((item, index) => (
            <LegacyCard key={item.year} item={item} index={index} />
          ))}
        </StaggerReveal>
      </Container>
    </Box>
  )
}
