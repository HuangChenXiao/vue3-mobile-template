import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './assets/styles/common.styl'

// 750 设计稿自适应：设置根字体大小
const setRem = (): void => {
  const baseSize = 100
  const designWidth = 750
  const scale = document.documentElement.clientWidth / designWidth
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}

setRem()
window.addEventListener('resize', setRem)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
