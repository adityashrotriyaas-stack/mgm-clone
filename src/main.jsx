import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import BookingFlow from './components/BookingFlow.jsx'
import EventDetail from './components/EventDetail.jsx'
import theme from './theme.js'

const router = createBrowserRouter([
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
