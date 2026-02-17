import './assets/main.css'
import './assets/bootstrap.css'
import './assets/theme.css'
import './assets/icons/bootstrap-icons.css'
import './assets/bootstrap-5.3.7/js/bootstrap.bundle.min.js'

// PrimeIcons (ONLY required CSS)
import 'primeicons/primeicons.css'

// Vue
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// PrimeVue v4
import PrimeVue from 'primevue/config'
// import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'

// Icons
import * as icons from 'lucide-vue-next'

//toast
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

//  PrimeVue v4 theme setup
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

// app.use(ToastService)
// app.use(Toast, {
//     position: "bottom-right",
//     timeout: 1000
// })



for (const [key, component] of Object.entries(icons)) {
    app.component(key, component)
}

app.mount('#app')
