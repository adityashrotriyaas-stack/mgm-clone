import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { colors, gradients } from '../constants/colors'
import { useToast } from './Toast'

const shareLinks = {
  whatsapp: (text) => `https://wa.me/?text=${encodeURIComponent(text)}`,
  facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
}

export default function ShareSheet({ open, onClose, title, url }) {
  const toast = useToast()

  if (!open) return null

  const text = `${title} — Experience the magic of Navratri at MGM Cultural! Book your passes now.`

  const handleCopy = () => {
    navigator.clipboard.writeText(url || window.location.href).then(() => {
      toast('Link copied to clipboard!', 'success')
    }).catch(() => {
      toast('Could not copy link', 'error')
    })
  }

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed', inset: 0, zIndex: 1400,
        bgcolor: 'rgba(44,31,16,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        animation: 'fadeSlideUp 0.2s ease',
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          bgcolor: colors.bg, borderRadius: '20px 20px 0 0',
          width: '100%', maxWidth: 400,
          p: { xs: 2.5, md: 3 },
          pb: { xs: 4, md: 3 },
          animation: 'fadeSlideUp 0.3s ease',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: colors.ivory }}>Share</Typography>
          <IconButton onClick={onClose} sx={{ color: colors.muted, width: 36, height: 36 }}>
            <CloseRoundedIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
            <Box component="a" href={shareLinks.whatsapp(text)} target="_blank" rel="noopener noreferrer" sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.08)' } }}>
              <WhatsAppIcon sx={{ color: '#fff', fontSize: '1.5rem' }} />
            </Box>
            <Typography sx={{ fontSize: '0.7rem', color: colors.muted }}>WhatsApp</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
            <Box component="a" href={shareLinks.facebook(url || window.location.href)} target="_blank" rel="noopener noreferrer" sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.08)' } }}>
              <FacebookRoundedIcon sx={{ color: '#fff', fontSize: '1.5rem' }} />
            </Box>
            <Typography sx={{ fontSize: '0.7rem', color: colors.muted }}>Facebook</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }} onClick={handleCopy}>
            <Box sx={{ width: 56, height: 56, borderRadius: '16px', background: gradients.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.08)' } }}>
              <ContentCopyRoundedIcon sx={{ color: '#fff', fontSize: '1.3rem' }} />
            </Box>
            <Typography sx={{ fontSize: '0.7rem', color: colors.muted }}>Copy Link</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
