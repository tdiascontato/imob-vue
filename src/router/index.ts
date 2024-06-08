import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import WorkRegister from '@/components/actions/WorkRegister.vue'
import Menu from '@/components/models/Menu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name: 'Main', component: MainPage,
    },
    {
      path: '/login', name: 'Login', component: LoginPage,
    },
    {
      path: '/register', name: 'Register', component: RegisterPage,
    },
    {
      path: '/work/register', name: 'WorkRegister', component: WorkRegister, meta: { requiresAuth: true },
    },
    {
      path: '/menu',name: 'Menu', component: Menu, meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach((to, from, next) => {  if (to.meta.requiresAuth) {
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
