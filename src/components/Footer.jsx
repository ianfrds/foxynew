import { FaInstagram, FaXTwitter, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import logo from '../assets/2.png'

const socialLinks = [
  { icon: FaXTwitter, label: 'Twitter', href: '#' },
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaTiktok, label: 'TikTok', href: '#' },
  { icon: FaYoutube, label: 'YouTube', href: '#' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/6281234567890' },
]

export default function Footer() {
  return (
    <footer className="bg-[#131314] w-full mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">

        <div className="lg:col-span-3 space-y-6">
          <a href="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Foxy ID" className="h-8 w-auto" />
            <span className="font-bold text-xl text-white">Foxy ID</span>
          </a>
          <p className="text-sm/6 text-neutral-300 max-w-96 sm:max-w-72">
            Platform cetak poster &amp; polaroid kustom berkualitas studio.
          </p>
          <div className="flex gap-5 md:gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-neutral-400 hover:text-primary transition-colors"
                aria-label={s.label}
              >
                <s.icon className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20 items-start">
          <div>
            <h3 className="font-medium text-sm mb-4">Produk</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Poster</a></li>
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Polaroid</a></li>
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Custom Photo</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Bantuan</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Cara Pesan</a></li>
              <li><a href="#" className="hover:text-neutral-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Ukuran &amp; Harga</a></li>
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm mb-4">Perusahaan</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Hubungi Kami</a></li>
              <li className="flex items-center gap-2">
                <a href="#" className="hover:text-neutral-400 transition-colors">Karir</a>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/20 border border-primary/50 text-primary">HIRING</span>
              </li>
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-neutral-400 transition-colors">Syarat &amp; Ketentuan</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-neutral-700 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-neutral-400 text-sm">&copy; {new Date().getFullYear()} Foxy ID</p>
        <p className="text-sm text-neutral-400">All rights reserved.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-primary/30 rounded-full blur-[170px] pointer-events-none" />
        <h1 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_#E63946] mt-6 select-none">
          Foxy ID
        </h1>
      </div>
    </footer>
  )
}
