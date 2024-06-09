<!-- src/components/actions/Menu.vue -->
<template>
  <div class="dashboard_container">
    <h1>Menu</h1>
    <ul class="menu_list">
      <li class="menu_item" v-for="item in menuItems" :key="item.name" @click="selectMenuItem(item.name)">
        {{ item.name }}
      </li>
    </ul>
    <component :is="selectedComponent" v-if="selectedComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Dashboard from '@/components/models/menu/Dashboard.vue'
import Perfil from '@/components/models/menu/Perfil.vue'
import Works from '@/components/models/menu/Works.vue'
import Premium from '@/components/models/menu/Premium.vue'

const menuItems = ref([
  { name: 'Dashboard', route: '/menu/dashboard' },
  { name: 'Perfil', route: '/menu/perfil' },
  { name: 'Trabalhos', route: '/menu/works' },
  { name: 'Premium', route: '/menu/premium' },
]);

const selectedComponent = ref<any>(null);

const componentsMap: Record<string, any> = {
  Dashboard,
  Perfil,
  Trabalhos: Works,
  Premium,
};

const selectMenuItem = (name: string) => {
  selectedComponent.value = componentsMap[name];
};

</script>

<style scoped>
.dashboard_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 50vw;
  margin: auto;
  border-radius: 20px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.menu_list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu_item {
  padding: 10px 20px;
  margin: 5px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  text-align: center;
}

.menu_item:last-child {
  border-bottom: none;
}

.menu_item:hover {
  background-color: #e0e0e0;
}
</style>