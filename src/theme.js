import { createTheme } from '@mui/material/styles'
import { colors } from './constants/colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.gold,
      dark: colors.goldDeep,
    },
    secondary: {
      main: colors.saffron,
    },
    background: {
      default: colors.bg,
      paper: colors.bgSoft,
    },
    text: {
      primary: colors.textLight,
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
          WebkitTextSizeAdjust: '100%',
        },
        body: {
          backgroundColor: colors.bg,
          color: colors.textLight,
          lineHeight: 1.55,
          WebkitFontSmoothing: 'antialiased',
          overflowX: 'clip',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': {
            paddingLeft: 24,
            paddingRight: 24,
          },
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
