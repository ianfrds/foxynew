import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../constants'
import useCartStore from '../store/cartStore'
import { HiShoppingCart } from 'react-icons/hi'

const ITEMS_PER_PAGE = 8

export default function ProductCatalog() {
  const [showAll, setShowAll] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const displayed = showAll ? PRODUCTS : PRODUCTS.slice(0, ITEMS_PER_PAGE)

  return (
    <section id="produk" className="py-16 md:py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Pilihan Produk</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Dari polaroid mungil hingga poster ukuran besar — semua bisa kamu kustomisasi.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayed.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-card overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-white/90 text-[10px] sm:text-xs font-semibold text-gray-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-input">
                  {product.category}
                </span>
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="font-bold text-sm md:text-base text-gray-900">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed flex-1">{product.description}</p>
                <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 sm:justify-between">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-primary">Rp{product.price.toLocaleString('id-ID')}</span>
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
          ))}
        </div>
      </div>
    </section>
  )
}
