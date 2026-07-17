import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import './styles/animations.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { Navigate, Outlet, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import ProgressBar from './components/ProgressBar'
import { ToastProvider } from './components/Toast'
import { EnquiryProvider } from './components/EnquiryModal'
import WhatsAppFloat from './components/WhatsAppFloat'
import theme from './theme.js'

const BookingFlow = lazy(() => import('./components/BookingFlow.jsx'))
const EventDetail = lazy(() => import('./components/EventDetail.jsx'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy.jsx'))
const RefundPolicy = lazy(() => import('./components/RefundPolicy.jsx'))

function LoadingFallback() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#1A0800' }}>
      <CircularProgress sx={{ color: '#FFB300' }} />
    </Box>
  )
}

function ScrollToTopLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.search])

  return (
    <Box>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'fixed',
          top: -100,
          left: 8,
          zIndex: 2000,
          bgcolor: '#FFB300',
          color: '#1A0800',
          px: 2,
          py: 1,
          borderRadius: '0 0 8px 8px',
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none',
          '&:focus': { top: 0 },
        }}
      >
        Skip to content
      </Box>
      <ProgressBar />
      <Box sx={{ animation: 'mgm-page-in 0.35s ease', '@keyframes mgm-page-in': { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </Box>
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
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/refund-policy',
        element: <RefundPolicy />,
      },
      // Temporarily disabled - EventDetail route
      // {
      //   path: '/event/:eventId',
      //   element: <EventDetail />,
      // },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <ToastProvider>
          <EnquiryProvider>
            <RouterProvider router={router} />
          </EnquiryProvider>
        </ToastProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
