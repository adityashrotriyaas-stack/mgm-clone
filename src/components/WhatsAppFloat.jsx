import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { keyframes } from '@mui/material/styles'
import WhatsAppIcon from './WhatsAppIcon'
import { getWhatsAppUrl } from '../data/contactInfo'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); }
  70% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`

export default function WhatsAppFloat() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: {
          xs: 'calc(88px + env(safe-area-inset-bottom, 0px))',
          lg: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        },
        right: 16,
        left: 'auto',
        zIndex: 65,
      }}
    >
      <IconButton
        component="a"
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        sx={{
          width: 52,
          height: 52,
          bgcolor: '#25D366',
          color: '#fff',
          animation: `${pulse} 2.5s infinite`,
          boxShadow: '0 6px 18px rgba(37, 211, 102, 0.3)',
          '&:hover': {
            bgcolor: '#20BD5A',
            transform: 'scale(1.05)',
          },
        }}
      >
        <WhatsAppIcon size={28} />
      </IconButton>
    </Box>
  )
}
