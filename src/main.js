import App from './App.vue'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router';


import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(router).use(createPinia())


registerPlugins(app)
app.mount('#app')

