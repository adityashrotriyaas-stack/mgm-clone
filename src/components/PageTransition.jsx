import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'

export default function PageTransition({ children }) {
  const location = useLocation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      window.scrollTo(0, 0)
      prevPath.current = location.pathname
    }
  }, [location.pathname])

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
