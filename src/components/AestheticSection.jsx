import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

function AnimatedLine({ text, progress, className = '' }) {
  const clip = useTransform(progress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="text-zinc-300/50">{text}</span>
      <motion.span
        className="absolute inset-0 text-brand-dark whitespace-nowrap"
        style={{ clipPath: clip }}
      >
        {text}
      </motion.span>
    </div>
  )
}

const sparkles = Array.from({ length: 20 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 6,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 4,
}))

export default function AestheticSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const line1Progress = useTransform(scrollYProgress, [0, 0.32], [0, 1])
  const line2Progress = useTransform(scrollYProgress, [0.28, 0.58], [0, 1])
  const line3Progress = useTransform(scrollYProgress, [0.52, 0.82], [0, 1])
  const bgOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1])

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-brand-cream">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-animated pointer-events-none" />

        {/* Sparkles */}
        {sparkles.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}

        {/* Bottom fade to next section */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, #FAF7F2, transparent)',
            opacity: bgOpacity,
          }}
        />

        {/* Main text */}
        <div className="relative z-10 px-6 text-center leading-[1.15]">
          <AnimatedLine
            text="Your Room,"
            progress={line1Progress}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block"
          />
          <AnimatedLine
            text="Your Rules,"
            progress={line2Progress}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block mt-2 sm:mt-4"
          />
          <AnimatedLine
            text="Your Aesthetic."
            progress={line3Progress}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block mt-2 sm:mt-4"
          />
        </div>
      </div>
    </div>
  )
}
