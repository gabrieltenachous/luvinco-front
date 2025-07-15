import api from './api'
import type { OrderItem } from '@/interfaces/OrderItem'
import type { OrderProduct } from '@/interfaces/OrderProduct'

export interface Order {
  id: string
  status: string
  order_products: OrderProduct[]
  created_at?: string
}

export async function postOrder(items: OrderItem[], clear = false): Promise<Order> {
  const response = await api.post('/orders', {
    clear,
    items,
  })

  return response.data.data
}

export async function getOrder(): Promise<Order> {
  const response = await api.get('/orders')
  return response.data.data
}
