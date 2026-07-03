import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import App from './App'
import EventDetail from './components/EventDetail'
import BookingFlow from './components/BookingFlow'
import PageTransition from './components/PageTransition'
import NotFound from './components/NotFound'
import { ToastProvider } from './components/Toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<PageTransition><App /></PageTransition>} />
            <Route path="/event/:eventId" element={<PageTransition><EventDetail /></PageTransition>} />
            <Route path="/book" element={<PageTransition><BookingFlow /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
