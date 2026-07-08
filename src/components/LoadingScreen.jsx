export default function LoadingScreen({ overlay = false }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-cream ${
        overlay ? 'animate-fade-in bg-opacity-95 backdrop-blur-sm' : ''
      }`}
    >
      <div className="loader" />

      <p className="mt-6 text-sm font-semibold text-brand-dark/50 tracking-widest uppercase">
        {overlay ? 'Memuat...' : 'Foxy ID'}
      </p>
    </div>
  )
}
