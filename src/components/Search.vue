<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Work } from '@/interfaces/interface';
import Header from '@/components/models/navbar/Header.vue';

const searchResults = ref<Work[]>([]);
const hasResults = ref(true);

onMounted(() => {
  const results = localStorage.getItem('searchResults');
  if (results) {
    searchResults.value = JSON.parse(results) as Work[];
    hasResults.value = searchResults.value.length > 0;
  } else {
    hasResults.value = false;
  }
});
</script>

<template>
  <Header />

  <div class="search-container" v-if="hasResults">
    <div class="work-card" v-for="(work, index) in searchResults" :key="index">
      <img :src="work.image" :alt="work.title" class="work-image" />
      <div class="work-details">
        <h2>{{ work.title }}</h2>
        <p>R${{ work.price }}</p>
      </div>
    </div>
  </div>
  <p v-else class="no-results">Ops, nenhum resultado encontrado.</p>
</template>

<style scoped>
.search-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 85%;
  gap: 2rem;
  padding: 1rem;
  margin: 0 auto;
}
.work-card {
  max-height: 20rem;
  width: 14rem;
  position: relative;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem 0.1rem #f57732;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.5s ease;
}
.work-card:hover .work-image {
  filter: blur(5px);
}
.work-card:hover .work-details {
  opacity: 1;
}
.work-image {
  height: 100%;
  width: 100%;
  transition: filter 0.5s ease;
}
.work-details {
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  opacity: 0;
  text-align: center;
  font-size: large;
  transition: opacity 0.5s ease;
}
.no-results{
  font-size: large;
  text-align: center;
}
</style>
