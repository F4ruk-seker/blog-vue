import { createApp } from 'vue'
import router from './router'
import { store } from "./store";

import App from './App.vue'


// 3d
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'bootstrap/dist/css/bootstrap-reboot.min.css'

// import './assets/main.css'

createApp(App)
    .use(router)
    .use(store)
    // .use(VueMarkdown)
    .mount('#app')
