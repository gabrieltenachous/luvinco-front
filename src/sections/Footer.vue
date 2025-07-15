<template>
  <footer class="bg-white border-t py-3 px-4 sticky bottom-0 z-50 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <span class="text-sm text-gray-700">
        {{ cart.totalQuantity }} item{{ cart.totalQuantity === 1 ? '' : 's' }} no carrinho
      </span>

      <button
        class="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        @click="openCartModal"
      >
        Ver carrinho
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
const cart = useCartStore()

function openCartModal() {
  // Em breve: exibir modal com carrinho
  alert('Abrir modal de carrinho (em breve)')
}
</script>
