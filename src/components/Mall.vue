<!-- src/components/Mall.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Work } from '@/interfaces/interface';
import api from '@/services/http';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

const works = ref<Work[]>([]);

const shuffleArray = (array: Work[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const fetchWorks = async () => {
  try {
    const response = await api.get('/mall');
    works.value = response.data.works;
    shuffleArray(works.value);
  } catch (error) {
    console.error('Failed to fetch works:', error);
  }
};

onMounted(() => {
  fetchWorks();
});
</script>

<template>
  <Swiper
    :modules="[EffectCoverflow, Autoplay]"
    effect="coverflow"
    :grabCursor="true"
    :centeredSlides="true"
    :coverflow-effect="{ depth: 150, rotate: 30, modifier: 0.5, scale: 1.03 }"
    :autoplay="{ delay: 2500, disableOnInteraction: false, }"
    slidesPerView="auto"
    :loop="true"
    class="mall-container"
  >
    <SwiperSlide class="work-card" v-for="work in works" :key="work._id">
      <img :src="work.image" :alt="work.title" class="work-image" />
      <div class="work-details">
        <h2>{{ work.title }}</h2>
        <p>R${{ work.price }}</p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.mall-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
  scrollbar-width: none;
  max-height: 25rem;
  max-width: 100%;
}

.swiper {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.swiper-slide {
  width: 15rem;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}

.work-card {
  position: relative;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.5s ease;
  z-index: 2;
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
</style>
