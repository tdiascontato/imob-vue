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
import number = CSS.number
import { toNumber } from '@vue/shared'

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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
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
    :coverflow-effect="{ depth: 100, rotate: 30, modifier: 0.5, scale: 1.03 }"
    :autoplay="{ delay: 2500, disableOnInteraction: false, }"
    slidesPerView="auto"
    :loop="true"
    class="mall-container"
  >
    <SwiperSlide class="work-card" v-for="work in works" :key="work._id">
      <div class="card-content">
        <img :src="work.image" :alt="work.title" class="work-image" />
        <div class="work-details">
          <h2>{{ work.title }}</h2>
          <p>
            R${{ work.price }}
             ou
            {{ toNumber(work.price) - 20}}
            <img src="/coin.png" alt="Coin" class="coin-svg"/>

          </p>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.swiper-slide {
  width: 15rem;
}
.mall-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  scrollbar-width: none;
  max-height: 22rem;
  max-width: 100%;
}
.card-content {
  position: relative;
  width: 100%;
  height: 22rem;
}
.work-card {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.3rem 0.3rem rgba(202, 202, 202, 0.16);
  cursor: pointer;
  overflow: hidden;
  height: max-content;
}
.work-card:hover{
  scale: 1.03;
}
.work-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.work-details {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 33%;
  background-color: rgba(0, 0, 0, 0.6); /* Background similar to work-details */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: large;
}
.work-details h2,
.work-details p {
  margin: 0;
}
.coin-svg{
  width: 1rem;
  margin: 0 auto;
}
</style>
