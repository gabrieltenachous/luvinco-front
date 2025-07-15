import type { ProductFilter } from '@/interfaces/ProductFilter'
import api from './api'
import type { Product } from '@/interfaces/Product'
 
export async function fetchProducts(filters: ProductFilter = {}): Promise<Product[]> {
  const response = await api.get('/products', { params: filters })
  return response.data.data as Product[]
}
