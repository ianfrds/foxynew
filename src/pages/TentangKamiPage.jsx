import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import ValueProps from '../components/ValueProps'
import Testimonials from '../components/Testimonials'
import Reveal from '../components/Reveal'

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartOpen={() => {}} />

      <div className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                Tentang <span className="text-primary">Foxy ID</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Percetakan digital yang bikin desainmu jadi nyata — cepat, berkualitas, dan tanpa ribet.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cerita Kami</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Foxy ID lahir dari kegelisahan anak muda yang ingin mencetak desain mereka sendiri
                    tapi selalu menemukan proses yang rumit, mahal, dan hasil yang mengecewakan.
                  </p>
                  <p>
                    Kami hadir untuk mengubah itu. Dengan sistem cetak digital modern dan platform
                    yang mudah digunakan, siapa pun bisa mewujudkan ide mereka menjadi produk nyata —
                    dari poster aesthetic hingga polaroid lucu.
                  </p>
                  <p>
                    Setiap cetakan diproses dengan mesin berkualitas tinggi, kertas pilihan, dan
                    tinta vibrant yang tahan lama. Karena buat kami, hasil akhir adalah segalanya.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visi & Misi</h2>
                <div className="space-y-6">
                  <div className="bg-bg-light rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Visi</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Menjadi platform percetakan digital pilihan utama di Indonesia yang
                      menghubungkan kreativitas dengan kualitas cetak terbaik.
                    </p>
                  </div>
                  <div className="bg-bg-light rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Misi</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex gap-2">
                        <span className="text-primary font-bold shrink-0">•</span>
                        Menyediakan layanan cetak digital yang cepat, mudah, dan terjangkau
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold shrink-0">•</span>
                        Menggunakan material berkualitas tinggi untuk hasil cetak terbaik
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold shrink-0">•</span>
                        Terus berinovasi mengikuti kebutuhan desain dan tren terkini
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold shrink-0">•</span>
                        Memberikan pengalaman pelanggan yang menyenangkan dari awal hingga akhir
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Kenapa Pilih Foxy ID?
              </h2>
              <ValueProps />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Apa Kata Pelanggan
              </h2>
              <Testimonials />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="text-center bg-bg-light rounded-3xl py-16 px-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Siap Cetak Desainmu?
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-8">
                Upload foto atau desainmu sekarang, dan kami akan mencetaknya dengan kualitas terbaik.
              </p>
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-dark transition-all no-underline"
              >
                Lihat Semua Produk
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
