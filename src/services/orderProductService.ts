import api from './api'

export interface OrderProductResponse {
  mensagem: string
  entrega: string
  pedido: any[]
}

export async function finalizeOrder(orderId: string): Promise<OrderProductResponse> {
  const response = await api.post('/order-products', {
    order_id: orderId
  })

  return response.data.data
}
