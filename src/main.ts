import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// -------- vue router -------
import router from './router'

// -------- quasar -------
import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/ja'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// -------- pinia -------
// import { createPinia } from "pinia";

const app = createApp(App)

app.use(router)
app.use(Quasar, {
  plugins: {
    Notify,
  },
  lang: quasarLang,
})
// app.use(createPinia());

app.mount('#app')
