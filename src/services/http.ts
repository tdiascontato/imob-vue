import axios from 'axios';
import { useRouter } from 'vue-router'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers:{
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;