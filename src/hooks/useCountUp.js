import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, enabled) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || started.current) return undefined
    started.current = true

    let current = 0
    const step = Math.max(1, Math.ceil(target / 60))

    const tick = () => {
      current += step
      if (current >= target) {
        setValue(target)
        return
      }
      setValue(current)
      requestAnimationFrame(tick)
    }

    tick()
    return undefined
  }, [enabled, target])

  return value
}
