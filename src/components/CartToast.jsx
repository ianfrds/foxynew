import { useEffect, useState, useRef } from 'react'
import { HiCheck } from 'react-icons/hi'
import useCartStore from '../store/cartStore'

export default function CartToast() {
  const lastAdded = useCartStore((s) => s.lastAdded)
  const clearLastAdded = useCartStore((s) => s.clearLastAdded)
  const [visible, setVisible] = useState(false)
  const [productName, setProductName] = useState('')
  const timer = useRef(null)

  useEffect(() => {
    if (lastAdded) {
      setProductName(lastAdded)
      setVisible(true)
      clearLastAdded()
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setVisible(false), 1200)
    }
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [lastAdded, clearLastAdded])

  if (!visible && !productName) return null

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 bg-gray-900 text-white pl-3.5 pr-4 py-2.5 rounded-xl shadow-lg ${
        visible ? 'animate-toast-in' : 'animate-toast-out'
      }`}
      onAnimationEnd={() => {
        if (!visible) setProductName('')
      }}
    >
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 shrink-0">
        <HiCheck className="w-4 h-4 text-white" />
      </span>
      <span className="text-sm font-medium whitespace-nowrap">
        Ditambahkan ke keranjang
      </span>
    </div>
  )
}
