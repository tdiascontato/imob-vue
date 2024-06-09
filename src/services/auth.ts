// src/services/auth.ts
import { ref } from 'vue';

const token = ref<string | null>(null);

const login = (newToken: string) => {
  token.value = newToken;
  localStorage.setItem('token', newToken);
  window.dispatchEvent(new Event('storage'));
};

const logout = () => {
  token.value = null;
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('storage'));
};

const getToken = () => token.value;

const useAuth = () => {
  return {
    login,
    logout,
    getToken,
  };
};

export { useAuth };