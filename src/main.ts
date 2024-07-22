import { createApp } from "vue"
import App from './App.vue'
import './style.css'
import './assets/css/index.less'
import router from "./router/router";

createApp(App).use(router).mount('#app')
