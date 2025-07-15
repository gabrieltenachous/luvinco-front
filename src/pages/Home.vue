<script setup lang="ts">
import { useProductController } from '@/controller/productController'

const { products, isLoading, error } = useProductController()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Vitrine de Produtos</h1>

    <div v-if="isLoading">Carregando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in products" :key="product.id">
        {{ product.name }}
      </div>
    </div>
  </div>
</template>
