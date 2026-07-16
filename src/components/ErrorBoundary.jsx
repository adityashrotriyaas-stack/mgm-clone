import { Component } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { colors } from '../constants/colors'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, px: 2, bgcolor: colors.bg }}>
          <WarningAmberRoundedIcon sx={{ fontSize: '3rem', color: colors.gold }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: colors.ivory, textAlign: 'center' }}>Something went wrong</Typography>
          <Typography sx={{ color: colors.muted, textAlign: 'center', maxWidth: 400, fontSize: '0.88rem' }}>
            {this.props.fallbackMessage || 'An unexpected error occurred. Please try refreshing the page.'}
          </Typography>
          <Button onClick={() => window.location.reload()} sx={{ px: 3, py: 1, borderRadius: '50px', bgcolor: colors.gold, color: colors.bg, fontWeight: 700, '&:hover': { bgcolor: colors.saffron } }}>
            Refresh Page
          </Button>
        </Box>
      )
    }
    return this.props.children
  }
}
