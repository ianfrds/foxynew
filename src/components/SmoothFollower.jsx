import { useState, useEffect, useRef } from 'react';

export default function SmoothFollower() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const mousePos = useRef({ x: 0, y: 0 })
  const dot = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const dotEl = useRef(null)
  const ringEl = useRef(null)
  const rafId = useRef(null)

  useEffect(() => {
    if (!isDesktop) return

    const onMouse = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    const enter = () => {
      if (ringEl.current) {
        ringEl.current.style.width = '44px'
        ringEl.current.style.height = '44px'
      }
    }

    const leave = () => {
      if (ringEl.current) {
        ringEl.current.style.width = '28px'
        ringEl.current.style.height = '28px'
      }
    }

    window.addEventListener('mousemove', onMouse)

    const els = document.querySelectorAll('a, button, img, input, textarea, select')
    els.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    const DOT_SMOOTHNESS = 0.7
    const RING_SMOOTHNESS = 0.5

    const tick = () => {
      dot.current.x += (mousePos.current.x - dot.current.x) * DOT_SMOOTHNESS
      dot.current.y += (mousePos.current.y - dot.current.y) * DOT_SMOOTHNESS
      ring.current.x += (mousePos.current.x - ring.current.x) * RING_SMOOTHNESS
      ring.current.y += (mousePos.current.y - ring.current.y) * RING_SMOOTHNESS

      if (dotEl.current) {
        dotEl.current.style.left = `${dot.current.x}px`
        dotEl.current.style.top = `${dot.current.y}px`
      }
      if (ringEl.current) {
        ringEl.current.style.left = `${ring.current.x}px`
        ringEl.current.style.top = `${ring.current.y}px`
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      els.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
      cancelAnimationFrame(rafId.current)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" style={{ mixBlendMode: 'difference' }}>
      <div
        ref={dotEl}
        className="absolute rounded-full bg-white"
        style={{ width: 8, height: 8, transform: 'translate(-50%,-50%)' }}
      />
      <div
        ref={ringEl}
        className="absolute rounded-full border border-white"
        style={{
          width: 28,
          height: 28,
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.3s, height 0.3s',
        }}
      />
    </div>
  )
}
