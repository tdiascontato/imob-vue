<!-- src/components/models/menu/Premium.vue -->
<template>
  <div class="premium-container">
    <!-- Primeira div com nome e imagem do usuário -->
    <div class="profile-info">
      <h2>{{ user.name }}</h2>
      <img :src="user.image" alt="Imagem de Perfil" class="profile-image-preview" />
    </div>

    <!-- Segunda div com o card de assinatura -->
    <div class="subscription-card">
      <div class="card-content">
        <img :src="user.image" alt="Imagem Hair Premium" class="premium-image" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam.
        </p>
        <div class="advantages">
          <h3>Vantagens:</h3>
          <ul>
            <li>Vantagem 1</li>
            <li>Vantagem 2</li>
            <li>Vantagem 3</li>
          </ul>
        </div>
        <button @click="redirectToSubscription">Assinar Agora</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.premium-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 2rem;
}
.profile-info {
  text-align: center;
}
.profile-info h2 {
  margin-bottom: 10px;
}
.profile-image-preview {
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  margin-top: 10px;
}
.subscription-card {
  background-color: #cacaca;
  padding: 20px;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.38);
  transition: transform 0.3s ease;
  width: 300px;
}
.subscription-card:hover {
  transform: translateY(-0.5rem);
}
.card-content {
  text-align: center;
}
.premium-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 1rem;
}
.card-content p {
  font-size: medium;
  line-height: 1.2;
}
.advantages {
  margin-top: 0.5rem;
}
.advantages h3 {
  font-size: large;
  margin-bottom: 0.5rem;
}
.advantages ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
}
.advantages ul li {
  margin-bottom: 5px;
}
button {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #0056b3;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/http';
import { useRouter } from 'vue-router';
import { useAuth } from '@/services/auth';

const user = ref({
  name: '',
  email: '',
  image: ''
});

onMounted(async () => {
  try {
    const response = await api.get('/user/perfil');
    user.value = response.data.user;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
  }
});

const redirectToSubscription = () => {
  console.log('Redirecionando para a página de assinatura premium...');
};
</script>