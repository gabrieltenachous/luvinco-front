<script setup lang="ts">
import Header from '@/sections/Header.vue'
import { useProductController } from '@/controller/productController'
import type { ProductFilter } from '@/interfaces/ProductFilter'

const { products, isLoading, error, loadProducts } = useProductController()

loadProducts() // carregar sem filtro ao montar

function onFilter(filters: ProductFilter) {
  loadProducts(filters)
}
</script>

<template>
  <Header @filter="onFilter" />

  <div class="p-4">
    <div v-if="isLoading">Carregando produtos...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in products" :key="product.id">
        {{ product.name }}
      </div>
    </div>
  </div>
</template>
