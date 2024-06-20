<!--src/components/actions/WorkRegister.vue-->
<template>
  <div class="work-register">

    <h3>Registro de Trabalho</h3>

    <form @submit.prevent="handleSubmit">

      <label for="title">Título:</label>
      <input type="text" class="form-back" id="title" v-model="work.title" required />

      <label for="description">Descrição:</label>
      <textarea class="form-back" id="description" v-model="work.description" required></textarea>

      <label for="image">Imagem:</label>
      <input type="file" id="image" @change="handleImageUpload" required />

      <label for="price">Preço:</label>
      <input type="number" class="form-back" id="price" v-model="work.price" required />

      <button type="submit">Registrar</button>

    </form>

  </div>
</template>

<style scoped>
.work-register {
  display: flex;
  flex-direction: column;
  width: 18rem;
  text-align: center;
}
.work-register h3{
  font-size: large;
}
form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form label{
  margin-bottom: 0.5rem;
  font-size: large;
}
form input, form textarea{
  font-size: medium;
  border: none;
  height: 2rem;
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
}
.form-back{
  background: #cacaca;
  border: none;
  color: black;
  font-size: large;
  width: 100%;
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
    quality: 0.5,
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
        window.location.href = '/';
      } catch (error) {
        console.error('Fail Send Register', error);
      }
    }, error(err){
        console.error('Fail Compressor Register', err.message);}
  });
};
</script>
