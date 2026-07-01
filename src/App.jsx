import Box from '@mui/material/Box'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import LegacySection from './components/LegacySection'
import ProgressBar from './components/ProgressBar'
import Header from './components/Header'
import Hero from './components/Hero'
import UpcomingNights from './components/UpcomingNights'
import Passes from './components/Passes'
import Registration from './components/Registration'
import PastNights, { Footer } from './components/PastNights'
import StickyCTA from './components/StickyCTA'
import WhatsAppFloat from './components/WhatsAppFloat'
import { colors } from './constants/colors'

function App() {
  return (
    <Box sx={{ bgcolor: colors.bg, color: colors.ivory, pb: { xs: 10, lg: 0 } }}>
      <ProgressBar />
      <Header />
      <Hero />
      <AboutSection />
      <UpcomingNights />
      <Passes />
      <Registration />
      <LegacySection />
      <PastNights />
      <ContactSection />
      <Footer />
      <StickyCTA />
      <WhatsAppFloat />
    </Box>
  )
}

export default App
