import { TESTIMONIALS } from '../constants'
import { HiStar } from 'react-icons/hi'

const duplicated = [...TESTIMONIALS, ...TESTIMONIALS]

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-16 md:py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Kata Mereka
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Apa kata pelanggan setia Foxy ID tentang pengalaman mereka.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-bg-light via-bg-light/30 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-bg-light via-bg-light/30 to-transparent pointer-events-none" />

          <div className="overflow-hidden">
            <div className="flex py-4 gap-4 md:gap-6 animate-scroll">
              {duplicated.map((t, i) => (
                <div
                  key={i}
                  className="min-w-[70%] sm:min-w-[32%] lg:min-w-[22%] card group p-5 sm:p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-4 relative z-[2]">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate relative z-[2]">
                        {t.name}
                      </h3>
                      <span className="inline-block text-xs bg-primary/10 text-primary font-medium px-2.5 py-0.5 rounded-full leading-normal">
                        {t.product}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-3 relative z-[2]">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <HiStar key={j} className={`w-4 h-4 md:w-5 md:h-5 ${j < t.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm md:text-base relative z-[2]">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="shine" />
                  <div className="background">
                    <div className="tiles">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <div key={n} className={`tile tile-${n}`} />
                      ))}
                    </div>
                    <div className="line line-1" />
                    <div className="line line-2" />
                    <div className="line line-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
