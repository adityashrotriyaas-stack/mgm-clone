import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { useNavigate } from 'react-router-dom'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { RevealBox, SectionHead } from './shared'
import { colors, gradients } from '../constants/colors'
import { navLinks, pastHighlights } from '../data/siteData'

function DecorativeOrb({ size, top, left, right, bottom, delay = 0 }) {
  return (
    <Box sx={{ position: 'absolute', width: size, height: size, borderRadius: '50%', top, left, right, bottom, background: `radial-gradient(circle, ${colors.marigold}08, transparent 70%)`, animation: `float ${8}s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: 'none', zIndex: 0 }} />
  )
}

export default function PastNights() {
  const navigate = useNavigate()
  return (
    <Box component="section" id="past" sx={{ py: { xs: 5, md: 7 }, overflow: 'hidden', position: 'relative', background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.heroCream} 50%, ${colors.bg} 100%)` }}>
      <DecorativeOrb size={400} top="-120px" right="-80px" delay={0} />
      <DecorativeOrb size={300} bottom="-100px" left="-60px" delay={1.5} />
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.03, backgroundImage: `radial-gradient(circle at 30% 50%, ${colors.gold} 1px, transparent 1px), radial-gradient(circle at 70% 50%, ${colors.coral} 1px, transparent 1px)`, backgroundSize: '80px 80px, 100px 100px', backgroundPosition: '0 0, 40px 20px' }} />
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 }, position: 'relative', zIndex: 1 }}>
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
          gap: { xs: 1.5, md: 1.5 },
          px: { xs: 2, sm: 2.5, md: 3 },
          maxWidth: 'lg',
          mx: 'auto',
        }}
      >
        {pastHighlights.map((item, idx) => (
          <Box
            key={item.label}
            className="past-card"
            sx={{
              aspectRatio: '1 / 1',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              perspective: '600px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(44,31,16,0.06)',
              transition: 'box-shadow 0.4s ease',
              '@media (hover: hover)': {
                '&:hover': { boxShadow: '0 12px 32px rgba(44,31,16,0.14)' },
                '&:hover .past-card-inner': {
                  transform: 'rotateY(-3deg) rotateX(3deg) scale(1.05)',
                },
                '&:hover .past-card-overlay': {
                  opacity: 0.65,
                },
                '&:hover .past-card-img': {
                  transform: 'scale(1.12)',
                },
                '&:hover .past-card-label': {
                  transform: 'translateY(0)',
                  opacity: 1,
                },
                '&:hover .past-card-glow': {
                  opacity: 1,
                },
              },
            }}
          >
            <Box
              className="past-card-inner"
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <Box
                className="past-card-img"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                }}
              />
              <Box
                className="past-card-overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(transparent 35%, rgba(44,31,16,0.55))',
                  transition: 'opacity 0.45s ease',
                }}
              />
              <Box
                className="past-card-glow"
                sx={{
                  position: 'absolute',
                  inset: -1,
                  borderRadius: '17px',
                  border: '2px solid transparent',
                  background: `linear-gradient(135deg, ${colors.gold}, ${colors.coralLight}, ${colors.gold}) border-box`,
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  opacity: 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: 'none',
                }}
              />
              <Box
                className="past-card-label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: { xs: 1.25, sm: 1.5 },
                  background: 'linear-gradient(transparent, rgba(44,31,16,0.7))',
                  transform: 'translateY(4px)',
                  opacity: 0.95,
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontSize: { xs: '0.72rem', sm: '0.78rem' },
                    fontWeight: 700,
                    lineHeight: 1.3,
                    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </RevealBox>

      <Box sx={{ textAlign: 'center', mt: 3.5 }}>
        <Button
          onClick={() => navigate('/event/1')}
          endIcon={<AutoAwesomeOutlinedIcon />}
          sx={{
            display: 'inline-flex',
            px: 4,
            py: 1.4,
            borderRadius: '50px',
            background: gradients.primary,
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.3px',
            boxShadow: '0 8px 22px rgba(184,134,11,0.25)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-2px)', boxShadow: '0 12px 30px rgba(184,134,11,0.35)' },
          }}
        >
          View Full Gallery
        </Button>
      </Box>
    </Box>
  )
}

const socialLinks = [
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: FacebookRoundedIcon, label: 'Facebook', href: '#' },
  { icon: YouTubeIcon, label: 'YouTube', href: '#' },
]

const venueItems = [
  { icon: LocationOnOutlinedIcon, text: 'Seasons Hotel, Rajkot, Gujarat', href: 'https://www.google.com/maps/search/?api=1&query=Seasons+Hotel+Rajkot+Gujarat' },
  { icon: AccessTimeOutlinedIcon, text: 'Gates open 7:30 PM' },
]

const supportItems = [
  { icon: PhoneOutlinedIcon, text: '+91 98765 43210' },
  { icon: EmailOutlinedIcon, text: 'hello@mgmcultural.in' },
]

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: colors.bgSoft,
        color: colors.muted,
        pt: { xs: 4, md: 5.25 },
        pb: { xs: 'calc(24px + env(safe-area-inset-bottom, 0px))', md: 3 },
        mt: { xs: 2, md: 4.25 },
        borderTop: `1px solid ${colors.glassBorder}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: gradients.primary,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-40%',
          right: '-10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.marigold}06, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2.5, md: 3 }, position: 'relative', zIndex: 1 }}>
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
                color: colors.ivory,
                fontSize: '1.2rem',
                fontWeight: 700,
              }}
            >
              MGM Cultural
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', mt: 1.25, maxWidth: 320, lineHeight: 1.7 }}>
              Rajkot&apos;s ten-night Garba celebration — devotion, dance and community, since 2023.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 1.75 }}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.muted,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: gradients.primary,
                      color: colors.bg,
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 20px rgba(184,92,58,0.25)',
                    },
                  }}
                >
                  <Icon sx={{ fontSize: '1.2rem' }} />
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
              {navLinks.filter(l => l.label !== 'Gallery').map((link) => (
                <Box component="li" key={link.href}>
                  <Link
                    href={link.href}
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      transition: 'color 0.25s ease, padding-left 0.25s ease',
                      display: 'inline-block',
                      '&:hover': {
                        color: colors.marigoldSoft,
                        pl: 0.5,
                      },
                    }}
                  >
                    {link.label}
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
            <Stack component="ul" spacing={1.25} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              {venueItems.map(({ icon: Icon, text, href }) => (
                <Box component="li" key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon sx={{ fontSize: '1rem', color: colors.teal, flexShrink: 0 }} />
                  {href ? (
                    <Link href={href} target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: colors.gold } }}>{text}</Link>
                  ) : text}
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
              Support
            </Typography>
            <Stack component="ul" spacing={1.25} sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.88rem' }}>
              {supportItems.map(({ icon: Icon, text }) => (
                <Box component="li" key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon sx={{ fontSize: '1rem', color: colors.teal, flexShrink: 0 }} />
                  {text}
                </Box>
              ))}
              <Box component="li">
                <Link
                  href="#"
                  sx={{
                    color: colors.muted,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    transition: 'color 0.25s ease',
                    '&:hover': { color: colors.marigoldSoft },
                  }}
                >
                  Organiser Login
                </Link>
              </Box>
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
            borderTop: `1px solid ${colors.glassBorder}`,
          }}
        >
          &copy; 2026 MGM Cultural Navratri. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}
