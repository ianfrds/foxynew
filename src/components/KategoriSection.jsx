import { useState } from 'react'
import Reveal from './Reveal'

const KATEGORI = [
  {
    name: 'Poster Anime',
    image: 'https://down-id.img.susercontent.com/file/783be4962d09131cff47d01ed6d620d3@resize_w900_nl.webp',
    overlay: 'from-indigo-700/70 via-indigo-600/20 to-transparent',
  },
  {
    name: 'Poster Kpop',
    image: 'https://down-id.img.susercontent.com/file/4bcb6f1b8b77b881588a54d85e52a676@resize_w900_nl.webp',
    overlay: 'from-fuchsia-700/70 via-fuchsia-600/20 to-transparent',
  },
  {
    name: 'Foto Polaroid',
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7r98o-lybuofkdgz5441.webp',
    overlay: 'from-amber-700/70 via-amber-600/20 to-transparent',
  },
  {
    name: 'Undangan Nikah',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    overlay: 'from-rose-700/70 via-rose-600/20 to-transparent',
  },
  {
    name: 'Undangan Semua Kategori',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    overlay: 'from-emerald-700/70 via-emerald-600/20 to-transparent',
  },
]

export default function KategoriSection() {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Kategori Kami</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih kategori desain yang kamu suka, kami cetak sesuai keinginanmu.
            </p>
          </div>
        </Reveal>

        {/* Mobile / Tablet: static grid, no expand */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:hidden">
          {KATEGORI.map((k, i) => (
            <CategoryCardStatic key={i} data={k} />
          ))}
        </div>

        {/* Desktop: flex row with smooth width expansion */}
        <div
          className="hidden lg:flex gap-4"
          onMouseLeave={() => setHovered(null)}
        >
          {KATEGORI.map((k, i) => (
            <CategoryCardExpand
              key={i}
              data={k}
              expanded={hovered === i}
              onHover={() => setHovered(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCardExpand({ data, expanded, onHover }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        flexGrow: expanded ? 3 : 1,
        flexShrink: 1,
        flexBasis: '0%',
        minWidth: 0,
        transition: 'flex-grow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={onHover}
    >
      <div
        className="h-96 relative rounded-2xl overflow-hidden"
        style={{
          boxShadow: expanded
            ? '0 20px 60px rgba(0,0,0,0.25)'
            : '0 4px 12px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        <img
          src={data.image}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover bg-gray-200"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${data.overlay} transition-opacity duration-500`}
          style={{ opacity: expanded ? 1 : 0 }}
        />

        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
          <h3
            className="text-white font-bold text-center text-3xl leading-tight drop-shadow-lg transition-all duration-500"
            style={{
              letterSpacing: expanded ? '0.05em' : '0',
            }}
          >
            {data.name}
          </h3>
        </div>
      </div>
    </div>
  )
}

function CategoryCardStatic({ data }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
      <div className="aspect-[3/4] sm:aspect-[4/5] relative rounded-2xl overflow-hidden transition-shadow duration-500 group-hover:shadow-xl">
        <img
          src={data.image}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover bg-gray-200"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${data.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h3 className="text-white font-bold text-center text-lg sm:text-xl leading-tight drop-shadow-lg">
            {data.name}
          </h3>
        </div>
      </div>
    </div>
  )
}
