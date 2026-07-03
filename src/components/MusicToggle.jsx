import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import MusicOffRoundedIcon from '@mui/icons-material/MusicOffRounded'
import { colors, gradients } from '../constants/colors'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggle = () => {
    setPlaying((prev) => !prev)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 130, lg: 100 },
        right: { xs: 16, sm: 24 },
        zIndex: 1300,
        animation: 'float 3s ease-in-out infinite',
      }}
    >
      <IconButton
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: playing ? gradients.primary : colors.bgSoft,
          border: `1px solid ${playing ? 'transparent' : colors.glassBorder}`,
          color: playing ? '#fff' : colors.gold,
          boxShadow: playing
            ? '0 6px 20px rgba(184,134,11,0.35)'
            : '0 4px 14px rgba(44,31,16,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: gradients.primary,
            color: '#fff',
            transform: 'scale(1.1)',
            boxShadow: '0 8px 24px rgba(184,134,11,0.4)',
          },
        }}
      >
        {playing ? (
          <MusicNoteRoundedIcon sx={{ fontSize: '1.3rem' }} />
        ) : (
          <MusicOffRoundedIcon sx={{ fontSize: '1.3rem' }} />
        )}
      </IconButton>
      {playing && (
        <Box sx={{ display: 'flex', gap: 0.3, justifyContent: 'center', mt: 0.75 }}>
          {[0, 0.15, 0.3].map((delay) => (
            <Box
              key={delay}
              sx={{
                width: 3,
                height: 8,
                borderRadius: 2,
                background: colors.gold,
                animation: 'equalizer 0.6s ease-in-out infinite alternate',
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
