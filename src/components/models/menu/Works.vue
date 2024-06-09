<!-- src/components/models/menu/Works.vue -->
<template>

  <div>
    <div v-if="works.length === 0">Você não tem nenhum trabalho registrado.</div>

    <div v-else class="works-container">
      <div v-for="work in works" :key="work._id" class="work-card">
        <h3>{{ work.title }}</h3>
        <img :src="work.image" alt="Imagem do Trabalho" />
        <p>{{ work.description }}</p>
        <p>Preço: {{ work.price }}</p>
      </div>
    </div>

    <div class="buttons">
      <router-link to="/">
        <button class="btn">Home</button>
      </router-link>
    </div>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/http';

const works = ref([]);
const fetchWorks = async () => {
  try {
    const response = await api.get('/user/works');
    console.log(response.data.works)
    works.value = response.data.works;
  } catch (error) {
    console.error('Erro ao buscar os trabalhos:', error);
  }
};

onMounted(() => {
  fetchWorks();
});
</script>

<style scoped>
.works-container {
  display: flex;
  flex-wrap: wrap;
}

.work-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  width: 200px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
}

.work-card img {
  max-width: 100%;
  height: auto;
}
</style>
