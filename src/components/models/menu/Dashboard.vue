<!--src/components/models/menu/Dashboard.vue-->
<template>

  <main class="container-dashboard">

    <div class="column-dashboard">
      <h2 class="title-dashboard">Olá, {{ userName }} :)</h2>
      <img class="user-image" :src="userImage" alt="{{userName}}" />
    </div>

    <div class="dashboard">
      <div class="dashboard-itens" v-if="works.length" v-for="work in works" :key="work._id">
        <img :src="work.image" alt="{{work.title}}" />
        <div class="itens-description">
          <p>{{ work.title }}</p>
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
}
.container-dashboard{
  display: flex;
  width: 80%;
  align-items: start;
  justify-content: center;
  gap: 10%;

}
.user-image{
  max-height: 20rem;
  max-width: 14rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.dashboard{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.dashboard-itens{
  display: flex;
  align-items: center;
  background-color: #ffede2;
  border-radius: 0.5rem;
  transition: 0.5s ease;
}
.dashboard-itens:hover{
  background: #fff;
  transition: 0.5s ease;
}
.dashboard-itens img{
  height: 9rem;
  width: 9rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.1rem;
  opacity: 0.9;
  transition: 0.5s ease;
  cursor: pointer;
}
.itens-description{
  text-align: center;
  overflow: hidden;
  font-size: small;
  text-transform: uppercase;
  color: #000;
  padding: 0.1rem;
  cursor: pointer;
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