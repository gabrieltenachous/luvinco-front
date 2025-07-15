import api from './api'
import type { Product } from '@/interfaces/Product'

export async function fetchProducts(params = {}): Promise<Product[]> {
  const response = await api.get('/products', { params })
  return response.data.data
}
