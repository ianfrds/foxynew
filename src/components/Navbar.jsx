import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { NAV_LINKS } from '../constants'
import useCartStore from '../store/cartStore'
import logo from '../assets/2.png'

export default function Navbar({ onCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [badgeAnim, setBadgeAnim] = useState(false)
  const itemCount = useCartStore((s) => s.getItemCount())
  const prevCount = useRef(itemCount)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setBadgeAnim(true)
      const t = setTimeout(() => setBadgeAnim(false), 400)
      prevCount.current = itemCount
      return () => clearTimeout(t)
    }
    prevCount.current = itemCount
  }, [itemCount])

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleMulaiCetak = () => {
    setMobileOpen(false)
    if (location.pathname === '/') {
      const el = document.getElementById('produk')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById('produk')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md px-6 md:px-12 lg:px-24 xl:px-40 py-4 flex items-center justify-between">
      <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5">
        <img src={logo} alt="Foxy ID" className="h-8 w-auto" />
        <span className="font-bold text-xl text-zinc-900">Foxy ID</span>
      </Link>

      <div className="hidden md:flex items-center bg-zinc-50 border border-zinc-200 rounded-full px-1 py-1 gap-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMobileOpen(false)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors no-underline ${
              isActive(link.path)
                ? 'bg-white border border-zinc-200 font-medium text-zinc-800'
                : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={onCartOpen}
          className="relative p-2.5 flex items-center justify-center text-zinc-700 hover:text-zinc-500 transition-colors"
          aria-label="Buka Keranjang Belanja"
        >
          <HiOutlineShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className={`absolute -top-0.5 -right-0.5 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${badgeAnim ? 'animate-badge-pop' : ''}`}>
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
        <button
          onClick={handleMulaiCetak}
          className="flex items-center gap-2.5 bg-gradient-to-r from-zinc-950 to-zinc-500 text-zinc-50 hover:text-zinc-200 text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer border-0"
        >
          Mulai Cetak
          <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#3f3f47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={onCartOpen}
          className="relative p-3 flex items-center justify-center text-zinc-700"
          aria-label="Buka Keranjang Belanja"
        >
          <HiOutlineShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className={`absolute -top-0.5 -right-0.5 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${badgeAnim ? 'animate-badge-pop' : ''}`}>
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-2.5"
          aria-label={mobileOpen ? 'Tutup Menu' : 'Buka Menu'}
        >
          <span className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-zinc-800 transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className={`${mobileOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full bg-white border-t border-zinc-200 flex-col p-5 gap-1 md:hidden z-50`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-3.5 rounded-lg text-sm w-full text-left no-underline ${
              isActive(link.path)
                ? 'bg-zinc-100 font-medium text-zinc-800'
                : 'text-zinc-500 hover:bg-zinc-50'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleMulaiCetak}
          className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-zinc-950 to-zinc-500 text-zinc-50 text-sm font-medium px-5 py-3.5 rounded-full cursor-pointer border-0 mt-3 w-fit"
        >
          Mulai Cetak
          <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="#3f3f47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  )
}
