import { ref } from 'vue'
import { getCompletedOrders } from '@/services/orderProductService'
import type { OrderHistory } from '@/services/orderProductService'

export function useCompletedOrdersController() {
  const completed = ref<OrderHistory[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadCompletedOrders() {
    isLoading.value = true
    error.value = null
    try {
      completed.value = await getCompletedOrders()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao buscar pedidos finalizados.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    completed,
    isLoading,
    error,
    loadCompletedOrders
  }
}
