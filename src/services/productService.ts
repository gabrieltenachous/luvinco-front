import type { Product } from '@/interfaces/Product'
import type { ProductFilter } from '@/interfaces/ProductFilter'
import type { PaginationMeta } from '@/interfaces/PaginationMeta'
import type { PaginationLinks } from '@/interfaces/PaginationLinks'
import api from '@/config/api'

export async function fetchProducts(
  filters: ProductFilter = {},
  page = 1
): Promise<{
  data: Product[]
  meta: PaginationMeta
  links: PaginationLinks
}> {
  const response = await api.get('/products', {
    params: { ...filters, page }
  })

  return {
    data: response.data.data,
    meta: response.data.meta,
    links: response.data.links
  }
}
