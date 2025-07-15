import { ref } from 'vue'
import type { Product } from '@/interfaces/Product'
import { fetchProducts } from '@/services/productService'
import type { ProductFilter } from '@/interfaces/ProductFilter'

export function useProductController() {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadProducts(filters: ProductFilter = {}) {
    isLoading.value = true
    error.value = null

    try {
      products.value = await fetchProducts(filters)
    } catch (err: any) {
      console.error('Erro ao buscar produtos:', err)
      error.value = 'Erro ao carregar produtos.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    loadProducts,
  }
}
