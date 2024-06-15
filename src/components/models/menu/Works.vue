<template>
  <div class="works-container">

    <div v-if="works.length" v-for="work in works" :key="work._id" class="work-card">
      <h3> <input type="text" v-model="work.title" /> </h3>
      <img :src="work.image" alt="Imagem do Trabalho" />
      <input type="file" @change="onFileChange($event, work)" />
      <p>  <textarea v-model="work.description"></textarea> </p>
      <p>Preço: <input type="number" v-model="work.price" /></p>
      <button @click="updateWork(work)">Salvar</button>
      <button @click="deleteWork(work._id)">Deletar</button>
    </div>

    <WorkRegister v-if="!works.length" />

  </div>
</template>

<style scoped>
.works-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.work-card {
  display: flex;;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
  width: 100%;
  max-width: 400px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
}

.work-card img {
  max-width: 100%;
  height: auto;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/http';
import WorkRegister from '@/components/actions/WorkRegister.vue';
import type { Work } from '@/interfaces/interface';

const works = ref<Work[]>([]);
const fileMap = new Map<string, File>();

const fetchWorks = async () => {
  try {
    const response = await api.get('/user/works');
    works.value = response.data.works;
  } catch (error) {
    console.error('Erro ao buscar os trabalhos:', error);
  }
};

const onFileChange = (event: Event, work: Work) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    fileMap.set(work._id, input.files[0]);
  }
};

const updateWork = async (work: Work) => {
  const formData = new FormData();
  formData.append('title', work.title);
  formData.append('description', work.description);
  formData.append('price', work.price.toString());

  if (fileMap.has(work._id)) {
    formData.append('image', fileMap.get(work._id)!);
  }

  try {
    await api.patch(`/user/works/${work._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    fetchWorks();
  } catch (error) {
    console.error('Erro ao atualizar trabalho:', error);
  }
};

const deleteWork = async (workId: string) => {
  try {
    await api.delete(`/user/works/${workId}`);
    fetchWorks();
  } catch (error) {
    console.error('Erro ao deletar trabalho:', error);
  }
};

onMounted(() => {
  fetchWorks();
});
</script>
