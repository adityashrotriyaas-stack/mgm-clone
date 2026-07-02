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
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { colors, gradients } from '../constants/colors'

function stopStream(stream) {
  stream?.getTracks().forEach((track) => track.stop())
}

export default function PhotoCaptureField({ preview, onChange }) {
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [isStartingCamera, setIsStartingCamera] = useState(false)

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
    canvas.toBlob((blob) => {
      if (!blob) return
      onChange(URL.createObjectURL(blob))
      closeCamera()
    }, 'image/jpeg', 0.9)
  }

  return (
    <Box sx={{ border: preview ? `1px solid ${colors.glassBorder}` : `1px dashed ${colors.glassBorder}`, borderRadius: '12px', p: 2, bgcolor: colors.bgSoft }}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: preview ? 1.5 : 2 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: '10px', bgcolor: 'rgba(212,175,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <CameraAltOutlinedIcon sx={{ color: colors.gold }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: colors.ivory }}>Pass Photo</Typography>
          <Typography sx={{ fontSize: '0.8rem', color: colors.muted, lineHeight: 1.5, mt: 0.25 }}>Required for entry verification at the gate.</Typography>
        </Box>
      </Stack>
      {preview ? (
        <Stack alignItems="center" spacing={1.5}>
          <Box component="img" src={preview} alt="Pass photo preview" sx={{ width: 120, height: 120, borderRadius: '12px', objectFit: 'cover', border: `2px solid ${colors.bg}`, boxShadow: `0 8px 20px ${colors.shadow}` }} />
          <Typography sx={{ fontSize: '0.78rem', color: colors.success, fontWeight: 600 }}>Photo added successfully</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: '100%' }}>
            <Button fullWidth variant="outlined" startIcon={<RefreshRoundedIcon />} onClick={startCamera} sx={{ borderColor: colors.glassBorder, color: colors.muted, textTransform: 'none', minHeight: 44, '&:hover': { borderColor: colors.gold } }}>Retake with Camera</Button>
            <Button fullWidth variant="outlined" startIcon={<PhotoLibraryOutlinedIcon />} onClick={() => fileInputRef.current?.click()} sx={{ borderColor: colors.glassBorder, color: colors.muted, textTransform: 'none', minHeight: 44, '&:hover': { borderColor: colors.gold } }}>Replace Photo</Button>
          </Stack>
        </Stack>
      ) : (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button fullWidth variant="contained" startIcon={<CameraAltOutlinedIcon />} onClick={startCamera} sx={{ background: gradients.primary, color: '#fff', textTransform: 'none', minHeight: 48, fontWeight: 600, boxShadow: '0 4px 12px rgba(184,134,11,0.20)', '&:hover': { background: gradients.primaryReversed } }}>Use Camera</Button>
          <Button fullWidth variant="outlined" startIcon={<PhotoLibraryOutlinedIcon />} onClick={() => fileInputRef.current?.click()} sx={{ borderColor: colors.glassBorder, color: colors.muted, textTransform: 'none', minHeight: 48, fontWeight: 600, '&:hover': { borderColor: colors.gold, color: colors.ivory } }}>Upload from Gallery</Button>
        </Stack>
      )}
      <input ref={fileInputRef} hidden accept="image/*" type="file" onChange={handleFileSelect} />
      <Dialog open={cameraOpen} onClose={closeCamera} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '16px', m: { xs: 1.5, sm: 2 } } }}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: colors.ivory }}>Capture Pass Photo</Typography>
          <IconButton aria-label="Close camera" onClick={closeCamera} size="small"><CloseRoundedIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          {cameraError ? (
            <Box sx={{ bgcolor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', p: 2 }}>
              <Typography sx={{ fontSize: '0.88rem', color: '#991b1b', lineHeight: 1.6 }}>{cameraError}</Typography>
            </Box>
          ) : (
            <Box sx={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', bgcolor: colors.ivory, aspectRatio: '4 / 5' }}>
              <Box component="video" ref={videoRef} autoPlay playsInline muted sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {isStartingCamera && (
                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(44,31,16,0.45)' }}>
                  <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>Starting camera...</Typography>
                </Box>
              )}
            </Box>
          )}
          <Typography sx={{ fontSize: '0.78rem', color: colors.muted, mt: 1.5, textAlign: 'center' }}>Center your face in the frame and ensure good lighting.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 0 }}>
          <Button onClick={closeCamera} sx={{ textTransform: 'none', color: colors.muted }}>Cancel</Button>
          {!cameraError && (
            <Button onClick={handleCapture} disabled={isStartingCamera} variant="contained" sx={{ background: gradients.primary, color: '#fff', textTransform: 'none', minHeight: 44, px: 3, boxShadow: '0 4px 12px rgba(184,134,11,0.20)', '&:hover': { background: gradients.primaryReversed } }}>Capture Photo</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}
