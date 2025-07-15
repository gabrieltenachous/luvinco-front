<template>
  <header class="bg-white shadow px-4 py-3 sticky top-0 z-50">
    <div class="container mx-auto flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <!-- Logo -->
      <h1 class="text-xl font-bold flex-1">LuvinCo Store</h1>

      <!-- Filtros -->
      <input
        type="text"
        v-model="search"
        placeholder="Buscar por nome"
        class="border rounded px-3 py-2 w-full md:w-60"
        @input="onFilterChange"
      />

      <select v-model="brand" class="border rounded px-3 py-2 w-full md:w-48" @change="onFilterChange">
        <option value="">Todas as marcas</option>
        <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
      </select>

      <select v-model="category" class="border rounded px-3 py-2 w-full md:w-48" @change="onFilterChange">
        <option value="">Todas as categorias</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(['filter'])

const search = ref('')
const brand = ref('')
const category = ref('')

const brands = ref<string[]>([])
const categories = ref<string[]>([])

function onFilterChange() {
  emit('filter', {
    name: search.value,
    brand: brand.value,
    category: category.value,
  })
}
 
onMounted(() => {
  brands.value = ['Zara', 'Nike', 'Adidas']
  categories.value = ['Roupas Masculinas', 'Calçados', 'Acessórios']
})
</script>
