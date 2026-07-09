import { VALUE_PROPS } from '../constants'
import Reveal from './Reveal'

export default function ValueProps() {
  return (
    <section className="py-16 md:py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Kenapa Memilih Foxy ID?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Kami serius dalam kualitas, sehingga kamu bisa percaya setiap cetakan.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {VALUE_PROPS.map((vp, i) => (
            <Reveal key={vp.title} delay={Math.min(i * 0.08, 0.3)}>
              <div key={vp.title} className="card group pt-12 sm:pt-14 p-5 sm:p-6 md:p-8">
                <span className="icon">
                  <span className="text-2xl leading-none">{vp.icon}</span>
                </span>
                <h4 className="text-lg md:text-xl">{vp.title}</h4>
                <p className="text-sm md:text-base">{vp.desc}</p>

                <div className="shine" />
                <div className="background">
                  <div className="tiles">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <div key={i} className={`tile tile-${i}`} />
                    ))}
                  </div>
                  <div className="line line-1" />
                  <div className="line line-2" />
                  <div className="line line-3" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
