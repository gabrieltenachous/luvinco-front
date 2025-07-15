<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800"> 
    <main class="flex-1 container mx-auto p-4">
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts"> 
import Footer from '@/sections/Footer.vue' 
</script>
