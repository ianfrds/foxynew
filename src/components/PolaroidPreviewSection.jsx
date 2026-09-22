import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import {
  HiSparkles,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCamera,
} from 'react-icons/hi'
import Reveal from './Reveal'

const DEFAULT_PHOTO =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'

const SVG_PATTERNS = {
  gingham: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236%22%20height%3D%2236%22%20viewBox%3D%220%200%2036%2036%22%3E%3Crect%20width%3D%2236%22%20height%3D%2236%22%20fill%3D%22%23FFF1F5%22/%3E%3Crect%20width%3D%2218%22%20height%3D%2218%22%20fill%3D%22%23FBCFE8%22%20fill-opacity%3D%220.5%22/%3E%3Crect%20x%3D%2218%22%20y%3D%2218%22%20width%3D%2218%22%20height%3D%2218%22%20fill%3D%22%23FBCFE8%22%20fill-opacity%3D%220.5%22/%3E%3Crect%20width%3D%2236%22%20height%3D%2236%22%20fill%3D%22%23F472B6%22%20fill-opacity%3D%220.18%22/%3E%3C/svg%3E',
  hearts: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2244%22%20height%3D%2244%22%20viewBox%3D%220%200%2044%2044%22%3E%3Crect%20width%3D%2244%22%20height%3D%2244%22%20fill%3D%22%23FFF5F5%22/%3E%3Cpath%20d%3D%22M12%207c-2.2%200-4%201.8-4%204%200%204.4%207%208%207%208s7-3.6%207-8c0-2.2-1.8-4-4-4-1.5%200-2.8.8-3.5%202C13.8%207.8%2012.5%207%2012%207z%22%20fill%3D%22%23FDA4AF%22%20transform%3D%22translate%284%2C4%29%20scale%280.7%29%22/%3E%3Cpath%20d%3D%22M12%207c-2.2%200-4%201.8-4%204%200%204.4%207%208%207%208s7-3.6%207-8c0-2.2-1.8-4-4-4-1.5%200-2.8.8-3.5%202C13.8%207.8%2012.5%207%2012%207z%22%20fill%3D%22%23FB7185%22%20fill-opacity%3D%220.65%22%20transform%3D%22translate%2826%2C26%29%20scale%280.6%29%22/%3E%3C/svg%3E',
  sparkle: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2244%22%20height%3D%2244%22%20viewBox%3D%220%200%2044%2044%22%3E%3Crect%20width%3D%2244%22%20height%3D%2244%22%20fill%3D%22%23FAF5FF%22/%3E%3Cpath%20d%3D%22M12%204%20L14%2010%20L20%2012%20L14%2014%20L12%2020%20L10%2014%20L4%2012%20L10%2010%20Z%22%20fill%3D%22%23C084FC%22%20transform%3D%22scale%280.8%29%20translate%282%2C2%29%22/%3E%3Ccircle%20cx%3D%2234%22%20cy%3D%2214%22%20r%3D%222.5%22%20fill%3D%22%23E9D5FF%22/%3E%3Ccircle%20cx%3D%2214%22%20cy%3D%2234%22%20r%3D%222%22%20fill%3D%22%23E9D5FF%22/%3E%3Cpath%20d%3D%22M12%204%20L14%2010%20L20%2012%20L14%2014%20L12%2020%20L10%2014%20L4%2012%20L10%2010%20Z%22%20fill%3D%22%23A855F7%22%20fill-opacity%3D%220.75%22%20transform%3D%22scale%280.6%29%20translate%2838%2C38%29%22/%3E%3C/svg%3E',
  daisy: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2048%2048%22%3E%3Crect%20width%3D%2248%22%20height%3D%2248%22%20fill%3D%22%23FEFCE8%22/%3E%3Cg%20transform%3D%22translate%2814%2C%2014%29%22%3E%3Ccircle%20cx%3D%220%22%20cy%3D%22-6%22%20r%3D%223%22%20fill%3D%22%23FFFFFF%22/%3E%3Ccircle%20cx%3D%220%22%20cy%3D%226%22%20r%3D%223%22%20fill%3D%22%23FFFFFF%22/%3E%3Ccircle%20cx%3D%22-6%22%20cy%3D%220%22%20r%3D%223%22%20fill%3D%22%23FFFFFF%22/%3E%3Ccircle%20cx%3D%226%22%20cy%3D%220%22%20r%3D%223%22%20fill%3D%22%23FFFFFF%22/%3E%3Ccircle%20cx%3D%22-4.2%22%20cy%3D%22-4.2%22%20r%3D%223%22%20fill%3D%22%23FFFFFF%22/%3E%3Ccircle%20cx%3D%224.2%22%20cy%3D%22-4.2%22%20r%3D%223%22%20fill%3D%22%23FFFFFF%22/%3E%3Ccircle%20cx%3D%22-4.2%22%20cy%3D%224.2%22%20r%3D%223%22%20fill%3D%22%23FFFFFF%22/%3E%3Ccircle%20cx%3D%224.2%22%20cy%3D%224.2%22%20r%3D%223%22%20fill%3D%22%23FFFFFF%22/%3E%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%223.2%22%20fill%3D%22%23FBBF24%22/%3E%3C/g%3E%3Ccircle%20cx%3D%2238%22%20cy%3D%2238%22%20r%3D%222%22%20fill%3D%22%23FDE68A%22/%3E%3C/svg%3E',
  clouds: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%3E%3Crect%20width%3D%2250%22%20height%3D%2250%22%20fill%3D%22%23F0F9FF%22/%3E%3Cg%20fill%3D%22%23BAE6FD%22%20transform%3D%22translate%2810%2C%2012%29%20scale%280.8%29%22%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2212%22%20r%3D%226%22/%3E%3Ccircle%20cx%3D%2216%22%20cy%3D%229%22%20r%3D%227%22/%3E%3Ccircle%20cx%3D%2223%22%20cy%3D%2212%22%20r%3D%226%22/%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2213%22%20height%3D%228%22/%3E%3C/g%3E%3Ccircle%20cx%3D%2238%22%20cy%3D%2238%22%20r%3D%222%22%20fill%3D%22%23E0F2FE%22/%3E%3Ccircle%20cx%3D%2242%22%20cy%3D%2234%22%20r%3D%221.5%22%20fill%3D%22%23E0F2FE%22/%3E%3C/svg%3E',
  grid: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%3E%3Crect%20width%3D%2228%22%20height%3D%2228%22%20fill%3D%22%23F0FDF4%22/%3E%3Cpath%20d%3D%22M%2028%200%20L%200%200%200%2028%22%20fill%3D%22none%22%20stroke%3D%22%23BBF7D0%22%20stroke-width%3D%221.2%22/%3E%3C/svg%3E',
  polka: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23F5F3FF%22/%3E%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223%22%20fill%3D%22%23DDD6FE%22/%3E%3Ccircle%20cx%3D%2224%22%20cy%3D%2224%22%20r%3D%223%22%20fill%3D%22%23DDD6FE%22/%3E%3C/svg%3E',
}

const CUTE_PATTERNS = [
  {
    id: 'classic',
    name: 'Classic White',
    subtitle: 'Putih Bersih',
    bg: '#FFFFFF',
    dataUrl: null,
    border: 'border-zinc-200',
  },
  {
    id: 'pink-gingham',
    name: 'Pink Gingham',
    subtitle: 'Kotak Pink Lucu',
    bg: '#FFF1F5',
    dataUrl: SVG_PATTERNS.gingham,
    border: 'border-pink-200',
  },
  {
    id: 'sweet-hearts',
    name: 'Sweet Hearts',
    subtitle: 'Motif Hati Pastel',
    bg: '#FFF5F5',
    dataUrl: SVG_PATTERNS.hearts,
    border: 'border-rose-200',
  },
  {
    id: 'lilac-sparkle',
    name: 'Lilac Sparkle',
    subtitle: 'Bintang & Sparkle',
    bg: '#FAF5FF',
    dataUrl: SVG_PATTERNS.sparkle,
    border: 'border-purple-200',
  },
  {
    id: 'daisy-garden',
    name: 'Daisy Flower',
    subtitle: 'Bunga Daisy Mini',
    bg: '#FEFCE8',
    dataUrl: SVG_PATTERNS.daisy,
    border: 'border-amber-200',
  },
  {
    id: 'baby-clouds',
    name: 'Baby Clouds',
    subtitle: 'Awan Biru Lembut',
    bg: '#F0F9FF',
    dataUrl: SVG_PATTERNS.clouds,
    border: 'border-sky-200',
  },
  {
    id: 'mint-grid',
    name: 'Mint Grid',
    subtitle: 'Grid Aesthetic',
    bg: '#F0FDF4',
    dataUrl: SVG_PATTERNS.grid,
    border: 'border-emerald-200',
  },
  {
    id: 'pastel-polka',
    name: 'Pastel Polka',
    subtitle: 'Polkadot Lavender',
    bg: '#F5F3FF',
    dataUrl: SVG_PATTERNS.polka,
    border: 'border-violet-200',
  },
]

export default function PolaroidPreviewSection() {
  const [photoUrl, setPhotoUrl] = useState(DEFAULT_PHOTO)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const activePattern = CUTE_PATTERNS[activeIndex]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const objectUrl = URL.createObjectURL(file)
      setPhotoUrl(objectUrl)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: false,
    noClick: false,
  })

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CUTE_PATTERNS.length) % CUTE_PATTERNS.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CUTE_PATTERNS.length)
  }

  // Consistent linear spacing calculation
  const getItemTransform = (index) => {
    const len = CUTE_PATTERNS.length
    let dist = (index - activeIndex) % len
    if (dist > len / 2) dist -= len
    if (dist < -len / 2) dist += len

    const stepSize = isMobile ? 240 : 300
    const xPos = dist * stepSize

    if (dist === 0) {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
        filter: 'brightness(100%)',
        pointerEvents: 'auto',
      }
    }
    if (Math.abs(dist) === 1) {
      return {
        x: xPos,
        scale: 0.8,
        opacity: 0.7,
        zIndex: 20,
        filter: 'brightness(95%)',
        pointerEvents: 'auto',
      }
    }
    if (Math.abs(dist) === 2) {
      return {
        x: xPos,
        scale: 0.66,
        opacity: isMobile ? 0 : 0.4,
        zIndex: 10,
        filter: 'brightness(88%)',
        pointerEvents: isMobile ? 'none' : 'auto',
      }
    }
    return {
      x: xPos,
      scale: 0.52,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }
  }

  return (
    <section id="polaroid-preview" className="py-20 md:py-28 bg-[#FAFAFA] relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-rose-50/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-primary text-xs font-semibold tracking-wide uppercase mb-3">
              <HiSparkles className="w-4 h-4 text-primary" />
              <span>Simulasi Polaroid</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
              Lihat Fotomu dalam Frame Polaroid
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Klik frame polaroid di tengah untuk mengunggah foto kamu, lalu geser untuk melihat berbagai motif lucu.
            </p>
          </div>
        </Reveal>

        {/* ─── COVERFLOW SLIDER ─── */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center min-h-[430px] sm:min-h-[490px]">
          {/* Coverflow Track */}
          <div className="relative w-full h-[400px] sm:h-[450px] flex items-center justify-center">
            {CUTE_PATTERNS.map((pattern, i) => {
              const target = getItemTransform(i)
              const isActive = i === activeIndex

              return (
                <motion.div
                  key={pattern.id}
                  animate={{
                    x: target.x,
                    scale: target.scale,
                    opacity: target.opacity,
                    zIndex: target.zIndex,
                    filter: target.filter,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 28,
                    mass: 0.8,
                  }}
                  onClick={() => !isActive && setActiveIndex(i)}
                  className={`absolute top-0 bottom-0 my-auto w-[240px] sm:w-[280px] h-[330px] sm:h-[390px] select-none ${
                    isActive ? 'cursor-default' : 'cursor-pointer hover:opacity-90'
                  }`}
                  style={{
                    pointerEvents: target.pointerEvents,
                  }}
                >
                  {/* Polaroid Card */}
                  <div
                    style={{
                      backgroundColor: pattern.bg,
                      backgroundImage: pattern.dataUrl ? `url("${pattern.dataUrl}")` : undefined,
                      backgroundRepeat: 'repeat',
                    }}
                    className={`w-full h-full rounded-2xl border ${pattern.border} p-3 sm:p-3.5 pb-10 sm:pb-14 flex flex-col justify-between transition-shadow duration-300 ${
                      isActive
                        ? 'shadow-[0_22px_50px_-12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)] ring-2 ring-black/5'
                        : 'shadow-md border-black/5'
                    }`}
                  >
                    {/* Inner Photo Recess / Frame Upload Area */}
                    {isActive ? (
                      /* ACTIVE CENTER FRAME: Direct Upload Trigger */
                      <div
                        {...getRootProps()}
                        className={`relative aspect-[1/1.05] w-full rounded-xl overflow-hidden bg-zinc-950 shadow-inner border border-black/10 cursor-pointer group/photo transition-all ${
                          isDragActive ? 'ring-4 ring-primary' : ''
                        }`}
                        title="Klik atau seret foto ke sini untuk mengganti foto"
                      >
                        <input {...getInputProps()} />

                        {/* Uploaded Photo */}
                        <img
                          src={photoUrl}
                          alt="Fotomu di Polaroid"
                          className="w-full h-full object-cover select-none pointer-events-none"
                          draggable={false}
                        />

                        {/* Subtle Glossy Film Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                        {/* Photo Cutout Recess Shadow */}
                        <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] pointer-events-none" />

                        {/* Drag Active Overlay */}
                        {isDragActive && (
                          <div className="absolute inset-0 z-30 bg-primary/85 backdrop-blur-xs flex flex-col items-center justify-center text-white p-3 text-center border-2 border-dashed border-white rounded-xl">
                            <HiOutlineCamera className="w-8 h-8 animate-bounce mb-1" />
                            <p className="text-xs font-bold">Lepaskan foto di sini</p>
                          </div>
                        )}

                        {/* Hover Overlay Hint */}
                        {!isDragActive && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1.5px] opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-3 text-center pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1.5 shadow-sm">
                              <HiOutlineCamera className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs font-bold tracking-wide">Klik / Seret Foto</span>
                            <span className="text-[10px] text-white/80">Upload langsung ke frame</span>
                          </div>
                        )}

                        {/* Floating Badge (Visible when not hovered) */}
                        {!isDragActive && (
                          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md text-white text-[10px] font-medium shadow-sm transition group-hover/photo:opacity-0 pointer-events-none">
                            <HiOutlineCamera className="w-3 h-3 text-rose-300" />
                            <span>Ganti Foto</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* SIDE CARDS: Static preview (clicking brings to center) */
                      <div className="relative aspect-[1/1.05] w-full rounded-xl overflow-hidden bg-zinc-950 shadow-inner border border-black/10">
                        <img
                          src={photoUrl}
                          alt={pattern.name}
                          className="w-full h-full object-cover select-none pointer-events-none"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)] pointer-events-none" />
                      </div>
                    )}

                    {/* Bottom Chin */}
                    <div className="pt-2 px-1 flex items-center justify-between text-zinc-400">
                      <span className="text-[11px] font-semibold text-zinc-600 tracking-wide truncate">
                        {pattern.name}
                      </span>
                      <span className="text-[9px] tracking-widest font-mono text-zinc-400 uppercase">
                        FOXY
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ─── Circular Arrow Buttons ─── */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Frame Sebelumnya"
            className="absolute left-1 sm:left-[calc(50%-180px)] md:left-[calc(50%-195px)] z-40 w-11 h-11 rounded-full bg-zinc-200/90 hover:bg-white text-zinc-700 hover:text-zinc-950 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs border border-white/60"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Frame Selanjutnya"
            className="absolute right-1 sm:right-[calc(50%-180px)] md:right-[calc(50%-195px)] z-40 w-11 h-11 rounded-full bg-zinc-200/90 hover:bg-white text-zinc-700 hover:text-zinc-950 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs border border-white/60"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ─── Pattern Name & Dots Indicator ─── */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-zinc-200/80 shadow-2xs mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-bold text-zinc-900">{activePattern.name}</span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-500">{activePattern.subtitle}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            {CUTE_PATTERNS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Pilih motif ${p.name}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? 'w-5 bg-primary'
                    : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
