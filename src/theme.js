import { createTheme } from '@mui/material/styles'
import { colors } from './constants/colors'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.marigold,
      dark: colors.coral,
    },
    secondary: {
      main: colors.teal,
    },
    background: {
      default: colors.bg,
      paper: colors.bgSoft,
    },
    text: {
      primary: colors.ivory,
      secondary: colors.muted,
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Unbounded", sans-serif',
      fontWeight: 700,
      lineHeight: 1.18,
      letterSpacing: '-0.3px',
    },
    h2: {
      fontFamily: '"Unbounded", sans-serif',
      fontWeight: 700,
      lineHeight: 1.18,
      letterSpacing: '-0.3px',
    },
    h3: {
      fontFamily: '"Unbounded", sans-serif',
      fontWeight: 700,
      lineHeight: 1.18,
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: colors.bg,
          color: colors.ivory,
          lineHeight: 1.55,
          WebkitFontSmoothing: 'antialiased',
          overflowX: 'hidden',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 32,
        },
      },
    },
  },
})

export default theme
