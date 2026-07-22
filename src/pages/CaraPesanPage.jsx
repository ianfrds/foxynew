import { Link } from 'react-router-dom'
import { WORKFLOW_STEPS, PAYMENT_METHODS, SHIPPING_COST } from '../constants'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import Reveal from '../components/Reveal'

const FAQ = [
  {
    q: 'Berapa lama proses produksi?',
    a: 'Produksi biasanya selesai dalam 1-2 hari kerja setelah pesanan dikonfirmasi. Untuk produk custom, estimasi bisa berbeda tergantung tingkat kesulitan.',
  },
  {
    q: 'Apakah bisa cetak foto sendiri?',
    a: 'Bisa. Kamu bisa upload foto atau desain sendiri saat checkout. Untuk hasil terbaik, gunakan gambar dengan resolusi minimal 1200 dpi.',
  },
  {
    q: 'Bagaimana jika hasil cetakan cacat?',
    a: 'Kami punya garansi cetak ulang GRATIS. Jika hasil cetakan rusak atau cacat, tinggal hubungi admin dan kami akan proses ulang tanpa biaya.',
  },
  {
    q: 'Berapa biaya pengiriman?',
    a: `Biaya pengiriman Rp${SHIPPING_COST.toLocaleString('id-ID')} untuk seluruh Indonesia. Gratis ongkir untuk pembelian minimal Rp50.000.`,
  },
  {
    q: 'Apa saja metode pembayaran?',
    a: 'Kami menerima pembayaran melalui QRIS, GoPay, ShopeePay, OVO, dan Virtual Account.',
  },
  {
    q: 'Apakah produk non-custom langsung dikirim?',
    a: 'Ya, untuk produk non-custom (tanpa upload foto), pesanan langsung masuk ke produksi dan dikirim tanpa perlu menunggu konfirmasi admin.',
  },
]

export default function CaraPesanPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartOpen={() => {}} />

      <div className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                Cara <span className="text-primary">Pesan</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Prosesnya gampang, tinggal ikutin langkah-langkah di bawah ini.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-bg-light rounded-3xl py-16 px-6 md:px-12 mb-20">
              <div className="grid md:grid-cols-3 gap-10 md:gap-8">
                {WORKFLOW_STEPS.map((step) => (
                  <div key={step.step} className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mx-auto shadow-sm">
                      {step.step}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Metode Pembayaran
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <div
                      key={pm.id}
                      className="flex items-center gap-3 bg-bg-light rounded-xl px-4 py-3"
                    >
                      <span className="text-xl">{pm.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{pm.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Pengiriman
                </h2>
                <div className="bg-bg-light rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Biaya pengiriman</span>
                    <span className="font-semibold text-gray-900">Rp{SHIPPING_COST.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Estimasi sampai</span>
                    <span className="font-semibold text-gray-900">1-3 hari</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Min. gratis ongkir</span>
                    <span className="font-semibold text-gray-900">Rp50.000</span>
                  </div>
                  <p className="text-xs text-gray-400 pt-2 border-t border-gray-200">
                    Pengiriman ke seluruh Indonesia via jasa ekspedisi terpercaya.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
                Pertanyaan Umum
              </h2>
              <div className="space-y-3 max-w-3xl mx-auto">
                {FAQ.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-bg-light rounded-2xl overflow-hidden"
                  >
                    <summary className="px-6 py-4 font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4 hover:bg-gray-100/50 transition-colors">
                      {item.q}
                      <svg
                        className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                        viewBox="0 0 12 8"
                        fill="none"
                      >
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="text-center bg-bg-light rounded-3xl py-16 px-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Siap Mulai?
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-8">
                Tinggal pilih produk, upload fotomu, dan kami akan mencetaknya dengan kualitas terbaik.
              </p>
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-dark transition-all no-underline"
              >
                Lihat Produk
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
