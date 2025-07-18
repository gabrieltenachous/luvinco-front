import { ref } from "vue";
import { finalizeOrder } from "@/services/orderProductService";
import { extractErrorMessage } from "@/utils/external";

export function useOrderProductController() {
  const isFinalizing = ref(false);
  const response = ref<string | null>(null);
  const error = ref<string | null>(null);

  async function finishOrder(orderId: string) {
    isFinalizing.value = true;
    try {
      const result = await finalizeOrder(orderId);
      response.value = result.mensagem;
      return result;
    } catch (err: unknown) {
      error.value = extractErrorMessage(err, "Erro ao finalizar pedido:");
      throw err;
    } finally {
      isFinalizing.value = false;
    }
  }

  return {
    finishOrder,
    isFinalizing,
    error,
    response,
  };
}
