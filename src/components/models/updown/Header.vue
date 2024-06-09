<!-- src/components/models/updown/Header.vue -->
<template>
  <header class="header">
    <router-link to="/" class="title-link">
      <div class="title">Hair</div>
    </router-link>
    <nav class="nav">
      <router-link to="/login" v-if="!isLoggedIn">
        <button class="btn">Login</button>
      </router-link>
      <router-link to="/register" v-if="!isLoggedIn">
        <button class="btn">Register</button>
      </router-link>
      <button class="btn" v-if="isLoggedIn" @click="showMenuModal">Menu</button>
      <LogoutButton v-if="isLoggedIn" @logout="handleLogout"/>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LogoutButton from '@/components/actions/LogoutButton.vue';

const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

const showMenuModal = () => {
  if (isLoggedIn.value) {
    window.dispatchEvent(new CustomEvent('toggle-modal', { detail: { componentName: 'menu' } }));
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  checkLoginStatus();
  window.location.reload();
};

onMounted(() => {
  checkLoginStatus();
  window.addEventListener('storage', checkLoginStatus);
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 35%;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  gap: 35%;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

.title-link {
  text-decoration: none;
  color: inherit;
}

.nav {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #358a6d;
}
</style>