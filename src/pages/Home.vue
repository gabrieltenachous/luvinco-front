<template>

</template>

<script>
onMounted(async () => {
    try {
        const products = await fetchProducts()
        console.log(products)
    } catch (err) {
        console.error('Erro ao buscar produtos:', err)
    }
})
</script>