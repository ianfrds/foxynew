import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HiArrowUp } from 'react-icons/hi'
import HomePage from './pages/HomePage'
import ProdukPage from './pages/ProdukPage'
import TentangKamiPage from './pages/TentangKamiPage'
import CaraPesanPage from './pages/CaraPesanPage'
import TestimoniPage from './pages/TestimoniPage'
import ProductDetail from './components/ProductDetail'
import LoadingScreen from './components/LoadingScreen'
import GradualBlur from './components/ui/GradualBlur/GradualBlur'
import SmoothFollower from './components/SmoothFollower'
import FlyToCart from './components/FlyToCart'

export default function App() {
  const [firstLoad, setFirstLoad] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const location = useLocation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setAtBottom(progress >= 0.95)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <>
      {transitioning && <LoadingScreen overlay />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produk" element={<ProdukPage />} />
        <Route path="/tentang-kami" element={<TentangKamiPage />} />
        <Route path="/cara-pesan" element={<CaraPesanPage />} />
        <Route path="/testimoni" element={<TestimoniPage />} />
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

      <FlyToCart />
      <SmoothFollower />
    </>
  )
}
