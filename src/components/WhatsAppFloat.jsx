import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { keyframes } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import WhatsAppIcon from './WhatsAppIcon'
// import { useEnquiryModal } from './EnquiryModal'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); }
  70% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`

export default function WhatsAppFloat() {
  // const openEnquiryModal = useEnquiryModal()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: {
          xs: isHome
            ? 'calc(88px + env(safe-area-inset-bottom, 0px))'
            : 'calc(24px + env(safe-area-inset-bottom, 0px))',
          lg: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        },
        right: 16,
        left: 'auto',
        zIndex: 65,
      }}
    >
      <IconButton
        onClick={() => window.location.href = '/event/1'}
        aria-label="Send an enquiry"
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
