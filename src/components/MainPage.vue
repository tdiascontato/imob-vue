<!--src/components/MainPage.vue-->
<template>
  <div class="container">
    <h1>Hair</h1>
    <div class="buttons" v-if="!isLoggedIn">
      <router-link to="/login">
        <button class="btn">Login</button>
      </router-link>
      <router-link to="/register">
        <button class="btn">Register</button>
      </router-link>
    </div>
    <router-link to="/work/register" v-if="isLoggedIn">
      <button class="btn">Work Register</button>
    </router-link>
    <br/>
    <router-link to="/menu" v-if="isLoggedIn">
      <button class="btn">Menu</button>
    </router-link>
    <LogoutButton v-if="isLoggedIn"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LogoutButton from '@/components/actions/LogoutButton.vue';

const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

onMounted(() => {
  checkLoginStatus();
  window.addEventListener('storage', checkLoginStatus);
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.buttons {
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  margin: 0 10px;
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
