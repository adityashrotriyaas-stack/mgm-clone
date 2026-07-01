import Box from '@mui/material/Box'
import ProgressBar from './components/ProgressBar'
import Header from './components/Header'
import Hero from './components/Hero'
import UpcomingNights from './components/UpcomingNights'
import Passes from './components/Passes'
import Registration from './components/Registration'
import PastNights, { Footer } from './components/PastNights'
import StickyCTA from './components/StickyCTA'
import { colors } from './constants/colors'

function App() {
  return (
    <Box sx={{ bgcolor: colors.bg, color: colors.ivory, pb: { xs: 10, lg: 0 } }}>
      <ProgressBar />
      <Header />
      <Hero />
      <UpcomingNights />
      <Passes />
      <Registration />
      <PastNights />
      <Footer />
      <StickyCTA />
    </Box>
  )
}

export default App
