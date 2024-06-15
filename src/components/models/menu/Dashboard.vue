<template>
  <h1 class="title-dashboard">Dashboard - {{ userName }}</h1>

  <main class="container-dashboard">
    <img class="user-image" :src="userImage" alt="Imagem do Usuário" />

    <div class="dashboard">
      <div class="dashboard-itens" v-if="works.length" v-for="work in works" :key="work._id">
        <img :src="work.image" alt="Imagem do Trabalho" />
        <div class="itens-description">
          <p>{{ work.description }}</p>
          <p>R${{ work.price }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.title-dashboard{
  display: flex;
  justify-content: center;
  color: #fff;
}
.container-dashboard{
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 15%;

}
.user-image{
  height: 12rem;
  width: 11rem;
  border: 0.1rem solid #780101;
  padding: 0.1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: 0.5s ease;
}
.user-image:hover {
  border: 0.1rem solid #fff;
  transition: 0.5s ease;
}
.dashboard{
  display: flex;
  flex-direction: column;
}
.dashboard-itens{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.dashboard-itens img{
  height: 9rem;
  width: 9rem;
  border: 0.1rem solid #fff;
  border-radius: 0.5rem;
  padding: 0.1rem;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.5s ease;
}
.dashboard-itens img:hover{
  border: 0.1rem solid #780101;
  opacity: 1;
  transition: 0.5s ease;
}
.itens-description{
  text-align: center;
  color: #780101;
  padding: 0.3rem;
  cursor: default;
}


</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/services/http'
import type { Work } from '@/interfaces/interface'

const userName = ref<string>('');
const userImage = ref<string>('');
const works = ref<Work[]>([]);


const userProfile = async () => {
  try {
    const response_user = await api.get('/user/perfil');
    const response_works = await api.get('/user/works');
    userName.value = response_user.data.user.name;
    userImage.value = response_user.data.user.image;
    works.value = response_works.data.works;
  } catch (error) {
    console.error('Failed to fetch user profile and works:', error);
  }
};

onMounted(() => userProfile());
</script>