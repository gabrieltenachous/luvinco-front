<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <Header @filter="onFilter"></Header>
    <main class="flex-1 container mx-auto p-4">
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/sections/Header.vue'
import Footer from '@/sections/Footer.vue'
import { useProductController } from '@/controller/productController'

const { loadProducts } = useProductController()

function onFilter(filters: any) {
  loadProducts(filters)
}
</script>
