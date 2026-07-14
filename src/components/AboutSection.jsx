import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import { colors, gradients } from '../constants/colors'
import { Eyebrow } from './shared'
import FestiveSection from './FestiveSection'
import AboutDeviArt from './AboutDeviArt'
import { useEffect, useRef, useState } from 'react'
import aboutBg from '../assets/about-bg.png'
import { aboutContent } from '../data/siteData'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const highlightIcons = [
  AutoAwesomeOutlinedIcon,
  MusicNoteOutlinedIcon,
  GroupsOutlinedIcon,
  FavoriteBorderOutlinedIcon,
]

const highlights = aboutContent.highlights.map((label, index) => ({
  icon: highlightIcons[index % highlightIcons.length],
  label,
}))

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
  const blocks = aboutContent.paragraphs

  return (
    <Box sx={{ flex: 1, maxWidth: { lg: '48%' }, bgcolor: 'rgba(26, 8, 0, 0.35)', borderRadius: '24px', p: { xs: 2, md: 3 }, backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 179, 0, 0.1)' }}>
      <Box
        sx={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <Eyebrow>{aboutContent.eyebrow}</Eyebrow>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.65rem', sm: '2rem', md: '3rem' },
            lineHeight: 1.15,
            mb: 1,
            color: colors.textLight,
          }}
        >
          {aboutContent.titleLine1}
          <Box component="span" sx={{ display: 'block', color: colors.gold }}>
            {aboutContent.titleLine2}
          </Box>
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.35rem' },
            fontStyle: 'italic',
            color: 'rgba(255, 245, 230, 0.88)',
            mb: 2,
            lineHeight: 1.4,
          }}
        >
          {aboutContent.subtitle}
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
        useFlexGap
        spacing={1}
        sx={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s',
          flexWrap: 'wrap',
        }}
      >
        {highlights.map(({ icon: Icon, label }, chipIndex) => (
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
              bgcolor: 'rgba(42, 22, 0, 0.5)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: colors.textLight,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.94)',
              transition: `opacity 0.55s ease ${0.6 + chipIndex * 0.08}s, transform 0.55s ${EASE} ${0.6 + chipIndex * 0.08}s`,
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
                color: colors.textLight,
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
        backgroundColor: '#3A1C00',
        backgroundImage: `
          linear-gradient(180deg, rgba(234,90,0,0.12) 0%, rgba(10,6,0,0.40) 40%, rgba(10,6,0,0.60) 100%),
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
