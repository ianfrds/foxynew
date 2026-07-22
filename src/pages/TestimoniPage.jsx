import { Link } from 'react-router-dom'
import { HiStar } from 'react-icons/hi'
import { TESTIMONIALS } from '../constants'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import Reveal from '../components/Reveal'

const ratings = TESTIMONIALS.map((t) => t.rating)
const avgRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
const ratingCounts = [0, 0, 0, 0, 0]
ratings.forEach((r) => { ratingCounts[r - 1]++ })

export default function TestimoniPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartOpen={() => {}} />

      <div className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                Kata <span className="text-primary">Mereka</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Apa kata pelanggan setia Foxy ID tentang pengalaman mereka.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-bg-light rounded-3xl p-8 md:p-10 mb-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="text-center shrink-0">
                  <div className="text-5xl font-extrabold text-gray-900">{avgRating}</div>
                  <div className="flex gap-0.5 justify-center mt-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <HiStar key={j} className={`w-5 h-5 ${j < Math.round(+avgRating) ? 'text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    dari {TESTIMONIALS.length} ulasan
                  </p>
                </div>
                <div className="flex-1 w-full max-w-md space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingCounts[star - 1] || 0
                    const pct = Math.round((count / TESTIMONIALS.length) * 100)
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-8 text-right shrink-0">{star}</span>
                        <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-10 shrink-0">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Ulasan Pelanggan
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
                  <div className="bg-bg-light rounded-2xl p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-11 h-11 rounded-full shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{t.name}</h3>
                        <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
                          {t.product}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <HiStar key={j} className={`w-4 h-4 ${j < t.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="text-center bg-bg-light rounded-3xl py-16 px-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Mau Jadi Bagian Dari Mereka?
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-8">
                Rasakan sendiri kualitas cetakan Foxy ID. Pesan sekarang dan buktikan!
              </p>
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-dark transition-all no-underline"
              >
                Mulai Pesan
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
      <CartDrawer isOpen={false} onClose={() => {}} />
    </div>
  )
}
