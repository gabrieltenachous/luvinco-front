import { ref } from 'vue'
import { finalizeOrder } from '@/services/orderProductService'

export function useOrderProductController() {
  const isFinalizing = ref(false)
  const response = ref<string | null>(null)

  async function finishOrder(orderId: string) {
    isFinalizing.value = true
    try {
      const result = await finalizeOrder(orderId)
      response.value = result.mensagem
      return result
    } catch (err: any) {
      console.error('Erro ao finalizar pedido:', err)
      throw err
    } finally {
      isFinalizing.value = false
    }
  }

  return {
    finishOrder,
    isFinalizing,
    response
  }
}
