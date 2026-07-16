import Box from '@mui/material/Box'
import Header from './components/Header'
import Hero from './components/Hero'
import StickyCTA from './components/StickyCTA'
import UpcomingNights from './components/UpcomingNights'
import {
  LazyAboutSection,
  LazyBookingWorkflowSection,
  LazyContactSection,
  LazyFooter,
  LazyLegacySection,
  LazyPastNights,
  LazyUpcomingNightsTimeline,
} from './components/LazySection'
import { colors } from './constants/colors'

function App() {
  return (
    <Box
      component="main"
      id="main-content"
      sx={{
        bgcolor: colors.bg,
        color: colors.ivory,
        pb: { xs: 'calc(96px + env(safe-area-inset-bottom, 0px))', lg: 0 },
      }}
    >
      <Header />
      <Hero />
      <UpcomingNights />
      <LazyUpcomingNightsTimeline />
      <LazyAboutSection />
      <LazyBookingWorkflowSection />
      <LazyLegacySection />
      <LazyPastNights />
      <LazyContactSection />
      <LazyFooter />
      <StickyCTA />
    </Box>
  )
}

export default App
