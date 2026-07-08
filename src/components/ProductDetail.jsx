import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiArrowLeft, HiShoppingCart, HiMinus, HiPlus, HiCheck, HiPhotograph } from 'react-icons/hi'
import { PRODUCTS } from '../constants'
import useCartStore from '../store/cartStore'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'

export default function ProductDetail() {
  const { productId } = useParams()
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  const product = PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-center p-8">
          <span className="text-6xl">🔍</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Produk Tidak Ditemukan</h1>
          <p className="text-gray-500 mt-2">Produk yang kamu cari tidak tersedia.</p>
          <Link to="/" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-input hover:bg-primary-dark transition-all">
            <HiArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const otherCategory = product.category === 'Polaroid' ? 'Poster' : 'Polaroid'
  const otherProducts = PRODUCTS.filter((p) => p.category === otherCategory).slice(0, 4)

  return (
    <div className="min-h-screen bg-bg-light">
      <Navbar onCartOpen={() => setCartOpen(true)} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
          <span>/</span>
          <span className="text-gray-600">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative bg-gradient-to-br from-brand-cream to-bg-light p-8 md:p-12 flex items-center justify-center min-h-[320px] md:min-h-[500px]">
              <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#1A1A1A_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-auto object-contain drop-shadow-xl"
              />
              <span className="absolute top-4 left-4 bg-white/90 text-xs font-semibold text-primary px-3 py-1.5 rounded-full shadow-sm border border-primary/10">
                {product.category}
              </span>
            </div>

            {/* Info Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-3xl md:text-4xl font-bold text-primary mt-4">
                Rp{product.price.toLocaleString('id-ID')}
              </p>

              <p className="text-gray-600 mt-6 leading-relaxed text-base">
                {product.description}
              </p>

              {product.specs.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                    <HiPhotograph className="w-4 h-4 text-primary" />
                    Spesifikasi
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <HiCheck className="w-3 h-3 text-primary" />
                        </span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Divider */}
              <div className="my-8 border-t border-gray-100" />

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-input bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors rounded-l-input"
                  >
                    <HiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-14 text-center font-semibold text-gray-900 text-base select-none">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors rounded-r-input"
                  >
                    <HiPlus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 font-semibold rounded-input transition-all active:scale-[0.98] tap-target ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30'
                  }`}
                >
                  <HiShoppingCart className="w-5 h-5" />
                  {added ? 'Ditambahkan ✓' : 'Tambah ke Keranjang'}
                </button>
              </div>

              {/* CTA note */}
              <p className="text-xs text-gray-400 mt-3">
                Gratis ongkir untuk pembelian minimal Rp50.000
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products - Same Category */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Produk {product.category} Lainnya
              </h2>
              <p className="text-gray-500 mt-1 text-sm">Jelajahi koleksi {product.category} kami yang lain.</p>
            </div>
            <Link to="/#produk" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/product/${r.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-bg-light">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">{r.name}</h3>
                  <p className="text-base font-bold text-primary mt-1">Rp{r.price.toLocaleString('id-ID')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other Category Suggestion */}
      {otherProducts.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Juga Tersedia di {otherCategory}
                </h2>
                <p className="text-gray-500 mt-1 text-sm">Lihat koleksi {otherCategory} kami.</p>
              </div>
              <Link to="/#produk" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {otherProducts.map((r) => (
                <Link
                  key={r.id}
                  to={`/product/${r.id}`}
                  className="group bg-bg-light rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">{r.name}</h3>
                    <p className="text-base font-bold text-primary mt-1">Rp{r.price.toLocaleString('id-ID')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
