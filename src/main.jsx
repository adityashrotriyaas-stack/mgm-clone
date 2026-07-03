import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import App from './App'
import EventDetail from './components/EventDetail'
import BookingFlow from './components/BookingFlow'
import { ToastProvider } from './components/Toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/event/:eventId" element={<EventDetail />} />
            <Route path="/book" element={<BookingFlow />} />
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
