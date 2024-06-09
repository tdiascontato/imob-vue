<!--src/components/RegisterPage.vue-->
<template>
  <Header/>
  <div class="container">
    <h1>Register Page</h1>

    <form @submit.prevent="handleSubmit" class="form">

      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>

      <div class="form-group">
        <label for="profileImage">Imagem de Perfil:</label>
        <input type="file" id="profileImage" @change="handleImageUpload" />
      </div>

      <button type="submit" class="btn">Register</button>
    </form>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/http';
import { useAuth } from '@/services/auth';
import Header from '@/components/models/updown/Header.vue';
import Compressor from 'compressorjs';

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
      quality: 0.1,
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
