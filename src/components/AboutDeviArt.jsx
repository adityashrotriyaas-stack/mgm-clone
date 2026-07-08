import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { keyframes } from '@mui/material/styles'
import mataRaniArt from '../assets/mata-rani.png'

const orbit = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const orbitReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.65; transform: scale(1.04); }
`

const floatUp = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`

const imageBaseSx = {
  width: '100%',
  height: 'auto',
  display: 'block',
  mixBlendMode: 'screen',
  objectFit: 'contain',
}

function MataRaniReveal({ active }) {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Phase 1 — faint line-art feel */}
      <Box
        component="img"
        src={mataRaniArt}
        alt="Mata Rani — divine Navratri art"
        sx={{
          ...imageBaseSx,
          opacity: active ? 0.42 : 0.22,
          filter: 'brightness(0.55) contrast(1.1)',
          transition: 'opacity 1.2s ease, filter 1.2s ease',
        }}
      />

      {/* Phase 2 — golden reveal rising from bottom */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          clipPath: active ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
        }}
      >
        <Box
          component="img"
          src={mataRaniArt}
          alt=""
          aria-hidden
          sx={{
            ...imageBaseSx,
            filter: 'brightness(1.12) saturate(1.2)',
          }}
        />
      </Box>

      {/* Phase 3 — full brightness polish */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: active ? 1 : 0,
          transition: 'opacity 1s ease 2.2s',
        }}
      >
        <Box
          component="img"
          src={mataRaniArt}
          alt=""
          aria-hidden
          sx={{
            ...imageBaseSx,
            filter: 'brightness(1.08) saturate(1.15)',
          }}
        />
      </Box>
    </Box>
  )
}

export default function AboutDeviArt() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        minHeight: { xs: 380, md: 520 },
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 1, md: 1.5 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '8% 6%',
          background:
            'radial-gradient(circle at center, rgba(232, 184, 74, 0.14) 0%, rgba(232, 184, 74, 0.04) 36%, transparent 72%)',
          filter: 'blur(12px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 300, md: 440 },
          height: { xs: 300, md: 440 },
          borderRadius: '50%',
          border: '1px dashed rgba(232, 184, 74, 0.18)',
          animation: `${orbit} 48s linear infinite`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 260, md: 360 },
          height: { xs: 260, md: 360 },
          borderRadius: '50%',
          border: '1px solid rgba(232, 184, 74, 0.1)',
          animation: `${orbitReverse} 36s linear infinite`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: '18%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,184,74,0.12) 0%, transparent 70%)',
          animation: `${pulseGlow} 4s ease-in-out infinite`,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: { xs: 340, md: 480 },
          opacity: active ? 1 : 0.8,
          transform: active ? 'scale(1)' : 'scale(0.94)',
          transition: 'transform 1.2s ease, opacity 0.8s ease',
          animation: active ? `${floatUp} 6s ease-in-out infinite` : 'none',
        }}
      >
        <MataRaniReveal active={active} />
      </Box>
    </Box>
  )
}
