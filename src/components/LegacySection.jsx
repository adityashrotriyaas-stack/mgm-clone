import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { colors, gradients } from '../constants/colors'
import { legacyMoments } from '../data/siteData'
import { festiveCardSoftSx } from '../constants/navratriTheme'
import { RevealBox, SectionHead } from './shared'
import FestiveSection from './FestiveSection'

const icons = [
  AccessTimeOutlinedIcon,
  CelebrationOutlinedIcon,
  WorkspacePremiumOutlinedIcon,
  CelebrationOutlinedIcon,
]

function LegacyCard({ item, index }) {
  const Icon = icons[index % icons.length]

  return (
    <Box
      sx={{
        position: 'relative',
        ...festiveCardSoftSx,
        p: { xs: 2.25, md: 3 },
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          borderRadius: '0 0 0 100%',
          background: 'radial-gradient(circle at top right, rgba(212,175,55,0.20), transparent 68%)',
        }}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 74,
            px: 1.75,
            py: 0.85,
            borderRadius: '999px',
            background: gradients.primary,
            color: colors.night,
            fontWeight: 800,
            fontSize: '0.92rem',
          }}
        >
          {item.year}
        </Box>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: '14px',
            bgcolor: 'rgba(184,134,11,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.gold,
          }}
        >
          <Icon fontSize="small" />
        </Box>
      </Stack>

      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: colors.ivory, mb: 1 }}>
        {item.title}
      </Typography>
      <Typography sx={{ fontSize: '0.95rem', color: colors.muted, lineHeight: 1.8, mb: 2 }}>
        {item.description}
      </Typography>
      <Typography sx={{ fontSize: '0.82rem', color: colors.gold, fontWeight: 700, letterSpacing: '0.4px' }}>
        {item.highlight}
      </Typography>
    </Box>
  )
}

export default function LegacySection() {
  return (
    <FestiveSection id="legacy" variant="saffron" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4 } }}>
        <SectionHead
          eyebrow="Our Journey"
          title="A Celebration Through The Years"
          description="From the first season in 2023 to the fourth celebration in 2026, MGM Cultural Navratri has grown into a festive tradition people wait for every year."
        />

        <RevealBox
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
            gap: 2.25,
          }}
        >
          {legacyMoments.map((item, index) => (
            <LegacyCard key={item.year} item={item} index={index} />
          ))}
        </RevealBox>
      </Container>
    </FestiveSection>
  )
}
