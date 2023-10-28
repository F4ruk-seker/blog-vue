import { createApp } from 'vue'
import router from './router'

import App from './App.vue'

// 3d
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import 'bootstrap/dist/css/bootstrap-reboot.min.css'

// import './assets/main.css'

createApp(App)
    .use(router)
    .mount('#app')
