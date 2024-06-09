<!--src/components/LoginPage.vue-->
<template>
  <Header/>
  <div class="container">
    <h1>Login Page</h1>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn">Login</button>
    </form>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/http';
import { useAuth } from '@/services/auth';
import Header from '@/components/models/updown/Header.vue'

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
    login(response.data.token);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
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

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

.btn {
  padding: 10px 20px;
  margin: 10px 0;
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
