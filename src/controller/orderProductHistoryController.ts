import { ref } from 'vue'
import { getOrderHistory } from '@/services/orderProductService'
import type { OrderHistory } from '@/services/orderProductService'

export function useOrderProductHistoryController() {
  const history = ref<OrderHistory[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadHistory() {
    isLoading.value = true
    error.value = null

    try {
      history.value = await getOrderHistory()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao carregar histórico.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    history,
    isLoading,
    error,
    loadHistory
  }
}
