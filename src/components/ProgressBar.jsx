import Box from '@mui/material/Box'
import { gradients } from '../constants/colors'
import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ProgressBar() {
  const progress = useScrollProgress()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        zIndex: 100,
        background: gradients.progress,
        width: `${progress}%`,
        transition: 'width 0.1s linear',
      }}
    />
  )
}
