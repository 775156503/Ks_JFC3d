<template>
  <Home />
  <Menu />
</template>

<script setup>
import Home from './home.vue'
import Menu from './menu.vue'
import { ref, onMounted } from 'vue'

onMounted(() => {
  const display = document.getElementById('cesiumContainer').style.display
  if (display == 'none') {
    document.getElementById('cesiumContainer').style.display = 'block'
  }
  console.log(
    '重置样式',
    document.getElementById('cesiumContainer').style.display
  )
})
</script>
<style></style>
