import { ref } from "vue";
import type { Order } from "@/services/orderService";
import { getOrder, postOrder } from "@/services/orderService";
import type { OrderItem } from "@/interfaces/OrderItem";
import { useCartStore } from "@/stores/cartStore";
import { extractErrorMessage } from "@/utils/external";

export function useOrderController() {
  const order = ref<Order | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function loadCart() {
    isLoading.value = true;
    try {
      const result = await getOrder();
      order.value = result;

      const cart = useCartStore();
      cart.setFromApi(result.order_products);
    } catch (err: unknown) { 
      error.value = extractErrorMessage(err, "Erro ao carregar carrinho.");
    } finally {
      isLoading.value = false;
    }
  }

  async function sendToCart(items: OrderItem[], clear = false) {
    try {
      order.value = await postOrder(items, clear);
    } catch (err: unknown) {
      error.value = extractErrorMessage(err, "Erro ao enviar pedido:");
      throw err;
    }
  }

  return {
    order,
    isLoading,
    error,
    loadCart,
    sendToCart,
  };
}
