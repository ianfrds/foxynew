import { useEffect, useRef, useState } from 'react'
import useCartStore from '../store/cartStore'

export default function FlyToCart() {
  const flySource = useCartStore((s) => s.flySource)
  const clearFlySource = useCartStore((s) => s.clearFlySource)
  const [dot, setDot] = useState(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!flySource) return

    const cartBtn = document.querySelector('[aria-label="Buka Keranjang Belanja"]')
    if (!cartBtn) {
      clearFlySource()
      return
    }

    const targetRect = cartBtn.getBoundingClientRect()
    const targetX = targetRect.left + targetRect.width / 2
    const targetY = targetRect.top + targetRect.height / 2

    const startX = flySource.left + flySource.width / 2
    const startY = flySource.top + flySource.height / 2

    const startTime = performance.now()
    const DURATION = 500

    setDot({ x: startX, y: startY })

    const animate = (now) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / DURATION, 1)

      const ease = (t) => 1 - Math.pow(1 - t, 3)

      const progress = ease(t)
      const x = startX + (targetX - startX) * progress
      const y = startY + (targetY - startY) * progress

      const scale = 1 - progress * 0.5

      setDot({ x, y, scale, done: t >= 1 })

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setDot(null)
        clearFlySource()
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [flySource, clearFlySource])

  if (!dot) return null

  return (
    <div
      className="pointer-events-none fixed z-[110]"
      style={{
        left: dot.x,
        top: dot.y,
        transform: `translate(-50%, -50%) scale(${dot.scale || 1})`,
      }}
    >
      <div
        className="rounded-full bg-primary"
        style={{
          width: dot.done ? 0 : 28,
          height: dot.done ? 0 : 28,
          opacity: dot.done ? 0 : 1,
          transition: 'width 0.05s, height 0.05s, opacity 0.1s',
        }}
      />
    </div>
  )
}
