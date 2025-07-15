<template>
  <div class="bg-white rounded-xl shadow p-4 flex flex-col justify-between h-full">
    <img
      :src="product.image_url"
      :alt="product.name"
      class="w-full h-40 object-contain mb-3"
      @error="onImageError"
    />

    <div class="flex-1">
      <h2 class="text-lg font-semibold truncate">{{ product.name }}</h2>
      <p class="text-sm text-gray-500">{{ product.brand }} • {{ product.category }}</p>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <span class="text-green-600 font-bold text-lg">R$ {{ product.price.toFixed(2) }}</span>
      <button
        class="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
        @click="$emit('add', product)"
      >
        Adicionar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/interfaces/Product'

defineProps<{
  product: Product
}>()

function onImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = 'https://placehold.co/600x400?text=Imagem+Indisponível'
}
</script>
