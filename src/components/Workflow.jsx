import { WORKFLOW_STEPS } from '../constants'
import Reveal from './Reveal'

export default function Workflow() {
  return (
    <section id="cara-pesan" className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Cara Pesan
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              3 langkah mudah
            </p>
          </div>
        </Reveal>

        <div className="relative grid md:grid-cols-3">
          <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gray-200" />

          {WORKFLOW_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={Math.min(i * 0.15, 0.45)}>
              <div className="flex flex-col items-center text-center px-6">
                <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full border-2 border-gray-200 bg-white shadow-sm">
                  <span className="text-2xl font-bold text-gray-700">
                    {step.step}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
