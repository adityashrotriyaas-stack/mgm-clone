import Box from '@mui/material/Box'
import AboutSection from './components/AboutSection'
import BookingWorkflowSection from './components/BookingWorkflowSection'
import ContactSection from './components/ContactSection'
import LegacySection from './components/LegacySection'
import ProgressBar from './components/ProgressBar'
import Header from './components/Header'
import Hero from './components/Hero'
import UpcomingNights from './components/UpcomingNights'
import PastNights, { Footer } from './components/PastNights'
import FAQSection from './components/FAQSection'
import Testimonials from './components/Testimonials'
import StickyCTA from './components/StickyCTA'
import WhatsAppFloat from './components/WhatsAppFloat'

import ScrollToTop from './components/ScrollToTop'
import { usePageMeta } from './hooks/usePageMeta'
import { colors } from './constants/colors'

function App() {
  usePageMeta('', 'MGM Cultural Navratri 2026 — Ten nights of Garba, Dandiya and devotion at Seasons Hotel, Rajkot.')
  return (
    <Box sx={{ bgcolor: colors.bg, color: colors.ivory, pb: { xs: 'calc(96px + env(safe-area-inset-bottom, 0px))', lg: 0 } }}>
      <ProgressBar />
      <Header />
      <Hero />
      <UpcomingNights />
      <AboutSection />
      <BookingWorkflowSection />
      <LegacySection />
      <Testimonials />
      <PastNights />
      <FAQSection />
      <ContactSection />
      <Footer />
      <StickyCTA />
      <WhatsAppFloat />
      <ScrollToTop />

    </Box>
  )
}

export default App
