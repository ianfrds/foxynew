import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiShoppingCart, HiSearch } from 'react-icons/hi'
import { PRODUCTS } from '../constants'
import useCartStore from '../store/cartStore'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import Reveal from '../components/Reveal'

const CATEGORIES = ['Semua', 'Polaroid', 'Poster']

export default function ProdukPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Semua')
  const addItem = useCartStore((s) => s.addItem)

  const filtered = PRODUCTS.filter((p) => {
    const matchCategory = category === 'Semua' || p.category === category
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-bg-light">
      <Navbar onCartOpen={() => setCartOpen(true)} />

      <div className="pt-24 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Semua Produk
              </h1>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                Jelajahi semua pilihan cetakan yang bisa kamu kustomisasi sesuai gaya kamu.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Produk tidak ditemukan</p>
              <p className="text-gray-400 text-sm mt-1">Coba ubah kata kunci atau filter kategori</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i * 0.05, 0.3)}>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-white rounded-card overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-white/90 text-xs font-semibold text-gray-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-input">
                        {product.category}
                      </span>
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-sm md:text-base text-gray-900">{product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed flex-1">{product.description}</p>
                      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 sm:justify-between">
                        <span className="text-sm sm:text-base md:text-lg font-bold text-primary">
                          Rp{product.price.toLocaleString('id-ID')}
                        </span>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product, 1) }}
                          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 bg-primary text-white text-xs font-semibold rounded-input hover:bg-primary-dark transition-all active:scale-[0.97] tap-target"
                        >
                          <HiShoppingCart className="w-4 h-4" />
                          Tambah
                        </button>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
