<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Histórico de Pedidos</h1>

    <div v-if="isLoading">Carregando histórico...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="history.length === 0" class="text-gray-400">Nenhum pedido finalizado.</div>

    <div v-else>
      <div
        v-for="order in history"
        :key="order.id"
        class="mb-6 border rounded shadow-sm overflow-hidden"
      >
        <div class="bg-gray-100 px-4 py-2 font-semibold text-sm">
          Pedido #{{ order.id }} • {{ order.order_products.length }} item(s)
        </div>

        <table class="w-full text-sm">
          <thead class="bg-gray-200">
            <tr>
              <th class="text-left px-4 py-2">Produto</th>
              <th class="text-left px-4 py-2">Marca</th>
              <th class="text-center px-4 py-2">Qtd</th>
              <th class="text-right px-4 py-2">Preço</th>
              <th class="text-right px-4 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in order.order_products"
              :key="item.id"
              class="border-t"
            >
              <td class="px-4 py-2">{{ item.product.name }}</td>
              <td class="px-4 py-2 text-gray-500">{{ item.product.brand }}</td>
              <td class="px-4 py-2 text-center">{{ item.quantity }}</td>
              <td class="px-4 py-2 text-right">R$ {{ item.unit_price.toFixed(2) }}</td>
              <td class="px-4 py-2 text-right">
                R$ {{ (item.unit_price * item.quantity).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useOrderProductHistoryController } from '@/controller/orderProductHistoryController'

const { history, isLoading, error, loadHistory } = useOrderProductHistoryController()

onMounted(() => {
  loadHistory()
})
</script>
