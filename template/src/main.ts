import './assets/base.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp, inject, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const globalState = reactive({
  message: 'Hello injections',
  isAuthenticated: false
})

const app = createApp(App)
app.provide('globalState', globalState)


app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')

router.beforeEach((to, from) => {
  const global2 = inject('globalState')
  console.log(global2)
})