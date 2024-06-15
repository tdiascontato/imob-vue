<!--src/components/actions/WorkRegister.vue-->
<template>
  <div class="work-register">

    <h2>Registro de Trabalho</h2>

    <form @submit.prevent="handleSubmit">

      <div class="form-group">
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="work.title" required />
      </div>

      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="work.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="image">Imagem:</label>
        <input type="file" id="image" @change="handleImageUpload" required />
      </div>

      <div class="form-group">
        <label for="price">Preço:</label>
        <input type="number" id="price" v-model="work.price" required />
      </div>

      <button type="submit">Registrar</button>

    </form>

  </div>
</template>

<style scoped>
.work-register {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
}

button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4264b9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #283b6a;
}

.btn {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #358a6d;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import Compressor from 'compressorjs';
import api from '@/services/http'
import { useRouter } from 'vue-router';
import type { Work } from '@/interfaces/interface'

const router = useRouter();

const work = ref<Partial<Work>>({
  title: '',
  description: '',
  image: '',
  price: '',
  user_id: ''
});
const image = ref<File | null>(null);

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    image.value = target.files[0];
  }
};

const handleSubmit = async () => {
  if (!image.value) return;

  new Compressor(image.value, {
    quality: 0.1,
    success: async (compressedResult) => {
      const formData = new FormData();
      formData.append('title', work.value.title as string);
      formData.append('description', work.value.description as string);
      formData.append('image', compressedResult);
      formData.append('price', work.value.price as string);
      console.log(formData)

      try {

        const response = await api.post('/work/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        router.push('/');

      } catch (error) {
        console.error('Fail Send Register', error);
      }
    }, error(err){
        console.error('Fail Compressor Register', err.message);}
  });
};
</script>
