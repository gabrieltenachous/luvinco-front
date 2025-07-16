import { ref } from "vue";
import type { Product } from "@/interfaces/Product";
import { fetchProducts } from "@/services/productService";
import type { PaginationMeta } from '@/interfaces/PaginationMeta'
import type { PaginationLinks } from '@/interfaces/PaginationLinks'

const meta = ref<PaginationMeta | null>(null)
const links = ref<PaginationLinks | null>(null)
const page = ref(1); 
export function useProductController() {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function loadProducts(filters = {}, customPage = 1) {
    isLoading.value = true;
    try {
      page.value = customPage;
      const result = await fetchProducts(filters, customPage);
      products.value = result.data;
      meta.value = result.meta;
      links.value = result.links;
    } catch (err) {
      error.value = "Erro ao carregar produtos.";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    products,
    page,
    meta,
    links,
    loadProducts,
    isLoading,
    error,
  };
}
