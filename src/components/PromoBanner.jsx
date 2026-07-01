import Box from '@mui/material/Box'
import promoBanner from '../assets/image.png'

export default function PromoBanner() {
  return (
    <Box
      component="section"
      aria-label="MGM Cultural Navratri promotional banner"
      sx={{
        width: '100%',
        lineHeight: 0,
        bgcolor: '#1a0a0a',
      }}
    >
      <Box
        component="img"
        src={promoBanner}
        alt="MGM Cultural Navratri 2025 — Rajkot"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </Box>
  )
}
