<!--src/components/RegisterPage.vue-->
<template>

  <Header />

  <div class="content">

    <h1>Register Page</h1>

    <form @submit.prevent="handleSubmit" class="form">

      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />


      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />


      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required />

      <label for="profileImage">Imagem de Perfil:</label>
      <input type="file" id="profileImage" @change="handleImageUpload" />

      <button type="submit" class="btn">Register</button>
    </form>

  </div>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: start;
}
label {
  padding: 0.5rem;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}
.btn {
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 0.5rem;
  background-color: #fa7025;
  color: white;
  font-size: medium;
  cursor: pointer;
  transition: 0.5s ease;
}
.btn:hover {
  background-color: #ff5b00;
  color: black;
  transition: 0.5s ease;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/http';
import { useAuth } from '@/services/auth';
import Compressor from 'compressorjs';
import Header from '@/components/models/navbar/Header.vue'

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const profileImage = ref<File | null>(null);
const router = useRouter();
const { login } = useAuth();

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    profileImage.value = target.files[0];
  }
};

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    console.error('As senhas não combinam!');
    return;
  }

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('password', password.value);

  if (profileImage.value) {
    new Compressor(profileImage.value, {
      quality: 0.5,
      success: async (compressedResult) => {
        formData.append('image', compressedResult);

        try {
          const response = await api.post('/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const token = response.data.token;
          login(token);
          router.push('/');
        } catch (error) {
          console.error('Erro ao registrar:', error);
        }
      },
      error(err) {
        console.error('Erro ao comprimir imagem:', err.message);
      },
    });
  } else {
    try {
      const response = await api.post('/register', formData);
      const token = response.data.token;
      login(token);
      router.push('/');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  }
};
</script>