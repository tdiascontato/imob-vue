<!--src/components/LoginPage.vue-->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/http';
import { useAuth } from '@/services/auth';
import Header from '@/components/models/navbar/Header.vue'

const email = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth();

const handleSubmit = async () => {
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      login(response.data.token);
      window.location.href = '/';
    } else {
      alert('Login failed: ' + response.statusText);
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed: ' + error);
  }
};
</script>

<template>
  <Header/>
  <div class="container">

    <h1>Login Page</h1>

    <form @submit.prevent="handleSubmit" class="form">

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" class="btn">Login</button>

    </form>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0.5rem;
  gap: 0.5rem;
}
input {
  border: 0.1rem solid #ccc;
  height: 1.5rem;
  border-radius: 0.3rem;
}
.btn {
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #fa7025;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s ease;
}
.btn:hover {
  background-color: #ff5b00;
  color: black;
  transition: 0.5s ease;
}

</style>
