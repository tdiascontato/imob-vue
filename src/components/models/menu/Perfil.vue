<!-- src/components/models/menu/Perfil.vue -->
<template>
  <div class="profile-container">

    <h2>Perfil do Usuário</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="profileImage">Imagem de Perfil:</label>
        <img :src="user.image" alt="Imagem de Perfil" v-if="user.image" class="profile-image-preview"/>
        <input type="file" id="profileImage" @change="handleImageUpload" />
      </div>
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <div class="form-group">
        <label for="password">Nova Senha:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirme a Nova Senha:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" />
      </div>
      <button type="submit">Salvar</button>
    </form>
    <button @click="deleteAccount" class="delete-btn">Excluir Conta</button>
  </div>
</template>

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
    router.push('/');
  } catch (error) {
    console.error('Erro ao excluir conta:', error);
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
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
  padding: 10px 20px;
  background-color: #4264b9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #283b6a;
}

.delete-btn {
  background-color: #ff4b4b;
}

.delete-btn:hover {
  background-color: #d43c3c;
}

.profile-image-preview {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
}
</style>