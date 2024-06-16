<!--src/components/models/menu/Works.vue-->
<template>
  <div class="flex-container">

    <div class="works-container">

      <div v-if="works.length" v-for="work in works" :key="work._id" class="work-card">
        <input type="text" v-model="work.title" class="title-card" />
        <img :src="work.image" alt="Imagem do Trabalho" />
        <input type="file" @change="onFileChange($event, work)" class="file-card" />
        <textarea v-model="work.description" class="text-card"></textarea>
        <div class="flex-buttons">
          <p class="price-card">R$</p>
          <input type="number" v-model="work.price" class="price-card" />
        </div>
        <div class="buttons">
          <button @click="updateWork(work)" class="btn-card">Salvar</button>
          <button @click="deleteWork(work._id)" class="btn-delete">Deletar</button>
        </div>
      </div>

    </div>

    <WorkRegister />
  </div>

</template>

<style scoped>
.flex-container{
  display: flex;
  justify-content: center;
  padding: 2rem;
  align-items: start;
  gap: 2rem;
  overflow-y: initial;

}
.works-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  height: 100vh;
  max-width: 50%;
  gap: 1rem;
}
.work-card {
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #fff;
  border-radius: 0.5rem;
  background-color: #ffede2;
  padding: 0.1rem;
  max-width: 15rem;
  max-height: 19rem;
  transition: 0.5s ease;
}
.work-card:hover{
  background: #fff;
  transition: 0.5s ease;
}
.work-card img{
  max-width: 15rem;
  max-height: 10rem;
  border-radius: 0.5rem;
}
.title-card{
  border: none;
  border-radius: 0.3rem;
  height: 2rem;
  font-size: medium;
  text-align: center;
}
.file-card{
  padding-bottom: 1rem;
}
.text-card{
  text-align: center;
  font-size: large;
  border: none;
  overflow: hidden;
  border-radius: 0.5rem;
  background: transparent;
}
.price-card{
  font-size: medium;
  border: none;
  border-radius: 0.7rem;
  max-width: 3rem;
  max-height: 2rem;
  overflow: hidden;
  text-align: center;
  padding: 0.5rem;
}
.flex-buttons{
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttons{
  display: flex;
  justify-content: center;
  gap:5%;
  padding-bottom: 1rem;
}
.btn-card{
  height: 2rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: #4264b9;
  font-size: medium;
  text-align: center;
  cursor: pointer;
  transition: 0.5s ease;
  color: white;
}
.btn-card:hover{
  background: #0238be;
  transition: 0.5s ease;
}
.btn-delete{
  height: 2rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #dd5151;
  font-size: medium;
  text-align: center;
  cursor: pointer;
  color: white;
  transition: 0.5s ease;
}
.btn-delete:hover{
  background: #e00303;
  transition: 0.5s ease;
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
    await fetchWorks();
  } catch (error) {
    console.error('Erro ao atualizar trabalho:', error);
  }
};

const deleteWork = async (workId: string) => {
  try {
    await api.delete(`/user/works/${workId}`);
    await fetchWorks();
  } catch (error) {
    console.error('Erro ao deletar trabalho:', error);
  }
};

onMounted(() => {
  fetchWorks();
});
</script>
