import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import './styles/animations.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { Outlet, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import App from './App.jsx'
import BookingFlow from './components/BookingFlow.jsx'
import EventDetail from './components/EventDetail.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import RefundPolicy from './components/RefundPolicy.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import theme from './theme.js'

function ScrollToTopLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.search])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return (
    <Box sx={{ animation: 'mgm-page-in 0.35s ease', '@keyframes mgm-page-in': { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
      <Outlet />
      <WhatsAppFloat />
    </Box>
  )
}

const router = createBrowserRouter([
  {
    element: <ScrollToTopLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/book',
        element: <BookingFlow />,
      },
      {
        path: '/event/:eventId',
        element: <EventDetail />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/refund-policy',
        element: <RefundPolicy />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
