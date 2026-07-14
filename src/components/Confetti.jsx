import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

const COLORS = ['#B8860B', '#D4AF37', '#B85C3A', '#C4A035', '#E8B85A', '#2C1F10', '#8B6B2E']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function Confetti({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let animationId

    const particles = Array.from({ length: 80 }, () => ({
      x: randomBetween(0, w),
      y: randomBetween(-h, -20),
      w: randomBetween(6, 12),
      h: randomBetween(6, 14),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: randomBetween(-2, 2),
      vy: randomBetween(2, 6),
      rotation: randomBetween(0, 360),
      rotSpeed: randomBetween(-3, 3),
      opacity: 1,
    }))

    let startTime = Date.now()
    const duration = 4000

    const draw = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08
        p.rotation += p.rotSpeed
        p.opacity = Math.max(0, 1 - progress * 1.2)

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      if (progress < 1) {
        animationId = requestAnimationFrame(draw)
      }
    }

    draw()

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        pointerEvents: 'none',
        display: active ? 'block' : 'none',
      }}
    />
  )
}
