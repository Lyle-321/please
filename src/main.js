import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// 引入Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// 引入全局公共样式
import './assets/style/common.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
