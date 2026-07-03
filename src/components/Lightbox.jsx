import { useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { colors } from '../constants/colors'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const item = images[index]
  if (!item) return null

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed', inset: 0, zIndex: 1500,
        bgcolor: 'rgba(44,31,16,0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeSlideUp 0.25s ease',
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: { xs: 12, md: 20 }, right: { xs: 12, md: 20 }, color: '#fff', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' } }}
      >
        <CloseRoundedIcon />
      </IconButton>

      <IconButton
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        sx={{ position: 'absolute', left: { xs: 8, md: 20 }, top: '50%', transform: 'translateY(-50%)', color: '#fff', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' }, display: images.length > 1 ? 'flex' : 'none' }}
      >
        <ChevronLeftRoundedIcon sx={{ fontSize: '1.8rem' }} />
      </IconButton>

      <IconButton
        onClick={(e) => { e.stopPropagation(); onNext() }}
        sx={{ position: 'absolute', right: { xs: 8, md: 20 }, top: '50%', transform: 'translateY(-50%)', color: '#fff', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' }, display: images.length > 1 ? 'flex' : 'none' }}
      >
        <ChevronRightRoundedIcon sx={{ fontSize: '1.8rem' }} />
      </IconButton>

      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{ maxWidth: '85vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.label}
          sx={{
            maxWidth: '100%', maxHeight: '75vh', borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            animation: 'scaleIn 0.3s ease',
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>{item.label}</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
            {index + 1} / {images.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
