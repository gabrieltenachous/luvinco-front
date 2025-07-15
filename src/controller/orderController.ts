import { ref } from 'vue'
import type { Order } from '@/services/orderService'
import { getOrder, postOrder } from '@/services/orderService'
import type { OrderItem } from '@/interfaces/OrderItem'

export function useOrderController() {
  const order = ref<Order | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadCart() {
    isLoading.value = true
    try {
      order.value = await getOrder()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao carregar carrinho.'
    } finally {
      isLoading.value = false
    }
  }

  async function sendToCart(items: OrderItem[], clear = false) {
    try {
      order.value = await postOrder(items, clear)
    } catch (err: any) {
      console.error('Erro ao enviar pedido:', err)
      throw err
    }
  }

  return {
    order,
    isLoading,
    error,
    loadCart,
    sendToCart,
  }
}
