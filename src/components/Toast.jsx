import { createContext, useContext, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { colors } from '../constants/colors'

const ToastContext = createContext(null)

const icons = {
  success: CheckCircleRoundedIcon,
  error: ErrorRoundedIcon,
  info: InfoRoundedIcon,
  warning: WarningAmberRoundedIcon,
}

const bgColors = {
  success: colors.successBg,
  error: 'rgba(185, 28, 28, 0.10)',
  info: 'rgba(37, 99, 235, 0.10)',
  warning: 'rgba(234, 179, 8, 0.10)',
}

const borderColors = {
  success: colors.success,
  error: '#b91c1c',
  info: '#2563eb',
  warning: '#eab308',
}

const iconColors = {
  success: colors.success,
  error: '#b91c1c',
  info: '#2563eb',
  warning: '#eab308',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Box sx={{ position: 'fixed', bottom: { xs: 100, lg: 80 }, left: '50%', transform: 'translateX(-50%)', zIndex: 1600, display: 'flex', flexDirection: 'column', gap: 1, pointerEvents: 'none', maxWidth: '90vw' }}>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <Box
              key={toast.id}
              onClick={() => removeToast(toast.id)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                px: 2.5, py: 1.5,
                borderRadius: '14px',
                bgcolor: bgColors[toast.type],
                border: `1px solid ${borderColors[toast.type]}30`,
                boxShadow: '0 12px 32px rgba(44,31,16,0.12)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                pointerEvents: 'auto',
                animation: 'fadeSlideUp 0.3s ease, toastOut 0.3s ease 3.5s forwards',
                '@keyframes toastOut': { to: { opacity: 0, transform: 'translateY(-8px)' } },
                maxWidth: 400,
              }}
            >
              <Icon sx={{ color: iconColors[toast.type], fontSize: '1.2rem', flexShrink: 0 }} />
              <Typography sx={{ color: colors.ivory, fontSize: '0.85rem', fontWeight: 500 }}>{toast.message}</Typography>
            </Box>
          )
        })}
      </Box>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
