import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import { navLinks } from '../data/siteData'
import { colors, gradients } from '../constants/colors'
import { patternNight } from '../constants/navratriTheme'
import logoImg from '../assets/logo.jpeg'

export default function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1200,
        bgcolor: scrolled ? 'rgba(42, 14, 0, 0.72)' : 'rgba(26, 8, 0, 0.95)',
        borderBottom: scrolled
          ? '1px solid rgba(255, 179, 0, 0.3)'
          : '1px solid rgba(255, 179, 0, 0.12)',
        boxShadow: scrolled
          ? '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 20px rgba(255, 179, 0, 0.06)'
          : '0 4px 24px rgba(0, 0, 0, 0.4)',
        color: colors.textLight,
        overflow: 'hidden',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.3)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.3)' : 'none',
        transition:
          'background-color 0.28s ease, backdrop-filter 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: patternNight,
          opacity: scrolled ? 0.3 : 0.6,
          pointerEvents: 'none',
          transition: 'opacity 0.28s ease',
        },
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 3 },
            py: scrolled ? { xs: 1.1, md: 1.35 } : { xs: 1.5, md: 2 },
            minHeight: 'auto',
            gap: 2,
            transition: 'padding 0.28s ease',
          }}
        >
<Link href="#home" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', flexShrink: 0 }}>
            <img
              src={logoImg}
              alt="MGM Navratri"
              width="60"
              height="60"
              style={{
                width: '60px',
                height: '60px',
                maxWidth: '60px',
                maxHeight: '60px',
                flexShrink: 0,
              }}
            />
            <Box sx={{ display: { xs: 'block', sm: 'none' }, minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: '#FFF8E7',
                  letterSpacing: '0.3px',
                }}
              >
                MGM Navratri
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { sm: '0.95rem', md: '1.05rem' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: '#FFF8E7',
                  letterSpacing: '0.5px',
                }}
              >
                MGM CULTURAL NAVRATRI
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.58rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#F7C76B',
                  fontWeight: 600,
                  mt: 0.25,
                }}
              >
                Ten Nights of Garba
              </Typography>
            </Box>
          </Link>

          <Stack
            component="nav"
            direction="row"
            spacing={{ md: 2.5, lg: 3.5 }}
            sx={{ display: { xs: 'none', lg: 'flex' }, flex: 1, justifyContent: 'center' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  if (link.href.startsWith('/')) {
                    navigate(link.href)
                  } else {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                sx={{
                  color: link.active ? '#FFF8E7' : 'rgba(255,248,231,0.72)',
                  fontWeight: link.active ? 700 : 500,
                  fontSize: '0.88rem',
                  position: 'relative',
                  pb: 0.5,
                  textDecoration: 'none',
                  '&:hover': { color: '#FFF8E7' },
                  ...(link.active && {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '15%',
                      right: '15%',
                      height: 3,
                      bgcolor: '#FFB300',
                      borderRadius: 1,
                      boxShadow: '0 0 10px rgba(255,179,0,0.5)',
                    },
                  }),
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          <Button
            onClick={() => navigate('/event/1')}
            startIcon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              background: gradients.button,
              color: '#231509',
              px: 2.5,
              py: 1.2,
              fontSize: '0.86rem',
              fontWeight: 700,
              borderRadius: '50px',
              boxShadow: '0 8px 22px rgba(234, 90, 0, 0.35)',
              transition: 'transform 0.15s ease, box-shadow 0.2s ease',
              '&:hover': {
                background: gradients.buttonHover,
                transform: 'scale(1.03) translateY(-2px)',
                boxShadow: '0 14px 30px rgba(234, 90, 0, 0.50)',
              },
              '&:active': {
                transform: 'scale(0.97) translateY(0)',
              },
            }}
          >
            Get Your Pass
          </Button>

          <IconButton
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              display: { xs: 'inline-flex', lg: 'none' },
              color: '#FFF8E7',
              width: 44,
              height: 44,
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Collapse in={open} sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Box
            sx={{
              bgcolor: scrolled ? 'rgba(26, 14, 0, 0.80)' : 'rgba(42, 22, 0, 0.95)',
              backdropFilter: scrolled ? 'blur(14px)' : 'none',
              WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
              px: 2,
              pb: 2,
              borderTop: '1px solid rgba(255, 220, 150, 0.1)',
            }}
          >
            <Stack component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {navLinks.map((link) => (
                <Box component="li" key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      closeMenu()
                      e.preventDefault()
                      if (link.href.startsWith('/')) {
                        navigate(link.href)
                      } else {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    sx={{
                      display: 'block',
                      py: 1.4,
                      color: link.active ? '#FFF8F0' : 'rgba(255,248,240,0.80)',
                      fontWeight: link.active ? 700 : 600,
                      fontSize: '0.95rem',
                      borderBottom: link.active ? '2px solid rgba(255,179,0,0.5)' : '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
                      pl: link.active ? 1 : 0,
                      borderLeft: link.active ? '3px solid #FFB300' : '3px solid transparent',
                    }}
                  >
                    {link.mobileLabel || link.label}
                  </Link>
                </Box>
              ))}
              <Box component="li" sx={{ mt: 1.25 }}>
                  <Button
                    onClick={() => {
                      closeMenu()
                      navigate('/event/1')
                    }}
                    fullWidth
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      borderRadius: '50px',
                      py: 1.4,
                      fontWeight: 700,
                      background: gradients.button,
                      color: '#3A1C00',
                      transition: 'transform 0.15s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        background: gradients.buttonHover,
                        transform: 'scale(1.02) translateY(-2px)',
                        boxShadow: '0 14px 30px rgba(234, 90, 0, 0.45)',
                      },
                      '&:active': {
                        transform: 'scale(0.97)',
                      },
                    }}
                  >
                  <ConfirmationNumberOutlinedIcon sx={{ fontSize: '1.1rem' }} />
                  Get Your Pass
                </Button>
              </Box>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  )
}
