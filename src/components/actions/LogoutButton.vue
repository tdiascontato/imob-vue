<template>
  <div>
    <button @click="handleLogout" class="btn">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/services/auth';

const { logout } = useAuth();

const handleLogout = () => {
  logout();
  window.dispatchEvent(new Event('storage'));
};
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: darkred;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #250000;
}
</style>