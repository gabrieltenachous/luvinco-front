import api from './api'
import type { Product } from '@/interfaces/Product'

export interface ProductFilter {
  name?: string
  brand?: string
  category?: string
}

export async function fetchProducts(filters: ProductFilter = {}): Promise<Product[]> {
  const response = await api.get('/products', { params: filters })
  return response.data.data as Product[]
}
