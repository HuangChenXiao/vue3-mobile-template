import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: () => import('../views/Hello.vue'),
    meta: { title: 'Hello' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
