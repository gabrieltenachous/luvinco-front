<template>
  <CartModal :visible="isModalOpen" @close="isModalOpen = false" />

  <footer class="bg-white border-t py-3 px-4 sticky bottom-0 z-50 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <span class="text-sm text-gray-700">
        {{ cart.totalQuantity }} item{{ cart.totalQuantity === 1 ? '' : 's' }} no carrinho
      </span>

      <div class="flex gap-2">
        <button class="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700" @click="isModalOpen = true">
          Ver carrinho
        </button>

        <RouterLink to="/completed" class="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-900">
          Pedidos Finalizados
        </RouterLink>
      </div>
    </div>
  </footer>

</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import CartModal from '@/components/CartModal.vue'
import { ref } from 'vue'

const isModalOpen = ref(false)
const cart = useCartStore() 
</script>
