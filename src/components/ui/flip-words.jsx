import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function FlipWords({ words, duration = 3000, className = '' }) {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const indexRef = useRef(0)

  const startAnimation = useCallback(() => {
    indexRef.current = (indexRef.current + 1) % words.length
    setCurrentWord(words[indexRef.current])
    setIsAnimating(true)
  }, [words])

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => startAnimation(), duration)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, duration, startAnimation])

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={'inline-block ' + className}
      >
        {currentWord}
      </motion.span>
    </AnimatePresence>
  )
}
