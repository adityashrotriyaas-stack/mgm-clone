import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import { colors, gradients } from '../constants/colors'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 80, lg: 50 },
        left: { xs: 16, sm: 24 },
        zIndex: 1300,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <IconButton
        onClick={scrollToTop}
        aria-label="Scroll to top"
        sx={{
          width: 44, height: 44,
          borderRadius: '50%',
          background: gradients.primary,
          color: '#F0E8E0',
          boxShadow: '0 4px 14px rgba(192,29,22,0.3)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: '0 8px 20px rgba(192,29,22,0.4)',
          },
        }}
      >
        <KeyboardArrowUpRoundedIcon />
      </IconButton>
    </Box>
  )
}
