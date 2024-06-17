<!--src/components/Mall.vue-->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Work } from '@/interfaces/interface';
import api from '@/services/http'

const works = ref<Work[]>([]);
const fetchWorks = async () => {
  try {
    const response = await api.get('/mall');
    works.value = response.data.works;
  } catch (error) {
    console.error('Failed to fetch works:', error);
  }
};
onMounted(() => {
  fetchWorks();
});
</script>

<template>
  <div class="mall-container">

    <div class="work-card" v-for="work in works" :key="work._id">
      <img :src="work.image" :alt="work.title" class="work-image" />
      <div class="work-details">
        <h2>{{ work.title }}</h2>
        <p>{{ work.description }}</p>
        <p>R${{ work.price }}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.mall-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  overflow-y: scroll;
  scrollbar-width: none;
}
.work-card {
  background-color: #ffede2;
  border: 0.1rem solid #f57732;
  border-radius: 0.5rem;
  overflow-y: scroll;
  scrollbar-width: none;
  cursor: pointer;
  width: 10rem;
  max-height: 20rem;
  opacity: 0.95;
  transition: transform 0.5s ease;
}
.work-card:hover {
  opacity: 1;
  transform: scale(1.05);
}
.work-image {
  height: 15rem;
  width: 10rem;
}
.work-details {
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  justify-content: center;
  align-items: center;
  text-align: justify;
}

.work-details h2 {
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

.work-details p {
  margin: 0.25rem 0;
  color: #555;
}
</style>