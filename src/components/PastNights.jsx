import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { RevealBox, SectionHead } from './shared'
import { colors, gradients } from '../constants/colors'
import { navLinks, pastHighlights } from '../data/siteData'

export default function PastNights() {
  return (
    <Box component="section" id="past" sx={{ py: 6.25 }}>
      <Container maxWidth="lg">
        <SectionHead
          eyebrow="Throwback"
          title="Past Nights, Forever Memories"
          description="Highlights from Navratri 2025 — over 25,000 dancers across nine nights."
        />
      </Container>

      <RevealBox
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
          gap: 1.25,
          px: 2.25,
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
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                zIndex: 1,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </RevealBox>
    </Box>
  )
}

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: colors.bgSoft,
        color: colors.muted,
        pt: 5.25,
        pb: 3,
        mt: 4.25,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gap: 3.25,
            gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1fr 1fr' },
            px: 2.25,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: '"Unbounded", sans-serif',
                color: colors.ivory,
                fontSize: '1.2rem',
                fontWeight: 700,
              }}
            >
              MGM Cultural
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', mt: 1.25, maxWidth: 320 }}>
              Rajkot&apos;s nine-night Garba celebration — devotion, dance and community, since 2018.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 1.75 }}>
              {['IG', 'FB', 'YT'].map((label) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  sx={{
                    width: 38,
                    height: 38,
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
                color: colors.teal,
                mb: 1.5,
                fontWeight: 700,
              }}
            >
              Explore
            </Typography>
            <Stack component="ul" spacing={1.1} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              {navLinks.slice(0, 3).map((link) => (
                <Box component="li" key={link.href}>
                  <Link href={link.href} sx={{ color: 'inherit', '&:hover': { color: colors.ivory } }}>
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
                color: colors.teal,
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
                color: colors.teal,
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
    </Box>
  )
}
