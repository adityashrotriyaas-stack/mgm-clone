import { createContext, useCallback, useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import CloseIcon from '@mui/icons-material/Close'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import { colors } from '../constants/colors'
import { getWhatsAppUrl } from '../data/contactInfo'
import MobileNumberField from './MobileNumberField'
import WhatsAppIcon from './WhatsAppIcon'

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(28, 12, 16, 0.72)',
    color: '#FFF8EE',
    borderRadius: '14px',
    '& fieldset': {
      borderColor: 'rgba(255, 179, 0, 0.35)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 179, 0, 0.55)',
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.gold,
      borderWidth: '1.5px',
      boxShadow: '0 0 14px rgba(255, 179, 0,0.18)',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255, 248, 240, 0.52)',
    opacity: 1,
  },
  '& .MuiInputAdornment-root': {
    color: colors.gold,
  },
}

function EnquiryForm({ onClose }) {
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const data = new FormData(event.currentTarget)
      const name = data.get('name')
      const mobileValue = data.get('mobile')
      const preferredDate = data.get('preferredDate')
      const preferredTime = data.get('preferredTime')
      const message = data.get('message')

      const text = [
        'Hi MGM Cultural Navratri,',
        '',
        `Name: ${name}`,
        `Mobile: +91 ${mobileValue}`,
        `Preferred Date: ${preferredDate}`,
        `Preferred Time: ${preferredTime}`,
        `Message: ${message}`,
      ].join('\n')

      await fetch('https://script.google.com/macros/s/AKfycbzz3WXD3m5YbIrHooZrx5hUvoPWWNxtpOkSJGeUgMvAzutwvmwckBi2Kt0mF6vZ37BT/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile: mobileValue, preferredDate, preferredTime, message }),
      })

      window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 1.5, ...fieldSx }}>
      <Box sx={{ mb: 0.35 }}>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.35rem', md: '1.55rem' },
            fontWeight: 700,
            color: colors.gold,
            mb: 0.6,
          }}
        >
          Send an Enquiry
        </Typography>
        <Typography sx={{ fontSize: '0.86rem', color: 'rgba(255,245,230,0.78)', lineHeight: 1.6 }}>
          Share your details and we&apos;ll connect with you on WhatsApp.
        </Typography>
      </Box>

      <TextField
        required
        name="name"
        placeholder="Full Name"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineRoundedIcon sx={{ fontSize: '1.15rem', color: colors.gold }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <MobileNumberField
        name="mobile"
        value={mobile}
        onChange={(event) => setMobile(event.target.value)}
        sx={{
          ...fieldSx,
          '& .MuiTypography-root': { color: `${colors.gold} !important` },
          '& .MuiDivider-root': { borderColor: 'rgba(255, 179, 0,0.4) !important' },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" disablePointerEvents sx={{ mr: 1.1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneOutlinedIcon sx={{ fontSize: '1.05rem', color: colors.gold }} />
                  <Typography sx={{ fontWeight: 700, color: colors.gold, fontSize: '0.9rem' }}>+91</Typography>
                  <Box sx={{ width: 1, height: 18, bgcolor: 'rgba(255, 179, 0,0.4)' }} />
                </Stack>
              </InputAdornment>
            ),
          },
          htmlInput: {
            inputMode: 'numeric',
            maxLength: 10,
          },
        }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <TextField
          required
          name="preferredDate"
          type="date"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthOutlinedIcon sx={{ fontSize: '1.1rem', color: colors.gold }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            ...fieldSx,
            '& .MuiInputBase-input': { colorScheme: 'dark' },
            '& input[type="date"]::-webkit-calendar-picker-indicator': { filter: 'invert(0.8)' },
          }}
        />
        <TextField
          required
          name="preferredTime"
          type="time"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeOutlinedIcon sx={{ fontSize: '1.1rem', color: colors.gold }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            ...fieldSx,
            '& .MuiInputBase-input': { colorScheme: 'dark' },
            '& input[type="time"]::-webkit-calendar-picker-indicator': { filter: 'invert(0.8)' },
          }}
        />
      </Box>

      <TextField
        required
        name="message"
        placeholder="How can we help you?"
        multiline
        rows={3.2}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.25 }}>
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: '1.1rem', color: colors.gold }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        disabled={loading}
        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <WhatsAppIcon size={18} />}
        endIcon={loading ? null : <ArrowForwardRoundedIcon sx={{ fontSize: '1.1rem !important' }} />}
        sx={{
          mt: 0.5,
          py: { xs: 1.6, sm: 1.3 },
          borderRadius: '999px',
          background: 'linear-gradient(135deg, #FFB300 0%, #EA5A00 50%, #C04E00 100%)',
          color: '#3A1C00',
          fontWeight: 800,
          fontSize: '0.92rem',
          textTransform: 'none',
          boxShadow: '0 10px 28px rgba(255, 179, 0, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFB300 0%, #EA5A00 50%, #C04E00 100%)',
            filter: 'brightness(1.05)',
            transform: 'translateY(-1px)',
          },
          '&.Mui-disabled': {
            background: 'linear-gradient(135deg, #FFB300 0%, #EA5A00 50%, #C04E00 100%)',
            color: '#3A1C00',
            opacity: 0.8,
          },
        }}
      >
        {loading ? 'Sending...' : 'Continue on WhatsApp'}
      </Button>
    </Box>
  )
}

const EnquiryContext = createContext()

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openEnquiryModal = useCallback(() => setOpen(true), [])
  const closeEnquiryModal = useCallback(() => setOpen(false), [])

  return (
    <EnquiryContext.Provider value={openEnquiryModal}>
      {children}
      <Dialog
        open={open}
        onClose={closeEnquiryModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'linear-gradient(180deg, rgba(42, 18, 22, 0.98) 0%, rgba(22, 9, 14, 0.98) 100%)',
            border: '1px solid rgba(255, 179, 0, 0.55)',
            boxShadow: '0 0 0 1px rgba(255, 179, 0,0.08), 0 16px 40px rgba(0,0,0,0.32), 0 0 28px rgba(255, 179, 0,0.12)',
            backdropFilter: 'blur(8px)',
            position: 'relative',
            overflow: 'visible',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: 18,
              height: 18,
              borderColor: 'rgba(234, 90, 0, 0.75)',
              borderStyle: 'solid',
              pointerEvents: 'none',
            },
            '&::before': {
              top: 10,
              left: 10,
              borderWidth: '1.5px 0 0 1.5px',
              borderTopLeftRadius: 4,
            },
            '&::after': {
              top: 10,
              right: 10,
              borderWidth: '1.5px 1.5px 0 0',
              borderTopRightRadius: 4,
            },
          },
        }}
      >
        <IconButton
          onClick={closeEnquiryModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'rgba(255,248,240,0.6)',
            '&:hover': { color: '#FFF8EE' },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: { xs: 2.5, md: 3.25 } }}>
          <EnquiryForm onClose={closeEnquiryModal} />
        </DialogContent>
      </Dialog>
    </EnquiryContext.Provider>
  )
}

export function useEnquiryModal() {
  return useContext(EnquiryContext)
}
