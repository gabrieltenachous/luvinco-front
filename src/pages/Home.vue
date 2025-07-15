<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import Header from '@/sections/Header.vue'
import { useProductController } from '@/controller/productController'
import type { ProductFilter } from '@/interfaces/ProductFilter'
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/interfaces/Product'

const { products, isLoading, error, loadProducts } = useProductController()
const cart = useCartStore();

loadProducts() 

function onFilter(filters: ProductFilter) {
  loadProducts(filters)
}


function onAddToCart(product: Product) {
  cart.addToCart(product)
}
</script>

<template>
  <Header @filter="onFilter" />

  <div class="p-4">
    <div v-if="isLoading">Carregando produtos...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
        <ProductCard
          v-for="product in products" 
          :key="product.id"
          :product="product"
          @add="onAddToCart"
        /> 
    </div>
  </div>
</template>
