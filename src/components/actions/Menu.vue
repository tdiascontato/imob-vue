<!-- src/components/actions/Menu.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Dashboard from '@/components/models/menu/Dashboard.vue';
import Perfil from '@/components/models/menu/Perfil.vue';
import Works from '@/components/models/menu/Works.vue';
import Premium from '@/components/models/menu/Premium.vue';
import api from '@/services/http';

const menuItems = ref([
  { name: 'Dashboard', route: '/menu/dashboard' },
  { name: 'Perfil', route: '/menu/perfil' },
  { name: 'Trabalhos', route: '/menu/works' },
  { name: 'Premium', route: '/menu/premium' },
]);

const selectedComponent = ref<any>(null);
const userName = ref<string>('');

const componentsMap: Record<string, any> = {
  Dashboard,
  Perfil,
  Trabalhos: Works,
  Premium,
};

const selectMenuItem = (name: string) => {
  selectedComponent.value = componentsMap[name];
};

const userProfile = async () => {
  try {
    const response = await api.get('/user/perfil');
    userName.value = response.data.user.name;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }
};

onMounted(() => userProfile());
</script>

<template>
  <div class="container_menu">
    <h1 class="title-menu">{{ userName }}</h1>
    <ul class="menu_list">
      <li class="menu_item" v-for="item in menuItems" :key="item.name" @click="selectMenuItem(item.name)">
        {{ item.name }}
      </li>
    </ul>
    <component :is="selectedComponent" v-if="selectedComponent" />
  </div>
</template>

<style scoped>
.container_menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0;
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
}

.title-menu {
  color: black;
}

.menu_list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2rem;
}

.menu_item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: center;
  border-radius: 0.4rem;
}

.menu_item:hover {
  background-color: #f57732;
}
</style>
