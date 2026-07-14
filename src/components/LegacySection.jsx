import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined'
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { colors, gradients } from '../constants/colors'
import { patternDiya, patternGarland, patternMandala } from '../constants/navratriTheme'
import { legacyMoments } from '../data/siteData'
import { RevealBox, RevealStagger, RevealStaggerItem } from './shared'
import FestiveSection from './FestiveSection'

const icons = [
  AccessTimeOutlinedIcon,
  CelebrationOutlinedIcon,
  WorkspacePremiumOutlinedIcon,
  LocalActivityOutlinedIcon,
]

function JourneyHeader() {
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mb: 1,
          color: colors.gold,
        }}
      >
        <Box sx={{ width: { xs: 20, md: 28 }, height: 1, bgcolor: 'rgba(255, 179, 0, 0.45)' }} />
        <Typography
          sx={{
            fontSize: { xs: '0.68rem', md: '0.78rem' },
            letterSpacing: { xs: '3px', md: '4px' },
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Our Journey
        </Typography>
        <Box sx={{ width: { xs: 20, md: 28 }, height: 1, bgcolor: 'rgba(255, 179, 0, 0.45)' }} />
      </Box>

      <Typography
        component="h2"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontSize: { xs: '2rem', sm: '2.8rem', md: '4rem' },
          lineHeight: 1.03,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          mb: 1.5,
        }}
      >
        <Box component="span" sx={{ color: '#FFF8EE', display: 'block' }}>
          A Celebration
        </Box>
        <Box
          component="span"
          sx={{
            background: 'linear-gradient(180deg, #FFB300 0%, #EA5A00 55%, #C04E00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block',
          }}
        >
          Through The Years
        </Box>
      </Typography>

      <Box
        aria-hidden
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.25,
          maxWidth: 300,
          mx: 'auto',
          mb: 2,
        }}
      >
        <Box sx={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${colors.gold})` }} />
        <Box sx={{ color: colors.gold, fontSize: { xs: '1rem', md: '1.2rem' } }}>❀</Box>
        <Box sx={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${colors.gold}, transparent)` }} />
      </Box>

      <Typography
        sx={{
          maxWidth: 620,
          mx: 'auto',
          color: 'rgba(255, 245, 230, 0.84)',
          fontSize: { xs: '0.95rem', md: '1.05rem' },
          lineHeight: 1.7,
        }}
      >
        From the first season in 2023 to the fourth celebration in 2026, MGM Cultural Navratri has grown into a
        grand cultural festival—where tradition, music, devotion, and India&apos;s finest artistic talent come together.
      </Typography>
    </Box>
  )
}

function TimelineCard({ item, index }) {
  const Icon = icons[index % icons.length]
  const isLeft = index % 2 === 0

  return (
    <Box
      sx={{
        gridColumn: { xs: '1', md: isLeft ? '1' : '3' },
        justifySelf: { xs: 'stretch', md: isLeft ? 'end' : 'start' },
        width: '100%',
        maxWidth: { xs: '100%', md: 390 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 2.25, md: 3 },
          minHeight: { md: 220 },
          borderRadius: '26px',
          background: `
            radial-gradient(circle at ${isLeft ? '80%' : '20%'} 0%, rgba(255, 179, 0, 0.16), transparent 26%),
            linear-gradient(180deg, rgba(52, 24, 22, 0.96) 0%, rgba(29, 10, 18, 0.96) 100%)
          `,
          border: '1px solid rgba(255, 179, 0, 0.55)',
          boxShadow: '0 0 0 1px rgba(255, 179, 0, 0.1), 0 18px 44px rgba(0, 0, 0, 0.34), 0 0 24px rgba(255, 179, 0, 0.14)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 26px)',
            opacity: 0.22,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '"❦"',
            position: 'absolute',
            top: 12,
            right: 18,
            color: 'rgba(255, 179, 0, 0.7)',
            fontSize: '1.6rem',
            lineHeight: 1,
            pointerEvents: 'none',
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.25 }}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 78,
                px: 2.2,
                py: 0.85,
                borderRadius: '999px',
                background: gradients.primary,
                color: colors.textLight,
                fontWeight: 800,
                fontSize: '0.96rem',
                boxShadow: '0 6px 18px rgba(255, 179, 0, 0.25)',
              }}
            >
              {item.year}
            </Box>

            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 179, 0, 0.08)',
                border: '1px solid rgba(255, 179, 0, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.gold,
              }}
            >
              <Icon sx={{ fontSize: '1rem' }} />
            </Box>
          </Stack>
        </Stack>

        <Typography
          sx={{
            fontSize: { xs: '1.35rem', md: '1.15rem' },
            fontWeight: 700,
            color: '#FFF8EE',
            lineHeight: 1.3,
            mb: 1.2,
            maxWidth: 320,
          }}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '0.98rem', md: '0.95rem' },
            color: 'rgba(255, 245, 230, 0.78)',
            lineHeight: 1.75,
            mb: 2.25,
            maxWidth: 330,
          }}
        >
          {item.description}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5}>
          <Typography sx={{ fontSize: '0.94rem', color: colors.gold, fontWeight: 700, lineHeight: 1.45 }}>
            {item.highlight}
          </Typography>

          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '1px solid rgba(255, 179, 0, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.gold,
              boxShadow: '0 0 16px rgba(255, 179, 0, 0.12)',
              flexShrink: 0,
            }}
          >
            <ArrowForwardRoundedIcon sx={{ fontSize: '1.35rem' }} />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

function TimelineSpine() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        gridColumn: '2',
        gridRow: '1 / span 4',
        justifySelf: 'center',
        alignSelf: 'stretch',
        position: 'relative',
        width: 40,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          background: 'linear-gradient(180deg, rgba(255, 179, 0,0.2), rgba(234, 90, 0,0.95), rgba(255, 179, 0,0.2))',
          boxShadow: '0 0 18px rgba(255, 179, 0, 0.24)',
        }}
      />

      {[0, 1, 2, 3].map((item) => (
        <Box
          key={item}
          sx={{
            position: 'absolute',
            left: '50%',
            top: `calc(${12 + item * 25}% - 15px)`,
            transform: 'translateX(-50%)',
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '2px solid rgba(234, 90, 0, 0.95)',
            bgcolor: 'rgba(53, 18, 24, 0.92)',
            boxShadow: '0 0 0 6px rgba(255, 179, 0, 0.08), 0 0 20px rgba(255, 179, 0, 0.45)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 5,
              borderRadius: '50%',
              background: gradients.primary,
            },
          }}
        />
      ))}
    </Box>
  )
}

export default function LegacySection() {
  return (
    <FestiveSection
      id="legacy"
      variant="night"
      showAccent={false}
      sx={{
        py: { xs: 6, md: 9 },
        backgroundImage: `
          radial-gradient(circle at 50% 18%, rgba(255, 179, 0,0.14), transparent 22%),
          radial-gradient(circle at 16% 20%, rgba(234, 90, 0,0.16), transparent 18%),
          radial-gradient(circle at 84% 22%, rgba(234, 90, 0,0.14), transparent 18%),
          linear-gradient(180deg, ${colors.night} 0%, #3A1C00 100%),
          ${patternDiya},
          ${patternMandala},
          ${patternGarland}
        `,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 12,
          left: 0,
          right: 0,
          height: 84,
          pointerEvents: 'none',
          opacity: 0.9,
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            width: '44%',
            height: 56,
            borderTop: '3px solid rgba(255, 179, 0, 0.18)',
          },
          '&::before': {
            left: 0,
            borderTopRightRadius: 120,
          },
          '&::after': {
            right: 0,
            borderTopLeftRadius: 120,
          },
        }}
      >
        {Array.from({ length: 14 }).map((_, index) => {
          const left = `${4 + index * 7}%`
          const top = index < 7 ? 18 + index * 3 : 36 - (index - 7) * 3
          return (
            <Box
              key={left}
              sx={{
                position: 'absolute',
                left,
                top,
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#FFB300',
                boxShadow: '0 0 8px rgba(255, 215, 106, 0.95), 0 0 18px rgba(255, 176, 74, 0.45)',
              }}
            />
          )
        })}
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, position: 'relative' }}>
        <RevealBox variant="blurUp">
          <JourneyHeader />
        </RevealBox>

        <RevealStagger
          stagger={0.12}
          sx={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 40px minmax(0, 1fr)' },
            rowGap: { xs: 2.5, md: 4 },
            columnGap: { md: 3.5, lg: 5 },
            alignItems: 'center',
          }}
        >
          <TimelineSpine />
          {legacyMoments.map((item, index) => (
            <RevealStaggerItem
              key={item.year}
              index={index}
              variant={index % 2 === 0 ? 'fadeRight' : 'fadeLeft'}
            >
              <TimelineCard item={item} index={index} />
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </Container>
    </FestiveSection>
  )
}
