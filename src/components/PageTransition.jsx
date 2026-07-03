import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'

export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <Box
      key={location.pathname}
      sx={{
        animation: 'fadeSlideUp 0.35s ease',
      }}
    >
      {children}
    </Box>
  )
}
