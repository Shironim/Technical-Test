import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
// v-calendar
import 'v-calendar/dist/style.css'
import VCalendar from 'v-calendar'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faPen, faTrash, faCheck)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.use(VCalendar, {})
app.mount('#app')
