import { useState, useEffect, useRef } from 'react'
import { HiStar } from 'react-icons/hi'
import Reveal from './Reveal'

function useCountUp(end, duration = 2000, trigger) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!trigger || started.current) return
    started.current = true

    let startTime = null
    const step = (now) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger, end, duration])

  return count
}

function StarRating({ rating, size = 'w-5 h-5' }) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        let cls = 'text-gray-200'
        if (i < full) cls = 'text-yellow-400'
        else if (i === full && hasHalf) cls = 'text-yellow-400'
        return <HiStar key={i} className={`${size} ${cls}`} />
      })}
    </div>
  )
}

export default function Statistics() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const productsSold = useCountUp(15000, 2000, visible)
  const sinceYear = useCountUp(2022, 1200, visible)
  const totalReviews = useCountUp(1200, 1800, visible)

  return (
    <section ref={ref} className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Kepercayaan Pelanggan
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Sudah dipercaya ribuan pelanggan dari seluruh Indonesia.
              </p>
            </div>
          </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Reveal delay={0}>
            <div className="bg-bg-light rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-black text-primary tabular-nums">
                {visible ? productsSold.toLocaleString('id-ID') : '0'}
                <span className="text-2xl">+</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 font-medium uppercase tracking-wider">
                Produk Terjual
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-bg-light rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-black text-primary tabular-nums">
                Sejak {visible ? sinceYear : '—'}
              </div>
              <p className="text-gray-500 text-sm mt-2 font-medium uppercase tracking-wider">
                Tahun Berdiri
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-bg-light rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-4xl font-black text-primary tabular-nums">4.9</span>
                <StarRating rating={5} size="w-5 h-5" />
              </div>
              <p className="text-gray-500 text-sm mt-2 font-medium uppercase tracking-wider">
                Rating {visible ? `(${totalReviews.toLocaleString('id-ID')} ulasan)` : ''}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
