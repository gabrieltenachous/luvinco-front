<template>
  <Header @filter="onFilter" />

  <div class="p-4">
    <div v-if="isLoading">Carregando produtos...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @add="onAddToCart" />
      


    </div>
    <div v-if="meta && links" class="flex justify-center mt-6 gap-2">
        <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" :disabled="page === 1"
          @click="loadProducts({}, page - 1)">
          ← Anterior
        </button>

        <span class="text-sm font-medium self-center">
          Página {{ meta.current_page }} de {{ meta.last_page }}
        </span>

        <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" :disabled="!links.next"
          @click="loadProducts({}, page + 1)">
          Próxima →
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import Header from '@/sections/Header.vue'
import { useProductController } from '@/controller/productController'
import type { ProductFilter } from '@/interfaces/ProductFilter'
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/interfaces/Product'
import { useOrderController } from '@/controller/orderController'
import type { OrderItem } from '@/interfaces/OrderItem'
import { onMounted } from 'vue'

const { products, isLoading, error, loadProducts, page, meta, links } = useProductController()
const cart = useCartStore();
const { sendToCart, loadCart } = useOrderController()

onMounted(() => {
  loadProducts()
  loadCart()
})

function onFilter(filters: ProductFilter) {
  loadProducts(filters)
}


async function onAddToCart(product: Product) {
  cart.addToCart(product)

  const items: OrderItem[] = [
    {
      product_id: product.product_id,
      quantity: 1,
    }
  ]

  try {
    await sendToCart(items, false)
    console.log('Produto enviado para o carrinho no backend')
  } catch (err) {
    console.error('Erro ao sincronizar carrinho com API', err)
  }
}
</script>