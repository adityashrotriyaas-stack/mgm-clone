import Box from '@mui/material/Box'
import AboutSection from './components/AboutSection'
import BookingWorkflowSection from './components/BookingWorkflowSection'
import ContactSection from './components/ContactSection'
import LegacySection from './components/LegacySection'
import ProgressBar from './components/ProgressBar'
import Header from './components/Header'
import Hero from './components/Hero'
import UpcomingNights from './components/UpcomingNights'
import UpcomingNightsTimeline from './components/UpcomingNightsTimeline'
import PastNights, { Footer } from './components/PastNights'
import StickyCTA from './components/StickyCTA'
import { colors } from './constants/colors'

function App() {
  return (
    <Box
      sx={{
        bgcolor: colors.bg,
        color: colors.ivory,
        pb: { xs: 'calc(96px + env(safe-area-inset-bottom, 0px))', lg: 0 },
      }}
    >
      <ProgressBar />
      <Header />
      <Hero />
      <UpcomingNights />
      <AboutSection />
      <UpcomingNightsTimeline />
      <BookingWorkflowSection />
      <LegacySection />
      <PastNights />
      <ContactSection />
      <Footer />
      <StickyCTA />
    </Box>
  )
}

export default App
