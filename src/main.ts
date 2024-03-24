import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import MarqueeText from 'vue-marquee-text-component'
import * as ElementPlusIconVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios';

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconVue)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.component('marquee-text', MarqueeText)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$router = router

app.mount('#app')

const base_url = 'http://localhost:8080'
axios.defaults.baseURL = base_url
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'