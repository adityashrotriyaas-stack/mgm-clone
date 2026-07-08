import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import { colors, gradients } from '../constants/colors'
import { Eyebrow } from './shared'
import FestiveSection from './FestiveSection'
import AboutDeviArt from './AboutDeviArt'
import { useEffect, useRef, useState } from 'react'
import aboutBg from '../assets/about-bg.png'

const highlights = [
  { icon: AutoAwesomeOutlinedIcon, label: '10 Nights of Garba' },
  { icon: MusicNoteOutlinedIcon, label: 'Live Music & Dhol' },
  { icon: FavoriteBorderOutlinedIcon, label: 'Premium Experience' },
]

function useAboutReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function AboutCopy({ visible }) {
  const blocks = [
    "Lights, dhol beats and a thousand swirling chaniya cholis — Rajkot's biggest Garba celebration returns to Seasons Hotel for ten unforgettable nights.",
    'Rooted in devotion and elevated with premium hospitality, MGM Cultural Navratri brings together families, friends, dancers, and music lovers for a festive experience that feels grand, warm, and deeply traditional.',
    'Expect vibrant decor, energetic performances, curated food stalls, and the kind of atmosphere where every evening feels like a celebration of culture, connection, and joy.',
  ]

  return (
    <Box sx={{ flex: 1, maxWidth: { lg: '48%' } }}>
      <Box
        sx={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <Eyebrow>About The Celebration</Eyebrow>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.65rem', sm: '2rem', md: '3rem' },
            lineHeight: 1.15,
            mb: 2,
            color: colors.textLight,
          }}
        >
          MGM CULTURAL
          <Box component="span" sx={{ display: 'block', color: colors.gold }}>
            Navratri 2026
          </Box>
        </Typography>
      </Box>

      {blocks.map((text, index) => (
        <Typography
          key={text.slice(0, 24)}
          sx={{
            fontSize: { xs: '0.95rem', md: index === 0 ? '1.05rem' : '1rem' },
            color: colors.muted,
            lineHeight: 1.85,
            mb: index < blocks.length - 1 ? 2 : 2.5,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(18px)',
            transition: `opacity 0.7s ease ${0.15 + index * 0.12}s, transform 0.7s ease ${0.15 + index * 0.12}s`,
          }}
        >
          {text}
        </Typography>
      ))}

      <Stack
        direction="row"
        flexWrap="wrap"
        useFlexGap
        spacing={1}
        sx={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s',
        }}
      >
        {highlights.map(({ icon: Icon, label }) => (
          <Box
            key={label}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.25,
              py: 0.65,
              borderRadius: '50px',
              border: `1px solid ${colors.border}`,
              bgcolor: 'rgba(53, 36, 24, 0.5)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: colors.textLight,
            }}
          >
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: '8px',
                background: gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.night,
              }}
            >
              <Icon sx={{ fontSize: '0.95rem' }} />
            </Box>
            {label}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default function AboutSection() {
  const { ref, visible } = useAboutReveal()

  return (
    <FestiveSection
      id="about"
      variant="cream"
      showAccent={false}
      sx={{
        py: { xs: 6, md: 9 },
        backgroundColor: '#1A0A12',
        backgroundImage: `
          linear-gradient(180deg, rgba(18,7,10,0.58) 0%, rgba(18,7,10,0.38) 45%, rgba(18,7,10,0.55) 100%),
          url(${aboutBg})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': { display: 'none' },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4 } }}>
        <Stack
          ref={ref}
          direction={{ xs: 'column', lg: 'row' }}
          spacing={{ xs: 4, lg: 6 }}
          alignItems={{ xs: 'stretch', lg: 'center' }}
        >
          <AboutCopy visible={visible} />

          <Box
            sx={{
              flex: 1,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(28px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
            }}
          >
            <AboutDeviArt />
          </Box>
        </Stack>
      </Container>
    </FestiveSection>
  )
}
