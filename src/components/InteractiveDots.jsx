import { useEffect, useRef } from 'react'

export default function InteractiveDots() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId = null
    let mouse = { x: -9999, y: -9999 }
    let dots = []
    let isVisible = true

    const SPACING = 28
    const DOT_RADIUS = 2.5
    const INTERACT_RADIUS = 150
    const DISPLACE_FORCE = 80
    const RETURN_SPEED = 0.04
    const LERP_MOUSE = 0.3

    let smoothMouse = { x: -9999, y: -9999 }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
      initDots(rect.width, rect.height)
    }

    function initDots(w, h) {
      dots = []
      for (let x = SPACING; x < w; x += SPACING) {
        for (let y = SPACING; y < h; y += SPACING) {
          dots.push({
            ox: x,
            oy: y,
            x: x,
            y: y,
          })
        }
      }
    }

    function draw() {
      animationId = requestAnimationFrame(draw)
      if (!isVisible) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      smoothMouse.x += (mouse.x - smoothMouse.x) * LERP_MOUSE
      smoothMouse.y += (mouse.y - smoothMouse.y) * LERP_MOUSE

      for (const d of dots) {
        const dx = d.ox - smoothMouse.x
        const dy = d.oy - smoothMouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < INTERACT_RADIUS) {
          const force = (1 - dist / INTERACT_RADIUS) * DISPLACE_FORCE
          const angle = Math.atan2(dy, dx)
          const tx = d.ox + Math.cos(angle) * force
          const ty = d.oy + Math.sin(angle) * force
          d.x += (tx - d.x) * 0.12
          d.y += (ty - d.y) * 0.12
        } else {
          d.x += (d.ox - d.x) * RETURN_SPEED
          d.y += (d.oy - d.y) * RETURN_SPEED
        }

        ctx.beginPath()
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = '#1A1A1A'
        ctx.globalAlpha = 0.08
        ctx.fill()
      }
    }

    const parent = canvas.parentElement
    resize()
    draw()

    function onResize() { resize() }

    function onMouseMove(e) {
      const rect = parent.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function onTouchMove(e) {
      const touch = e.touches[0]
      if (touch) {
        const rect = parent.getBoundingClientRect()
        mouse.x = touch.clientX - rect.left
        mouse.y = touch.clientY - rect.top
      }
    }

    function onTouchEnd() {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('resize', onResize)
    parent.addEventListener('mousemove', onMouseMove)
    parent.addEventListener('mouseleave', onMouseLeave)
    parent.addEventListener('touchmove', onTouchMove, { passive: true })
    parent.addEventListener('touchend', onTouchEnd)

    return () => {
      cancelAnimationFrame(animationId)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      parent.removeEventListener('mousemove', onMouseMove)
      parent.removeEventListener('mouseleave', onMouseLeave)
      parent.removeEventListener('touchmove', onTouchMove)
      parent.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  )
}
