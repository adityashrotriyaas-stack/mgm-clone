import { useState } from 'react'
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

export default function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        position: 'relative',
        bgcolor: colors.night,
        borderBottom: '1px solid rgba(232, 184, 74, 0.15)',
        boxShadow: '0 4px 24px rgba(26, 10, 18, 0.4)',
        color: colors.textLight,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: patternNight,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 2 },
            minHeight: 'auto',
            gap: 2,
          }}
        >
          <Link href="#home" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
            <Box
              sx={{
                width: { xs: 52, md: 60 },
                height: { xs: 52, md: 60 },
                borderRadius: '50%',
                border: '2px solid #F7C76B',
                background: 'radial-gradient(circle at 30% 30%, #F5E6B8, #D4AF37)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 14px rgba(247, 199, 107, 0.35)',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '0.55rem', md: '0.62rem' },
                  fontWeight: 700,
                  color: '#2C1F10',
                  textAlign: 'center',
                  lineHeight: 1.15,
                  px: 0.5,
                }}
              >
                MGM
              </Typography>
            </Box>
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
                      left: '20%',
                      right: '20%',
                      height: 2,
                      bgcolor: '#F7C76B',
                      borderRadius: 1,
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
              background: gradients.primary,
              color: '#231509',
              px: 2.5,
              py: 1.2,
              fontSize: '0.86rem',
              fontWeight: 700,
              borderRadius: '50px',
              boxShadow: '0 8px 22px rgba(230, 149, 75, 0.32)',
              '&:hover': {
                background: gradients.primary,
                filter: 'brightness(1.05)',
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
              bgcolor: 'rgba(45, 16, 24, 0.95)',
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
                    onClick={closeMenu}
                    sx={{
                      display: 'block',
                      py: 1.4,
                      color: link.active ? '#FFF8E7' : 'rgba(255,248,231,0.82)',
                      fontWeight: link.active ? 700 : 600,
                      fontSize: '0.95rem',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
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
                    background: gradients.primary,
                    color: '#231509',
                    '&:hover': {
                      background: gradients.primary,
                      filter: 'brightness(1.04)',
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
