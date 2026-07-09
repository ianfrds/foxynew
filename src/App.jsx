import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { HiArrowUp } from 'react-icons/hi'
import HomePage from './pages/HomePage'
import ProductDetail from './components/ProductDetail'
import LoadingScreen from './components/LoadingScreen'
import GradualBlur from './components/ui/GradualBlur/GradualBlur'
import SmoothFollower from './components/SmoothFollower'
import { LenisCtx } from './lib/LenisContext'

export default function App() {
  const [firstLoad, setFirstLoad] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      duration: 1.8,
      wheelMultiplier: 0.8,
      smoothWheel: true,
      orientation: 'vertical',
    })

    lenisRef.current = lenis

    lenis.on('scroll', ({ progress }) => {
      setAtBottom(progress >= 0.95)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  const scrollToTop = useCallback(() => {
    lenisRef.current?.scrollTo(0, { immediate: false })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setFirstLoad(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      setTransitioning(true)
      const timer = setTimeout(() => {
        setTransitioning(false)
        prevPath.current = location.pathname
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  if (firstLoad) return <LoadingScreen />

  return (
    <LenisCtx.Provider value={lenisRef.current}>
      {transitioning && <LoadingScreen overlay />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>

      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        opacity={atBottom ? 0 : 1}
      />

      <button
        onClick={scrollToTop}
        aria-label="Scroll ke atas"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/90 active:scale-95 ${
          atBottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <HiArrowUp className="w-5 h-5" />
      </button>

      <SmoothFollower />
    </LenisCtx.Provider>
  )
}
