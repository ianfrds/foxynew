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

const wordData = [
  { text: 'Your\u00A0', row: 0, start: 0, end: 0.14 },
  { text: 'Room,\u00A0', row: 0, start: 0.14, end: 0.28 },
  { text: 'Your\u00A0', row: 1, start: 0.28, end: 0.42 },
  { text: 'Rules,\u00A0', row: 1, start: 0.42, end: 0.56 },
  { text: 'Your\u00A0', row: 2, start: 0.52, end: 0.67 },
  { text: 'Aesthetic.', row: 2, start: 0.67, end: 0.82 },
]

const rows = [0, 1, 2]

export default function AestheticSection() {
  const containerRef = useRef(null)
  const lenis = useLenis()
  const wordRefs = useRef([])
  const fadeRef = useRef(null)
  const rafId = useRef(null)

  useEffect(() => {
    if (!lenis) return
    wordRefs.current = wordRefs.current.slice(0, wordData.length)

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

        const fade = Math.max(0, Math.min(1, (p - 0.85) / 0.15))
        if (fadeRef.current) fadeRef.current.style.opacity = fade

        wordData.forEach((word, i) => {
          const el = wordRefs.current[i]
          if (!el) return
          const w = Math.max(0, Math.min(1, (p - word.start) / (word.end - word.start)))
          el.style.opacity = w
          el.style.filter = `blur(${(1 - w) * 8}px)`
          el.style.transform = `translateY(${(1 - w) * 12}px)`
          el.style.clipPath = `inset(0 ${(1 - w) * 100}% 0 0)`
        })
      })
    }

    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [lenis])

  let wordIdx = 0

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
          {rows.map(row => (
            <div
              key={row}
              className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block mt-2 sm:mt-4 first:mt-0"
            >
              {wordData
                .filter(w => w.row === row)
                .map(word => {
                  const idx = wordIdx++
                  return (
                    <span key={idx} className="relative inline-block">
                      <span className="text-zinc-300/50">{word.text}</span>
                      <span
                        ref={el => { wordRefs.current[idx] = el }}
                        className="absolute inset-0 text-brand-dark whitespace-nowrap"
                        style={{
                          opacity: 0,
                          filter: 'blur(8px)',
                          transform: 'translateY(12px)',
                          clipPath: 'inset(0 100% 0 0)',
                        }}
                      >
                        {word.text}
                      </span>
                    </span>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
