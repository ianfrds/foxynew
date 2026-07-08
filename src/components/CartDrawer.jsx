import { useState } from 'react'
import { HiX, HiMinus, HiPlus, HiTrash } from 'react-icons/hi'
import useCartStore from '../store/cartStore'
import CheckoutForm from './CheckoutForm'

export default function CartDrawer({ isOpen, onClose }) {
  const [showCheckout, setShowCheckout] = useState(false)
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const getSubtotal = useCartStore((s) => s.getSubtotal())
  const getDiscount = useCartStore((s) => s.getDiscount())
  const getTotal = useCartStore((s) => s.getTotal())
  const promoCode = useCartStore((s) => s.promoCode)
  const setPromoCode = useCartStore((s) => s.setPromoCode)

  if (showCheckout) {
    return (
      <CheckoutForm
        onBack={() => setShowCheckout(false)}
        onClose={onClose}
      />
    )
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-[70]" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-bold text-xl text-gray-900">Keranjang</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors tap-target flex items-center justify-center">
              <HiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <span className="text-5xl">🛒</span>
                <p className="mt-4 text-gray-500">Keranjang belanja masih kosong</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-bg-light rounded-card p-4">
                  <img src={item.image} alt={item.productName} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm">{item.productName}</h4>
                    <p className="text-sm font-bold text-primary mt-1">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors tap-target">
                        <HiMinus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors tap-target">
                        <HiPlus className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto p-1.5 text-gray-400 hover:text-red-500 transition-colors tap-target flex items-center justify-center">
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-100 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Kode promo..."
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-input text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button onClick={() => setPromoCode(promoCode)} className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold text-sm rounded-input hover:bg-gray-200 transition-colors tap-target">
                  Pakai
                </button>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp{getSubtotal.toLocaleString('id-ID')}</span>
                </div>
                {getDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Diskon (10%)</span>
                    <span>-Rp{getDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span>Dihitung nanti</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>Rp{getTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
              <button onClick={() => setShowCheckout(true)} className="w-full py-3.5 bg-primary text-white font-semibold rounded-input hover:bg-primary-dark transition-all active:scale-[0.98] tap-target">
                Lanjut ke Pembayaran
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
