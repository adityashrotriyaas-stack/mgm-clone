import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { RevealBox, SectionHead } from './shared'
import { colors, gradients } from '../constants/colors'
import { navLinks, pastHighlights } from '../data/siteData'
import FestiveSection from './FestiveSection'

export default function PastNights() {
  return (
    <FestiveSection id="past" variant="cream" showAccent={false} sx={{ py: { xs: 4.5, md: 6.25 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 } }}>
        <SectionHead
          eyebrow="Throwback"
          title="Past Nights, Forever Memories"
          description="Highlights from Navratri 2025 — over 25,000 dancers across ten nights."
        />
      </Container>

      <RevealBox
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
          gap: { xs: 1.5, md: 1.25 },
          px: { xs: 2, sm: 2.5, md: 3 },
          maxWidth: 'lg',
          mx: 'auto',
        }}
      >
        {pastHighlights.map((item) => (
          <Box
            key={item.label}
            sx={{
              aspectRatio: '1 / 1',
              borderRadius: '14px',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.03)' },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(transparent 50%, rgba(80,55,20,0.35))',
              },
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 10,
                right: 10,
                color: '#fff',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                fontWeight: 700,
                zIndex: 1,
                lineHeight: 1.3,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </RevealBox>
    </FestiveSection>
  )
}

export function Footer() {
  return (
    <FestiveSection
      component="footer"
      variant="night"
      showAccent={false}
      sx={{
        pt: { xs: 4, md: 5.25 },
        pb: { xs: 'calc(24px + env(safe-area-inset-bottom, 0px))', md: 3 },
        mt: 0,
        color: 'rgba(255, 245, 230, 0.72)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 3.25 },
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.4fr 1fr 1fr 1fr' },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: '"Unbounded", sans-serif',
                color: colors.textLight,
                fontSize: '1.2rem',
                fontWeight: 700,
              }}
            >
              MGM Cultural
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', mt: 1.25, maxWidth: 320 }}>
              Rajkot&apos;s ten-night Garba celebration — devotion, dance and community, since 2023.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 1.75 }}>
              {['IG', 'FB', 'YT'].map((label) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    '&:hover': {
                      background: gradients.primary,
                      color: colors.bg,
                    },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '1.8px',
                color: colors.gold,
                mb: 1.5,
                fontWeight: 700,
              }}
            >
              Explore
            </Typography>
            <Stack component="ul" spacing={1.1} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              {navLinks.slice(0, 3).map((link) => (
                <Box component="li" key={link.href}>
                  <Link href={link.href} sx={{ color: 'inherit', '&:hover': { color: colors.textLight } }}>
                    {link.label === 'Past Nights' ? 'Past Highlights' : link.label}
                  </Link>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '1.8px',
                color: colors.gold,
                mb: 1.5,
                fontWeight: 700,
              }}
            >
              Venue
            </Typography>
            <Stack component="ul" spacing={1.1} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              <Box component="li">Seasons Hotel</Box>
              <Box component="li">Rajkot, Gujarat</Box>
              <Box component="li">Gates open 7:30 PM</Box>
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '1.8px',
                color: colors.gold,
                mb: 1.5,
                fontWeight: 700,
              }}
            >
              Support
            </Typography>
            <Stack component="ul" spacing={1.1} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              <Box component="li">+91 98765 43210</Box>
              <Box component="li">hello@mgmcultural.in</Box>
              <Box component="li">Organiser Login</Box>
            </Stack>
          </Box>
        </Box>

        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '0.78rem',
            opacity: 0.6,
            mt: 3.75,
            pt: 2.25,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          © 2026 MGM Cultural Navratri. All rights reserved.
        </Typography>
      </Container>
    </FestiveSection>
  )
}
