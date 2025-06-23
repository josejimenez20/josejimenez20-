import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar el tema Sakura globalmente
import './assets/sakura.css'

// Importar Toastification para notificaciones
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
createApp(App).use(router).use(Toast).mount('#app')
