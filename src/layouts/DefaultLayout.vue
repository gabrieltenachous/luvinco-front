<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <Header></Header>
    <main class="flex-1 container mx-auto p-4">
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/sections/Header.vue'
import Footer from '@/sections/Footer.vue' // você pode criar depois
</script>
