// Ana giriş dosyası - Uygulama başlatma
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Vue uygulamasını oluştur
const app = createApp(App)

// Pinia state management'ı ekle
const pinia = createPinia()
app.use(pinia)

// Router'ı ekle
app.use(router)

// Uygulamayı mount et
app.mount('#app')
