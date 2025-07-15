<template>
  <footer class="bg-gray-100 py-2 text-center text-sm">
    {{ cart.totalQuantity }} item(s) no carrinho
  </footer>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
const cart = useCartStore()
</script>
