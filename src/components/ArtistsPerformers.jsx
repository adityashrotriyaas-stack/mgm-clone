import { useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { useNavigate } from 'react-router-dom'
import amitDhorda from '../assets/amit-dhorda.png'
import { colors } from '../constants/colors'
import { RevealBox, RevealGroup } from './shared'

const artists = [
  {
    id: 'amit',
    name: 'Amit Dhorda',
    role: 'Main Singer · Garba',
    tag: 'Lead Artist',
    image: amitDhorda,
    imagePosition: 'center 12%',
  },
  {
    id: 'kinjal',
    name: 'Kinjal Dave',
    role: 'Folk & Garba Queen',
    tag: 'Live Garba',
    image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=700&h=900&fit=crop',
  },
  {
    id: 'geeta',
    name: 'Geeta Rabari',
    role: 'Devotional Garba Star',
    tag: 'Devotional Night',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&h=900&fit=crop',
  },
  {
    id: 'isha',
    name: 'Isha Malviya',
    role: 'Playback Singer',
    tag: 'Special Performance',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&h=900&fit=crop',
  },
  {
    id: 'parth',
    name: 'Parth Oza',
    role: 'Sufi & Fusion Voice',
    tag: 'Live Stage',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&h=900&fit=crop',
  },
  {
    id: 'jignesh',
    name: 'Jignesh Kaviraj',
    role: 'Garba Sensation',
    tag: 'High Energy',
    image: 'https://images.unsplash.com/photo-1514320291840-75f0a710a6ad?w=700&h=900&fit=crop',
  },
]

const highlights = [
  { icon: GroupsOutlinedIcon, title: 'Top Artists', text: 'Renowned singers & performers' },
  { icon: MusicNoteRoundedIcon, title: 'Live Music', text: 'Experience pure musical energy' },
  { icon: AutoAwesomeOutlinedIcon, title: 'Unforgettable Nights', text: "Moments you'll cherish forever" },
  { icon: ShieldOutlinedIcon, title: 'Premium Experience', text: 'Sound, lights & hospitality' },
]

function LotusDivider({ maxWidth = 280 }) {
  return (
    <Box
      aria-hidden
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        maxWidth,
        width: '100%',
        mx: 'auto',
        color: colors.gold,
      }}
    >
      <Box sx={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${colors.gold})` }} />
      <Box sx={{ fontSize: '0.55rem', lineHeight: 1, opacity: 0.9 }}>◈</Box>
      <Box sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1 }}>❀</Box>
      <Box sx={{ fontSize: '0.55rem', lineHeight: 1, opacity: 0.9 }}>◈</Box>
      <Box sx={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${colors.gold}, transparent)` }} />
    </Box>
  )
}

function ArtistCard({ artist, active = false, offset = 0, onSelect }) {
  const absOffset = Math.abs(offset)

  return (
    <Box
      onClick={onSelect}
      sx={{
        position: 'relative',
        width: active
          ? { xs: 'min(72vw, 240px)', sm: 230, md: 268 }
          : { xs: 'min(52vw, 160px)', sm: 168, md: 190 },
        height: active ? { xs: 305, sm: 360, md: 420 } : { xs: 245, sm: 290, md: 335 },
        flexShrink: 0,
        cursor: 'pointer',
        alignSelf: 'flex-end',
        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease, opacity 0.3s ease',
        zIndex: active ? 5 : 4 - absOffset,
        opacity: active ? 1 : absOffset === 1 ? 0.94 : 0.82,
        filter: active ? 'none' : 'saturate(0.9) brightness(0.9)',
        transform: {
          xs: `scale(${active ? 1 : absOffset === 1 ? 0.94 : 0.88})`,
          md: 'none',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          clipPath: 'polygon(0 16%, 7% 7%, 16% 2.5%, 50% 0, 84% 2.5%, 93% 7%, 100% 16%, 100% 100%, 0 100%)',
          borderRadius: '0 0 20px 20px',
          overflow: 'hidden',
          border: active ? '2.5px solid rgba(234, 90, 0, 0.85)' : '1.5px solid rgba(255, 179, 0, 0.5)',
          boxShadow: active
            ? '0 0 0 1px rgba(234, 90, 0,0.22), 0 20px 42px rgba(0,0,0,0.38), 0 0 34px rgba(255, 179, 0,0.3)'
            : '0 10px 24px rgba(0,0,0,0.26)',
          backgroundImage: `linear-gradient(180deg, rgba(10,6,0,0.02) 8%, rgba(10,6,0,0.35) 48%, rgba(10,6,0,0.9) 100%), url(${artist.image})`,
          backgroundSize: 'cover',
          backgroundPosition: artist.imagePosition || 'center top',
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 2,
          left: '10%',
          right: '10%',
          height: active ? 46 : 36,
          borderTop: active ? '2px solid rgba(234, 90, 0,0.7)' : '1px solid rgba(255, 179, 0,0.38)',
          borderLeft: active ? '1.5px solid rgba(234, 90, 0,0.35)' : '1px solid rgba(255, 179, 0,0.2)',
          borderRight: active ? '1.5px solid rgba(234, 90, 0,0.35)' : '1px solid rgba(255, 179, 0,0.2)',
          borderRadius: '999px 999px 0 0',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          px: active ? 1.6 : 1.1,
          pb: active ? 1.6 : 1.25,
          pt: 3,
          textAlign: 'center',
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,6,0,0.68) 32%, rgba(10,6,0,0.96) 100%)',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#F0E8E0',
            fontSize: active ? { xs: '0.95rem', md: '1.12rem' } : { xs: '0.74rem', md: '0.86rem' },
            lineHeight: 1.15,
            mb: 0.35,
          }}
        >
          {artist.name}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,245,230,0.84)',
            fontSize: active ? { xs: '0.76rem', md: '0.84rem' } : { xs: '0.64rem', md: '0.72rem' },
            mb: active ? 0.9 : 0.7,
          }}
        >
          {artist.role}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: active ? 1.5 : 1.1,
            py: active ? 0.38 : 0.28,
            borderRadius: '999px',
            border: '1px solid rgba(234, 90, 0, 0.7)',
            color: '#F0E8E0',
            fontSize: active ? '0.62rem' : '0.54rem',
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            mb: active ? 1.1 : 0.85,
            bgcolor: 'transparent',
            whiteSpace: 'nowrap',
          }}
        >
          {artist.tag}
        </Box>
        <Box
          sx={{
            width: active ? 34 : 28,
            height: active ? 34 : 28,
            mx: 'auto',
            borderRadius: '50%',
            border: '1px solid rgba(234, 90, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F0E8E0',
            bgcolor: 'transparent',
          }}
        >
          {active ? (
            <MusicNoteRoundedIcon sx={{ fontSize: '1rem' }} />
          ) : (
            <MicNoneOutlinedIcon sx={{ fontSize: '0.85rem' }} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default function ArtistsPerformers() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 900)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const slides = useMemo(() => {
    const offsets = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2]
    return offsets.map((offset) => {
      const originalIndex = (activeIndex + offset + artists.length) % artists.length
      return {
        artist: artists[originalIndex],
        originalIndex,
        offset,
        isActive: offset === 0,
      }
    })
  }, [activeIndex, isMobile])

  const goPrev = () => setActiveIndex((current) => (current - 1 + artists.length) % artists.length)
  const goNext = () => setActiveIndex((current) => (current + 1) % artists.length)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 45) {
      if (diff > 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  return (
    <Box
      component="section"
      id="artists"
      sx={{
        position: 'relative',
        py: { xs: 6, md: 8.5 },
        overflow: 'hidden',
        color: colors.ivory,
        backgroundColor: '#3A1C00',
        backgroundImage: `linear-gradient(180deg, rgba(234,90,0,0.12) 0%, rgba(10,6,0,0.40) 35%, rgba(10,6,0,0.60) 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 2.5, md: 4 } }}>
        <RevealBox variant="blurUp" duration={0.85}>
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 3.75 } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.9, color: colors.gold, mb: 0.85 }}>
              <StarRoundedIcon sx={{ fontSize: '0.85rem', color: colors.gold }} />
              <Typography
                sx={{
                  fontSize: { xs: '0.62rem', md: '0.7rem' },
                  letterSpacing: { xs: '2.4px', md: '3.2px' },
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Star Artists
              </Typography>
              <StarRoundedIcon sx={{ fontSize: '0.85rem', color: colors.gold }} />
            </Box>

            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '1.7rem', sm: '2.15rem', md: '2.75rem' },
                lineHeight: 1.08,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 1,
              }}
            >
              <Box component="span" sx={{ color: '#FFF8EE' }}>
                Artists{' '}
              </Box>
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(180deg, #FFB300 0%, #EA5A00 55%, #C04E00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                &amp; Performers
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 500,
                mx: 'auto',
                color: 'rgba(255,245,230,0.86)',
                fontSize: { xs: '0.84rem', md: '0.92rem' },
                lineHeight: 1.65,
                mb: 1.4,
              }}
            >
              A new performer each night
            </Typography>

            <LotusDivider maxWidth={240} />
          </Box>
        </RevealBox>

        <RevealBox
          variant="scaleUp"
          delay={0.12}
          duration={0.9}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '40px minmax(0, 1fr) 40px', lg: '64px minmax(0, 1fr) 64px' },
            alignItems: 'center',
            gap: { xs: 0.75, lg: 1.5 },
            mb: { xs: 3.5, md: 4.5 },
          }}
        >
          <IconButton
            aria-label="Previous artist"
            onClick={goPrev}
            sx={{
              width: { xs: 40, lg: 52 },
              height: { xs: 40, lg: 52 },
              border: '1px solid rgba(255, 179, 0,0.55)',
              color: '#FFF8EE',
              justifySelf: 'center',
              '&:hover': { borderColor: 'rgba(234, 90, 0,0.95)', bgcolor: 'rgba(255, 179, 0,0.08)' },
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: { xs: '1.1rem', lg: '1.35rem' } }} />
          </IconButton>

          <Box
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: { xs: 0.8, md: 1.15 },
              overflow: { xs: 'hidden', md: 'visible' },
              pt: 1,
              pb: 1.5,
              px: { xs: 0.25, md: 1 },
              minHeight: { xs: 320, md: 430 },
              touchAction: 'pan-y',
              width: '100%',
              '&::-webkit-scrollbar': { height: 5 },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 179, 0,0.28)',
                borderRadius: 999,
              },
            }}
          >
            {slides.map(({ artist, originalIndex, offset, isActive }) => (
              <ArtistCard
                key={`${artist.id}-${offset}`}
                artist={artist}
                active={isActive}
                offset={offset}
                onSelect={() => setActiveIndex(originalIndex)}
              />
            ))}
          </Box>

          <IconButton
            aria-label="Next artist"
            onClick={goNext}
            sx={{
              width: { xs: 40, lg: 52 },
              height: { xs: 40, lg: 52 },
              border: '1px solid rgba(255, 179, 0,0.55)',
              color: '#FFF8EE',
              justifySelf: 'center',
              '&:hover': { borderColor: 'rgba(234, 90, 0,0.95)', bgcolor: 'rgba(255, 179, 0,0.08)' },
            }}
          >
            <ArrowForwardRoundedIcon sx={{ fontSize: { xs: '1.1rem', lg: '1.35rem' } }} />
          </IconButton>
        </RevealBox>

        <RevealBox variant="fadeUp" delay={0.2} duration={0.75}>
          <Box
            sx={{
              maxWidth: 920,
              mx: 'auto',
              mb: { xs: 3.5, md: 4 },
              px: { xs: 1.25, md: 1.5 },
              py: { xs: 1.75, md: 2 },
              borderRadius: '14px',
              border: '1px solid rgba(255, 179, 0,0.42)',
              background: 'linear-gradient(180deg, rgba(36,16,20,0.78) 0%, rgba(22,9,13,0.84) 100%)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: { xs: 1.75, md: 0 },
              }}
            >
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <Stack
                    key={item.title}
                    direction="row"
                    alignItems="center"
                    spacing={1.1}
                    sx={{
                      px: { xs: 0.5, md: 1.5 },
                      py: { xs: 0.25, md: 0.4 },
                      borderRight: {
                        xs: 'none',
                        md: index < highlights.length - 1 ? '1px solid rgba(255, 179, 0,0.22)' : 'none',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        flexShrink: 0,
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 179, 0,0.55)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.gold,
                      }}
                    >
                      <Icon sx={{ fontSize: '1rem' }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          color: '#F0E8E0',
                          fontWeight: 700,
                          fontSize: '0.74rem',
                          letterSpacing: '0.4px',
                          textTransform: 'uppercase',
                          lineHeight: 1.2,
                          mb: 0.25,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,245,230,0.72)', fontSize: '0.7rem', lineHeight: 1.35 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </Stack>
                )
              })}
            </Box>
          </Box>
        </RevealBox>

        <RevealBox variant="fadeUp" delay={0.28} sx={{ width: '100%' }}>
          <Stack alignItems="center" justifyContent="center" spacing={1.4} sx={{ width: '100%' }}>
            <Button
              onClick={() => navigate('/event/1')}
              startIcon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
              endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '1rem !important' }} />}
              sx={{
                background: 'linear-gradient(135deg, #FFB300 0%, #EA5A00 50%, #C04E00 100%)',
                color: '#3A1C00',
                px: { xs: 2.4, md: 3 },
                py: { xs: 0.9, md: 1 },
                minWidth: 'auto',
                width: 'fit-content',
                alignSelf: 'center',
                mx: 'auto',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: { xs: '0.86rem', md: '0.92rem' },
                textTransform: 'none',
                letterSpacing: '0.15px',
                boxShadow: '0 10px 26px rgba(255, 179, 0, 0.32)',
                '& .MuiButton-startIcon': { mr: 0.7 },
                '& .MuiButton-endIcon': { ml: 0.7 },
                '&:hover': {
                  background: 'linear-gradient(135deg, #FFB300 0%, #EA5A00 50%, #C04E00 100%)',
                  filter: 'brightness(1.05)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 14px 30px rgba(255, 179, 0, 0.4)',
                },
              }}
            >
              Book Your Pass Now
            </Button>
            <Box
              aria-hidden
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                width: '100%',
                color: colors.gold,
              }}
            >
              <Box sx={{ fontSize: '0.55rem', lineHeight: 1, opacity: 0.9 }}>◈</Box>
              <Box sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1 }}>❀</Box>
              <Box sx={{ fontSize: '0.55rem', lineHeight: 1, opacity: 0.9 }}>◈</Box>
            </Box>
          </Stack>
        </RevealBox>
      </Container>
    </Box>
  )
}
