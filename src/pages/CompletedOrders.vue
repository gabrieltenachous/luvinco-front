<template>
    <div class="p-4">
        <RouterLink to="/" class="inline-block mb-4 text-sm text-blue-600 hover:underline">
            ⬅ Voltar
        </RouterLink>
        <h1 class="text-xl font-bold mb-4">Pedidos Finalizados</h1>

        <div v-if="isLoading">Carregando pedidos...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else-if="completed.length === 0" class="text-gray-500">Nenhum pedido encontrado.</div>

        <div v-else>
            <div v-for="order in completed" :key="order.id" class="mb-6 border rounded shadow-sm overflow-hidden">
                <div class="bg-gray-100 px-4 py-2 text-sm font-semibold">
                    Pedido #{{ order.id }} - {{ order.order_products.length }} item(s)
                </div>

                <table class="w-full text-sm">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="text-left px-4 py-2">Produto</th>
                            <th class="text-center px-4 py-2">Qtd</th>
                            <th class="text-right px-4 py-2">Preço</th>
                            <th class="text-right px-4 py-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.order_products" :key="item.id" class="border-t">
                            <td class="px-4 py-2">{{ item.product.name }}</td>
                            <td class="px-4 py-2 text-center">{{ item.quantity }}</td>
                            <td class="px-4 py-2 text-right">R$ {{ item.unit_price }}</td>
                            <td class="px-4 py-2 text-right">R$ {{ (item.quantity * item.unit_price).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="meta && links" class="flex justify-center mt-6 gap-2">
                <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" :disabled="page === 1"
                    @click="loadCompletedOrders(page - 1)">
                    ← Anterior
                </button>

                <span class="text-sm font-medium self-center">
                    Página {{ meta.current_page }} de {{ meta.last_page }}
                </span>

                <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" :disabled="!links.next"
                    @click="loadCompletedOrders(page + 1)">
                    Próxima →
                </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCompletedOrdersController } from '@/controller/completedOrdersController'

const { completed, isLoading, error, loadCompletedOrders,page,meta,links } = useCompletedOrdersController()

onMounted(() => {
    loadCompletedOrders()
})
</script>
