<!--src/App.vue-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>

</template>

<style scoped>
html, body, .app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background-color: #616a28;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
