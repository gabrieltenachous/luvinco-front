<template>
  <div v-if="props.visible" class="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
    <div class="bg-white max-w-md w-full rounded-lg shadow-lg p-6 relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl" @click="close">
        &times;
      </button>

      <h2 class="text-xl font-bold mb-4">Seu Carrinho</h2>

      <div v-if="cart.items.length === 0" class="text-center text-gray-400">
        Nenhum item adicionado.
      </div>

      <div v-else class="space-y-4 max-h-80 overflow-y-auto">
        <div v-for="item in cart.items" :key="item.product.id" class="flex items-center gap-4">
          <img :src="item.product.image_url" alt="" class="w-16 h-16 object-contain border rounded" />
          <div class="flex-1">
            <h3 class="font-semibold text-sm">{{ item.product.name }}</h3>
            <p class="text-xs text-gray-500">
              {{ item.quantity }} × R$ {{ item.product.price.toFixed(2) }}
            </p>
          </div>
          <div class="font-bold text-sm">
            R$ {{ (item.quantity * item.product.price).toFixed(2) }}
          </div>
        </div>
      </div>

      <div class="mt-4 flex justify-between gap-2">
        <button class="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 flex-1" @click="onCheckout"
          :disabled="isFinalizing">
          {{ isFinalizing ? 'Finalizando...' : 'Finalizar pedido' }}
        </button>
        <button class="bg-gray-300 text-black text-sm px-4 py-2 rounded hover:bg-gray-400 flex-1" @click="close">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import Swal from 'sweetalert2'
import { useCartStore } from '@/stores/cartStore'
import { useOrderController } from '@/controller/orderController'
import { useOrderProductController } from '@/controller/orderProductController'
import { formatDateBrazil, showError, showSuccess } from '@/services/external'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['close'])

const cart = useCartStore()
const { order, loadCart } = useOrderController()
const { finishOrder, isFinalizing } = useOrderProductController()

// Carregar carrinho sempre que modal for aberto
onMounted(() => {
  if (props.visible) loadCart()
})

watch(() => props.visible, (open) => {
  if (open) loadCart()
})

function close() {
  emit('close')
}
async function onCheckout() {
  if (!order.value?.id) return

  try {
    const result = await finishOrder(order.value.id)
    showSuccess('Pedido Finalizado!', `Entrega prevista: ${formatDateBrazil(result.entrega)}`)
    await loadCart()
    cart.clearCart()
    order.value = null;
    emit('close')
  } catch (err: any) {
    showApiError(err);
  }
}
function showApiError(err: any) {
  const message = (err as any)?.response?.data?.message || 'Erro inesperado.'
  showError(message)
}


</script>
