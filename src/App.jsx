import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductDetail from './components/ProductDetail'
import LoadingScreen from './components/LoadingScreen'
import GradualBlur from './components/ui/GradualBlur/GradualBlur'
import SmoothFollower from './components/SmoothFollower'

export default function App() {
  const [firstLoad, setFirstLoad] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const location = useLocation()
  const prevPath = useRef(location.pathname)

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
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>

      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
      />

      <SmoothFollower />
    </>
  )
}
