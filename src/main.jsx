import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import './styles/animations.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Outlet, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import App from './App.jsx'
import BookingFlow from './components/BookingFlow.jsx'
import EventDetail from './components/EventDetail.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import theme from './theme.js'

function ScrollToTopLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.search])

  return (
    <>
      <Outlet />
      <WhatsAppFloat />
    </>
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
