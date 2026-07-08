import InteractiveDots from './InteractiveDots'
import { FlipWords } from './ui/flip-words'
import { LogoLoop } from './ui/LogoLoop/LogoLoop'

// Elegant spinning text path badge replacement using pure CSS/HTML
const RotatingBadge = () => {
  const handleClick = () => {
    const el = document.getElementById('produk')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      className="bg-brand-dark hover:bg-primary text-brand-cream hover:text-white rounded-full w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center font-bold text-[10px] uppercase tracking-widest shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 js-scroll-to-produk text-center p-2"
      aria-label="Lihat Koleksi Produk Foxy ID"
    >
      <span>Lihat</span>
      <span>Koleksi</span>
      <span className="mt-1 text-xs">▶</span>
    </button>
  )
}

export default function Hero() {
  const words = ['rooms', 'walls', 'space', 'studio', 'gallery']

  return (
    <section id="hero" className="relative min-h-screen pt-12 pb-12 bg-brand-cream overflow-hidden flex flex-col justify-between">
      {/* Interactive dot grid */}
      <InteractiveDots />

      {/* Bottom aesthetic primary gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-[28rem] bg-gradient-to-t from-primary/20 via-primary/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center py-6">

        {/* Dynamic Image Collage Section with Left/Right Corners and Big Center Title */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 w-full max-w-7xl mx-auto my-6 relative z-10">

          {/* Left Corner Gallery */}
          <div className="hidden lg:flex gap-2 md:gap-4 items-center w-full lg:w-auto justify-center lg:justify-start order-2 lg:order-1">
            {/* Column 1 */}
            <div className="hidden sm:flex flex-col gap-6 items-center">
              <RotatingBadge />
              <figure className="w-28 bg-white p-2.5 pb-4 rounded-2xl shadow-md border border-brand-dark/5 -rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://down-id.img.susercontent.com/file/id-11134207-7r98z-lys6yta9szc8a6@resize_w900_nl.webp"
                  alt="Polaroid 2x3 print sample"
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
                <figcaption className="text-center mt-3 text-[10px] font-bold tracking-widest text-brand-dark/50 uppercase">
                  Polaroid 2×3
                </figcaption>
              </figure>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-6 w-28 sm:w-32">
              <div className="text-brand-dark/60 self-start pl-2 font-serif italic text-sm tracking-wider uppercase select-none">
                NEW! ↓
              </div>
              <figure className="bg-white p-2.5 pb-4 rounded-2xl shadow-md border border-brand-dark/5 rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://down-id.img.susercontent.com/file/id-11134207-7r98s-lybuofkngkbidd.webp"
                  alt="Polaroid 3x4 print sample"
                  className="w-full aspect-[4/5] object-cover rounded-lg"
                  loading="lazy"
                />
                <figcaption className="text-center mt-3 text-[10px] font-bold tracking-widest text-brand-dark/50 uppercase">
                  Polaroid 3×4
                </figcaption>
              </figure>
              <figure className="bg-white p-2.5 pb-4 rounded-2xl shadow-sm border border-brand-dark/5 -rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://down-id.img.susercontent.com/file/id-11134207-7r98o-lybuofkdgz5441.webp"
                  alt="Polaroid Square print sample"
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
                <figcaption className="text-center mt-3 text-[10px] font-bold tracking-widest text-brand-dark/50 uppercase">
                  Square
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="flex-1 text-center max-w-xl px-4 py-8 order-1 lg:order-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-brand-dark leading-[1.05] tracking-tighter">
              Making your{' '}
              <FlipWords words={words} className="text-primary" />
              <br />
              Come alive
            </h1>
            <p className="text-sm text-gray-500 mt-6 max-w-xs mx-auto leading-relaxed">
              Cetak poster & polaroid kustom kualitas studio premium.
            </p>
          </div>

          {/* Right Corner Gallery */}
          <div className="hidden lg:flex gap-2 md:gap-4 items-center w-full lg:w-auto justify-center lg:justify-end order-3">
            {/* Column 4 */}
            <div className="flex flex-col gap-6 w-28 sm:w-32">
              <figure className="bg-white p-2.5 pb-4 rounded-2xl shadow-md border border-brand-dark/5 -rotate-1 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://down-id.img.susercontent.com/file/ba7d51d0ec628525f3a05d3964b5ba79.webp"
                  alt="Mini Poster print sample"
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                  loading="lazy"
                />
                <figcaption className="text-center mt-3 text-[10px] font-bold tracking-widest text-brand-dark/50 uppercase">
                  Mini Poster
                </figcaption>
              </figure>
              <figure className="bg-white p-2.5 pb-4 rounded-2xl shadow-md border border-brand-dark/5 rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://down-id.img.susercontent.com/file/783be4962d09131cff47d01ed6d620d3@resize_w900_nl.webp"
                  alt="Poster A3 print sample"
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
                <figcaption className="text-center mt-3 text-[10px] font-bold tracking-widest text-brand-dark/50 uppercase">
                  Poster A3
                </figcaption>
              </figure>
            </div>
            {/* Column 5 */}
            <div className="hidden sm:flex flex-col gap-6 w-28">
              <div className="text-left py-2 px-1">
                <p className="text-[10px] font-extrabold tracking-widest text-brand-dark/95 leading-relaxed uppercase relative inline-block after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[1.5px] after:bg-brand-dark/30">
                  TREN CETAK ESTETIK<br />YANG BELUM PERNAH<br />KAMU LIHAT SEBELUMNYA
                </p>
              </div>
              <figure className="bg-white p-2.5 pb-4 rounded-2xl shadow-md border border-brand-dark/5 rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://down-id.img.susercontent.com/file/4bcb6f1b8b77b881588a54d85e52a676@resize_w900_nl.webp"
                  alt="Poster A4 print sample"
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
                <figcaption className="text-center mt-3 text-[10px] font-bold tracking-widest text-brand-dark/50 uppercase">
                  Poster A4
                </figcaption>
              </figure>
              <figure className="bg-white p-2.5 pb-4 rounded-2xl shadow-md border border-brand-dark/5 -rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://down-id.img.susercontent.com/file/id-11134207-7r98y-lybuofke3g0r5d.webp"
                  alt="Premium Framed Photo Print Showcase"
                  className="w-full aspect-[3/4.5] object-cover rounded-lg"
                  loading="lazy"
                />
                <figcaption className="text-center mt-3 text-[10px] font-bold tracking-widest text-brand-dark/50 uppercase">
                  Karya Seni Studio
                </figcaption>
              </figure>
            </div>
          </div>

        </div>

        {/* Marketplace Logo Scroller */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 md:mt-12 border-t border-brand-dark/5 pt-6 md:pt-8 overflow-hidden">
          <div className="grayscale opacity-40">
            <LogoLoop
              logos={[
                { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg', alt: 'Shopee' },
                { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Tokopedia.svg', alt: 'Tokopedia' },
                { src: 'https://jagoketik.com/wp-content/uploads/2023/02/tiktok_shop-logo_brandlogos.net_5ewfz-edited.webp', alt: 'TikTok Shop' },
              ]}
              speed={50}
              direction="left"
              logoHeight={40}
              gap={80}
              pauseOnHover
            />
          </div>
        </div>

      </div>
    </section>
  )
}
