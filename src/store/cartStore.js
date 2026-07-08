import { create } from 'zustand'
import { SHIPPING_COST } from '../constants'

const useCartStore = create((set, get) => ({
  items: [],
  promoCode: '',
  promoDiscount: 0,
  shippingCost: 0,

  addItem: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((item) => item.productId === product.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }
      return {
        items: [
          ...state.items,
          {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity,
            image: product.image,
          },
        ],
      }
    })
  },

  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }))
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity < 1) return
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }))
  },

  clearCart: () => set({ items: [], promoCode: '', promoDiscount: 0, shippingCost: 0 }),

  setPromoCode: (code) => {
    const discount = code.toUpperCase() === 'FOXY10' ? 0.1 : 0
    set({ promoCode: code, promoDiscount: discount })
  },

  setShippingCost: (cost) => set({ shippingCost: cost }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  getDiscount: () => {
    return get().getSubtotal() * get().promoDiscount
  },

  getTotal: () => {
    const subtotal = get().getSubtotal()
    const discount = get().getDiscount()
    const shipping = get().shippingCost > 0 ? get().shippingCost : SHIPPING_COST
    return subtotal - discount + shipping
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
}))

export default useCartStore
