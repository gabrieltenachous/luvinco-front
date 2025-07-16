import { ref } from "vue";
import { getCompletedOrders } from "@/services/orderProductService";
import type { OrderHistory } from "@/services/orderProductService";
import type { PaginationMeta } from "@/interfaces/PaginationMeta";
import type { PaginationLinks } from "@/interfaces/PaginationLinks";

export function useCompletedOrdersController() {
  const completed = ref<OrderHistory[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const page = ref(1);
  const meta = ref<PaginationMeta | null>(null);
  const links = ref<PaginationLinks | null>(null);

  async function loadCompletedOrders(customPage = 1) {
    isLoading.value = true;
    page.value = customPage;
    try {
      const result = await getCompletedOrders(customPage);
      completed.value = result.data;
      meta.value = result.meta;
      links.value = result.links;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Erro ao buscar pedidos finalizados.";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    completed,
    page,
    meta,
    links,
    loadCompletedOrders,
    isLoading,
    error,
  };
}
