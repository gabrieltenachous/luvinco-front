<template>
  <div class="bg-white rounded-xl shadow p-4 flex flex-col justify-between h-full">
    <img :src="imageSrc" :alt="product.name" class="w-full h-40 object-contain mb-3" @error="onImageError" />


    <div class="flex-1">
      <h2 class="text-lg font-semibold truncate">{{ product.name }}</h2>
      <p class="text-sm text-gray-500">{{ product.brand }} • {{ product.category }}</p>
      <p class="text-xs text-gray-400 mt-1">
        Em estoque: {{ estoqueRestante }}
      </p>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <span class="text-green-600 font-bold text-lg">
        R$ {{ product.price.toFixed(2) }}
      </span>

      <div class="flex items-center gap-1">
        <button class="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
          :disabled="quantidadeNoCarrinho === 0" @click="cart.removeFromCart(product.id)">
          –
        </button>

        <span class="text-sm w-5 text-center">{{ quantidadeNoCarrinho }}</span>

        <button class="bg-blue-600 text-white px-2 py-1 rounded disabled:opacity-50" :disabled="estoqueRestante === 0"
          @click="$emit('add', product)">
          +
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/interfaces/Product'
import { useCartStore } from '@/stores/cartStore'
import { computed, ref } from 'vue'
 
const props = defineProps<{ product: Product }>()
const imageSrc = ref(props.product.image_url)
const cart = useCartStore()

const quantidadeNoCarrinho = computed(() => {
  return cart.items.find(item => item.product.id === props.product.id)?.quantity || 0
})

const estoqueRestante = computed(() => {
  return props.product.stock - quantidadeNoCarrinho.value
})

function onImageError() {
  imageSrc.value = 'https://placehold.co/600x400?text=Imagem+Indisponível'
}
</script>
