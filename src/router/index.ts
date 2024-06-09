// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import Dashboard from '@/components/models/menu/Dashboard.vue'
import Perfil from '@/components/models/menu/Perfil.vue'
import Works from '@/components/models/menu/Works.vue'
import Premium from '@/components/models/menu/Premium.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home
    { path: '/', name: 'Main', component: MainPage },
    // Login e Registros
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage },
    // Menu
    { path: '/menu/dashboard',name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/menu/perfil',name: 'Perfil', component: Perfil, meta: { requiresAuth: true } },
    { path: '/menu/works',name: 'Trabalhos', component: Works, meta: { requiresAuth: true } },
    { path: '/menu/premium',name: 'Premium', component: Premium, meta: { requiresAuth: true } },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;