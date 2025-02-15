import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/company'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(router).use(store).use(Antd).mount('#app')
