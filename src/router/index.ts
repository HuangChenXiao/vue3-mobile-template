import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: () => import('../views/Hello.vue'),
    meta: { title: 'Hello' }
  },
  {
    path: '/image-preview',
    name: 'ImagePreviewDemo',
    component: () => import('../views/demo/ImagePreviewDemo.vue'),
    meta: { title: '图片预览' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

