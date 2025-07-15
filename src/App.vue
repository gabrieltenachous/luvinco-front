<!-- App.vue -->
<script setup lang="ts">
// Nenhuma lógica necessária para o teste
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
    <h1 class="text-4xl font-extrabold drop-shadow-lg">
      Tailwind está funcionando! 🎉
    </h1>

    <button
      class="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition
             ring-1 ring-white/50 shadow-lg"
    >
      Botão de teste
    </button>

    <div class="grid grid-cols-2 gap-4">
      <div class="h-16 w-16 bg-emerald-400 rounded-lg animate-bounce"></div>
      <div class="h-16 w-16 bg-yellow-400 rounded-lg animate-spin-slow"></div>
    </div>
  </div>
</template>

<style scoped>
/* Animação customizada só para destacar ainda mais */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 4s linear infinite; }
</style>
