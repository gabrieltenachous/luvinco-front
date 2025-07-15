import { defineStore } from 'pinia'
import type { Product } from '@/interfaces/Product'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalQuantity: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
  },

  actions: {
    addToCart(product: Product) {
      const existing = this.items.find((item) => item.product.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },

    clearCart() {
      this.items = []
    }
  }
})
