<!-- src/components/models/navbar/Header.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

const MenuModal = () => {
  const newModalState = !JSON.parse(localStorage.getItem('menuModal') || 'false');
  localStorage.setItem('menuModal', JSON.stringify(newModalState));
  window.dispatchEvent(new CustomEvent('toggle-modal'));
};

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('menuModal');
  checkLoginStatus();
  window.location.reload();
};

onMounted(() => {
  checkLoginStatus();
  window.addEventListener('storage', checkLoginStatus);
});
</script>

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

      <button class="btn" v-if="isLoggedIn" @click="MenuModal"> Menu </button>

      <button class="btn logout" v-if="isLoggedIn" @click="handleLogout"> Logout </button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  height: 10vh;
  min-height: 60px; /* Define a altura mínima */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  border-bottom: #f57732 0.1rem solid;
  border-radius: 2rem;
  padding: 0 2rem;
}

.title {
  font-size: x-large;
  font-weight: bold;
  color: white;
}

.title-link {
  text-decoration: none;
  color: inherit;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  background-color: #f57732;
  color: white;
  cursor: pointer;
  font-size: medium;
  transition: 0.5s ease;
}

.btn.logout {
  background-color: #fff;
  color: #250000;
  transition: 0.5s ease;
}

.btn.logout:hover {
  background: #780101;
  color: white;
}

.btn:hover {
  background-color: #843002;
}
</style>
