import { WORKFLOW_STEPS } from '../constants'
import Reveal from './Reveal'

export default function Workflow() {
  return (
    <section id="cara-pesan" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Cara Pesan
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Cukup 3 langkah mudah, pesananmu langsung diproses!
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {WORKFLOW_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={Math.min(i * 0.1, 0.3)}>
              <div key={step.step} className="relative text-center group">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl font-extrabold text-primary group-hover:text-white transition-colors">
                    {step.step}
                  </span>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[calc(80%)] h-0.5 border-t-2 border-dashed border-gray-300" />
                )}
                <h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
