import { createTheme } from '@mui/material/styles'
import { colors, keyframes } from './constants/colors'

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
    fontFamily: '"Inter", "Plus Jakarta Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Sora", "Unbounded", sans-serif',
      fontWeight: 700,
      lineHeight: 1.18,
      letterSpacing: '-0.3px',
    },
    h2: {
      fontFamily: '"Sora", "Unbounded", sans-serif',
      fontWeight: 700,
      lineHeight: 1.18,
      letterSpacing: '-0.3px',
    },
    h3: {
      fontFamily: '"Sora", "Unbounded", sans-serif',
      fontWeight: 700,
      lineHeight: 1.18,
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ${keyframes}
        html {
          scroll-behavior: smooth;
          -webkit-text-size-adjust: 100%;
        }
        body {
          background-color: ${colors.bg};
          color: ${colors.ivory};
          line-height: 1.55;
          -moz-osx-font-smoothing: grayscale;
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        ::selection {
          background: ${colors.gold};
          color: #fff;
        }
        :focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 2px;
        }
        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: ${colors.glassBorder};
          border-radius: 4px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: ${colors.glowStrong};
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `,
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
