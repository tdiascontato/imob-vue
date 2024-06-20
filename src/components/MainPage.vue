<!-- src/components/MainPage.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/components/models/navbar/Header.vue';
import Menu from '@/components/actions/Menu.vue';
import Mall from '@/components/Mall.vue';

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
  localStorage.removeItem('searchResults');
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
      <!--      Componente show     -->
      <Mall v-if="!isModalVisible" :class="{ blur: isModalVisible }" />
    <div v-if="isLoggedIn && !isModalVisible" class="premium-section">
      <img src="/premium.gif" alt="Premium Membership" />
      <h2>50 coins de bônus na primeira assinatura!</h2>
      <img src="/ssl.png" alt="Página verificada" />

    </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
}
.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}
.premium-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 1rem;
  height: fit-content;
}
.premium-section h2 {
  color: #cacaca;
  width: 15rem;
  text-align: inherit;
}
.premium-section img {
  width: 100%;
  max-width: 5rem;
}
</style>
