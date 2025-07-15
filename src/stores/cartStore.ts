import { defineStore } from "pinia";
import type { Product } from "@/interfaces/Product";
import type { OrderProduct } from "@/interfaces/OrderProduct";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalQuantity: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
  },

  actions: {
    addToCart(product: Product) {
      const existing = this.items.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    setFromApi(orderProducts: OrderProduct[]) {
      this.items = orderProducts.map(op => ({
        product: op.product,
        quantity: op.quantity
      }))
    },
    removeFromCart(productId: string) {
      const index = this.items.findIndex((i) => i.product.id === productId);
      if (index !== -1) {
        const item = this.items[index];
        if (item.quantity > 1) { 
          this.items[index] = { ...item, quantity: item.quantity - 1 };
        } else { 
          this.items.splice(index, 1);
        }
      }
    },

    clearCart() {
      this.items = [];
    },
  },
});
