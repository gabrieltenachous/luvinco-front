import type { Product } from './Product'

export interface OrderProduct {
  id: string
  product_id: string
  order_id: string
  quantity: number
  unit_price: number
  product: Product
}
