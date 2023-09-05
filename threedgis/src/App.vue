<template>
  <ConfigProvider :auto-insert-space-in-button="false">
    <RouterView>
      <template #default="{ Component }">
        <transition>
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </template>
    </RouterView>
  </ConfigProvider>
</template>

<script setup>
import { ref, onMounted } from 'vue'
</script>
<style></style>
