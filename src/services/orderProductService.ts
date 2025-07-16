import type { OrderProduct } from '@/interfaces/OrderProduct'
import api from '../config/api'
import type { PaginationMeta } from '@/interfaces/PaginationMeta'
import type { PaginationLinks } from '@/interfaces/PaginationLinks'

export interface OrderProductResponse {
  mensagem: string
  entrega: string
  pedido: any[]
}

export interface OrderHistory {
  id: string
  status: string
  order_products: OrderProduct[]
}

export async function finalizeOrder(orderId: string): Promise<OrderProductResponse> {
  const response = await api.post('/order-products', {
    order_id: orderId
  })

  return response.data.data
}

export async function getOrderHistory(): Promise<OrderHistory[]> {
  const response = await api.get('/order-products')
  return response.data.data as OrderHistory[]
}

export async function getCompletedOrders(page = 1): Promise<{
  data: OrderHistory[]
  meta: PaginationMeta
  links: PaginationLinks
}> {
  const response = await api.get('/orders/completed', { params: { page } })
  return {
    data: response.data.data,
    meta: response.data.meta,
    links: response.data.links
  }
}