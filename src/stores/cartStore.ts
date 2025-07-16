import { defineStore } from "pinia";
import type { Product } from "@/interfaces/Product";
import type { OrderProduct } from "@/interfaces/OrderProduct";
import { useOrderController } from "@/controller/orderController";
const { sendToCart } = useOrderController();

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
      this.items = orderProducts.map((op) => ({
        product: op.product,
        quantity: op.quantity,
      }));
    },
    async removeFromCart(productId: string) {
      const item = this.items.find((i) => i.product.id === productId);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.items = this.items.filter((i) => i.product.id !== productId);
      }

      // Sync com back-end
      await sendToCart([
        {
          product_id: item.product.product_id,
          quantity: -1, // nova lógica de subtração
        },
      ]);
    },

    clearCart() {
      this.items = [];
    },
  },
});
