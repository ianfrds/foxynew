import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLenis } from '../lib/LenisContext'

function Sparkle({ x, y, size, delay, duration }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/30 pointer-events-none"
      style={{ left: x + '%', top: y + '%', width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: duration || 3,
        repeat: Infinity,
        delay: delay || 0,
        ease: 'easeInOut',
      }}
    />
  )
}

const sparkles = Array.from({ length: 10 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 6,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 4,
}))

export default function AestheticSection() {
  const containerRef = useRef(null)
  const lenis = useLenis()
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const fadeRef = useRef(null)
  const progressRef = useRef(0)
  const rafId = useRef(null)

  useEffect(() => {
    if (!lenis) return

    const onScroll = () => {
      if (rafId.current !== null) return
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const scrolled = -rect.top
        const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0
        progressRef.current = p

        const l1 = Math.max(0, Math.min(1, (p - 0) / 0.32))
        const l2 = Math.max(0, Math.min(1, (p - 0.28) / 0.3))
        const l3 = Math.max(0, Math.min(1, (p - 0.52) / 0.3))
        const fade = Math.max(0, Math.min(1, (p - 0.85) / 0.15))

        if (line1Ref.current) line1Ref.current.style.clipPath = `inset(0 ${(1 - l1) * 100}% 0 0)`
        if (line2Ref.current) line2Ref.current.style.clipPath = `inset(0 ${(1 - l2) * 100}% 0 0)`
        if (line3Ref.current) line3Ref.current.style.clipPath = `inset(0 ${(1 - l3) * 100}% 0 0)`
        if (fadeRef.current) fadeRef.current.style.opacity = fade
      })
    }

    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [lenis])

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-brand-cream">
        <div className="absolute inset-0 bg-gradient-animated pointer-events-none" />

        {sparkles.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}

        <div
          ref={fadeRef}
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, #FAF7F2, transparent)',
            opacity: 0,
          }}
        />

        <div className="relative z-10 px-6 text-center leading-[1.15]">
          <div className="relative inline-block text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block">
            <span className="text-zinc-300/50">Your Room,</span>
            <span ref={line1Ref} className="absolute inset-0 text-brand-dark" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              Your Room,
            </span>
          </div>

          <div className="relative inline-block text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block mt-2 sm:mt-4">
            <span className="text-zinc-300/50">Your Rules,</span>
            <span ref={line2Ref} className="absolute inset-0 text-brand-dark" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              Your Rules,
            </span>
          </div>

          <div className="relative inline-block text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block mt-2 sm:mt-4">
            <span className="text-zinc-300/50">Your Aesthetic.</span>
            <span ref={line3Ref} className="absolute inset-0 text-brand-dark" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              Your Aesthetic.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}