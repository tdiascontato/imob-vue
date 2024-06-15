<!--src/components/MainPage.vue-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/components/models/navbar/Header.vue';
import Menu from '@/components/actions/Menu.vue';
import Dashboard from '@/components/models/menu/Dashboard.vue';

const isLoggedIn = ref(false);
const isModalVisible = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

const updateModalState = () => {
  isModalVisible.value = JSON.parse(localStorage.getItem('menuModal') || 'false');
};

onMounted(() => {
  checkLoginStatus();
  updateModalState();
  window.addEventListener('storage', checkLoginStatus);
  window.addEventListener('toggle-modal', updateModalState);
});
onUnmounted(() => {
  window.removeEventListener('storage', updateModalState);
  window.removeEventListener('toggle-modal', updateModalState);
});
</script>

<template>
  <main class="container">
    <Header />
    <div class="content-wrapper">
      <Menu v-if="isModalVisible" />
      <Dashboard v-if="!isModalVisible" class="content" :class="{ blur: isModalVisible }" />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  height: 100vh;
  background: #e5d7d7;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content.blur {
  filter: blur(5px);
  pointer-events: none;
}
</style>
