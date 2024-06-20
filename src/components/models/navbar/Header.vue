<!-- src/components/models/navbar/Header.vue -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import api from '@/services/http'

const isLoggedIn = ref(false);
const searchQuery = ref('');
const router = useRouter();

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

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    try {
      const response = await api.post(`/search`, { title: searchQuery.value });
      localStorage.setItem('searchResults', JSON.stringify(response.data.works));
      await router.push('/search');
    } catch (error) {
      console.error('Erro ao realizar a pesquisa:', error);
    }
  }
};

onMounted(() => {
  checkLoginStatus();
  window.addEventListener('storage', checkLoginStatus);
});

</script>

<template>
  <header class="header">
    <router-link class="title" to="/" >
      Rio Hair
    </router-link>

    <input
      v-model="searchQuery"
      class="search"
      placeholder="O que procura?"
      type="search"
      @keyup.enter="handleSearch"
    />

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #cacaca;
  border-bottom: #f57732 0.1rem solid;
  /*border-radius: 2rem;*/
  padding: 0 2rem;
  /*margin: 0.3rem;*/
}
.title {
  font-size: x-large;
  font-weight: bold;
  color: black;
  text-decoration: none;
}
.search{
  padding: 0.5rem;
  background: rgb(164, 157, 157);
  color: white;

  border: none;
  border-radius: 0.5rem;

  width: 50%;
  height: 2.5rem;
  font-size: large;
  text-align: center;
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
  transition: 0.2s ease;
}
.btn.logout {
  background-color: #fff;
  color: black;
  transition: 0.5s ease;
}
.btn.logout:hover {
  background: #9c0303;
  color: white;
}
.btn:hover {
  scale: 1.03;
}
</style>
