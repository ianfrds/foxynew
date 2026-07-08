import { useState } from 'react'
import { HiX, HiArrowLeft } from 'react-icons/hi'
import useCartStore from '../store/cartStore'
import { PAYMENT_METHODS } from '../constants'

export default function CheckoutForm({ onBack, onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' })
  const [payment, setPayment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const clearCart = useCartStore((s) => s.clearCart)
  const getTotal = useCartStore((s) => s.getTotal())
  const items = useCartStore((s) => s.items)

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      if (!form.name || !form.phone || !form.address) return
      setStep(2)
    } else {
      if (!payment) return
      setSubmitted(true)
      setTimeout(() => {
        clearCart()
        onClose()
      }, 3000)
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-card p-8 max-w-sm w-full text-center">
          <span className="text-5xl">🎉</span>
          <h3 className="text-xl font-bold text-gray-900 mt-4">Pesanan Berhasil!</h3>
          <p className="text-gray-600 mt-2">Terima kasih! Pesananmu akan segera diproses.</p>
          <p className="text-sm text-gray-400 mt-2">Konfirmasi akan dikirim via WhatsApp.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="p-1.5 text-gray-500 hover:text-gray-700 tap-target flex items-center justify-center">
                <HiArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="font-bold text-lg text-gray-900">
              {step === 1 ? 'Alamat Pengiriman' : 'Pilih Pembayaran'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 tap-target flex items-center justify-center">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-input text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Nama penerima" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">No. WhatsApp</label>
                <input required type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-input text-sm focus:outline-none focus:border-primary transition-colors" placeholder="08xxxxxxx" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Kota/Kabupaten</label>
                <input required value={form.city} onChange={(e) => update('city', e.target.value)} className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-input text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Kota" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Alamat Lengkap</label>
                <textarea required value={form.address} onChange={(e) => update('address', e.target.value)} rows={3} className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-input text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Catatan (opsional)</label>
                <input value={form.notes} onChange={(e) => update('notes', e.target.value)} className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-input text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Catatan untuk pengiriman" />
              </div>

              <div className="bg-bg-light rounded-card p-4 space-y-1.5 text-sm">
                <p className="font-semibold text-gray-900 mb-2">Ringkasan Pesanan ({items.length} item)</p>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-600">
                    <span>{item.productName} x{item.quantity}</span>
                    <span>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>Rp{getTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 bg-primary text-white font-semibold rounded-input hover:bg-primary-dark transition-all active:scale-[0.98] tap-target">
                Lanjut ke Pembayaran
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600">Pilih metode pembayaran yang tersedia:</p>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((pm) => (
                  <label key={pm.id} className={`flex items-center gap-4 p-4 rounded-card border-2 cursor-pointer transition-all ${
                    payment === pm.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'
                  }`}>
                    <input type="radio" name="payment" value={pm.id} checked={payment === pm.id} onChange={(e) => setPayment(e.target.value)} className="sr-only" />
                    <span className="text-2xl">{pm.icon}</span>
                    <span className="font-medium text-gray-900">{pm.name}</span>
                    {payment === pm.id && <span className="ml-auto text-primary text-sm font-semibold">Dipilih</span>}
                  </label>
                ))}
              </div>

              <div className="bg-bg-light rounded-card p-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Total Pembayaran</span>
                  <span className="font-bold text-primary text-lg">Rp{getTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button type="submit" disabled={!payment} className="w-full py-3.5 bg-primary text-white font-semibold rounded-input hover:bg-primary-dark transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed tap-target">
                Konfirmasi Pesanan
              </button>
              <p className="text-xs text-gray-400 text-center">* Pembayaran akan diproses melalui metode yang dipilih</p>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
