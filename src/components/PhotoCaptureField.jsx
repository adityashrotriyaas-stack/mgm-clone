import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { colors, gradients } from '../constants/colors'
import { registrationUi } from '../constants/registrationFormTheme'

function stopStream(stream) {
  stream?.getTracks().forEach((track) => track.stop())
}

const festiveActionSx = {
  minHeight: 48,
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '0.9rem',
}

export default function PhotoCaptureField({ preview, onChange, variant = 'festive' }) {
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [isStartingCamera, setIsStartingCamera] = useState(false)
  const isFestive = variant === 'festive'

  const closeCamera = useCallback(() => {
    stopStream(streamRef.current)
    streamRef.current = null
    setCameraOpen(false)
    setCameraError('')
    setIsStartingCamera(false)
  }, [])

  const startCamera = useCallback(async () => {
    setCameraOpen(true)
    setCameraError('')
    setIsStartingCamera(true)

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera is not supported on this device. Please upload a photo from your gallery.')
      setIsStartingCamera(false)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })
      streamRef.current = stream
    } catch {
      setCameraError('Unable to access the camera. Allow camera permission or upload a photo from your gallery.')
    } finally {
      setIsStartingCamera(false)
    }
  }, [])

  useEffect(() => {
    if (!cameraOpen || !streamRef.current || !videoRef.current) return undefined

    const video = videoRef.current
    video.srcObject = streamRef.current
    video.play().catch(() => {})

    return undefined
  }, [cameraOpen, isStartingCamera])

  useEffect(() => () => closeCamera(), [closeCamera])

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    onChange(URL.createObjectURL(file))
  }

  const handleCapture = () => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (!blob) return
        onChange(URL.createObjectURL(blob))
        closeCamera()
      },
      'image/jpeg',
      0.9,
    )
  }

  const containerSx = isFestive
    ? {
        border: preview ? `1.5px solid rgba(201, 139, 46, 0.35)` : `1.5px dashed rgba(201, 139, 46, 0.4)`,
        borderRadius: '16px',
        p: 2,
        bgcolor: 'rgba(30, 18, 16, 0.72)',
        backgroundImage: 'radial-gradient(circle at top right, rgba(201, 139, 46, 0.08), transparent 55%)',
      }
    : {
        border: preview ? '1px solid #E5E4E9' : '1px dashed #E5E4E9',
        borderRadius: '12px',
        p: 2,
        bgcolor: '#f8f9fa',
      }

  const titleColor = isFestive ? registrationUi.text : '#000'
  const subtitleColor = isFestive ? registrationUi.muted : '#777'
  const iconBg = isFestive ? 'rgba(201, 139, 46, 0.18)' : 'rgba(255,148,102,0.12)'
  const iconColor = isFestive ? colors.gold : '#ff9466'

  return (
    <Box sx={containerSx}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: preview ? 1.75 : 2 }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: '12px',
            bgcolor: iconBg,
            border: isFestive ? `1px solid rgba(201, 139, 46, 0.25)` : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <CameraAltOutlinedIcon sx={{ color: iconColor }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: titleColor }}>
            Pass Photo
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: subtitleColor, lineHeight: 1.55, mt: 0.25 }}>
            Required for entry verification at the gate. Use a clear, front-facing photo.
          </Typography>
        </Box>
      </Stack>

      {preview ? (
        <Stack alignItems="center" spacing={1.5}>
          <Box
            sx={{
              position: 'relative',
              p: 0.5,
              borderRadius: '18px',
              background: isFestive ? gradients.primary : 'transparent',
            }}
          >
            <Box
              component="img"
              src={preview}
              alt="Pass photo preview"
              sx={{
                width: 128,
                height: 128,
                borderRadius: '14px',
                objectFit: 'cover',
                display: 'block',
                border: isFestive ? `3px solid ${colors.night}` : '2px solid #fff',
                boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
              }}
            />
            {isFestive && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 6,
                  right: 6,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${colors.night}`,
                }}
              >
                <CheckCircleRoundedIcon sx={{ fontSize: '1rem', color: '#fff' }} />
              </Box>
            )}
          </Box>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <CheckCircleRoundedIcon sx={{ fontSize: '1rem', color: '#4ade80' }} />
            <Typography sx={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 700 }}>
              Photo added successfully
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ width: '100%' }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
              onClick={startCamera}
              sx={{
                ...festiveActionSx,
                borderColor: isFestive ? 'rgba(232, 184, 74, 0.45)' : '#E5E4E9',
                color: isFestive ? registrationUi.text : '#555',
                bgcolor: isFestive ? 'rgba(42, 28, 22, 0.5)' : 'transparent',
                '&:hover': {
                  borderColor: colors.gold,
                  bgcolor: isFestive ? 'rgba(201, 139, 46, 0.12)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Retake with Camera
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PhotoLibraryOutlinedIcon />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                ...festiveActionSx,
                borderColor: isFestive ? 'rgba(232, 184, 74, 0.45)' : '#E5E4E9',
                color: isFestive ? registrationUi.text : '#555',
                bgcolor: isFestive ? 'rgba(42, 28, 22, 0.5)' : 'transparent',
                '&:hover': {
                  borderColor: colors.gold,
                  bgcolor: isFestive ? 'rgba(201, 139, 46, 0.12)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Replace Photo
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={1.25}>
          <Box
            sx={{
              borderRadius: '14px',
              border: isFestive ? `1px dashed rgba(232, 184, 74, 0.28)` : '1px dashed #ddd',
              bgcolor: isFestive ? 'rgba(0,0,0,0.18)' : '#fff',
              py: 2.5,
              px: 2,
              textAlign: 'center',
            }}
          >
            <CameraAltOutlinedIcon sx={{ fontSize: '2.2rem', color: iconColor, mb: 0.75, opacity: 0.9 }} />
            <Typography sx={{ fontSize: '0.84rem', color: subtitleColor, lineHeight: 1.55 }}>
              Take a selfie or upload a passport-style photo for your digital pass.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CameraAltOutlinedIcon />}
              onClick={startCamera}
              sx={{
                ...festiveActionSx,
                flex: 1.2,
                background: isFestive ? gradients.primary : '#1F1F1F',
                color: isFestive ? colors.night : '#fff',
                boxShadow: isFestive ? '0 8px 20px rgba(201, 139, 46, 0.25)' : 'none',
                '&:hover': {
                  background: isFestive ? gradients.primary : '#333',
                  filter: isFestive ? 'brightness(1.05)' : 'none',
                },
              }}
            >
              Use Camera
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PhotoLibraryOutlinedIcon />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                ...festiveActionSx,
                flex: 1,
                borderColor: isFestive ? 'rgba(232, 184, 74, 0.5)' : '#E5E4E9',
                color: isFestive ? registrationUi.text : '#555',
                bgcolor: isFestive ? 'rgba(42, 28, 22, 0.45)' : 'transparent',
                '&:hover': {
                  borderColor: colors.gold,
                  bgcolor: isFestive ? 'rgba(201, 139, 46, 0.1)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Upload from Gallery
            </Button>
          </Stack>
        </Stack>
      )}

      <input
        ref={fileInputRef}
        hidden
        accept="image/*"
        type="file"
        onChange={handleFileSelect}
      />

      <Dialog
        open={cameraOpen}
        onClose={closeCamera}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '18px',
            m: { xs: 1.5, sm: 2 },
            bgcolor: colors.bgSoft,
            border: `1px solid ${colors.border}`,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: colors.textLight }}>
            Capture Pass Photo
          </Typography>
          <IconButton aria-label="Close camera" onClick={closeCamera} size="small" sx={{ color: colors.muted }}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          {cameraError ? (
            <Box sx={{ bgcolor: 'rgba(168, 50, 72, 0.12)', border: '1px solid rgba(168, 50, 72, 0.3)', borderRadius: '12px', p: 2 }}>
              <Typography sx={{ fontSize: '0.88rem', color: colors.textLight, lineHeight: 1.6 }}>
                {cameraError}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                bgcolor: '#000',
                aspectRatio: '4 / 5',
                border: `2px solid ${colors.border}`,
              }}
            >
              <Box
                component="video"
                ref={videoRef}
                autoPlay
                playsInline
                muted
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: '12%',
                  border: '2px dashed rgba(232, 184, 74, 0.65)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
              {isStartingCamera && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.45)',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>Starting camera…</Typography>
                </Box>
              )}
            </Box>
          )}
          <Typography sx={{ fontSize: '0.78rem', color: colors.muted, mt: 1.5, textAlign: 'center' }}>
            Center your face in the oval and ensure good lighting.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 0, gap: 1 }}>
          <Button onClick={closeCamera} sx={{ textTransform: 'none', color: colors.muted, fontWeight: 600 }}>
            Cancel
          </Button>
          {!cameraError && (
            <Button
              onClick={handleCapture}
              disabled={isStartingCamera}
              variant="contained"
              sx={{
                background: gradients.primary,
                color: colors.night,
                textTransform: 'none',
                minHeight: 44,
                px: 3,
                fontWeight: 800,
                borderRadius: '10px',
                '&:hover': { background: gradients.primary, filter: 'brightness(1.05)' },
              }}
            >
              Capture Photo
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}
