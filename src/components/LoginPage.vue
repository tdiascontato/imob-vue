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
    login(response.data.token);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
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
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1800' height='700' preserveAspectRatio='none' viewBox='0 0 1800 700'%3e%3cg clip-path='url(%26quot%3b%23SvgjsClipPath1344%26quot%3b)' fill='none'%3e%3ccircle r='17.965' cx='458.95' cy='618.58' fill='rgba(249%2c 200%2c 173%2c 1)'%3e%3c/circle%3e%3ccircle r='24.465' cx='400.09' cy='416.28' fill='rgba(245%2c 119%2c 50%2c 1)'%3e%3c/circle%3e%3ccircle r='49.63' cx='223.87' cy='577.72' fill='url(%26quot%3b%23SvgjsLinearGradient1345%26quot%3b)'%3e%3c/circle%3e%3ccircle r='36.565' cx='1782.72' cy='565.72' fill='rgba(245%2c 119%2c 50%2c 1)'%3e%3c/circle%3e%3ccircle r='28.47' cx='763.75' cy='574.09' fill='rgba(245%2c 119%2c 50%2c 1)'%3e%3c/circle%3e%3ccircle r='65.72' cx='743.02' cy='564.04' fill='url(%26quot%3b%23SvgjsLinearGradient1346%26quot%3b)'%3e%3c/circle%3e%3ccircle r='68.685' cx='530.85' cy='512.66' fill='rgba(245%2c 119%2c 50%2c 1)'%3e%3c/circle%3e%3ccircle r='68.725' cx='770.72' cy='474' fill='url(%26quot%3b%23SvgjsLinearGradient1347%26quot%3b)'%3e%3c/circle%3e%3ccircle r='55.1' cx='1394.61' cy='624.18' fill='rgba(249%2c 200%2c 173%2c 1)'%3e%3c/circle%3e%3ccircle r='23.44' cx='914.7' cy='545.7' fill='rgba(249%2c 200%2c 173%2c 1)'%3e%3c/circle%3e%3ccircle r='41.03' cx='169.95' cy='379.89' fill='url(%26quot%3b%23SvgjsLinearGradient1348%26quot%3b)'%3e%3c/circle%3e%3ccircle r='62.845' cx='1658.12' cy='384.87' fill='rgba(249%2c 200%2c 173%2c 1)'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cclipPath id='SvgjsClipPath1344'%3e%3crect width='1800' height='700' x='0' y='0'%3e%3c/rect%3e%3c/clipPath%3e%3clinearGradient x1='124.61' y1='577.72' x2='323.13' y2='577.72' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1345'%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 119%2c 50%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='611.5799999999999' y1='564.04' x2='874.4599999999999' y2='564.04' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1346'%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 119%2c 50%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='633.27' y1='474' x2='908.17' y2='474' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1347'%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 119%2c 50%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='87.88999999999999' y1='379.89' x2='252.01' y2='379.89' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1348'%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 119%2c 50%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
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
