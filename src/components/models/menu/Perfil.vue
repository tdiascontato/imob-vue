<!-- src/components/models/menu/Perfil.vue -->
<template>
  <div class="profile-container">

    <form @submit.prevent="handleSubmit">
      <label for="profileImage">Imagem de Perfil:</label>
      <img :src="user.image" alt="Imagem de Perfil" v-if="user.image" class="profile-image-preview"/>
      <input type="file" id="profileImage" @change="handleImageUpload" />

      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="user.name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="user.email" required />

      <label for="password">Nova Senha:</label>
      <input type="password" id="password" v-model="password" />

      <label for="confirmPassword">Confirme a Nova Senha:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" />

      <button type="submit">Salvar</button>
    </form>

    <button @click="deleteAccount" class="delete-btn">Excluir Conta</button>
  </div>

</template>

<style scoped>
.profile-container {
  display: flex;
  padding: 1rem;
  gap: 2rem;
  margin-top: 1rem;
  border-radius: 1rem;
  background: #f57732;
}

.profile-image-preview {
  max-width: 12rem;
  max-height: 20rem;
  border-radius: 1.5rem;
  border: 0.2rem solid white;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #4264b9;
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: 0.5s ease;
}

button:hover {
  transition: 0.5s ease;
  background-color: #0338BCFF;
}

.delete-btn {
  height: 5.5rem;
  width: 6em;
  text-align: center;
  background-color: #d61c1c;
  border: 0.1rem solid #ffffff;
  border-radius: 1rem;
  transition: 0.5s ease;
}

.delete-btn:hover {
  transition: 0.5s ease;
  background-color: #f50000;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Compressor from 'compressorjs';
import api from '@/services/http';
import { useRouter } from 'vue-router';
import { useAuth } from '@/services/auth';

const user = ref({
  name: '',
  email: '',
  image: ''
});
const password = ref('');
const confirmPassword = ref('');
const image = ref<File | null>(null);
const router = useRouter();
const { logout } = useAuth();

onMounted(async () => {
  try {
    const response = await api.get('/user/perfil');
    user.value = response.data.user;
    console.log(user.value)
  } catch (error) {
    alert('Erro com Token!'+ error);
    console.error('Erro ao carregar perfil:', error);
  }
});

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    image.value = target.files[0];
  }
};

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    console.error('As senhas não combinam!');
    return;
  }

  const formData = new FormData();
  formData.append('name', user.value.name);
  formData.append('email', user.value.email);
  if (password.value) {
    formData.append('password', password.value);
  }

  if (image.value) {
    new Compressor(image.value, {
      quality: 0.1,
      success: async (compressedResult) => {
        formData.append('image', compressedResult);
        try {
          const response = await api.patch('/user/perfil', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          user.value = response.data;
          router.push('/');
          console.log(user.value)
        } catch (error) {
          router.push('/');
          console.error('Erro ao salvar perfil:', error);
        }
      },
      error(err) {
        console.error('Erro ao comprimir imagem:', err.message);
      },
    });
  } else {
    try {
      const response = await api.patch('/user/perfil', formData);
      user.value = response.data;
      router.push('/');
      console.log(user.value)
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  }
};

const deleteAccount = async () => {
  try {
    await api.delete('/user/delete');
    logout();
    localStorage.removeItem('menuModal');
    window.location.href = '/';
  } catch (error) {
    console.error('Erro ao excluir conta:', error);
  }
};
</script>