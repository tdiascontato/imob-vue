<!-- src/components/MainPage.vue -->
<template>
  <div class="container">
    <Header />
    <div class="content" :class="{ blur: isModalVisible }">
      <h2>Bem-vindo à página principal</h2>
      <!-- Conteúdo principal aqui -->
    </div>
    <div v-if="isModalVisible" class="modal">
      <component :is="activeComponent" />
      <button @click="hideModal">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/components/models/updown/Header.vue';
import Menu from '@/components/actions/Menu.vue';

const isLoggedIn = ref(false);
const isModalVisible = ref(false);
const activeComponent = ref<any>(null);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

const showModal = (componentName: string) => {
  if (isLoggedIn.value) {
    activeComponent.value = componentName === 'menu' ? Menu : null;
    isModalVisible.value = true;
  }
};

const hideModal = () => {
  isModalVisible.value = false;
  activeComponent.value = null;
};

const handleToggleModalEvent = (event: Event) => {
  const { componentName } = (event as CustomEvent).detail;
  showModal(componentName);
};

onMounted(() => {
  checkLoginStatus();
  window.addEventListener('storage', checkLoginStatus);
  window.addEventListener('toggle-modal', handleToggleModalEvent);
});

onUnmounted(() => {
  window.removeEventListener('storage', checkLoginStatus);
  window.removeEventListener('toggle-modal', handleToggleModalEvent);
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  text-align: center;
  position: relative;
}

.content.blur {
  filter: blur(5px);
  pointer-events: none;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.modal button {
  background-color: #ff4b4b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #d43c3c;
}
</style>